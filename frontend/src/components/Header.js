import React, {useContext,useEffect,useState} from 'react'
import { GlobalContext } from "../context/Provider";
import {NavLink} from "react-router-dom";
import axiosInstance from "../utils/axios";
import {useNavigate} from "react-router-dom";
import config from "../utils/config.js";
import axios from "axios";
import { productsAction } from "../context/actions/productsAction";

function Header() {

	

	const navigate = useNavigate();
	const { authState, authDispatch } = useContext(GlobalContext);
    
	const {
		authState: { auth: data },
		globalDispatch,
		globalState: { user },
	  } = useContext(GlobalContext);
	
	  const userId = user?.userId;
	
	  console.log("user from globalState | Header", user);
	
	  const [query, setQuery] = useState("");
	  useEffect(() => {
		console.log("Search Items are", query);
	
		console.log("products Search action dispatch");
		productsAction(userId, query)(globalDispatch);
	  }, [query]);

	const shopView = async (e)=>
	{
		e.preventDefault();
		const token = localStorage.getItem("token");
		if(!token){
			navigate("/login", {replace:true});
		}
		else
		{
			try{
				console.log(`${config.baseUrl}/users/${authState.auth.data.data.userId}/shops`);
				const response = await axios.get(`${config.baseUrl}/users/${authState.auth.data.data.userId}/shops`,{headers:{'Authorization':localStorage.getItem("token")}});
				console.log(`${config.baseUrl}/users/${authState.auth.data.data.userId}/shops`);
				console.log(response);
				if(response.data)
				{
					if(response.data.hasOwnProperty("msg"))
					{
						navigate("/newshop", {replace:true});
					}else
					{
						navigate("/usershop", {replace:true});
					}
				}else
				{
					console.log("Error Getting Response from Shops API")
				}

			}catch(e)
			{
				console.log(e);
			}
		}
	}



  return (
    <header>
			{/*<!-- MAIN HEADER -->*/}
			<div id="header">
				{/*<!-- container -->*/}
				<div className="container">
					{/*<!-- row -->*/}
					<div className="row">
						{/*<!-- LOGO -->*/}
						<div className="col-md-2">
							<div className="header-logo">
								
							<NavLink to="/" style={{textDecoration:"none"}}><h1 style={{color: "white", fontSize:"50px" }}>ETSY</h1> </NavLink>
								
							</div>
						</div>
						{/*<!-- /LOGO -->*/}

						{/*<!-- SEARCH BAR -->*/}
						<div className="col-md-4">
							<div className="header-search">
								<form onSubmit={(e)=>{e.preventDefault()}}>
									<input className="input" placeholder="Search here"></input>
									<button className="search-btn" onChange={(e) => setQuery(e.target.value)}>Search</button>
								</form>
							</div>
						</div>
						{/*<!-- /SEARCH BAR -->*/}

						{/*<!-- ACCOUNT -->*/}
						<div className="col-md-6 clearfix">
							<div className="header-ctn">
								{/*<!-- Wishlist -->*/}
								<div className="dropdown">
									<a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" style={{textDecoration:"none"}}>
										<i className="fa fa-heart-o" aria-hidden="true"></i>
										<span>Your Wishlist</span>
									</a>
									<div className="cart-dropdown">
										<div className="cart-list">
											<div className="product-widget">
												<div className="product-body">
													<h3 className="product-name"><NavLink to="/profile" ><p>View your Profile</p></NavLink></h3>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/*<!-- /Wishlist -->*/}

								{/*<!-- Cart -->*/}
								<div className="dropdown">
									<a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" style={{textDecoration:"none"}}>
										<i className="fa fa-shopping-cart"></i>
										<span>Your Cart</span>
										<div className="qty">3</div>
									</a>
									<div className="cart-dropdown">
										<div className="cart-list">
											<div className="product-widget">
												<div className="product-img">
													<img src="./img/product01.png" alt=""></img>
												</div>
												<div className="product-body">
													<h3 className="product-name"><a href="#">product name goes here</a></h3>
													<h4 className="product-price"><span className="qty">1x</span>$980.00</h4>
												</div>
												<button className="delete"><i className="fa fa-close"></i></button>
											</div>

											<div className="product-widget">
												<div className="product-img">
													<img src="./img/product02.png" alt=""></img>
												</div>
												<div className="product-body">
													<h3 className="product-name"><a href="#">product name goes here</a></h3>
													<h4 className="product-price"><span className="qty">3x</span>$980.00</h4>
												</div>
												<button className="delete"><i className="fa fa-close"></i></button>
											</div>
										</div>
										<div className="cart-summary">
											<small>3 Item(s) selected</small>
											<h5>SUBTOTAL: $2940.00</h5>
										</div>
										<div className="cart-btns">
											<a href="#">View Cart</a>
											<a href="#">Checkout  <i className="fa fa-arrow-circle-right"></i></a>
										</div>
									</div>
								</div>
			
								{/*<!-- /Cart -->*/}

								<div className="dropdown">
									<a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" style={{textDecoration:"none"}}>
										<i className="fa fa-user-circle" aria-hidden="true"></i>
										<span>Profile</span>
									</a>
									<div className="cart-dropdown">
										<div className="cart-list">
											<div className="product-widget">
												<div className="product-body">
													<h3 className="product-name"><NavLink to="/profile"><p>View your Profile</p></NavLink></h3>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="dropdown">
									<a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" style={{textDecoration:"none"}}>
									<i className="fa fa-shopping-bag" aria-hidden="true"></i>
										<span>Shop</span>
									</a>
									<div className="cart-dropdown">
										<div className="cart-list">
											<div className="product-widget">
												<div className="product-body">
													<h3 className="product-name"><a href="" onClick={(e)=>{shopView(e)}}> View Shop</a></h3>
												</div>
											</div>
										</div>
									</div>
								</div>
								
								<div className="loginbutton">
									<NavLink to="/login"><button className="login-btn">Login</button></NavLink>
								</div>

								{/*<!-- Menu Toogle -->*/}
								<div className="menu-toggle">
									<a href="#">
										<i className="fa fa-bars"></i>
										<span>Menu</span>
									</a>
								</div>
								{/*<!-- /Menu Toogle -->*/}
							</div>
						</div>
						{/*<!-- /ACCOUNT -->*/}
					</div>
					{/*<!-- row -->*/}
				</div>
				{/*<!-- container -->*/}
			</div>
			{/*<!-- /MAIN HEADER -->*/}
		</header>
  )
}

export default Header