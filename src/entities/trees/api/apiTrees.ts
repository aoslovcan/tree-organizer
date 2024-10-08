import { baseApi, TREES_TAG } from 'shared/api';
import { RequestBody, TreeNodeType } from 'entities/trees';
export const apiTrees = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTrees: build.query<Array<TreeNodeType>>({
      query: (params) => ({
        url: `/`,
        method: 'GET',
        params: params
      }),

      providesTags: [TREES_TAG]
    }),

    newTree: build.mutation<Array<TreeNodeType>, { id: string; body: RequestBody }>({
      query: ({ id, body }) => ({
        url: `/${id}/children`,
        method: 'POST',
        body
      }),

      invalidTags: [TREES_TAG]
    })
  })
});

// Correctly export the hook for the query
export const { useGetTreesQuery, useNewTreeMutation } = apiTrees;
