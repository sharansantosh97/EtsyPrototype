import _ from 'lodash';
import { uuid } from 'uuidv4';

/**deprecated  getShopProducts*/
async function getShopProducts(req, res) {
    let userId = req.params.userId; // verifiying userId in middleware
    let shopId = req.params.shopId;
    try {
        var products = await query(`select * from products where shopId = '${shopId}'`)
        var productsSalesCount = await query(`select sum(o.quantity) as salescount, productId from products p where p.shopId='${shopId}' inner join orders o on p._id=o.productId group by o.productId;`)
        var productsSalesCountMap = {};
        productsSalesCount.forEach(element => {
            productsSalesCountMap[element.productId] = element.salescount;
        });
        products = products.map((prod) => {
            let productId = prod._id;
            prod.salesCount = productsSalesCountMap[productId] || 0
            return prod;
        })
        res.status(200).json({
            products
        })
    } catch (err) {
        res.status(400).json({ msg: 'Error in fetching shop products' });
    }
}

async function createNewProduct(req, res) {
    let body = req.body;
    let { name, imageUrl, categoryId, description, price, quantity } = body
    let { userId, shopId } = req.params; // verifiying userId in middleware
    let newProductId = `p-${uuid()}`
    try {
        var shopDetails = await query(`select name from shops where _id = '${shopId}'`)
        let shopName = shopDetails[0].name
        let productDetails = [newProductId, name, imageUrl, categoryId, description, price, quantity, shopId, userId, new Date(), 0, shopName];

        let results = query('INSERT INTO products VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', productDetails)
        res.status(200).json(results)
    } catch (err) {
        res.status(400).json(err);
    }
}

async function getAllProducts(req, res) {
    let { userId } = req.params; // verifiying userId in middleware
    let body = req.body;
    let categoryIds = body.categoryIds;
    let shopIds = body.shopIds;
    let selectQuery, whereConditions = [];
    try {
        if (categoryIds && categoryIds.length > 0) {
            whereConditions.push(`categoryId IN("${categoryIds.join('", "')}")`)
        }
        if (body.shopIds && body.shopIds.length) {
            whereConditions.push(`shopId IN("${shopIds.join('", "')}")`)
        }
        if (body.priceRange && body.priceRange.length == 2) {
            let lowPrice = body.priceRange[0];
            let highPrice = body.priceRange[1];
            whereConditions.push(`price BETWEEN ${lowPrice} AND ${highPrice}`);
        }
        if (body.excludeOutOfStock) {
            whereConditions.push(`quantity > 0`)
        }
        if (whereConditions.length) {
            selectQuery = `select * from products where ${whereConditions.join(' AND ')}`
        } else {
            selectQuery = `select * from products`;
        }
        let products = await query(selectQuery);
        // let joinConditionString = whereConditions.map((condition) => `p.${condition}`).join(' AND ');
        // var productsSalesCount = await query(`select sum(o.quantity) as salescount, productId from products p where ${joinConditionString} inner join orders o on p._id=o.productId group by o.productId;`)
        res.status(200).json({
            products,
            salesCount: _.sumBy(products, 'salesCount')
        })
    } catch (err) {
        res.status(400).json(err);
    }
}

let endpoints = {
    '/users/:userId/shops/:shopId/products': [{
            method: 'POST',
            callbacks: [createNewProduct]
        },
        {
            method: 'GET',
            callbacks: [getShopProducts]
        }
    ],
    '/users/:userId/products': [{
        method: 'POST',
        callbacks: [getAllProducts]
    }],
    // '/public/products': [{
    //     method: 'POST',
    //     callbacks: [getAllProducts]
    // }]
}

export { endpoints }