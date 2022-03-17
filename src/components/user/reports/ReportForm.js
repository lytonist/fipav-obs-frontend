import React, { useEffect, useState } from "react";
import { serviceProvider as API } from "../../../API/api";

// Context
import { useAuth } from "../../../contexts/userContext";

//
//* Validating Inputs *//
//
import validateInput from "../../../lib/validateUtils";

const checks = [
    // General
    { field: 'match_num', tests: ['notEmpty'] },
    { field: 'series', tests: ['notEmpty'] },
    { field: 'date', tests: ['notEmpty'] },
    { field: 'time', tests: ['notEmpty', 'isTime'] },
    { field: 'real_time', tests: ['notEmpty', 'isTime'] },
    { field: 'teams', tests: ['notEmpty'] },
    { field: 'first_ref', tests: ['notEmpty'] },
    { field: 'second_ref', tests: ['allowEmpty'] },
    { field: 'scorer', tests: ['notEmpty'] },
    // Match
    { field: 'result', tests: ['notEmpty', 'isValidResult'] },
    { field: 'duration', tests: ['notEmpty', 'isNumber'] },
    { field: 'spects', tests: ['notEmpty', 'isNumber'] },
    { field: 'pts1set', tests: ['notEmpty', 'standardSet'] },
    { field: 'pts2set', tests: ['notEmpty', 'standardSet']},
    { field: 'pts3set', tests: ['notEmpty', 'standardSet'] },
    { field: 'pts4set', tests: ['allowEmpty', 'standardSet'] },
    { field: 'pts5set', tests: ['allowEmpty', 'finalSet'] },
    { field: 'pts6set', tests: ['allowEmpty', 'finalSet'] },
    { field: 'dur1set', tests: ['notEmpty', 'isNumber'] },
    { field: 'dur2set', tests: ['notEmpty', 'isNumber'] },
    { field: 'dur3set', tests: ['notEmpty', 'isNumber'] },
    { field: 'dur4set', tests: ['allowEmpty', 'isNumber'] },
    { field: 'dur5set', tests: ['allowEmpty', 'isNumber'] },
    { field: 'dur6set', tests: ['allowEmpty', 'isNumber'] },
    // Image
    { field: 'aspect1ref', tests: ['notEmpty'] },
    { field: 'aspect2ref', tests: ['notEmpty'] },
    { field: 'delay1ref', tests: ['notEmpty'] },
    { field: 'delay2ref', tests: ['notEmpty'] },
    { field: 'prot1ref', tests: ['notEmpty'] },
    { field: 'prot2ref', tests: ['notEmpty'] },
    { field: 'whistle1ref', tests: ['notEmpty'] },
    { field: 'whistle2ref', tests: ['notEmpty'] },
    { field: 'complaint1ref', tests: ['notEmpty'] },
    { field: 'complaint2ref', tests: ['notEmpty'] },
    { field: 'image_notes', tests: ['allowEmpty', 'maxLength'] },
    // Technical
    { field: 'complexity', tests: ['notEmpty'] },
    { field: 'tech1ref', tests: ['notEmpty'] },
    { field: 'tech2ref', tests: ['notEmpty'] },
    { field: 'ballsinout_ord_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'ballsinout_ord_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'ballsinout_sev_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'ballsinout_sev_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'balltouches_ord_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'balltouches_sev_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'firsttouch_ord_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'firsttouch_sev_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'penetration_ord_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'penetration_ord_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'penetration_sev_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'penetration_sev_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'posfaults_ord_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'posfaults_ord_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'posfaults_sev_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'posfaults_sev_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'nettouches_ord_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'nettouches_ord_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'nettouches_sev_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'nettouches_sev_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'walltouches_ord_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'walltouches_ord_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'walltouches_sev_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'walltouches_sev_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'airplay_ord_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'airplay_sev_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'defensefaults_ord_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'defensefaults_ord_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'defensefaults_sev_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'defensefaults_sev_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'servefaults_ord_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'servefaults_sev_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'liberofaults_ord_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'liberofaults_ord_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'liberofaults_sev_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'liberofaults_sev_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'otherfaults_ord_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'otherfaults_ord_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'otherfaults_sev_1ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'otherfaults_sev_2ref', tests: ['notEmpty', 'isNumber'] },
    { field: 'error_notes', tests: ['allowEmpty', 'maxLength'] },
    { field: 'collab1ref', tests: ['notEmpty'] },
    { field: 'collab2ref', tests: ['notEmpty'] },
    { field: 'collab_notes', tests: ['allowEmpty', 'maxLength'] },
    // Relational
    { field: 'gest_difficulty', tests: ['notEmpty'] },
    { field: 'gest1ref', tests: ['notEmpty'] },
    { field: 'gest2ref', tests: ['notEmpty'] },
    { field: 'conc1ref', tests: ['notEmpty'] },
    { field: 'conc2ref', tests: ['notEmpty'] },
    { field: 'rel_notes', tests: ['allowEmpty', 'maxLength'] },
    // Discipline
    { field: 'gest_discipline', tests: ['notEmpty'] },
    { field: 'd_verbals', tests: ['notEmpty', 'isNumber'] },
    { field: 'd_officials', tests: ['notEmpty', 'isNumber'] },
    { field: 'd_penals', tests: ['notEmpty', 'isNumber'] },
    { field: 'd_expulsions', tests: ['notEmpty', 'isNumber'] },
    { field: 'd_squalifications', tests: ['notEmpty', 'isNumber'] },
    { field: 'discipline', tests: ['notEmpty'] },
    { field: 'disc_interation', tests: ['notEmpty'] },
    { field: 'delays1ref', tests: ['notEmpty'] },
    { field: 'delays2ref', tests: ['notEmpty'] },
    { field: 'disc_notes', tests: ['allowEmpty', 'maxLength'] },
    // Interview
    { field: 'interview1ref', tests: ['notEmpty'] },
    { field: 'interview2ref', tests: ['notEmpty'] },
    { field: 'interview_notes', tests: ['allowEmpty', 'maxLength'] },
    // Events
    { field: 'finalvote1ref', tests: ['notEmpty'] },
    { field: 'finalvote2ref', tests: ['notEmpty'] }
];

function checkInput(inputId, value) {
    const inputCheck = checks.find(el => el.field === inputId);
    if (!inputCheck) return { success: true };
    return validateInput(value, inputCheck.tests);
}

function confirmBlur(test, inputId, setError, setStyle) {
    if (test.success) {
        setError(undefined);
        setStyle(prevState => ({
            ...prevState,
            [inputId]: 'form-input-success'
        }));
    } else {
        setError(test.msg);
        setStyle(prevState => ({
            ...prevState,
            [inputId]: 'form-input-danger'
        }));
    }
}

function finalValidate(groupArea, setError, setStyle, setTesting) {
    Object.entries(groupArea).forEach(([key, value]) => {
        const test = checkInput(key, value);
        confirmBlur(test, key, setError, setStyle);
        setTesting(prevState => ({
            ...prevState,
            validationResults: [
                ...prevState.validationResults, test.success
            ]
        }));
    });
}

// Controlled Inputs
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

//
//* Secondary Components *//
//
const ThreeOptions = ({ id, value, handleChange, handleBlur, classList }) => (
    <select 
        id={ id } 
        value={ value }
        onChange={ handleChange } 
        onBlur={ handleBlur }
        className={ classList }
    >
        <option value="2">Positivo</option>
        <option value="1">Parz. Carente</option>
        <option value="0">Carente</option>
    </select>
)

const FourOptions = ({ id, value, handleChange, handleBlur, classList }) => (
    <select 
        id={ id }
        value={ value }
        onChange={ handleChange } 
        onBlur={ handleBlur }
        className={ classList }
    >
        <option value="3">Ottimo</option>
        <option value="2">Positivo</option>
        <option value="1">Parz. Carente</option>
        <option value="0">Carente</option>
    </select>
)

const DifficOptions = ({ id, value, handleChange, handleBlur, classList }) => (
    <select 
        id={ id }
        value={ value}
        onChange={ handleChange } 
        onBlur={ handleBlur }
        className={ classList }
    >
        <option value="3">Difficile</option>
        <option value="2">Medio-Alta</option>
        <option value="1">Medio-Bassa</option>
        <option value="0">Facile</option>
    </select>
)

const FaultSelect = ({ id, value, handleChange, handleBlur, classList }) => (
    <select 
        id={ id }
        value={ value }
        onChange={ handleChange } 
        onBlur={ handleBlur }
        className={ classList }
    >
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3+</option>
    </select>
)

const RefereesSelect = ({id, value, handleChange, handleBlur, referees, classList}) => {
    const options = referees.map(ref =>
        <option value={ref._id} key={ref._id}>{ref.lastname} {ref.firstname} ({ref.committee.toUpperCase()})</option>
    );
    return (
            <select 
                id={id} 
                value={value} 
                onChange={handleChange}
                onBlur={handleBlur} 
                className={classList}
            >
                <option value=''>-</option>
                {options}
            </select>
        )
}

const GeneralArea = ({ report, setReport, setTesting, testing }) => {
    const [ error, setError ] = useState();
    const [ users, setUsers ] = useState([]);
    const [ referees, setReferees ] = useState([]);
    const [ style, setStyle ] = useState({
        author: undefined,
        match_num: undefined, 
        series: undefined, 
        date: undefined,
        time: undefined,
        real_time: undefined,
        teams: undefined,
        first_ref: undefined,
        second_ref: undefined,
        scorer: undefined
    });
    const [ user ] = useAuth();

    // Validating input
    function handleBlur(e) {
        const inputId = e.currentTarget.id;
        const value = e.currentTarget.value;
        const test = checkInput(inputId, value);
        confirmBlur(test, inputId, setError, setStyle);
    }

    const handleChange = e => {
        manageInput(e, 'general', setReport);
    }

    const handleToggle = () => {
        setReport(prevState => ({
            ...prevState,
            valid: !prevState.valid
        }));
    }

    useEffect(() => {
        API.get('referees', true)
            .then(res => {
                res.success && setReferees(res.referees);
            });
    }, [setReferees]);

    useEffect(() => {
        user.admin && 
            API.get('users', true)
                .then(res => {
                    res.success && setUsers(res.users);
                });
    }, [setUsers, user.admin]);

    // Effettua tutti i test di validazione
    useEffect(() => {
        if (testing.status) {
            finalValidate(report.general, setError, setStyle, setTesting);
        }
    }, [report.general, setTesting, testing]);

    return (
        <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <h3 className="generic-title">Dati Generali</h3>
            </div>
            {
                error && (
                    <div className="danger-alert dark:bg-red-200 dark:text-red-800" role="alert">
                        <span className="font-medium">Attenzione!</span> { error }.
                    </div>
                )
            }
            {
                user.admin && (
                    <div className="mb-2 grid grid-cols-2 gap-4 items-center">
                        <div>
                            <label htmlFor="author" className="form-label dark:text-gray-300">Osservatore</label>
                            <select 
                                type="text"
                                value={ report.general.author }
                                onChange={ handleChange } 
                                onBlur={ handleBlur }
                                className={`block p-2 w-full ${style.author || 'form-input'}`} 
                            >
                                {
                                    users.map( (user, i) => <option key={`user-${i}`} value={user._id}>{user.lastname} {user.firstname[0]}.</option> )
                                }
                            </select>
                        </div>
                        <div className="mt-6">
                            <label htmlFor="all-reports" className="flex relative items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    id="all-reports" 
                                    className="sr-only" 
                                    checked={ report.valid }
                                    value={ report.valid }
                                    onChange={ handleToggle }
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full border border-gray-200 toggle-bg dark:bg-gray-700 dark:border-gray-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Omologa il Report</span>
                            </label>
                        </div>
                    </div>
                )
            }
            <div className="mb-2 grid grid-cols-3 md:grid-cols-5 gap-4 items-center">
                <div>
                    <label htmlFor="match_num" className="form-label dark:text-gray-300">Gara n.</label>
                    <input 
                        type="text" 
                        id="match_num"
                        value={ report.general.match_num } 
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.match_num || 'form-input'}`} 
                    />
                </div>
                <div>
                    <label htmlFor="series" className="form-label dark:text-gray-300">Serie</label>
                    <select 
                        id="series" 
                        value={ report.general.series }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.series || 'form-select'} text-sm`}
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
                        type="date" 
                        id="date" 
                        value={ report.general.date }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.date || 'form-input'}`} 
                    />
                </div>
                <div>
                    <label htmlFor="time" className="form-label dark:text-gray-300">Ora prev.</label>
                    <input 
                        type="text" 
                        id="time"
                        placeholder="hh:mm"
                        value={ report.general.time }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.time || 'form-input'}`} 
                    />
                </div>
                <div>
                    <label htmlFor="real_time" className="form-label dark:text-gray-300">Ora eff.</label>
                    <input 
                        type="text" 
                        id="real_time"
                        placeholder="hh:mm"
                        value={ report.general.real_time }
                        onChange={ handleChange } 
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.real_time || 'form-input'}`} 
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
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.teams || 'form-input'}`} 
                    />
                </div>
            </div>
            <div className="mb-2 grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
                <div>
                    <label htmlFor="first_ref" className="form-label dark:text-gray-300">Primo Arbitro</label>
                    <RefereesSelect
                        id="first_ref"
                        referees={ referees }
                        value={ report.general.first_ref }
                        handleChange={ handleChange }
                        handleBlur={ handleBlur }
                        classList={`block p-2 w-full ${style.first_ref || 'form-select'} text-sm`}
                    />
                </div>
                <div>
                    <label htmlFor="second_ref" className="form-label dark:text-gray-300">Secondo Arbitro</label>
                    <RefereesSelect
                        id="second_ref"
                        referees={ referees }
                        value={ report.general.second_ref }
                        handleChange={ handleChange }
                        handleBlur={ handleBlur }
                        classList={`block p-2 w-full ${style.second_ref || 'form-select'} text-sm`}
                    />
                </div>
                <div>
                    <label htmlFor="scorer" className="form-label dark:text-gray-300">Segnapunti</label>
                    <input 
                        type="text" 
                        id="scorer"
                        value={ report.general.scorer } 
                        onChange={ handleChange } 
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.scorer || 'form-input'}`} 
                    />
                </div>
            </div>
        </div>
    )
}

const MatchArea = ({ report, setReport, setTesting, testing }) => {
    const [ error, setError ] = useState();
    const [ style, setStyle ] = useState({
        result: undefined, 
        duration: undefined, 
        spects: undefined,
        pts1set: undefined,
        pts2set: undefined,
        pts3set: undefined,
        pts4set: undefined,
        pts5set: undefined,
        pts6set: undefined,
        dur1set: undefined,
        dur2set: undefined,
        dur3set: undefined,
        dur4set: undefined,
        dur5set: undefined,
        dur6set: undefined,
    });

    // Validating input
    function handleBlur(e) {
        const inputId = e.currentTarget.id;
        const value = e.currentTarget.value;
        const test = checkInput(inputId, value);
        confirmBlur(test, inputId, setError, setStyle);
    }

    function verifyresult({ result, pts1set, pts2set, pts3set, pts4set, pts5set }, setError) {
        const [ resultA, resultB ] = result.split('-');
        const setTotals = Number(resultA) + Number(resultB);
        const points = [pts1set, pts2set, pts3set, pts4set, pts5set].filter(el => el);
        if (points.length === setTotals) { // Il numero dei set coincide con il risultato inserito
            if (Number(resultA) !== points.filter(value => Number(value.split('-')[0]) > Number(value.split('-')[1])).length) return false;
            if (Number(resultB) !== points.filter(value => Number(value.split('-')[1]) > Number(value.split('-')[0])).length) return false;
            return true;
        } else { // Manca qualche risultato
            return false;
        }
    }

    const handleChange = e => {
        manageInput(e, 'match', setReport);
    }

    // Al click effettua tutti i test di validazione
    useEffect(() => {
        if (testing.status) {
            finalValidate(report.match, setError, setStyle, setTesting);
            const testResult = verifyresult(report.match, setError);
            setTesting(prevState => ({
                ...prevState,
                validationResults: [...prevState.validationResults, testResult]
            }));
            if (!testResult) setError('Verificare il risultato inserito');
        }
    }, [report.match, setError, setTesting, testing]);
    
    return (
        <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <h3 className="generic-title">Dati Gara</h3>
            </div>
            {
                error && (
                    <div className="danger-alert dark:bg-red-200 dark:text-red-800" role="alert">
                        <span className="font-medium">Attenzione!</span> { error }.
                    </div>
                )
            }
            <div className="mb-4 grid grid-cols-3 gap-4">
                <div>
                    <label htmlFor="result" className="form-label dark:text-gray-300">Risultato</label>
                    <input 
                        type="text" 
                        id="result"
                        value={ report.match.result }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.result || 'form-input'}`}
                    />
                </div>
                <div>
                    <label htmlFor="duration" className="form-label dark:text-gray-300">Durata Totale</label>
                    <input 
                        type="number" 
                        id="duration"
                        value={ report.match.duration }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.duration || 'form-input'}`} 
                    />
                </div>
                <div>
                    <label htmlFor="spects" className="form-label dark:text-gray-300">Spettatori</label>
                    <input 
                        type="number" 
                        id="spects"
                        value={ report.match.spects }
                        onChange={ handleChange } 
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.spects || 'form-input'}`}
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
                <input type="text" id="pts1set" value={ report.match.pts1set } onChange={ handleChange } onBlur={ handleBlur } className={`block p-2 w-full ${style.pts1set || 'form-input'}`} />
                <input type="text" id="pts2set" value={ report.match.pts2set } onChange={ handleChange } onBlur={ handleBlur } className={`block p-2 w-full ${style.pts2set || 'form-input'}`} />
                <input type="text" id="pts3set" value={ report.match.pts3set } onChange={ handleChange } onBlur={ handleBlur } className={`block p-2 w-full ${style.pts3set || 'form-input'}`} />
                <input type="text" id="pts4set" value={ report.match.pts4set } onChange={ handleChange } onBlur={ handleBlur } className={`block p-2 w-full ${style.pts4set || 'form-input'}`} />
                <input type="text" id="pts5set" value={ report.match.pts5set } onChange={ handleChange } onBlur={ handleBlur } className={`block p-2 w-full ${style.pts5set || 'form-input'}`} />
                <input type="text" id="pts6set" value={ report.match.pts6set } onChange={ handleChange } onBlur={ handleBlur } className={`block p-2 w-full ${style.pts6set || 'form-input'}`} />
            </div>
            <div className="mb-2 grid grid-cols-7 gap-1 md:gap-4 items-center">
                <label className="truncate">Durata</label>
                <input type="number" id="dur1set" value={ report.match.dur1set } onChange={ handleChange } onBlur={ handleBlur } className={`block p-2 w-full ${style.dur1set || 'form-input'}`} />
                <input type="number" id="dur2set" value={ report.match.dur2set } onChange={ handleChange } onBlur={ handleBlur } className={`block p-2 w-full ${style.dur2set || 'form-input'}`} />
                <input type="number" id="dur3set" value={ report.match.dur3set } onChange={ handleChange } onBlur={ handleBlur } className={`block p-2 w-full ${style.dur3set || 'form-input'}`} />
                <input type="number" id="dur4set" value={ report.match.dur4set } onChange={ handleChange } onBlur={ handleBlur } className={`block p-2 w-full ${style.dur4set || 'form-input'}`} />
                <input type="number" id="dur5set" value={ report.match.dur5set } onChange={ handleChange } onBlur={ handleBlur } className={`block p-2 w-full ${style.dur5set || 'form-input'}`} />
                <input type="number" id="dur6set" value={ report.match.dur6set } onChange={ handleChange } onBlur={ handleBlur } className={`block p-2 w-full ${style.dur6set || 'form-input'}`} />
            </div>
        </div>
    )
}

const ImageArea = ({ report, setReport, setTesting, testing }) => {
    const [ error, setError ] = useState();
    const [ style, setStyle ] = useState({
        aspect1ref: undefined, 
        aspect2ref: undefined, 
        delay1ref: undefined,
        delay2ref: undefined,
        prot1ref: undefined,
        prot2ref: undefined,
        whistle1ref: undefined,
        whistle2ref: undefined,
        complaint1ref: undefined,
        complaint2ref: undefined,
        image_notes: undefined
    });

    const handleChange = e => {
        manageInput(e, 'image', setReport);
    }

    // Validating input
    function handleBlur(e) {
        const inputId = e.currentTarget.id;
        const value = e.currentTarget.value;
        const test = checkInput(inputId, value);
        confirmBlur(test, inputId, setError, setStyle);
    }

    // Effettua tutti i test di validazione
    useEffect(() => {
        if (testing.status) {
            finalValidate(report.image, setError, setStyle, setTesting);
        }
    }, [report.image, setTesting, testing]);

    return (
        <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <h3 className="generic-title">Area Immagine</h3>
            </div>
            {
                error && (
                    <div className="danger-alert dark:bg-red-200 dark:text-red-800" role="alert">
                        <span className="font-medium">Attenzione!</span> { error }.
                    </div>
                )
            }
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
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.aspect1ref || 'form-select'} text-sm`}
                />
                <ThreeOptions 
                    id="aspect2ref" 
                    value={ report.image.aspect2ref } 
                    handleChange={ handleChange } 
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.aspect2ref || 'form-select'} text-sm`}
                />
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 md:gap-4 items-center">
                <label className="truncate">Ritardato arrivo presso l'impianto</label>
                <select 
                    id="delay1ref"
                    value={ report.image.delay1ref }
                    onChange={ handleChange } 
                    onBlur={ handleBlur }
                    className={`block p-2 w-full ${style.delay1ref || 'form-select'} text-sm`}
                >
                    <option value="2">No</option>
                    <option value="1">Sì, fino a 10'</option>
                    <option value="0">Sì, oltre 10'</option>
                </select>
                <select 
                    id="delay2ref"
                    value={ report.image.delay2ref }
                    onChange={ handleChange }
                    onBlur={ handleBlur }
                    className={`block p-2 w-full ${style.delay2ref || 'form-select'} text-sm`}
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
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.prot1ref || 'form-select'} text-sm`}
                />
                <ThreeOptions 
                    id="prot2ref"
                    value={ report.image.prot2ref } 
                    handleChange={ handleChange } 
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.prot2ref || 'form-select'} text-sm`}
                />
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1 md:gap-4 items-center">
                <label className="truncate">Fischio, segnaletica e postura</label>
                <ThreeOptions 
                    id="whistle1ref"
                    value={ report.image.whistle1ref } 
                    handleChange={ handleChange } 
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.whistle1ref || 'form-select'} text-sm`}
                />
                <ThreeOptions 
                    id="whistle2ref" 
                    value={ report.image.whistle2ref } 
                    handleChange={ handleChange } 
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.whistle2ref || 'form-select'} text-sm`}
                />
            </div>
            <div className="mb-4 grid grid-cols-3 gap-1 md:gap-4 items-center">
                <label className="truncate">Gestione istanze</label>
                <ThreeOptions 
                    id="complaint1ref"
                    value={ report.image.complaint1ref } 
                    handleChange={ handleChange } 
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.complaint1ref || 'form-select'} text-sm`}
                />
                <ThreeOptions 
                    id="complaint2ref"
                    value={ report.image.complaint2ref } 
                    handleChange={ handleChange } 
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.complaint2ref || 'form-select'} text-sm`}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="image_notes" className="form-label dark:text-gray-300">Note</label>
                <textarea 
                    id="image_notes" 
                    rows="4" 
                    value={ report.image.image_notes }
                    onChange={ handleChange }
                    onBlur={ handleBlur }
                    className={`block p-2 w-full ${style.image_notes || 'form-input'}`}
                />
            </div>
        </div>
    )
}

const TechnicalArea = ({ report, setReport, setTesting, testing }) => {
    const [ error, setError ] = useState();
    const [ style, setStyle ] = useState({
        complexity: undefined, 
        tech1ref: undefined, 
        tech2ref: undefined,
        ballsinout_ord_1ref: undefined,
        ballsinout_ord_2ref: undefined,
        ballsinout_sev_1ref: undefined,
        ballsinout_sev_2ref: undefined,
        balltouches_ord_1ref: undefined,
        balltouches_sev_1ref: undefined,
        firsttouch_ord_1ref: undefined,
        firsttouch_sev_1ref: undefined,
        penetration_ord_1ref: undefined,
        penetration_ord_2ref: undefined,
        penetration_sev_1ref: undefined,
        penetration_sev_2ref: undefined,
        posfaults_ord_1ref: undefined,
        posfaults_ord_2ref: undefined,
        posfaults_sev_1ref: undefined,
        posfaults_sev_2ref: undefined,
        nettouches_ord_1ref: undefined,
        nettouches_ord_2ref: undefined,
        nettouches_sev_1ref: undefined,
        nettouches_sev_2ref: undefined,
        walltouches_ord_1ref: undefined,
        walltouches_ord_2ref: undefined,
        walltouches_sev_1ref: undefined,
        walltouches_sev_2ref: undefined,
        airplay_ord_1ref: undefined,
        airplay_sev_1ref: undefined,
        defensefaults_ord_1ref: undefined,
        defensefaults_ord_2ref: undefined,
        defensefaults_sev_1ref: undefined,
        defensefaults_sev_2ref: undefined,
        servefaults_ord_1ref: undefined,
        servefaults_sev_1ref: undefined,
        liberofaults_ord_1ref: undefined,
        liberofaults_ord_2ref: undefined,
        liberofaults_sev_1ref: undefined,
        liberofaults_sev_2ref: undefined,
        otherfaults_ord_1ref: undefined,
        otherfaults_ord_2ref: undefined,
        otherfaults_sev_1ref: undefined,
        otherfaults_sev_2ref: undefined,
        error_notes: undefined,
        collab1ref: undefined,
        collab2ref: undefined,
        collab_notes: undefined
    });

    const handleChange = e => {
        manageInput(e, 'technical', setReport);
    }

    // Validating input
    function handleBlur(e) {
        const inputId = e.currentTarget.id;
        const value = e.currentTarget.value;
        const test = checkInput(inputId, value);
        confirmBlur(test, inputId, setError, setStyle);
    }

    // Effettua tutti i test di validazione
    useEffect(() => {
        if (testing.status) {
            finalValidate(report.technical, setError, setStyle, setTesting);
        }
    }, [report.technical, setTesting, testing]);
    
    return (
        <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <h3 className="generic-title">Area Tecnica</h3>
            </div>
            {
                error && (
                    <div className="danger-alert dark:bg-red-200 dark:text-red-800" role="alert">
                        <span className="font-medium">Attenzione!</span> { error }.
                    </div>
                )
            }
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
                        handleBlur={ handleBlur }
                        classList={`block p-2 w-full ${style.complexity || 'form-select'} text-sm`}
                    />
                </span>
                <label className="text-right">Tecnica Arbitrale</label>
                <FourOptions 
                    id="tech1ref"
                    value={ report.technical.tech1ref } 
                    handleChange={ handleChange }
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.tech1ref || 'form-select'} text-sm`}
                />
                <FourOptions 
                    id="tech2ref"
                    value={ report.technical.tech2ref } 
                    handleChange={ handleChange }
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.tech2ref || 'form-select'} text-sm`}
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
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.ballsinout_ord_1ref || 'form-input'}`}
                    />
                    <input 
                        type="number" 
                        id="ballsinout_ord_2ref"
                        value={ report.technical.ballsinout_ord_2ref }
                        onChange={ handleChange } 
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.ballsinout_ord_2ref || 'form-input'}`}
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="ballsinout_sev_1ref"
                        value={ report.technical.ballsinout_sev_1ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.ballsinout_sev_1ref || 'form-input'}`}
                    />
                    <input 
                        type="number" 
                        id="ballsinout_sev_2ref"
                        value={ report.technical.ballsinout_sev_2ref }
                        onChange={ handleChange } 
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.ballsinout_sev_2ref || 'form-input'}`}
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
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.balltouches_ord_1ref || 'form-input'}`}
                        />
                    <input type="number" className="block p-2 w-full form-input-disabled text-sm" disabled />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="balltouches_sev_1ref"
                        value={ report.technical.balltouches_sev_1ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.balltouches_sev_1ref || 'form-input'}`}
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
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.firsttouch_ord_1ref || 'form-input'}`}
                    />
                    <input type="number" className="block p-2 w-full form-input-disabled text-sm" disabled />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="firsttouch_sev_1ref"
                        value={ report.technical.firsttouch_sev_1ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.firsttouch_sev_1ref || 'form-input'}`}
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
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.penetration_ord_1ref || 'form-input'}`}
                    />
                    <input 
                        type="number" 
                        id="penetration_ord_2ref" 
                        value={ report.technical.penetration_ord_2ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.penetration_ord_2ref || 'form-input'}`}
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="penetration_sev_1ref" 
                        value={ report.technical.penetration_sev_1ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.penetration_sev_1ref || 'form-input'}`}
                    />
                    <input 
                        type="number" 
                        id="penetration_sev_2ref" 
                        value={ report.technical.penetration_sev_2ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.penetration_sev_2ref || 'form-input'}`}
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
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.posfaults_ord_1ref || 'form-input'}`}
                    />
                    <input 
                        type="number" 
                        id="posfaults_ord_2ref" 
                        value={ report.technical.posfaults_ord_2ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.posfaults_ord_2ref || 'form-input'}`}
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="posfaults_sev_1ref" 
                        value={ report.technical.posfaults_sev_1ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.posfaults_sev_1ref || 'form-input'}`}
                    />
                    <input 
                        type="number" 
                        id="posfaults_sev_2ref" 
                        value={ report.technical.posfaults_sev_2ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.posfaults_sev_2ref || 'form-input'}`}
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
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.nettouches_ord_1ref || 'form-input'}`}
                    />
                    <input 
                        type="number" 
                        id="nettouches_ord_2ref" 
                        value={ report.technical.nettouches_ord_2ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.nettouches_ord_2ref || 'form-input'}`}
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="nettouches_sev_1ref" 
                        value={ report.technical.nettouches_sev_1ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.nettouches_sev_1ref || 'form-input'}`}
                    />
                    <input 
                        type="number" 
                        id="nettouches_sev_2ref" 
                        value={ report.technical.nettouches_sev_2ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.nettouches_sev_2ref || 'form-input'}`}
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
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.walltouches_ord_1ref || 'form-input'}`}
                    />
                    <input 
                        type="number" 
                        id="walltouches_ord_2ref" 
                        value={ report.technical.walltouches_ord_2ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.walltouches_ord_2ref || 'form-input'}`}
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input
                        type="number" 
                        id="walltouches_sev_1ref" 
                        value={ report.technical.walltouches_sev_1ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.walltouches_sev_1ref || 'form-input'}`}
                    />
                    <input
                        type="number" 
                        id="walltouches_sev_2ref" 
                        value={ report.technical.walltouches_sev_2ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.walltouches_sev_2ref || 'form-input'}`}
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
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.airplay_ord_1ref || 'form-input'}`}
                    />
                    <input type="number" className="block p-2 w-full form-input-disabled text-sm" disabled />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="airplay_sev_1ref" 
                        value={ report.technical.airplay_sev_1ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.airplay_sev_1ref || 'form-input'}`}
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
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.defensefaults_ord_1ref || 'form-input'}`}
                    />
                    <input 
                        type="number" 
                        id="defensefaults_ord_2ref" 
                        value={ report.technical.defensefaults_ord_2ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.defensefaults_ord_2ref || 'form-input'}`}
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input
                        type="number"
                        id="defensefaults_sev_1ref" 
                        value={ report.technical.defensefaults_sev_1ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.defensefaults_sev_1ref || 'form-input'}`}
                    />
                    <input 
                        type="number" 
                        id="defensefaults_sev_2ref" 
                        value={ report.technical.defensefaults_sev_2ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.defensefaults_sev_2ref || 'form-input'}`}
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
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.servefaults_ord_1ref || 'form-input'}`}
                    />
                    <input type="number" className="block p-2 w-full form-input-disabled text-sm" disabled />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="servefaults_sev_1ref" 
                        value={ report.technical.servefaults_sev_1ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.servefaults_sev_1ref || 'form-input'}`}
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
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.liberofaults_ord_1ref || 'form-input'}`}
                    />
                    <input 
                        type="number" 
                        id="liberofaults_ord_2ref" 
                        value={ report.technical.liberofaults_ord_2ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.liberofaults_ord_2ref || 'form-input'}`}
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="liberofaults_sev_1ref" 
                        value={ report.technical.liberofaults_sev_1ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.liberofaults_sev_1ref || 'form-input'}`}
                    />
                    <input 
                        type="number" 
                        id="liberofaults_sev_2ref" 
                        value={ report.technical.liberofaults_sev_2ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.liberofaults_sev_2ref || 'form-input'}`}
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
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.otherfaults_ord_1ref || 'form-input'}`}
                    />
                    <input 
                        type="number" 
                        id="otherfaults_ord_2ref" 
                        value={ report.technical.otherfaults_ord_2ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.otherfaults_ord_2ref || 'form-input'}`}
                    />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <input 
                        type="number" 
                        id="otherfaults_sev_1ref" 
                        value={ report.technical.otherfaults_sev_1ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.otherfaults_sev_1ref || 'form-input'}`}
                    />
                    <input 
                        type="number" 
                        id="otherfaults_sev_2ref" 
                        value={ report.technical.otherfaults_sev_2ref }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        className={`block p-2 w-full ${style.otherfaults_sev_2ref || 'form-input'}`}
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
                    onBlur={ handleBlur }
                    className={`block p-2 w-full ${style.error_notes || 'form-input'}`}
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
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.collab1ref || 'form-select'} text-sm`}
                />
                <FourOptions 
                    id="collab2ref"
                    value={ report.technical.collab2ref }
                    handleChange={ handleChange } 
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.collab2ref || 'form-select'} text-sm`}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="collab_notes" className="form-label dark:text-gray-300">Note</label>
                <textarea 
                    id="collab_notes" 
                    rows="4" 
                    value={ report.technical.collab_notes }
                    onChange={ handleChange }
                    onBlur={ handleBlur }
                    className={`block p-2 w-full ${style.collab_notes || 'form-input'}`}
                />
            </div>
        </div>
    )
}

const RelArea = ({ report, setReport, setTesting, testing }) => {
    const [ error, setError ] = useState();
    const [ style, setStyle ] = useState({
        gest_difficulty: undefined, 
        gest1ref: undefined, 
        gest2ref: undefined,
        conc1ref: undefined,
        conc2ref: undefined,
        rel_notes: undefined
    });

    const handleChange = e => {
        manageInput(e, 'relational', setReport);
    }

    // Validating input
    function handleBlur(e) {
        const inputId = e.currentTarget.id;
        const value = e.currentTarget.value;
        const test = checkInput(inputId, value);
        confirmBlur(test, inputId, setError, setStyle);
    }

    // Effettua tutti i test di validazione
    useEffect(() => {
        if (testing.status) {
            finalValidate(report.relational, setError, setStyle, setTesting);
        }
    }, [report.relational, setTesting, testing]);

    return (
        <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <h3 className="generic-title">Area Relazionale</h3>
            </div>
            {
                error && (
                    <div className="danger-alert dark:bg-red-200 dark:text-red-800" role="alert">
                        <span className="font-medium">Attenzione!</span> { error }.
                    </div>
                )
            }
            <div className="mb-4">
                <div>
                    <label htmlFor="gest_difficulty" className="form-label dark:text-gray-300">Complessità gestionale</label>
                    <DifficOptions 
                        id="gest_difficulty"
                        value={ report.relational.gest_difficulty }
                        handleChange={ handleChange }
                        handleBlur={ handleBlur }
                        classList={`block p-2 w-full ${style.gest_difficulty || 'form-select'} text-sm`}
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
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.gest1ref || 'form-select'} text-sm`}
                />
                <FourOptions 
                    id="gest2ref"
                    value={ report.relational.gest2ref }
                    handleChange={ handleChange } 
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.gest2ref || 'form-select'} text-sm`}
                />
            </div>
            <div className="mb-4 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Livello di concentrazione (era in linea con l'evento?)</label>
                <FourOptions 
                    id="conc1ref" 
                    value={ report.relational.conc1ref }
                    handleChange={ handleChange }
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.conc1ref || 'form-select'} text-sm`}
                />
                <FourOptions 
                    id="conc2ref" 
                    value={ report.relational.conc2ref }
                    handleChange={ handleChange }
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.conc2ref || 'form-select'} text-sm`}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="rel_notes" className="form-label dark:text-gray-300">Note</label>
                <textarea 
                    id="rel_notes" 
                    rows="4" 
                    value={ report.relational.rel_notes }
                    onChange={ handleChange }
                    onBlur={ handleBlur }
                    className={`block p-2 w-full ${style.rel_notes || 'form-input'}`}
                />
            </div>
        </div>
    )
}

const DisciplineArea = ({ report, setReport, setTesting, testing }) => {
    const [ error, setError ] = useState();
    const [ style, setStyle ] = useState({
        gest_discipline: undefined, 
        d_verbals: undefined, 
        d_officials: undefined,
        d_penals: undefined,
        d_expulsions: undefined,
        d_squalifications: undefined,
        discipline: undefined, 
        disc_interation: undefined, 
        delays1ref: undefined,
        delays2ref: undefined,
        disc_notes: undefined
    });

    const handleChange = e => {
        manageInput(e, 'discipline', setReport);
    }

    // Validating input
    function handleBlur(e) {
        const inputId = e.currentTarget.id;
        const value = e.currentTarget.value;
        const test = checkInput(inputId, value);
        confirmBlur(test, inputId, setError, setStyle);
    }

    // Effettua tutti i test di validazione
    useEffect(() => {
        if (testing.status) {
            finalValidate(report.discipline, setError, setStyle, setTesting);
        }
    }, [report.discipline, setTesting, testing]);

    return (
        <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <h3 className="generic-title">Area Disciplinare</h3>
            </div>
            {
                error && (
                    <div className="danger-alert dark:bg-red-200 dark:text-red-800" role="alert">
                        <span className="font-medium">Attenzione!</span> { error }.
                    </div>
                )
            }
            <div className="mb-4">
                <div>
                    <label htmlFor="gest_discipline" className="form-label dark:text-gray-300">Complessità disciplinare</label>
                    <DifficOptions
                        id="gest_discipline"
                        value={ report.discipline.gest_discipline }
                        handleChange={ handleChange } 
                        handleBlur={ handleBlur }
                        classList={`block p-2 w-full ${style.gest_discipline || 'form-select'} text-sm`}
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
                        handleBlur={ handleBlur }
                        classList={`block p-2 w-full ${style.d_verbals || 'form-select'} text-sm`}
                    />
                </div>
                <div>
                    <label htmlFor="d_officials" className="form-label dark:text-gray-300">Avv. ufficiali</label>
                    <FaultSelect 
                        id="d_officials" 
                        value={ report.discipline.d_officials }
                        handleChange={ handleChange }
                        handleBlur={ handleBlur }
                        classList={`block p-2 w-full ${style.d_officials || 'form-select'} text-sm`}
                    />
                </div>
                <div>
                    <label htmlFor="d_penals" className="form-label dark:text-gray-300">Penalizzazioni</label>
                    <FaultSelect 
                        id="d_penals"
                        value={ report.discipline.d_penals }
                        handleChange={ handleChange }
                        handleBlur={ handleBlur }
                        classList={`block p-2 w-full ${style.d_penals || 'form-select'} text-sm`}
                    />
                </div>
                <div>
                    <label htmlFor="d_expulsions" className="form-label dark:text-gray-300">Espulsioni</label>
                    <FaultSelect 
                        id="d_expulsions"
                        value={ report.discipline.d_expulsions }
                        handleChange={ handleChange }
                        handleBlur={ handleBlur }
                        classList={`block p-2 w-full ${style.d_expulsions || 'form-select'} text-sm`}
                    />
                </div>
                <div>
                    <label htmlFor="d_squalifications" className="form-label dark:text-gray-300">Squalifiche</label>
                    <FaultSelect 
                        id="d_squalifications"
                        value={ report.discipline.d_squalifications }
                        handleChange={ handleChange }
                        handleBlur={ handleBlur }
                        classList={`block p-2 w-full ${style.d_squalifications || 'form-select'} text-sm`}
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
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.discipline || 'form-select'} text-sm`}
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
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.disc_interation || 'form-select'} text-sm`}
                />
            </div>
            <div className="mb-4 grid grid-cols-3 gap-1 items-center">
                <label className="truncate">Richieste improprie e ritardi di gioco</label>
                <FourOptions
                    id="delays1ref"
                    value={ report.discipline.delays1ref }
                    handleChange={ handleChange }
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.delays1ref || 'form-select'} text-sm`}
                />
                <FourOptions
                    id="delays2ref"
                    value={ report.discipline.delays2ref }
                    handleChange={ handleChange }
                    handleBlur={ handleBlur }
                    classList={`block p-2 w-full ${style.delays2ref || 'form-select'} text-sm`}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="disc_notes" className="form-label dark:text-gray-300">Note</label>
                <textarea 
                    id="disc_notes" 
                    rows="4" 
                    value={ report.discipline.disc_notes }
                    onChange={ handleChange }
                    onBlur={ handleBlur }
                    className={`block p-2 w-full ${style.disc_notes || 'form-input'}`}
                />
            </div>
        </div>
    )
}

const InterviewArea = ({ report, setReport, setTesting, testing }) => {
    const [ error, setError ] = useState();
    const [ style, setStyle ] = useState({
        interview1ref: undefined, 
        interview2ref: undefined, 
        interview_notes: undefined
    });

    const handleChange = e => {
        manageInput(e, 'interview', setReport);
    }

    // Validating input
    function handleBlur(e) {
        const inputId = e.currentTarget.id;
        const value = e.currentTarget.value;
        const test = checkInput(inputId, value);
        confirmBlur(test, inputId, setError, setStyle);
    }

    // Effettua tutti i test di validazione
    useEffect(() => {
        if (testing.status) {
            finalValidate(report.interview, setError, setStyle, setTesting);
        }
    }, [report.interview, setTesting, testing]);

    return (
        <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <h3 className="generic-title">Colloquio</h3>
            </div>
            {
                error && (
                    <div className="danger-alert dark:bg-red-200 dark:text-red-800" role="alert">
                        <span className="font-medium">Attenzione!</span> { error }.
                    </div>
                )
            }
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
                    onBlur={ handleBlur }
                    className={`block p-2 w-full ${style.interview1ref || 'form-select'} text-sm`}
                >
                    <option value="2">Nella norma</option>
                    <option value="1">Disattento e/o distratto</option>
                    <option value="0">Zelante e/o polemico</option>
                </select>
                <select 
                    id="interview2ref" 
                    value={ report.interview.interview2ref }
                    onChange={ handleChange }
                    onBlur={ handleBlur }
                    className={`block p-2 w-full ${style.interview2ref || 'form-select'} text-sm`}
                >
                    <option value="2">Nella norma</option>
                    <option value="1">Disattento e/o distratto</option>
                    <option value="0">Zelante e/o polemico</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="interview_notes" className="form-label dark:text-gray-300">Motivazioni fornite dagli arbitri in relazione ai rilievi</label>
                <textarea 
                    id="interview_notes" 
                    rows="4" 
                    value={ report.interview.interview_notes }
                    onChange={ handleChange }
                    onBlur={ handleBlur }
                    className={`block p-2 w-full ${style.interview_notes || 'form-input'}`}
                />
            </div>
        </div>
    )
}

const EventsArea = ({ report, setReport, setTesting, testing }) => {
    const [ error, setError ] = useState();
    const [ style, setStyle ] = useState({
        finalvote1ref: undefined, 
        finalvote2ref: undefined
    });
    
    const handleChange = e => {
        manageInput(e, 'events', setReport);
    }

    // Validating input
    function handleBlur(e) {
        const inputId = e.currentTarget.id;
        const value = e.currentTarget.value;
        const test = checkInput(inputId, value);
        confirmBlur(test, inputId, setError, setStyle);
    }

    // Effettua tutti i test di validazione
    useEffect(() => {
        if (testing.status) {
            finalValidate(report.events, setError, setStyle, setTesting);
        }
    }, [report.events, setTesting, testing]);

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
                    onBlur={ handleBlur }
                    className={`block p-2 w-full ${style.finalvote1ref || 'form-select'} text-sm`}
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
                    onBlur={ handleBlur }
                    className={`block p-2 w-full ${style.finalvote2ref || 'form-select'} text-sm`}
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

function ReportForm ({report, setReport, toggleModal}) {
    const [ testing, setTesting ] = useState({ status: false, validationResults: [] });

    const formSending = e => {
        e.preventDefault();
        window.scroll(0, 0)
        setTesting({ status: true, validationResults: [] });
    }

    // Verifica dei test effettuati
    useEffect(() => {
        const { status, validationResults } = testing;
        if (status && validationResults.length > 105) { // Allora tutti i test sono stati effettuati
            setTesting(prevState => ({
                ...prevState,
                status: false
            }));
            if (validationResults.every(el => el === true)) toggleModal();
        }
    }, [testing, setTesting, toggleModal]);

    return (
        <div className="container flex">
            <form>
                <GeneralArea    report={ report } setReport={ setReport} setTesting={setTesting} testing={testing} />
                <MatchArea      report={ report } setReport={ setReport} setTesting={setTesting} testing={testing} />
                <ImageArea      report={ report } setReport={ setReport} setTesting={setTesting} testing={testing} />
                <TechnicalArea  report={ report } setReport={ setReport} setTesting={setTesting} testing={testing} />
                <RelArea        report={ report } setReport={ setReport} setTesting={setTesting} testing={testing} />
                <DisciplineArea report={ report } setReport={ setReport} setTesting={setTesting} testing={testing} />
                <InterviewArea  report={ report } setReport={ setReport} setTesting={setTesting} testing={testing} />
                <EventsArea     report={ report } setReport={ setReport} setTesting={setTesting} testing={testing} />
                <button 
                    className="btn-default mb-4" 
                    data-modal-toggle="reportModal"
                    onClick={formSending}
                >
                    Invia Report
                </button>
            </form>
        </div>
    )
}

export default ReportForm;