import { useContext, useEffect, useState } from "react";
import axiosInstance from "../helpers/axiosInstance";
import { GlobalContext } from "../context/Provider";
function PurchasesPage() {


    const { authState, authDispatch } = useContext(GlobalContext);
    const getAllPurchases = async () =>
    {
        axiosInstance()
        .get(`/users/${authState.auth.data.data.userId}/cart/checkout`)
        .then((response) => {
          console.log("response.data", response.data)
            setMsg(true);
            globalDispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload:[] })
            navigate("/purchase");
                //setProduct(response.data)
                //setLoading(false)
                })
                .catch((err) => {
                //setLoading(false)
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
                    <th scope="col">Product Image Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Shares</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td class="w-25">
                        <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-3.jpg" class="img-fluid img-thumbnail" alt="Sheep"></img>
                    </td>
                    <td>Bootstrap 4 CDN and Starter Template</td>
                    <td>Cristina</td>
                    <td>913</td>
                    <td>2.846</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td class="w-25">
                        <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg" class="img-fluid img-thumbnail" alt="Sheep"></img>                    </td>
                    <td>Bootstrap Grid 4 Tutorial and Examples</td>
                    <td>Cristina</td>
                    <td>1.434</td>
                    <td>3.417</td>
                    </tr>
                </tbody>
                </table>   
            </div>
        </div>
        </div>
    </div>
  )
}

export default PurchasesPage