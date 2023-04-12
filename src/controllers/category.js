import * as categoryService from '../services/category'

let getCategories = async(req,res) => {
    try{
        let response = await categoryService.getCategories()
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(500).json({
            err: -1,
            msg: 'Failed at Category controller:' + err
        })
    }
}
export {
    getCategories
}