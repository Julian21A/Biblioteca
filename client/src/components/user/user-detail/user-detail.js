import "./user-detail.css";
import { useEffect, useMemo, useState } from "react";
import {
  changePassword,
  editUserDetail,
  getLoanBooks,
  returnLoanBook,
} from "../../../redux/reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/reducer/authSlice";
import Select from "react-select";
import Notification from "../../shared/notification/notification.js";
import { getBookDetail } from "../../../redux/reducer/bookSlice";
import { NavLink } from "react-router-dom";

const UserDetail = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [selectInfo, setSelectInfo] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [id, setId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { loanBooks } = useSelector((state) => state.user);

  const roleOptions = useMemo(
    () => [
      {
        value: "USER",
        label: "Usuario",
      },
      {
        value: "LIBRARIAN",
        label: "Bibliotecario",
      },
      {
        value: "ADMIN",
        label: "Administrador",
      },
    ],
    []
  );

  const validateRoleUser = user?.role === "USER";

  const dispatch = useDispatch();
  const editForm = () => {
    setIsDisabled(!isDisabled);
    if (editPassword === true) {
      isEditPassword();
    }
  };

  const isEditPassword = () => {
    setEditPassword(!editPassword);
  };

  const submit = (e) => {
    e.preventDefault();
    const newData = [{ name, email, role, documentNumber }, id];
    dispatch(editUserDetail(newData)).then(() => {
      const userData = JSON.parse(sessionStorage.getItem("revalidInfo"));
      setIsDisabled(false);
      if (editPassword === true) {
        isEditPassword();
      }
      dispatch(loginUser({ email: userData.email, password: password }));
    });
  };

  useEffect(() => {
    dispatch(getLoanBooks(user?.id));
    if (!!user) {
      const selected = roleOptions.find(
        (option) => option.value === user?.role
      );
      const userData = JSON.parse(sessionStorage.getItem("revalidInfo"));
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(selected.value);
      setSelectInfo(selected);
      setDocumentNumber(user.documentNumber || "");
      setId(user.id);
      setPassword(userData.password);
    }
  }, [user, roleOptions, dispatch]);

  const onChangePassword = () => {
    const passwordData = [{ oldPassword, newPassword }, id];
    if (newPassword !== confirmPassword) {
      setNotification({
        type: "error",
        message: "Las contraseñas no coinciden. Por favor, inténtalo de nuevo.",
      });
    } else {
      dispatch(changePassword(passwordData))
        .unwrap()
        .then((res) => {
          setPassword(newPassword);
          isEditPassword();
          setNotification({
            type: "success",
            message: "Contraseña actualizada correctamente.",
          });
        })
        .catch((error) => {
          setNotification({
            type: "error",
            message: "Error al cambiar la contraseña.",
          });
        });
    }
    clearPasswordFields();
  };

  const clearPasswordFields = () => {
    setNewPassword("");
    setOldPassword("");
    setConfirmPassword("");
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleBookDetail = (bookId) => {
    dispatch(getBookDetail(bookId));
  };

  const handleReturnLoanBook = (loanId) => {
    dispatch(returnLoanBook(loanId)).then(() => {
      dispatch(getLoanBooks(user?.id));
    });
  };

  return (
    <div className="detail-user">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
      <div className="left-side">
        <form className="book-form" onSubmit={submit}>
          <div className="form-fields user-form">
            <div>
              <div className="password-inputs">
                <h1 className="titlepage"> Información de Usuario </h1>
                <label className="formTitle">
                  Nombre Usuario:
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={!isDisabled}
                  />
                </label>

                <label className="formTitle">
                  Correo Electronico
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={!isDisabled}
                  />
                </label>

                <label className="formTitle">
                  Documento de Identidad
                  <input
                    type="number"
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    required
                    disabled={!isDisabled}
                  />
                </label>

                <label className="lable-reg">Rol</label>
                <Select
                  value={selectInfo}
                  onChange={(selectedOption) => setRole(selectedOption)}
                  options={roleOptions}
                  placeholder={role}
                  required
                  isDisabled={true}
                />
              </div>

              {isDisabled === true && editPassword === false && (
                <div className="section-btn-pw">
                  <button
                    className="btn btn-large"
                    type="button"
                    onClick={isEditPassword}
                  >
                    Cambiar contraseña
                  </button>
                </div>
              )}
              {editPassword === true && (
                <div>
                  <label className="formTitle">
                    Contraseña
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </label>

                  <label className="formTitle">
                    Nueva Contraseña
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </label>

                  <label className="formTitle">
                    Confirmar Contraseña
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </label>
                  <div className="section-btn-pw">
                    <button
                      className="btn btn-large"
                      type="button"
                      onClick={onChangePassword}
                    >
                      Guardar contraseña
                    </button>
                    <button
                      className="btn btn-large"
                      type="button"
                      onClick={isEditPassword}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {isDisabled === false ? (
              <button className="btn btn-user" type="button" onClick={editForm}>
                Editar
              </button>
            ) : (
              <div className="section-btn">
                <button className="btn btn-user" type="submit">
                  Guardar
                </button>
                {editPassword === false && (
                  <button
                    className="btn btn-user"
                    type="button"
                    onClick={editForm}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
      {validateRoleUser && !!loanBooks.length && (
        <div className="rigth-side">
          <table className="author-books-table table-loans">
            <thead>
              <tr>
                <th className="titlet">Título</th>
                <th className="titlet"></th>
              </tr>
            </thead>
            <tbody>
              {loanBooks?.map((book) => (
                <tr key={book.title}>
                  <td>
                    <NavLink
                      to={`/Book/Detail/`}
                      className="book-titles"
                      onClick={() => handleBookDetail(book.bookId)}
                    >
                      {book.title}
                    </NavLink>
                  </td>
                  <td>
                    <button
                      className="btn btn-user"
                      type="button"
                      onClick={() => handleReturnLoanBook(book.loanId)}
                    >
                      Devolver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
