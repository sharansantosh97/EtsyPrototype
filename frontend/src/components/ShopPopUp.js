import React from 'react'

function ShopPopUp() {
  return (
    <div>
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
                    {/*<div className="row">
                        <div className="col-12 col-sm-auto mb-3">
                        <div className="mx-auto" style={{width: "190px"}}>
                            <div className="d-flex justify-content-center align-items-center rounded" style={{height: "190px", backgroundColor: "rgb(233, 236, 239)"}}>
                            <span style={{color: "rgb(166, 168, 170)", font: "bold 8pt Arial"}}>190x190</span>
                            </div>
                        </div>
                        </div>
                        <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                        <div className="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap" style = {{fontSize: "17px"}}>John Smith</h4>
                            <div className="mt-2">
                            <button className="profilePicture-btn" style = {{fontSize: "12px"}} type="button">
                                <i className="fa fa-fw fa-camera"></i>
                                <span style = {{fontSize: "12px"}}>Change Photo</span>
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>*/}
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
                                    <label>Name of the Product</label>
                                    <input className="form-control" type="text" name="name"></input>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                    <label>Category</label>
                                    <input className="form-control" type="text" name="category"></input>
                                    </div>
                                </div>
                                </div>

                                <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                    <label>Quantity Available</label>
                                    <input className="form-control" type="text" name="name"></input>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                    <label>Price</label>
                                    <input className="form-control" type="text" name="category"></input>
                                    </div>
                                </div>
                                </div>
                                
                                <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                    <label>Description</label>
                                    <input className="form-control" type="text" name="name"></input>
                                    </div>
                                </div>
                                </div>

                                <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                    <label>Image Url</label>
                                    <input className="form-control" type="text" name="name"></input>
                                    </div>
                                </div>
                                </div>


                            
                            </div>
                            </div>
                            <div className="row">
                            <div className="col d-flex justify-content-end">
                            <br/>
                            <div>
                                <button className="saveChanges-btn"type="submit">Cancel</button>
                            </div>
                            <div>
                                <button className="saveChanges-btn"type="submit">Create Product</button>
                            </div>
                                
                
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
    </div>
  )
}

export default ShopPopUp