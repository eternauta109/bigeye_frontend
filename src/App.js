import "./styles.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./features/NavBar";
import { EventStoreContext } from "./store/EventDataContext";
import Kanban from "./features/kanban_board/Kanban";
import Topics from "./features/topics/Topics";
import ShareCalendar from "./features/calendar/ShareCalendar";
import Login from "./features/Login";
import useEventsStore from "./store/EventDataContext";

export default function App() {
  const { user } = useEventsStore();
  return (
    <>
      <EventStoreContext>
        <div className="App">
          {user && <NavBar />}
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/calendar" element={<ShareCalendar />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/kanban" element={<Kanban />} />
          </Routes>
        </div>
      </EventStoreContext>
    </>
  );
}
