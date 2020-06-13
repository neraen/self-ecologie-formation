import axios from "axios";
import {CUSTOMERS_API} from "../config";

function findAll(){
    return  axios.get("http://localhost:8000/api/clients")
        .then(response => response.data['hydra:member']);
}

function find(id) {
    return axios.get(CUSTOMERS_API + "/" + id).then(response => response.data);
}

function deleteCustomer(id){
    return  axios.delete(CUSTOMERS_API + "/" + id);
}

function createCustomer(customer) {
    return axios.post(CUSTOMERS_API, customer);
}

function editCustomer(id, customer) {
    return axios.put(CUSTOMERS_API + "/" + id, customer);
}

export default {
    findAll,
    createCustomer,
    editCustomer,
    find,
    delete: deleteCustomer
}