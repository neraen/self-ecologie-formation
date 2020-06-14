import axios from "axios";
import {INVOICES_API} from "../config";

function findAll(){
    return  axios.get(INVOICES_API)
        .then(response => response.data['hydra:member']);
}

function find(id) {
    return axios.get(INVOICES_API + "/" + id).then(response => response.data);
}


function deleteInvoices(id){
    return axios.delete(INVOICES_API + "/" + id)
}

function createInvoice(invoice) {
    return axios.post(INVOICES_API, {...invoice, customer: `/api/clients/${invoice.customer}`});
}

function editInvoice(id, invoice) {
    return axios.put(INVOICES_API + "/" + id, {...invoice, customer: `/api/clients/${invoice.customer}`});
}

export default {
    findAll,
    find,
    createInvoice,
    editInvoice,
    delete: deleteInvoices
}