import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useGlobalReducer from "../hooks/useGlobalReducer";

const DetailsView = () => {
  const { category, id } = useParams(); 
  const { store } = useGlobalReducer(); 

  
  const details = store.data[category]?.find((item) => item.uid === id);
  console.log(details);

  if (!details) {
    return (
      <div className="container text-center my-5">
        <Navbar />
        <h1>No details found.</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h1 className="text-center mb-4">{details.name}</h1>
        <div className="row">
          <div className="col-md-6">
            <ul className="list-group">
              {Object.entries(details).map(([key, value]) => (
                <li className="list-group-item d-flex justify-content-between" key={key}>
                  <span className="text-capitalize">{key.replace("_", " ")}:</span>
                  <span>{value || "Unknown"}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsView;