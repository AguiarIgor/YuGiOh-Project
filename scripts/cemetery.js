// Funções do Cemitério e seu Modal
const linhaCemiterio = document.getElementsByClassName("linhaCemiterio")[0];
const cemiterio = document.getElementsByClassName("JCemiterio")[0].firstElementChild;
const modalCemiterio = document.getElementById("modalCemetery");
const modalCards = document.getElementsByClassName("modalCards")[0];
let btnFechar = document.getElementsByClassName("fechar")[0];

cemiterio.addEventListener('click', () => {
    modalCemiterio.style.display = 'flex';
    modalCards.style.display = 'block';
});
btnFechar.addEventListener('click', () => {
    modalCemiterio.style.display = 'none';
    modalCards.style.display = 'none';
});

window.onclick = function (e) {
    const tg = e.target;
    e.stopPropagation();
    if (tg === modalCemiterio) {
        modalCemiterio.style.display = 'none';
        modalCards.style.display = 'none';
    }
}
linhaCemiterio.addEventListener('wheel', function (event) {
    if (event.deltaY !== 0) {
        linhaCemiterio.scrollLeft += event.deltaY * 0.5;
        event.preventDefault();
    }
});