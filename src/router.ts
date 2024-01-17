import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/index.vue";
import Portfolio from "./pages/portfolio/index.vue";
import PortfolioShow from "./pages/portfolio/show.vue";
import Contatcs from "./pages/contatcs.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: Portfolio,
    },
    {
      path: "/portfolio/:slug",
      name: "portfolio.show",
      props: true,
      component: PortfolioShow,
    },
    {
      path: "/contacts",
      name: "contatcs",
      component: Contatcs,
    },
  ],
});
export { router };
