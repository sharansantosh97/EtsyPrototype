import React, {useEffect,useContext,useState} from "react";
import axiosInstance from "../utils/axios";
import "../styles/FavoritesPage.css"
import { Input } from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import { GlobalContext } from "../context/Provider";
import FavoriteItem from "./FavoriteItem";
import config from "../utils/config.js";
const FavoritesPage = () => {
  const [favoriteItemsList, setFavoriteItemsList] = useState([]);

  const getFavorites = async () => {
    console.log("url sa "+`${config.baseUrl}/users/${authState.auth.data.data.userId}/favorites`);
    try{
        const response = await axiosInstance.get(`${config.baseUrl}/users/${authState.auth.data.data.userId}/favorites`);
        //console.log("API"+JSON.stringify(response));
        if(response && response.data){
          setFavoriteItemsList(response.data.favorites);
            console.log("items in auth"+JSON.stringify(favoriteItemsList));
        }else{
          console.log("Error Getting Response from Favorite API")
        }
    }catch(e){
        console.log(e);
    }
}



	const { authState, authDispatch } = useContext(GlobalContext);
	const navigate = useNavigate();
	useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login", {replace:true});
        }else{
			   console.log("USER ID"+JSON.stringify(authState.auth.data.data.userId));
         getFavorites();
        }
    },[]);
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
                  <h4 class='m-t-0 m-b-0'>{authState.auth.data.data.username}</h4>
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

    <div class="container">
      <div class="row">          
        {favoriteItemsList && favoriteItemsList.map((eachFavoriteItem)=>{
           return <FavoriteItem key={eachFavoriteItem._id} item={eachFavoriteItem}/>
         })}
          
      </div>
    </div>
       </>                            
  )
}

export default FavoritesPage;
