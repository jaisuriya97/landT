import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
function Home() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <h1>Home Page</h1>
        <Link to="/signup" className="btn btn-primary m-2">
          Signup
        </Link>
        <Link to="/login" className="btn btn-primary m-2">
          Login
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={ <Signup  />}
          />
          <Route
            path="/login"
            element={<Login  />}
          />
          <Route
            path="/Home"
            element={<Welcome  />}
          />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
