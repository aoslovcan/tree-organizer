import { useGetTreesQuery } from 'entities/trees';

export const useTreesData = () => {
  const { data } = useGetTreesQuery();

  const transformData = (data) => {
    const transform = (node) => {
      return {
        id: node.id || node._id, // Use `id` if present, otherwise fallback to `_id`
        name: node.name,
        children: node.children ? node.children.map((child) => transform(child)) : [] // Recursively transform children
      };
    };
    return data.map((item) => transform(item));
  };

  // Memoize the transformed data using useMemo
  return {
    transformedData: data && data.length ? transformData(data) : []
  };
};
