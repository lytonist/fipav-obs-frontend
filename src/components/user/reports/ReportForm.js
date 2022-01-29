import React, { useEffect, useState } from "react";
import { serviceProvider as API } from "../../../API/api";

// Context
import { useAuth } from "../../../contexts/userContext";

function manageInput (e, sector, setReport) {
    const { id, value } = e.currentTarget;
    setReport(prevState => ({
        ...prevState,
        [sector]: { 
            ...prevState[sector], 
            [id]: value
        }
    }));
}

const ThreeOptions = ({ id, value, handleChange }) => (
    <select 
        id={ id } 
        value={ value }
        onChange={ handleChange } 
        className="form-select text-sm"
    >
        <option value="2">Positivo</option>
        <option value="1">Parz. Carente</option>
        <option value="0">Carente</option>
    </select>
)

const FourOptions = ({ id, value, handleChange }) => (
    <select 
        id={ id }
        value={ value }
        onChange={ handleChange } 
        className="form-select text-sm"
    >
        <option value="3">Ottimo</option>
        <option value="2">Positivo</option>
        <option value="1">Parz. Carente</option>
        <option value="0">Carente</option>
    </select>
)

const DifficOptions = ({ id, value, handleChange }) => (
    <select 
        id={ id }
        value={ value}
        onChange={ handleChange } 
        className="form-select text-sm"
    >
        <option value="3">Difficile</option>
        <option value="2">Medio-Alta</option>
        <option value="1">Medio-Bassa</option>
        <option value="0">Facile</option>
    </select>
)

const FaultSelect = ({ id, value, handleChange }) => (
    <select 
        id={ id }
        value={ value }
        onChange={ handleChange } 
        className="form-select text-sm"
    >
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3+</option>
    </select>
)

const RefereesSelect = ({id, value, handleChange, referees, classList}) => {
    const options = referees.map(ref =>
        <option value={ref._id} key={ref._id}>{ref.lastname} {ref.firstname}</option>
    );
    return <select id={id} value={value} onChange={handleChange} className={classList}>{options}</select>
}

const blankReport = {
    // Dati Generali
    general: {
        author: '',
        match_num: '',
        series: 'CM',
        date: '',
        time: '',
        real_time: '',
        teams: '',
        first_ref: '', // ObjectId
        second_ref: '', // ObjectId
        scorer: '',
    },
    // Dati Gara
    match: {
        result: '0-0',
        duration: '',
        spects: '',
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
        gest_difficulty: 3,
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

const GeneralArea = ({ report, setReport }) => {
    const [ referees, setReferees ] = useState([]);
    const [ user ] = useAuth();

    useEffect(() => {
        API.get('referees', true)
            .then(res => {
                res.success && setReferees(res.referees);
            });
    }, [setReferees]);

    useEffect(() => {
        // Setta l'autore del rapporto in bianco sull'attuale utente
        setReport(prevState => ({
            ...prevState,
            general: {
                ...prevState.general,
                author: user._id
            }
        }))
    }, [setReport, user._id]);
    
    const handleChange = e => {
        manageInput(e, 'general', setReport);
    }

    return (
        <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <h3 className="generic-title">Dati Generali</h3>
            </div>
            <div className="mb-2 grid grid-cols-3 md:grid-cols-5 gap-4">
                <div>
                    <label htmlFor="match_num" className="form-label dark:text-gray-300">Gara n.</label>
                    <input 
                        type="text" 
                        id="match_num"
                        value={ report.general.match_num } 
                        onChange={ handleChange }
                        className="block p-2 w-full form-input" 
                    />
                </div>
                <div>
                    <label htmlFor="series" className="form-label dark:text-gray-300">Serie</label>
                    <select 
                        id="series" 
                        value={ report.general.series }
                        onChange={ handleChange }
                        className="form-select text-sm"
                    >
                        <option value="CM">C/M</option>
                        <option value="CF">C/F</option>
                        <option value="DM">D/M</option>
                        <option value="DF">D/F</option>
                        <option value="CSM">Coppa Sicilia / M</option>
                        <option value="CSF">Coppa Sicilia / F</option>
                        <option value="U18M">U18/M</option>
                        <option value="U18F">U18/F</option>
                        <option value="U16M">U16/M</option>
                        <option value="U16F">U16/F</option>
                        <option value="U14M">U14/M</option>
                        <option value="PCM">Playoff C/M</option>
                        <option value="PCF">Playoff C/F</option>
                        <option value="PDM">Playoff D/M</option>
                        <option value="PDF">Playoff D/F</option>
                        <option value="OUTCM">Playout C/M</option>
                        <option value="OUTCF">Playout C/F</option>
                        <option value="OUTDM">Playout D/M</option>
                        <option value="OUTDF">Playout D/F</option>
                        <option value="FPCM">Fin. Playoff C/M</option>
                        <option value="FPCF">Fin. Playoff C/F</option>
                        <option value="FPDM">Fin. Playoff D/M</option>
                        <option value="FPDF">Fin. Playoff D/F</option>
                        <option value="FU18M">Fin. U18/M</option>
                        <option value="FU18F">Fin. U18/F</option>
                        <option value="FU16M">Fin. U16/M</option>
                        <option value="FU16F">Fin. U16/F</option>
                        <option value="FU14M">Fin. U14/M</option>
                        <option value="FU14F">Fin. U14/F</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className="form-label dark:text-gray-300">Data</label>
                    <input 
                        type="text" 
                        id="date" 
                        value={ report.general.date }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input" 
                    />
                </div>
                <div>
                    <label htmlFor="time" className="form-label dark:text-gray-300">Ora prev.</label>
                    <input 
                        type="text" 
                        id="time"
                        value={ report.general.time }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input" 
                    />
                </div>
                <div>
                    <label htmlFor="real_time" className="form-label dark:text-gray-300">Ora eff.</label>
                    <input 
                        type="text" 
                        id="real_time"
                        value={ report.general.real_time }
                        onChange={ handleChange } 
                        className="block p-2 w-full form-input" 
                    />
                </div>
            </div>
            <div className="mb-2">
                <div>
                    <label htmlFor="teams" className="form-label dark:text-gray-300">Squadre (come da calendario)</label>
                    <input 
                        type="text" 
                        id="teams"
                        value={ report.general.teams }
                        onChange={ handleChange } 
                        className="block p-2 w-full form-input" 
                    />
                </div>
            </div>
            <div className="mb-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="first_ref" className="form-label dark:text-gray-300">Primo Arbitro</label>
                    <RefereesSelect
                        id="first_ref"
                        referees={ referees }
                        value={ report.general.first_ref }
                        handleChange={ handleChange }
                        classList="block p-2 w-full form-input" 
                    />
                </div>
                <div>
                    <label htmlFor="second_ref" className="form-label dark:text-gray-300">Secondo Arbitro</label>
                    <RefereesSelect
                        id="second_ref"
                        referees={ referees }
                        value={ report.general.second_ref }
                        handleChange={ handleChange }
                        classList="block p-2 w-full form-input" 
                    />
                </div>
                <div>
                    <label htmlFor="scorer" className="form-label dark:text-gray-300">Segnapunti</label>
                    <input type="text" id="scorer" className="block p-2 w-full form-input" />
                </div>
            </div>
        </div>
    )
}

const MatchArea = ({ report, setReport }) => {

    const handleChange = e => {
        manageInput(e, 'match', setReport);
    }
    
    return (
        <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <h3 className="generic-title">Dati Gara</h3>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4">
                <div>
                    <label htmlFor="result" className="form-label dark:text-gray-300">Risultato</label>
                    <input 
                        type="text" 
                        id="result"
                        value={ report.match.result }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="duration" className="form-label dark:text-gray-300">Durata Totale</label>
                    <input 
                        type="text" 
                        id="duration"
                        value={ report.match.duration }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
                <div>
                    <label htmlFor="spects" className="form-label dark:text-gray-300">Spettatori</label>
                    <input 
                        type="text" 
                        id="spects"
                        value={ report.match.spects }
                        onChange={ handleChange } 
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1 md:gap-4">
                <label className="form-label dark:text-gray-300">Set</label>
                <label className="form-label dark:text-gray-300">1°</label>
                <label className="form-label dark:text-gray-300">2°</label>
                <label className="form-label dark:text-gray-300">3°</label>
                <label className="form-label dark:text-gray-300">4°</label>
                <label className="form-label dark:text-gray-300">5°</label>
                <label className="form-label dark:text-gray-300">Sp.</label>
            </div>
            <div className="mb-2 grid grid-cols-7 gap-1 md:gap-4 items-center">
                <label className="truncate">Punteggio</label>
                <input type="text" id="pts1set" value={ report.match.pts1set } onChange={ handleChange } className="block p-2 w-full form-input text-sm" />
                <input type="text" id="pts2set" value={ report.match.pts2set } onChange={ handleChange } className="block p-2 w-full form-input text-sm" />
                <input type="text" id="pts3set" value={ report.match.pts3set } onChange={ handleChange } className="block p-2 w-full form-input text-sm" />
                <input type="text" id="pts4set" value={ report.match.pts4set } onChange={ handleChange } className="block p-2 w-full form-input text-sm" />
                <input type="text" id="pts5set" value={ report.match.pts5set } onChange={ handleChange } className="block p-2 w-full form-input text-sm" />
                <input type="text" id="pts6set" value={ report.match.pts6set } onChange={ handleChange } className="block p-2 w-full form-input text-sm" />
            </div>
            <div className="mb-2 grid grid-cols-7 gap-1 md:gap-4 items-center">
                <label className="truncate">Durata</label>
                <input type="number" id="dur1set" value={ report.match.dur1set } onChange={ handleChange } className="block p-2 w-full form-input text-sm" />
                <input type="number" id="dur2set" value={ report.match.dur2set } onChange={ handleChange } className="block p-2 w-full form-input text-sm" />
                <input type="number" id="dur3set" value={ report.match.dur3set } onChange={ handleChange } className="block p-2 w-full form-input text-sm" />
                <input type="number" id="dur4set" value={ report.match.dur4set } onChange={ handleChange } className="block p-2 w-full form-input text-sm" />
                <input type="number" id="dur5set" value={ report.match.dur5set } onChange={ handleChange } className="block p-2 w-full form-input text-sm" />
                <input type="number" id="dur6set" value={ report.match.dur6set } onChange={ handleChange } className="block p-2 w-full form-input text-sm" />
            </div>
        </div>
    )
}

const ImageArea = ({ report, setReport }) => {

    const handleChange = e => {
        manageInput(e, 'image', setReport);
    }

    return (
        <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <h3 className="generic-title">Area Immagine</h3>
            </div>
            <div className="grid grid-cols-3 gap-1 md:gap-4 items-center">
                <label></label>
                <label className="form-label dark:text-gray-300">1° Arbitro</label>
                <label className="form-label dark:text-gray-300">2° Arbitro</label>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 md:gap-4 items-center">
                <label className="truncate">Aspetto Adeguato</label>
                <ThreeOptions 
                    id="aspect1ref" 
                    value={ report.image.aspect1ref } 
                    handleChange={ handleChange } 
                />
                <ThreeOptions 
                    id="aspect2ref" 
                    value={ report.image.aspect2ref } 
                    handleChange={ handleChange } 
                />
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 md:gap-4 items-center">
                <label className="truncate">Ritardato arrivo presso l'impianto</label>
                <select 
                    id="delay1ref"
                    value={ report.image.delay1ref }
                    onChange={ handleChange } 
                    className="form-select text-sm"
                >
                    <option value="2">No</option>
                    <option value="1">Sì, fino a 10'</option>
                    <option value="0">Sì, oltre 10'</option>
                </select>
                <select 
                    id="delay2ref"
                    value={ report.image.delay2ref }
                    onChange={ handleChange }
                    className="form-select text-sm"
                >
                    <option value="2">No</option>
                    <option value="1">Sì, fino a 10'</option>
                    <option value="0">Sì, oltre 10'</option>
                </select>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 md:gap-4 items-center">
                <label className="truncate">Fasi protocollari (tutte)</label>
                <ThreeOptions 
                    id="prot1ref"
                    value={ report.image.prot1ref } 
                    handleChange={ handleChange }
                />
                <ThreeOptions 
                    id="prot2ref"
                    value={ report.image.prot2ref } 
                    handleChange={ handleChange } 
                />
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 md:gap-4 items-center">
                <label className="truncate">Fischio, segnaletica e postura</label>
                <ThreeOptions 
                    id="whistle1ref"
                    value={ report.image.whistle1ref } 
                    handleChange={ handleChange } 
                />
                <ThreeOptions 
                    id="whistle2ref" 
                    value={ report.image.whistle2ref } 
                    handleChange={ handleChange } 
                />
            </div>
            <div className="mb-4 grid grid-cols-3 gap-1 md:gap-4 items-center">
                <label className="truncate">Gestione istanze</label>
                <ThreeOptions 
                    id="complaint1ref"
                    value={ report.image.complaint1ref } 
                    handleChange={ handleChange } 
                />
                <ThreeOptions 
                    id="complaint2ref"
                    value={ report.image.complaint2ref } 
                    handleChange={ handleChange } 
                />
            </div>
            <div className="mb-2">
                <label htmlFor="image_notes" className="form-label dark:text-gray-300">Note</label>
                <textarea 
                    id="image_notes" 
                    rows="4" 
                    value={ report.image.image_notes }
                    onChange={ handleChange }
                    className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>
        </div>
    )
}

const TechnicalArea = ({ report, setReport }) => {

    const handleChange = e => {
        manageInput(e, 'technical', setReport);
    }
    
    return (
        <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <h3 className="generic-title">Area Tecnica</h3>
            </div>
            <div className="mb-2 grid grid-cols-4 gap-1 items-center">
                <label htmlFor="complexity" className="form-label dark:text-gray-300">Complessità Tecnica</label>
                <label></label>
                <label className="form-label dark:text-gray-300">1° Arbitro</label>
                <label className="form-label dark:text-gray-300">2° Arbitro</label>
            </div>
            <div className="mb-4 grid grid-cols-4 gap-1 items-center">
                <span>
                    <DifficOptions 
                        id="complexity"
                        value={ report.technical.complexity }
                        handleChange={ handleChange } 
                    />
                </span>
                <label className="text-right">Tecnica Arbitrale</label>
                <FourOptions 
                    id="tech1ref"
                    value={ report.technical.tech1ref } 
                    handleChange={ handleChange }
                />
                <FourOptions 
                    id="tech2ref"
                    value={ report.technical.tech2ref } 
                    handleChange={ handleChange }
                />
            </div>
            <div className="mb-2">
                <h3 className="generic-title text-sm">Errori</h3>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 text-center items-center">
                <label></label>
                <label className="form-label generic-title text-sm dark:text-gray-300">Ordinari</label>
                <label className="form-label generic-title text-sm dark:text-gray-300">Gravi e/o Determ.</label>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 text-center items-center">
                <label></label>
                <div className="grid grid-cols-2">
                    <label className="form-label dark:text-gray-300">1° Arb.</label>
                    <label className="form-label dark:text-gray-300">2° Arb.</label>
                </div>
                <div className="grid grid-cols-2">
                    <label className="form-label dark:text-gray-300">1° Arb.</label>
                    <label className="form-label dark:text-gray-300">2° Arb.</label>
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Palle Dentro / Fuori</label>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="ballsinout_ord_1ref"
                        value={ report.technical.ballsinout_ord_1ref }
                        onChange={ handleChange } 
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input 
                        type="number" 
                        id="ballsinout_ord_2ref"
                        value={ report.technical.ballsinout_ord_2ref }
                        onChange={ handleChange } 
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="ballsinout_sev_1ref"
                        value={ report.technical.ballsinout_sev_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input 
                        type="number" 
                        id="ballsinout_sev_2ref"
                        value={ report.technical.ballsinout_sev_2ref }
                        onChange={ handleChange } 
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Tocchi di Palla</label>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="balltouches_ord_1ref"
                        value={ report.technical.balltouches_ord_1ref }
                        onChange={ handleChange } 
                        className="block p-2 w-full form-input text-sm" 
                        />
                    <input type="number" className="block p-2 w-full form-input-disabled text-sm" disabled />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="balltouches_sev_1ref"
                        value={ report.technical.balltouches_sev_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm"
                    />
                    <input type="number" className="block p-2 w-full form-input-disabled text-sm" disabled />
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">1° Tocco di Squadra</label>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="firsttouch_ord_1ref"
                        value={ report.technical.firsttouch_ord_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input type="number" className="block p-2 w-full form-input-disabled text-sm" disabled />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="firsttouch_sev_1ref"
                        value={ report.technical.firsttouch_sev_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input type="number" className="block p-2 w-full form-input-disabled text-sm" disabled />
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Penetrazione spazio sotto rete</label>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="penetration_ord_1ref" 
                        value={ report.technical.penetration_ord_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input 
                        type="number" 
                        id="penetration_ord_2ref" 
                        value={ report.technical.penetration_ord_2ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="penetration_sev_1ref" 
                        value={ report.technical.penetration_sev_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input 
                        type="number" 
                        id="penetration_sev_2ref" 
                        value={ report.technical.penetration_sev_2ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Falli di posizione / rotazione</label>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="posfaults_ord_1ref" 
                        value={ report.technical.posfaults_ord_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input 
                        type="number" 
                        id="posfaults_ord_2ref" 
                        value={ report.technical.posfaults_ord_2ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="posfaults_sev_1ref" 
                        value={ report.technical.posfaults_sev_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input 
                        type="number" 
                        id="posfaults_sev_2ref" 
                        value={ report.technical.posfaults_sev_2ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Tocchi di rete</label>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="nettouches_ord_1ref" 
                        value={ report.technical.nettouches_ord_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input 
                        type="number" 
                        id="nettouches_ord_2ref" 
                        value={ report.technical.nettouches_ord_2ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="nettouches_sev_1ref" 
                        value={ report.technical.nettouches_sev_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input 
                        type="number" 
                        id="nettouches_sev_2ref" 
                        value={ report.technical.nettouches_sev_2ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Tocchi di muro e 4 tocchi</label>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="walltouches_ord_1ref" 
                        value={ report.technical.walltouches_ord_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input 
                        type="number" 
                        id="walltouches_ord_2ref" 
                        value={ report.technical.walltouches_ord_2ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm"
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input
                        type="number" 
                        id="walltouches_sev_1ref" 
                        value={ report.technical.walltouches_sev_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input
                        type="number" 
                        id="walltouches_sev_2ref" 
                        value={ report.technical.walltouches_sev_2ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Gioco aereo</label>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="airplay_ord_1ref" 
                        value={ report.technical.airplay_ord_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input type="number" className="block p-2 w-full form-input-disabled text-sm" disabled />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="airplay_sev_1ref" 
                        value={ report.technical.airplay_sev_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input type="number" className="block p-2 w-full form-input-disabled text-sm" disabled />
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Attacchi / Muro difensori</label>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="defensefaults_ord_1ref" 
                        value={ report.technical.defensefaults_ord_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input 
                        type="number" 
                        id="defensefaults_ord_2ref" 
                        value={ report.technical.defensefaults_ord_2ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input
                        type="number"
                        id="defensefaults_sev_1ref" 
                        value={ report.technical.defensefaults_sev_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input 
                        type="number" 
                        id="defensefaults_sev_2ref" 
                        value={ report.technical.defensefaults_sev_2ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Falli di servizio</label>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="servefaults_ord_1ref" 
                        value={ report.technical.servefaults_ord_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input type="number" className="block p-2 w-full form-input-disabled text-sm" disabled />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="servefaults_sev_1ref" 
                        value={ report.technical.servefaults_sev_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input type="number" className="block p-2 w-full form-input-disabled text-sm" disabled />
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Falli del libero</label>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="liberofaults_ord_1ref" 
                        value={ report.technical.liberofaults_ord_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input 
                        type="number" 
                        id="liberofaults_ord_2ref" 
                        value={ report.technical.liberofaults_ord_2ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="liberofaults_sev_1ref" 
                        value={ report.technical.liberofaults_sev_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input 
                        type="number" 
                        id="liberofaults_sev_2ref" 
                        value={ report.technical.liberofaults_sev_2ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Altri falli</label>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="otherfaults_ord_1ref"
                        value={ report.technical.otherfaults_ord_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input 
                        type="number" 
                        id="otherfaults_ord_2ref" 
                        value={ report.technical.otherfaults_ord_2ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="otherfaults_sev_1ref" 
                        value={ report.technical.otherfaults_sev_1ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                    <input 
                        type="number" 
                        id="otherfaults_sev_2ref" 
                        value={ report.technical.otherfaults_sev_2ref }
                        onChange={ handleChange }
                        className="block p-2 w-full form-input text-sm" 
                    />
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="error_notes" className="form-label dark:text-gray-300">Note</label>
                <textarea 
                    id="error_notes" 
                    rows="4" 
                    value={ report.technical.error_notes }
                    onChange={ handleChange }
                    className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label></label>
                <label className="form-label dark:text-gray-300">1° Arbitro</label>
                <label className="form-label dark:text-gray-300">2° Arbitro</label>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Collaborazione tecnica</label>
                <FourOptions 
                    id="collab1ref"
                    value={ report.technical.collab1ref }
                    handleChange={ handleChange } 
                />
                <FourOptions 
                    id="collab2ref"
                    value={ report.technical.collab2ref }
                    handleChange={ handleChange } 
                />
            </div>
            <div className="mb-2">
                <label htmlFor="collab_notes" className="form-label dark:text-gray-300">Note</label>
                <textarea 
                    id="collab_notes" 
                    rows="4" 
                    value={ report.technical.collab_notes }
                    onChange={ handleChange }
                    className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>
        </div>
    )
}

const RelArea = ({ report, setReport }) => {

    const handleChange = e => {
        manageInput(e, 'relational', setReport);
    }

    return (
        <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <h3 className="generic-title">Area Relazionale</h3>
            </div>
            <div className="mb-4">
                <div>
                    <label htmlFor="gest_difficulty" className="form-label dark:text-gray-300">Complessità gestionale</label>
                    <DifficOptions 
                        id="gest_difficulty"
                        value={ report.relational.gest_difficulty }
                        handleChange={ handleChange } 
                    />
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label></label>
                <label className="form-label dark:text-gray-300">1° Arbitro</label>
                <label className="form-label dark:text-gray-300">2° Arbitro</label>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Gestione e Autorevolezza</label>
                <FourOptions 
                    id="gest1ref"
                    value={ report.relational.gest1ref }
                    handleChange={ handleChange } 
                />
                <FourOptions 
                    id="gest2ref"
                    value={ report.relational.gest2ref }
                    handleChange={ handleChange } 
                />
            </div>
            <div className="mb-4 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Livello di concentrazione (era in linea con l'evento?)</label>
                <FourOptions 
                    id="conc1ref" 
                    value={ report.relational.conc1ref }
                    handleChange={ handleChange }
                />
                <FourOptions 
                    id="conc2ref" 
                    value={ report.relational.conc2ref }
                    handleChange={ handleChange }
                />
            </div>
            <div className="mb-2">
                <label htmlFor="rel_notes" className="form-label dark:text-gray-300">Note</label>
                <textarea 
                    id="rel_notes" 
                    rows="4" 
                    value={ report.relational.rel_notes }
                    onChange={ handleChange }
                    className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>
        </div>
    )
}

const DisciplineArea = ({ report, setReport }) => {

    const handleChange = e => {
        manageInput(e, 'discipline', setReport);
    }

    return (
        <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <h3 className="generic-title">Area Disciplinare</h3>
            </div>
            <div className="mb-4">
                <div>
                    <label htmlFor="gest_difficulty" className="form-label dark:text-gray-300">Complessità disciplinare</label>
                    <DifficOptions
                        id="gest_difficulty"
                        value={ report.discipline.gest_difficulty }
                        handleChange={ handleChange } 
                    />
                </div>
            </div>
            <div className="mb-4 grid grid-cols-3 md:grid-cols-5 gap-1 items-center">
                <div>
                    <label htmlFor="d_verbals" className="form-label dark:text-gray-300">Avv. verbali</label>
                    <FaultSelect 
                        id="d_verbals"
                        value={ report.discipline.d_verbals }
                        handleChange={ handleChange } 
                    />
                </div>
                <div>
                    <label htmlFor="d_officials" className="form-label dark:text-gray-300">Avv. ufficiali</label>
                    <FaultSelect 
                        id="d_officials" 
                        value={ report.discipline.d_officials }
                        handleChange={ handleChange }
                    />
                </div>
                <div>
                    <label htmlFor="d_penals" className="form-label dark:text-gray-300">Penalizzazioni</label>
                    <FaultSelect 
                        id="d_penals"
                        value={ report.discipline.d_penals }
                        handleChange={ handleChange }
                    />
                </div>
                <div>
                    <label htmlFor="d_expulsions" className="form-label dark:text-gray-300">Espulsioni</label>
                    <FaultSelect 
                        id="d_expulsions"
                        value={ report.discipline.d_expulsions }
                        handleChange={ handleChange }
                    />
                </div>
                <div>
                    <label htmlFor="d_squalifications" className="form-label dark:text-gray-300">Squalifiche</label>
                    <FaultSelect 
                        id="d_squalifications"
                        value={ report.discipline.d_squalifications }
                        handleChange={ handleChange }
                    />
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label></label>
                <label className="form-label dark:text-gray-300">1° Arbitro</label>
                <label className="form-label dark:text-gray-300">2° Arbitro</label>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Amministrazione della disciplina</label>
                <FourOptions 
                    id="discipline" 
                    value={ report.discipline.discipline }
                    handleChange={ handleChange }
                />
                <select className="block p-2 w-full form-input-disabled text-sm" disabled />
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Interazione disciplinare</label>
                <select className="block p-2 w-full form-input-disabled text-sm" disabled />
                <FourOptions
                    id="disc_interation"
                    value={ report.discipline.disc_interation }
                    handleChange={ handleChange }
                />
            </div>
            <div className="mb-4 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Richieste improprie e ritardi di gioco</label>
                <FourOptions
                    id="delays1ref"
                    value={ report.discipline.delays1ref }
                    handleChange={ handleChange }
                />
                <FourOptions
                    id="delays2ref"
                    value={ report.discipline.delays2ref }
                    handleChange={ handleChange }
                />
            </div>
            <div className="mb-2">
                <label htmlFor="disc_notes" className="form-label dark:text-gray-300">Note</label>
                <textarea 
                    id="disc_notes" 
                    rows="4" 
                    value={ report.discipline.disc_notes }
                    onChange={ handleChange }
                    className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>
        </div>
    )
}

const InterviewArea = ({ report, setReport }) => {

    const handleChange = e => {
        manageInput(e, 'interview', setReport);
    }

    return (
        <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <h3 className="generic-title">Colloquio</h3>
            </div>
            <div className="grid grid-cols-3 gap-1 items-center">
                <label></label>
                <label className="form-label dark:text-gray-300">1° Arbitro</label>
                <label className="form-label dark:text-gray-300">2° Arbitro</label>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Reattività al colloquio</label>
                <select 
                    id="interview1ref" 
                    value={ report.interview.interview1ref }
                    onChange={ handleChange } 
                    className="form-select text-sm"
                >
                    <option value="2">Nella norma</option>
                    <option value="1">Zelante e/o polemico</option>
                    <option value="0">Disattento e/o distratto</option>
                </select>
                <select 
                    id="interview2ref" 
                    value={ report.interview.interview2ref }
                    onChange={ handleChange }
                    className="form-select text-sm"
                >
                    <option value="2">Nella norma</option>
                    <option value="1">Zelante e/o polemico</option>
                    <option value="0">Disattento e/o distratto</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="interview_notes" className="form-label dark:text-gray-300">Motivazioni fornite dagli arbitri in relazione ai rilievi</label>
                <textarea 
                    id="interview_notes" 
                    rows="4" 
                    value={ report.interview.interview_notes }
                    onChange={ handleChange }
                    className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>
        </div>
    )
}

const EventsArea = ({ report, setReport }) => {
    
    const handleChange = e => {
        manageInput(e, 'events', setReport);
    }

    return (
        <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <h3 className="generic-title">Eventi particolari e potenzialità</h3>
            </div>
            <div className="grid grid-cols-3 gap-1 items-center">
                <label></label>
                <label className="form-label dark:text-gray-300">1° Arbitro</label>
                <label className="form-label dark:text-gray-300">2° Arbitro</label>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Valutazione prestazioni arbitrali</label>
                <select 
                    id="finalvote1ref" 
                    value={ report.events.finalvote1ref }
                    onChange={ handleChange } 
                    className="form-select text-sm"
                >
                    <option value="4">Eccellente</option>
                    <option value="3">Buona</option>
                    <option value="2">Media</option>
                    <option value="1">Parz. carente</option>
                    <option value="0">Insoddisfacente</option>
                </select>
                <select 
                    id="finalvote2ref" 
                    value={ report.events.finalvote2ref }
                    onChange={ handleChange }
                    className="form-select text-sm"
                >
                    <option value="4">Eccellente</option>
                    <option value="3">Buona</option>
                    <option value="2">Media</option>
                    <option value="1">Parz. carente</option>
                    <option value="0">Insoddisfacente</option>
                </select>
            </div>
        </div>
    )
}

function ReportForm () {
    const [ report, setReport ] = useState(blankReport);

    return (
        <div className="container flex">
            <form>
                <GeneralArea    report={ report } setReport={ setReport} />
                <MatchArea      report={ report } setReport={ setReport} />
                <ImageArea      report={ report } setReport={ setReport} />
                <TechnicalArea  report={ report } setReport={ setReport} />
                <RelArea        report={ report } setReport={ setReport} />
                <DisciplineArea report={ report } setReport={ setReport} />
                <InterviewArea  report={ report } setReport={ setReport} />
                <EventsArea     report={ report } setReport={ setReport} />
            </form>
        </div>
    )
}

export default ReportForm;