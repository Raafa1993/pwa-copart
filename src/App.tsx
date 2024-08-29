import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { WellcomePage } from "./pages/app/wellcome";
import { TasksPage } from "./pages/app/tasks";
import { CreatePage } from "./pages/app/create";
import { EditPage } from "./pages/app/edit";

function App() {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}

const Content = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  return (
    <div
      className={transitionStage}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setDisplayLocation(location);
          setTransitionStage("fadeIn");
        }
      }}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<WellcomePage />} />
        <Route
          path="/create"
          element={<CreatePage />}
        />
        <Route
          path="/edit/:id"
          element={<EditPage />}
        />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </div>
  );
};

export default App;
