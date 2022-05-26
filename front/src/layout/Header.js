import React from "react";
import { Dropdown, Container, Col, Row, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
function Header(props) {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="header-bar-wrapper">
        <nav className="navbar-breadcrumb col-xl-12 col-12 d-flex">
          <div className="navbar-links-wrapper">
            <Button className="menubarbtn" onClick={props.menuToggle}>
              <MdMenu />
            </Button>
          </div>

          <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
            <ul className="navbar-nav mr-lg-2">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Profile
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/changePassword"
                    >
                      Change Password
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </nav>
      </div>{" "}
    </>
  );
}

export default Header;
