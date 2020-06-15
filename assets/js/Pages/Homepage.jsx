import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import NaturePeople from '@material-ui/icons/NaturePeople';
import EcoIcon from '@material-ui/icons/Eco';
import SpaIcon from '@material-ui/icons/Spa';
import KitchenIcon from '@material-ui/icons/Kitchen';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';

const HomePage = (props) => {
    return(
        <>
            <div className="top-cards">
                <div className="top-card shadow ">
                    <div className="top-card-img-container mr-3" style={{background: "url('./img/cards/card1.jpg')"}}>

                    </div>
                    <div className="top-card-text-container mt-2">
                        <h6 className="text-info"> Être en bonne santé</h6>
                        <p>Choisir l'alimentation qui vous convient</p>
                    </div>
                </div>
                <div className="top-card shadow ">
                    <div className="top-card-img-container mr-3" style={{background: "url('./img/cards/card.jpg')"}}>

                    </div>
                    <div className="top-card-text-container mt-2">
                        <h6 className="text-warning">L'écologie ...</h6>
                        <p> ... Pour soi et pour l'environnement</p>
                    </div>
                </div>
                <div className="top-card shadow " >
                    <div className="top-card-img-container mr-3" style={{background: "url('./img/cards/card3.jpg')"}}>

                    </div>
                    <div className="top-card-text-container mt-2">
                        <h6 className="text-success">Le bien être pour soi ...</h6>
                        <p>... et pour ses proches</p>
                    </div>
                </div>
            </div>

            <h2 className="text-center">NOS MODULES DE FORMATIONS</h2>
            <div className="thematiques-container mb-5">
                <div className="row mt-5">
                    <div className="element-thematique col-4">
                        <div className="circle-icon shadow mr-3">
                            <SpaIcon style={{color: "#18BC9C"}} fontSize="large"></SpaIcon>
                        </div>
                        PHYTOTHERAPIE
                    </div>
                    <div className="element-thematique col-4">
                        <div className="circle-icon shadow mr-3">
                            <NaturePeople style={{color: "#3498DB"}} fontSize="large"></NaturePeople>
                        </div>
                        HYGIENE DE VIE
                    </div>
                    <div className="element-thematique col-4">
                        <div className="circle-icon shadow mr-3">
                            <EcoIcon style={{color: "#F39C12"}} fontSize="large"></EcoIcon>
                        </div>
                        AROMATHERAPIE
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="element-thematique col-4">
                        <div className="circle-icon shadow mr-3">
                            <LocalFloristIcon style={{color: "#F39C12"}} fontSize="large"></LocalFloristIcon>
                        </div>
                        FLEUR DE BACH
                    </div>
                    <div className="element-thematique col-4">
                        <div className="circle-icon shadow mr-3">
                            <LocalHospitalIcon style={{color: "#18BC9C"}} fontSize="large"></LocalHospitalIcon>
                        </div>
                        HYGIENE VITALE
                    </div>
                    <div className="element-thematique col-4">
                        <div className="circle-icon shadow mr-3">
                            <KitchenIcon style={{color: "#3498DB"}} fontSize="large"></KitchenIcon>
                        </div>
                        ALIMENTATION SAINE
                    </div>
                </div>
            </div>

            <section className="section-information pt-5">
                <div className="card-information col-5 shadow">
                    <LaptopChromebookIcon className="mr-3" fontSize="large"></LaptopChromebookIcon>
                    <h5 style={{color: "#18BC9C"}}>Découvrez notre blog</h5>
                </div>
                <div className="card-information col-5 shadow">
                    <MenuBookIcon className="mr-3" fontSize="large"></MenuBookIcon>
                    <h5 style={{color: "#3498DB"}}>Les tarifs de notre formation en ligne</h5>
                </div>
            </section>

            {/*<div className="jumbotron">
                <h1 className="display-3">Self écologie, pour une écologie de soi</h1>
                <p className="lead">LA FORMATION DE LA NATUROPATHIE ECOLOGIQUE</p>
                <hr className="my-4" />
                    <p>Découvrez notre formation en ligne !</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="#" role="button">En savoir +</a>
                    </p>
            </div>*/}


        </>
    );
}

export default HomePage;