var tabuleiro = document.getElementById('tabuleiro');
var posicaoEscolhida = document.getElementById('posicao');
var elemento = "";

const manipuladorClick = (evento) => {

    if (evento.target.tabIndex === 1) {
        const idCasa = evento.target.id;

        elemento.style = "background-color: antiquewhite"

        posicaoEscolhida.textContent = idCasa;
        elemento = document.getElementById(idCasa);

        elemento.style = "background-color:  rgba(0, 0, 0, .5);";

    }
    else {
        posicaoEscolhida.textContent = "-";
        elemento.style = "background-color: antiquewhite"
        return;
    }
}

tabuleiro.addEventListener('click', manipuladorClick);

const manipuladorKey = (event) => {
    const keyName = event.key;

    var historico = [];

    const jogadas = window.sessionStorage.getItem('jogadas');

    if (jogadas) {
        historico = JSON.parse(jogadas);

        const reversed = historico.reverse();
        var ultimo = reversed[0];

        if (ultimo.jogador == keyName) {
            window.alert("Vez do outro jogador");
            return;
        }
    }

    if (event.target.tabIndex != 1 && keyName == "x" || event.target.tabIndex != 1 && keyName == 'o') {
        alert("Escolha um quadrante!");
        return;
    }

    if (event.target.tabIndex == 1 && elemento.textContent == "x" || event.target.tabIndex == 1 && elemento.textContent == 'o') {
        alert("Posição já ocupada");
        return;
    }

    if (event.target.tabIndex == 1 && keyName != "x" && keyName != 'o') {
        alert("Escolha apenas x ou o");
        return;
    }

    else if (event.target.tabIndex == 1 && keyName == "x" || keyName == 'o') {
        elemento.textContent = keyName;

        const jogada = {
            jogador: keyName,
            quadrante: elemento.id
        };

        historico.push(jogada);

        const historicoEmString = JSON.stringify(historico);
        window.sessionStorage.setItem('jogadas', historicoEmString);
    }
    VerificaVencedor();
}

document.addEventListener('keypress', manipuladorKey);

function VerificaVencedor() {
    var elementos = tabuleiro.children;

    if (elementos[0].children[2].innerText == 'x' &&
        elementos[1].children[1].innerText == 'x' &&
        elementos[2].children[0].innerText == 'x' ||

        elementos[0].children[0].innerText == 'x' &&
        elementos[1].children[0].innerText == 'x' &&
        elementos[2].children[0].innerText == 'x' ||

        elementos[0].children[2].innerText == 'x' &&
        elementos[1].children[2].innerText == 'x' &&
        elementos[2].children[2].innerText == 'x' ||

        elementos[0].children[1].innerText == 'x' &&
        elementos[1].children[1].innerText == 'x' &&
        elementos[2].children[1].innerText == 'x' ||

        elementos[0].children[0].innerText == 'x' &&
        elementos[1].children[1].innerText == 'x' &&
        elementos[2].children[2].innerText == 'x' ||

        elementos[0].children[0].innerText == 'x' &&
        elementos[0].children[1].innerText == 'x' &&
        elementos[0].children[2].innerText == 'x' ||

        elementos[1].children[0].innerText == 'x' &&
        elementos[1].children[1].innerText == 'x' &&
        elementos[1].children[2].innerText == 'x' ||

        elementos[2].children[0].innerText == 'x' &&
        elementos[2].children[1].innerText == 'x' &&
        elementos[2].children[2].innerText == 'x') {

        alert('Deu Velha! \nJogador "X" Venceu');
        setTimeout(() => { reiniciar() }, 1000);
    }

    if (elementos[0].children[2].innerText == 'o' &&
        elementos[1].children[1].innerText == 'o' &&
        elementos[2].children[0].innerText == 'o' ||

        elementos[0].children[0].innerText == 'o' &&
        elementos[1].children[0].innerText == 'o' &&
        elementos[2].children[0].innerText == 'o' ||

        elementos[0].children[2].innerText == 'o' &&
        elementos[1].children[2].innerText == 'o' &&
        elementos[2].children[2].innerText == 'o' ||

        elementos[0].children[1].innerText == 'o' &&
        elementos[1].children[1].innerText == 'o' &&
        elementos[2].children[1].innerText == 'o' ||

        elementos[0].children[0].innerText == 'o' &&
        elementos[1].children[1].innerText == 'o' &&
        elementos[2].children[2].innerText == 'o' ||

        elementos[0].children[0].innerText == 'o' &&
        elementos[0].children[1].innerText == 'o' &&
        elementos[0].children[2].innerText == 'o' ||

        elementos[1].children[0].innerText == 'o' &&
        elementos[1].children[1].innerText == 'o' &&
        elementos[1].children[2].innerText == 'o' ||

        elementos[2].children[0].innerText == 'o' &&
        elementos[2].children[1].innerText == 'o' &&
        elementos[2].children[2].innerText == 'o') {

        alert('Deu Velha! \nJogador "O" Venceu');
        setTimeout(() => { reiniciar() }, 1000);

    }
}

function reiniciar() {
    sessionStorage.clear();
    window.location.reload();

}

