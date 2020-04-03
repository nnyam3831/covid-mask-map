import React, { useEffect, useState } from "react";
import GoogleMap from "./GoogleMap";
import Header from "./Header";
import DashBoard from "./DashBoard";
function App() {
  const [coords, setCoords] = useState(null);
  useEffect(() => {
    const data = navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    console.log(data);
  }, []);
  const handleSuccess = pos => {
    const {
      coords: { latitude, longitude }
    } = pos;
    setCoords({ lat: latitude, lng: longitude });
  };

  const handleError = () => {
    console.log("No Position");
  };
  return (
    <>
      <Header />
      <GoogleMap {...coords} />
      <DashBoard />
    </>
  );
}

export default App;
