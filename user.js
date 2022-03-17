import express from 'express'
import { addUser, editUserById, getAllUsers, getUser, removeUserById } from './db.js'
import {ObjectId} from 'mongodb';


const router=express.Router()

router.route('/getusers')
.get(async(request,response)=>{
    const data=await getAllUsers();

    if(!data.length)
    {
        return response.status(404).send({Message:'UserList Empty'})
    }

    return response.send(data)
})

router.route('/getuserbyid/:id')
.get(async (request,response)=>{
    const {id}=request.params;
    
    const getData=await getUser({_id:ObjectId(id)})

    if(!getData)
    {
        return response.status(404).send({Message:'User Not Found'})
    }

    return response.send(getData);
})


router.route('/createuser')
.post(async (request,response)=>{
    const data=request.body;

    if(!data)
    {
        return response.status(400).send({Message:'All Fields Required'})
    }

    const checkUser =await getUser({Email:data.Email})

    if(checkUser)
    {
        return response.status(400).send({Message:'User Already Available'})
    }

    const create=await addUser(data);

    return response.send({Message:'User Added SuccessFully'})
})

router.route('/edituser/:id')
.put(async (request,response)=>{

    const {id}=request.params;
    const data=request.body;

    if(!id || !data)
    {
        return response.status(400).send({Message:'All Fields Required'})        
    }

    const {OldEmail,NewEmail,ProfilePic,Mobile,JobType,DOB,PreferredLocation,FullName}=data;

    if(OldEmail!==NewEmail)
    {
        const checkEmail=await getUser({Email:NewEmail})

        if(checkEmail)
        {
            return response.status(400).send({Message:'Email Already Available'})
        }
    }

    const getData=await getUser({_id:ObjectId(id)})

    if(!getData)
    {
        return response.status(404).send({Message:'User Not Found'})
    }

    const updateUser=await editUserById([{_id:ObjectId(id)},{$set:{FullName,ProfilePic,Email:NewEmail,Mobile,JobType,DOB,PreferredLocation}}])

    const {modifiedCount}=updateUser

    if(!modifiedCount)
    {
        return response.status(400).send({Message:'No Changes'})
    }

    return response.send({Message:'User Updated Successfully'})

})


router.route('/deleteuser/:id')
.delete(async (request,response)=>{

    const {id}=request.params;

    if(!id)
    {
        return response.status(400).send({Message:'All Fields Required'})        
    }

    const getData=await getUser({_id:ObjectId(id)})

    if(!getData)
    {
        return response.status(404).send({Message:'User Not Found'})
    }

    const delUser=await removeUserById({_id:ObjectId(id)})

    if(!delUser)
    {
        return response.status(400).send({Message:'Error Occurred'})
    }

    return response.send({Message:'User Deleted'})
})

export const userRouter=router;