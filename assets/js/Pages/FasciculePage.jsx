import React, {useEffect, useState} from "react";
import Pagination from "../Components/Pagination";
import FasciculeAPI from "../fasciculeApi"
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../Components/loaders/TableLoader.";


const FasciculePage = () => {
    const [fascicules, setFascicules] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;

    //gestion de la suppression d'un customers
    const handleDelete = async id => {
        const originalFascicules = [...fascicules];

        setFascicules(fascicules.filter(customer => customer.id !== id));

        try{
            await FasciculeAPI.delete(id);
            toast.success("Le fascicule a bien été supprimé")
        } catch(error) {
            setFascicules(originalFascicules);
            toast.error("La suppression du fascicule n'a pas fonctionné")
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
    const fetchFascicules = async () => {
        try{
            const data = await FasciculeAPI.findAll();
            setFascicules(data);
            setLoading(false);
        } catch(error){
            toast.error("Impossible de charger les fascicules")
        }
    }

    //Au chargement du composant, on va chercher les customers
    useEffect(() => {
        fetchFascicules()
    }, []);


    //Filtrage des customers en fonction de la recherche
    const filteredFascicules = fascicules.filter(f =>
        f.libelle.toLowerCase().includes(search.toLowerCase()) ||
        f.created_at.toLowerCase().includes(search.toLowerCase())
    )

    //Pagination des données
    const paginatedFascisule = Pagination.getData(filteredFascicules, currentPage, itemsPerPage);

    return(
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des Fascicules</h1>
                <Link to="/customers/new" className="btn btn-primary">Créer un Fascicule</Link>
            </div>

            <div className="form-group">
                <input onChange={handleSearch} value={search} type="text" className="form-control" placeholder="rechercher"/>
            </div>

            {!loading && <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Libelle</th>
                        <th>contenu</th>
                        <th>Durée</th>
                        <th  className="text-center">Difficulté</th>
                        <th  className="text-center" >Date création</th>
                        <th  className="text-center" >Date dernière modification</th>
                        <th/>
                    </tr>
                </thead>

                <tbody>
                {paginatedFascisule.map(fascicule =>
                    <tr key={fascicule.id}>
                        <td>{fascicule.id}</td>
                        <td>
                            <Link to={"/customers/" + fascicule.id}>{fascicule.libelle} </Link>
                        </td>
                        <td>{fascicule.content}</td>
                        <td>{fascicule.duree}</td>
                        <td className="text-center"><span className="badge badge-primary">{fascicule.labelle_difficulte}</span></td>
                        <td className="text-center">{fascicule.created_at} €</td>
                        <td className="text-center">{fascicule.updated_at} €</td>
                        <td>
                            <button
                                onClick={() => handleDelete(fascicule.id)}
                                //disabled={customer.invoices.length > 0}
                                className="btn btn-sm btn-danger">supprimer</button>
                        </td>
                    </tr>
                )}

                </tbody>
            </table> }
            {loading && <TableLoader/>}

            {itemsPerPage < filteredFascicules.length &&
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredFascicules.length}
                onPageChanged={handlePageChange} />
            }

        </>
    );
}

export default FasciculePage;