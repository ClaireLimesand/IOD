import React from "react";
import { useSelector } from "react-redux";
import PortfolioItem from "../PortfolioItem/PortfolioItem";

function StudentPortfolio() {

    const threeMPort = useSelector(store => store.threeM);
    const spectrumPort = useSelector(store => store.spectrum);

    const portfolio = [
        threeMPort,
        spectrumPort
    ];

    return (
        <div className="container">
            {/* {threeMPort.map((threeM) => {
                return <PortfolioItem key={threeM.id} threeM={threeM}/>
            })}
            {spectrumPort.map((spectrum) => {
                return <PortfolioItem key={spectrum.id} spectrum={spectrum}/>
            })} */}
            {portfolio.map((threeM, spectrum) => {
                return <PortfolioItem key={threeM.id, spectrum.id} threeM={threeM} spectrum={spectrum}/>
            })}
        </div>
    )
};

export default StudentPortfolio;