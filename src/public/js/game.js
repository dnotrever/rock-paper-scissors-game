
const winningMoves = ['rock-scissors','paper-rock','scissors-paper']
const drawMoves = ['rock-rock','paper-paper','scissors-scissors']

const body = document.querySelector('body')
const playerId = document.querySelector('.player-id')
const selectedTable = document.querySelector('.selected')
const opponentTable = document.querySelector('.opponent')
const resultArea = document.querySelector('.game-result')

function play(hand) {

    body.style.cssText = 'pointer-events: none'

    resultArea.innerHTML = '...'
    selectedTable.innerHTML = ''
    opponentTable.innerHTML = ''

    setTimeout( () => {
        move = ''
        move += hand + '-'
        selectedTable.innerHTML = `<i class="far fa-hand-${hand}"></i>`
        opponent()
        result()
        body.style.cssText = 'pointer-events: auto'
    }, 1000)

}

function opponent() {

    let random = Math.floor(Math.random()*(4-1)+1)

    switch(random) {
        case 1:
            move += 'rock'
            return opponentTable.innerHTML = '<i class="far fa-hand-rock"></i>'
        case 2:
            move += 'paper'
            return opponentTable.innerHTML = '<i class="far fa-hand-paper"></i>'
        case 3:
            move += 'scissors'
            return opponentTable.innerHTML = '<i class="far fa-hand-scissors"></i>'
    }
    
}

async function result() {    

    let playerPlays = 1
    let playerWins = 0
    let playerDraws = 0
    let playerLosses = 0

    if (winningMoves.includes(move)) {
        resultArea.innerHTML = 'You Win!'
        playerWins = 1
    } else if (drawMoves.includes(move)) {
        resultArea.innerHTML = 'Draw!'
        playerDraws = 1
    } else {
        resultArea.innerHTML = 'You Lose!'
        playerLosses = 1
    }

    const id = playerId.innerText
    const plays = playerPlays
    const wins = playerWins
    const draws = playerDraws
    const losses = playerLosses

    try {
        await fetch('/game', {
            method: 'POST',
            body: JSON.stringify({ id, plays, wins, draws, losses }),
            headers: {'Content-Type':'application/json'}
        })
    }
    catch (err) {
        console.log(err)
    }

}