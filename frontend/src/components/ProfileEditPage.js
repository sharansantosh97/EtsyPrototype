import React, {useState,useContext,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {NavLink} from "react-router-dom";
import '../styles/ProfileEditPage.css';
import { GlobalContext } from "../context/Provider";
import countries from '../countries';
function ProfileEditPage() {
    const { authState, authDispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [form, setForm] = useState({
        username: "",
        password: "",
      })


    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login", {replace:true});
        }
    },[]);
  return (
    <>
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
                    <div className="row">
                        <div className="col-12 col-sm-auto mb-3">
                        <div className="mx-auto" style={{width: "190px"}}>
                            <div className="d-flex justify-content-center align-items-center rounded" style={{height: "190px", backgroundColor: "rgb(233, 236, 239)"}}>
                            <span style={{color: "rgb(166, 168, 170)", font: "bold 8pt Arial"}}>190x190</span>
                            </div>
                        </div>
                        </div>
                        <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                        <div className="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap" style = {{fontSize: "17px"}}>{authState.auth.data.data.username}</h4>
                            <div className="mt-2">
                            <button className="profilePicture-btn" style = {{fontSize: "12px"}} type="button">
                                <i className="fa fa-fw fa-camera"></i>
                                <span style = {{fontSize: "12px"}}>Change Photo</span>
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item"><a href="" className="active nav-link">Details</a></li>
                    </ul>
                    <div className="tab-content pt-3">
                        <div className="tab-pane active">
                        <form className="form" noValidate="">
                            <div className="row">
                            <div className="col">
                                <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                    <label>Full Name</label>
                                    <input className="form-control" type="text" name="name" placeholder="John Smith"></input>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                    <label>Date of Birth</label>
                                    <input className="form-control" type="date" name="dateOfBirth"></input>
                                    </div>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        {/*<input className="form-check-input" type="radio" id="huey" name="drone" value="huey"checked></input>
                                        <label for="huey">Huey</label>
                                        <input className="form-check-input" type="radio" id="dewey" name="drone" value="dewey"></input>
                                        <label for="dewey">Dewey</label>
                                        <input className="form-check-input" type="radio" id="louie" name="drone" value="louie"></input>
                                        <label for="louie">Louie</label>*/}
                                    </div>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                    <label>Email</label>
                                    <input className="form-control" type="text" placeholder="user@example.com"></input>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                    <label>Phone Number</label>
                                    <input className="form-control" type="tel" placeholder="123-456-7890" /*pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"*/></input>
                                    </div>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col mb-3">
                                    <div className="form-group">
                                    <label>About</label>
                                    <textarea className="form-control" rows="5" placeholder="My Bio"></textarea>
                                    </div>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                    <label>Address Line 1</label>
                                    <input className="form-control" type="text"></input>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                    <label>Address Line 2</label>
                                    <input className="form-control" type="text"></input>
                                    </div>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                    <label>City</label>
                                    <input className="form-control" type="text"></input>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                    <label>State</label>
                                    <input className="form-control" type="text"></input>
                                    </div>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                    <label>Country</label>
                                    <select className="form-control">
                                     <option value="Select the country">Select the country</option>
                                     {countries.map((country) => <option key={country.name} value={country.name}>{country.name}</option>)}
                                    </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                    <label>Zipcode</label>
                                    <input className="form-control" type="text"></input>
                                    </div>
                                </div>
                                </div>

                                <div className="row">
                                <div className="col">
                                <div>
                                    <div>Upload Profile Photo</div>
                                    <div>Progress is {progress}%</div>
                                    <input type="file" onChange={handleFileInput}/>
                                </div>
                                </div>
                    
                                </div>

                            </div>
                            </div>
                            <div className="row">
                            <div className="col d-flex justify-content-end">
                                <NavLink to="/profile"><button className="saveChanges-btn" type="submit">Cancel</button></NavLink>
                                <button className="saveChanges-btn" type="submit">Save Changes</button>
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
    </>
  )
}

export default ProfileEditPage