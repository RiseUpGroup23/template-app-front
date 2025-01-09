import React from "react"
import Header from "../../components/Header/Header"
import Overlay from "../Turnos/Overlay"
import Footer from "../../components/Footer/Footer"
import { useConfig } from "../../context/AdminContext"
import "./news.css"
import { Link } from "react-router-dom"
import titleToLink from "../../modules/titleToLink"

const News = () => {
    const { config } = useConfig()

    return (
        <Overlay image={`${config?.customization.background.backgroundTurno}`}>
            <Header />
            <div className="containerStep">
                <div className="appointTitle" style={{ color: `${config?.customization.primary.text}` }}>
                    Novedades
                </div>
                <div className="newsGrid">
                    {config?.articles?.items?.map((item, index) => (
                        <div className="newCard" key={`new-${index}`}>
                            <Link to={`${titleToLink(item.title)}`}>
                                <img src={item.image} alt={item.title} />
                                <span>{item.title}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </Overlay>
    )
}

export default News