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
import { CircularProgress, FormControl, IconButton, InputBase, TablePagination, useMediaQuery } from '@mui/material';
import sortByDate from '../utils/sortByDate';
import DeleteModal from '../Buttons/DeleteModal';
import EditAppointment from '../Buttons/EditAppointment';
import SearchIcon from '@mui/icons-material/Search';
import { TypeOfService } from '../../../typings/TypeOfServices';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { Professional } from '../../../typings/Professional';
import FilterButton from './Filters';

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
        disabled: apo.disabled,
        service: (apo?.typeOfService as TypeOfService)?.name ?? "-",
        prof: (apo.professional as Professional)?.name + " " + (apo.professional as Professional)?.lastname
    }
}

export default function BasicTable() {
    const [rows, setRows] = useState<any[]>([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchValue, setSearchValue] = useState("")
    const [filterQuery, setFilterQuery] = useState("")
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const isMobile = useMediaQuery('(max-width:1024px)');
    const { dbUrl, cancelAppointment } = useConfig()

    const searchAppos = () => {
        setLoading(true)
        axios(`${dbUrl}/appointments/search/?term=${searchValue}&${filterQuery}&page=${page+1}&rows=${rowsPerPage}`).then((res) => {
            setRows(sortByDate(res.data.appointments).map((e: FormData) => createData(e)))
            setCount(res.data.totalAppointments)
        }).then(() => {
            setLoading(false)
        }).catch(() => {
            setRows([])
            setLoading(false)
        })
    }

    useEffect(() => {
        searchAppos()
        //eslint-disable-next-line
    }, [page, filterQuery, rowsPerPage])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        text-align: center;
                        max-width: 100px;
                    }

                    .MuiTableCell-root:not(.rowCanceled),
                    .MuiTablePagination-selectLabel,
                    .MuiInputBase-root,
                    .MuiTablePagination-displayedRows {
                        color: white !important;
                    }
                    .MuiTablePagination-root .MuiSvgIcon-root path,
                    .searchFilters .MuiSvgIcon-root path{
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

    const searchBar = () => {
        return (
            <form
                className='formSearch'
                onSubmit={(e) => {
                    e.preventDefault()
                    searchAppos()
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
                    {!isMobile && <div className="canceledFilter">
                        <FilterButton
                            setFilterQuery={setFilterQuery}
                        />
                    </div>}
                </FormControl>
            </form>
        )
    }

    return (
        !isMobile ?
            <TableContainer component={Paper}>
                {style()}
                {searchBar()}
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Cliente</TableCell>
                            <TableCell align='center'>Servicio</TableCell>
                            <TableCell align='center'>Profesional</TableCell>
                            <TableCell align='center'>Día</TableCell>
                            <TableCell align='center'>Hora</TableCell>
                            <TableCell align='center'>Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !loading ?
                                (rows.length ?
                                    rows.map((row) => (
                                        <TableRow
                                            key={row._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell
                                                align='center'
                                                sx={{ minWidth: "150px" }}
                                                className={`${row.disabled ? "rowCanceled" : ""}`}
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{ minWidth: "150px" }}
                                                className={`${row.disabled ? "rowCanceled" : ""}`}
                                            >
                                                {row.service}
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{ minWidth: "150px" }}
                                                className={`${row.disabled ? "rowCanceled" : ""}`}
                                            >
                                                {row.prof}
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                className={`${row.disabled ? "rowCanceled" : ""}`}
                                            >
                                                {row.date}
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                className={`${row.disabled ? "rowCanceled" : ""}`}
                                            >
                                                {row.hour}
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                className={`${row.disabled ? "rowCanceled" : ""}`}
                                            >
                                                {row.disabled ?
                                                    <span>
                                                        Cancelado
                                                    </span>
                                                    :
                                                    <div className='tableEdit'>
                                                        <DeleteModal message="¿Desea cancelar este turno?" action={() => {
                                                            cancelAppointment(row._id).then(() => {
                                                                searchAppos()
                                                            })
                                                        }} />
                                                        <EditAppointment id={row._id} />
                                                    </div>
                                                }</TableCell>
                                        </TableRow>
                                    ))
                                    :
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <div className="noData">
                                                No hay turnos próximos
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                                :
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <div className="blackLayLoading">
                                            <CircularProgress size={50} sx={{ color: "white" }} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>

                <TablePagination
                    sx={{ visibility: count > 0 ? "visible" : "hidden" }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Filas por página:"
                    labelDisplayedRows={({ from, to, count }) => `${page + 1} de ${Math.ceil(count / rowsPerPage) > 0 ? Math.ceil(count / rowsPerPage) : 1}`}
                />
            </TableContainer >
            :
            <>
                {searchBar()}
                {!loading ?
                    <>
                        <div className="apoCards">
                            {
                                rows.length ?
                                    rows.map((row) => (
                                        <div className={`apoCard ${row.disabled ? "apoCardCanceled" : ""}`}>
                                            <div className="apoCardInfo">
                                                <span className="apoCardName">
                                                    {row.name} -
                                                </span>
                                                <span className="apoCardName">
                                                    {row.date} -
                                                </span>
                                                <span className="apoCardName">
                                                    {row.hour}
                                                </span>
                                            </div>
                                            <div className="apoCardEdit">
                                                {!row.disabled ?
                                                    <>
                                                        <DeleteModal message="¿Desea cancelar este turno?" action={() => cancelAppointment(row._id)} />
                                                        <EditAppointment id={row._id} />
                                                    </>
                                                    :
                                                    <DoNotDisturbIcon />
                                                }
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <div className="noData">
                                        No hay turnos próximos
                                    </div>
                            }

                            <div className="center">
                                <TablePagination
                                    sx={{ visibility: count > 0 ? "visible" : "hidden" }}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={count}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    labelRowsPerPage="Filas por página:"
                                    labelDisplayedRows={({ from, to, count }) => `${page + 1} de ${Math.ceil(count / rowsPerPage) > 0 ? Math.ceil(count / rowsPerPage) : 1}`}
                                />
                            </div>
                        </div>
                    </>
                    :
                    <div className="blackLayLoading">
                        <CircularProgress size={50} sx={{ color: "white" }} />
                    </div>
                }
            </>
    );
}
