import { unbindEvent, bindEvent } from "/scripts/general.js";
import handPuxada, { deckCard } from "/scripts/deckSelection.js";

export const changePhase = document.getElementById("changePhase");

/**
 * Funções para Abrir e Fechar ModalPhase
 */
const modalPhase = document.querySelector(".modalPhase");
const modalPhases = document.getElementById("modalPhases");
changePhase.addEventListener('click', () => {
    modalPhases.style.display = 'flex';
    modalPhase.style.display = 'block';
});
window.addEventListener('click', function (e) {
    const tg = e.target;
    e.stopPropagation();
    if (tg === modalPhases) {
        modalPhases.style.display = 'none';
        modalPhase.style.display = 'none';
    }
});

/**
 * Função para Mudar a Phase do Turno
 */
const turnPhases = document.querySelectorAll(".phase");
turnPhases[0].disabled = true;
turnPhases[1].disabled = true;
turnPhases.forEach((phase) => {
    phase.addEventListener('click', () => {
        changePhase.innerText = phase.innerText;
        modalPhases.style.display = 'none';
        modalPhase.style.display = 'none';
    });
});

function phaseControl() {
    switch (changePhase.innerText) {
        case '':
            unbindEvent(deckCard, 'click');
            changePhase.disabled = true;
            break;
        case 'Draw Phase':
            bindEvent(deckCard, 'click', handPuxada);
            changePhase.disabled = true;
            break;
        case 'Standby Phase':
            turnPhases[2].disabled = false;
            turnPhases[3].disabled = false;
            unbindEvent(deckCard, 'click');
            setTimeout(() => {changePhase.innerText = 'Main Phase';}, 1000);
            break;
        case 'Main Phase':
            changePhase.disabled = false;
            turnPhases[4].disabled = true;
            break;
        case 'Battle\nPhase':
            turnPhases[2].disabled = true;
            turnPhases[4].disabled = false;
            break;
        case 'Main\nPhase 2':
            turnPhases[3].disabled = true;
            break;
        case 'End\nPhase':
            setTimeout(() => {changePhase.innerText = 'Draw Phase';}, 2000);
            break;
    }
}
const observeChangePhase = new MutationObserver(phaseControl);
const configPhase = { childList: true, subtree: true };
observeChangePhase.observe(changePhase, configPhase);