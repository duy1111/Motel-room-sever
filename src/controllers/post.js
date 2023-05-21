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
    
    const { page, priceNumber, areaNumber, ...query } = req.query
    
    
    try{
        let response = await postService.getPostsLimitService(page,query, { priceNumber, areaNumber })
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(500).json({
            err:-1,
            msg: 'Failed at post controller: ' +e
        })
    }
}
let getNewPostsLimit = async(req,res) => {
   
    try{
       
        let response = await postService.getNewPostsLimitService()
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(500).json({
            err:-1,
            msg: 'Failed at post controller: ' +e
        })
    }
}
let createNewPost = async(req,res) => {
   
    try{
        const {categoryCode,title,priceNumber,areaNumber,label } = req.body
        const {id} = req.user
        if(!categoryCode || !id || !title || !priceNumber || !areaNumber || !label){
            return res.status(400).json({
                err:1,
                msg:'Missing inputs'
            })
        }
        let response = await postService.createNewPost(req.body,id)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(500).json({
            err:-1,
            msg: 'Failed at post controller: ' +e
        })
    }
}
let getPostsLimitAdmin = async(req,res) => {
    
    const { page, ...query } = req.query
    const {id} = req.user
    if(!id){
        return res.status(400).json({
            err:-1,
            msg:'Missing Input'
        })
    }
    try{
        let response = await postService.getPostsLimitAdminService(page,query, id)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(500).json({
            err:-1,
            msg: 'Failed at post controller: ' +e
        })
    }
}
let updatePostsAdmin = async(req,res) => {
    const {postId,attributesId,imagesId,overviewId , ...payload} = req.body
   
    
    if(!postId ||!attributesId ||!imagesId  || !overviewId){
        return res.status(400).json({
            err:-1,
            msg:'Missing Input'
        })
    }
    try{
       
        let response = await postService.updatePost(postId,req.body)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(500).json({
            err:-1,
            msg: 'Failed at post controller: ' +e
        })
    }
}
let deletePost = async(req,res) => {
    
   
    const  {postId} = req.query
    const  {id} = req.user
    if(!postId || !id){
        return res.status(400).json({
            err:-1,
            msg:'Missing Input'
        })
    }
    try{
       
        let response = await postService.deletePost(postId)
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
    getPosts,getPostsLimit,getNewPostsLimit,createNewPost,getPostsLimitAdmin,updatePostsAdmin,deletePost
}