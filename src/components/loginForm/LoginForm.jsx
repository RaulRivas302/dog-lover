import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = axios({
      url: "https://frontend-take-home-service.fetch.com/auth/login",
      method: "post",
      withCredentials: true,
      headers: {
        "fetch-api-key":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
        "content-type": "application/json",
      },
      data: JSON.stringify({ email, name }),
    })
      .then((response) => {
        const data = response;
        if (response) {
           localStorage.setItem('isLogin', 'true')
          toast.success(`Welcome! ${name}`);
          setTimeout(() => {
            navigate("/searchpage");
          }, 1000);
        }
      })
      .catch(function (error) {
        toast.error(`Oops! ${error}`);
      });
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="form2Example27"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="form-control form-control-lg"
          />
          <label className="form-label" htmlFor="form2Example27">
            Name
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="email"
            id="form2Example17"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control form-control-lg"
          />
          <label className="form-label" htmlFor="form2Example17">
            Email address
          </label>
        </div>

        <div className="pt-1 mb-4">
          <button className="btn btn-danger btn-lg btn-block" type="submit">
            Login
          </button>
        </div>
      </form>
    </>
  );
}
