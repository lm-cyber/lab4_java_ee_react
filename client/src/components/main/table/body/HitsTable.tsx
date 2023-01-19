import React, {useCallback} from 'react';
import {Col, Grid, Row} from '@jetbrains/ring-ui/dist/grid/grid';
import {Column} from '@jetbrains/ring-ui/dist/table/header-cell';
import {SelectionItem} from '@jetbrains/ring-ui/dist/table/selection';

import {HitResult} from "../../../../api/types/response";
import TablePage from "../page/TablePage";
import TablePager from "../pager/TablePager";
import {hitAPI} from "../../../../api/hitsService";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {setPage, setReverse} from "../../../../store/reducers/CurrentPageSlice";
import {SortParams} from "@jetbrains/ring-ui/components/table/header-cell";

export type HitResultItem = HitResult & SelectionItem

export interface HitsTableAdvancedProps {
    columns: Column<SelectionItem>[];
    rowsPerPage: number;
}

const HitsTable = ({columns, rowsPerPage}: HitsTableAdvancedProps) => {
    const {page, sortReverse} = useAppSelector(state => state.currentPageReducer);
    const {data} = hitAPI.useFetchHitsQuery({page, perPage: rowsPerPage, sortReverse});
    const pageSlice = data ? data.data as HitResultItem[] : [];
    const dispatch = useAppDispatch();

    const setCurrentPage = (page: number) => {
        console.log(`Setting page value: ${page}`)
        dispatch(setPage(page));
    }

    const onSort = useCallback((params: SortParams) => {
        if (params.column.id != "id") {
            throw new Error("Illegal colum sort id. Only is is supported");
        }
        dispatch(setReverse(!params.order));
    }, [])

    return (
        <div>
            <TablePage data={pageSlice} columns={columns}/>
            <Grid style={{marginTop: "auto"}}>
                <Row>
                    <Col>
                        <TablePager dataSlice={pageSlice} dataCount={data ? data?.total : 0}
                                    onPageChange={setCurrentPage} rowsPerPage={rowsPerPage}/>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
}

export default HitsTable;