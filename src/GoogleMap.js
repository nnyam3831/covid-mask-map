import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import React, { useEffect, useState, useRef } from "react";
import { getMaskInfo } from "./api";
import ReactDOM from "react-dom";
import { MARKER_PIN } from "./static";
import Any from "./Marker";
// import Marker from "./Marker";
const MapContainer = ({ google, lat, lng }) => {
  const init = { lat: lat, lng: lng };
  const mapStyles = {
    width: "100%",
    height: "100%",
  };
  const iconSetup = (color) => {
    if (color) {
      return {
        color: color,
      };
    } else {
      return null;
    }
  };
  const mapRef = useRef();
  const [center, setCenter] = useState(init);
  const [info, setInfo] = useState([]);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

  const onMarkerClick = (props, marker, e) => {
    setShowingInfoWindow(true);
    setActiveMarker(marker);
    setSelectedPlace(props);
    console.log(marker);
  };
  const onMapClicked = (props) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };
  const getData = async () => {
    const [tempData, error] = await getMaskInfo(center.lat, center.lng);
    if (error !== null) return console.log(error);
    const { data } = tempData;
    setInfo(data.stores);
  };
  useEffect(() => {
    getData(center.lat, center.lng);
  }, [center]);

  const onDragend = (google) => {
    const { map } = mapRef.current;
    const { center } = map;
    setCenter({ lat: center.lat(), lng: center.lng() });
  };
  return (
    <Map
      onClick={onMapClicked}
      center={center}
      onDragend={({ google }) => onDragend(google)}
      ref={mapRef}
      google={google}
      zoom={18}
      style={mapStyles}
      initialCenter={{ lat: lat, lng: lng }}
    >
      {info &&
        info.map((store) => {
          let color = null;
          if (store.remain_stat === "plenty") {
            color = MARKER_PIN.GREEN;
          } else if (store.remain_stat === "some") {
            color = MARKER_PIN.ORANGE;
          } else if (store.remain_stat === "few") {
            color = MARKER_PIN.RED;
          } else {
            color = null;
          }
          if (color !== null)
            return (
              <Marker
                key={store.code}
                onClick={onMarkerClick}
                position={{ lat: store.lat, lng: store.lng }}
                icon={{
                  url: color,
                }}
                name={"current location"}
              >
                <InfoWindow marker={activeMarker} visible={true}>
                  <div>
                    <h1>{selectedPlace.name}</h1>
                  </div>
                </InfoWindow>
              </Marker>
            );
        })}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.API_KEY,
})(MapContainer);
