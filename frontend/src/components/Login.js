import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Login.css';
import customAxios from '../utils/axiosUrl';
import api from "../utils/axiosUrl";
import {useState, useRef, useEffect} from 'react';

import {Link, useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { addUser } from "../redux/actions/actions.js";


const ConnectedLogin = ({user,addUser}) => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if(token && user){
        navigate("/profile", {replace:true});
    }
},[]);

useEffect(() => {
  setErrorMsg('');
}, [email, password])

  const loginUser = async ()=>{
    // make AXIOS api call
    setLoggingIn(true);
    const user = {email,password};
    try{
      console.log("in login hanfler");
        const response = await api.post("http://localhost:3001/login",user);
        if(response && response.data){
          console.log(response.data);
            if(response.status==200){
                const user = response.data;
                console.log(user);
                if(user && user.token){
                    const token = user.token;
                    localStorage.setItem("token",token);
                    delete user.token;
                    localStorage.setItem("user",JSON.stringify(user));
                    addUser(user);
                    setLoggingIn(false);
                    setSuccess(true);
                    navigate("/profile", {replace:true});
                }
            }else{
                setSuccess(false);
                setErrorMsg("Some unexpected error occurred!");
                setLoggingIn(false);
            }
        }else{
            setSuccess(false);
            setErrorMsg("Some unexpected error occurred!");
            setLoggingIn(false);
        }
    }catch(err){
        setSuccess(false);
        if(err && err.response && err.response.data && err.response.data.error){
            setErrorMsg(err.response.data.error);
        }
        setLoggingIn(false);
    }
  }



  const handleUserLoginSubmit = (e)=>{
    e.preventDefault();
    loginUser();
  }

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>
                    <div className="form-outline form-white mb-4">
                      <input type="email" id="typeEmailX" className="form-control form-control-lg" name="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                      <label className="form-label" for="typeEmailX">Email</label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input type="password" id="typePasswordX" className="form-control form-control-lg" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                      <label className="form-label" for="typePasswordX">Password</label>
                    </div>

                    <button className="login-btn" type="submit" onClick={handleUserLoginSubmit}>Login</button>

                  </div>

                  <div>
                    <p className="mb-0">Don't have an account? <NavLink to="/signup"> <p className="text-white-50 fw-bold">Sign Up</p></NavLink></p>
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
function mapDispatchToProps(dispatch) {
  return {
    addUser: user => dispatch(addUser(user))
  };
}


const mapStateToProps = state => {
  return { user: state.user };
};

const Login = connect(mapStateToProps,mapDispatchToProps)(ConnectedLogin);
export default Login;