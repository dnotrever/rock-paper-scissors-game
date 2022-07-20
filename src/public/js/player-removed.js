const playerId = document.querySelector('.playerId')

async function removePlayer() {

    const id = playerId.innerText

    try {

        await fetch('/player-removed', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {'Content-Type':'application/json'}
        })
    
        location.assign('/')

    }

    catch (err) {
        console.log(err)
    }
    
}