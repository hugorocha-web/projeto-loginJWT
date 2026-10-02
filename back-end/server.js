import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import jwt from 'jsonwebtoken'

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



function VerifyJwt(req, res, next){
    let token = req.headers["authorization"]
    if (!token) {
        return res.status(401).json({
            mensagem: 'não existe token'
        })
    }
    token = req.headers["authorization"].replace("Bearer ", "");
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (!decoded) return res.status(403).json({ message: "Invalid token." });

        res.locals.token = decoded
        return next()
    } 
    catch (error) {
        return res.status(403).json({
            mensagem: error.message
        })
    }

}

app.get('/perfil', VerifyJwt, (req, res)=>{
    let dados = res.locals.token.email
    let userr = User.findOne({email:dados})
    res.json({
        message:'deu certo',
        user:userr
    })


})

app.post('/criarconta', async(req, res)=>{
    let newuser = req.body

    let Novousuario = await User.create(newuser)
    if(Novousuario){
        res.status(200).json('ola')
    }
    else{
        console.log('asd')
    }
    console.log(Novousuario)

})

app.post('/login', async(req, res)=>{
    let user = req.body

    const email = await User.findOne({ email: user.email })
    if(email){
        if(email.senha === user.senha){
            const token = jwt.sign(
                { email: user.email },
                process.env.JWT_KEY,
                { expiresIn: process.env.JWT_TEMP }
            )
            res.status(200).json({token})
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


const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`rodando na porta ${port}`)
})