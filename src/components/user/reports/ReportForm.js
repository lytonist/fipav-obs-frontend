import React from "react";

const ThreeOptions = ({ id }) => (
    <select id={ id } className="form-select text-sm">
        <option>Positivo</option>
        <option>Parz. Carente</option>
        <option>Carente</option>
    </select>
)

const FourOptions = ({ id }) => (
    <select id={ id } className="form-select text-sm">
        <option>Ottimo</option>
        <option>Positivo</option>
        <option>Parz. Carente</option>
        <option>Carente</option>
    </select>
)

const DifficOptions = ({ id }) => (
    <select id={ id } className="form-select text-sm">
        <option>Difficile</option>
        <option>Medio-Alta</option>
        <option>Medio-Bassa</option>
        <option>Facile</option>
    </select>
)

const FaultSelect = ({ id }) => (
    <select id={ id } className="form-select text-sm">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3+</option>
    </select>
)

const GeneralArea = () => (
    <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
        <div className="mb-4">
            <h3 className="generic-title">Dati Generali</h3>
        </div>
        <div className="mb-2 grid grid-cols-3 md:grid-cols-5 gap-4">
            <div>
                <label for="match_num" className="form-label dark:text-gray-300">Gara n.</label>
                <input type="text" id="match_num" className="block p-2 w-full form-input" />
            </div>
            <div>
                <label for="series" className="form-label dark:text-gray-300">Serie</label>
                <input type="text" id="series" className="block p-2 w-full form-input" />
            </div>
            <div>
                <label for="date" className="form-label dark:text-gray-300">Data</label>
                <input type="text" id="date" className="block p-2 w-full form-input" />
            </div>
            <div>
                <label for="time" className="form-label dark:text-gray-300">Ora prev.</label>
                <input type="text" id="time" className="block p-2 w-full form-input" />
            </div>
            <div>
                <label for="real_time" className="form-label dark:text-gray-300">Ora eff.</label>
                <input type="text" id="real_time" className="block p-2 w-full form-input" />
            </div>
        </div>
        <div className="mb-2">
            <div>
                <label for="teams" className="form-label dark:text-gray-300">Squadre (come da calendario)</label>
                <input type="text" id="teams" className="block p-2 w-full form-input" />
            </div>
        </div>
        <div className="mb-2 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
                <label for="first_ref" className="form-label dark:text-gray-300">Primo Arbitro</label>
                <input type="text" id="first_ref" className="block p-2 w-full form-input" />
            </div>
            <div>
                <label for="second_ref" className="form-label dark:text-gray-300">Secondo Arbitro</label>
                <input type="text" id="second_ref" className="block p-2 w-full form-input" />
            </div>
            <div>
                <label for="scorer" className="form-label dark:text-gray-300">Segnapunti</label>
                <input type="text" id="scorer" className="block p-2 w-full form-input" />
            </div>
        </div>
    </div>
)

const MatchArea = () => (
    <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
        <div className="mb-4">
            <h3 className="generic-title">Dati Gara</h3>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-4">
            <div>
                <label for="result" className="form-label dark:text-gray-300">Risultato</label>
                <input type="text" id="result" className="block p-2 w-full form-input text-sm" />
            </div>
            <div>
                <label for="duration" className="form-label dark:text-gray-300">Durata Totale</label>
                <input type="text" id="duration" className="block p-2 w-full form-input text-sm" />
            </div>
            <div>
                <label for="spects" className="form-label dark:text-gray-300">Spettatori</label>
                <input type="text" id="spects" className="block p-2 w-full form-input text-sm" />
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
            <input type="text" id="pts1set" className="block p-2 w-full form-input text-sm" />
            <input type="text" id="pts2set" className="block p-2 w-full form-input text-sm" />
            <input type="text" id="pts3set" className="block p-2 w-full form-input text-sm" />
            <input type="text" id="pts4set" className="block p-2 w-full form-input text-sm" />
            <input type="text" id="pts5set" className="block p-2 w-full form-input text-sm" />
            <input type="text" id="pts6set" className="block p-2 w-full form-input text-sm" />
        </div>
        <div className="mb-2 grid grid-cols-7 gap-1 md:gap-4 items-center">
            <label className="truncate">Durata</label>
            <input type="number" id="dur1set" className="block p-2 w-full form-input text-sm" />
            <input type="number" id="dur2set" className="block p-2 w-full form-input text-sm" />
            <input type="number" id="dur3set" className="block p-2 w-full form-input text-sm" />
            <input type="number" id="dur4set" className="block p-2 w-full form-input text-sm" />
            <input type="number" id="dur5set" className="block p-2 w-full form-input text-sm" />
            <input type="number" id="dur6set" className="block p-2 w-full form-input text-sm" />
        </div>
    </div>
)

const ImageArea = () => (
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
            <ThreeOptions id="aspect1ref" />
            <ThreeOptions id="aspect2ref" />
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 md:gap-4 items-center">
            <label className="truncate">Ritardato arrivo presso l'impianto</label>
            <select id="delay1ref" className="form-select text-sm">
                <option>No</option>
                <option>Sì, fino a 10'</option>
                <option>Sì, oltre 10'</option>
            </select>
            <select id="delay2ref" className="form-select text-sm">
                <option>No</option>
                <option>Sì, fino a 10'</option>
                <option>Sì, oltre 10'</option>
            </select>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 md:gap-4 items-center">
            <label className="truncate">Fasi protocollari (tutte)</label>
            <ThreeOptions id="prot1ref" />
            <ThreeOptions id="prot2ref" />
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 md:gap-4 items-center">
            <label className="truncate">Fischio, segnaletica e postura</label>
            <ThreeOptions id="whistle1ref" />
            <ThreeOptions id="whistle2ref" />
        </div>
        <div className="mb-4 grid grid-cols-3 gap-1 md:gap-4 items-center">
            <label className="truncate">Gestione istanze</label>
            <ThreeOptions id="complaint1ref" />
            <ThreeOptions id="complaint2ref" />
        </div>
        <div className="mb-2">
            <label for="image_notes" className="form-label dark:text-gray-300">Note</label>
            <textarea type="text" id="image_notes" rows="4" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
        </div>
    </div>
)

const TechnicalArea = () => (
    <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
        <div className="mb-4">
            <h3 className="generic-title">Area Tecnica</h3>
        </div>
        <div className="mb-2 grid grid-cols-4 gap-1 items-center">
            <label for="complexity" className="form-label dark:text-gray-300">Complessità Tecnica</label>
            <label></label>
            <label className="form-label dark:text-gray-300">1° Arbitro</label>
            <label className="form-label dark:text-gray-300">2° Arbitro</label>
        </div>
        <div className="mb-4 grid grid-cols-4 gap-1 items-center">
            <span>
                <DifficOptions id="complexity" />
            </span>
            <label className="text-right">Tecnica Arbitrale</label>
            <FourOptions id="tech1ref" />
            <FourOptions id="tech2ref" />
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
                <input type="number" id="ballsinout_ord_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="ballsinout_ord_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="ballsinout_sev_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="ballsinout_sev_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Tocchi di Palla</label>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="balltouches_ord_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="balltouches_ord_2ref" className="block p-2 w-full form-input-disabled text-sm" disabled />
            </div>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="balltouches_sev_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="balltouches_sev_2ref" className="block p-2 w-full form-input-disabled text-sm" disabled />
            </div>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">1° Tocco di Squadra</label>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="firsttouch_ord_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="firsttouch_ord_2ref" className="block p-2 w-full form-input-disabled text-sm" disabled />
            </div>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="firsttouch_sev_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="firsttouch_sev_2ref" className="block p-2 w-full form-input-disabled text-sm" disabled />
            </div>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Penetrazione spazio sotto rete</label>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="penetration_ord_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="penetration_ord_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="penetration_sev_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="penetration_sev_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Falli di posizione / rotazione</label>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="posfaults_ord_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="posfaults_ord_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="posfaults_sev_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="posfaults_sev_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Tocchi di rete</label>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="nettouches_ord_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="nettouches_ord_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="nettouches_sev_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="nettouches_sev_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Tocchi di muro e 4 tocchi</label>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="walltouches_ord_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="walltouches_ord_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="walltouches_sev_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="walltouches_sev_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Gioco aereo</label>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="airplay_ord_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="airplay_ord_2ref" className="block p-2 w-full form-input-disabled text-sm" disabled />
            </div>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="airplay_sev_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="airplay_sev_2ref" className="block p-2 w-full form-input-disabled text-sm" disabled />
            </div>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Attacchi / Muro difensori</label>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="defensefaults_ord_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="defensefaults_ord_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="defensefaults_sev_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="defensefaults_sev_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Falli di servizio</label>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="servefaults_ord_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="servefaults_ord_2ref" className="block p-2 w-full form-input-disabled text-sm" disabled />
            </div>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="servefaults_sev_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="servefaults_sev_2ref" className="block p-2 w-full form-input-disabled text-sm" disabled />
            </div>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Falli del libero</label>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="liberofaults_ord_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="liberofaults_ord_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="liberofaults_sev_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="liberofaults_sev_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Altri falli</label>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="otherfaults_ord_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="otherfaults_ord_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-1">
                <input type="number" id="otherfaults_sev_1ref" className="block p-2 w-full form-input text-sm" />
                <input type="number" id="otherfaults_sev_2ref" className="block p-2 w-full form-input text-sm" />
            </div>
        </div>
        <div className="mb-4">
            <label for="error_notes" className="form-label dark:text-gray-300">Note</label>
            <textarea type="text" id="error_notes" rows="4" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label></label>
            <label className="form-label dark:text-gray-300">1° Arbitro</label>
            <label className="form-label dark:text-gray-300">2° Arbitro</label>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Collaborazione tecnica</label>
            <FourOptions id="collab1ref" />
            <FourOptions id="collab2ref" />
        </div>
        <div className="mb-2">
            <label for="collab_notes" className="form-label dark:text-gray-300">Note</label>
            <textarea type="text" id="collab_notes" rows="4" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
        </div>
    </div>
)

const RelArea = () => (
    <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
        <div className="mb-4">
            <h3 className="generic-title">Area Relazionale</h3>
        </div>
        <div className="mb-4">
            <div>
                <label for="gest_difficulty" className="form-label dark:text-gray-300">Complessità gestionale</label>
                <DifficOptions id="gest_difficulty" />
            </div>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label></label>
            <label className="form-label dark:text-gray-300">1° Arbitro</label>
            <label className="form-label dark:text-gray-300">2° Arbitro</label>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Gestione e Autorevolezza</label>
            <FourOptions id="gest1ref" />
            <FourOptions id="gest2ref" />
        </div>
        <div className="mb-4 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Livello di concentrazione (era in linea con l'evento?)</label>
            <FourOptions id="conc1ref" />
            <FourOptions id="conc2ref" />
        </div>
        <div className="mb-2">
            <label for="rel_notes" className="form-label dark:text-gray-300">Note</label>
            <textarea type="text" id="rel_notes" rows="4" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
        </div>
    </div>
)

const DisciplineArea = () => (
    <div className="mb-2 py-2 min-w-full px-6 lg:px-8 bg-gray-100 shadow-md sm:rounded-lg">
        <div className="mb-4">
            <h3 className="generic-title">Area Disciplinare</h3>
        </div>
        <div className="mb-4">
            <div>
                <label for="gest_difficulty" className="form-label dark:text-gray-300">Complessità disciplinare</label>
                <DifficOptions id="gest_difficulty" />
            </div>
        </div>
        <div className="mb-4 grid grid-cols-3 md:grid-cols-5 gap-1 items-center">
            <div>
                <label for="d_verbals" className="form-label dark:text-gray-300">Avv. verbali</label>
                <FaultSelect id="d_verbals" />
            </div>
            <div>
                <label for="d_officials" className="form-label dark:text-gray-300">Avv. ufficiali</label>
                <FaultSelect id="d_officials" />
            </div>
            <div>
                <label for="d_penals" className="form-label dark:text-gray-300">Penalizzazioni</label>
                <FaultSelect id="d_penals" />
            </div>
            <div>
                <label for="d_expulsions" className="form-label dark:text-gray-300">Espulsioni</label>
                <FaultSelect id="d_expulsions" />
            </div>
            <div>
                <label for="d_squalifications" className="form-label dark:text-gray-300">Squalifiche</label>
                <FaultSelect id="d_squalifications" />
            </div>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label></label>
            <label className="form-label dark:text-gray-300">1° Arbitro</label>
            <label className="form-label dark:text-gray-300">2° Arbitro</label>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Amministrazione della disciplina</label>
            <FourOptions id="discipline" />
            <select className="block p-2 w-full form-input-disabled text-sm" disabled />
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Interazione disciplinare</label>
            <select className="block p-2 w-full form-input-disabled text-sm" disabled />
            <FourOptions id="disc_interation" />
        </div>
        <div className="mb-4 grid grid-cols-3 gap-1 items-center">
            <label className="truncate">Richieste improprie e ritardi di gioco</label>
            <FourOptions id="delays1ref" />
            <FourOptions id="delays2ref" />
        </div>
        <div className="mb-2">
            <label for="disc_notes" className="form-label dark:text-gray-300">Note</label>
            <textarea type="text" id="disc_notes" rows="4" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
        </div>
    </div>
)

const InterviewArea = () => (
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
            <select id="interview1ref" className="form-select text-sm">
                <option>Nella norma</option>
                <option>Zelante e/o polemico</option>
                <option>Disattento e/o distratto</option>
            </select>
            <select id="interview2ref" className="form-select text-sm">
                <option>Nella norma</option>
                <option>Zelante e/o polemico</option>
                <option>Disattento e/o distratto</option>
            </select>
        </div>
        <div className="mb-4">
            <label for="interview_notes" className="form-label dark:text-gray-300">Motivazioni fornite dagli arbitri in relazione ai rilievi</label>
            <textarea type="text" id="interview_notes" rows="4" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
        </div>
    </div>
)

const EventsArea = () => (
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
            <select id="finalvote1ref" className="form-select text-sm">
                <option>Eccellente</option>
                <option>Buona</option>
                <option>Media</option>
                <option>Parz. carente</option>
                <option>Insoddisfacente</option>
            </select>
            <select id="finalvote2ref" className="form-select text-sm">
                <option>Eccellente</option>
                <option>Buona</option>
                <option>Media</option>
                <option>Parz. carente</option>
                <option>Insoddisfacente</option>
            </select>
        </div>
    </div>
)

function ReportForm () {
    return (
        <div className="container flex">
            <form>
                <GeneralArea />
                <MatchArea />
                <ImageArea />
                <TechnicalArea />
                <RelArea />
                <DisciplineArea />
                <InterviewArea />
                <EventsArea />
            </form>
        </div>
    )
}

export default ReportForm;