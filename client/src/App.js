import "./styles/reset.scss";
import "./styles/media.scss";
import { BrowserRouter as Router } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Router>
        <PublicRoutes />
      </Router>
      <Toaster position="top-center" reverseOrder={true} containerClassName="toaster" />
    </div>
  );
}

export default App;
