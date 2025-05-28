import { useEffect, useState } from "react";
import { editUserDetail } from "../../../redux/reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";

const UserDetail = () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("") 
    const [documentNumber, setDocumentNumber] = useState("")
    const [id, setId] = useState("")
    const {user} = useSelector((state)=>state.auth)
    const [newPasword, setNewPasword] = useState ("")
    const [password, setPassword] = useState ("")
    const [confirmPasword, setConfirmPassword] = useState ("")
    const dispatch = useDispatch()
    const editForm = ()=>{setIsDisabled(!isDisabled)}
    const submit = (e)=> {
        e.preventDefault()
            const newData = {name, email, role, documentNumber}
            dispatch(editUserDetail(newData, id)).then(()=>{setIsDisabled(false)})
        
    }
    useEffect (()=>{
        if(!!user){
            setName(user.name || "")
            setEmail(user.email ||"")
            setRole(user.role || "")
            setDocumentNumber(user.documentNumber || "")
            setId(user.id)
        }
    },[user]) 
    return ( 
<div> 
<form className="book-form" onSubmit={submit}>
      <div className="form-fields">
        <h2> Información de Usuario </h2>
        <label className="formTitle">
          Nombre Usuario:
          <input
            type="text"
            value = {name}
            onChange = {(e)=>setName(e.target.value)}
            required
            disabled = {!isDisabled}
          />
        </label>

        <label className="formTitle">
          Correo Electronico
          <input
            type="email"
            value={email}
            onChange = {(e)=>setEmail(e.target.value)}
            required
            disabled = {!isDisabled}
          />
        </label>

        <label className="formTitle">
          Documento de Identidad
          <input
            type="number"
            value={documentNumber}
            onChange = {(e)=>setDocumentNumber(e.target.value)}
            required
            disabled = {!isDisabled}
          />
        </label>

          <label className="lable-reg">Rol</label>
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            disabled
          >
            <option value="USER">Usuario</option>
            <option value="LIBRARIAN">Bibliotecario</option>
            <option value="ADMIN">Administrador</option>
          </select>


         <label className="formTitle">
          Contraseña
          <input
            type="password"
            value={password}
            onChange = {(e)=>setPassword(e.target.value)}
          />
        </label>

         <label className="formTitle">
          Nueva Contraseña
          <input
            type="password"
            value={newPasword}
            onChange = {(e)=>setNewPasword(e.target.value)}
          />
        </label>

         <label className="formTitle">
          Confirmar Contraseña
          <input
            type="pasword"
            value={confirmPasword}
            onChange = {(e)=>setConfirmPassword(e.target.value)}
          />
        </label>
  

        {isDisabled==false?(<button onClick = {editForm}>Editar</button>):(<div> <button type ="submit">Guardar</button>
        <button onClick = {editForm}>Cancelar</button></div>)}
        
        
      </div>
    </form>
    </div>)}
    
    export default UserDetail