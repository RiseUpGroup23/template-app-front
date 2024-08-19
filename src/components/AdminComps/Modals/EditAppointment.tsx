import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

interface Props {
    id: string;
    customTrigger?: JSX.Element;
}

const EditAppointment = ({ id, customTrigger }: Props) => {
    return (
        <Link to={`/editar-turno/${id}`} className="rowButtonAction">
            {customTrigger ??
                <EditIcon style={{ width: "37", height: "37" }} />
            }
        </Link>
    )
}

export default EditAppointment