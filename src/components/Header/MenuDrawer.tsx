import React, { useState } from 'react';
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

export default function MenuDrawer() {
    const [state, setState] = useState({ right: false, turnosOpen: false });
    const { config } = useConfig()

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
