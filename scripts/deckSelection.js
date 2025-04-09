import selectCard from "/scripts/playCard.js";
import { changePhase } from "/scripts/phases.js";

/**
 * Função para Selecionar o Deck a ser Utilizado
 */
let checkDeck = document.getElementsByClassName("checkDeck")[0];
let selectedDeck = [];
let selectedAdicionalDeck = [];
export let handCards = [];
//let cemeteryCards = [];
let btnSelectDeck = document.getElementById('deckEscolhido');
btnSelectDeck.addEventListener('click', function () {
    const checkboxs = document.getElementsByClassName('radio');
    const deckName = ["DeckCyber", "DeckFera", "DeckLink"];
    let marcador = -1;

    for (let i = 0; i < checkboxs.length; i++) {
        if (checkboxs[i].checked) {
            marcador = i;
        }
    }
    if (marcador === -1) {
        const errorMessage = document.getElementsByClassName('modalDeck')[0].lastElementChild;
        errorMessage.style.display = 'block';
        errorMessage.innerText = "Por favor, escolha um Deck para jogar!";
        return;
    }
    fetch(`/${deckName[marcador]}`)
        .then(response => response.json())
        .then(data => {
            selectedDeck = data;
            for (let i = 0; i < selectedDeck.length; ++i) {
                const card = selectedDeck[i];
                if (card.tipo === "Fusion Monster" || card.tipo === "Link Monster" ||
                    card.tipo === "XYZ Monster" || card.tipo === "Synchro Monster") {
                    selectedAdicionalDeck.push(selectedDeck[i]);
                }
            }
            selectedDeck = selectedDeck.filter(card => !selectedAdicionalDeck.includes(card));

            checkDeck.style.display = 'none';
            const puxadaIntervalo = setInterval(handPuxada,200);
            setTimeout(() => {
                    clearInterval(puxadaIntervalo);
                    changePhase.innerText = 'Draw Phase';
                }, 1000);
        })
        .catch(error => {
            console.error('Erro ao carregar o Deck.JSON:', error);
        });
});

/**
 * Função de Puxar as Cartas do Deck
 */
export const deckCard = document.getElementsByClassName("JDeck")[0].firstElementChild;
export const hand = document.getElementsByClassName("hand")[0];
export default function handPuxada() {
    if(selectedDeck.length === 0) {
        console.log("You Lose!")
        return;
    }
    const indexPuxada = Math.floor(Math.random() * selectedDeck.length);
    const cartaPuxada = selectedDeck.splice(indexPuxada, 1)[0];
    handCards.push(cartaPuxada);

    let cardType = cartaPuxada.tipo;
    let carta;
    if(cardType.includes("Monster")){
        carta = `
        <div class="linhaMao">
            <div class="boxAction">
                <div class="playAction">
                    <img src="/media/actionIcons/summon_icon.png" alt="Invocar" class="imgAction"/>
                    <p class="textAction">Invocar</p>
                </div>
                <div class="playAction">
                    <img src="/media/actionIcons/setSpell.png" alt="Baixar" class="imgAction"/>
                    <p class="textAction">Baixar</p>
                </div>
            </div>
            <img src="${cartaPuxada.card_image}" data-nivel="${cartaPuxada.level}" alt="cartaYuGiOh" class="cardMao"/>
        </div>`
    }
    else {
        carta = `
        <div class="linhaMao">
            <div class="boxAction">
                <div class="playAction">
                    <img src="/media/actionIcons/playSpell.png" alt="Ativar" class="imgAction"/>
                    <p class="textAction">Ativar</p>
                </div>
                <div class="playAction">
                    <img src="/media/actionIcons/setSpell.png" alt="Baixar" class="imgAction"/>
                    <p class="textAction">Baixar</p>
                </div>
            </div>
            <img src="${cartaPuxada.card_image}" data-tipo="${cardType}" alt="cartaYuGiOh" class="cardMao"/>
        </div>`
    }
    hand.innerHTML += carta;
    if(changePhase.innerText === 'Draw Phase') changePhase.innerText = 'Standby Phase';
    selectCard();
}