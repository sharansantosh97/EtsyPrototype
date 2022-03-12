import React from 'react'
import '../styles/ProfileEditPage.css';
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
                        <div class="mx-auto" style={{width: "140px"}}>
                            <div class="d-flex justify-content-center align-items-center rounded" style={{height: "140px", backgroundColor: "rgb(233, 236, 239)"}}>
                            <span style={{color: "rgb(166, 168, 170)", font: "bold 8pt Arial"}}>140x140</span>
                            </div>
                        </div>
                        </div>
                        <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                        <div class="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">John Smith</h4>
                            <div class="mt-2">
                            <button class="btn btn-primary" type="button">
                                <i class="fa fa-fw fa-camera"></i>
                                <span>Change Photo</span>
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <ul class="nav nav-tabs">
                        <li class="nav-item"><a href="" class="active nav-link">Profile Details</a></li>
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
                                    <label>Username</label>
                                    <input class="form-control" type="text" name="username" placeholder="johnny.s" value="johnny.s"></input>
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
                                </div>
                                <div class="row">
                                <div class="col mb-3">
                                    <div class="form-group">
                                    <label>About</label>
                                    <textarea class="form-control" rows="5" placeholder="My Bio"></textarea>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="row">
                            <div class="col-12 col-sm-6 mb-3">
                                <div class="mb-2"><b>Change Password</b></div>
                                <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                    <label>Current Password</label>
                                    <input class="form-control" type="password" placeholder="••••••"></input>
                                    </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                    <label>New Password</label>
                                    <input class="form-control" type="password" placeholder="••••••"></input>
                                    </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                    <label>Confirm <span class="d-none d-xl-inline">Password</span></label>
                                    <input class="form-control" type="password" placeholder="••••••"></input>
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