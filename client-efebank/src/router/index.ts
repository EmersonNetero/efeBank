import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import CreateAccount from "../views/CreateAccount.vue";
import Accounts from "../views/Accounts.vue";
import AccountDetails from "../views/AccountDetails.vue";


const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/about", name: "About", component: AboutView },
  { path: "/createAccount", name: "CreateAccount", component: CreateAccount},
  { path: "/bankAccount", name: "BankAccount", component: Accounts},
  {path: "/:bankAccount/details", name: "AccountDetails", component: AccountDetails}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
