import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
//primeiro iniciar o mongoose
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('banco conectado com sucesso'))
//agora conectei o bando e adicionei o then 
.catch((error)=> console.log('erro ao conectar o banco', error))

const NewUserSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true}

}, {timestamps: true}
)

const User = mongoose.model('Usuario', NewUserSchema)


app.post('/criarconta', async(req, res)=>{
    let newuser = req.body

    let Novousuario = await User.create(newuser)
    res.send(Novousuario)
    console.log(Novousuario)

})

app.post('/login', async(req, res)=>{
    let user = req.body

    const email = await User.findOne({ email: user.email })
    if(email){
        if(email.senha === user.senha){
            res.status(200).json({
                mensagem: 'entrou'
            })
        }
        else{
            res.status(401).json({
                mensagem:'senha incorreto!'
            })
        }
        
    }
    else{
        res.status(401).json({
            mensagem:'email incorreto!'
        })
    }

})


const port = process.env.PORT 

app.listen(port, ()=>{
    console.log(`rodando na porta ${port}`)
})