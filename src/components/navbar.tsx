import Logo from "../assets/img/Logo.svg";

const Navbar = () => {
  return (
    <div className="nabar-component">
      <div className="desktop-part">
        <img className="mt-4 ml-4" src={Logo} alt="" />
      </div>
      <div className="mobile-part"></div>
    </div>
  );
};

export default Navbar;
