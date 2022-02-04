import React from "react";

function PortfolioItem({threeM}, {spectrum}) {
    return (
        <div>
            <div>
                <h2>{threeM.project_name}</h2>
            </div>

            <div>
                {spectrum.project_name}
            </div>
        </div>
    )
};

export default PortfolioItem;