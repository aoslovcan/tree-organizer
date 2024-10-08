import { baseApi, TREES_TAG } from 'shared/api';
import { TreeNodeType } from 'entities/trees';
export const apiTrees = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTrees: build.query<Array<TreeNodeType>>({
      query: (params) => ({
        url: `/`,
        method: 'GET',
        params: params
      }),

      providesTags: [TREES_TAG]
    })
  })
});

// Correctly export the hook for the query
export const { useGetTreesQuery } = apiTrees;
