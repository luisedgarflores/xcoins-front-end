import Home from '../Home/Home'
const routes = [
    {
      path: "/home",
      component: Home,
      roles: ["ADMIN", "CLIENT"],
      name: "Home",
      shouldAppear: true,
    },
];

export const getUserRoutes = (role) => {
  if (role) return routes.filter((route) => route.roles.includes(role));
  else return [];
};
