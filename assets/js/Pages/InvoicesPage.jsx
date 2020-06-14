import React, {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../Components/Pagination";
import moment from "moment";
import InvoicesAPI from "../InvoicesApi";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../Components/loaders/TableLoader.";

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "info",
    CANCELLED: "danger"
};

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
};

const InvoicesPage = props => {
    const [Invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;

    const handlePageChange = page => setCurrentPage(page);

    //gestion de la recherche, le (event) est destructuré en ({currentTarget})
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const handleDelete = async id => {
        const originalInvoices = [...Invoices];

        setInvoices(Invoices.filter(invoice => invoice.id !== id));

        try{
            await InvoicesAPI.delete(id);
            toast.success("La facture à bien été supprimée")
        } catch(error) {
            toast.error("Une erreur est survenue");
            setInvoices(originalInvoices);
        }
    }

    const fetchInvoices = async () => {
        try{
            const data = await InvoicesAPI.findAll();
            setInvoices(data);
            setLoading(false);
        }catch (e) {
            toast.error("Erreur lors du chargement des factures");
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    const filteredInvoices = Invoices.filter(i =>
        i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
        i.amount.toString().startsWith(search.toLowerCase()) ||
        STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    )

    //Pagination des données
    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);

    return(
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Liste des factures</h1>
                <Link className="btn btn-primary" to="invoices/new">Créer une facture</Link>
            </div>


            <div className="form-group">
                <input onChange={handleSearch} value={search} type="text" className="form-control" placeholder="rechercher"/>
            </div>

            {!loading && <table className="table table-hover">
                <thead>
                <tr>
                    <th>Numéro</th>
                    <th className="text-center">Client</th>
                    <th className="text-center">Date d'envoie</th>
                    <th>Status</th>
                    <th className="text-center">Montant</th>
                    <th></th>
                </tr>
                </thead>
                 <tbody>
                {paginatedInvoices.map(invoice =>
                    <tr key={invoice.id}>
                        <td className="text-center">{invoice.chrono}</td>
                        <td className="text-center"><Link to={"/customers/" + invoice.customer.id}>{invoice.customer.firstName} {invoice.customer.lastName}</Link></td>
                        <td className="text-center">{formatDate(invoice.sentAt)}</td>
                        <td><span className={"badge badge-"+ STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span></td>
                        <td className="text-center">{invoice.amount.toLocaleString()}</td>
                        <td>
                            <button className="btn btn-sm btn-primary mr-2">Editer</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id)}>Supprimer</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table> }
            {loading && <TableLoader/>}

            <Pagination  currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange} length={filteredInvoices.length}/>
        </>
    )
}

export default InvoicesPage;