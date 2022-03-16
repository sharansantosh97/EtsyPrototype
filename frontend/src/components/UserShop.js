import React,{useEffect,useContext,useState} from 'react';
import { GlobalContext } from "../context/Provider";
import config from "../utils/config.js";
import axiosInstance from "../utils/axios";
import{useNavigate} from 'react-router-dom';
import "../styles/UserShop.css";
import FavoriteItem from "./FavoriteItem";
import ShopProducts from './ShopProducts';
function UserShop() {


  const navigate = useNavigate();
  const [shopDetails,setShopDetails] = useState({});
  const [shopProducts,setShopProducts] = useState([]);
  const { authState, authDispatch } = useContext(GlobalContext);
  
  const getShopDetails = async ()=>
  {
    try{
    const response = await axiosInstance.get(`${config.baseUrl}/users/${authState.auth.data.data.userId}/shops`);
    if(response.data)
    {
      setShopDetails(response.data);
      
    }
    else
    {
      console.log("Error getting shop details from Shop API");
    }
    }catch(e)
    {
      console.log("Error getting shop details from Shop API"+e);
    }
  }

  const getShopProducts = async ()=>
  {
    try
    {
      if(shopDetails._id)
      {
      console.log("SPD"+JSON.stringify(shopDetails));
      const response = await axiosInstance.get(`${config.baseUrl}/users/${authState.auth.data.data.userId}/shops/${shopDetails._id}/products`);
      console.log(`${config.baseUrl}/users/${authState.auth.data.data.userId}/shops/${shopDetails._id}/products`);
      if(response.data)
      {
        setShopProducts(response.data.products);
        console.log(response.data.products);
      }
      else
      {
        console.log("Error getting shop products from Shop API");
      }
    }
  }
    catch(e)
    {
      console.log("Error getting shop products from Shop API"+e);
    }

  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
        navigate("/login", {replace:true});
    }else{
      getShopDetails();
    }
  },[]);

  useEffect(() => {
    getShopProducts();
  },[shopDetails]);


  return (
    <div className='container'>
    <div className="row">
        <div className="col-md-8">
          <div className="card profile-header">
                  <div className="body">
                      <div className="row">
                          <div className="col-lg-4 col-md-4 col-12">
                              <div className="profile-image float-md-right"> <img src="https://i.pinimg.com/736x/22/0c/57/220c57feb2860e0fc131683d16257bf4.jpg" alt=""  width="100px" height="100px"/> </div>
                          </div>
                          <div className="col-lg-8 col-md-8 col-12">
                              <br />
                              <h4 className="m-t-0 m-b-0">{shopDetails.name}</h4>
                              <span className="job_post">{shopDetails.totalSalesCount} | </span>
                              <span className="job_post">On Etsy since</span>
                              <br /> <br />
                              <div>
                                  <button className="editShop-btn"><i className='fa fa-pencil'></i> Edit Shop</button>
                                  <br/>
                                  <br/>
                                  <button className="addProductShop-btn"><i className='fa fa-plus'></i> Add Product To Shop</button>
                              </div>
                          </div>                
                      </div>
                  </div>                    
          </div>
        </div>
        <div className="col-md-4">
        <div className="card profile-header">
                  <div className="body">
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                        <h6 className="small lead text-black-50 text-center">SHOP OWNER</h6>
                          <div className="profile-image float-md-right rounded-circle"> <img className='rounded-circle' src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" width="100px" height="100px"/> </div>
                              <br />
                              <p className="mt-1 m-b-0 text-center">{authState.auth.data.data.username}</p>
                              <br /> <br />
                          </div>                
                    </div>
                  </div>                    
          </div>
      </div>
    </div>
    <div className="container">
      <div className="row">          
          {shopProducts && shopProducts.map((eachFavoriteItem)=>{
            return <ShopProducts key={eachFavoriteItem._id} item={eachFavoriteItem}/>
          })} 
      </div>
    </div>
</div>
  )
}

export default UserShop