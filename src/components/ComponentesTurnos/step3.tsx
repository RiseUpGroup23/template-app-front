import { useEffect, useState } from "react";
import { useConfig } from "../../context/AdminContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { CircularProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import { useAppointment } from "../../context/ApContext";
import { config } from "../../config";
import axios from "axios";
import './styleTurnos.css'
import hexToRgb from "../../modules/hexToRgb";
import { FormData } from "../../typings/FormData";

const { backendEndpoint } = config;

dayjs.locale('es');

interface Schedules {
    unavailableSchedules: string[];
    allSchedules: string[];
}

const Step3 = () => {
    const [availability, setAvailability] = useState<any>(null)
    const { date, setDate, setForm } = useAppointment()
    const thisMonth = dayjs().month() + 1;
    const nextTwoMonths = thisMonth + 2;
    const [schedules, setSchedules] = useState<Schedules | null>()
    const [clockLeft, setClockLeft] = useState<string[]>([])
    const [clockRight, setClockRight] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [gridDimension, setGridDimension] = useState(0)

    const handleDate = async (newValue: any) => {
        setLoading(true);
        let formattedDate = newValue.format("DD-MM-YYYY").split("-").join("/");
        await axios(`${backendEndpoint}/availability/${formattedDate.split("/").join("")}`).then((res) => {
            setSchedules(res.data);
            const isMorning = (hour: string) => {
                const hours = Number(hour.split(":")[0]);
                return hours < 12;
            };
            const clockL = res?.data?.allSchedules?.filter((sch: string) => isMorning(sch));
            const clockR = res?.data?.allSchedules?.filter((sch: string) => !isMorning(sch));
            setClockLeft(clockL);
            setClockRight(clockR);
            const longest = clockL.length >= clockR.length ? clockL.length : clockR.length;
            setGridDimension(longest <= 12 ? 4 : 4 + Math.ceil((longest - 12) / 3));
        });
        let parts = formattedDate.split("/");
        let date = new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
        setForm((prev: FormData) => ({
            ...prev,
            date: date
        }));
        setDate(newValue);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);

        axios(`${backendEndpoint}/availability/`).then((res) => setAvailability(res.data));
        const today = dayjs();
        handleDate(today);
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
                .clockHour
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

    return (
        availability && (
            <div className="pickersBox">
                {style()}
                <div className="appointTitle2" style={{ color: `${config.customization.primary.text}` }}>
                    Seleccione la <span>fecha</span> y la <span>hora</span>
                </div>
                <div className="pickersContainer" style={{ color: 'white' }}>
                    <div className="calendarContainer" style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}` }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                disablePast
                                value={date}
                                onChange={(newValue) => {
                                    !loading && handleDate(newValue);
                                }}
                                minDate={dayjs().date(1)}
                                maxDate={dayjs().date(1).add(nextTwoMonths, 'month').subtract(1, 'day')}
                                views={["day"]}
                                dayOfWeekFormatter={(date) => {
                                    return dayjs(date).subtract(1, "day").locale("es").format('ddd').toUpperCase().slice(0, -1);
                                }}
                                shouldDisableDate={(day) => {
                                    const dayOfWeek = day.locale('en').format('dddd').toLowerCase();
                                    const isBannedDay = availability.bans.includes(day.format('DD/MM/YYYY'));
                                    return !availability[dayOfWeek].length || isBannedDay;
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="clockContainer" style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}` }}>
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
                    </div>
                </div>
            </div>
        )
    );
}

export default Step3;


// {loading ? (
//     <div className="circularProg">{<CircularProgress size={50} sx={{ color: "black", marginTop: "50px" }} />}</div>
// ) : (
// )}