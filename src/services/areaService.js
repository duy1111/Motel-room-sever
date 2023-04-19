import db from '../models'

//GET ALL CATEGORIES

let getAreaService = () => {
    return new Promise(async(resolve,reject) => {
        try{
            let data = await db.Area.findAll({
                raw:true,
                attributes:['code','value','order']
            })
            resolve({
                err: data ? 0 :1,
                msg: data ? 'OK' : 'Failed to get Area.',
                data
            })
        }
        catch(err){
            reject(err)
        }
    })

}
export {
    getAreaService
}