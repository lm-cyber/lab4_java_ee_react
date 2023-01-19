import React, {memo, useEffect, useState} from 'react';
import Pager from "@jetbrains/ring-ui/dist/pager/pager";
import {HitResultItem} from "../body/HitsTable";


interface PagerProps {
    dataSlice: HitResultItem[];
    dataCount: number;
    onPageChange: (page: number) => void;
    rowsPerPage: number;
}

const TablePager = ({dataSlice, dataCount, onPageChange, rowsPerPage}: PagerProps) => {
    const [page, setPage] = useState(1);

    const changePage = (page: number) => {
        setPage(page);
        onPageChange(page);
    }

    useEffect(() => {
        // console.log(`Pager effect. data slice length: ${dataSlice.length}; page: ${page}`)
        if (dataSlice.length < 1 && page !== 1) {
            changePage(page - 1);
        }
    }, [dataSlice, page]);

    return (
        <Pager
            total={dataCount}
            disablePageSizeSelector
            pageSize={rowsPerPage}
            currentPage={page}
            onPageChange={changePage}
        />
    );
}
const MemoTablePager = memo(TablePager);

export default MemoTablePager;