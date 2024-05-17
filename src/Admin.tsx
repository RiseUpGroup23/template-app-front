import { useAuth0 } from "@auth0/auth0-react";

const Admin = () => {
    const { loginWithPopup, isAuthenticated } = useAuth0();
    return (
        <div>
            Estas en el admin
            <button onClick={() => loginWithPopup()}>Log In</button>
            <h2>Estas logueado: {isAuthenticated ? "true" : "false"}</h2>
        </div>)
}

export default Admin
