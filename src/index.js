import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import { EventStoreContext } from "./store/EventDataContext";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <EventStoreContext>
    <Router>
      <App />
    </Router>
  </EventStoreContext>,
);
