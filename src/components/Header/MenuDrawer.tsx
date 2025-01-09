import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useConfig } from '../../context/AdminContext';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import hexToRgb from '../../modules/hexToRgb';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

export default function MenuDrawer() {
    const [state, setState] = useState({ right: false, turnosOpen: false });
    const [inverted, setInverted] = useState((localStorage?.getItem("inverted") ?? false))
    const { config, invertColors } = useConfig()

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setState({ ...state, right: open });
    };

    const list = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <div className='drawerButtonClose'>
                <button>
                    <CloseIcon sx={{ color: `${config?.customization.primary.text}` }} />
                </button>
            </div>
            <List>
                <>
                    <Link to={"/"}>
                        <ListItem key="home" disablePadding className={`${window.location.pathname === "/" ? "drawerSelected" : ""}`}>
                            <ListItemButton>
                                <ListItemText primary="Inicio" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={"/reservar"}>
                        <ListItem key="novedades" disablePadding className={`${window.location.pathname === "/reservar" ? "drawerSelected" : ""}`}>
                            <ListItemButton>
                                <ListItemText primary="Solicitar turno" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={"/reprogramar"}>
                        <ListItem key="novedades" disablePadding className={`${window.location.pathname === "/reprogramar" ? "drawerSelected" : ""}`}>
                            <ListItemButton>
                                <ListItemText primary="Mis turnos" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    {config?.articles?.active && <Link to={"/novedades"}>
                        <ListItem key="novedades" disablePadding className={`${window.location.pathname.includes("/novedades") ? "drawerSelected" : ""}`}>
                            <ListItemButton>
                                <ListItemText primary="Novedades" />
                            </ListItemButton>
                        </ListItem>
                    </Link>}
                    {config?.customization.twoColors && <ListItem onClick={() => {
                        if (localStorage.getItem("inverted")) {
                            localStorage.removeItem("inverted")
                        } else {
                            localStorage.setItem("inverted", "true")
                        }
                        invertColors()
                        setInverted(prev => !prev)
                    }} key="modo" disablePadding>
                        <ListItemButton>
                            <ListItemText primary={inverted ? "Modo claro" : "Modo oscuro"} />
                            {inverted ? <LightModeIcon /> : <LightModeOutlinedIcon />}
                        </ListItemButton>
                    </ListItem>}
                </>
            </List>
        </Box>
    );

    return (
        <div>
            <button onClick={toggleDrawer(true)}><MenuIcon sx={{ color: `${config?.customization.primary.text}` }} /></button>
            <style>
                {`
                    .MuiDrawer-paper{
                        background:${config?.customization.primary.color};
                        padding:0 1rem;
                        border-radius: 1.5625rem 0rem 0rem 1.5625rem;
                    }
                    .MuiListItemText-primary{
                        font-family:"Barlow Condensed";
                        font-size:1.5rem;
                        color:${config?.customization.primary.text};
                    }

                    .MuiListItem-root .MuiSvgIcon-root{
                        color:${config?.customization.primary.text};
                    }

                    .drawerSelected{
                        background:${hexToRgb(config!.customization?.primary.color, 1, .15)};
                        border-radius: 0.3125rem;
                    }
                `}
            </style>
            <Drawer
                anchor="right"
                open={state.right}
                onClose={toggleDrawer(false)}
                sx={{ background: `${hexToRgb(config!.customization?.primary.text, .5, .35)}` }}
            >
                {list}
            </Drawer>
        </div >
    );
}
