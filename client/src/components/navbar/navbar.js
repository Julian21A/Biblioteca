import "./navbar.css";
import loginIcon from "../../assets/loginicon.png";
import logouticon from "../../assets/logout.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/reducer/authSlice";
import book from "../../assets/grimorio.png";

export function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { success, user } = useSelector((state) => state.auth);

  /**
   * Maneja el cierre de sesión del usuario.
   *
   * Esta función despacha la acción de cierre de sesión (logout) y luego redirige al usuario a la página de inicio.
   */
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="navbar">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navlink" to="/">
            <img
              width="40px"
              height="40px"
              className="logo-mini"
              id="logo"
              src={book}
              alt="wallpaper"
            />
            <span className="navbar-brand">Simple Book</span>
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/Book/Search"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Libros
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/Book/Search">
                      Buscar
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/Book/Add">
                      Agregar
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/Author/Search"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Autores
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/Author/Search">
                      Buscar
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/Author/Add">
                      Agregar
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link  dropdown-toggle"
                  to="/User/Search"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Usuario
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/User/Search">
                      Buscar
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/User/Add">
                      Registrar
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {!success ? (
        <NavLink className="navbar-brand" to="/Login">
          <div className="container-login">
            <h6 className="login-sec">Login</h6>
            <img
              className="icon-login"
              id="loginIcon"
              src={loginIcon}
              width="30px"
              height="30px"
              alt="Ícono de login"
            />
          </div>
        </NavLink>
      ) : (
        <div className="user-info">
          <h6 className="user-name">Hola, {user?.name}</h6>{" "}
          <img
            className="icon-logout"
            id="logoutIcon"
            src={logouticon}
            width="25px"
            height="25px"
            alt="Ícono de logout"
            onClick={handleLogout}
          />
        </div>
      )}
    </header>
  );
}

export default NavBar;
