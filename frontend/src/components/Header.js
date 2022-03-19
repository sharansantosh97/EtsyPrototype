import React, {useContext,useEffect,useState} from 'react'
import { GlobalContext } from "../context/Provider";
import {NavLink} from "react-router-dom";
import axiosInstance from "../utils/axios";
import {useNavigate} from "react-router-dom";
import config from "../utils/config.js";
import axios from "axios";
import logout from "../context/actions/logout"
import { productsAction } from "../context/actions/productsAction";
//import { useHistory } from "react-router-dom"

function Header() {

	

	const navigate = useNavigate();
	//const history = useHistory()
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

	  const handleLogout = () => {
		logout()(globalDispatch)
		logout()(authDispatch)
	  }
	  const handleProfile = ()=>{
		const token = localStorage.getItem("token");
        if(!token){
            navigate("/login", {replace:true});
        }else
		{
			navigate("/profile", {replace:true});
		}
	  }
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
									<input className="input" placeholder="Search here" onChange={(e) => setQuery(e.target.value)}></input>
									<button className="search-btn">Search</button>
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
												<div className="product-body">
													<h3 className="product-name"><NavLink to="/cart"><p >View your Cart</p></NavLink></h3>
												</div>
											</div>
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
													<h3 className="product-name"><a onClick={handleProfile}>View your Profile</a></h3>
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
								
								{ !localStorage.getItem("token") &&<div className="loginbutton">
								<NavLink to="/login"><button className="login-btn">Login</button></NavLink>
								</div> }
								{ localStorage.getItem("token") &&
								<div className="loginbutton">
								<NavLink to="/"><button className="login-btn" onClick={handleLogout}>Logout</button></NavLink>
								</div>
								}								

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