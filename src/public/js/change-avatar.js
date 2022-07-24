
var avatarSelect

function selectAvatar(avatar) {
    avatarSelect = avatar
}

const playerId = document.querySelector('.player-id')
const form = document.querySelector('form')

form.addEventListener('submit', async event => {

    event.preventDefault()

    const id = playerId.textContent
    const avatar = avatarSelect

    try {

        await fetch('/avatar-changed', {
            method: 'POST',
            body: JSON.stringify({ id, avatar }),
            headers: {'Content-Type':'application/json'}
        })

        location.assign('/profile')

    } 

    catch (err) { console.log(err) }

})