import { unbindEvent, bindEvent } from "/scripts/general.js";
const setCard = `<img src="/media/setVertical.png" class="card setCard" alt="setCard"/>`;

/**
 * Função para Selecionar Carta da Mão
 */
function clickCard(card) {
    const cardMao = document.querySelectorAll('.cardMao');
    // Card não está selecionado
    if (card.style.transform !== '') {
        card.style.transform = '';
        card.classList.remove('desativaHover');
        card.previousElementSibling.style.display = 'none';
    }
    // Card está selecionado
    else {
        // Retira o efeito selecionado das cartas além da selecionada
        for (let i = 0; i < cardMao.length; i++) {
            if (cardMao[i] === card) {
                continue;
            }
            cardMao[i].style.transform = '';
            cardMao[i].classList.remove('desativaHover');
            cardMao[i].previousElementSibling.style.display = 'none';
        }
        // Adiciona o efeito selecionado a carta clicada
        card.style.transform = 'translateY(-4vh)';
        card.classList.add('desativaHover');
        if(card.dataset.nivel && card.dataset.nivel > 4){
            return;
        }
        card.previousElementSibling.style.display = 'flex';
    }
}
/**
 * Função para Retirar Possibilidade de Ação na Mão do Jogador
 */
function pauseHand() {
    const cardMao = document.querySelectorAll('.cardMao');
    cardMao.forEach((card) => {
        if (card.style.pointerEvents !== 'none') {
            card.style.pointerEvents = 'none';
        } else {
            card.style.pointerEvents = 'visible';
        }
    });
}

/**
 * Função para Jogar Cartas Monstro
 */
function playMonster(action, monsterCard, monsterSpaces, position) {
    if (monsterCard.style.boxShadow === '') {
        return;
    }
    const monsterSpace = monsterCard.parentElement;
    const imgCardMao = action.nextElementSibling.src;
    let summonCard;
    if(position === 90){
        summonCard = `<img style="display: none;" src="${imgCardMao}" class="card" alt="cartaYuGiOh">`;
        monsterSpace.innerHTML += setCard;
        monsterSpace.lastElementChild.classList.add('setMonster');
    } else {
        summonCard = `<img src="${imgCardMao}" class="card" alt="cartaYuGiOh">`;
    }
    monsterSpace.innerHTML += summonCard;

    const card = action.parentElement;  // Carta Elemento
    card.remove();
    for (let i = 0; i < monsterSpaces.length; i++) {
        const allMonsterSpace = monsterSpaces[i].firstElementChild;
        allMonsterSpace.style.boxShadow = '';
    }
    pauseHand();
}
/**
 * Função para Jogar Cartas Mágica/Armadilhas
 */
function playSpell(action, spellCard, spellSpaces, active) {
    if (spellCard.style.boxShadow === '') {
        return;
    }
    const spellSpace = spellCard.parentElement; // Espaço do Card
    spellCard.src = action.nextElementSibling.src;  // Transferindo Imagem da Mão
    spellCard.alt = 'cartaYuGiOh';                  // Transferindo Imagem da Mão
    if (!active) {
        spellCard.style.display = 'none';
        spellSpace.innerHTML += setCard;
    }
    const card = action.parentElement;  // Carta Elemento
    card.remove();
    for (let i = 0; i < spellSpaces.length; i++) {
        const allSpellSpace = spellSpaces[i].firstElementChild;
        allSpellSpace.style.boxShadow = '';
    }
    pauseHand();
}

/**
 * Função para Jogar Todos os Tipos de Carta
 */
function clickAction(action, actClicked) {
    // Retira o ícone da tela, guarda o valor do texto do ícone, e bloqueia o acesso à mão
    action.style.display = 'none';
    const cardType = action.nextElementSibling;
    pauseHand();

    // Para Cada Tipo de Carta, uma Ação
    if (cardType.dataset.nivel) {
        // Colocando sombra nos espaços dos monstros, e adicionando ação para colocar a carta
        const monsterSpaces = document.querySelectorAll('.JMonstro');
        const position = actClicked.lastElementChild.innerText.includes("Invocar") ? 0 : 90;
        monsterSpaces.forEach((monsterSpace) => {
            const monsterCard = monsterSpace.firstElementChild;
            monsterCard.style.boxShadow = '0 0 1vw 0.2vw rgba(255, 255, 0, 1)';
            unbindEvent(monsterCard, 'click');
            bindEvent(monsterCard, 'click', () => playMonster(action, monsterCard, monsterSpaces, position));
        });
    } else if (cardType.dataset.tipo) {
        const spellSpaces = document.querySelectorAll('.JMagica');
        const active = actClicked.lastElementChild.innerText.includes("Ativar");
        spellSpaces.forEach((spellSpace) => {
            const spellCard = spellSpace.firstElementChild;
            spellCard.style.boxShadow = '0 0 1vw 0.2vw rgba(255, 255, 0, 1)';
            unbindEvent(spellCard, 'click');
            bindEvent(spellCard, 'click', () => playSpell(action, spellCard, spellSpaces, active));
        });
    }
}

/**
 * Função para Gerenciar as cartas e Ações da sua Mão
 */
export default function selectCard() {
    // Elementos - Array das Cartas que estão na Mão
    const cardMao = document.querySelectorAll('.cardMao');
    cardMao.forEach((card) => {
        unbindEvent(card, 'click');
        bindEvent(card, 'click', () => clickCard(card));
    });

    // Elementos - Array de Ícones de Ação, como Invocar e Baixar
    const playAction = document.querySelectorAll('.boxAction');
    playAction.forEach((action) => {
        unbindEvent(action, 'click');
        bindEvent(action, 'click', (e) => clickAction(action, e.target));
    });
}