import React, { useState, useEffect } from "react";
import axios from "axios";
import UserDetail from "../../components/userDetail/UserDetail";
import { useNavigate } from "react-router-dom";
import "./profile.scss";
import { Container } from "reactstrap";
import { DateTime } from "luxon";

const Profile = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [pausedTime, setPausedTime] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [clockRunning, setClockRunning] = useState(true);
  const navigate = useNavigate();


  function getTimeInCountry(timestamp, timeZone) {
    const dateObject = DateTime.fromISO(timestamp, { zone: timeZone });
  
    
    const localTime = dateObject.toFormat("hh:mm:ss a");
  
    return localTime;
  }
  

  // Fetch countries data from the API
  useEffect(() => {
    axios
      .get("http://worldtimeapi.org/api/timezone")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

// Fetch current time for the selected country
useEffect(() => {

  const fetchCurrentTime = () => {
    if (selectedCountry && clockRunning) {
      const [area, location, region] = selectedCountry.split("/");
      const apiUrl = `http://worldtimeapi.org/api/timezone/${area}/${location}${
        region ? "/" + region : ""
      }`;

      axios
        .get(apiUrl)
        .then((response) => {
          const timestamp = response.data.utc_datetime;
          const timeZone = `${area}/${location}${region ? "/" + region : ""}`;

          // Call the getTimeInCountry function with timestamp and timeZone
          const localTime = getTimeInCountry(timestamp, timeZone);

        

          if (!pausedTime[selectedCountry]) {
            // Set paused time if not set
            setPausedTime((prev) => ({ ...prev, [selectedCountry]: localTime }));
            
          }else{

            setCurrentTime(localTime);

          }
          
        })
        .catch((error) => console.error("Error fetching current time:", error));
    }
  };


  fetchCurrentTime();


  // Update the current time every second if the clock is running

    const intervalId = setInterval(fetchCurrentTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);

  
 
}, [selectedCountry, clockRunning, pausedTime]);


  // Logic for pausing/resuming the clock
const toggleClock = () => {
  setClockRunning((prev) => !prev);
  if (!clockRunning) {
    // If clock is paused, clear the paused time for the selected country
    setPausedTime((prev) => ({ ...prev, [selectedCountry]: null }));
  } else {
    // If clock is resumed, set the current time to the paused time
    setCurrentTime(pausedTime[selectedCountry]);
  }
};



  return (
    <div className="profileWrapper">
      <Container>
        <div className="header">
          <div>
            <span onClick={() => navigate(-1)}>

              <button className="btn">Back</button>
            </span>
          </div>
          <div>
            <div>
              <span>Current Time: {currentTime?currentTime.toString():new Date().toLocaleTimeString()}</span>
              <button
                onClick={toggleClock}
                className="btn action"
                style={{ background: clockRunning ? "red" : "green" }}
              >
                {clockRunning ? "Pause" : "Start"}
              </button>
            </div>
            <div>
              <label>Country: </label>
              <select
                id="countryDropdown"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Container>

      <div className="pageTitle">
        <h1>Profile Page</h1>
      </div>

      <div>
        <UserDetail />
      </div>
    </div>
  );
};

export default Profile;
