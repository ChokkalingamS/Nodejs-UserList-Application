import {MongoClient} from 'mongodb'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './user.js'

const app=express();
dotenv.config()


const MONGO_URL=process.env.MONGO_URL
const port=process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/api',userRouter)

async function CreateConnection()
{
    const client = new MongoClient(MONGO_URL)
    await client.connect()
    console.log('MongoDB Connected Successfully');
    return client

}

export const client=await CreateConnection()

app.get('/',(request,response)=>{
    response.send('UserList')
})
app.listen(port,()=>{
    console.log('Server Started at',port);
})