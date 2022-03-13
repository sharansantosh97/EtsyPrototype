import { uuid } from 'uuidv4';

async function getShopProducts(req, res) {
  let userId = req.params.userId; // verifiying userId in middleware
  let shopId = req.params.shopId;
  try {
    var products = await query(`select * from products where shopId = '${shopId}'`)
    var productsSalesCount = await query(`select sum(o.quantity) as salescount, productId from products p inner join orders o on p._id=o.productId group by o.productId;`)
    var productsSalesCountMap = {};
    productsSalesCount.forEach(element => {
      productsSalesCountMap[element.productId] = element.salescount;
    });
    products = products.map((prod) => {
      let productId = prod._id;
      prod.salesCount = productsSalesCountMap[productId]
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
  let productDetails = [newProductId, name, imageUrl, categoryId, description, price, quantity, shopId, userId, new Date()];
  try {
    let results = query('INSERT INTO products VALUES (?,?,?,?,?,?,?,?,?,?)', productDetails)
    res.status(200).json(results)
  } catch(err) {
    res.status(400).json(err);
  }
}


let endpoints = {
  '/users/:userId/shops/:shopId/products':
    [
      {
        method: 'POST',
        callbacks: [createNewProduct]
      },
      {
        method: 'GET',
        callbacks: [getShopProducts]
      }
    ]
}

export { endpoints }