import React, { useState, useContext} from "react";
import authAPI from "../ServicesApi/authApi";
import AuthContext from "../contexts/AuthContext";
import Field from '../Components/forms/Field';
import {toast} from "react-toastify";


const LoginPage = ({history}) => {

    const {setIsAuthenticated} = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    // Gestiopn des champs formulaire
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value})
    }

    // Gestion du submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await authAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.success("Vous êtes maintenant connecté(e)");
            history.replace("/")
        }catch (e) {
            setError("Information de connexion érronée");
            toast.error("Une erreur est survenue ! ");
        }
    }
    return (
        <>
            <h1>Connexion</h1>

            <form onSubmit={handleSubmit}>
               <Field name="username" label="Adresse email" value={credentials.username} onChange={handleChange} placeholder="Votre Adresse email" type="email" error={error}/>
               <Field name="password" type="password" label="Mot de passe" value={credentials.password} onChange={handleChange} placeholder="Votre mot de passe" />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Je me connecte
                    </button>
                </div>
            </form>
        </>
    )
}

export default LoginPage;