import React, {useEffect, useState} from "react";
import Pagination from "../Components/Pagination";
import CustomersAPI from "../customersApi"
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../Components/loaders/TableLoader.";


const CustomerPage = () => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;

    //gestion de la suppression d'un customers
    const handleDelete = async id => {
        const originalCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));

        try{
            await CustomersAPI.delete(id);
            toast.success("Le client a bien été supprimé")
        } catch(error) {
            setCustomers(originalCustomers);
            toast.error("La suppression du client n'a pas fonctionné")
        }
    }

    //Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);

    //gestion de la recherche, le (event) est destructuré en ({currentTarget})
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    // Permet d'aller récuperer les customers
    const fetchCustomers = async () => {
        try{
            const data = await CustomersAPI.findAll();
            setCustomers(data);
            setLoading(false);
        } catch(error){
            toast.error("Impossible de charger les clients")
        }
    }

    //Au chargement du composant, on va chercher les customers
    useEffect(() => {
        fetchCustomers()
    }, []);


    //Filtrage des customers en fonction de la recherche
    const filteredCustomers = customers.filter(c =>
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    )

    //Pagination des données
    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage);

    return(
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des clients</h1>
                <Link to="/customers/new" className="btn btn-primary">Créer un client</Link>
            </div>

            <div className="form-group">
                <input onChange={handleSearch} value={search} type="text" className="form-control" placeholder="rechercher"/>
            </div>

            {!loading && <table className="table table-hover">
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
                {paginatedCustomers.map(customer =>
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>
                            <Link to={"/customers/" + customer.id}>{customer.firstName} {customer.lastName}</Link>
                        </td>
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
            </table> }
            {loading && <TableLoader/>}

            {itemsPerPage < filteredCustomers.length &&
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredCustomers.length}
                onPageChanged={handlePageChange} />
            }

        </>
    );
}

export default CustomerPage;