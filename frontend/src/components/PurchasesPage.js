import { useContext, useEffect, useState } from "react";
import axiosInstance from "../helpers/axiosInstance";
import { GlobalContext } from "../context/Provider";
import {useNavigate} from "react-router-dom";
function PurchasesPage() {

    const [purchaseDeatils, setPurchaseDetails] = useState([]);
    const navigate = useNavigate();
    const { authState, authDispatch } = useContext(GlobalContext);
    const getAllPurchases = async () =>
    {
        axiosInstance()
        .get(`/users/${authState.auth.data.data.userId}/orders`)
        .then((response) => {
          console.log("response.data", response.data)  
          setPurchaseDetails(response.data);  
        }).catch((err) => {
            
            console.log(err)
         })

    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token)
        {
          navigate("/login");
        }else{
          getAllPurchases();
        }
    
      }, []);

  return (

    <div>
        <br></br>
        <div class="container">
        <h1 >My Purchases</h1>
        <br></br>
        <div class="row">
            <div class="col-12">
                <table class="table table-image">
                <thead>
                    <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Order ID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        purchaseDeatils.map((singlePurchase)=>{

                            return (
                                <tr>
                                    <th scope="row">{singlePurchase.createdOn.slice(0,10)}</th>
                                    <td class="w-25">
                                        <img src={singlePurchase.productImage} class="img-fluid img-thumbnail" alt="Sheep"></img>
                                    </td>
                                    <td>{singlePurchase.productName}</td>
                                    <td>{singlePurchase.price}</td>
                                    <td>{singlePurchase.quantity}</td>
                                    <td>{singlePurchase._id}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
                </table>   
            </div>
        </div>
        </div>
    </div>
  )
}

export default PurchasesPage
