import React from "react";
import { useSelector } from "react-redux";
import PortfolioItem from "../PortfolioItem/PortfolioItem";

function StudentPortfolio() {

    const portfolio = useSelector(store => store.portfolio);

    return (
        <div>
            {portfolio.map((data) => {
                return <PortfolioItem key={data.id} dataItem={data}/>
            })}
        </div>
    )
};

export default StudentPortfolio;