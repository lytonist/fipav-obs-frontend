import React from "react";

function ReportPreview({ report, showReferee }) {

    const options = ['Carente', 'Parz. Carente', 'Positivo', 'Ottimo'];
    const delays = ['Sì, oltre 10\'', 'Sì, fino a 10\'', 'No'];
    const difficulty = ['Facile', 'Medio-Bassa', 'Medio-Alta', 'Difficile'];
    const interview = ['Disattento e/o distratto', 'Zelante e/o polemico', 'Nella norma'];
    const vote = ['Insoddisfacente', 'Parz. carente', 'Media', 'Buona', 'Eccellente'];
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

    return (
        <div className="container">
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
                </div>
            </div>
            <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
                <div className="mb-4">
                    <h3 className="generic-title">Dati Gara</h3>
                </div>
                <div className="mb-2 grid grid-cols-2 gap-2 content-center">
                    <span>Risultato</span>
                    <span>{ report.match.result }</span>
                    <span>Durata</span>
                    <span>{ report.match.duration }</span>
                    <span>Spettatori</span>
                    <span>{ report.match.spects }</span>
                    <span>1° Set</span>
                    <span>{ report.match.pts1set } ({ report.match.dur1set } minuti)</span>
                    <span>2° Set</span>
                    <span>{ report.match.pts2set } ({ report.match.dur2set } minuti)</span>
                    { report.match.pts3set && (
                        <>
                            <span>3° Set</span>
                            <span>{ report.match.pts3set } ({ report.match.dur3set } minuti)</span>
                        </>    
                    ) }
                    { report.match.pts4set && (
                        <>
                            <span>4° Set</span>
                            <span>{ report.match.pts4set } ({ report.match.dur4set } minuti)</span>
                        </>    
                    ) }
                    { report.match.pts5set && (
                        <>
                            <span>5° Set</span>
                            <span>{ report.match.pts5set } ({ report.match.dur5set } minuti)</span>
                        </>    
                    ) }
                    { report.match.pts6set && (
                        <>
                            <span>Set di Spareggio</span>
                            <span>{ report.match.pts6set } ({ report.match.dur6set } minuti)</span>
                        </>    
                    ) }
                </div>
            </div>
            <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
                <div className="mb-4">
                    <h3 className="generic-title">Area Immagine</h3>
                </div>
                <div className="mb-2 grid grid-cols-2 gap-2 content-center">
                    <span>Aspetto Adeguato</span>
                    <span>{ showReferee === '1st' ? options[report.image.aspect1ref] : options[report.image.aspect2ref] }</span>
                    <span>Ritardato arrivo presso l'impianto</span>
                    <span>{ showReferee === '1st' ? delays[report.image.delay1ref] : delays[report.image.delay2ref] }</span>
                    <span>Fasi Protocollari (tutte)</span>
                    <span>{ showReferee === '1st' ? options[report.image.prot1ref] : options[report.image.prot2ref] }</span>
                    <span>Fischio, segnaletica e postura</span>
                    <span>{ showReferee === '1st' ? options[report.image.whistle1ref] : options[report.image.whistle2ref] }</span>
                    <span>Gestione istanze</span>
                    <span>{ showReferee === '1st' ? options[report.image.complaint1ref] : options[report.image.complaint2ref] }</span>
                    <span>Note</span>
                    <span>{ report.image.image_notes }</span>
                </div>
            </div>
            <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
                <div className="mb-4">
                    <h3 className="generic-title">Area Tecnica</h3>
                </div>
                <div className="mb-4 grid grid-cols-2 gap-2 content-center">
                    <span>Complessità Tecnica</span>
                    <span>{ difficulty[report.technical.complexity] }</span>
                    <span>Tecnica Arbitrale</span>
                    <span>{ showReferee === '1st' ? options[report.technical.tech1ref] : options[report.technical.tech2ref] }</span>
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
                <div className="mb-2 grid grid-cols-2 gap-2 content-center">
                    <span>Note</span>
                    <span>{ report.technical.error_notes }</span>
                    <span>Collaborazione tecnica</span>
                    <span>{ showReferee === '1st' ? options[report.technical.collab1ref] : options[report.technical.collab2ref] }</span>
                    <span>Note</span>
                    <span>{ report.technical.collab_notes }</span>
                </div>
            </div>
            <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
                <div className="mb-4">
                    <h3 className="generic-title">Area Relazionale</h3>
                </div>
                <div className="mb-2 grid grid-cols-2 gap-2 content-center">
                    <span>Complessità gestionale</span>
                    <span>{ difficulty[report.relational.gest_difficulty] }</span>
                    <span>Gestione e Autorevolezza</span>
                    <span>{ showReferee === '1st' ? options[report.relational.gest1ref] : options[report.relational.gest2ref] }</span>
                    <span>Livello di concentrazione (era in linea con l'evento?)</span>
                    <span>{ showReferee === '1st' ? options[report.relational.conc1ref] : options[report.relational.conc2ref] }</span>
                    <span>Note</span>
                    <span>{ difficulty[report.relational.rel_notes] }</span>
                </div>
            </div>
            <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
                <div className="mb-4">
                    <h3 className="generic-title">Area Disciplinare</h3>
                </div>
                <div className="mb-2 grid grid-cols-2 gap-2 content-center">
                    <span>Complessità gestionale</span>
                    <span>{ difficulty[report.discipline.gest_discipline] }</span>
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
                <div className="mb-2 grid grid-cols-2 gap-2 content-center">
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
                    <span>Richieste improprie e ritardi di gioco</span>
                    <span>{ showReferee === '1st' ? options[report.discipline.delays1ref] : options[report.discipline.delays2ref] }</span>
                    <span>Note</span>
                    <span>{ report.discipline.disc_notes }</span>
                </div>
            </div>
            <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
                <div className="mb-4">
                    <h3 className="generic-title">Colloquio</h3>
                </div>
                <div className="mb-2 grid grid-cols-2 gap-2 content-center">
                    <span>Reattività al colloquio</span>
                    <span>{ showReferee === '1st' ? interview[report.interview.interview1ref] : interview[report.interview.interview2ref] }</span>
                    <span>Note</span>
                    <span>{ report.interview.interview_notes }</span>
                </div>
            </div>
            <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
                <div className="mb-4">
                    <h3 className="generic-title">Eventi particolari e potenzialità</h3>
                </div>
                <div className="mb-2 grid grid-cols-2 gap-2 content-center">
                    <span>Valutazione prestazioni arbitrali</span>
                    <span>{ showReferee === '1st' ? vote[report.events.finalvote1ref] : vote[report.events.finalvote2ref] }</span>
                </div>
            </div>
        </div>
    )
}

export default ReportPreview;