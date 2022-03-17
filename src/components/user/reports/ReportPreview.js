import React, { useEffect, useState } from "react";

// Context
import { useAuth } from "../../../contexts/userContext";

const getResult = (index, table) => {
    return table[index];
}

const getComplexity = (sum) => {
    if (sum >= 6) return 2;
    if (sum >= 4.5 && sum < 6) return 1.5;
    if (sum >= 3 && sum < 4.5) return 1;
    if (sum >= 1.5 && sum < 3) return 0.5;
    return 0;
}

const calcErrors = ({std, sev}) => {
    const standard = std.reduce((prev, value) => value > 2 ? prev + 2 : prev + value, 0);
    const medium = std.reduce((prev, value) => value > 2 ? prev + value - 2 : prev, 0);
    const severe = sev.reduce((prev, value) => prev + value, 0);
    return {
        std: standard,
        med: medium,
        sev: severe
    }
}

function ReportPreview({ report, showReferee }) {

    const [ user ] = useAuth();
    const [ vote, setVote ] = useState(96);
    const [ complexity, setComplexity ] = useState({
        add_duration: 0,
        tech_complexity: 0,
        gest_complexity: 0,
        disc_complexity: 0,
        complexity: 0
    });
    const [ results, setResults ] = useState({
        complexity: {
            table: [0, 0.5, 1, 1.5, 2],
            result: 0
        },
        aspect: {
            table: [-0.4, -0.2, 0],
            result: 0
        },
        delay: {
            table: [-1, -0.5, 0],
            result: 0
        },
        prot: {
            table: [-0.5, -0.3, 0],
            result: 0
        },
        whistle: {
            table: [-0.5, -0.3, 0],
            result: 0
        },
        complaint: {
            table: [-0.4, -0.2, 0],
            result: 0
        },
        technic: {
            table: [-1, -0.5, 0, 0.4],
            result: 0
        },
        errors_1st: {
            table: [-0.1, -0.25, -0.4],
            result: 0
        },
        errors_2nd: {
            table: [-0.1, -0.25, -0.4],
            result: 0
        },
        errors_3rd: {
            table: [-0.1, -0.25, -0.4],
            result: 0
        },
        collab: {
            table: [-1, -0.5, 0, 0.3],
            result: 0
        },
        gest: {
            table: [-1, -0.5, 0, 0.5],
            result: 0
        },
        conc: {
            table: [-1, -0.5, 0, 0.3],
            result: 0
        },
        disc: {
            table: [-1, -0.5, 0, 0.5],
            result: 0
        },
        delays: {
            table: [-0.5, -0.3, 0],
            result: 0
        },
        interview: {
            table: [-0.2, -0.1, 0]
        }
    });
    const options = ['Carente', 'Parz. Carente', 'Positivo', 'Ottimo'];
    const delays = ['Sì, oltre 10\'', 'Sì, fino a 10\'', 'No'];
    const difficulty = ['Facile', 'Medio-Bassa', 'Medio-Alta', 'Difficile'];
    const interview = ['Zelante e/o polemico', 'Disattento e/o distratto', 'Nella norma'];
    const votes = ['Insoddisfacente', 'Parz. carente', 'Media', 'Buona', 'Eccellente'];
    const series = {
        'CM': 'C/M',
        'CF': 'C/F',
        'DM': 'D/M',
        'DF': 'D/F',
        'CSM': 'Coppa Sicilia / M',
        'CSF': 'Coppa Sicilia / F',
        'U18M': 'Under 18/M',
        'U18F': 'Under 18/F',
        'U16M': 'Under 16/M',
        'U16F': 'Under 16/F',
        'U14M': 'Under 14/M',
        'PCM': 'Playoff C/M',
        'PCF': 'Playoff C/M',
        'PDM': 'Playoff D/M',
        'PDF': 'Playoff D/F',
        'OUTCM': 'Playout C/M',
        'OUTCF': 'Playout C/F',
        'OUTDM': 'Playout D/M',
        'OUTDF': 'Playout D/F',
        'FPCM': 'Fin. Playoff C/M',
        'FPCF': 'Fin. Playoff C/F',
        'FPDM': 'Fin. Playoff D/M',
        'FPDF': 'Fin. Playoff D/F',
        'FU18M': 'Fin. Under 18/M',
        'FU18F': 'Fin. Under 18/F',
        'FU16M': 'Fin. Under 16/M',
        'FU16F': 'Fin. Under 16/F',
        'FU14M': 'Fin. Under 14/M',
        'FU14F': 'Fin. Under 14/F',
    };

    useEffect(() => {

        // Calcolo i totali dei valori di complessità
        const complexity_table = [0, 0.5, 1.5, 2];
        const add_duration = report.match.duration < 80 ? 0 :
            report.match.duration > 110 ? 1
            : 0.5;
        const tech_complexity = complexity_table[report.technical.complexity];
        const gest_complexity = complexity_table[report.relational.gest_difficulty];
        const disc_complexity = complexity_table[report.discipline.gest_discipline];

        // Memorizzo i dati di complessità nello stato
        setComplexity({
            add_duration: add_duration,
            tech_complexity: tech_complexity,
            gest_complexity: gest_complexity,
            disc_complexity: disc_complexity,
            complexity: getComplexity((add_duration * 10 + tech_complexity * 10 + gest_complexity * 10 + disc_complexity * 10) / 10)
        })
        
        // Calcolo degli errori
        const errorslist1ref = {
            std: [
                report.technical.ballsinout_ord_1ref,
                report.technical.balltouches_ord_1ref,
                report.technical.firsttouch_ord_1ref,
                report.technical.penetration_ord_1ref,
                report.technical.posfaults_ord_1ref,
                report.technical.nettouches_ord_1ref,
                report.technical.walltouches_ord_1ref,
                report.technical.airplay_ord_1ref,
                report.technical.defensefaults_ord_1ref,
                report.technical.servefaults_ord_1ref,
                report.technical.liberofaults_ord_1ref,
                report.technical.otherfaults_ord_1ref
            ],
            sev: [
                report.technical.ballsinout_sev_1ref,
                report.technical.balltouches_sev_1ref,
                report.technical.firsttouch_sev_1ref,
                report.technical.penetration_sev_1ref,
                report.technical.posfaults_sev_1ref,
                report.technical.nettouches_sev_1ref,
                report.technical.walltouches_sev_1ref,
                report.technical.airplay_sev_1ref,
                report.technical.defensefaults_sev_1ref,
                report.technical.servefaults_sev_1ref,
                report.technical.liberofaults_sev_1ref,
                report.technical.otherfaults_sev_1ref
            ]
        };

        const errorslist2ref = {
            std: [
                report.technical.ballsinout_ord_2ref,
                report.technical.penetration_ord_2ref,
                report.technical.posfaults_ord_2ref,
                report.technical.nettouches_ord_2ref,
                report.technical.walltouches_ord_2ref,
                report.technical.defensefaults_ord_2ref,
                report.technical.liberofaults_ord_2ref,
                report.technical.otherfaults_ord_2ref
            ],
            sev: [
                report.technical.ballsinout_sev_2ref,
                report.technical.penetration_sev_2ref,
                report.technical.posfaults_sev_2ref,
                report.technical.nettouches_sev_2ref,
                report.technical.walltouches_sev_2ref,
                report.technical.defensefaults_sev_2ref,
                report.technical.liberofaults_sev_2ref,
                report.technical.otherfaults_sev_2ref
            ]
        };

        const errors = showReferee === '1st' ? calcErrors(errorslist1ref) : calcErrors(errorslist2ref);

        setResults(prevState => ({
            aspect: {
                ...prevState.aspect,
                result: showReferee === '1st' ? getResult(report.image.aspect1ref, prevState.aspect.table) : getResult(report.image.aspect2ref, prevState.aspect.table)
            },
            delay: {
                ...prevState.delay,
                result: showReferee === '1st' ? getResult(report.image.delay1ref, prevState.delay.table) : getResult(report.image.delay2ref, prevState.delay.table)
            },
            prot: {
                ...prevState.prot,
                result: showReferee === '1st' ? getResult(report.image.prot1ref, prevState.prot.table) : getResult(report.image.prot2ref, prevState.prot.table)
            },
            whistle: {
                ...prevState.whistle,
                result: showReferee === '1st' ? getResult(report.image.whistle1ref, prevState.whistle.table) : getResult(report.image.whistle2ref, prevState.whistle.table)
            },
            complaint: {
                ...prevState.complaint,
                result: showReferee === '1st' ? getResult(report.image.complaint1ref, prevState.complaint.table) : getResult(report.image.complaint2ref, prevState.complaint.table)
            },
            technic: {
                ...prevState.technic,
                result: showReferee === '1st' ? getResult(report.technical.tech1ref, prevState.technic.table) : getResult(report.technical.tech2ref, prevState.technic.table)
            },
            errors_1st: {
                ...prevState.errors_1st,
                result: errors.std * (prevState.errors_1st.table[0] * 100) / 100
            },
            errors_2nd: {
                ...prevState.errors_2nd,
                result: errors.med * (prevState.errors_2nd.table[1] * 100) / 100
            },
            errors_3rd: {
                ...prevState.errors_3rd,
                result: errors.sev * (prevState.errors_3rd.table[2] * 100) / 100
            },
            collab: {
                ...prevState.collab,
                result: showReferee === '1st' ? getResult(report.technical.collab1ref, prevState.collab.table) : getResult(report.technical.collab1ref, prevState.collab.table)
            },
            gest: {
                ...prevState.gest,
                result: showReferee === '1st' ? getResult(report.relational.gest1ref, prevState.gest.table) : getResult(report.relational.gest2ref, prevState.gest.table)
            },
            conc: {
                ...prevState.conc,
                result: showReferee === '1st' ? getResult(report.relational.conc1ref, prevState.conc.table) : getResult(report.relational.conc2ref, prevState.conc.table)
            },
            disc: {
                ...prevState.disc,
                result: showReferee === '1st' ? getResult(report.discipline.discipline, prevState.disc.table) : getResult(report.discipline.disc_interation, prevState.disc.table)
            },
            delays: {
                ...prevState.delays,
                result: showReferee === '1st' ? getResult(report.discipline.delays1ref, prevState.delays.table) : getResult(report.discipline.delays2ref, prevState.delays.table)
            },
            interview: {
                ...prevState.interview,
                result: showReferee === '1st' ? getResult(report.interview.interview1ref, prevState.interview.table) : getResult(report.interview.interview2ref, prevState.interview.table)
            }
        }));
    }, [complexity.complexity, report, showReferee])

    useEffect(() => {
        const modifiers = Object.keys(results).reduce((prev, curr) => (prev * 100 + results[curr].result * 100) / 100, 0);
        setVote(() => {
            // since modifiers returns a number '|| 0' prevents a return NaN error
            return 96 + complexity.complexity + modifiers || 0;
        })
    }, [ complexity.complexity, results])

    return (
        <div className="container">
            <div className="mb-2 p-2 min-w-full bg-gray-100 text-center shadow-md sm:rounded-lg">
                <div>
                    <h3 className="generic-title">Report del {showReferee === '1st' ? 'primo' : 'secondo'} arbitro</h3>
                </div>
            </div>
            <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
                <div className="mb-4">
                    <h3 className="generic-title">Dati Generali</h3>
                </div>
                <div className="mb-2 grid grid-cols-2 gap-2 content-center">
                    <span>Osservatore </span>
                    <span>{ report.general.author.lastname } { report.general.author.firstname }</span>
                    <span>Gara n. </span>
                    <span>{ report.general.match_num }</span>
                    <span>Serie </span>
                    <span>{ series[report.general.series] }</span>
                    <span>Data </span>
                    <span>{ new Date(report.general.date).toLocaleDateString() }</span>
                    <span>Ora </span>
                    <span>{ report.general.time } ({ report.general.real_time })</span>
                    <span>Primo Arbitro </span>
                    <span>{ report.general.first_ref.lastname } { report.general.first_ref.firstname }</span>
                    <span>Secondo Arbitro </span>
                    <span>{ report.general.second_ref?.lastname || '-' } { report.general.second_ref?.firstname || '' }</span>
                    <span>Segnapunti </span>
                    <span>{ report.general.scorer }</span>
                    { user.admin &&
                        <>
                            <span className="italic">Riepilogo Complessità</span>
                            <span className="value">{complexity.complexity}</span>
                            <span className="italic">Valutazione</span>
                            <span className="value font-semibold">{vote}</span>
                        </>
                    }
                </div>
            </div>
            <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
                <div className="mb-4">
                    <h3 className="generic-title">Dati Gara</h3>
                </div>
                <div className={`mb-2 grid ${user.admin ? 'grid-cols-3' : 'grid-cols-2'}  gap-2 content-center`}>
                    <span>Risultato</span>
                    <span className={ user.admin ? "col-span-2" : "col-span-1"}>{ report.match.result }</span>
                    <span>Durata</span>
                    <span>{ report.match.duration }</span>
                    { user.admin && <span className="value">{complexity.add_duration}</span> }
                    <span>Spettatori</span>
                    <span className={ user.admin ? "col-span-2" : "col-span-1"}>{ report.match.spects }</span>
                    <span>1° Set</span>
                    <span className={ user.admin ? "col-span-2" : "col-span-1"}>{ report.match.pts1set } ({ report.match.dur1set } minuti)</span>
                    <span>2° Set</span>
                    <span className={ user.admin ? "col-span-2" : "col-span-1"}>{ report.match.pts2set } ({ report.match.dur2set } minuti)</span>
                    { report.match.pts3set && (
                        <>
                            <span>3° Set</span>
                            <span className={ user.admin ? "col-span-2" : "col-span-1"}>{ report.match.pts3set } ({ report.match.dur3set } minuti)</span>
                        </>    
                    ) }
                    { report.match.pts4set && (
                        <>
                            <span>4° Set</span>
                            <span className={ user.admin ? "col-span-2" : "col-span-1"}>{ report.match.pts4set } ({ report.match.dur4set } minuti)</span>
                        </>    
                    ) }
                    { report.match.pts5set && (
                        <>
                            <span>5° Set</span>
                            <span className={ user.admin ? "col-span-2" : "col-span-1"}>{ report.match.pts5set } ({ report.match.dur5set } minuti)</span>
                        </>    
                    ) }
                    { report.match.pts6set && (
                        <>
                            <span>Set di Spareggio</span>
                            <span className={ user.admin ? "col-span-2" : "col-span-1"}>{ report.match.pts6set } ({ report.match.dur6set } minuti)</span>
                        </>    
                    ) }
                </div>
            </div>
            <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
                <div className="mb-4">
                    <h3 className="generic-title">Area Immagine</h3>
                </div>
                <div className={`mb-2 grid ${user.admin ? 'grid-cols-3' : 'grid-cols-2'}  gap-2 content-center`}>
                    <span>Aspetto Adeguato</span>
                    <span>{ showReferee === '1st' ? options[report.image.aspect1ref] : options[report.image.aspect2ref] }</span>
                    { user.admin && <span className={ results.aspect.result >= 0 ? 'bonus' : 'penalty'}>{ results.aspect.result }</span> }
                    <span>Ritardato arrivo presso l'impianto</span>
                    <span>{ showReferee === '1st' ? delays[report.image.delay1ref] : delays[report.image.delay2ref] }</span>
                    { user.admin && <span className={ results.delay.result >= 0 ? 'bonus' : 'penalty'}>{ results.delay.result }</span> }
                    <span>Fasi Protocollari (tutte)</span>
                    <span>{ showReferee === '1st' ? options[report.image.prot1ref] : options[report.image.prot2ref] }</span>
                    { user.admin && <span className={ results.prot.result >= 0 ? 'bonus' : 'penalty'}>{ results.prot.result }</span> }
                    <span>Fischio, segnaletica e postura</span>
                    <span>{ showReferee === '1st' ? options[report.image.whistle1ref] : options[report.image.whistle2ref] }</span>
                    { user.admin && <span className={ results.whistle.result >= 0 ? 'bonus' : 'penalty'}>{ results.whistle.result }</span> }
                    <span>Gestione istanze</span>
                    <span>{ showReferee === '1st' ? options[report.image.complaint1ref] : options[report.image.complaint2ref] }</span>
                    { user.admin && <span className={ results.complaint.result >= 0 ? 'bonus' : 'penalty'}>{ results.complaint.result }</span> }
                    { user.admin && 
                        <>
                            <span>Note</span>
                            <span className="col-span-2">{ report.image.image_notes }</span>
                        </>
                    }
                </div>
            </div>
            <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
                <div className="mb-4">
                    <h3 className="generic-title">Area Tecnica</h3>
                </div>
                <div className={`mb-4 grid ${user.admin ? 'grid-cols-3' : 'grid-cols-2'}  gap-2 content-center`}>
                    <span>Complessità Tecnica</span>
                    <span>{ difficulty[report.technical.complexity] }</span>
                    { user.admin && <span className="value">{complexity.tech_complexity}</span> }
                    <span>Tecnica Arbitrale</span>
                    <span>{ showReferee === '1st' ? options[report.technical.tech1ref] : options[report.technical.tech2ref] }</span>
                    { user.admin && <span className={ results.technic.result >= 0 ? 'bonus' : 'penalty'}>{ results.technic.result }</span> }
                </div>
                <div className="mb-2 grid grid-cols-3 gap-2 content-center">
                    <h3 className="generic-title text-sm">Errori</h3>
                    <span className="italic">Ordinari</span>
                    <span className="italic">Gravi e/o determ.</span>
                    <span>Palle Dentro / Fuori</span>
                    <span>{ showReferee === '1st' ? report.technical.ballsinout_ord_1ref : report.technical.ballsinout_ord_2ref }</span>
                    <span>{ showReferee === '1st' ? report.technical.ballsinout_sev_1ref : report.technical.ballsinout_sev_2ref }</span>
                    { showReferee === '1st' && (
                        <>
                            <span>Tocchi di Palla</span>
                            <span>{ report.technical.balltouches_ord_1ref }</span>
                            <span>{ report.technical.balltouches_sev_1ref }</span>
                        </>
                    ) }
                    { showReferee === '1st' && (
                        <>
                            <span>1° Tocco di Squadra</span>
                            <span>{ report.technical.firsttouch_ord_1ref }</span>
                            <span>{ report.technical.firsttouch_sev_1ref }</span>
                        </>
                    ) }
                    <span>Penetrazione spazio sotto rete</span>
                    <span>{ showReferee === '1st' ? report.technical.penetration_ord_1ref : report.technical.penetration_ord_2ref }</span>
                    <span>{ showReferee === '1st' ? report.technical.penetration_sev_1ref : report.technical.penetration_sev_2ref }</span>
                    <span>Falli di posizione / rotazione</span>
                    <span>{ showReferee === '1st' ? report.technical.posfaults_ord_1ref : report.technical.posfaults_ord_2ref }</span>
                    <span>{ showReferee === '1st' ? report.technical.posfaults_sev_1ref : report.technical.posfaults_sev_2ref }</span>
                    <span>Tocchi di rete</span>
                    <span>{ showReferee === '1st' ? report.technical.nettouches_ord_1ref : report.technical.nettouches_ord_2ref }</span>
                    <span>{ showReferee === '1st' ? report.technical.nettouches_sev_1ref : report.technical.nettouches_sev_2ref }</span>
                    <span>Tocchi di muro e 4 tocchi</span>
                    <span>{ showReferee === '1st' ? report.technical.walltouches_ord_1ref : report.technical.walltouches_ord_2ref }</span>
                    <span>{ showReferee === '1st' ? report.technical.walltouches_sev_1ref : report.technical.walltouches_sev_2ref }</span>
                    { showReferee === '1st' && (
                        <>
                            <span>Gioco aereo</span>
                            <span>{ report.technical.airplay_ord_1ref }</span>
                            <span>{ report.technical.airplay_sev_1ref }</span>
                        </>                        
                    ) }
                    <span>Attacchi / Muro difensori</span>
                    <span>{ showReferee === '1st' ? report.technical.defensefaults_ord_1ref : report.technical.defensefaults_ord_2ref }</span>
                    <span>{ showReferee === '1st' ? report.technical.defensefaults_sev_1ref : report.technical.defensefaults_sev_2ref }</span>
                    { showReferee === '1st' && (
                        <>
                            <span>Falli di servizio</span>
                            <span>{ report.technical.servefaults_ord_1ref }</span>
                            <span>{ report.technical.servefaults_sev_1ref }</span>
                        </>                        
                    ) }
                    <span>Falli del libero</span>
                    <span>{ showReferee === '1st' ? report.technical.liberofaults_ord_1ref : report.technical.liberofaults_ord_2ref }</span>
                    <span>{ showReferee === '1st' ? report.technical.liberofaults_sev_1ref : report.technical.liberofaults_sev_2ref }</span>
                    <span>Altri falli</span>
                    <span>{ showReferee === '1st' ? report.technical.otherfaults_ord_1ref : report.technical.otherfaults_ord_2ref }</span>
                    <span>{ showReferee === '1st' ? report.technical.otherfaults_sev_1ref : report.technical.otherfaults_sev_2ref }</span>
                </div>
                { user.admin && 
                    <div className="mb-2 grid grid-cols-2 gap-2 content-center italic">
                        <span>Tot. errori di 1° Livello</span>
                        <span className={ results.errors_1st.result[0] >= 0 ? 'bonus' : 'penalty'}>{ results.errors_1st.result }</span>
                        <span>Tot. errori di 2° Livello</span>
                        <span className={ results.errors_2nd.result[1] >= 0 ? 'bonus' : 'penalty'}>{ results.errors_2nd.result }</span>
                        <span>Tot. errori di 3° Livello</span>
                        <span className={ results.errors_3rd.result[2] >= 0 ? 'bonus' : 'penalty'}>{ results.errors_3rd.result }</span>
                    </div>
                }
                <div className={`mb-2 grid ${user.admin ? 'grid-cols-3' : 'grid-cols-2'}  gap-2 content-center`}>
                    { user.admin && 
                        <>
                            <span>Note</span>
                            <span className="col-span-2">{ report.technical.error_notes }</span>
                        </>
                    }
                    <span>Collaborazione tecnica</span>
                    <span>{ showReferee === '1st' ? options[report.technical.collab1ref] : options[report.technical.collab2ref] }</span>
                    { user.admin && <span className={ results.collab.result >= 0 ? 'bonus' : 'penalty'}>{ results.collab.result }</span> }
                    { user.admin &&
                        <>
                            <span>Note</span>
                            <span className="col-span-2">{ report.technical.collab_notes }</span>
                        </>
                    }
                </div>
            </div>
            <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
                <div className="mb-4">
                    <h3 className="generic-title">Area Relazionale</h3>
                </div>
                <div className={`mb-2 grid ${user.admin ? 'grid-cols-3' : 'grid-cols-2'}  gap-2 content-center`}>
                    <span>Complessità gestionale</span>
                    <span>{ difficulty[report.relational.gest_difficulty] }</span>
                    { user.admin && <span className="value">{complexity.gest_complexity}</span> }
                    <span>Gestione e Autorevolezza</span>
                    <span>{ showReferee === '1st' ? options[report.relational.gest1ref] : options[report.relational.gest2ref] }</span>
                    { user.admin && <span className={ results.gest.result >= 0 ? 'bonus' : 'penalty'}>{ results.gest.result }</span> }
                    <span>Livello di concentrazione (era in linea con l'evento?)</span>
                    <span>{ showReferee === '1st' ? options[report.relational.conc1ref] : options[report.relational.conc2ref] }</span>
                    { user.admin && <span className={ results.conc.result >= 0 ? 'bonus' : 'penalty'}>{ results.conc.result }</span> }
                    { user.admin && 
                        <>
                            <span>Note</span>
                            <span className="col-span-2">{ difficulty[report.relational.rel_notes] }</span>
                        </>
                    }
                </div>
            </div>
            <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
                <div className="mb-4">
                    <h3 className="generic-title">Area Disciplinare</h3>
                </div>
                <div className={`mb-2 grid ${user.admin ? 'grid-cols-3' : 'grid-cols-2'}  gap-2 content-center`}>
                    <span>Complessità gestionale</span>
                    <span>{ difficulty[report.discipline.gest_discipline] }</span>
                    { user.admin && <span className="value">{complexity.gest_complexity}</span> }
                </div>
                <div className="mb-2 grid grid-cols-5 gap-2 content-center">
                    <span>Avv. verbali</span>
                    <span>Avv. ufficiali</span>
                    <span>Penalizzazioni</span>
                    <span>Espulsioni</span>
                    <span>Squalifiche</span>
                    <span>{ report.discipline.d_verbals }</span>
                    <span>{ report.discipline.d_officials }</span>
                    <span>{ report.discipline.d_penals }</span>
                    <span>{ report.discipline.d_expulsions }</span>
                    <span>{ report.discipline.d_squalifications }</span>
                </div>
                <div className={`mb-2 grid ${user.admin ? 'grid-cols-3' : 'grid-cols-2'}  gap-2 content-center`}>
                    { showReferee === '1st' && (
                        <>
                            <span>Amministrazione della disciplina</span>
                            <span>{ difficulty[report.discipline.discipline] }</span>
                        </>
                    ) }
                    { showReferee === '2nd' && (
                        <>
                            <span>Interazione disciplinare</span>
                            <span>{ difficulty[report.discipline.disc_interation] }</span>
                        </>
                    ) }
                    { user.admin && <span className={ results.disc.result >= 0 ? 'bonus' : 'penalty'}>{ results.disc.result }</span> }
                    <span>Richieste improprie e ritardi di gioco</span>
                    <span>{ showReferee === '1st' ? options[report.discipline.delays1ref] : options[report.discipline.delays2ref] }</span>
                    { user.admin && <span className={ results.delays.result >= 0 ? 'bonus' : 'penalty'}>{ results.delays.result }</span> }
                    { user.admin && 
                        <>
                            <span>Note</span>
                            <span className="col-span-2">{ report.discipline.disc_notes }</span>
                        </>
                    }
                </div>
            </div>
            <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
                <div className="mb-4">
                    <h3 className="generic-title">Colloquio</h3>
                </div>
                <div className={`mb-2 grid ${user.admin ? 'grid-cols-3' : 'grid-cols-2'}  gap-2 content-center`}>
                    <span>Reattività al colloquio</span>
                    <span>{ showReferee === '1st' ? interview[report.interview.interview1ref] : interview[report.interview.interview2ref] }</span>
                    { user.admin && <span className={ results.interview.result >= 0 ? 'bonus' : 'penalty'}>{ results.interview.result }</span> }
                    { user.admin && 
                        <>
                            <span>Note</span>
                            <span className="col-span-2">{ report.interview.interview_notes }</span>
                        </>
                    }
                </div>
            </div>
            <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
                <div className="mb-4">
                    <h3 className="generic-title">Eventi particolari e potenzialità</h3>
                </div>
                <div className="mb-2 grid grid-cols-2 gap-2 content-center">
                    <span>Valutazione prestazioni arbitrali</span>
                    <span>{ showReferee === '1st' ? votes[report.events.finalvote1ref] : votes[report.events.finalvote2ref] }</span>
                </div>
            </div>
        </div>
    )
}

export default ReportPreview;