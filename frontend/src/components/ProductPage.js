import React, { useState,useContext,useEffect } from 'react';
import {useNavigate, useParams, NavLink} from 'react-router-dom';
import "../css/style.css";
import "../css/font-awesome.min.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalContext } from "../context/Provider"
import axiosInstance from "../helpers/axiosInstance"
import { Dimmer, Loader } from "semantic-ui-react"

function ProductPage() {

	
	const {id} = useParams();
	const { authState, authDispatch } = useContext(GlobalContext);
	const navigate = useNavigate();
	const [product, setProduct] = useState({})
	const [pagelink, setPagelink] = useState("/shop/")
	const [productQuantity, setProductQuantity] = useState(0)
	const [loading, setLoading] = useState(false)
	const { globalDispatch, globalState } = useContext(GlobalContext)
	const {
		user,
		products: { data },
	  } = globalState
	  const userId = user?.userId

	  useEffect(() => {
		const token = localStorage.getItem("token");
		if(!token)
		{
			navigate("/login", {replace:true});
		}else
		{
		setLoading(true)
		console.log("product page");
		console.log(authState.auth.data.data.userId);
		axiosInstance()
		  .get(`/users/${authState.auth.data.data?.userId}/products/${id}`)
		  .then((response) => {
			console.log("response.data", response.data)
			setProduct(response.data)
			setLoading(false)
			setPagelink(pagelink+response.data.shopId);
		  })
		  .catch((err) => {
			setLoading(false)
			console.log(err)
		  })
		// data?.products.map((product) => {
		//   if (product._id === id) {
		//     setProduct(product)
		//     // Display max 20 items in the select box.
		product?.quantity >= 20
		  ? setProductQuantity(20)
		  : setProductQuantity(product.quantity)
		//   }
		// })
	  }
	}, [])
	
	  let handleQuantityChange = (e) => {
		setProductQuantity(e.target.value)
	  }
	  const shopPageOpen = ()=>{
		  if(product.shopId) {
			   navigate("/shop/"+product.shopId);
		  }
	  }
	
  return (
    <>
		{
		loading ? (
			<div className='container' style={{ marginTop: "250px" }}>
			  <Dimmer active inverted>
				<Loader inverted>Loading</Loader>
			  </Dimmer>
			</div>
		  ) :(
			  product && <div className="container">
			  <div className="card">
				  <div className="container-fliud">
					  <div className="wrapper row">
						  <div className="preview col-md-6">
							  <div className="preview-pic tab-content">
								<div className="tab-pane active" id="pic-1"><img src={product.imageUrl} /></div>
								
							  </div>
						  </div>
						  <div className="details col-md-6">
							  <h3 className="product-title">{product.name}</h3>
							  <h4 >Shop Name :<NavLink to={pagelink}><a href=""> {product.shopName} </a></NavLink></h4>
							  <div className="rating">
								  <div className="stars">
									  <span className="fa fa-star checked"></span>
									  <span className="fa fa-star checked"></span>
									  <span className="fa fa-star checked"></span>
									  <span className="fa fa-star"></span>
									  <span className="fa fa-star"></span>
								  </div>
								  <span className="review-no">41 reviews</span>
							  </div>
							  <p className="product-description">{product.description}</p>
							  <h4 className="price">Current Price: <span>{product.price}</span></h4>
							  <p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
							  <div className="action">
								  <button className="login-btn" type="button">Add to cart</button>
								  <button className="login-btn" type="button" style={{width:"150px", margin:"10px"}}>Add to Favorites</button>
							  </div>
						  </div>
					  </div>
				  </div>
			  </div>
		  </div>
		  )
	  }
	</>
  );
}

export default ProductPage;