import { useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
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
    
    
    return (
        !isMobile ?
            <div className="menuContainer">
                {items.map((item, index) =>
                    <Link to={item.url} onClick={() => setSelected(index)}>
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