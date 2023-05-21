import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {v4} from 'uuid'
require('dotenv').config()

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(12));
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};
let registerService = (data) => { 
    return new Promise(async(resolve,reject) => {
        try{
            let hashPassword = await hashUserPassword(data.password)
            let response = await db.User.findOrCreate({
                where: {
                    phone : data.phone,
                    

                },
                defaults:{
                    phone: data.phone,
                    name: data.name,
                    role:'user',
                    password: hashPassword,
                    id: v4(),
                }

            })

            console.log('check',response)
            let token = response[1] && jwt.sign({
                id: response[0].id,
                phone : response[0].phone,
                role : response[0].role,
            },process.env.SECRET_KEY, {expiresIn: '2d'})
            resolve({
                err: token ? 0 : 2,
                msg: token ? 'Register is successfully!':'Phone number has been exist!',
                token: token || null
            })

        }catch(e){
            reject(e)
        }
    })
}
let loginService = (data) => {
    return new Promise(async(resolve,reject) => {
        try{
           

            let response = await db.User.findOne({
                where: {
                    phone : data.phone,
                },
                raw: true,
            })
            console.log('check ne',response?.password)
            console.log('check ne',data?.password)
            

            let isCorrectPassword = response && bcrypt.compareSync(data.password , response.password)
            console.log('check ne',isCorrectPassword)

            let token = isCorrectPassword && jwt.sign({
                id: response.id,
                phone : response.phone,
                role : response.role,
            },process.env.SECRET_KEY, {expiresIn: '2d'})
            resolve({
                err: token ? 0 : 2,
                msg: token ? 'Login is successfully!': response ? "Password is wrong!":'Login is faild' ,
                token: token || null
            })
        }
        catch(e){
            reject(e)
        }
    })
}
export {
    registerService,
    loginService
}