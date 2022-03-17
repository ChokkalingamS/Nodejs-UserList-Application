import {client} from './index.js'

async function getAllUsers()
{
    return client.db('User').collection('userlist').find().toArray()
}
async function getUser(data)
{
    return client.db('User').collection('userlist').findOne(data)
}
async function addUser(data)
{
    return client.db('User').collection('userlist').insertOne(data)
}
async function editUserById(data)
{
    return client.db('User').collection('userlist').updateOne(data[0],data[1])
}
async function removeUserById(data)
{
    return client.db('User').collection('userlist').deleteOne(data)
}

export {
    getAllUsers,
    getUser,
    addUser,
    editUserById,
    removeUserById
}