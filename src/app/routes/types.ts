export type RouteType = {
  path?: string;
  children: ({ path: string; element: JSX.Element } | { path: string; element: JSX.Element })[];
  element: JSX.Element;
};
