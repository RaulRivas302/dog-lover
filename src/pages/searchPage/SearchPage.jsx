import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./searchPage.css";
import Select from "react-select";

export default function SearchPage() {
  const [breedApi, setBreedApi] = useState([]);
  const [dogsData, setDogsData] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchState, setSearchState] = useState(false);
  const navigate = useNavigate();

  const [selectedBreed, setSelectedBreed] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [selectedDog, setSelectedDog] = useState("");
  const token = localStorage.getItem("isLogin");

  const handleSelect = (value) => {
    setSelectedBreed(value);
  };

  useEffect(() => {
    getBreeds();
    getSearchbyBreeds();

    if (!token) {
      navigate("/userLogin");
    }
  }, [token]);

  function getBreeds() {
    const breedsResponse = axios({
      url: "https://frontend-take-home-service.fetch.com/dogs/breeds",
      method: "get",
      headers: {
        "fetch-api-key":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
        "content-type": "application/json",
      },
      withCredentials: true,
    })
      .then(async (response) => {
        setBreeds(response.data);
        setBreedApi(response.data);
      })
      .catch(function (error) {
        toast.error(`Oops! ${error}`);
      });
  }

  function getDogsData(searchData) {
    const dogsResponse = axios({
      url: "https://frontend-take-home-service.fetch.com/dogs",
      method: "post",
      data: searchData,
      headers: {
        "fetch-api-key":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((response) => {
        const res = response;
        setDogsData(response.data);
      })
      .catch(function (error) {
        toast.error(`Oops! ${error}`);
      });
  }

  function logout() {
    const response = axios({
      url: "https://frontend-take-home-service.fetch.com/auth/logout",
      method: "post",
      headers: {
        "fetch-api-key":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
      },
      withCredentials: true,
    })
      .then(() => {
        localStorage.removeItem("isLogin");
        navigate("/userLogin");
      })
      .catch(function (error) {
        toast.error(`Oops! ${error}`);
      });
  }

  const columns = [
    {
      name: "Breed",
      selector: (row) => row.breed,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Age",
      selector: (row) => row.age,
    },
    {
      name: "Zip Code",
      selector: (row) => row.zip_code,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => {
            setSelectedDog(row);
          }}
          id={row.id}
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Select
        </button>
      ),
    },
  ];

  function getSearchbyBreeds() {
    const params = selectedBreed && `&breeds=${selectedBreed.value}`;
    const dogsResponse = axios({
      url: `https://frontend-take-home-service.fetch.com/dogs/search/?size=60${params}&ageMax=${maxAge}&ageMin=${minAge}`,
      method: "get",
      headers: {
        "fetch-api-key":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
        "content-type": "application/json",
      },
      withCredentials: true,
    })
      .then((response) => {
        getDogsData(response.data.resultIds);
      })
      .catch(function (error) {
        toast.error(`Oops! ${error}`);
      });
  }

  function handleSearchInput() {
    setSearchState(true);
    getSearchbyBreeds();
    getSearchbyBreeds();
  }

  function resetFilter() {
    setBreeds(breedApi);
    setSearchInput("");
    setSelectedBreed("");
    setMaxAge("");
  }
  const [open, setopen] = useState(true);
  return (
    <>
      <button className="btn btn-danger btn-block" onClick={() => logout()}>
        Logout
      </button>

      <div className="container mt-5 filterSection">
        <div
          className="row d-flex justify-content-center"
          style={{ zIndex: 100000 }}
        >
          <div className="col-md-8">
            <div className="card p-3  py-4 ">
              <h5>Find Your Dream Dog</h5>
              <div className="row g-3 mt-2 ">
                <div className="col-md-8 col-lg-9">
                  <Select
                    inputId="bootstrapSelect"
                    className="basic-single"
                    classNamePrefix="select"
                    value={selectedBreed}
                    onChange={handleSelect}
                    options={breeds?.map((item) => {
                      return { value: item, label: item };
                    })}
                  />
                </div>
                <div className="col-md-4 col-lg-3">
                  <button
                    className="btn btn-danger btn-block"
                    onClick={() => {
                      handleSearchInput();
                    }}
                  >
                    Search Breed
                  </button>
                  <button
                    className="btn btn-medium btn-block"
                    onClick={() => {
                      resetFilter();
                    }}
                  >
                    Reset Filter
                  </button>
                </div>
                <div className="mt-3">
                  <a
                    data-toggle="collapse"
                    href="#collapseExample"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    className="advanced"
                  >
                    Advance Search With Filters
                  </a>
                  <div className="" id="collapseExample">
                    <div className="card card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Min Age"
                            value={minAge}
                            onChange={(event) => {
                              setMinAge(event.target.value);
                            }}
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Max Age"
                            value={maxAge}
                            onChange={(event) => {
                              setMaxAge(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  You selected {selectedDog.name} !
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body text-success justify-content-center">
                <img
                  className="d-flex justify-content-center"
                  src={selectedDog.img}
                  height="300px"
                  width="250px"
                />
                <h5>Breed: {selectedDog.breed}</h5>
                <h5>Name: {selectedDog.name}</h5>
                <h5>Age: {selectedDog.age}</h5>
                <h5>Zip Code: {selectedDog.zip_code}</h5>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {dogsData && (
        <DataTable
          className="mt-5"
          columns={columns}
          data={dogsData}
          pagination
          responsive
          highlightOnHover
          fixedHeader
          pointerOnHover
        />
      )}
    </>
  );
}
