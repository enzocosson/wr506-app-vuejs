import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Movie from "../views/Movie.vue";
import Actor from "../views/Actor.vue";
import Category from "../views/Category.vue";
import Login from "../views/Login.vue";
import Watch from "../views/Watch.vue";
import MovieInformation from "../views/MovieInformation.vue";
import CategoryInformation from "../views/CategoryInformation.vue";
import ActorInformation from "../views/ActorInformation.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: "/movie",
      name: "Movie",
      component: Movie,
      meta: { requiresAuth: true },
    },
    {
      path: "/movie-info/:id",
      name: "MovieInformation",
      component: MovieInformation,
      meta: { requiresAuth: true },
    },
    {
      path: "/category-info/:id",
      name: "CategoryInformation",
      component: CategoryInformation,
      meta: { requiresAuth: true },
    },
    {
      path: "/actor-info/:id",
      name: "ActorInformation",
      component: ActorInformation,
      meta: { requiresAuth: true },
    },
    {
      path: "/watch/:id",
      name: "Watch",
      component: Watch,
      meta: { requiresAuth: true },
    },
    {
      path: "/actor",
      name: "Actor",
      component: Actor,
      meta: { requiresAuth: true },
    },
    {
      path: "/category",
      name: "Category",
      component: Category,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.token;
    if (!token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
