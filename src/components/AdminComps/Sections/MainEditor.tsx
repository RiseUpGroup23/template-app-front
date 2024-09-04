import { useConfig } from "../../../context/AdminContext"
import { Link } from "react-router-dom";
import AppoTable from "../Tables/AppoTable";
import useMediaQuery from '@mui/material/useMediaQuery';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useEffect } from "react";

export const arrowIco = (inverted = 0) => {
    return (
        <svg style={{ transform: inverted ? `rotate(${inverted}deg)` : "none" }} width="30" height="17" viewBox="0 0 30 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.4142 16.4142C15.6332 17.1953 14.3668 17.1953 13.5858 16.4142L0.857865 3.68629C0.076816 2.90524 0.0768161 1.63891 0.857865 0.857864C1.63891 0.076815 2.90524 0.0768151 3.68629 0.857864L15 12.1716L26.3137 0.857865C27.0948 0.0768161 28.3611 0.0768162 29.1421 0.857865C29.9232 1.63891 29.9232 2.90524 29.1421 3.68629L16.4142 16.4142ZM17 13L17 15L13 15L13 13L17 13Z" fill="white" fillOpacity="0.8" />
        </svg>
    )
}

const MainEditor = () => {
    const { config } = useConfig()
    const isMobile = useMediaQuery('(max-width:1024px)');

    useEffect(() => {
        document.querySelector(".editorContainer")?.scrollTo(0, 0)
    }, [])

    if (!config) return (<></>)

    return (
        <div className="mainContainer">
            <span className="initialTitle">¡Hola, <strong>{config.customization.shopName}!</strong></span>
            <span className="proxApo">
                Próximos turnos
            </span>
            <AppoTable />
            {isMobile &&
                <>
                    <div className="actionButtonsCont">
                        <div className="buttonCont">
                            <Link to={"/admin/personalizacion"}>
                                <div className="circularButton">
                                    <EditIcon style={{ color: "white" }} />
                                </div>
                            </Link>
                            <span className="circButtonTitle">Personalizar</span>
                        </div>
                        <div className="buttonCont">
                            <Link to={"/admin/turnos"}>
                                <div className="circularButton">
                                    <CalendarMonthIcon style={{ color: "white" }} />
                                </div>
                            </Link>
                            <span className="circButtonTitle">Calendario</span>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default MainEditor