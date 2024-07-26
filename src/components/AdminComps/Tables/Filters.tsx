import React, { useState, MouseEvent, useEffect } from 'react';
import { Button, FormControl, Menu, MenuItem, Select } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useConfig } from '../../../context/AdminContext';

interface Props {
    seeDisabled: string;
    setSeeDisabled: React.Dispatch<React.SetStateAction<string>>
    typeOfS: string;
    setTypeOfS: React.Dispatch<React.SetStateAction<string>>
}

const FilterButton = ({ setSeeDisabled, seeDisabled, typeOfS, setTypeOfS }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { services, fetchServices } = useConfig()

    useEffect(() => {
        !services?.length && fetchServices()
        //eslint-disable-next-line
    }, [])

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const style = () => {
        return (
            <style>
                {`
                    .selectContainer .MuiOutlinedInput-root{
                        max-height:2rem;
                    }
                    .selectContainer .MuiInputBase-input{
                        color:black!important;
                        width:150px!important;
                    }
                    .filterMenu .MuiMenuItem-root:hover{
                        background:transparent!important;
                    }
                `}
            </style>
        )
    }

    return (
        <div>
            {style()}
            <Button
                aria-controls="filter-menu"
                aria-haspopup="true"
                onClick={handleClick}
                startIcon={<FilterListIcon />}
                variant="outlined"
                color="inherit"
            >
                Filtros
            </Button>
            <Menu
                id="filter-menu"
                anchorEl={anchorEl}
                className='filterMenu'
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <FormControl variant="standard">
                    {/* Aquí puedes agregar los elementos que necesites en el menú */}
                    <MenuItem>
                        <div className="selectContainer">
                            <span className="selectText">
                                Estado
                            </span>
                            <Select
                                labelId="disabled-option"
                                id="disabled-select"
                                value={seeDisabled}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setSeeDisabled(e.target.value)
                                }}
                                variant='outlined'
                            >
                                <MenuItem value={"all"}>Todos</MenuItem>
                                <MenuItem value={"disabled"}>Solo cancelados</MenuItem>
                                <MenuItem value={"pending"}>Solo pendientes</MenuItem>
                            </Select>
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div className="selectContainer">
                            <span className="selectText">
                                Tipo de servicio
                            </span>
                            <Select
                                labelId="disabled-option"
                                id="disabled-select"
                                value={typeOfS}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setTypeOfS(e.target.value)
                                }}
                                variant='outlined'
                            >
                                <MenuItem value={"all"}>Todos</MenuItem>
                                {services?.map((serv) =>
                                    <MenuItem key={serv._id} value={serv._id}>{serv.name}</MenuItem>
                                )}
                            </Select>
                        </div>
                    </MenuItem>
                </FormControl>
            </Menu>
        </div >
    );
};

export default FilterButton;
