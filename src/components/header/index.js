import React, { useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import LangSwitcher from "../../modules/LangSwitcher";
import { AppPaths } from "../../constants/appPaths";
import { isLoggedIn } from "../../helpers/userHelpers";
import LogoutButton from "../LogoutButton";
import { logout } from "../../api/authApi";

const ref = React.createRef();
const Header = ({ isCollapsedSideBar }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const header = ref.current;
    const placeholder = document.createElement("div");

    const updateHeaderSticky = () => {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        placeholder.style.height = `${header.offsetHeight}px`;
        header.parentNode.insertBefore(placeholder, header);
        header.classList.add("header--sticky");
      } else {
        placeholder.style.height = "0";
        if (placeholder.parentNode) {
          placeholder.parentNode.removeChild(placeholder);
        }
        header.classList.remove("header--sticky");
      }
    };

    window.addEventListener("scroll", updateHeaderSticky);
    return () => {
      window.removeEventListener("scroll", updateHeaderSticky);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate(AppPaths.login);
  };

  return (
    <div
      className={`header ${isCollapsedSideBar ? "header--full" : ""}`}
      ref={ref}
    >
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Access Store</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="me-3">
              {isLoggedIn() ? (
                <LogoutButton onClick={handleLogout} />
              ) : (
                <Link to={AppPaths.login}>Login</Link>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
          <LangSwitcher />
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
