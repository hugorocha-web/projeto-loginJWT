let btn = document.querySelector('.btn-submit')

btn.addEventListener('click', async () => {
    let email = document.querySelector('#email').value
    let senha = document.querySelector('#senha').value

    try {
        let enviaruser = await fetch('https://projeto-loginjwt.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        })

        if (enviaruser.status === 200) {
            let token = await enviaruser.json()

            localStorage.setItem('token', token.token)

            window.location.href = 'index.html'
        }

        else if (enviaruser.status === 401) {

        }

    } catch (error) {

    }
})