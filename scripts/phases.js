import { unbindEvent, bindEvent } from "/scripts/general.js";
import handPuxada, { deckCard } from "/scripts/deckSelection.js";

const changePhase = document.getElementById("changePhase");

/**
 * Funções para Abrir e Fechar ModalPhase
 */
const modalPhase = document.getElementsByClassName("modalPhase")[0];
const modalPhases = document.getElementById("modalPhases");
changePhase.addEventListener('click', () => {
    modalPhases.style.display = 'flex';
    modalPhase.style.display = 'block';
});
window.onclick = function (e) {
    const tg = e.target;
    e.stopPropagation();
    if (tg === modalPhases) {
        modalPhases.style.display = 'none';
        modalPhase.style.display = 'none';
    }
}

/**
 * Função para Mudar a Phase do Turno
 */
const turnPhases = document.querySelectorAll(".phase");
turnPhases.forEach((phase) => {
    phase.addEventListener('click', () => {
        changePhase.innerText = phase.firstElementChild.textContent;
    });
});

function phaseControl() {
    switch (changePhase.innerText) {
        case 'Draw Phase':
            bindEvent(deckCard, 'click', handPuxada);
            break;
        case 'Standby Phase':
            unbindEvent(deckCard, 'click');
            break;
        case 'Main Phase':
            break;
        case 'Battle Phase':
            break;
        case 'Main Phase 2':
            break;
        case 'End Phase':
            changePhase.innerText = 'Draw Phase';
            break;
    }
}
const observeChangePhase = new MutationObserver(phaseControl);
const configPhase = { childList: true, subtree: true };
observeChangePhase.observe(changePhase, configPhase);