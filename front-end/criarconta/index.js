let btn = document.querySelector('.btn-submit')

btn.addEventListener('click', async()=>{
    let nome = document.querySelector('#nome').value
    let email = document.querySelector('#email').value
    let senha = document.querySelector('#senha').value

    console.log(nome, email, senha)

    try {
        let enviaruser = await fetch('http://localhost:3000/criarconta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome:nome,
                email:email,
                senha:senha
            })

        })
        console.log(enviaruser.status)
        if(enviaruser.status===200){
            window.location.href = '../login/login.html'
        }



    } 
    catch (error) {
        console.log(error)
    }

})