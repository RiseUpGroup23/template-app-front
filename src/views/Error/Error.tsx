import { useEffect } from "react";
import "./error.css"
import { useConfig } from "../../context/AdminContext";

const Error = () => {
    const { fetchConfigFromDB } = useConfig()

    useEffect(() => {
        const myFunction = () => {
            fetchConfigFromDB()
        };

        const interval = setInterval(myFunction, 30000);

        return () => clearInterval(interval);
        //eslint-disable-next-line
    }, []);

    return (
        <div className="errorContainer">
            <span className="titleError">¡Uy! Ocurrió un problema...</span>
            <div className="contentError">
                <span>Lo ideal sería que no estés viendo este mensaje.</span>
                <span>Por lo pronto, te pedimos que seas paciente y no te desesperes, los errores pueden ocurrir.</span>
                <span>Volvé a intentarlo en unos cuantos minutos, disculpas por las molestias.</span>
            </div>
        </div>
    )
}

export default Error