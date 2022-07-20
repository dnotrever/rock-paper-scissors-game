const form = document.querySelector('form')
const playerId = document.querySelector('.playerId')

const usernameSuccess = document.querySelector('.username-success')
const emailSuccess = document.querySelector('.email-success')
const passwordSuccess = document.querySelector('.password-success')

const usernameError = document.querySelector('.username-error')
const emailError = document.querySelector('.email-error')
const passwordError = document.querySelector('.password-error')

form.addEventListener('submit', async event => {

    event.preventDefault()

    usernameSuccess.textContent = ''
    emailSuccess.textContent = ''
    passwordSuccess.textContent = ''

    usernameError.textContent = ''
    emailError.textContent = ''
    passwordError.textContent = ''

    const id = playerId.innerText
    const username = form.username.value
    const email = form.email.value
    const password = form.password.value

    try {

        const res = await fetch('/edit-account', {
            method: 'POST',
            body: JSON.stringify({ id, username, email, password }),
            headers: {'Content-Type':'application/json'}
        })

        const data = await res.json()

        usernameSuccess.textContent = data.messages.usernameSuccess
        emailSuccess.textContent = data.messages.emailSuccess
        passwordSuccess.textContent = data.messages.passwordSuccess

        usernameError.textContent = data.messages.usernameError
        emailError.textContent = data.messages.emailError
        passwordError.textContent = data.messages.passwordError

    } 

    catch (err) { console.log(err) }

})