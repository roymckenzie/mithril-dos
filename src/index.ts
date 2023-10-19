import m, { RouteDefs } from "mithril";
import './styles/App.css';
import Home from "./components/Pages/Home";
import Layout from "./components/Layout/Layout";
import Completed from "./components/Pages/Completed";
import Trashed from "./components/Pages/Trashed";

const routeDefs: RouteDefs = {
  '/to-dos': {
    render: () => {
      return m(Layout, m(Home))
    }
  },
  '/to-dos/completed': {
    render: () => {
      return m(Layout, m(Completed))
    }
  },
  '/to-dos/trashed': {
    render: () => {
      return m(Layout, m(Trashed))
    }
  }
}

m.route.prefix = '';
m.route(document.body, '/to-dos', routeDefs);
