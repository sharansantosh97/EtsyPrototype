import mongoose from 'mongoose';
import UserModel from '../models/user.js';

export default class UserClass
{
    static checkExists = async ({email})=>
    {
        try{
            const query = {
                email
            };
            const result = await UserModel.findOne(query);
            const userObj = {};
            if(result){
                userObj.userFound = true;
                userObj.user = result;
            }else{
                userObj.userFound = false; 
            }
            return userObj;
        }catch(err){
            console.log(err);
            throw new Error("Some unexpected error occurred checking exists");
        }
    }

    static addUser = async ({username, email, password})=>{
        try{
            const query = {
                username,
                email,
                password
            };
            const user = new UserModel(query);
            const result = await user.save();
            if(result){
                return result;
            }else{
                return {};
            }
        }catch(err){
            console.log(err);
            throw new Error("Some unexpected error occurred while adding user");
        }
    }

}

//module.exports.User = User;