import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Movie from "../views/Movie.vue";
import Actor from "../views/Actor.vue";
import Category from "../views/Category.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/movie",
      name: "Movie",
      component: Movie,
    },
    {
      path: "/actor",
      name: "Actor",
      component: Actor,
    },
    {
      path: "/category",
      name: "Category",
      component: Category,
    },
  ],
});
export default router;
