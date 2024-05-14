import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

export default function MenuDrawer() {
    const [state, setState] = useState({ right: false, turnosOpen: false });

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setState({ ...state, right: open });
    };

    const toggleTurnos = (event: React.MouseEvent) => {
        event.stopPropagation();
        setState({ ...state, turnosOpen: !state.turnosOpen });
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
                    <CloseIcon />
                </button>
            </div>
            <List>
                {window.location.pathname !== "/gestion-turnos" ?
                    <>
                        <Link to={"/"}>
                            <ListItem key="home" disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Inicio" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <ListItem key="turnos" disablePadding onClick={toggleTurnos}>
                            <ListItemButton>
                                <ListItemText primary="Turnos" />
                                {state.turnosOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </ListItemButton>
                        </ListItem>
                        <Collapse in={state.turnosOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link to={"/reservar"}>
                                    <ListItem key="solicitarTurno" disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary="Solicitar Turno" />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                                <Link to={"/reprogramar"}>
                                    <ListItem key="reprogramarTurno" disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary="Reprogramar Turno" />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                                <Link to={"/reprogramar"}>
                                    <ListItem key="cancelarTurno" disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary="Cancelar Turno" />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            </List>
                        </Collapse>
                        <Link to={"/novedades"}>
                            <ListItem key="novedades" disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Novedades" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={"/nosotros"}>
                            <ListItem key="nosotros" disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Nosotros" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </>
                    :
                    <>
                        <Link to={"/admin"}>
                            <ListItem key="admin" disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Admin" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={"/"}>
                            <ListItem key="home" disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Inicio" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </>
                }
            </List>
        </Box>
    );

    return (
        <div>
            <button onClick={toggleDrawer(true)}><MenuIcon /></button>
            <Drawer
                anchor="right"
                open={state.right}
                onClose={toggleDrawer(false)}
            >
                {list}
            </Drawer>
        </div>
    );
}
