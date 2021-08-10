const q = element => document.querySelector(element)
const qAll = element => document.querySelectorAll(element)
let respostasCorretas = 0
let questaoAtual = 0
let questaoProgresso = 1


function mostrarPergunta(numeroPergunta) {
    q('.opcoes').innerHTML = ''
    q('.pergunta h1').innerHTML = perguntas[numeroPergunta].pergunta
    q('.pergunta img').setAttribute('src', perguntas[numeroPergunta].img)

    perguntas[numeroPergunta].opcoes.forEach(opcao => {
        const opcoes = document.createElement('div')
        const alternativa = document.createElement('div')
        const resposta = document.createElement('div')

        alternativa.classList.add('alternativa')
        resposta.classList.add('resposta')
        opcoes.classList.add('opcao')

        resposta.innerHTML = opcao.resposta
        alternativa.innerHTML = opcao.alternativa

        if (opcao.certo === true) {
            opcoes.setAttribute('data-key', 'correto')
        }

        opcoes.appendChild(alternativa)
        opcoes.appendChild(resposta)

        q('.opcoes').appendChild(opcoes)
    })

    qAll('.opcoes .opcao').forEach(opcao => {
        opcao.addEventListener('click', verificarResposta)
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