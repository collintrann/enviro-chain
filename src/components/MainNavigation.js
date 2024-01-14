import { Link } from "react-router-dom";

import classes from "./MainNavigation.css";

function MainNavigation() {
  return (
    <div className="nav-bar-container">
      <nav>
        <ul>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
          <li>
            <Link to="/view-profile">User Profile</Link>
          </li>
          <li>
            <Link to="/">Log Out</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MainNavigation;
