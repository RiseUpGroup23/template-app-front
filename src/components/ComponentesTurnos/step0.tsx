import { useConfig } from "../../context/AdminContext";

const Step0 = () => {
    const { config } = useConfig()
    if (!config) return <></>
    return (
        <div>
            {/* <h1 style={{ color: `${config.customization.primary.text}` }}>Form</h1> */}
        </div>
    )
}

export default Step0;