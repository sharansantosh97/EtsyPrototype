import React,{useState,useContext} from 'react';
import { GlobalContext } from "../context/Provider";
import "../styles/NewShop.css";
import axiosInstance from "../utils/axios";
import config from "../utils/config.js";
function NewShop() {

  const [shopName, setShopName] = useState("");
  const [shopAvailable, setShopAvailable] = useState();
  const { authState, authDispatch } = useContext(GlobalContext);
  const createShop = async ()=>{
    
  }
  const checkAvailability = async ()=>
  {
    if(shopName)
    {
      const response = await axiosInstance.get(`${config.baseUrl}/users/${authState.auth.data.data.userId}/shop/checkavailability?shopname=${shopName}`);
      if(response && response.data)
      {
        if(response.data.available==true)
        {
          setShopAvailable(true);
        }else
        {
          setShopAvailable(false);
        }
      }else{
          console.log("Error Response from Shop API");
        }
    }
  }
  return (
    <div className="container">
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <h4 className="m-t-0 m-b-0">Name your Shop</h4>
                </div>
            </div>
         <div>
            <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="input-group rounded">
                    <input type="search" className="form-control rounded" placeholder="Enter Shop Name" aria-label="Search" aria-describedby="search-addon" onChange={(e)=>{setShopName(e.target.value)}}/>
                    {/* <span className="input-group-text border-0" id="search-addon">
                        <i className="fa fa-search fa-2x"></i>
                    </span> */}
                    <button className='checkAvail-btn' onClick={checkAvailability}>Check Availability</button>
                </div>
            </div>
            {shopAvailable &&
            <div className="create-shop-avl">
              <div className="shopcreate-success">Available!</div>
              <div><button className="createShop-btn" onClick={createShop} variant="outline-secondary" id="button-addon2">Create Shop</button></div>
            </div>
            }
            {!shopAvailable &&
              <div className="create-shop-notavl">
                <div className="shopcreate-error">Not Available! Please choose a different name.</div>
              </div>
            }
        </div>
    </div>
  )
}

export default NewShop