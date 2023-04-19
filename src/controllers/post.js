import * as postService from '../services/post'

let getPosts = async(req,res) => {
    try{
        let response = await postService.getPostsService()
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(500).json({
            err:-1,
            msg: 'Failed at post controller: ' +e
        })
    }
}
let getPostsLimit = async(req,res) => {
    const {page} = req.query
    try{
        
        let response = await postService.getPostsLimitService(page)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(500).json({
            err:-1,
            msg: 'Failed at post controller: ' +e
        })
    }
}
export {
    getPosts,getPostsLimit
}