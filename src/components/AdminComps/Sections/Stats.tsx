import React, { useEffect, useState } from 'react';
import { useConfig } from '../../../context/AdminContext';
import { BarChart } from '@mui/x-charts/BarChart';
import Divider from '@mui/material/Divider';
import { useMediaQuery } from '@mui/material';
import axios from 'axios';

const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const Stats: React.FC = () => {
    const { newConfig, dbUrl, services, fetchServices } = useConfig()
    const [monthAppos, setMonthAppos] = useState<any[]>([])
    const [data, setData] = useState<any[]>([])
    const isMobile = useMediaQuery('(max-width:1024px)');

    useEffect(() => {
        document.querySelector(".editorContainer")?.scrollTo(0, 0)
        !services?.length && fetchServices()
        axios(`${dbUrl}/appointments/month/${new Date().getFullYear()}/${(new Date().getUTCMonth() + 1).toString().padStart(2, '0')}`).then(res => {
            setMonthAppos(res.data)
            const today = new Date();
            const datesArray = []

            for (let index = 0; index < 7; index++) {
                const day = new Date(today);
                day.setDate(today.getDate() + index);
                datesArray.push(day);
            }

            const result: any[] = []

            datesArray.forEach((date) => {
                const dayAppos = res.data.filter((apo: any) => new Date(apo.date).getDate() === date.getDate())
                const countObj: any = {}
                dayAppos.forEach((apo: any) => {
                    if (countObj[apo.typeOfService]) {
                        countObj[apo.typeOfService]++
                    } else {
                        countObj[apo.typeOfService] = 1
                    }
                })
                result.push({
                    day: today.getDay() === date.getDay() ? "Hoy" : days[date.getDay()].slice(0, isMobile ? 3 : 9),
                    ...countObj
                })
            })
            setData(result)
        })
        //eslint-disable-next-line
    }, [])

    if (!newConfig) return (<></>)

    const style = () => {
        return (
            <style>
                {`
                    .charts .MuiChartsLegend-root{
                        display: none !important;
                    }
                    .charts text{
                        fill:white !important;
                    }

                    .charts .MuiChartsAxis-line,
                    .charts .MuiChartsAxis-tick{
                        stroke:white !important;
                    }

                    .MuiDivider-root{
                        border-color: rgb(120 120 120 / 50%)!important;
                    }
                    `
                }
            </style>
        )
    }

    return (
        <div className="mainContainer">
            <span className="initialTitle">¡Hola, <strong>{newConfig.customization.shopName}!</strong></span>
            <span className="proxApo">
                Carga de los próximos 7 días
            </span>
            <div className="blackLayout charts">
                {style()}
                <BarChart
                    dataset={data}
                    xAxis={[
                        { scaleType: 'band', dataKey: 'day', tickPlacement: 'middle', tickLabelPlacement: 'middle' },
                    ]}
                    yAxis={[
                        { scaleType: 'linear', valueFormatter: (value) => `${value}`, hideTooltip: true }
                    ]}
                    height={300}
                    series={services?.map((srvc) => ({ dataKey: srvc._id, label: srvc.name })) ?? []}
                    borderRadius={10}
                />
            </div>

            <span className="proxApo">
                Este mes
            </span>
            <div className="blackLayout">
                <div className="dataFrameCont">
                    <div className="dataFrame3">
                        <span className="dataText">
                            <span className="dataNumber">
                                {monthAppos.length}
                            </span>
                            <span className="dataLabel">
                                Total de turnos
                            </span>
                        </span>
                    </div>
                    <Divider orientation={`${isMobile ? "horizontal" : "vertical"}`} flexItem />
                    <div className="dataFrame3">
                        <span className="dataText">
                            <span className="dataNumber">
                                {monthAppos.filter(apo => apo.disabled).length}
                            </span>
                            <span className="dataLabel">
                                Cancelados
                            </span>
                        </span>
                    </div>
                    <Divider orientation={`${isMobile ? "horizontal" : "vertical"}`} flexItem />
                    <div className="dataFrame3">
                        <span className="dataText">
                            <span className="dataNumber">
                                {`${(monthAppos.filter(apo => apo.disabled).length / monthAppos.length * 100).toFixed(2)}%`}
                            </span>
                            <span className="dataLabel">
                                Tasa de cancelación
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <span className="proxApo">
                Servicios más demandados
            </span>
            <div className="blackLayout">
                <div className="rankingContainer">
                    {services?.sort((a, b) => {
                        return monthAppos.filter(apo => apo.typeOfService === b._id).length - monthAppos.filter(apo => apo.typeOfService === a._id).length
                    }).map((srvc, index) => {
                        const count = monthAppos.filter(apo => apo.typeOfService === srvc._id).length
                        return (
                            <>
                                <div className="rankingItem" key={srvc._id}>
                                    <span className="rankingNumber">
                                        #{services?.indexOf(srvc) + 1}
                                    </span>
                                    <img className='rankingImg' src={srvc.image} alt={srvc.name} />
                                    <div className="rankingData">
                                        <span className="rankingItemTitle">
                                            {srvc.name}
                                        </span>
                                        <span className="rankingItemCount">
                                            Turnos este mes: {count}
                                        </span>
                                    </div>
                                </div>
                                {services[index + 1] && <Divider />}
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Stats;