import db from "../models";
require('dotenv').config()
let getPostsService = () => {
    return new Promise(async(resolve,reject) => {
        try{
            let response = await db.Post.findAll({
                raw:true,
                nest:true,
                include: [
                    {model: db.Image, as:'images' ,attributes:['image']},
                    {model: db.Attribute, as:'attributes' ,attributes:['price','acreage','published','hashtag']},
                    {model: db.User, as:'user' ,attributes:['name','zalo','phone']},

                ],
                attributes:['id','title','star','address','description']
            })
            resolve({
                err:response?0:1,
                msg:response?'ok':'Getting post is fail.',
                data:response
            })
        }catch(err){
            reject(err)
        }
    })
}
let getPostsLimitService = (page,query) => {
    return new Promise(async(resolve,reject) => {
        try{
            let offset = !page || +page <= 1 ? 0 : +page -1
            let response = await db.Post.findAndCountAll({
                raw:true,
                nest:true,
                where:query,
                offset:offset * (+process.env.LIMIT) || 0,
                limit: +process.env.LIMIT,
                include: [
                    {model: db.Image, as:'images' ,attributes:['image']},
                    {model: db.Attribute, as:'attributes' ,attributes:['price','acreage','published','hashtag']},
                    {model: db.User, as:'user' ,attributes:['name','zalo','phone']},

                ],
                attributes:['id','title','star','address','description']
            })
            resolve({
                err:response?0:1,
                msg:response?'ok':'Getting post is fail.',
                data:response
            })
        }catch(err){
            reject(err)
        }
    })
}
let getNewPostsLimitService = () => {
    return new Promise(async(resolve,reject) => {
        try{
            
            let response = await db.Post.findAll({
                raw:true,
                nest:true,
                
                order:[['createdAt','DESC']],
                limit: +process.env.LIMIT,
                include: [
                    {model: db.Image, as:'images' ,attributes:['image']},
                    {model: db.Attribute, as:'attributes' ,attributes:['price','acreage','published','hashtag']},
                    {model: db.User, as:'user' ,attributes:['name','zalo','phone']},

                ],
                attributes:['id','title','star','address','description','createdAt']
            })
            resolve({
                err:response?0:1,
                msg:response?'ok':'Getting post is fail.',
                data:response
            })
        }catch(err){
            reject(err)
        }
    })
}
export {
    getPostsService,getPostsLimitService,getNewPostsLimitService
}