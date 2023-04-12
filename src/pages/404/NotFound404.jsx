import React from "react";
import dog404 from "../../assets/images/dog-404.png";
import { Link } from "react-router-dom";

export default function NotFound404() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center row">
          <div className=" ">
            <img src={dog404} width="30%" />
            <p className="fs-3">
              {" "}
              <span className="text-danger">Opps!</span> Page not found.
            </p>
            <p className="lead">The page you’re looking for doesn’t exist.</p>

            <Link to="/" className="btn btn-danger">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
