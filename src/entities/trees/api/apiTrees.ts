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

      invalidatesTags: [TREES_TAG]
    }),

    addRootTree: build.mutation<Array<TreeNodeType>, { body: RequestBody }>({
      query: ({ body }) => ({
        url: `/root`,
        method: 'POST',
        body
      }),

      invalidatesTags: [TREES_TAG]
    }),

    deleteChildTree: build.mutation<Array<TreeNodeType>, { id: string; parentId: string }>({
      query: ({ id, parentId }) => ({
        url: `/${parentId}/${id}`,
        method: 'DELETE'
      }),

      invalidatesTags: [TREES_TAG]
    })
  })
});

// Correctly export the hook for the query
export const {
  useGetTreesQuery,
  useNewTreeMutation,
  useAddRootTreeMutation,
  useDeleteChildTreeMutation
} = apiTrees;
