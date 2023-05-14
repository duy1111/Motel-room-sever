import db from '../models'

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
                data
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
                data:response
            })
        }
        catch(err){
            reject(err)
        }
    })

}
export {
    getUser,getUpdateUser
}