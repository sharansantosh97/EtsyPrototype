import { uuid } from "uuidv4";

const log = console.log;

const getCart = async (req, res) => {
  try {
    let cartData = await query(
      "SELECT * FROM cart WHERE createdBy = ?",
      req.params.userId
    );
    log("CART DATA GET", cartData);
    let productData = [];
    for (const cartItem of cartData) {
      productData = await query(
        "SELECT * FROM products WHERE _id = ?",
        cartItem.productId
      );
      cartItem["product"] = productData[0];
    }
    res.status(200).json({ cartItems: cartData });
  } catch (err) {
    log("err ===>", err);
    res.status(400).json({ msg: "Error in fetching cart data" });
    return;
  }
};

const createCart = async (req, res) => {
  try {
    const cartId = `c-${uuid()}`;
    const insertQuery = `INSERT INTO cart (_id, createdBy, productId, quantity) VALUES ('${cartId}', '${req.params.userId}', '${req.body.productId}', '${req.body.quantity}')`;
    let results = await query(insertQuery);
    log("Cart Created ", results);
    res.status(200).json({
      _id: cartId,
      createdBy: req.params.userId,
      productId: req.body.productId,
      quantity: req.body.quantity,
    });
  } catch (err) {
    log("err ===>", err);
    res.status(400).json({ msg: "Error in creating cart data" });
    return;
  }
};

const updateCart = (req, res) => {
  try {
    let cartData = [req.body.quantity, req.params.cartId];
    let results = query("UPDATE cart SET quantity= ? where _id = ?", cartData);
    res.status(200).json({
      _id: req.params.cartId,
      createdBy: req.params.userId,
      productId: req.body.productId,
      quantity: req.body.quantity,
    });
  } catch (err) {
    log("err ===>", err);
    res.status(400).json({ msg: "Error in updating cart data" });
    return;
  }
};

const deleteCart = async (req, res) => {
  try {
    let results = query(`DELETE FROM cart WHERE _id= ${req.params.cartId};`);
    res.status(200).json({
      msg: "Deleted Successfully",
    });
  } catch (err) {
    log("err ===>", err);
    res.status(400).json({ msg: "Error in deletinc cart data" });
    return;
  }
};

const checkoutCart = async (req, res) => {
  try {
    let cartData = await query(
      "SELECT * FROM cart WHERE createdBy = ?",
      req.params.userId
    );
    log("CART DATA GET", cartData);
    let productData = [];
    for (const cartItem of cartData) {
      productData = await query(
        "SELECT * FROM products WHERE _id = ?",
        cartItem.productId
      );
      cartItem["product"] = productData[0];
    }
    const totalCartPrice = cartData.reduce(
      (totalPrice, cartItem) =>
        cartItem.product.price * cartItem.quantity + totalPrice,
      0
    );
    let purchaseId = `ps-${uuid()}`;
    let purchaseData = [
      purchaseId,
      req.params.userId,
      new Date(),
      totalCartPrice,
    ];

    let purchaseQueryResult = await query(
      `INSERT INTO purchases  VALUES (?,?,?,?)`,
      purchaseData
    );
    log("Purchase Query Result", purchaseQueryResult);
    let orderId;
    let orderQuery = "",
      orderData = [];
    for (const cartRecord of cartData) {
      orderId = `o-${uuid()}`;
      orderData = [
        orderId,
        cartRecord.createdBy,
        cartRecord.productId,
        cartRecord.product.price * cartRecord.quantity,
        cartRecord.quantity,
        new Date(),
        cartRecord.product.shopId,
        cartRecord.product.imageUrl,
        cartRecord.product.name,
        purchaseId,
      ];
      orderQuery = await query(
        `INSERT INTO orders VALUES (?,?,?,?,?,?,?,?,?,?)`,
        orderData
      );
    }
    let deleteQueryResult = await query(
      `DELETE FROM cart WHERE createdBy = '${req.params.userId}'`
    );
    res.status(200).json({ message: "Checkout Successfully Completed" });
  } catch (err) {
    log("err ===>", err);
    res.status(400).json({ msg: "Error in checking out cart" });
    return;
  }
};

/* Axios use get cart & delete cart

const checkoutCart = async (req, res) => {
  try {
    axios.defaults.headers.get["authorization"] = "1234";
    let cartData = await axios.get(
      `http://localhost:3030/users/${req.params.userId}/cart/`
    );
    cartData = cartData.data ? cartData.data.cartItems : cartData.data;
    
    const totalCartPrice = cartData.reduce(
      (totalPrice, cartItem) =>
        cartItem.product.price * cartItem.quantity + totalPrice,
      0
    );
    let purchaseId = `ps-${uuid()}`;
    let purchaseData = [
      purchaseId,
      req.params.userId,
      new Date(),
      totalCartPrice,
    ];

    let purchaseQueryResult = await query(
      `INSERT INTO purchases  VALUES (?,?,?,?)`,
      purchaseData
    );
    log("Purchase Query Result", purchaseQueryResult);
    let orderId;
    let orderQuery = "",
      orderData = [];
    for (const cartRecord of cartData) {
      orderId = `o-${uuid()}`;
      orderData = [
        orderId,
        cartRecord.createdBy,
        cartRecord.productId,
        cartRecord.product.price * cartRecord.quantity,
        cartRecord.quantity,
        new Date(),
        cartRecord.product.shopId,
        cartRecord.product.imageUrl,
        cartRecord.product.name,
        purchaseId,
      ];
      orderQuery = await query(
        `INSERT INTO orders VALUES (?,?,?,?,?,?,?,?,?,?)`,
        orderData
      );
    }
    let deleteQuery = await query(
      `DELETE FROM cart WHERE createdBy = '${req.params.userId}'`
    );
    res.status(200).json({ message: "Checkout Successfully Completed" });
  } catch (err) {
    log("err ===>", err);
    res.status(400).json({ msg: "Error in checking out cart" });
    return;
  }
};

*/

let endpoints = {
  "/users/:userId/cart/": [
    {
      method: "GET",
      callbacks: [getCart],
    },
    {
      method: "POST",
      callbacks: [createCart],
    },
  ],
  "/users/:userId/cart/:cartId": [
    {
      method: "PUT",
      callbacks: [updateCart],
    },
    {
      method: "DELETE",
      callbacks: [deleteCart],
    },
  ],
  "/users/:userId/cart/checkout": [
    {
      method: "POST",
      callbacks: [checkoutCart],
    },
  ],
};

export { endpoints };
