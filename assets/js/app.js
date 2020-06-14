import React, {useState} from "react";
import ReactDOM from "react-dom";
import '../css/app.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar'
import Homepage from "./Pages/Homepage";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import CustomerPage from "./Pages/CustomerPage";
import InvoicesPage from "./Pages/InvoicesPage";
import LoginPage from "./Pages/LoginPage";
import authAPI from "./authApi";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import CustomerEditPage from "./Pages/CustomerEditPage";
import InvoiceEditPage from "./Pages/InvoiceEditPage";
import RegisterPage from "./Pages/RegisterPage";
import {toast, ToastContainer} from "react-toastify";

authAPI.setup();
const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());
    const NavbarWithrouter = withRouter(Navbar);
    //isAuthenticated = isAuthenticated: isAuthenticated
    const contextValue = {
        isAuthenticated,
        setIsAuthenticated
    }

    return(
        <AuthContext.Provider value={contextValue}>
            <HashRouter>
                <NavbarWithrouter/>

                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute path="/customers/:id" component={CustomerEditPage} />
                        <PrivateRoute path="/customers" component={CustomerPage} />
                        <PrivateRoute path="/invoices/:id" component={InvoiceEditPage} />
                        <PrivateRoute path="/invoices" component={InvoicesPage} />
                        <Route path="/" component={Homepage} />
                    </Switch>
                </main>
            </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
        </AuthContext.Provider>
    );
}

const  rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);