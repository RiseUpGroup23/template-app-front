import "./footer.css"
import { useConfig } from "../../context/AdminContext"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
    const { config } = useConfig()

    if (!config) return <></>

    return (
        <div className="footer">
            <div className="footerElements">
                <div className="firstColumn">
                    <div className="diff" style={{ background: `${config.customization.primary.color}` }}><img src={config.customization.logo.primary} alt="footerLogoImg" /></div>
                    <span>
                        {config.texts.footer}
                    </span>
                </div>

                <div className="thirdColumn" style={{ visibility: (config.contact.facebook || config.contact.instagram) ? "visible" : "hidden" }}>
                    <span className="columnTitle">Redes sociales</span>
                    <div className="socialCont">
                        {config.contact.facebook && <a href={config.contact.facebook} target="_blank" rel='noreferrer'>
                            <FacebookIcon style={{ width: "40", height: "40", color: "black" }}/>
                        </a>}
                        {config.contact.instagram && <a href={config.contact.instagram} target="_blank" rel='noreferrer'>
                            <InstagramIcon style={{ width: "40", height: "40", color: "black" }}/>
                        </a>}
                    </div>
                </div>

            </div>
            <a href="https://www.rise-up.com.ar/" className="devBy">
                Diseñado y desarrollado por
                <img src="https://www.rise-up.com.ar/LogoRiseUp/Logo.png" alt="footerLogo" />
            </a>
        </div>
    )
}

export default Footer