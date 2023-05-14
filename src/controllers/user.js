import * as services from '../services/user'

export const getUser = async(req,res) => {
    try{
        let {id} = req.user
        let response = await services.getUser(id)
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(500).json({
            err: -1,
            msg: 'Failed at User controller:' + err
        })
    }
}

export const getUpdateUser = async(req,res) => {
    try{
        let {id} = req.user
        let payload = req.body
        let response = await services.getUpdateUser(payload,id)
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(500).json({
            err: -1,
            msg: 'Failed at User controller:' + err
        })
    }
}