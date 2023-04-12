import { useEffect } from "react";
import dogImage from "../../assets/images/dogs-cover.jpg";
import LoginForm from "../../components/loginForm/LoginForm";
import { useNavigate } from "react-router-dom";

export default function Login() {

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10" >
              <div className="card" style={{ borderRadius: "1rem"}}>
                <div className="row g-0 align-items-center">
                <h1 className="fw-bold mb-0 mt-3 text-center text-danger">Dog Lovers</h1>
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={dogImage}
                      alt="Dog image"
                      className="img-fluid "
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>

                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <div className="d-flex align-items-center mb-3 pb-1">
                      </div>
                      <LoginForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
