import React, {useContext,useEffect,useState} from 'react';
import { GlobalContext } from "../context/Provider";
import Footer from './Footer';
import NavigationBar from './NavigationBar'
import { productsAction } from "../context/actions/productsAction";
import { postFavoritesAction } from "../context/actions/favoritesAction";
import { putCartAction } from "../context/actions/cartAction";
import config from "../utils/config.js";
import axios from "axios";
import {useNavigate, NavLink} from "react-router-dom";
import {createSearchParams} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {getproducts} from "../Redux/Actions/product.js";
import axiosInstance from "../utils/axios";
function Home() {

  const {user} = useSelector((state)=>state.user);
  const {products} = useSelector((state)=>state.products);
  const [favoriteItemsList, setFavoriteItemsList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const { authState, authDispatch } = useContext(GlobalContext);
  //const { globalDispatch, globalState } = useContext(GlobalContext)
//   const {
//     authState: { auth: data },
//   } = useContext(GlobalContext)
  

//   const user = data.data?.data
//   console.log("USER"+JSON.stringify(user))
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("userDetails", JSON.stringify(user))
//     }
//     console.log("globalState 1", globalState)
//     if (localStorage.userDetails) {
//       console.log(
//         "userDetails",
//         JSON.parse(localStorage.getItem("userDetails"))
//       )
//       globalDispatch({
//         type: "SET_USER",
//         payload: JSON.parse(localStorage.getItem("userDetails")),
//       })
//     }
//   }, [data])

//   const {
//     user,
//     products: { data },
//   } = globalState;
  //console.log("user from globalState", user?.userId);
  //const userId = user?.userId;

  useEffect(() => {
	dispatch(getproducts(user?.userId));
  }, [user?.userId]);

  useEffect(() => {
    dispatch(getproducts(user?.userId));
  }, []);

  
//   console.log("Global State from Home", globalState);
  
  const handleFavProduct = async (productId) => 
  {
    // if (userId) {
    //   console.log("productId from handleFavProduct", productId);
    //   postFavoritesAction(productId, userId)(globalDispatch);
    //   console.log("global state after postFavoritesAction", globalState);
    // }
	const token = localStorage.getItem("token");
 	if(token){        
	const response = await axios.post(`${config.baseUrl}/users/${user.userId}/favorites`,{ productId },{headers:{'Authorization':localStorage.getItem("token")}});
	if(response && response.data)
	{
		console.log("FAVVRES"+JSON.stringify(response.data));
	}else{
		console.log("Error adding favorites");
	}
}
  };

  const addToCart = (productId) => {
	const token = localStorage.getItem("token");
    if (token) {
      console.log(productId);
	  console.log(user.userId);
      //putCartAction(user.userId, productId)(globalDispatch);
      //console.log("HI put cart action dispatch");
    }
  };
  
  const productsDiv = products?.products.map((item, index) => {
    let pageLink = `/product/${item._id}`;
    return (
		<>
		<div class="col-4" style={{width:"250px",height:"500px"}}>
		<div className="product">
			<div className="product-img">
				<img src={item.imageUrl} style={{width:"240px",height:"200px"}}alt=""></img>
				<div className="product-label">
					<span className="sale">-30%</span>
					<span className="new">NEW</span>
				</div>
			</div>
			<div className="product-body">
				<h3 className="product-name"><NavLink to={pageLink}><a href="" > {item.name}</a></NavLink></h3>
				<h4 className="product-price">$ {item.price}<del className="product-old-price">{item.price-(30/100)*item.price}</del></h4>
				<div className="product-rating">
					<i className="fa fa-star"></i>
					<i className="fa fa-star"></i>
					<i className="fa fa-star"></i>
					<i className="fa fa-star"></i>
					<i className="fa fa-star"></i>
				</div>
				<h4 className="product-description">{item.description}</h4>
				{item.quantity==0 && <h4 className="product-description" style={{color:"red"}}>OUT OF STOCK!</h4>}
				<div className="product-btns">
					<button className="add-to-wishlist" onClick={() => handleFavProduct(item._id)}>
						<i className="fa fa-heart-o" style={{color:"red"}}></i>
						<span className="tooltipp">add to wishlist</span>
					</button>
					<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
					<button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
				</div>
			</div>
			<div className="add-to-cart">
				<button className="add-to-cart-btn" onClick={() => addToCart(item._id)}><i className="fa fa-shopping-cart"></i> add to cart</button>
			</div>
			</div>
			</div>
		</>
    );
  });

  return (
  <>
	{/* SECTION */}
		<div class="section">
			{/* container */}
			<div class="container">
				{/* row */}
				<div class="row">
					{/* shop */}
					<div class="col-md-4 col-xs-6">
						<div class="shop">
							<div class="shop-img">
								<img src="./img/shop01.png" alt=""></img>
							</div>
							<div class="shop-body">
								<h3>Laptop<br/>Collection</h3>
								<a href="#" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"></i></a>
							</div>
						</div>
					</div>
					{/* /shop */}

					{/* shop */}
					<div class="col-md-4 col-xs-6">
						<div class="shop">
							<div class="shop-img">
								<img src="./img/shop03.png" alt=""></img>
							</div>
							<div class="shop-body">
								<h3>Accessories<br/>Collection</h3>
								<a href="#" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"></i></a>
							</div>
						</div>
					</div>
					{/* /shop */}

					{/* shop */}
					<div class="col-md-4 col-xs-6">
						<div class="shop">
							<div class="shop-img">
								<img src="./img/shop02.png" alt=""></img>
							</div>
							<div class="shop-body">
								<h3>Cameras<br/>Collection</h3>
								<a href="#" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"></i></a>
							</div>
						</div>
					</div>
					{/* /shop */}
				</div>
				{/* /row */}
			</div>
			{/* /container */}
		</div>
		{/* /SECTION */}


    {/* HOT DEAL SECTION */}
		<div id="hot-deal" className="section">
		  {/* container */}
		  <div className="container">
		    {/* row */}
		    <div className="row">
		      <div className="col-md-12">
		        <div className="hot-deal">
		          <ul className="hot-deal-countdown">
		            <li>
		              <div>
		                <h3>02</h3>
		                <span>Days</span>
		              </div>
		            </li>
		            <li>
		              <div>
		                <h3>10</h3>
		                <span>Hours</span>
		              </div>
		            </li>
		            <li>
		              <div>
		                <h3>34</h3>
		                <span>Mins</span>
		              </div>
		            </li>
		            <li>
		              <div>
		                <h3>60</h3>
		                <span>Secs</span>
		              </div>
		            </li>
		          </ul>
		          <h2 className="text-uppercase">hot deal this week</h2>
		          <p>FLAT 30% OFF ON New Collection</p>
		          <a className="primary-btn cta-btn" href="#">Shop now</a>
		        </div>
		      </div>
		    </div>
		    {/* /row */}
		  </div>
		  {/* /container */}
		</div>

		<div className="row">{productsDiv}</div>
		<Footer/>
  </>
  )
}

export default Home;