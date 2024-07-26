import React from 'react'; // Importer React
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/yes2.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Dropdown } from "react-bootstrap";
import { useSelector } from 'react-redux';


function NavBar() {
  // Fonction pour cacher la barre latérale
  const hideSidebar = () => {
    const sidebar = document.querySelector('.sidebar'); // Pas de cast nécessaire pour JSX
    if (sidebar) sidebar.style.display = 'none'; // Cacher la sidebar
  };

  // Fonction pour montrer la barre latérale
  const showSidebar = () => {
    const sidebar = document.querySelector('.sidebar'); // Pas de cast nécessaire pour JSX
    if (sidebar) sidebar.style.display = 'flex'; // Montrer la sidebar
  };



  const styles = {
    loginButton: {

      fontSize: '1rem',
      color: 'white',
      backgroundColor: '#4CAF50', /* Couleur de fond du bouton */
      border: 'none',
      padding: '7px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '11px',
      marginRight: '5px'

    },
  };


  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  return (


    <nav>
      <ul className="sidebar">
        <li onClick={hideSidebar} className='close-button'>

          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>

        </li>
        <div>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </div>
        <li>
          <Link to="/" className="nav-link">Accueil</Link>
        </li>
        <li>
          <Link to="/shop" className="nav-link">Boutique</Link>
        </li>
        <li >
          {!userInfo ? (
            <Link to="/login"><button style={styles.loginButton}>Login</button></Link>
          ) : (
            <>
              <li className=" user-icon-container">
                <Dropdown>
                  <Dropdown.Toggle as="div" className="user-icon-toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                    </svg>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/Profile">Profile</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/Settings">Settings</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/Login">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </>
          )}

        </li>
      </ul>

      <ul>
        <li>
          <Link to="/" className="nav-link">
            <img src={logo} alt="Logo" />
          </Link>
        </li>
        <div className="hideOnMobile">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </div>
        <li className="hideOnMobile">
          <Link to="/" className="nav-link">Accueil</Link>
        </li>
        <li className="hideOnMobile">
          <Link to="/shop" className="nav-link">Boutique</Link>
        </li>

        <li className="hideOnMobile" >
          {!userInfo ? (
            <Link to="/login"><button style={styles.loginButton}>Login</button></Link>
          ) : (
            <>
              <li className="hideOnMobile user-icon-container">
                <Dropdown>
                  <Dropdown.Toggle as="div" className="user-icon-toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                    </svg>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/Profile">Profile</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/Settings">Settings</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/Login">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </>
          )}
        </li>

        <li className="menu-button" onClick={showSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
