import "./styles.css";
import ShareCalendar from "./features/calendar/ShareCalendar";
import Login from "./features/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./features/NavBar";

import { EventStoreContext } from "./store/EventDataContext";
import { PromoStoreContext } from "./store/PromoDataContext";
import Kanban from "./features/kanban_board/Kanban";

export default function App() {
  return (
    <>
      <EventStoreContext>
        <PromoStoreContext>
          <div className="App">
            <NavBar />
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/calendar" element={<ShareCalendar />} />

              <Route path="/kanban" element={<Kanban />} />
            </Routes>
          </div>
        </PromoStoreContext>
      </EventStoreContext>
    </>
  );
}
