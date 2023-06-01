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

export const getUpdateUserWithAdmin = async(req,res) => {
    try{
        let id = req.body.id
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

export const getAllUser = async(req,res) => {
    const { page } = req.query
    
    console.log(req.query)
    try{
        if(req?.user?.role !== 'admin'){
            return res.status(404).json({
                err:-1,
                msg:'role khong hop le'
            })
        }
        let response = await services.getAllUser(page, req.user ,req.query)
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(500).json({
            err: -1,
            msg: 'Failed at User controller:' + err
        })
    }
}


export const deleteUser = async(req,res) => {
    
    try{
        
        const  {role} = req.user
        console.log('dd',req.query.userId)
        if(role !== 'admin'){
            return res.status(404).json({
                err:-1,
                msg:'role khong hop le'
            })
        }
        
        let response = await services.deleteUser(req.query?.userId)
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(500).json({
            err: -1,
            msg: 'Failed at User controller:' + err
        })
    }
}
