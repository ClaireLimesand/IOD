import React from "react";
import { useSelector } from "react-redux";
import SelectedPortfolioItem from "../SelectedPortfolioItem/SelectedPortfolioItem";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function SelectedStudentPortfolio() {
    const portfolio = useSelector((store) => store.portfolio);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch({
            type: 'FETCH_SELECTED_PORTFOLIO',
            payload: params.id
        });
    }, [])

    return (
        <div className="container">
            <h1>Portfolio</h1>

            {Object.keys(portfolio).map((internship_id) => {
                return (
                    <SelectedPortfolioItem
                        key={internship_id}
                        projects={portfolio[internship_id]}
                    />
                );
            })}
        </div>
    );
}

export default SelectedStudentPortfolio;
