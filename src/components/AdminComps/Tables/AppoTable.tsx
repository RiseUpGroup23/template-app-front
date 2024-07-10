import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormData } from '../../../typings/FormData';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useConfig } from '../../../context/AdminContext';
import { Chip, CircularProgress, FormControl, IconButton, InputBase, Stack, Switch, TablePagination } from '@mui/material';
import sortByDate from '../utils/sortByDate';
import DeleteModal from '../Buttons/DeleteModal';
import EditAppointment from '../Buttons/EditAppointment';
import SearchIcon from '@mui/icons-material/Search';

function createData(apo: FormData) {
    return {
        _id: apo._id,
        name: apo.customer.name + " " + apo.customer.lastname,
        date: new Intl.DateTimeFormat('es', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(new Date(apo.date)).slice(0, -5),
        hour: `${new Date(apo.date).getUTCHours().toString().padStart(2, "0")}:${new Date(apo.date).getUTCMinutes().toString().padStart(2, "0")}`,
        disabled: apo.disabled
    }
}

export default function BasicTable() {
    const [rows, setRows] = useState<any[]>([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchValue, setSearchValue] = useState("")
    const [seeDisabled, setSeeDisabled] = useState(true)
    const [loading, setLoading] = useState(true)
    const { dbUrl, cancelAppointment } = useConfig()


    const fetchData = () => {
        axios(`${dbUrl}/appointments/`).then((res) => {
            setRows(sortByDate(res.data).map((e: FormData) => createData(e)))
        }).then(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchData()
        //eslint-disable-next-line
    }, [])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = React.useMemo(
        () => {
            const startIndex = page * rowsPerPage;
            const endIndex = startIndex + rowsPerPage;
            return rows.filter((e) => seeDisabled || !e.disabled).slice(startIndex, endIndex);
        },
        [page, rowsPerPage, rows, seeDisabled]
    );

    const count = React.useMemo(
        () => {
            return rows.filter((e) => seeDisabled || !e.disabled).length;
        },
        [rows, seeDisabled]
    );

    const style = () => {
        return (
            <style>
                {`
                    .MuiTableContainer-root {
                        background: rgba(0, 0, 0, 0.37) !important;
                        border-radius:2.5rem;
                        margin-top:2rem;
                    }

                    .MuiTableCell-root{
                        border-color:rgba(255, 255, 255, 0.30) !important;
                    }

                    .MuiTableCell-root,
                    .MuiTablePagination-selectLabel,
                    .MuiInputBase-root,
                    .MuiTablePagination-displayedRows {
                        color: white !important;
                    }
                    .MuiSvgIcon-root path{
                        fill: white !important;
                    }
                    .Mui-disabled .MuiSvgIcon-root path{
                        fill: gray !important;
                    }
                    .MuiTablePagination-toolbar{
                        margin-right:2rem;
                    }
            `}
            </style>
        )
    }

    return (
        <TableContainer component={Paper}>
            {style()}
            <form onSubmit={(e) => {
                e.preventDefault()
                console.log("hola", searchValue);
            }}>
                <FormControl className='formFilters'>
                    <div className='searchFilters'>
                        <InputBase
                            sx={{ ml: 3, flex: 1 }}
                            placeholder="Buscar cliente..."
                            inputProps={{ 'aria-label': 'search customer' }}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <div className="canceledFilter">
                        Cancelados
                        <Stack className="switchOptions" direction="row" spacing={1} alignItems="center">
                            <span>Ocultar</span>
                            <Switch checked={seeDisabled} onChange={() => {
                                setPage(0)
                                setSeeDisabled((prev) => !prev)
                            }} />
                            <span>Mostrar</span>
                        </Stack>
                    </div>
                </FormControl>
            </form>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Cliente</TableCell>
                        <TableCell align='center'>Día</TableCell>
                        <TableCell align='center'>Hora</TableCell>
                        <TableCell align='center'>Editar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        !loading ?
                            (visibleRows.length ?
                                visibleRows.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='center' sx={{ minWidth: "150px" }}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell align='center'>{row.date}</TableCell>
                                        <TableCell align='center' >{row.hour}</TableCell>
                                        <TableCell align='center'>{row.disabled ?
                                            <Chip label="Cancelado" color="error" />
                                            :
                                            <div className='tableEdit'>
                                                <DeleteModal message="¿Desea cancelar este turno?" action={() => {
                                                    cancelAppointment(row._id).then(() => {
                                                        fetchData()
                                                    })
                                                }} />
                                                <EditAppointment id={row._id} />
                                            </div>
                                        }</TableCell>
                                    </TableRow>
                                ))
                                :
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <div className="noData">
                                            No hay turnos próximos
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                            :
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <div className="blackLayLoading">
                                        <CircularProgress size={50} sx={{ color: "white" }} />
                                    </div>
                                </TableCell>
                            </TableRow>
                    }
                </TableBody>
            </Table>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Filas por página:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
        </TableContainer >
    );
}
