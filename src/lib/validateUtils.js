

const validators = {
    allowEmpty: (() => {
        return { success: true }
    }),

    finalSet: (value => {
        const points = value.split('-');
        const ptsTeamA = Number(points[0]);
        const ptsTeamB = Number(points[1]);
        if (isNaN(ptsTeamA) || isNaN(ptsTeamB)) return { success: false, msg: 'Verificare la correttezza del punteggio inserito' };
        if (ptsTeamA > ptsTeamB) {
            if (
                ptsTeamA < 15 // Il punteggio della squadra vincente è minore di 15
                || (ptsTeamA - ptsTeamB) < 2 // La differenza dei punti è minore di 2
                || (ptsTeamA > 15 && (ptsTeamA - ptsTeamB) !== 2) // Il set è finito ai vantaggi ma la differenza dei punti è minore o maggiore di 2
            ) 
                return { success: false, msg: 'Verificare la correttezza del punteggio inserito' };
        } else {
            if (
                ptsTeamB < 15 // Il punteggio della squadra vincente è minore di 15
                || (ptsTeamB - ptsTeamA) < 2 // La differenza dei punti è minore di 2
                || (ptsTeamB > 15 && (ptsTeamB - ptsTeamA) !== 2) // Il set è finito ai vantaggi ma la differenza dei punti è minore o maggiore di 2
            ) 
                return { success: false, msg: 'Verificare la correttezza del punteggio inserito' };
        }
        return { success: true }
    }),
    
    isNumber: (value => {
        if (/\d+/.test(value)) return { success: true }
        else return { success: false, msg: 'Non hai inserito un numero valido' }
    }),

    isTime: (value => {
        if (value.match(/(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])/)) return { success: true }
        else return { success: false, msg: 'Non hai inserito un orario valido' }
    }),

    isValidResult: (value => {
        const possibleResults = ['2-0', '0-2', '2-1', '1-2', '3-0', '3-1', '3-2', '0-3', '1-3', '2-3'];
        if (possibleResults.includes(value)) return { success: true }
        else return { success: false, msg: 'Il risultato non sembra valido'}
    }),

    notEmpty: (value => {
        if (`${value}`) return { success: true }
        else return { success: false, msg: 'Il campo non può essere vuoto' }
    }),

    maxLength: (value => {
        if (value.length < 1501) return { success: true }
        else return { success: false, msg: 'Il campo non può eccedere i 1500 caratteri' }
    }),

    standardSet: (value => {
        const points = value.split('-');
        const ptsTeamA = Number(points[0]);
        const ptsTeamB = Number(points[1]);
        if (isNaN(ptsTeamA) || isNaN(ptsTeamB)) return { success: false, msg: 'Verificare la correttezza del punteggio inserito' };
        if (ptsTeamA > ptsTeamB) {
            if (
                ptsTeamA < 25 // Il punteggio della squadra vincente è minore di 25
                || (ptsTeamA - ptsTeamB) < 2 // La differenza dei punti è minore di 2
                || (ptsTeamA > 25 && (ptsTeamA - ptsTeamB) !== 2) // Il set è finito ai vantaggi ma la differenza dei punti è minore o maggiore di 2
            ) 
                return { success: false, msg: 'Verificare la correttezza del punteggio inserito' };
        } else {
            if (
                ptsTeamB < 25 // Il punteggio della squadra vincente è minore di 25
                || (ptsTeamB - ptsTeamA) < 2 // La differenza dei punti è minore di 2
                || (ptsTeamB > 25 && (ptsTeamB - ptsTeamA) !== 2) // Il set è finito ai vantaggi ma la differenza dei punti è minore o maggiore di 2
            ) 
                return { success: false, msg: 'Verificare la correttezza del punteggio inserito' };
        }
        return { success: true }
    })
}

function validateInput(value, tests) {
    const results = tests.map(test => validators[test](value));
    if (tests.includes('allowEmpty') && (value === '' || undefined)) return { success: true };
    // Se uno dei test fallisce, restituisco il primo test fallito altrimenti il primo successo
    return results.find(el => !el.success) || results[0];
}

export default validateInput;