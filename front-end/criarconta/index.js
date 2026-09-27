let btn = document.querySelector('.btn-submit')

btn.addEventListener('click', async () => {
    let nome = document.querySelector('#nome').value
    let email = document.querySelector('#email').value
    let senha = document.querySelector('#senha').value

    try {
        let enviaruser = await fetch('https://projeto-loginjwt.onrender.com/criarconta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha
            })
        })

        if (enviaruser.status === 200) {
            window.location.href = '../login/login.html'
        }
    } catch (error) {

    }
})