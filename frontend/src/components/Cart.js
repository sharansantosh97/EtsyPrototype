import { useContext, useEffect, useState, useCallback } from "react";
import { GlobalContext } from "../context/Provider";
import { cartAction, deleteCartAction } from "../context/actions/cartAction";
import { NavLink,useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance"
import {UPDATE_CART_ITEM_SUCCESS} from "../context/actions/actionTypes";
const Cart = () => {

  const navigate = useNavigate();
  const { globalDispatch, globalState } = useContext(GlobalContext);
  const { authState, authDispatch } = useContext(GlobalContext);
  const { user, cart } = globalState;
  const userId = user?.userId;
  const [msg,setMsg] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token)
    {
      navigate("/login");
    }else{
      cartAction(authState.auth.data.data?.userId)(globalDispatch);
    }

  }, []);

  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  console.log("Global Cart State is", globalState);
  console.log("Cart is ", cart);

  const cartItems = cart?.data ? cart.data.cartItems : [];

  useEffect(() => {
    setCartCount(
      cartItems.reduce(
        (totalItems, cartItem) => (totalItems += cartItem.quantity),
        0
      )
    );
    setCartTotal(
      cartItems.reduce(
        (totalPrice, cartItem) => (totalPrice += cartItem?.product?.price),
        0
      )
    );
  }, [cartItems,msg]);

  const deleteCartItem = useCallback((cartId) => {
    console.log("I'm delete cart");
    deleteCartAction(authState.auth.data.data?.userId, cartId)(globalDispatch);
    // cartAction(userId)(globalDispatch);
  }, []);

  const checkOutCartItems = async ()=>
  {
    console.log(cartItems);

    
    axiosInstance()
		  .post(`/users/${authState.auth.data.data.userId}/cart/checkout`)
		  .then((response) => {
			console.log("response.data", response.data)
      setMsg(true);
      setTimeout(() => {setMsg(false) 
        navigate("/purchases")}, 2000);
      globalDispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload:[] })
      //navigate("/purchases");
			//setProduct(response.data)
			//setLoading(false)
		  })
		  .catch((err) => {
			//setLoading(false)
			console.log(err)
		  })
  }

  let cartsDiv = cartItems.map((cartItem) => {
    return (
      <tr>
        <td data-th="Product">
          <div className="row">
            <div className="col-md-3 text-left">
              <img
                src={cartItem?.product?.imageUrl}
                alt=""
                className="img-fluid d-none d-md-block rounded mb-2 shadow "
              />
            </div>
            <div className="col-md-9 text-left mt-sm-2">
              <h4>{cartItem?.product?.name}</h4>
              <p className="font-weight-light">{cartItem?.product?.shopName}</p>
            </div>
          </div>
        </td>
        <td data-th="Price">
          ${cartItem?.product?.price * cartItem?.quantity}
        </td>
        <td data-th="Quantity">
          <input
            type="number"
            value={cartItem?.quantity}
            className="form-control form-control-lg text-center"
          />
          {cartItem?.quantity.toString}
        </td>
        <td className="actions" data-th="">
          <div className="text-right">
            <button
              className="btn btn-white border-secondary bg-white btn-md mb-2"
              onClick={() => deleteCartItem(cartItem?._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className="container px-2 px-lg-2 my-5">
      <div className="row w-100">
        <div className="col-lg-12 col-md-12 col-12">
          <h3 className="display-5 mb-2 text-left" style={{color:"red"}}>Shopping Cart</h3>
          <br></br>
          <p className="mb-5 text-left" style={{color:"red"}}>
             {cartCount}  items in
            your cart
          </p>
          { cartItems.length!=0 && <table
            id="shoppingCart"
            className="table table-condensed table-responsive"
          >
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{cartsDiv}</tbody>
          </table> }
          { cartItems.length!=0 && <div className="float-right text-right">
            <h4>Subtotal:</h4>
            <h4>${cartTotal}</h4>
          </div> }
        </div>
      </div>
      <div className="row mt-2 d-flex align-items-center">
        { cartItems.length!=0 &&<div className="col-sm-6 order-md-2 text-right">
        <button style={{
            height: "40px",
            width: "100px",
            background: "#D10024",
            color: "#FFF",
            fontWeight: "700",
            border: "none"
          
        }} onClick={checkOutCartItems}>Checkout</button>
        </div> }
        <div className="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
        <NavLink to="/"><button style={{
          height: "40px",
          width: "100px",
          background: "#D10024",
          color: "#FFF",
          fontWeight: "700",
          border: "none",
          width:"150px"
      }}>Continue Shopping</button></NavLink>
        </div>
      </div>
      {msg &&
        <div class='alert alert-success' role='alert'>
           Order Placed Successfully !
        </div>
      }     
    </div>
  );
};

export default Cart;
