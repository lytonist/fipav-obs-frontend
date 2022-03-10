import React, { useEffect, useState } from "react";
import { serviceProvider as API } from "../../API/api";

// Context
import { useAuth } from "../../contexts/userContext";
import { useTitle } from '../../contexts/titleContext';

// Components
import ReportForm from "./reports/ReportForm";
import ReportModal from "./reports/ReportModal";
import ReportPreview from "./reports/ReportPreview";
import ReportTable from "./reports/ReportTable";

function Reports() {
    const [ user ] = useAuth();
    const blankReport = {
        _id: undefined,
        valid: false,
        // Dati Generali
        general: {
            author: user._id,
            match_num: '',
            series: 'CM',
            date: '',
            time: '',
            real_time: '',
            teams: '',
            first_ref: undefined, // ObjectId
            second_ref: undefined, // ObjectId
            scorer: '',
        },
        // Dati Gara
        match: {
            result: '0-0',
            duration: 0,
            spects: 0,
            pts1set: '0-0',
            pts2set: '0-0',
            pts3set: '0-0',
            pts4set: '',
            pts5set: '',
            pts6set: '',
            dur1set: 0,
            dur2set: 0,
            dur3set: 0,
            dur4set: 0,
            dur5set: 0,
            dur6set: 0,
        },
        // Area Immagine
        image: {
            aspect1ref: 2,
            aspect2ref: 2,
            delay1ref: 2,
            delay2ref: 2,
            prot1ref: 2,
            prot2ref: 2,
            whistle1ref: 2,
            whistle2ref: 2,
            complaint1ref: 2,
            complaint2ref: 2,
            image_notes: '',
        },
        // Area Tecnica
        technical: {
            complexity: 3,
            tech1ref: 2,
            tech2ref: 2,
            ballsinout_ord_1ref: 0,
            ballsinout_ord_2ref: 0,
            ballsinout_sev_1ref: 0,
            ballsinout_sev_2ref: 0,
            balltouches_ord_1ref: 0,
            balltouches_sev_1ref: 0,
            firsttouch_ord_1ref: 0,
            firsttouch_sev_1ref: 0,
            penetration_ord_1ref: 0,
            penetration_ord_2ref: 0,
            penetration_sev_1ref: 0,
            penetration_sev_2ref: 0,
            posfaults_ord_1ref: 0,
            posfaults_ord_2ref: 0,
            posfaults_sev_1ref: 0,
            posfaults_sev_2ref: 0,
            nettouches_ord_1ref: 0,
            nettouches_ord_2ref: 0,
            nettouches_sev_1ref: 0,
            nettouches_sev_2ref: 0,
            walltouches_ord_1ref: 0,
            walltouches_ord_2ref: 0,
            walltouches_sev_1ref: 0,
            walltouches_sev_2ref: 0,
            airplay_ord_1ref: 0,
            airplay_sev_1ref: 0,
            defensefaults_ord_1ref: 0,
            defensefaults_ord_2ref: 0,
            defensefaults_sev_1ref: 0,
            defensefaults_sev_2ref: 0,
            servefaults_ord_1ref: 0,
            servefaults_sev_1ref: 0,
            liberofaults_ord_1ref: 0,
            liberofaults_ord_2ref: 0,
            liberofaults_sev_1ref: 0,
            liberofaults_sev_2ref: 0,
            otherfaults_ord_1ref: 0,
            otherfaults_ord_2ref: 0,
            otherfaults_sev_1ref: 0,
            otherfaults_sev_2ref: 0,
            error_notes: '',
            collab1ref: 2,
            collab2ref: 2,
            collab_notes: '',
        },
        // Area Relazionale
        relational: {
            gest_difficulty: 3,
            gest1ref: 2,
            gest2ref: 2,
            conc1ref: 2,
            conc2ref: 2,
            rel_notes: '',
        },
        // Area Disciplinare
        discipline: {
            gest_discipline: 3,
            d_verbals: 0,
            d_officials: 0,
            d_penals: 0,
            d_expulsions: 0,
            d_squalifications: 0,
            discipline: 2,
            disc_interation: 2,
            delays1ref: 2,
            delays2ref: 2,
            disc_notes: '',
        },
        // Colloquio
        interview: {
            interview1ref: 2,
            interview2ref: 2,
            interview_notes: '',
        },
        // Eventi particolari
        events: {
            finalvote1ref: 3,
            finalvote2ref: 3
        }
    }
    const [ action, setAction ] = useState('new');
    const [ allReports, setallReports ] = useState(false);
    const [ button, setButton ] = useState('new');
    const [ completeReport, setCompleteReport ] = useState(undefined);
    const [ error, setError ] = useState(false);
    const [ modal, setModal ] = useState(false);
    const [ report, setReport ] = useState(blankReport);
    const [ reports, setReports ] = useState([]);
    const [ showReferee, setShowReferee ] = useState('1st');
    const [ title, setTitle ] = useTitle();

    const handleButton = () => {
        if (button === 'new') {
            setReport(blankReport);
            setAction('new');
            setButton('edit');
        } else {
            setButton('new');
        }
    }

    const toggleButton = () => {
        setallReports(!allReports);
    }

    const changeShow = e => {
        setShowReferee(e.currentTarget.value);
    }

    function toggleModal(e) {
        e?.preventDefault();
        setModal(!modal);
        if (modal) {
            document.querySelector('[modal-backdrop]').remove();
        } else {
            const backdropEl = document.createElement('div');
            backdropEl.setAttribute('modal-backdrop', '');
            backdropEl.classList.add('bg-gray-900', 'bg-opacity-50', 'fixed', 'inset-0', 'z-40');
            document.querySelector('body').append(backdropEl);
        }
    }

    useEffect(() => {
        setTitle('Report');
    }, [setTitle]);

    // GET dei report inseriti e ordinamento per data
    useEffect(() => {
        const queryParams = allReports ? '' : `general.author=${user._id}`;
        API.get(`reports?${queryParams}`, true).then(res => {
            res.success && setReports(res.reports.sort((a, b) => {
                const date1 = new Date(a.general.date);
                const date2 = new Date(b.general.date);
                if (date1 > date2) return 1;
                if (date1 < date2) return -1;
                return 0;
            }));
        });
    }, [allReports, setReports, user._id]);

    // Al cambiare dei reports, aggiorna l'ordinamento
    useEffect(() => {
        setReports(reports.sort((a, b) => {
            const date1 = new Date(a.general.date);
            const date2 = new Date(b.general.date);
            return date1 - date2;
        }));
    }, [reports]);

    return (
        <main className="container mx-auto min-h-screen px-5 py-20 lg:px-10 md:py-48">
            <div className="flex gap-2 items-center">
                <button
                    className="btn-default mb-4"
                    onClick={ handleButton }
                >
                    { button === 'new' ? 'Nuovo Report' : 'Torna ai Report' }
                </button>
                {
                    user.admin && button === 'new' && (
                        <div className="mt-3">
                            <label htmlFor="all-reports" className="flex relative items-center mb-7 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    id="all-reports" 
                                    className="sr-only" 
                                    checked={ allReports }
                                    value={ allReports }
                                    onChange={ toggleButton }
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full border border-gray-200 toggle-bg dark:bg-gray-700 dark:border-gray-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Tutti i report</span>
                            </label>
                        </div>
                    )
                }
                {
                    button === 'preview' && (
                        <div className="mb-4">
                            <select
                                value={showReferee}
                                onChange={changeShow}
                                className="block p-2 form-input w-32"
                            >
                                { completeReport.general.first_ref && <option value='1st'>Primo Arbitro</option> }
                                { completeReport.general.second_ref && <option value='2nd'>Secondo Arbitro</option> }
                            </select>
                        </div>
                    )
                }
                
            </div>
            
            {
                error && (
                    <div className="danger-alert dark:bg-red-200 dark:text-red-800" role="alert">
                        { error }.
                    </div>
                )
            }
            { button === 'edit' && <ReportForm report={report} setReport={setReport} toggleModal={toggleModal} /> }
            { button === 'new' && <ReportTable allReports={allReports} reports={reports} setAction={setAction} setButton={setButton} setCompleteReport={setCompleteReport} setReport={setReport} setReports={setReports} toggleModal={toggleModal} /> }
            { button === 'preview' && <ReportPreview report={completeReport} showReferee={showReferee} /> }
            <ReportModal 
                action={action}
                modal={modal} 
                report={report} 
                setButton={setButton} 
                setError={setError} 
                setReports={setReports} 
                toggleModal={toggleModal} 
            />
        </main>
    )
}

export default Reports;