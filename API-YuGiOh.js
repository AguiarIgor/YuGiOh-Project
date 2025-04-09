const fetch = require('node-fetch');
const fs = require('fs');

async function obterCard() {
    try {
        const urlFera = `https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=Structure Deck: Legend of the Crystal Beasts&language=pt`;
        //const urlCyber = `https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=Structure Deck: Cyber Strike&language=pt`;
        //const urlLink = `https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=Structure Deck: Cyberse Link&language=pt`;

        const resposta1 = await fetch(urlFera);
        //const resposta2 = await fetch(urlCyber);
        //const resposta3 = await fetch(urlLink);
        if (!resposta1.ok) {
            throw new Error("Erro ao obter dados da API");
        }

        const dadosDeck1 = await resposta1.json();
        //const dadosDeck2 = await resposta2.json();
        //const dadosDeck3 = await resposta3.json();

        let dadosCard;
        if(dadosDeck1.data && dadosDeck1.data.length > 0) {
            dadosCard = [];
            for (let i = 0; i < dadosDeck1.data.length; ++i) {
                const card = dadosDeck1.data[i];
                dadosCard = await adicionarCard(dadosCard, card);
            }

            fs.writeFileSync('./media/Decks/DeckFera/DeckFera.json', JSON.stringify(dadosCard, null, 2), 'utf-8');
            console.log('Dados gravados do Deck de Feras');
        } else {
            console.log('Nenhum card encontrado.');
        }
        /*if(dadosDeck2.data && dadosDeck2.data.length > 0){
            dadosCard = [];
            for (let i = 0; i < dadosDeck2.data.length; ++i) {
                const card = dadosDeck2.data[i];
                dadosCard = await adicionarCard(dadosCard, card);
            }

            fs.writeFileSync('./media/Decks/DeckCyber/DeckCyber.json', JSON.stringify(dadosCard, null, 2), 'utf-8');
            console.log('Dados gravados do Deck de Cyber');
        } else {
            console.log('Nenhum card encontrado.');
        }*/
        /*if(dadosDeck3.data && dadosDeck3.data.length > 0){
            dadosCard = [];
            for (let i = 0; i < dadosDeck3.data.length; ++i) {
                const card = dadosDeck3.data[i];
                dadosCard = await adicionarCard(dadosCard, card);
            }

            fs.writeFileSync('./media/Decks/DeckLink/DeckLink.json', JSON.stringify(dadosCard, null, 2), 'utf-8');
            console.log('Dados gravados do Deck de Link');
        } else {
            console.log('Nenhum card encontrado.');
        }*/
    } catch (erro) {
        console.error('Erro:', erro.message);
    }
}

async function adicionarCard(dadosCard, card) {
    if (!Array.isArray(dadosCard)) {
        console.error('dadosCard não é um array!');
        return dadosCard;
    }

    dadosCard.push({
        nome: card.name,
        tipo: card.type,
        subCardType: card.subCardType,
        desc: card.desc,
        pend_des: card?.pend_des,
        monster_desc: card?.monster_desc,
        race: card.race,
        atk: card?.atk,
        def: card?.def,
        arquetipo: card?.arquetipo,
        level: card?.level,
        attributes: card?.attributes,
        scale: card?.scale,
        linkval: card?.linkval,
        linkmarkers: card?.linkmarkers,
        card_image: card.card_image,
    });
    return dadosCard;
}


// Exemplo de uso: Passar o nome do card para buscar
obterCard().then(r => console.log(r));