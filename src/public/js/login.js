const form = document.querySelector('form')

const usernameError = document.querySelector('.username-error')
const passwordError = document.querySelector('.password-error')

form.addEventListener('submit', async event => {

    event.preventDefault()

    usernameError.textContent = ''
    passwordError.textContent = ''

    const username = form.username.value
    const password = form.password.value

    try {

        const res = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {'Content-Type':'application/json'}
        })

        const data = await res.json()

        usernameError.textContent = data.username
        passwordError.textContent = data.password

        if (data.player) {
            location.assign('/profile')
        }

    } 

    catch (err) {
        console.log(err)
    }

})