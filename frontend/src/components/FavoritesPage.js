import React from "react"
import "../styles/FavoritesPage.css"
import { Input } from "semantic-ui-react"
const FavoritesPage = () => {
  return (
    
       <>
    <div class='row'>
        <div class='col-xl-6 col-lg-7 col-md-12'>
          <div class='card profile-header'>
            <div class='body'>
              <div class='row'>
                <div class='col-lg-4 col-md-4 col-12'>
                  <div class='profile-image float-md-right'>
                    {" "}
                    <img
                      src='https://bootdey.com/img/Content/avatar/avatar2.png'
                      alt=''
                    />{" "}
                  </div>
                </div>
                <div class='col-lg-8 col-md-8 col-12'>
                  <br />
                  <h4 class='m-t-0 m-b-0'>Krishna Sai Mangalarapu</h4>
                  <br />
                  <div>
                    <button class="editProfile-btn">
                      Edit Profile <i className='fa fa-pencil'></i>{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class='row'>
        <div class='col-xl-6 col-lg-6 col-md-6'>
          <h4 class='m-t-0 m-b-0'>Favourites</h4>
        </div>
        <div class='col-xl-6 col-lg-6 col-md-6'>
          <div class='input-group rounded'>
            <Input
              icon={{ name: "search", link: true }}
              placeholder='Search...'
              style={{ width: "370px" }}
            />
            {/* <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" /> */}
            {/* <span class="input-group-text border-0" id="search-addon">
                            <i class="fa fa-search fa-2x"></i>
                        </span> */}
          </div>
        </div>
      </div>

        {/* SECTION */}
		<div className="section">
		</div>
		{/* /SECTION */}

		{/* SECTION */}
		<div className="section">
			{/* container */}
			<div className="container">
				{/* row */}
				<div className="row">

					{/* section title */}
					<div className="col-md-12">
						<div className="section-title">
							<h3 className="title">New Products</h3>
							<div className="section-nav">
								<ul className="section-tab-nav tab-nav">
									<li className="active"><a data-toggle="tab" href="#tab1">Laptops</a></li>
									<li><a data-toggle="tab" href="#tab1">Smartphones</a></li>
									<li><a data-toggle="tab" href="#tab1">Cameras</a></li>
									<li><a data-toggle="tab" href="#tab1">Accessories</a></li>
								</ul>
							</div>
						</div>
					</div>
					{/* /section title */}

					{/* Products tab & slick */}
					<div className="col-md-3">
						<div className="row">
							<div className="products-tabs">
								{/* tab */}
								<div id="tab1" className="tab-pane active">
									<div className="products-slick" data-nav="#slick-nav-1">
										{/* product */}
										<div className="product">
											<div className="product-img">
												<img src="./img/product01.png" alt=""></img>
												<div className="product-label">
													<span className="sale">-30%</span>
													<span className="new">NEW</span>
												</div>
											</div>
											<div className="product-body">
												<p className="product-category">Category</p>
												<h3 className="product-name"><a href="#">product name goes here</a></h3>
												<h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
												<div className="product-rating">
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
												</div>
												<div className="product-btns">
													<button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
													<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
													<button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
												</div>
											</div>
											<div className="add-to-cart">
												<button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
											</div>
										</div>
										{/* /product */}

										{/* product */}
										<div className="product">
											<div className="product-img">
												<img src="./img/product02.png" alt=""></img>
												<div className="product-label">
													<span className="new">NEW</span>
												</div>
											</div>
											<div className="product-body">
												<p className="product-category">Category</p>
												<h3 className="product-name"><a href="#">product name goes here</a></h3>
												<h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
												<div className="product-rating">
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star-o"></i>
												</div>
												<div className="product-btns">
													<button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
													<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
													<button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
												</div>
											</div>
											<div className="add-to-cart">
												<button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
											</div>
										</div>
										{/* /product */}

										{/* product */}
										<div className="product">
											<div className="product-img">
												<img src="./img/product03.png" alt=""></img>
												<div className="product-label">
													<span className="sale">-30%</span>
												</div>
											</div>
											<div className="product-body">
												<p className="product-category">Category</p>
												<h3 className="product-name"><a href="#">product name goes here</a></h3>
												<h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
												<div className="product-rating">
												</div>
												<div className="product-btns">
													<button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
													<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
													<button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
												</div>
											</div>
											<div className="add-to-cart">
												<button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
											</div>
										</div>
										{/* /product */}

										{/* product */}
										<div className="product">
											<div className="product-img">
												<img src="./img/product04.png" alt=""></img>
											</div>
											<div className="product-body">
												<p className="product-category">Category</p>
												<h3 className="product-name"><a href="#">product name goes here</a></h3>
												<h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
												<div className="product-rating">
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
												</div>
												<div className="product-btns">
													<button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
													<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
													<button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
												</div>
											</div>
											<div className="add-to-cart">
												<button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
											</div>
										</div>
										{/* /product */}

										{/* product */}
										<div className="product">
											<div className="product-img">
												<img src="./img/product05.png" alt=""></img>
											</div>
											<div className="product-body">
												<p className="product-category">Category</p>
												<h3 className="product-name"><a href="#">product name goes here</a></h3>
												<h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
												<div className="product-rating">
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
												</div>
												<div className="product-btns">
													<button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
													<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
													<button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
												</div>
											</div>
											<div className="add-to-cart">
												<button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
											</div>
										</div>
										{/* /product */}
									</div>
									<div id="slick-nav-1" className="products-slick-nav"></div>
								</div>
								{/* /tab */}
							</div>
						</div>
					</div>
					{/* Products tab & slick */}
				</div>
				{/* /row */}
			</div>
			{/* /container */}
		</div>
		{/* /SECTION */}
       </>                            
  )
}

export default FavoritesPage;
