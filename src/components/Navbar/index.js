import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll/modules";
import Translator from "../../common/translator";

import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
  NavLinksOutside,
} from "./NavbarElements";

const Navbar = (props) => {
  const [scrollNav, setScrollNav] = useState(false);
  const location = useLocation();

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };
  let content;
  if (localStorage.getItem("loggedIn") === "true") {
    
    const role = localStorage.getItem("role");
    let menu;
    
    if (role === "admin") {
      menu =
      
        <React.Fragment>
          <NavItem>
            <NavLinksOutside to="/user" >
              Użytkownicy
            </NavLinksOutside>
          </NavItem>
          <NavItem>
            <NavLinksOutside to="/role" >
              Role
            </NavLinksOutside>
          </NavItem>
          <NavItem>
            <NavLinksOutside to="/sex" >
              Płci
            </NavLinksOutside>
          </NavItem>
          <NavItem>
            <NavLinksOutside to="/target" >
              Obiekty
            </NavLinksOutside>
          </NavItem>
          <NavItem>
            <NavLinksOutside to="/department" >
              Instytucje
            </NavLinksOutside>
          </NavItem>
          <NavItem>
            <NavLinksOutside to="/schedule" >
              Kalendarze
            </NavLinksOutside>
          </NavItem>
          <NavItem>
            <NavLinksOutside to="/report" >
              Raporty
            </NavLinksOutside>
          </NavItem>
          <NavItem>
            <NavLinksOutside to="/charts" >
              Statystyki
            </NavLinksOutside>
          </NavItem>
          <NavItem>
            <NavLinksOutside to="/change-password" >
              Zmień hasło
            </NavLinksOutside>
          </NavItem>
        </React.Fragment>;
    } else if (role === "leader") {
      menu =
        <React.Fragment>
          <NavItem>
            <NavLinksOutside to="/schedule" >
              Zarządzaj zajęciami
            </NavLinksOutside>
          </NavItem>
          <NavItem>
            <NavLinksOutside to="/charts" >
              Statystyki
            </NavLinksOutside>
          </NavItem>
          <NavItem>
            <NavLinksOutside to="/change-password" >
              Zmień hasło
            </NavLinksOutside>
          </NavItem>
        </React.Fragment>;
    } else if (role === "common") {
      menu =
        <React.Fragment>
        <NavItem>
          <NavLinksOutside to="/activity" >
            Dodaj zajęcia
          </NavLinksOutside>
        </NavItem>
        <NavItem>
            <NavLinksOutside to="/list" >
              Moje zajęcia
            </NavLinksOutside>
          </NavItem>
          <NavItem>
            <NavLinksOutside to="/change-password" >
              Zmień hasło
            </NavLinksOutside>
          </NavItem>
        </React.Fragment>;
    }
    content = <Nav scrollNav={scrollNav}>
      <NavBtn>
          <table>
            <tbody>
            <tr>
              <th>
                <a>{localStorage.getItem("userFirstName")} {localStorage.getItem("userLastName")}</a>
              </th>
            </tr>
            <tr>
              <th>
                <a>{Translator.translateRole(localStorage.getItem("role"))}</a>
              </th>
            </tr>
            </tbody>
        </table>
      </NavBtn>
      <NavbarContainer>
        <NavLogo to="/" onClick={toggleHome} sx={{ color: "#ffffff" }}>
          Fitrening
        </NavLogo>
        <NavMenu>
          {menu}
        </NavMenu>
        
        <NavBtn>
          <NavBtnLink to="/logout">Wylogowanie</NavBtnLink>
        </NavBtn>
        
      </NavbarContainer>
    </Nav>;
  } else {
    content = <Nav scrollNav={scrollNav}>
      <NavbarContainer>
        <NavLogo to="/" onClick={toggleHome}>
          Fitrening
        </NavLogo>
        <NavMenu>
          <NavItem>
            <NavLinks to="about" smooth="true" duration={2000}>
              O mnie
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="discover" smooth="true" duration={2000}>
              Czym jest Fitrening?
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="services" smooth="true" duration={2000}>
              Usługi i płatność
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="signup" smooth="true" duration={2000}>
              Zalety aplikacji
            </NavLinks>
          </NavItem>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/login">Logowanie</NavBtnLink>
        </NavBtn>
      </NavbarContainer>
    </Nav>;
  }

  return (
    <>
      {location.pathname === "/" || location.pathname === "/login" || localStorage.getItem("loggedIn") === "true" || <Navigate to="/login" />}
      {content}
      
    </>
  );
};

export default Navbar;
