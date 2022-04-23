import  UserClass from '../mongoservices/user.js';
import  ShopClass from '../mongoservices/shop.js';
import  ProductClass from '../mongoservices/products.js';
import mongoose from 'mongoose';

async function createNewProduct(msg, callback) 
{
    let body = msg.body;
    let { name, imageUrl, categoryId, description, price, quantity } = body
    let { userId, shopId } = msg.params;
    try {
        let results = await ShopClass.getShopDetailsById(shopId);
        if(results && results.shopFound==false)
        {
            // res.status(200).json({
            //     'msg': `Error creating product for user`
            // })
            let response = {}
            response.status = 200;
            response.result = {
                'msg': `Error creating product for user`
            }
            callback(null, response);
        }
         let shopDetails = results.shop;
         let shopName = shopDetails.name;
        let productDetails = {
            name:name, 
            imageUrl:imageUrl,
            categoryId: mongoose.Types.ObjectId(categoryId), 
            description:description, 
            price:price, 
            quantity:quantity, 
            shopId: mongoose.Types.ObjectId(shopId), 
            createdBy: mongoose.Types.ObjectId(userId), 
            date:new Date(), 
            salesCount:0, 
            shopName:shopName
        };
         const resultsPro = await ProductClass.createNewProduct(productDetails);
         //res.status(200).json(resultsPro);
         let response = {}
         response.status = 200;
         response.result = resultsPro;
         callback(null, response);
    } catch(err) {
        //res.status(400).json(err);
        console.log("EEEE"+err);
        let response = {}
         response.status = 400;
         response.result = err;
        callback(null, response);
    }
}




async function getAllProducts(msg, callback) 
{

    let { userId } = msg.params; // verifiying userId in middleware
    let body = msg.body;
    let {categoryIds, shopIds, excludeShopIds, search} = body;
    let selectQuery;
    let whereConditions = {};
    try {
        // let currentUserShopDetails = await query(`select * from shops where createdBy='${userId}'`);
        // currentUserShopDetails = _.get(currentUserShopDetails, '0')
        // if(currentUserShopDetails && currentUserShopDetails._id) {
        //     body.excludeShopIds = [currentUserShopDetails._id]
        // }

        if(search) {
            var regQuery = { $regex: search, $options: 'i' };
            whereConditions['name']=regQuery;
        }
        if (categoryIds && categoryIds.length > 0) {
            var catQuery = { $in: [] };
            for(let i=0;i<categoryIds.length;i++)
            {
                catQuery.$in.push(categoryIds[i]);
            }
            whereConditions['categoryId']=catQuery;
        }
        
        if (body.shopIds && body.shopIds.length>0) {
            var shopQuery = { $in: [] };
            for(let i=0;i<shopIds.length;i++)
            {
                shopQuery.$in.push(shopIds[i]);
            }
            whereConditions['shopId']=shopQuery;
        }
        if (body.excludeShopIds && body.excludeShopIds.length>0) {
            var shopExQuery = { $nin: [] };
            for(let i=0;i<excludeShopIds.length;i++)
            {
                shopExQuery.$nin.push(excludeShopIds[i]);
            }
            whereConditions['shopId']=shopExQuery;
        }
        if (body.priceRange && body.priceRange.length == 2) {
            let lowPrice = body.priceRange[0];
            let highPrice = body.priceRange[1];
            var priceQuery = { $gt: lowPrice, $lt: highPrice };
            whereConditions['price']=priceQuery;
        }
        if (body.excludeOutOfStock) {
            var qQuery = { $gt: 0 };
            whereConditions['quantity']=qQuery;
        }
        const products = await ProductClass.getProductsWithConditions(whereConditions);
        // res.status(200).json({
        //     products,
        //     //salesCount: _.sumBy(results, 'salesCount')
        // })

        let response = {}
         response.status = 200;
         response.result = {products};
         callback(null, response);
    } catch (err) {
        //res.status(400).json(err);
        let response = {}
         response.status = 400;
         response.result = err;
         callback(null, response);

    }
}





async function handle_request_Product(msg, callback)
{
    if (msg.path === "create_product") {
        createNewProduct(msg, callback);
    }
    else if (msg.path === "getproducts") {
        getAllProducts(msg, callback);
    }
        
};

export {handle_request_Product};


