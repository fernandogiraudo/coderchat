import { Router } from "express";
import { userModel } from "../models/user.model.js";

const usersRoutes = Router();

usersRoutes.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.send({users});
    } catch (error) {
        console.log('Error');
        res.status(400).json({message: 'Error'});
    }
});

usersRoutes.post('/', async (req, res) => {
    try {
        const {first_name, last_name, email} = req.body;
        if(!first_name || !last_name || !email){
            res.status(400).json({message: 'User incomplete'});
        }
        const result = await userModel.create({
            email,
            first_name,
            last_name
        });
        res.status(201).json({status: 'Success', payload: result});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Error'});
    }
});

usersRoutes.put('/:uId', async (req, res) => {
    const {first_name, last_name, email} = req.body;
    const { uId } = req.params;
    if(!first_name || !last_name || !email){
        res.status(400).json({message: 'User incompleted'});
    }
    const result =  await userModel.updateOne({_id: uId}, {first_name, last_name, email});
    res.status(200).json({message: 'User updated!'});
});

usersRoutes.delete('/:uId', async (req, res) => {
    const { uId } = req.params;
    const result = await userModel.deleteOne({_id: uId});
    res.status(200).json({message: 'User deleted'});
});

export default usersRoutes;