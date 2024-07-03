import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import hexToRgb from '../../modules/hexToRgb';
import { useConfig } from "../../context/AdminContext";
import { Box, InputAdornment, OutlinedInput } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { useState } from 'react';
import "./reprogramar.css"

const Reprogramar = () => {
    const { config } = useConfig()
    const [enabled, setEnabled] = useState(false)
    if (!config) return <></>

    const style = () => {
        return (
            <style>
                {`
                    .inputRepro{
                        width:100%;
                        background:${config?.customization?.primary?.color};
                        border:1px solid ${config?.customization?.primary?.text};
                        color: ${config?.customization?.primary?.text};
                        border-radius:1rem;
                    }
                `}
            </style>
        )
    }

    const searchAppo = () => {

    }

    return (
        <div className="appContainer" style={{ background: `linear-gradient(90deg, ${hexToRgb(config.customization.secondary.text, .5)} 31%, ${hexToRgb(config.customization.secondary.text, .0)} 100%), url(${config.customization.background.backgroundTurno}) lightgray 50% / cover no-repeat` }}>
            <Header />
            {style()}
            <div className="containerRepro">
                <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>
                    Ingresa tu <span>número de teléfono</span>
                </div>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: "7.5rem 0" }}>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type="text"
                        className='inputRepro'
                        startAdornment={
                            <InputAdornment position="start">
                                <PhoneOutlinedIcon sx={{ color: `${config.customization.primary.text}`, width: "2.875rem", height: "2.875rem" }} />
                            </InputAdornment>
                        }
                        placeholder='Número de teléfono'
                        autoComplete='off'
                    />
                </Box>
                <div className="appointBoxButtons">
                    <button className='prev' onClick={() => { }}>
                        <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.936702 13.058C0.352378 12.4707 0.354745 11.521 0.941991 10.9366L10.5117 1.41453C11.0989 0.830209 12.0487 0.832577 12.633 1.41982C13.2173 2.00707 13.215 2.95681 12.6277 3.54114L4.12132 12.0052L12.5854 20.5116C13.1697 21.0989 13.1674 22.0486 12.5801 22.633C11.9929 23.2173 11.0431 23.2149 10.4588 22.6277L0.936702 13.058ZM2.99626 13.5024L1.99626 13.4999L2.00374 10.5L3.00374 10.5024L2.99626 13.5024Z" fill="black" fillOpacity="0.7" />
                        </svg>
                        Volver
                    </button>
                    <button className={`next ${!enabled ? 'disabled' : ''}`} style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}`, color: `${config.customization.primary.text}` }} onClick={searchAppo}>
                        Continuar
                        <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: `${config.customization.primary.text}` }}>
                            <path style={{ fill: `${config.customization.primary.text}` }} d="M12.1997 10.9393C12.783 11.5251 12.7791 12.4749 12.1909 13.0607L2.60527 22.6065C2.01705 23.1923 1.0673 23.1923 0.483951 22.6065C-0.0994026 22.0207 -0.0954575 21.071 0.492763 20.4852L9.01329 12L0.563254 3.51479C-0.0200992 2.92901 -0.0161541 1.97927 0.572066 1.39349C1.16029 0.807708 2.11003 0.807708 2.69339 1.39349L12.1997 10.9393ZM9.00623 10.5H11.1408L11.1284 13.5H8.99377L9.00623 10.5Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Reprogramar;