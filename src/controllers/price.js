import * as priceService from '../services/priceService'

let getPrices = async(req,res) => {
    try{
        let response = await priceService.getPricesService()
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
    getPrices
}