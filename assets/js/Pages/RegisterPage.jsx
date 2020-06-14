import React, {useState} from 'react';
import Field from "../Components/forms/Field";
import {Link} from "react-router-dom";
import UsersAPI from "../Services/UsersApi";
import {toast} from "react-toastify";


const RegisterPage = ({history}) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const handleChange = ({ currentTarget }) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const apiErrors = {};
        if(user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est identique au mmot de passe original";
            setErrors(apiErrors);
            return;
        }

        try {
            await UsersAPI.register(user);
            toast.success("Vous êtes desormais inscrit(e), vous pouver vous connecter")
            history.replace('/login')
            setErrors({});
        }catch(error){
            console.log(error);
            const {violations} = error.response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
            toast.error("Il y a des erreurs dans votre formulaire !")
        }
    }

    return (
        <>
            <h1> Inscription </h1>
            <form onSubmit={handleSubmit}>
                <Field  name="firstName" label="Prénom" placeholder="Votre prénom" error={errors.firstName} value={user.firstName} onChange={handleChange}/>
                <Field  name="lastName" label="Nom" placeholder="Votre Nom" error={errors.lastName} value={user.lastName} onChange={handleChange}/>
                <Field  name="email" label="Email" type="email" placeholder="Votre email" error={errors.email} value={user.email} onChange={handleChange}/>
                <Field  name="password" label="Mot de passe" type="password" placeholder="Votre mot de passe" error={errors.password} value={user.password} onChange={handleChange}/>
                <Field  name="passwordConfirm" label="Confirmation du mot de passe" type="password" placeholder="Confirmez votre mot de passe" error={errors.passwordConfirm} value={user.passwordConfirm} onChange={handleChange}/>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Je m'inscrit</button>
                    <Link to="/login" className="btn btn-link">J'ai déjà un compte</Link>
                </div>
            </form>
        </>
    )
}

export default RegisterPage;