import { useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";
import "./AdminModules.css"

const items = [
    {
        title: "Inicio",
        url: "/admin"
    },
    {
        title: "Personalización",
        url: "/admin/personalizacion"
    },
    {
        title: "Turnos",
        url: "/admin/turnos"
    }
]

const Menu = () => {
    const isMobile = useMediaQuery('(max-width:1024px)');
    const [selected, setSelected] = useState(items.findIndex(item => item.url.includes(window.location.pathname)))
    const location = useLocation();

    useEffect(() => {
        setSelected(items.findIndex(item => item.url.includes(window.location.pathname)))
    }, [location])
    
    return (
        !isMobile ?
            <div className="menuContainer">
                {items.map((item, index) =>
                    <Link to={item.url}>
                        <div className={`menuItem ${selected === index ? "itemSelected" : ""}`}>
                            {item.title}
                        </div>
                    </Link>
                )}
            </div>
            :
            <>
            </>
    )
}

export default Menu