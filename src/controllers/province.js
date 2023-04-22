import * as provinceService from '../services/provinceService'

let getAllProvince = async(req,res) => {
    try{
        let response = await provinceService.getProvinceService()
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(500).json({
            err: -1,
            msg: 'Failed at Province controller:' + err
        })
    }
}
export {
    getAllProvince
}