import React, {useContext,useEffect,useState} from 'react';
import { GlobalContext } from "../context/Provider";
import NavigationBar from './NavigationBar'

function Home() {

  const [favoriteItemsList, setFavoriteItemsList] = useState([]);

  const { authState, authDispatch } = useContext(GlobalContext);


  return (
  <>
    {/* HOT DEAL SECTION */}
		<div id="hot-deal" className="section">
		  {/* container */}
		  <div className="container">
		    {/* row */}
		    <div className="row">
		      <div className="col-md-12">
		        <div className="hot-deal">
		          <ul className="hot-deal-countdown">
		            <li>
		              <div>
		                <h3>02</h3>
		                <span>Days</span>
		              </div>
		            </li>
		            <li>
		              <div>
		                <h3>10</h3>
		                <span>Hours</span>
		              </div>
		            </li>
		            <li>
		              <div>
		                <h3>34</h3>
		                <span>Mins</span>
		              </div>
		            </li>
		            <li>
		              <div>
		                <h3>60</h3>
		                <span>Secs</span>
		              </div>
		            </li>
		          </ul>
		          <h2 className="text-uppercase">hot deal this week</h2>
		          <p>FLAT 30% OFF ON New Collection</p>
		          <a className="primary-btn cta-btn" href="#">Shop now</a>
		        </div>
		      </div>
		    </div>
		    {/* /row */}
		  </div>
		  {/* /container */}
		</div>
  </>
  )
}

export default Home;