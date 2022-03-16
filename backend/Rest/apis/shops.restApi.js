import { uuid } from "uuidv4";

function checkShopNameAvailability(req, res) {
  let shopname = req.query.shopname;
  connection.query(
    `select * from shops where name = '${shopname}'`,
    (err, results, fields) => {
      if (err) {
        res.status(400).json({ msg: "Error in fetching" });
        return;
      }
      if (results && results.length > 0) {
        res.status(200).json({ available: false });
      } else {
        res.status(200).json({ available: true });
      }
    }
  );
}

function createShop(req, res) {
  let body = req.body;
  let shopname = body.name;
  let userId = req.params.userId; // verifiying userId in middleware
  let newShopId = `sh-${uuid()}`;
  let data = [newShopId, shopname, body.imageUrl, userId, new Date()];
  //to-do check if shop exists with same userId
  try {
    let results = query("INSERT INTO shops VALUES (?,?,?,?,?)", data);
    res.status(200).json(results);
    return;
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
}

async function getShopByUserId(req, res) {
  let userId = req.params.userId; // verifiying userId in middleware
  try {
    let shopDetails = await query(
      `select * from shops where createdBy = '${userId}';`
    );
    if (shopDetails && shopDetails.length == 0) {
      res.status(200).json({
        msg: `Shop doesn't exist for user`,
      });
      return;
    }
    let shopId = shopDetails && shopDetails[0] && shopDetails[0]._id;
    let shopSalesCount = await query(
      `select SUM(quantity) as totalSalesCount from orders where shopId='${shopId}'`
    );
    shopDetails = shopDetails[0];
    shopDetails.totalSalesCount =
      (shopSalesCount &&
        shopSalesCount[0] &&
        shopSalesCount[0].totalSalesCount) ||
      0;
    res.status(200).json(shopDetails);
  } catch (err) {
    console.log("err ===>", err);
    res.status(400).json({ msg: "Error in fetching owner shops" });
    return;
  }
}

let endpoints = {
  "/users/:userId/shop/checkavailability": [
    {
      method: "GET",
      callbacks: [checkShopNameAvailability],
    },
  ],
  "/users/:userId/shops": [
    {
      method: "POST",
      callbacks: [createShop],
    },
    {
      method: "GET",
      callbacks: [getShopByUserId],
    },
  ],
};

export { endpoints };
