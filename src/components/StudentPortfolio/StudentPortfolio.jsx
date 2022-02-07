import React from "react";
import { useSelector } from "react-redux";
import PortfolioItem from "../PortfolioItem/PortfolioItem";

function StudentPortfolio() {

    const portfolio = useSelector(store => store.portfolio);

    return (
        <div className="container">
            {Object.keys(portfolio).map((data) => {
                return <PortfolioItem key={data.id} data={portfolio[data]}/>
            })}
        </div>
    )
};

export default StudentPortfolio;