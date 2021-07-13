import HomePage from "./components/HomePage";
import InitialConfigPage from "./components/InitialConfigPage";

export const PAGES = {
  HOME: 'HOME',
  INITIAL_CONFIG: 'INITIAL_CONFIG',
};

const routes = [
  {
    name: PAGES.HOME,
    "path": "/",
    component: HomePage,
  },
  {
    name: PAGES.INITIAL_CONFIG,
    "path": "/initial-config",
    component: InitialConfigPage,
  }
];

export default routes;
