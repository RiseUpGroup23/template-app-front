import React, { useState, MouseEvent, useEffect } from 'react';
import { Button, FormControl, Menu, MenuItem, Select } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useConfig } from '../../../context/AdminContext';

interface Props {
    setFilterQuery: React.Dispatch<React.SetStateAction<string>>
}

const FilterButton = ({ setFilterQuery }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [seeDisabled, setSeeDisabled] = useState("all")
    const [typeOfS, setTypeOfS] = useState("all")
    const [profQuery, setProfQuery] = useState("all")
    const { services, fetchServices, professionals, fetchProfessionals } = useConfig()

    useEffect(() => {
        !services?.length && fetchServices()
        !professionals?.length && fetchProfessionals()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        setFilterQuery(`disabled=${seeDisabled}&typeOfService=${typeOfS}&professional=${profQuery}`)
        //eslint-disable-next-line
    }, [seeDisabled, typeOfS, profQuery])

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
                                <MenuItem value={"true"}>Solo cancelados</MenuItem>
                                <MenuItem value={"false"}>Solo pendientes</MenuItem>
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
                    <MenuItem>
                        <div className="selectContainer">
                            <span className="selectText">
                                Profesional
                            </span>
                            <Select
                                labelId="disabled-option"
                                id="disabled-select"
                                value={profQuery}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setProfQuery(e.target.value)
                                }}
                                variant='outlined'
                            >
                                <MenuItem value={"all"}>Todos</MenuItem>
                                {professionals?.map((prof) =>
                                    <MenuItem key={prof._id} value={prof._id}>{prof.name} {prof?.lastname ?? ""}</MenuItem>
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
