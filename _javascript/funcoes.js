const q = element => document.querySelector(element)
const qAll = element => document.querySelectorAll(element)
let respostasCorretas = 0
let questaoAtual = 0
let questaoProgresso = 1


function mostrarPergunta(numeroPergunta) {
    q('.options').innerHTML = ''
    q('.question h1').innerHTML = perguntas[numeroPergunta].pergunta

    perguntas[numeroPergunta].opcoes.forEach(opcao => {
       const span = document.createElement('span')
       span.innerHTML = opcao.resposta

       if (opcao.certo === true) {
           span.setAttribute('data-key', 'correto')
       }

       q('.options').appendChild(span)
    })

    qAll('.options span').forEach(span => {
        span.addEventListener('click', verificarResposta)
    })
}


function verificarResposta(event) {

    if (!q('.respostaCorreta') && !q('.respostaErrada')) {
        if (event.target.dataset.key) {
            event.target.classList.add('respostaCorreta')
            respostasCorretas++
        } else {
            event.target.classList.add('respostaErrada')
        }
    } else {
        console.log('não funcionando')
    }

}


function nextQuestion() {

    if (questaoAtual < perguntas.length - 1) {
        questaoAtual++
    } else {
        fimJogo()
    }

    if (questaoAtual == perguntas.length - 1) {
        q('.next-question').innerHTML = 'Finalizar quiz'
    }

    aumentarProgresso()
    mostrarPergunta(questaoAtual)
}

function fimJogo() {
    q('.fim-Jogo').classList.remove('display-none')
    q('.quizTest').classList.add('display-none')
}


function reiniciarQuiz() {
    respostasCorretas = 0
    questaoAtual = 0
    questaoProgresso = 0

    q('.fim-Jogo').classList.add('display-none')
    q('.quizTest').classList.remove('display-none')

    aumentarProgresso()
    mostrarPergunta(questaoAtual)
}


function aumentarProgresso() {
    let progresso = (100/perguntas.length) * questaoProgresso
    questaoProgresso++
    q('.barra-progresso').style.width = `${progresso}%`
    console.log(questaoAtual, questaoProgresso)
}



// PROGRAMAR PRA DAR ERRO SE PASSAR PARA PROXIMA QUESTAO SEM ESCOLHER UMA RESPOSTA