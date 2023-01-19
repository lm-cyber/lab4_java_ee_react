import React from 'react';

import {columns} from "../data/columns";

import './hitsTableContainer.scss'
import HitsTable from "../body/HitsTable";

const HitsTableContainer = () => {
    return (
        <section className="grid-section results-table">
            <div className="table-container flex-table-parent">
                <HitsTable columns={columns} rowsPerPage={17}/>
            </div>
        </section>
    );
}

export default HitsTableContainer;