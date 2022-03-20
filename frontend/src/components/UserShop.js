import React,{useEffect,useContext,useState} from 'react';
import { GlobalContext } from "../context/Provider";
import config from "../utils/config.js";
import axiosInstance from "../utils/axios";
import{useNavigate} from 'react-router-dom';
import "../styles/UserShop.css";
import FavoriteItem from "./FavoriteItem";
import ShopProducts from './ShopProducts';
import ShopModal from './ShopModal';
import { Button } from "react-bootstrap";
import axios from "axios";
function UserShop() {


  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState("");
  const [categories, setCategories] = useState([])
  const [selectedFileProduct, setSelectedFileProduct] = useState(null);
  const [editShopImage, setEditShopImage] = useState(false);
  const [addProdBtn, setAddProdBtn] = useState(false);
  const [shopDetails,setShopDetails] = useState({});
  const [shopUp,setShopUp] = useState(false);
  const [shopProducts,setShopProducts] = useState([]);
  const { authState, authDispatch } = useContext(GlobalContext);
  const [addItemData, setAddItemData] = useState({
  });
  
  const getShopDetails = async ()=>
  {
    try{
    const response = await axiosInstance.get(`${config.baseUrl}/users/${authState.auth.data.data.userId}/shops`,{headers:{'Authorization':localStorage.getItem("token")}});
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

  const getUserProfileImage = async ()=>
  {
    const response = await axios.get(`${config.baseUrl}/users/${authState.auth.data.data.userId}/profile`,{headers:{'Authorization':localStorage.getItem("token")}});
    if(response && response.data)
    {
      setUserProfileImage(response.data.imageUrl);
    }
  }

  const getShopProducts = async ()=>
  {
    try
    {
      if(shopDetails._id)
      {
      console.log("SPD"+JSON.stringify(shopDetails));
      let bodyFormData = {
        priceRange: [],
        categoryIds: [],
        shopIds: [],
        excludeOutOfStock: false,
        search:"",
        excludeShopIds:[]
      }
      bodyFormData.shopIds.push(shopDetails._id);
      const response = await axios.post(`${config.baseUrl}/users/${authState.auth.data.data.userId}/products`,bodyFormData,{headers:{'Authorization':localStorage.getItem("token")}});
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
      getUserProfileImage();
    }
  },[]);

  useEffect(() => {
    getShopProducts();
  },[shopDetails]);

  useEffect(() => {
    
  },[shopProducts]);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);

  }


  const handleFileUpload = async (file)=>
    {
       
        // var bodyFormData = new FormData();
        // bodyFormData.append('myImage',selectedFile);
        // const response = await axios.post(`${config.baseUrl}/upload`,bodyFormData,{headers:{'Authorization':localStorage.getItem("token")}});
        // const iUrl = response.data.imageUrl;

        // // setUserDetails({
        // //     ...userDetails,
        // //     imageUrl: iUrl,
        // //   })

    }

    const handleShowUpload =  ()=>
    {
        setEditShopImage(true);
    }
    const handleShowAddProd = async()=>{
      
      try
      {
      setAddProdBtn(true);
      const response = await axios.get(`${config.baseUrl}/users/${authState.auth.data.data.userId}/shops/${shopDetails._idprofile}/categories`,{headers:{'Authorization':localStorage.getItem("token")}});
      if(response.data && response)
      {
        setCategories(response.data.categories);
      }else{
        console.log("Error getting categories from AOI");
      }
    }catch(e)
    {
      console.log("Error getting categories from AOI"+e);
    }

    }

    const handleHideAddProd = ()=>{
      
      setAddProdBtn(false);
    }

    const handleHideUpload =  ()=>
    {
        setEditShopImage(false);
    }

    const handleAddItemInputChange = (e) => {
      setAddItemData({
        ...addItemData,
        [e.target.name]: e.target.value,
      })
    }

    const handleFileInputProd = (e) => {
      setSelectedFileProduct(e.target.files[0]);
  
  }
  const handleUploadProd = async (file)=>
  {
     
      var bodyFormData = new FormData();
      bodyFormData.append('myImage',selectedFileProduct);
      const response = await axios.post(`${config.baseUrl}/upload`,bodyFormData,{headers:{'Authorization':localStorage.getItem("token")}});
      const iUrl = response.data.imageUrl;
      console.log(iUrl);
      setAddItemData({
          ...addItemData,
          imageUrl: iUrl,
        })

  }
    const postProdData = async ()=>{
     
      console.log("form data"+JSON.stringify(addItemData));
      try{
        const response = await axios.post(`${config.baseUrl}/users/${authState.auth.data.data.userId}/shops/${shopDetails._id}/products`,addItemData,{headers:{'Authorization':localStorage.getItem("token"),'Content-Type':"application/json"}});
        console.log(JSON.stringify(response));
        if(response && response.data)
        {
            console.log("added product successfully");
            
            navigate("/usershop", {replace:true});
            setAddItemData({
              name: "",
              description: "",
              price: "",
              imageUrl: "",
              quantity: "",
              categoryId: "",
            })
            getShopProducts();
            setAddProdBtn(false);
        }else{
            console.log("error posting data to API");
        }
      }catch(e)
      {
        console.log("Error posting product data"+e);
      }
    }
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
                              <span className="job_post">On Etsy since sin</span>
                              <br /> <br />
                              <div>
                                  <button className="editShop-btn" onClick={handleShowUpload}><i className='fa fa-pencil'></i> Edit Shop Image</button>
                                  <br/>
                                  {editShopImage && <div>
                                    <div>Upload Profile Photo</div>
                                    <input type="file" onChange={handleFileInput} style={{margin:"5px"}} name="imageUrl"/>
                                    
                                    <button style={{margin:"5px"}}>Upload Shop Image</button>
                                    <button onClick={handleHideUpload}>Cancel</button>
                                 </div>}
                                  <br/>
                                  <button className="addProductShop-btn" onClick={handleShowAddProd}><i className='fa fa-plus'></i> Add Product To Shop</button>
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
                          <div className="profile-image float-md-right rounded-circle"> <img className='' src={userProfileImage} alt="" width="100px" height="100px"/> </div>
                              <br />
                              <p className="mt-1 m-b-0 text-center">{authState.auth.data.data.username}</p>
                              <br /> <br />
                          </div>                
                    </div>
                  </div>                    
          </div>
      </div>
    </div>




    {addProdBtn &&     <div>
        <div className="container">
        <div className="row flex-lg-nowrap">
        <div className="col-12 col-lg-auto mb-3" style={{width: "200px"}}>
        </div>

        <div className="col">
            <div className="row">
            <div className="col mb-3">
                <div className="card">
                <div className="card-body">
                    <div className="e-profile">
                    <ul className="nav nav-tabs">
                        <li className="nav-item"><a href="" className="active nav-link">Details</a></li>
                    </ul>
                    <div className="tab-content pt-3">
                        <div className="tab-pane active">
                        <form className="form" onSubmit={(e)=>{e.preventDefault()}}>
                            <div className="row">
                            <div className="col">
                                <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                    <label>Name of the Product</label>
                                    <input className="form-control" type="text" name="name" onChange={handleAddItemInputChange}></input>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                    <label>Category</label>
                                        <select
                                    id='category'
                                    class='form-control'
                                    name='categoryId'
                                    onChange={handleAddItemInputChange}
                                  >
                                    <option disabled selected>
                                      Choose Category
                                    </option>
                                    {categories &&
                                      categories.map((category) => {
                                        return (
                                          <option value={category._id}>
                                            {category.name}
                                          </option>
                                        )
                                      })}
                                  </select>
                                    </div>
                                </div>
                                </div>

                                <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                    <label>Quantity Available</label>
                                    <input className="form-control" type="text" name="quantity" onChange={handleAddItemInputChange}></input>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                    <label>Price USD</label>
                                    <input className="form-control" type="text" name="price" onChange={handleAddItemInputChange}></input>
                                    </div>
                                </div>
                                </div>
                                
                                <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                    <label>Description</label>
                                    <input className="form-control" type="text" name="description" onChange={handleAddItemInputChange}></input>
                                    </div>
                                </div>
                                </div>

                                <div className="row">
                                <div className="col">
                                <div>
                                    <div>Upload Shop Photo</div>
                                    <input type="file" onChange={handleFileInputProd} style={{margin:"5px"}} name="imageUrl"/>
                                    
                                    <button style={{margin:"5px"}} onClick={handleUploadProd} >Upload Shop Image</button>
                          
                                 </div>
                                </div>
                                </div>


                            
                            </div>
                            </div>
                            <div className="row">
                            <div className="col d-flex justify-content-end">
                            <br/>
                            <div>
                                <button onClick ={handleHideAddProd}className="saveChanges-btn"type="submit" style={{margin:"5px"}}>Cancel</button>
                            </div>
                            <div>
                                <button onClick={postProdData}className="saveChanges-btn" style={{margin:"5px"}}>Create Product</button>
                            </div>
                                
                
                            </div>
                            </div>
                        </form>

                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </div>
        </div>
        </div>
    </div>}




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