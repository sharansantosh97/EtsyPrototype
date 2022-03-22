import React from 'react'

const Footer = () => {
  return (
         <>
            {/* NEWSLETTER */}
		<div id="newsletter" class="section">
			{/* container */}
			<div class="container">
				{/* row */}
				<div class="row">
					<div class="col-md-12">
						<div class="newsletter">
							<p>Sign Up for the <strong>NEWSLETTER</strong></p>
							<form>
								<input class="input" type="email" placeholder="Enter Your Email"></input>
								<button class="newsletter-btn"><i class="fa fa-envelope"></i> Subscribe</button>
							</form>
							<ul class="newsletter-follow">
								<li>
									<a href="#"><i class="fa fa-facebook"></i></a>
								</li>
								<li>
									<a href="#"><i class="fa fa-twitter"></i></a>
								</li>
								<li>
									<a href="#"><i class="fa fa-instagram"></i></a>
								</li>
								<li>
									<a href="#"><i class="fa fa-pinterest"></i></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				{/* /row */}
			</div>
			{/* /container */}
		</div>
		{/* /NEWSLETTER */}

		{/* FOOTER */}
		<footer id="footer">
			{/* top footer */}
			<div class="section">
				{/* container */}
				<div class="container">
					{/* row */}
					<div class="row">
						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">About Us</h3>
								<p>Etsy, Inc. is an American e-commerce company focused on handmade or vintage items and craft supplies. These items fall under a wide range of categories, including jewelry, bags, clothing, home décor and furniture, toys, art, as well as craft supplies and tools. Items described as vintage must be at least 20 years old</p>
								<ul class="footer-links">
									<li><a href="#"><i class="fa fa-map-marker"></i>1354 The Alameda</a></li>
									<li><a href="#"><i class="fa fa-phone"></i>+021-95-51-84</a></li>
									<li><a href="#"><i class="fa fa-envelope-o"></i>etsysupport@gmail.com</a></li>
								</ul>
							</div>
						</div>

						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">Categories</h3>
								<ul class="footer-links">
									<li><a href="#">Hot deals</a></li>
									<li><a href="#">Laptops</a></li>
									<li><a href="#">Smartphones</a></li>
									<li><a href="#">Cameras</a></li>
									<li><a href="#">Accessories</a></li>
								</ul>
							</div>
						</div>

						<div class="clearfix visible-xs"></div>

						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">Information</h3>
								<ul class="footer-links">
									<li><a href="#">About Us</a></li>
									<li><a href="#">Contact Us</a></li>
									<li><a href="#">Privacy Policy</a></li>
									<li><a href="#">Orders and Returns</a></li>
									<li><a href="#">Terms & Conditions</a></li>
								</ul>
							</div>
						</div>

						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">Service</h3>
								<ul class="footer-links">
									<li><a href="#">My Account</a></li>
									<li><a href="#">View Cart</a></li>
									<li><a href="#">Wishlist</a></li>
									<li><a href="#">Track My Order</a></li>
									<li><a href="#">Help</a></li>
								</ul>
							</div>
						</div>
					</div>
					{/* /row */}
				</div>
				{/* /container */}
			</div>
			{/* /top footer */}

			{/* bottom footer */}
			<div id="bottom-footer" class="section">
				<div class="container">
					
				</div>
				{/* /container */}
			</div>
			{/* /bottom footer */}
		</footer>
		{/* /FOOTER */}
         </>
  )
}

export default Footer