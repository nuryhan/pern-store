import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { Navbarr } from "./components/Navbar";
import { check } from "./http/userApi";
import { Context } from "./index";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      check()
        .then((data) => {
          user.setUser(true);
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div
        style={{ height: window.innerHeight }}
        className="d-flex align-items-center justify-content-center"
      >
        <Spinner animation={"grow"} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbarr />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
