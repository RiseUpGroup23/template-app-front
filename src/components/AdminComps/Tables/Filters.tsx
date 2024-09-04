import React, { useState, MouseEvent, useEffect } from 'react';
import { Button, FormControl, Menu, MenuItem, Select, useMediaQuery, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useConfig } from '../../../context/AdminContext';
import Badge from '@mui/material/Badge';

const defaultFilters = {
    seeDisabled: "all",
    typeOfS: "all",
    profQuery: "all"
}

interface Props {
    setFilterQuery: React.Dispatch<React.SetStateAction<string>>
}

const FilterButton = ({ setFilterQuery }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [filterState, setFilterState] = useState(defaultFilters);
    const isMobile = useMediaQuery('(max-width:1024px)');

    const { seeDisabled, typeOfS, profQuery } = filterState;

    const handleFilterChange = (filterName: string, value: string) => {
        setFilterState(prevState => ({
            ...prevState,
            [filterName]: value
        }));
    };

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
            <Badge badgeContent={Object.values(filterState).filter(e => e !== "all").length} color="primary">
                {!isMobile ?
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
                    :
                    <IconButton onClick={handleClick} sx={{ p: '10px',border:"1px solid rgba(255, 255, 255, 0.30)" }}>
                        <FilterListIcon sx={{ color: "white" }} />
                    </IconButton>
                }
            </Badge>
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
                                    handleFilterChange("seeDisabled", e.target.value)
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
                                    handleFilterChange("typeOfS", e.target.value)
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
                                    handleFilterChange("profQuery", e.target.value)
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
                    <button className="clearFilters" onClick={() => setFilterState(defaultFilters)}>
                        Limpiar filtros
                    </button>
                </FormControl>
            </Menu>
        </div >
    );
};

export default FilterButton;
