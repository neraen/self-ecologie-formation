import React, {useState, useEffect} from 'react';
import Field from "../Components/forms/Field";
import {Link} from "react-router-dom";
import CustomerAPI from "../ServicesApi/customersApi"
import Select from "../Components/forms/Select";
import InvoicesAPI from "../ServicesApi/InvoicesApi";
import {toast} from "react-toastify";

const InvoiceEditPage = ({match, history}) => {

    const { id = "new" } = match.params;

    const [editing, setEditing] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        if(id !== "new"){
            setEditing(true);
            fetchInvoice();
        }
    }, [id]);

    const [customers, setCustomers] = useState([]);

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    });

    const [errors, setErrors] =useState({
        amount: "",
        customer: "",
        status: ""
    });

    const fetchCustomers = async () => {
        try{
           const data = await CustomerAPI.findAll();
            setCustomers(data);
            if(!invoice.customer) setInvoice({...invoice, customer: data[0].id})
        }catch (e) {
            toast.error("impossible de charger les clients");
            history.replace("/invoices");
        }
    }
    
    const fetchInvoice = async id => {
        try{
            const { amount, status, customer } = await InvoicesAPI.find(id);
            setInvoice({amount, status, customer: customer.id});
        }catch (e) {
            toast.error("impossible de charger la facture demandée")
            history.replace('/invoices');
        }
    }

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setInvoice({...invoice, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            if (editing) {
                await InvoicesAPI.editInvoice(id, invoice);
                toast.success("La facture a bien été modifiée");
            } else {
                await InvoicesAPI.createInvoice(invoice);
                toast.success("La facture a bien été enregistrée");
                history.replace("/invoices");
            }
        } catch ({response}) {
            const { violations } = response.data;

            if (violations) {
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });

                setErrors(apiErrors);
                toast.error("Des erreurs dans votre formulaire");
            }
        }
    };

    return (
        <>
            {editing && <h1>Edition d'une facture</h1> || <h1>Création d'une facture</h1>}
            <form onSubmit={handleSubmit}>
                <Field name="amount" label="Montant" placeholder="Montant de la facture" type="number" onChange={handleChange} error={errors.amount} value={invoice.amount}/>
                <Select name="customer" label="Client" value={invoice.customer} error={errors.customer} onChange={handleChange}>
                    {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>)}
                </Select>

                <Select name="status" label="Statut" value={invoice.status} error={errors.status} onChange={handleChange}>
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/invoices" className="btn btn-link">Retour à la liste</Link>
                </div>
            </form>
        </>
    )
}

export default InvoiceEditPage;