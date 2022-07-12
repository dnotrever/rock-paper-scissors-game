const form = document.querySelector('form')

const usernameError = document.querySelector('.username-error')
const emailError = document.querySelector('.email-error')
const passwordError = document.querySelector('.password-error')

form.addEventListener('submit', async e => {

    e.preventDefault()

    usernameError.textContent = ''
    emailError.textContent = ''
    passwordError.textContent = ''

    const username = form.username.value
    const email = form.email.value
    const password = form.password.value

    try {

        const res = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: {'Content-Type':'application/json'}
        })

        const data = await res.json()

        usernameError.textContent = data.username
        emailError.textContent = data.email
        passwordError.textContent = data.password

        if (data.player) {
            location.assign('/profile')
        }

    } 

    catch (err) {
        console.log(err)
    }

})