import db from '../models'

//GET ALL CATEGORIES

let getPricesService = () => {
    return new Promise(async(resolve,reject) => {
        try{
            let data = await db.Price.findAll({
                raw:true,
                attributes:['code','value','order']
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
    getPricesService
}