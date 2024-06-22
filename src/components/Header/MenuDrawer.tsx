import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useConfig } from '../../context/AdminContext';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function MenuDrawer() {
    const [state, setState] = useState({ right: false, turnosOpen: false });
    const [inverted, setInverted] = useState(false)
    const { config, invertColors } = useConfig()

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setState({ ...state, right: open });
    };

    useEffect(() => {
        invertColors()
        //eslint-disable-next-line
    }, [inverted])

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
                <>
                    <Link to={"/"}>
                        <ListItem key="home" disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Inicio" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={"/reprogramar"}>
                        <ListItem key="novedades" disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Cambiar turno" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    {config?.customization.twoColors && <ListItem onClick={() => setInverted(prev => !prev)} key="modo" disablePadding>
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
