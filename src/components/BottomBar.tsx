import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const BottomBar = () => {
  const location = useLocation();
  return (
    <div className="bottom-bar-component">
      <div className="mobile-view">
        <div className="bar px-10 py-4 w-full flex justify-between">
          <Link
            to="/home"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <div
              className={`text-white ${
                location.pathname === "/home" ? "active-1" : ""
              }`}
            >
              Home
            </div>
          </Link>
          <Link
            to="/profile"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <div
              className={`text-white ${
                location.pathname === "/profile" ? "active-2" : ""
              }`}
            >
              Profile
            </div>
          </Link>
          <Link
            to="/discover"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <div
              className={`text-white ${
                location.pathname === "/discover" ? "active-3" : ""
              }`}
            >
              Discover
            </div>
          </Link>
        </div>
      </div>
      <div className="desktop-view">Bottom</div>
    </div>
  );
};

export default BottomBar;
