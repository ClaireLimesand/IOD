import React from "react";
import { useSelector } from "react-redux";
import PortfolioItem from "../PortfolioItem/PortfolioItem";

function StudentPortfolio() {

    const portfolio = useSelector(store => store.portfolio);

    return (
        <div className="container">
            {portfolio.map((data) => {
                return <PortfolioItem key={data.id} data={data}/>
            })}
        </div>
    )
};

export default StudentPortfolio;