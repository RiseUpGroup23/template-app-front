import EditIcon from '@mui/icons-material/Edit';

interface Props {
    id: string;
    customTrigger?: JSX.Element;
}

const EditAppointment = ({ id, customTrigger }: Props) => {
    return (
        <div className="rowButtonAction" onClick={() => { console.log(id) }}>
            {customTrigger ??
                <EditIcon style={{ width: "37", height: "37" }} />
            }
        </div>
    )
}

export default EditAppointment