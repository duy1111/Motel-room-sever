import db from '../models'

//GET ALL CATEGORIES

let getProvinceService = () => {
    return new Promise(async(resolve,reject) => {
        try{
            let data = await db.Province.findAll({
                raw:true,
                attributes:['code','value']
            })
            resolve({
                err: data ? 0 :1,
                msg: data ? 'OK' : 'Failed to get Province.',
                data
            })
        }
        catch(err){
            reject(err)
        }
    })

}
export {
    getProvinceService
}