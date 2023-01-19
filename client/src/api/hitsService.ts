import {HitResult, ListResponse} from './types/response'
import {emptyApi} from "./baseApiService";
import {Queries} from "./types/queries";
import {PagingParameters} from "../components/main/table/page/PagingParameters";

export const hitAPI = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        fetchHits: build.query<ListResponse<HitResult>, PagingParameters>({
            query: ({
                        page = 1,
                        perPage = 17,
                        sortReverse = true
                    }) => `/hits?page=${page}&per_page=${perPage}&sort_reverse=${sortReverse}`,
            providesTags: (result) =>
                result
                    ? [
                        // Provides a tag for each post in the current page,
                        // as well as the 'PARTIAL-LIST' tag.
                        ...result.data.map(({id}) => ({type: 'Hits' as const, id})),
                        {type: 'Hits', id: 'PARTIAL-LIST'},
                    ]
                    : [{type: 'Hits', id: 'PARTIAL-LIST'}],
        }),
        createHit: build.mutation<HitResult, Queries>({
            query: (post) => ({
                url: `/hits/add`,
                method: 'POST',
                body: post
            }),
            invalidatesTags: [{type: 'Hits', id: 'PARTIAL-LIST'}],
        }),
        deleteAllHits: build.mutation<void, void>({
            query: () => ({
                url: `/hits`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Hits'],
        }),
    })
})