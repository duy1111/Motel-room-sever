import * as authService from '../services/authService'
const  register = async(req,res) => {
    const {name , phone, password} = req.body
    try{
        if(!name || !phone || !password){
            return res.status(400).json({
                err:1,
                msg: 'Missing inputs !'
            })
        }
        else{
            let response = await authService.registerService(req.body)
            return res.status(200).json(response)
        }
    }catch(e){
        return res.status(500).json({
            err:-1,
            msg: 'Fail at auth controller: ' + e
        })
    }
}
let login = async(req,res) => {
    const { phone, password} = req.body
    try{
        if( !phone || !password){
            return res.status(400).json({
                err:1,
                msg: 'Missing inputs !'
            })
        }
        else{
            
            let response = await authService.loginService(req.body)
            return res.status(200).json(response)
        }
    }catch(e){
        return res.status(500).json({
            err:-1,
            msg: 'Fail at auth controller: ' + e
        })
    }
}
export {
    register,login
}