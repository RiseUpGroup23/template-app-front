import hexToRgb from "../../modules/hexToRgb";
import { useConfig } from "../../context/AdminContext";
import "./Admin.css"
import AdminModule from "../../components/AdminComps/AdminModule";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Alert } from "@mui/material";

const Admin = () => {
    const { config, isAuthenticated, login, alert } = useConfig()
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")

    if (!config) return (<></>)
    return (

        !isAuthenticated ?
            <AdminModule />
            :
            <div className="appContainer" style={{ background: `linear-gradient(90deg, ${hexToRgb(config.customization.secondary.text, .5)} 31%, ${hexToRgb(config.customization.secondary.text, .0)} 100%), url(${config.customization.background.backgroundImage}) lightgray 50% / cover no-repeat` }}>
                < div className="adminLoginContainer" >
                    <div className="adminLoginBox">
                        <div className="imageLoginBox" style={{ background: `${hexToRgb(config.customization.primary.color)}` }}>
                            <img src={config.customization.logo.primary} alt="logoAdminBox" />
                        </div>
                        <span>Debes iniciar sesión para acceder al administrador</span>
                        <form
                            className="formLoginBox"
                            onSubmit={(e) => {
                                e.preventDefault()
                                login(user, pass)
                            }}>
                            <div className="textInModal">
                                <span>Usuario: </span>
                                <input type='text' value={user} onChange={(e) => setUser(e.target.value)} />
                            </div><div className="textInModal">
                                <span>Contraseña: </span>
                                <input type='password' value={pass} onChange={(e) => setPass(e.target.value)} />
                            </div>
                            <button type="submit" className="actionbutton">
                                Acceder
                            </button>
                        </form>
                        <Link className="backToHome" to={"/"}>
                            Volver al inicio
                        </Link>
                    </div>
                </div >

                {alert && alert.type !== "hidden" && <Alert className="alertBox" severity={alert.type}>
                    {alert.msg}
                </Alert>}
            </div >


    )
}

export default Admin
