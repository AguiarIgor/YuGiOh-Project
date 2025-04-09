// Funções para visualizar e retirar visualização de informações da carta
import {hand} from '/scripts/deckSelection.js';

const infoAba = document.getElementsByClassName("infoAba")[0];
document.getElementsByTagName('html')[0].addEventListener('click', (e) => {
    if (infoAba.style.backgroundImage !== '') {
        infoAba.style.backgroundImage = '';
    }

    // Ao clicar em um ação de carta, a carta não é deselecionada
    const click = e.target;
    if(click.classList.contains('playAction')){ return; }

    // Deseleciona a carta ao clicar em outros elementos a não ser a carta
    const cardMao = document.querySelectorAll('.cardMao');
    if( cardMao[0] && cardMao[0].style.pointerEvents === 'none' ){ return; }
    for (let i = 0; i < cardMao.length; i++) {
        cardMao[i].style.transform = '';
        cardMao[i].classList.remove('desativaHover');
        cardMao[i].previousElementSibling.style.display = 'none';
    }
});

function trackCard() {
    let allCard = [];
    allCard.push(...document.getElementsByClassName('card'));
    allCard.push(...document.getElementsByClassName('cardMao'));
    allCard.push(...document.getElementsByClassName('cardCemiterio'));
    const viewCard = allCard.filter((card) => {
        const localCard = card.parentElement;
        return !(localCard.classList.contains("Deck") ||
            localCard.classList.contains("DeckAdicional") ||
            localCard.classList.contains("Cemiterio"));
    });

    viewCard.forEach((card) => {
        card.addEventListener('click', (e) => {
            if(card.classList.contains('setCard')) {
                const imgSource = [...card.parentElement.children].find(el => el.alt === 'cartaYuGiOh');
                infoAba.style.backgroundImage = `url(${imgSource.src})`;
                e.stopPropagation();
                return;
            }
            infoAba.style.backgroundImage = `url(${card.src})`;
            e.stopPropagation();
        });
    });
}
let observeTab = new MutationObserver(trackCard);
let configInfoTab = {childList: true}; // Observe alterações nos filhos (adicionar/remover elementos)
observeTab.observe(hand, configInfoTab);