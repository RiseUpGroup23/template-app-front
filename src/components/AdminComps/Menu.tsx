import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
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
    },
    {
        title: "Profesionales",
        url: "/admin/profesionales"
    },
    {
        title: "Servicios",
        url: "/admin/servicios"
    }
]

const Menu = () => {
    const isMobile = useMediaQuery('(max-width:1024px)');
    const [selected, setSelected] = useState(items.findIndex(item => item.url.includes(window.location.pathname)))
    const location = useLocation();
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        setSelected(items.findIndex(item => item.url.includes(window.location.pathname)))
    }, [location])

    return (
        !isMobile ?
            <div className="menuContainer">
                {items.map((item, index) =>
                    <Link to={item.url} key={index}>
                        <div className={`menuItem ${selected === index ? "itemSelected" : ""}`}>
                            {item.title}
                        </div>
                    </Link>
                )}
            </div>
            :
            <div className="drawerButton">
                <button onClick={toggleDrawer(true)}><MenuIcon /></button>
                <Drawer className="adminDrawer" open={open} onClose={toggleDrawer(false)}>
                    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                        <List>
                            {items.map(({ title, url }, index) => (
                                <Link to={url} key={url}>
                                    <ListItem className={`menuItem ${selected === index ? "itemSelected" : ""}`} key={title} disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={title} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </div>
    )
}

export default Menu