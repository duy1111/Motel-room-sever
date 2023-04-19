import * as areaService  from '../services/areaService'

let getArea = async(req,res) => {
    try{
        let response = await areaService.getAreaService()
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(500).json({
            err: -1,
            msg: 'Failed at Price controller:' + err
        })
    }
}
export {
    getArea
}