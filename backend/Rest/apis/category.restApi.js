import {uuid} from 'uuidv4';

function createNewFavoriteItem(req, res) {
    if (!req.params || (req.params && (!req.params.shopId || !req.params.userId))) {
        return res.status(400).send({ message: "Invalid Request"});
    } else {
        const categoryId = `ct-${uuid()}`;
        const insertQuery = `INSERT INTO category (_id, name, shopId, createdBy, isSystem) VALUES ('${categoryId}', '${req.body.name}', '${req.params.shopId}', '${req.params.userId}', ${false})`;
        connection.query(insertQuery, function (err, result) {
        if (err) throw err;
        console.log("Data Created");
        return res.send({
            name: req.body.name,
            shopId: req.params.shopId,
            createdBy: req.params.userId,
        });
        });
    }
}

function getShopCategories(req, res) {
    if (
      !req.params ||
      (req.params && (!req.params.shopId || !req.params.userId))
    ) {
      return res.status(400).send({
        message: "Invalid Request",
      });
    } else {
      connection.query(
        `SELECT * FROM category WHERE shopId = ? OR isSystem = True`,
        req.params.shopId,
        (err, results) => {
          if (err) throw err;
          console.log("Data Found");
          res.send({
              categories: results
          });
        }
      );
    }
}

let endpoints = {
    '/users/:userId/shops/:shopId/categories': [
        {
            method: 'GET',
            callbacks: [getShopCategories]
        },
        {
            method: 'POST',
            callbacks: [createNewFavoriteItem]
        }
    ]
}

export {endpoints}