import db from '../models'
require("dotenv").config();

//GET ONE USER

let getUser = (id) => {
    return new Promise(async(resolve,reject) => {
        try{
            let data = await db.User.findOne({
                where:{id:id},
                raw:true,
                
                attributes:{
                    exclude:['password']
                }
            })
            resolve({
                err: data ? 0 :1,
                msg: data ? 'OK' : 'Failed to get User.',
                data: data? data :[]
            })
        }
        catch(err){
            reject(err)
        }
    })

}
let getUpdateUser = (payload,id) => {
    return new Promise(async(resolve,reject) => {
        try{
            let response = await db.User.update(payload,{
                where:{
                    id
                }
            })
            console.log('check update',response)
            resolve({
                err: response > 0 ? 0 :1,
                msg: response>0 ?'update user succeed' : 'Failed to get User.',
                
            })
        }
        catch(err){
            reject(err)
        }
    })

}

//GET ALL USER
let getAllUser = (page,user,{...query}) => {
    return new Promise(async(resolve,reject) => {
        let offset = !page || +page <= 1 ? 0 : +page - 1;
        let limit =  +process.env.LIMIT ||5
        const queries = { ...query };
        queries.limit = limit

        try{
            if(user?.role === 'admin'){
                let response  = await db.User.findAndCountAll({
                    raw: true,
                    nest: true,
                    offset: offset * limit || 0,
                    limit,
                    order: [['createdAt', 'DESC']],

                    where:{
                        role:'user'
                    },
                    attributes:{
                        exclude:['password']
                    }
                })
                resolve({
                    err: response  ? 0 :1,
                    msg: response ?'get all user succeed' : 'Failed to get all User.',
                    data: response ? response : []
                })
            }
        }
        catch(e){
            reject(err)

        }
    })
}
let deleteUser = (id) => {
    return new Promise(async(resolve,reject) => {
        try{
            console.log('check id ne mâmmam' , id)
            let response = await db.User.destroy({
                where:{
                    id:id
                }
            })
            console.log(response)
            resolve({
                err: response ? 0 :1,
                msg: response ?'delete user succeed' : 'Failed to delete User.',
                
            })
        }
        catch(err){
            reject(err)
        }
    })

}
export {
    getUser,getUpdateUser,getAllUser,deleteUser
}