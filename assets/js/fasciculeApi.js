import axios from "axios";
import {FASCICULE_API} from "./config";

function findAll(){
    return axios.get(FASCICULE_API)
        .then(response => response.data['hydra:member']);
}

function find(id) {
    return axios.get(FASCICULE_API + "/" + id).then(response => response.data);
}

function deleteFascicule(id){
    return  axios.delete(FASCICULE_API + "/" + id);
}

function createFascicule(customer) {
    return axios.post(FASCICULE_API, customer);
}

function editFascicule(id, customer) {
    return axios.put(FASCICULE_API + "/" + id, customer);
}

export default {
    findAll,
    createFascicule,
    editFascicule,
    find,
    delete: deleteFascicule
}