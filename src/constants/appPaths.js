export const AppPaths = {
  dashboard: {
    home: "/",
  },
  offices: {
    all: "/offices/all",
    add: "/offices/add",
    edit: "/offices/edit/:id",
  },
  departments: {
    all: "/departments/list",
    add: "/departments/add",
    edit: "/departments/edit/:id",
  },
  site: {
    settings: "/site/settings",
    translations: "/site/translations",
  },
  users: {
    permissions: {
      all: "/users/permissions/all",
      add: "/users/permissions/add",
      addUser: "/users/permissions/add-user",
      list: "/users/permissions/list",
    },
  },
  visitors: {
    add: "/visitors/add",
    all: "/visitors/all",
    complaint: "/visitors/report",
    edit: "/visitors/edit/:id",
    view: "/visitors/view/:id",
    persona: {
      add: "/persona/add",
      all: "/persona/all",
    },
  },
  login: "/login",
  logout: "/logout",
};
