import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../styles/Login.css';
import {useState, useRef, useEffect,useContext} from 'react';
import {Link, useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/Provider";
import axiosInstance from "../utils/axios";
import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS } from "../context/actions/actionTypes";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const Login = () => {

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
  const { authState, authDispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const {
    auth: { data, loading, error },
  } = authState


  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    if (error) {
      console.log("error", error)
      setErrorMsg(error.msg)
    }
  }, [error])

  useEffect(() => {
    if (data) {
      if (data.data) {
        setForm({ email: "", password: "" })
        console.log("data", data)
        
      }
    }
  }, [data])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
        navigate("/profile", {replace:true});
    }
   },[]);

  const handleChange = (e) => {
    const value = e.target.value
    setForm({
      ...form,
      [e.target.name]: value,
    })
  }


  const submitHandler = (e) => {
    if(form.email!="" && form.password!="")
    {
      console.log("submitHandler from login")
      console.log("before"+JSON.stringify(authState));
      
      axiosInstance
      .post("/login", form)
      .then((response) => {
        localStorage.token = response.data.token;
        console.log("response from LOGINAction", response.data);     
        authDispatch({ type: LOGIN_SUCCESS, payload: response.data });
        navigate("/", {replace:true});
      })
      .catch((error) => {
        console.log("error from LOGINAction", error)
        authDispatch({
          type: LOGIN_ERROR,
          payload: error.response ? error.response.data : "Could not connect",
        })
      })

  }

  }
    



  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-3 pb-1">
                    <h2 className="fw-bold mb-2 text-uppercase" style={{color:"white"}}>Login</h2>
                    <p className="text-white-50 mb-5" style={{color:"white"}}>Please enter your login and password!</p>

                    {error ? (
                      <div class='alert alert-danger' role='alert'>
                        {errorMsg}
                      </div>
                    ) : null}

                    <div className="form-outline form-white mb-4">
                      <label className="form-label" for="typeEmailX" style={{float: "left"}}>Email</label>
                      <input type="email" id="typeEmailX" className="form-control form-control-lg" name="email" value={form.email} onChange={handleChange}/>
                      
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label" for="typePasswordX" style={{float: "left"}}>Password</label>
                      <input type="password" id="typePasswordX" className="form-control form-control-lg" name="password" value={form.password} onChange={handleChange}/>
                      
                    </div>

                    <button className="login-btn" type="submit" onClick={submitHandler}>Login</button>

                  </div>

                  <div>
                   {loading ? <p>Loading..</p> : null}
                    <p className="mb-0">Don't have an account? <NavLink to="/signup" style={{textDecoration:"none"}}> <p className="text-white-50 fw-bold">Sign Up</p></NavLink></p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login;