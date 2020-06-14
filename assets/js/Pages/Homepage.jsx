import React from 'react';

const HomePage = (props) => {
    return(
        <>
            <div className="top-cards">
                <div className="top-card col-3 shadow ">
                    <div className="top-card-img-container mr-3" style={{background: "url('./img/cards/card1.jpg')"}}>

                    </div>
                    <div className="top-card-text-container">
                        <h4 className="text-info">lorem ipsum</h4>
                        <p>lorem ipsim</p>
                    </div>
                </div>
                <div className="top-card col-3 shadow ">
                    <div className="top-card-img">
                        <img src="" alt="" />
                    </div>
                    <div className="top-card-text-container">
                        <h4 className="text-info">lorem ipsum</h4>
                        <p>lorem ipsim</p>
                    </div>
                </div>
                <div className="top-card col-3 shadow ">
                    <div className="top-card-img">
                        <img src="" alt="" />
                    </div>
                    <div className="top-card-text-container">
                        <h4 className="text-info">lorem ipsum</h4>
                        <p>lorem ipsim</p>
                    </div>
                </div>
            </div>
            <div className="jumbotron">
                <h1 className="display-3">Self écologie, pour une écologie de soi</h1>
                <p className="lead">LA FORMATION DE LA NATUROPATHIE ECOLOGIQUE</p>
                <hr className="my-4" />
                    <p>Découvrez notre formation en ligne !</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="#" role="button">En savoir +</a>
                    </p>
            </div>
        </>
    );
}

export default HomePage;