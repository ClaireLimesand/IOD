import React from "react";

function PortfolioItem({data}) {
    return (
        <div>
            <div>
                <h2>{data[0].project_name}</h2>
            </div>
        </div>
    )
};

export default PortfolioItem;