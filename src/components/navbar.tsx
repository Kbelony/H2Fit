import Logotext from "../assets/img/Logo-text.svg";

const Navbar = () => {
  return (
    <div className="navbar-component mb-4">
      <div className="desktop-part">
        <img className="mt-9 ml-9 w-28" src={Logotext} alt="" />
      </div>
      <div className="mobile-part">
        <img className="mt-6 ml-5 w-24" src={Logotext} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
