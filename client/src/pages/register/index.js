import React, { useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../state/actions/userActions";
import { useHistory } from "react-router-dom";

//Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Register.scss";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = () => {
    const body = { email, username, password };

    Axios.post("http://localhost:3001/register", body)
      .then((response) => {
        console.log(response);
        dispatch(loginUser({ email, username, id: response.data.id }));
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log({ ...err });
      });
  };

  return (
    <div className="Register_Cont">
      <Row>
        <Col md={6} className="registration_section">
          <div className="section_container">
            <form onSubmit={(e) => e.preventDefault()}>
              <h2>Register</h2>

              <div className="form_desc">
                Register for OT Autos to purchase your next vehicle or sell your
                vehicle with ease.
              </div>

              <div className="input_field">
                <label htmlFor="email">Email Address</label>
                <div className="input_cont">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="input_field">
                <label htmlFor="name">Name</label>
                <div className="input_cont">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="input_field">
                <label htmlFor="password">Password</label>
                <div className="input_cont">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="register_button"
                type="submit"
                onClick={() => {
                  onSubmit();
                }}
              >
                Register
              </button>
            </form>
          </div>
        </Col>
        <Col className="info_section">
          <div className="section_container">
            <div className="company_name">
              OT <div className="name_2">Autos</div>
            </div>
            <div>Unlock the ultimate experience</div>
            <div className="company_info">
              <div>
                <span className="material-icons">done </span> Reliable Service
              </div>
              <div>
                <span className="material-icons">done</span> Excellent customer
                satisfaction
              </div>
              <div>
                <span className="material-icons">done</span> Fast buy and sell
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
