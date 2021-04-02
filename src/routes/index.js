import React from "react";
import Home from "../application/Home";
import Todolist from "../application/Todolist";

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/app",
        component: Todolist,
        routes: [
          {
            path: "/:id",
            component: Todolist
          },
        ]
      },
      {
        path: "/today",
        component: Todolist
      },
      // {
      //   path: "/all",
      //   component: Todolist
      // }
    ],
  },
];
