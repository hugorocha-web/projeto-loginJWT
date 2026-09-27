async function carregarPerfil() {
    const token = localStorage.getItem('token')
    if (!token) {
        window.location.href = 'login.html'
        return
    }

    console.log('TOKEN:', token)

    const resposta = await fetch('http://localhost:3000/perfil', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!resposta.ok) {
        localStorage.removeItem('token')
        window.location.href = 'login.html'
        return
    }

    const dados = await resposta.json()

    console.log(dados)
}

carregarPerfil()