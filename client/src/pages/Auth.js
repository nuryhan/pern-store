import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { login, registration } from "../http/userApi";
import { REGISTER_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Context } from "../index";

const Auth = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLogin = location.pathname === LOGIN_ROUTE;
  const { user } = useContext(Context);

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }

      user.setUser(user);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center "
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="mx-auto">{isLogin ? "Login" : "Register"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-4"
            placeholder="Enter your email"
          />
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4"
            type="password"
            placeholder="Enter your password"
          />
          <div className="d-flex  justify-content-between mt-4 ps-3 pe-3">
            {isLogin ? (
              <div>
                New to Shop? <NavLink to={REGISTER_ROUTE}>Register</NavLink>
              </div>
            ) : (
              <div>
                Have an account? <NavLink to={LOGIN_ROUTE}>Login</NavLink>
              </div>
            )}
            <Button onClick={click} variant={"outline-success"}>
              {isLogin ? "Login" : "Register"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
