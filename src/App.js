import "./css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignWithGoogle } from "./components/SignWithGoogle";
import { MainPage } from "./Main";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignWithGoogle />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
