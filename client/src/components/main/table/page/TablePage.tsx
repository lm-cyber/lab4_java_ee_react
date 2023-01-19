import React from 'react';
import {HitResultItem} from "../body/HitsTable";
import Table from '@jetbrains/ring-ui/dist/table/table';
import {Column, SortParams} from "@jetbrains/ring-ui/dist/table/header-cell";
import Selection, {SelectionItem} from '@jetbrains/ring-ui/dist/table/selection';


interface TablePageProps {
    columns: Column<SelectionItem>[];
    data: HitResultItem[];
}

const TablePage = ({columns, data}: TablePageProps) => {
    return (
        <Table
            data={data}
            columns={columns}
            renderEmpty={() => 'No data'}
            selectable={false}
            selection={new Selection({})}
        />
    );
}

const MemoizedTablePage = React.memo(TablePage);

export default MemoizedTablePage;