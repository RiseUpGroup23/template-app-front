import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useConfig } from '../../context/AdminContext';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatButtons: React.FC = () => {
    const { config } = useConfig()
    const navigate = useNavigate()
    const location = useLocation();
    const shouldHideButtons = location.pathname !== "/";
    if (!config || shouldHideButtons) return <></>
    const buttonsConfig = config.customization.floatButtons;
    
    if (buttonsConfig === "Ninguno") return <></>
    return (
        <div className="float-buttons">
            {(buttonsConfig === "Todos" || buttonsConfig === "Solo turnos") && <button onClick={() => {
                navigate("/reservar")
            }} className="float-button" style={{ background: config.customization.primary.text }}>
                <EditCalendarIcon sx={{ width: "60%", height: "100%", color: config.customization.primary.color }} />
            </button>}
            {(buttonsConfig === "Todos" || buttonsConfig === "Solo Whatsapp") && <a target='blank' href={`https://wa.me/${config.contact.phone}?text=Hola ${config.customization.shopName}!`}>
                <button className="float-button wp">
                    <WhatsAppIcon sx={{ width: "60%", height: "100%", color: "white" }} />
                </button>
            </a>}
        </div>
    );
};

export default FloatButtons;