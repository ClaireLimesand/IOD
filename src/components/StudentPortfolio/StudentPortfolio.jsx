import React from "react";
import { useSelector } from "react-redux";
import PortfolioItem from "../PortfolioItem/PortfolioItem";

function StudentPortfolio() {

    const portfolio = useSelector(store => store.portfolio);

    return (
        <div className="container">
            <h1>Portfolio</h1>
            {Object.keys(portfolio).map((internship_id) => {
                return <PortfolioItem key={internship_id} projects={portfolio[internship_id]}/>
            })}
        </div>
    )
};

export default StudentPortfolio;