import db from '../models'

//GET ALL CATEGORIES

let getCategories = () => {
    return new Promise(async(resolve,reject) => {
        try{
            let data = await db.Category.findAll({
                raw:true,
                attributes:['code','value']
            })
            resolve({
                err: data ? 0 :1,
                msg: data ? 'OK' : 'Failed to get Categories.',
                data
            })
        }
        catch(err){
            reject(err)
        }
    })

}
export {
    getCategories
}