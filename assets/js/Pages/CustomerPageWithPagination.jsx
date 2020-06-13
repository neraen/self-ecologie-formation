import React, {useEffect, useState} from "react";
import axios from "axios"
import Pagination from "../Components/Pagination";


const CustomerPageWithPagination = () => {
    const [loading, setLoading] = useState(true)
    const [customers, setCustomers] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleDelete = id => {
        const originalCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));

        axios.delete("http://localhost:8000/api/clients/" + id)
            .then(response => console.log("it's ok"))
            .catch(error => {
                setCustomers(originalCustomers);
                console.log(error.response);
            });
    }

    const handlePageChange = page => {
        setCurrentPage(page);
        setLoading(true);
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/api/clients?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
            .then(response => {
                setCustomers(response.data['hydra:member']);
                setTotalItems(response.data['hydra:totalItems']);
                setLoading(false);
            })
            .then(data => setCustomers(data))
            .catch(error => console.log(error.response));
    }, [currentPage]);



    const paginatedCustomers = Pagination.getData(customers, currentPage, itemsPerPage);

    return(
        <>
            <h1>Liste des clients (paginée) </h1>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th  className="text-center">Nb Factures</th>
                    <th  className="text-center" >Montant Total</th>
                    <th/>
                </tr>
                </thead>

                <tbody>
                {loading && (
                    <tr>
                        <td>Chargement ...</td>
                    </tr>
                )}
                {!loading && customers.map(customer =>
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.firstName} {customer.lastName}</td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center"><span className="badge badge-primary">{customer.invoices.length}</span></td>
                        <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                        <td>
                            <button
                                onClick={() => handleDelete(customer.id)}
                                disabled={customer.invoices.length > 0}
                                className="btn btn-sm btn-danger">supprimer</button>
                        </td>
                    </tr>
                )}

                </tbody>
            </table>

            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={totalItems}
                        onPageChanged={handlePageChange} />

        </>
    );
}

export default CustomerPageWithPagination;