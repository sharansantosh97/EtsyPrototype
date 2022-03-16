import React from 'react';
import { useNavigate } from 'react-router';


function ShopProducts({item}) {
    const navigate = useNavigate();
    const viewItemOverview = (item)=>{
        if(item.product._id) {
             navigate("/productpage/"+item.product._id);
        }
    }
  return (
    <>
        <div className="col-4">
    <div className="product">
        <div className="product-img">
            <img src={item.imageUrl} alt=""></img>
            <div className="product-label">
                <span className="sale">-30%</span>
                <span className="new">NEW</span>
            </div>
        </div>
        <div className="product-body">
            <h3 className="product-name"><a href="" onClick={()=>{viewItemOverview(item)}}> {item.name}</a></h3>
            <h4 className="product-price">{item.price}<del className="product-old-price">{item.price-(30/100)*item.price}</del></h4>
            <div className="product-rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
            </div>
            <h4 className="product-description">{item.description}</h4>
            <div className="product-btns">
                <button className="add-to-wishlist"><i className="fa fa-heart-o" style={{color:"red"}}></i><span className="tooltipp">add to wishlist</span></button>
                <button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
                <button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
            </div>
        </div>
        <div className="add-to-cart">
            <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
        </div>
        </div>
        </div>
    </>
  )
}

export default ShopProducts