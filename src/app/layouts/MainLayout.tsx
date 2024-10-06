import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <Suspense
      fallback={<div className="grid min-h-screen place-items-center text-xl font-bold">...</div>}
    >
      <div>
        <Outlet />
      </div>
    </Suspense>
  );
};
