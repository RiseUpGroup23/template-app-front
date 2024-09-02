import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import ChecklistRtlOutlinedIcon from '@mui/icons-material/ChecklistRtlOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import "./AdminModules.css";
import DeleteModal from "./Modals/DeleteModal";
import { useConfig } from "../../context/AdminContext";

const items = [
    {
        title: "Inicio",
        url: "/admin",
        icon: <HomeIcon />
    },
    {
        title: "Personalización",
        url: "/admin/personalizacion",
        icon: <ModeEditOutlinedIcon />
    },
    {
        title: "Turnos",
        url: "/admin/turnos",
        icon: <CalendarMonthOutlinedIcon />
    },
    {
        title: "Profesionales",
        url: "/admin/profesionales",
        icon: <PersonOutlineOutlinedIcon />
    },
    {
        title: "Servicios",
        url: "/admin/servicios",
        icon: <ChecklistRtlOutlinedIcon />
    },
    {
        title: "Políticas",
        url: "/admin/politicas",
        icon: <LocalPoliceOutlinedIcon />
    },
    {
        title: "Estadísticas",
        url: "/admin/estadisticas",
        icon: <BarChartIcon />
    }
];

const GoToHome = () => {
    window.open('/', '_blank');
};

const Menu = () => {
    const isMobile = useMediaQuery('(max-width:1024px)');
    const [selected, setSelected] = useState(items.findIndex(item => item.url.includes(window.location.pathname)));
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const { logout } = useConfig();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        setSelected(items.findIndex(item => item.url.includes(window.location.pathname)));
        window.scrollTo(0, 0);
    }, [location]);

    return (
        !isMobile ?
            <div className="menuContainer">
                {items.map((item, index) =>
                    <Link to={item.url} key={index}>
                        <div className={`menuItem ${selected === index ? "itemSelected" : ""}`}>
                            <span className={`menuItem ${selected === index ? "itemSelected" : ""}`}>{item.icon}</span>
                            {item.title}
                        </div>
                    </Link>
                )}
                <div className="goHomeButton" onClick={GoToHome}>
                    <span className="goHomeText">
                        Ir a tu sitio web
                    </span>
                    <LaunchOutlinedIcon />
                </div>
                <DeleteModal
                    customTrigger={
                        <div className="logoutButton">
                            <span className="logoutText">
                                Cerrar sesión
                            </span>
                            <LogoutIcon />
                        </div>}
                    message="¿Desea cerrar la sesión?"
                    action={logout}
                />
            </div>
            :
            <div className="drawerButton">
                <button onClick={toggleDrawer(true)}><MenuIcon /></button>
                <Drawer className="adminDrawer" open={open} onClose={toggleDrawer(false)}>
                    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                        <List>
                            {items.map(({ title, url, icon }, index) => (
                                <Link to={url} key={url}>
                                    <ListItem className={`menuItem ${selected === index ? "itemSelected" : ""}`} key={title} disablePadding>
                                        <ListItemButton>
                                            <div className="menuItemContent">
                                                {icon}
                                                <ListItemText primary={title} />
                                            </div>
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                        <div className="goHomeButton" onClick={GoToHome}>
                            <span className="goHomeText">
                                Ir a tu sitio web
                            </span>
                            <LaunchOutlinedIcon />
                        </div>
                        <div className="logoutButton" onClick={() => logout()}>
                            <span className="logoutText">
                                Cerrar sesión
                            </span>
                            <LogoutIcon />
                        </div>
                    </Box>
                </Drawer>
            </div>
    );
};

export default Menu;
