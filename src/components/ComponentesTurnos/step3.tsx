import { useEffect, useState } from "react";
import axios from "axios";
import './styleTurnos.css';

import dayjs from 'dayjs';
import hexToRgb from "../../modules/hexToRgb";
import { FormData } from "../../typings/FormData";
import { useConfig } from "../../context/AdminContext";
import { useAppointment } from "../../context/ApContext";
import { Availability } from "../../typings/Professional";

import Divider from '@mui/material/Divider';
import { CircularProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import 'dayjs/locale/es'; // Importar el idioma español para dayjs

dayjs.locale('es');

interface Props {
    setNextButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Schedules {
    unavailableSchedules: string[];
    allSchedules: string[];
}

function generateHoursArray(start: string, end: string, interval: number) {
    const result = [];
    let current = new Date(`2000-01-01T${start}`);
    const endDateTime = new Date(`2000-01-01T${end}`);

    while (current <= endDateTime) {
        const hourMinute = `${current.getHours().toString().padStart(2, '0')}:${current.getMinutes().toString().padStart(2, '0')}`;
        result.push(hourMinute);
        current.setMinutes(current.getMinutes() + interval);
    }

    return result;
}

function concatenateHours(schedule: Availability, interval: number) {
    const { initialHour, finalHour, secondInitialHour, secondFinalHour } = schedule;

    const firstRange = generateHoursArray(initialHour, finalHour, interval);
    const secondRange = generateHoursArray(secondInitialHour, secondFinalHour, interval);

    return [...firstRange, ...secondRange];
}

const Step3 = ({ setNextButtonEnabled }: Props) => {
    const { date, setDate, setForm } = useAppointment()
    const thisMonth = dayjs().month() + 1;
    const nextTwoMonths = thisMonth + 2;
    const [schedules, setSchedules] = useState<Schedules | null>()
    const [clockLeft, setClockLeft] = useState<string[]>([])
    const [clockRight, setClockRight] = useState<string[]>([])
    const [loading, setLoading] = useState({
        days: true,
        hours: true
    })
    const [gridDimension, setGridDimension] = useState(0)
    const [noWorkDays, setNoWorkDays] = useState([])
    const { dbUrl } = useConfig()
    const { form } = useAppointment()

    const handleDate = async (newValue: any, firstCharge?: boolean) => {
        setNextButtonEnabled(false)
        setLoading({
            days: firstCharge || false,
            hours: true
        });
        let formattedDate = newValue.locale('en').format("DD-MM-YYYY").split("-").join("/");
        await axios(`${dbUrl}/professionalsAndTimeAvailable/${form.professional}/${newValue.locale('en').format("MM-DD-YYYY")}`).then((res) => {
            const formattedAva = res.data.allSchedules
            setSchedules({ allSchedules: formattedAva, unavailableSchedules: res.data.unavailableSchedules });
            const isMorning = (hour: string) => {
                const hours = Number(hour.split(":")[0]);
                return hours < 12;
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
        setLoading({
            days: true,
            hours: true
        });
        axios(`${dbUrl}/professionals/${form.professional}`).then((res) => {
            const noWD: any = []
            const formattedAva: any = {}
            Object.keys(res.data.timeAvailabilities).forEach((e) => {
                if (!res.data.timeAvailabilities[e].active) {
                    noWD.push(e)
                }
                formattedAva[e] = concatenateHours(res.data.timeAvailabilities[e], res.data.appointmentInterval)
            })
            setNoWorkDays(noWD)
            const today = dayjs();
            handleDate(today, true);
        });
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

    const { config } = useConfig()
    if (!config) return <></>

    const style = () => {
        return (
            <style>
                {`
                .MuiSvgIcon-root,
                .MuiTypography-root,
                .MuiPickersDay-root,
                .MuiPickersCalendarHeader-label,
                .clockHour:not(.clockDisabled):not(.clockHourSelected)
                    {
                        color: ${config.customization.primary.text} !important; 
                    }
                    
                .MuiPickersDay-root.Mui-disabled 
                    {
                        color: gray !important; 
                    }

                .clockHourSelected,
                .MuiPickersDay-root.Mui-selected 
                {
                    background-color: #1565C0 !important;
                    color: white !important
                }
                `}
            </style>
        )
    }

    const clickNextAvailable = (retries = 0) => {
        // if (retries > 3) return
        // const nextAvailableDay = document.querySelector(".MuiPickersDay-root:not(.Mui-disabled)") as HTMLButtonElement
        // if (nextAvailableDay) {
        //     nextAvailableDay.click()
        // } else {
        //     setTimeout(() => {
        //         clickNextAvailable(retries + 1)
        //     }, 500)
        // }
    }

    return (
        <div className="pickersBox">
            {style()}
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>
                Seleccione la <span>fecha</span> y la <span>hora</span>
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
                            minDate={dayjs().date(1)}
                            maxDate={dayjs().date(1).add(nextTwoMonths, 'month').subtract(1, 'day')}
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
                                const banResult = noWorkDays.some(e => e === dayOfWeek) || isBannedDay
                                if (date === day) {
                                    clickNextAvailable()
                                }
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
                                        <div key={`ch-l-${index}`} className={"clockHour" + (schedules?.unavailableSchedules?.some((un) => un === elem) ? " clockDisabled" : "")} onClick={(e) => selectHour(e)}>
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
                                        <div key={`ch-r-${index}`} className={"clockHour" + (schedules?.unavailableSchedules?.some((un) => un === elem) ? " clockDisabled" : "")} onClick={(e) => selectHour(e)}>
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