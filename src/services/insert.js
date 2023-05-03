import db from '../models';
import bcrypt from 'bcryptjs';
import {v4} from 'uuid'
import generateCode from '../ultis/generateCode';
import chothuematbang from '../../data/chothuematbang.json'
import chothuecanho from '../../data/chothuecanho.json'
import nhachothue from '../../data/nhachothue.json'
import chothuephongtro from '../../data/chothuephongtro.json'
import {dataPrice,dataArea} from '../ultis/data'
import { getNumberFromString,getNumberFromStringV2 } from '../ultis/common';
const dataBody = [
    {
        body: chothuephongtro.body,
        code: 'CTPT'
    },
    {
        body: chothuematbang.body,
        code: 'CTMB'
    },
    {
        body: chothuecanho.body,
        code: 'CTCH'
    },
    {
        body: nhachothue.body,
        code: 'NCT'
    },
]

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(12));
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};
let insertService = () => {
    return new Promise(async(resolve,reject) => {
        try{
            const provinceCodes = []
            const labelCodes = []
            dataBody.forEach(cate => {
                cate.body.forEach(async(item) => {
                let postId = v4()
                
                let labelCode = generateCode(item?.header?.class?.classType || '').trim()
                labelCodes?.every(item => item?.code !== labelCode) && labelCodes.push({
                    code: labelCode,
                    value: item?.header?.class?.classType?.trim()
                })
                
                let attributesId= v4()
                let userId =v4()
                let overviewId = v4()
                let imagesId = v4()
                let currentArea = getNumberFromString(item?.header?.attributes?.acreage)
                let currentPrice = getNumberFromString(item?.header?.attributes?.price)
                let provinceCode =generateCode(item?.header?.address?.split(',').slice(-1)[0]).trim()
                
                provinceCodes?.every(item => item?.code !== provinceCode ) && provinceCodes.push({
                    code: provinceCode,
                    value: item?.header?.address?.split(',').slice(-1)[0].trim()
                })
                await db.Post.create({
                    id: postId,
                    title: item?.header?.title,
                    star: item?.header?.star,
                    labelCode,
                    address: item?.header?.address,
                    attributesId,
                    categoryCode: cate.code,
                    description: JSON.stringify(item?.mainContent?.content),
                    userId,
                    overviewId,
                    imagesId,
                    priceCode:dataPrice.find(price => price.max > currentPrice && price.min <= currentPrice)?.code, 
                    areaCode:dataArea.find(area => area.max > currentArea && area.min <= currentArea)?.code,
                    provinceCode ,
                    priceNumber: getNumberFromStringV2(item?.header?.attributes?.price),
                    areaNumber: getNumberFromStringV2(item?.header?.attributes?.acreage)
                })
                
                await db.Attribute.create({
                    id:attributesId,
                    price: item?.header?.attributes?.price,
                    acreage: item?.header?.attributes?.acreage,
                    published: item?.header?.attributes?.published,
                    hashtag: item?.header?.attributes?.hashtag,
                })
                
                await db.Image.create({
                    id:imagesId,
                    image: JSON.stringify(item?.images)
                })
                await db.Label.findOrCreate(
                    {
                        where:{code: labelCode},
                        defaults:{
                            code: labelCode,
                            value: item?.header?.class?.classType
                        }
                    }
                )
                await db.Overview.create({
                    id:overviewId,
                    code: item?.overview?.content.find(i => i.name === "Mã tin:")?.content,
                    area: item?.overview?.content.find(i => i.name === "Khu vực")?.content,
                    type: item?.overview?.content.find(i => i.name === "Loại tin rao:")?.content,
                    target: item?.overview?.content.find(i => i.name === "Đối tượng thuê:")?.content,
                    expire: item?.overview?.content.find(i => i.name === "Ngày hết hạn:")?.content,
                    bonus: item?.overview?.content.find(i => i.name === "Gói tin:")?.content,
                    created: item?.overview?.content.find(i => i.name === "Ngày đăng:")?.content,


                })
                await db.User.create({
                    id: userId,
                    name: item?.contact?.content.find(i => i.name === "Liên hệ:")?.content,
                    phone: item?.contact?.content.find(i => i.name === "Điện thoại:")?.content,
                    zalo: item?.contact?.content.find(i => i.name === "Zalo")?.content,
                    password: await hashUserPassword("123456"),
                    email:'',
                    roleId:'user',
                    

                })
                })
            })
            provinceCodes?.forEach(async (item) => {
                await db.Province.create(item)
            })
            labelCodes?.forEach(async (item) => {
                await db.Label.create(item)
            })
    
            resolve('Done')
        }
        catch(e){
            reject(e)
        }
    })
}
const createPricesAndAreas = () => new Promise((resolve, reject) => {
    try {
        dataPrice.forEach(async (item, index) => {
            await db.Price.create({
                
                code: item.code,
                value: item.value,
                order: index+1,
            })
        })
        dataArea.forEach(async (item, index) => {
            await db.Area.create({
              
                code: item.code,
                value: item.value,
                order: index+1,
               
            })
        })
        resolve('OK')
    } catch (err) {
        reject(err)
    }
})
export {
    createPricesAndAreas,
    insertService
}