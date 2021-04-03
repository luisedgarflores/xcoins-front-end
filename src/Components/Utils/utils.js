import Home from '../Home/Home'
import ShowUsers from '../Users/ShowUsers'
import UpsertUser from '../Users/UpsertUser'

const routes = [
    {
      path: "/home",
      component: Home,
      roles: ["ADMIN", "CLIENT"],
      name: "Home",
      shouldAppear: true,
    },
    {
      path: "/upsert-user",
      component: UpsertUser,
      roles: ["ADMIN"],
      name: "UpsertUser",
      shouldAppear: false,
    },
    {
      path: "/users",
      component: ShowUsers,
      roles: ["ADMIN"],
      name: "Users",
      shouldAppear: true,
    },
];

export const getUserRoutes = (role) => {
  if (role) return routes.filter((route) => route.roles.includes(role));
  else return [];
};
