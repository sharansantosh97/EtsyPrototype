import React, {useState} from 'react';
import '../styles/ProfileEditPage.css';
import countries from '../countries';
function ProfileEditPage() {

  return (
    <>
        <div class="container">
        <div class="row flex-lg-nowrap">
        <div class="col-12 col-lg-auto mb-3" style={{width: "200px"}}>
        </div>

        <div class="col">
            <div class="row">
            <div class="col mb-3">
                <div class="card">
                <div class="card-body">
                    <div class="e-profile">
                    <div class="row">
                        <div class="col-12 col-sm-auto mb-3">
                        <div class="mx-auto" style={{width: "190px"}}>
                            <div class="d-flex justify-content-center align-items-center rounded" style={{height: "190px", backgroundColor: "rgb(233, 236, 239)"}}>
                            <span style={{color: "rgb(166, 168, 170)", font: "bold 8pt Arial"}}>190x190</span>
                            </div>
                        </div>
                        </div>
                        <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                        <div class="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap" style = {{fontSize: "17px"}}>John Smith</h4>
                            <div class="mt-2">
                            <button className="profilePicture-btn" style = {{fontSize: "12px"}} type="button">
                                <i class="fa fa-fw fa-camera"></i>
                                <span style = {{fontSize: "12px"}}>Change Photo</span>
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <ul class="nav nav-tabs">
                        <li class="nav-item"><a href="" class="active nav-link">Details</a></li>
                    </ul>
                    <div class="tab-content pt-3">
                        <div class="tab-pane active">
                        <form class="form" novalidate="">
                            <div class="row">
                            <div class="col">
                                <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                    <label>Full Name</label>
                                    <input class="form-control" type="text" name="name" placeholder="John Smith" value="John Smith"></input>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                    <label>Date of Birth</label>
                                    <input class="form-control" type="date" name="dateOfBirth"></input>
                                    </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label>Gender</label>
                                        {/*<input class="form-check-input" type="radio" id="huey" name="drone" value="huey"checked></input>
                                        <label for="huey">Huey</label>
                                        <input class="form-check-input" type="radio" id="dewey" name="drone" value="dewey"></input>
                                        <label for="dewey">Dewey</label>
                                        <input class="form-check-input" type="radio" id="louie" name="drone" value="louie"></input>
                                        <label for="louie">Louie</label>*/}
                                    </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                    <label>Email</label>
                                    <input class="form-control" type="text" placeholder="user@example.com"></input>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                    <label>Phone Number</label>
                                    <input class="form-control" type="tel" placeholder="123-456-7890" /*pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"*/></input>
                                    </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col mb-3">
                                    <div class="form-group">
                                    <label>About</label>
                                    <textarea class="form-control" rows="5" placeholder="My Bio"></textarea>
                                    </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                    <label>Address Line 1</label>
                                    <input class="form-control" type="text"></input>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                    <label>Address Line 2</label>
                                    <input class="form-control" type="text"></input>
                                    </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                    <label>City</label>
                                    <input class="form-control" type="text"></input>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                    <label>State</label>
                                    <input class="form-control" type="text"></input>
                                    </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                    <label>Country</label>
                                    <select class="form-control">
                                     <option value="Select the country" /*onChange={handleCountryChange}*/>Select the country</option>
                                     {countries.map((country) => <option value={country.name}>{country.name}</option>)}
                                    </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                    <label>Zipcode</label>
                                    <input class="form-control" type="text"></input>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="row">
                            <div class="col d-flex justify-content-end">
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