import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocation , useNavigate, useParams, Link} from 'react-router-dom';
import "../css/style.css";
import "../css/font-awesome.min.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductPage() {

	
	const {id} = useParams();


  return (
    <>
	<br></br>
	
    <div className="container">
		<div className="card">
			<div className="container-fliud">
				<div className="wrapper row">
					<div className="preview col-md-6">
						<div className="preview-pic tab-content">
						  <div className="tab-pane active" id="pic-1"><img src="http://placekitten.com/400/252" /></div>
						  <div className="tab-pane" id="pic-2"><img src="http://placekitten.com/400/252" ></img></div>
						  <div className="tab-pane" id="pic-3"><img src="http://placekitten.com/400/252"></img></div>
						  <div className="tab-pane" id="pic-4"><img src="http://placekitten.com/400/252" /></div>
						  <div className="tab-pane" id="pic-5"><img src="http://placekitten.com/400/252" /></div>
						</div>
						<ul className="preview-thumbnail nav nav-tabs">
						  <li className="active"><a data-target="#pic-1" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						  <li><a data-target="#pic-2" data-toggle="tab"><img src="http://placekitten.com/200/126" ></img></a></li>
						  <li><a data-target="#pic-3" data-toggle="tab"><img src="http://placekitten.com/200/126" ></img></a></li>
						  <li><a data-target="#pic-4" data-toggle="tab"><img src="http://placekitten.com/200/126" ></img></a></li>
						  <li><a data-target="#pic-5" data-toggle="tab"><img src="http://placekitten.com/200/126" ></img></a></li>
						</ul>
						
					</div>
					<div className="details col-md-6">
						<h3 className="product-title">men's shoes fashion</h3>
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
						<p className="product-description">Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.</p>
						<h4 className="price">current price: <span>$180</span></h4>
						<p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
						<h5 className="sizes">sizes:
							<span className="size" data-toggle="tooltip" title="small">s</span>
							<span className="size" data-toggle="tooltip" title="medium">m</span>
							<span className="size" data-toggle="tooltip" title="large">l</span>
							<span className="size" data-toggle="tooltip" title="xtra large">xl</span>
						</h5>
						<div className="action">
							<button className="login-btn" type="button">add to cart</button>
							<button className="like btn btn-default" type="button"><span className="fa fa-heart"></span></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</>
  )
}

export default ProductPage;