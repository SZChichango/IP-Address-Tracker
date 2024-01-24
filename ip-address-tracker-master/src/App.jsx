/** @format */

import { useEffect, useState } from "react";
import "./App.css";
import Map from "./map.jsx";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    let ipInput = document.getElementById("input-field").value;
    if (ipInput === "") {
      alert("Please enter an IP address");
    } else {
      try {
        const response = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=at_uwvBFLP3mtKcJny77ux4jgg9auHG5&ipAddress=${ipInput}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }

  return (
    <>
      <div className="wrapper">
        {/* Loading animation */}

        <header>
          <h1>IP Address Tracker</h1>
          <div className="ip-input">
            <input id="input-field" type="text" />
            <button id="submit" onClick={handleSubmit}>
              <img src="./src/assets/images/icon-arrow.svg" alt="" />
            </button>
          </div>
          {loading && (
            <div className="spinner">
              <div></div>
              <div></div>
            </div>
          )}

          {data && (
            <div className="ip-info">
              <div className="info-container">
                <p>IP ADDRESS</p>
                <h2>{data ? data.ip : ""}</h2>
              </div>
              <div className="info-container">
                <p>LOCATION</p>
                <h2>
                  {data
                    ? `${data.location.city}, ${data.location.region}, ${data.location.postalCode}`
                    : ""}
                </h2>
              </div>
              <div className="info-container">
                <p>TIMEZONE</p>
                <h2>{data ? data.location.timezone : ""}</h2>
              </div>
              <div className="info-container">
                <p>ISP</p>
                <h2>{data ? data.isp : ""}</h2>
              </div>
            </div>
          )}
        </header>

        <section className="map-container">
          {data ? (
            <Map
              lng={data ? data.location.lng : ""}
              lat={data ? data.location.lat : ""}
            />
          ) : (
            ""
          )}
        </section>
      </div>
    </>
  );
}

export default App;
