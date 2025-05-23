import { useEffect, useState } from "react";
import axios from "axios";
import './styleTurnos.css';

import dayjs from 'dayjs';
import hexToRgb from "../../modules/hexToRgb";
import { FormData } from "../../typings/FormData";
import { useConfig } from "../../context/AdminContext";
import { useAppointment } from "../../context/ApContext";

import Divider from '@mui/material/Divider';
import { CircularProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import 'dayjs/locale/es'; // Importar el idioma español para dayjs
import { TimeAvailability } from "../../typings/Professional";
import { useParams } from "react-router-dom";

dayjs.locale('es');

interface Props {
    setNextButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Schedules {
    unavailableSchedules: string[];
    allSchedules: string[];
}

const Step3 = ({ setNextButtonEnabled }: Props) => {
    const { date, setDate, setForm } = useAppointment()
    const { config, professionals, dbUrl } = useConfig()
    const [schedules, setSchedules] = useState<Schedules | null>()
    const [clockLeft, setClockLeft] = useState<string[]>([])
    const [clockRight, setClockRight] = useState<string[]>([])
    const [loading, setLoading] = useState({
        days: true,
        hours: true
    })
    const [gridDimension, setGridDimension] = useState(0)
    const [noWorkDays, setNoWorkDays] = useState<any>([])
    const { form } = useAppointment()
    const dbNextMonths = config?.appointment?.nextMonths ?? 2
    const { reproId } = useParams()

    const handleDate = async (newValue: any, firstCharge?: boolean) => {
        setNextButtonEnabled(false)
        setLoading({
            days: firstCharge || false,
            hours: true
        });
        let formattedDate = newValue.locale('en').format("DD-MM-YYYY").split("-").join("/");
        await axios(`${dbUrl}/professionalsAndTimeAvailable/${form.professional}/${newValue.locale('en').format("MM-DD-YYYY")}/${form.typeOfService}`).then((res) => {
            const formattedAva = res.data.allSchedules
            setSchedules({ allSchedules: formattedAva, unavailableSchedules: res.data.unavailableSchedules });
            const isMorning = (hour: string) => {
                const hours = Number(hour.split(":")[0]);
                const day: keyof TimeAvailability = newValue.locale('en').format('dddd').toLowerCase()
                const clockDivider = professionals?.find(e => e._id === form.professional)?.timeAvailabilities[day].finalHour.split(":")[0];
                return hours <= ((!isNaN(Number(clockDivider)) && Number(clockDivider)) || 12)
            };
            const clockL = formattedAva?.filter((sch: string) => isMorning(sch));
            const clockR = formattedAva?.filter((sch: string) => !isMorning(sch));
            setClockLeft(clockL);
            setClockRight(clockR);
            const longest = clockL.length >= clockR.length ? clockL.length : clockR.length;
            setGridDimension(longest <= 12 ? 4 : 4 + Math.ceil((longest - 12) / 3));

            let parts = formattedDate.split("/");
            let date = new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
            setForm((prev: FormData) => ({
                ...prev,
                date: date
            }));
            setDate(newValue);
            setLoading({
                days: false,
                hours: false
            });
        });
    };

    useEffect(() => {
        setNextButtonEnabled(false)
        setLoading({
            days: true,
            hours: true
        });
        axios(`${dbUrl}/professionals/${form.professional}`).then((res) => {
            const noWD: any = []
            Object.keys(res.data.timeAvailabilities).forEach((e) => {
                if (!res.data.timeAvailabilities[e].active) {
                    noWD.push(e)
                }
            })
            setNoWorkDays(noWD)
            const bannedDays = config?.appointment.bannedDays
            let nextAvailable = dayjs();
            // eslint-disable-next-line
            while (bannedDays?.some(e => new Date(e.date).getUTCDate() === nextAvailable.date()) || noWD.some((e: any) => e === nextAvailable.locale("en").format('dddd').toLowerCase())) {
                nextAvailable = nextAvailable.add(1, 'day');
            }
            handleDate(nextAvailable, true);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectHour = (e: React.MouseEvent<HTMLDivElement>) => {
        const selectedHour = e.currentTarget.innerText;
        let clocks = document.querySelectorAll(".clockHour");
        for (let i = 0; i < clocks.length; i++) {
            const element = clocks[i] as HTMLDivElement;
            element.classList.remove("clockHourSelected");
        }
        e.currentTarget.classList.add("clockHourSelected");
        setForm((prev: FormData) => {
            const newHour = new Date(prev.date.setHours(Number(selectedHour.split(":")[0]), Number(selectedHour.split(":")[1])))
            return ({
                ...prev,
                date: newHour
            })
        });
        setNextButtonEnabled(true)
    };

    const isTodayAndPastTime = (hour: string) => {
        const today = dayjs();
        const selected = dayjs(date);
        const hourParts = hour.split(":");
        const selectedHour = dayjs(date).set('hour', Number(hourParts[0])).set('minute', Number(hourParts[1]));
        if (!config?.appointment.allowApposToday) {
            return today.isSame(selected, 'day')
        }
        return today.isSame(selected, 'day') && today.isAfter(selectedHour);
    }

    if (!config) return <></>

    const style = () => {
        return (
            <style>
                {`
                .pickersContainer .MuiSvgIcon-root,
                .pickersContainer .MuiTypography-root,
                .pickersContainer .MuiPickersDay-root,
                .pickersContainer .MuiPickersCalendarHeader-label,
                .clockHour:not(.clockDisabled):not(.clockHourSelected):not(.clockPast)
                    {
                        color: ${config.customization.primary.text} !important; 
                    }
                    
                .pickersContainer .MuiPickersDay-root.Mui-disabled 
                    {
                        color: gray !important; 
                    }

                .clockHourSelected,
                .pickersContainer .MuiPickersDay-root.Mui-selected 
                {
                    background-color: #1565C0 !important;
                    color: white !important
                }

                .clockLeft::-webkit-scrollbar,
                .clockRight::-webkit-scrollbar {
                    width: 5px;
                }

                .clockLeft::-webkit-scrollbar-track,
                .clockRight::-webkit-scrollbar-track {
                    background: transparent;
                }

                .clockLeft::-webkit-scrollbar-thumb,
                .clockRight::-webkit-scrollbar-thumb {
                    background: ${hexToRgb(config.customization.primary.color, 1, .25)};
                    border-radius: 5rem;
                }

                .clockLeft::-webkit-scrollbar-thumb:hover,
                .clockRight::-webkit-scrollbar-thumb:hover {
                    background: ${hexToRgb(config.customization.primary.color, 1, .5)};
                }
                
                .pickersContainer .MuiButtonBase-root.Mui-disabled svg{
                    fill:gray;
                }
                `}
            </style>
        )
    }

    return (
        <div className="pickersBox">
            {style()}
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>
                {!reproId ? "Seleccione" : "Editar"} la <span>fecha</span> y la <span>hora</span>
            </div>
            <div className="pickersContainer" style={{ color: 'white' }}>
                <div className="calendarContainer" style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}` }}>
                    {!loading.days ? <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            disablePast
                            value={date}
                            onChange={(newValue) => {
                                handleDate(newValue);
                            }}
                            minDate={dayjs()}
                            maxDate={dayjs().add(dbNextMonths + 1, 'month').subtract(dayjs().date(), "day")}
                            views={["day"]}
                            dayOfWeekFormatter={(date) => {
                                return dayjs(date).subtract(1, "day").locale("es").format('ddd').toUpperCase().slice(0, -1);
                            }}
                            shouldDisableDate={(day) => {
                                const dayOfWeek = day.locale('en').format('dddd').toLowerCase();
                                const isBannedDay = config?.appointment?.bannedDays?.some((ban) => {
                                    const banDate = new Date(ban.date)
                                    return (
                                        banDate.getDate() === day.date() &&
                                        banDate.getMonth() === day.month() &&
                                        banDate.getFullYear() === day.year()
                                    );
                                }) ?? false
                                const banResult = noWorkDays.some((e: any) => e === dayOfWeek) || isBannedDay
                                return banResult;
                            }}
                        />
                    </LocalizationProvider>
                        :
                        <div className="circularProg">{<CircularProgress size={50} sx={{ color: `${config.customization.primary.text}` }} />}</div>
                    }
                </div>
                <div className="clockContainer" style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}` }}>
                    {!loading.hours ? <>
                        <div className="clockTitle" style={{ color: `${config.customization.primary.text}` }}>Horarios disponibles</div>
                        <div className="clockDivisor">
                            {clockLeft?.length ? (
                                <div className="clockLeft" style={{ gridTemplateRows: `repeat(${gridDimension},1fr)` }}>
                                    {clockLeft?.map((elem, index) => (
                                        <div key={`ch-l-${index}`} className={`clockHour ${isTodayAndPastTime(elem) ? "clockPast" : ""}` + (schedules?.unavailableSchedules?.some((un) => un === elem) ? " clockDisabled" : "")} onClick={(e) => selectHour(e)}>
                                            {elem}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <></>
                            )}
                            {clockLeft?.length && clockRight?.length ? <Divider orientation="vertical" flexItem /> : <></>}
                            {clockRight?.length ? (
                                <div className="clockRight" style={{ gridTemplateRows: `repeat(${gridDimension},1fr)` }}>
                                    {clockRight?.map((elem, index) => (
                                        <div key={`ch-r-${index}`} className={`clockHour ${isTodayAndPastTime(elem) ? "clockPast" : ""}` + (schedules?.unavailableSchedules?.some((un) => un === elem) ? " clockDisabled" : "")} onClick={(e) => selectHour(e)}>
                                            {elem}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </>
                        :
                        <div className="circularProg">{<CircularProgress size={50} sx={{ color: `${config.customization.primary.text}` }} />}</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Step3;