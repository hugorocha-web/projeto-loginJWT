async function carregarPerfil() {
    const token = localStorage.getItem('token')

    if (!token) {
        window.location.href = 'login.html'
        return
    }

    const resposta = await fetch('https://projeto-loginjwt.onrender.com/perfil', {
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
}

carregarPerfil()