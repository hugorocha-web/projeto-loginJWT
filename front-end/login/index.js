let btn = document.querySelector('.btn-submit')

btn.addEventListener('click', async()=>{
    let email = document.querySelector('#email').value
    let senha = document.querySelector('#senha').value

    console.log(email, senha)
    try {
        
        let enviaruser = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:email,
                senha:senha
            })

        })
        console.log(enviaruser.status)
        if(enviaruser.status===200){
            let token = await enviaruser.json()
            localStorage.setItem('token', token.token)
            window.location.href = 'index.html'
            console.log(token.token)
            console.log('entrou')
        }
        else if(enviaruser.status===401){
            console.log('email ou senha incorretos')
        }



    } 
    catch (error) {
        console.log(error)
    }

})