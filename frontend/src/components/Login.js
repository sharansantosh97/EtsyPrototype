import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Login.css';
function Login() {
  return (
    <>
      <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style={{borderRadius: "1rem"}}>
              <div class="card-body p-5 text-center">

                <div class="mb-md-5 mt-md-4 pb-5">

                  <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                  <p class="text-white-50 mb-5">Please enter your login and password!</p>

                  <div class="form-outline form-white mb-4">
                    <input type="email" id="typeEmailX" class="form-control form-control-lg" />
                    <label class="form-label" for="typeEmailX">Email</label>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input type="password" id="typePasswordX" class="form-control form-control-lg" />
                    <label class="form-label" for="typePasswordX">Password</label>
                  </div>

                  <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>

                  <button class="login-btn" type="submit">Login</button>

                </div>

                <div>
                  <p class="mb-0">Don't have an account? <NavLink to="/signup"> <p class="text-white-50 fw-bold">Sign Up</p></NavLink></p>
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