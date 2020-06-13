import React, {useState, useEffect} from 'react';
import Field from "../Components/forms/Field";
import {Link} from "react-router-dom";
import CustomerAPI from "../Services/customersAPI"
import {toast} from "react-toastify";

const CustomerEditPage = ({match, history}) => {

    const { id = "new" } = match.params;

    const [editing, setEditing] = useState(false);

    const fetchCustomer = async id => {
        try{
            const { firstName, lastName, email, company } = await CustomerAPI.find(id)
            setCustomer({ firstName, lastName, email, company });
        }catch (e) {
            history.replace("/customers");
        }
    }
    useEffect(() => {
        if(id !== "new"){
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id]);

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [errors, setErrors] =useState({
        lastName: "Le nom est obligatoire",
        firstName: "",
        email: "",
        company: ""
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try{
            if(editing){
                await CustomerAPI.editCustomer(id, customer);
                toast.success("Le client à bien été modifié")
                history.replace("/customers");
            }else{
                await CustomerAPI.createCustomer(customer);
                toast.success("Le client à bien été créé")
                history.replace("/customers");
            }
            setErrors({});
        }catch({response}){
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
        }
    }

    return (
        <>
            {editing && <h1>Edition d'un client</h1> || <h1>Création d'un client</h1>}
            <form onSubmit={handleSubmit}>
                <Field name="lastName" label="Nom de famille" placeholder="Nom de famille du client" onChange={handleChange} error={errors.lastName} value={customer.lastName}/>
                <Field name="firstName" label="Prénom" placeholder="Prénom du client" onChange={handleChange} error={errors.firstName} value={customer.firstName}/>
                <Field name="email" label="Email" placeholder="Email du client" type="email" onChange={handleChange} error={errors.email} value={customer.email}/>
                <Field name="company" label="Entreprise" placeholder="Entreprise du client" onChange={handleChange} error={errors.company} value={customer.company}/>

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
                </div>
            </form>
        </>
    )
}

export default CustomerEditPage;