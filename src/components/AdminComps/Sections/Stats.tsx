import React, { useEffect, useState } from 'react';
import { useConfig } from '../../../context/AdminContext';
import { BarChart } from '@mui/x-charts/BarChart';
import Divider from '@mui/material/Divider';
import { useMediaQuery } from '@mui/material';
import axios from 'axios';

const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const Stats: React.FC = () => {
    const { newConfig, dbUrl } = useConfig()
    const [monthAppos, setMonthAppos] = useState<any[]>([])
    const [data, setData] = useState<any[]>([])
    const [scale, setScale] = useState<number[]>([])
    const isMobile = useMediaQuery('(max-width:1024px)');

    useEffect(() => {
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
                const count = res.data.filter((apo: any) => new Date(apo.date).getDate() === date.getDate()).length
                result.push({
                    day: today.getDay() === date.getDay() ? "Hoy" : days[date.getDay()].slice(0, isMobile ? 3 : 9),
                    count: count
                })
            })
            const maxCount = Math.max(...result.map(item => item.count));
            const nextMultipleOfTen = Math.ceil(maxCount / 10) * 10;
            const scaleArray = Array.from({ length: nextMultipleOfTen + 1 }, (_, index) => index);
            setScale(scaleArray);
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

                    .charts .MuiBarElement-root{
                        fill: ${newConfig.customization.primary.color} !important;
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
                        { scaleType: 'linear', tickInterval: scale, valueFormatter: (value) => `${value}`, hideTooltip: true }
                    ]}
                    height={300}
                    series={[{ dataKey: 'count', label: 'Turnos' }]}
                    borderRadius={10}
                />
            </div>
            <span className="proxApo">
                Este mes
            </span>
            <div className="blackLayout">
                <div className="dataFrameCont">
                    <div className="dataFrame">
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
                    <div className="dataFrame">
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
                    <div className="dataFrame">
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
        </div>
    );
};

export default Stats;