import db from "../models";
const { Op } = require("sequelize");
import { v4 } from "uuid";
import generateCode from "../ultis/generateCode";
import moment from "moment";
import generateDate from "../ultis/generateDate";
require("dotenv").config();
let getPostsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "ok" : "Getting post is fail.",
        data: response,
      });
    } catch (err) {
      reject(err);
    }
  });
};
let getPostsLimitService = (page, query, { priceNumber, areaNumber }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = { ...query };
      let price = [];
      let area = [];
      if (priceNumber) price = priceNumber.map((item) => +item);
      if (areaNumber) area = areaNumber.map((item) => +item);
      if (priceNumber) queries.priceNumber = { [Op.between]: price };
      if (areaNumber) queries.areaNumber = { [Op.between]: area };
      console.log(queries);
      let response = await db.Post.findAndCountAll({
        raw: true,
        nest: true,
        where: queries,
        offset: offset * +process.env.LIMIT || 0,
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "ok" : "Getting post is fail.",
        data: response,
      });
    } catch (err) {
      reject(err);
    }
  });
};
let getNewPostsLimitService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await db.Post.findAll({
        raw: true,
        nest: true,

        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
        ],
        attributes: [
          "id",
          "title",
          "star",
          "address",
          "description",
          "createdAt",
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "ok" : "Getting post is fail.",
        data: response,
      });
    } catch (err) {
      reject(err);
    }
  });
};
let createNewPost = (data, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let attributesId = v4();
      let imagesId = v4();
      let overviewId = v4();
      let labelCode = generateCode(data.label);
      const hashtag = Math.floor(Math.random() * Math.pow(10, 6));
      let currentDate = generateDate();
      let response = await db.Post.create({
        id: v4(),
        title: data?.title,
        star: 0,
        labelCode,
        address: data?.address,
        attributesId,
        categoryCode: data.categoryCode,
        description: JSON.stringify(data.description),
        userId,
        overviewId,
        imagesId,
        priceCode: data?.priceCode || null,
        areaCode: data?.areaCode,
        provinceCode: data?.province?.includes("Thành phố")
          ? generateCode(data?.province?.replace("Thành phố ", ""))
          : generateCode(data?.province?.replace("Tỉnh ", "")),
        priceNumber: data.priceNumber,
        areaNumber: data.areaNumber,
      });
      await db.Attribute.create({
        id: attributesId,
        price:
          +data.priceNumber < 1
            ? `${+data.priceNumber * 1000000} đồng/tháng`
            : `${+data.priceNumber} triệu/tháng`,
        acreage: `${data.areaNumber} m2`,
        published: moment(new Date()).format("DD/MM/YYYY"),
        hashtag: `#${hashtag}`,
      });
      await db.Image.create({
        id: imagesId,
        image: JSON.stringify(data.images),
      });
      await db.Overview.create({
        id: overviewId,
        code: `#${hashtag}`,
        area: data.label,
        type: data.category,
        target: data.target,
        expire: currentDate.expireDay,
        bonus: "Tin thường",
        created: currentDate.today,
      });
      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: data?.province?.replace("Thành phố ", "") },
            { value: data?.province?.replace("Tỉnh ", "") },
          ],
        },
        defaults: {
          code: data?.province?.includes("Thành phố")
            ? generateCode(data?.province?.replace("Thành phố ", ""))
            : generateCode(data?.province?.replace("Tỉnh ", "")),
          value: data?.province?.includes("Thành phố")
            ? data?.province?.replace("Thành phố ", "")
            : data?.province?.replace("Tỉnh ", ""),
        },
      });
      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        defaults: {
          code: labelCode,
          value: data?.label,
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "ok" : "Create post is fail.",
      });
    } catch (err) {
      reject(err);
    }
  });
};
let getPostsLimitAdminService = (page, query, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = { ...query, userId: id };

      console.log(queries);
      let response = await db.Post.findAndCountAll({
        raw: true,
        nest: true,
        where: queries,
        offset: offset * +process.env.LIMIT || 0,
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
          {
            model: db.Overview,
            as: "overviews",
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "ok" : "Getting post is fail.",
        data: response,
      });
    } catch (err) {
      reject(err);
    }
  });
};
let updatePost = (postId,data) => {
  return new Promise(async (resolve, reject) => {
    console.log('check' ,data)
    try {
      let labelCode = generateCode(data.label);

      let response = await db.Post.update({
       
        title: data?.title,
       
        labelCode,
        address: data?.address,
      
        categoryCode: data.categoryCode,
        description: JSON.stringify(data.description),     
        priceCode: data?.priceCode || null,
        areaCode: data?.areaCode,
        provinceCode: data?.province?.includes("Thành phố")
          ? generateCode(data?.province?.replace("Thành phố ", ""))
          : generateCode(data?.province?.replace("Tỉnh ", "")),
        priceNumber: data.priceNumber,
        areaNumber: data.areaNumber,
      },{
        where: {
          id: data.postId
        }
      });
      await db.Attribute.update({
      
        price:
          +data.priceNumber < 1
            ? `${+data.priceNumber * 1000000} đồng/tháng`
            : `${+data.priceNumber} triệu/tháng`,
        acreage: `${data.areaNumber} m2`,
      },{
        where: {
          id: data.attributesId
        }
      });
      await db.Image.update({
        
        image: JSON.stringify(data.images),
      },{
        where: {id: data.imagesId}
      });
      await db.Overview.update({
        
        
        area: data.label,
        type: data.category,
        target: data.target,   
      
      },{
        where: {
          id: data.overviewId
        }
      });
      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: data?.province?.replace("Thành phố ", "") },
            { value: data?.province?.replace("Tỉnh ", "") },
          ],
        },
        defaults: {
          code: data?.province?.includes("Thành phố")
            ? generateCode(data?.province?.replace("Thành phố ", ""))
            : generateCode(data?.province?.replace("Tỉnh ", "")),
          value: data?.province?.includes("Thành phố")
            ? data?.province?.replace("Thành phố ", "")
            : data?.province?.replace("Tỉnh ", ""),
        },
      });
      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        defaults: {
          code: labelCode,
          value: data?.label,
        },
      });
      
      console.log("check req", response);
      resolve({
        err: 0,
        msg: "Update succeed",
        data: response,
      });
    } catch (err) {
      reject(err);
    }
  });
};
export {
  getPostsService,
  getPostsLimitService,
  getNewPostsLimitService,
  createNewPost,
  getPostsLimitAdminService,
  updatePost,
};
