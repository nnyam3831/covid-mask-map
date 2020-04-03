import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import React, { useEffect, useState, useRef } from "react";
import { getMaskInfo } from "./api";
import ReactDOM from "react-dom";
import { MARKER_PIN } from "./static";
const MapContainer = ({ google, lat, lng }) => {
  const init = { lat: lat, lng: lng };
  const mapStyles = {
    width: "100%",
    height: "100%"
  };
  const iconSetup = color => {
    if (color) {
      return {
        color: color
      };
    } else {
      return null;
    }
  };
  const mapRef = useRef();
  const [center, setCenter] = useState(init);
  const [info, setInfo] = useState(null);
  const getData = async () => {
    const [data, error] = await getMaskInfo(center.lat, center.lng);
    if (error !== null) return console.log(error);
    setInfo(data);
  };
  useEffect(() => {
    getData(center.lat, center.lng);
  }, [center]);

  const onDragend = google => {
    const { map } = mapRef.current;
    const { center } = map;
    setCenter({ lat: center.lat(), lng: center.lng() });
  };
  return (
    <Map
      center={center}
      onDragend={({ google }) => onDragend(google)}
      ref={mapRef}
      google={google}
      zoom={18}
      style={mapStyles}
      initialCenter={{ lat: 37.4737991, lng: 127.1077285 }}
    >
      {info &&
        info.data.stores &&
        info.data.stores.map(store => {
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
                position={{ lat: store.lat, lng: store.lng }}
                icon={{
                  url: color
                }}
              ></Marker>
            );
        })}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.API_KEY
})(MapContainer);
