import React from "react";

function PortfolioItem({dataItem}) {
    return (
        <div>
            <div>
                <h2>{dataItem.project_name}</h2>
            </div>
        </div>
    )
};

export default PortfolioItem;