import React, { useState, useEffect, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavBtnLink,
} from "./NavbarElements";
import { AuthContext } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const auth = useContext(AuthContext);

  const signOut = () => {
    auth.logout();
    <Redirect to={"/login"} />;
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to="/" onClick={toggleHome}>
            
            </NavLogo>

            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>

            <NavMenu>
              {auth.isLoggedIn && auth.token != null && (
                <div style={{ color: "white" }}>
                  {auth.fullName}[{auth.role}]
                </div>

                // <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                // 	<li className='nav-item'>
                // 		<span className='text-dark nav-link'>
                // 			{auth.fullName}
                // 		</span>
                // 	</li>
                // 	<button
                // 		className='btn btn-outline-danger m-2'
                // 		onClick={signOut}>
                // 		Logout
                // 	</button>
                // </ul>
              )}
              {auth.isLoggedIn && (
                <NavBtnLink
                  className="btn btn-outline-danger m-2"
                  onClick={signOut}
                >
                  Sign Out
                </NavBtnLink>
              )}
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
