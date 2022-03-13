import React from 'react'
import '../styles/SignUp.css';
import {NavLink} from "react-router-dom";
function SignUp() {
  return (
    <>
    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style={{borderRadius: "1rem"}}>
              <div class="card-body p-5 text-center">

                <div class="mb-md-5 mt-md-4 pb-5">

                  <h2 class="fw-bold mb-2 text-uppercase">Create an Account</h2>
                  <p class="text-white-50 mb-5">Please enter the below details</p>
                  
                  <div class="form-outline form-white mb-4">
                    <input type="name" id="typeNameX" class="form-control form-control-lg" />
                    <label class="form-label" for="typeNameX">Username</label>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input type="email" id="typeEmailX" class="form-control form-control-lg" />
                    <label class="form-label" for="typeEmailX">Email</label>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input type="password" id="typePasswordX" class="form-control form-control-lg" />
                    <label class="form-label" for="typePasswordX">Password</label>
                  </div>

                  <button class="login-btn" type="Sign Up">Sign Up</button>

                </div>

                <div>
                <p class="mb-0">Already Have an account? <NavLink to="/login"> <p class="text-white-50 fw-bold">Login</p></NavLink></p>
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

export default SignUp