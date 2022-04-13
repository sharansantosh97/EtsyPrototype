

async function getAllFavorites(req, res) {
    let userId = req.params.userId;
    let searchWord = req.query.search;
    try {
        let selectQuery = ''
        let favoriteItems = await query(`select * from favorites where createdBy = '${userId}'`);
        let productIds = favoriteItems.map((item) => item.productId)
        if (searchWord) {
            selectQuery = `select * from products where _id IN ("${productIds.join('", "')}") AND name REGEXP '${searchWord}'`;
        } else {
            selectQuery = `select * from products where _id IN ("${productIds.join('", "')}")`;
        }
        let products = await query(selectQuery);
        let productIdsMap = _.keyBy(products, '_id')
        favoriteItems = _.filter(favoriteItems, (item) => productIdsMap[item.productId]);
        res.json({
            favorites: _.map(favoriteItems, (item) => {
                item.product = productIdsMap[item.productId]
                return item;
            })
        })
    } catch (err) {
        console.log("Error : ", err)
        res.status(400).json(err);
        return;
    }
}
