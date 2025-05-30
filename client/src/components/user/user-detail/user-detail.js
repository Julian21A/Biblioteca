import "./user-detail.css";
import { useEffect, useMemo, useState } from "react";
import { editUserDetail } from "../../../redux/reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/reducer/authSlice";
import Select from "react-select";

const UserDetail = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [selectInfo, setSelectInfo] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [id, setId] = useState("");
  const [newPasword, setNewPasword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasword, setConfirmPassword] = useState("");
  const [editPassword, setEditPassword] = useState(false);

  const { user } = useSelector((state) => state.auth);

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

  const dispatch = useDispatch();
  const editForm = () => {
    setIsDisabled(!isDisabled);
  };

  const isEditPassword = () => {
    setEditPassword(!editPassword);
  };

  const submit = (e) => {
    e.preventDefault();
    const newData = [{ name, email, role, documentNumber }, id];
    dispatch(editUserDetail(newData)).then(() => {
      setIsDisabled(false);
      const userData = JSON.parse(sessionStorage.getItem("revalidInfo"));
      dispatch(loginUser(userData));
    });
  };

  useEffect(() => {
    if (!!user) {
      const selected = roleOptions.find(
        (option) => option.value === user?.role
      );
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(selected.value);
      setSelectInfo(selected);
      setDocumentNumber(user.documentNumber || "");
      setId(user.id);
    }
  }, [user, roleOptions]);

  return (
    <div>
      <form className="book-form" onSubmit={submit}>
        <div className="form-fields">
          <h2> Información de Usuario </h2>
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

          {editPassword === true ? (
            <button className="btn btn-large" onClick={isEditPassword}>
              Cambiar contraseña
            </button>
          ) : (
            <div>
              <label className="formTitle">
                Contraseña
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <label className="formTitle">
                Nueva Contraseña
                <input
                  type="password"
                  value={newPasword}
                  onChange={(e) => setNewPasword(e.target.value)}
                />
              </label>

              <label className="formTitle">
                Confirmar Contraseña
                <input
                  type="pasword"
                  value={confirmPasword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              <div className="section-btn-pw">
                <button className="btn btn-large" onClick={isEditPassword}>
                  Guardar contraseña
                </button>
              </div>
            </div>
          )}

          {isDisabled === false ? (
            <button className="btn btn-user" onClick={editForm}>
              Editar
            </button>
          ) : (
            <div className="section-btn">
              <button className="btn btn-user" type="submit">
                Guardar
              </button>
              <button className="btn btn-user" onClick={editForm}>
                Cancelar
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserDetail;
