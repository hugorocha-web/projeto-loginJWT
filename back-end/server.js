import express from 'express'
import mongoose from 'mongoose'


const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`rodando na porta ${port}`)
})