import React from 'react';
import { useRoutes } from 'react-router-dom';
import { publicRoutes } from 'app/routes/publicRoutes';
export const AppRoutes = () => {
  const element = useRoutes(publicRoutes);
  return <div>{element}</div>;
};
