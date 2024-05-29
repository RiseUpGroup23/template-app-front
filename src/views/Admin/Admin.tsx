import { useAuth0 } from "@auth0/auth0-react";
import hexToRgb from "../../modules/hexToRgb";
import { useConfig } from "../../context/AdminContext";
import "./Admin.css"
import AdminModule from "../../components/AdminComps/AdminModule";

const Admin = () => {
    const { loginWithPopup, isAuthenticated } = useAuth0();
    const { config } = useConfig()
    if (!config) return (<></>)
    return (

        !isAuthenticated ? //Cambiar, esta mal
            <AdminModule />
            :
            <div className="appContainer" style={{
                height: "100vh", background: `linear-gradient(90deg, ${hexToRgb(config.customization.secondary.text, .5)
                    } 31 %, ${hexToRgb(config.customization.secondary.text, .0)} 100 %), url(${config.customization.background.backgroundImage}) lightgray 50 % / cover no-repeat`
            }}>
                < div className="adminLoginContainer" >
                    <div className="adminLoginBox">
                        <img src={config.customization.logo.primary} alt="logoAdminBox" />
                        <span>Logueate loco</span>
                        <button className="actionbutton" onClick={() => loginWithPopup()}>
                            Acceder
                        </button>
                    </div>
                </div >
            </div >


    )
}

export default Admin
