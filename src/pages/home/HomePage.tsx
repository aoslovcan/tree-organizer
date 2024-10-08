import React, { useEffect, useState } from 'react';
import { Trees } from 'features/Trees';
import { useGetTreesQuery } from 'entities/trees';
export const HomePage = () => {
  const { data } = useGetTreesQuery();

  const transformData = (data) => {
    if (!data) return [];
    const transform = (node) => {
      // Use id if available, otherwise fall back to _id
      return {
        id: node.id || node._id, // Use `id` if present, otherwise fallback to `_id`
        name: node.name,
        children: node.children ? node.children.map((child) => transform(child)) : [] // Recursively transform children
      };
    };
    // Apply transformation to the root data
    return data.map((item) => transform(item));
  };

  const [treeData, setTreeData] = useState();
  //
  useEffect(() => {
    setTreeData(transformData(data));
  }, [data]);

  return (
    <div>
      <h1>Simple Tree View</h1>
      <Trees data={treeData} handleData={setTreeData} />
    </div>
  );
};
