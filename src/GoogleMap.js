import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import React, { useEffect, useState, useRef } from "react";
import { getMaskInfo } from "./api";
import ReactDOM from "react-dom";
import { MARKER_PIN } from "./static";
const MapContainer = ({ google }) => {
  const init = { lat: 0, lng: 0 };
  const mapStyles = {
    width: "100%",
    height: "100%"
  };
  const mapRef = useRef();
  const maps = google.maps;
  const mapNode = ReactDOM.findDOMNode(mapRef.current);

  const [center, setCenter] = useState(init);
  const [info, setInfo] = useState(null);
  const getData = async () => {
    const [data, error] = await getMaskInfo(center.lat, center.lng);
    if (error !== null) return console.log(error);
    setInfo(data);
    console.log("api call");
  };
  useEffect(() => {
    getData(center.lat, center.lng);
  }, [center]);

  const onDragend = google => {
    const { maps } = google;
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
        info.data.stores.map(store => (
          <Marker
            key={store.code}
            position={{ lat: store.lat, lng: store.lng }}
            onClick={() => console.log("hihi")}
            label="약국"
            onMouseover={() => console.log("많음")}
            icon={{
              backgroundColor: "red",
              strokeColor: "red",
              // scaledSize: new window.google.maps.Size(35, 50),
              // url: "https://image.flaticon.com/icons/svg/1946/1946412.svg"
              url: MARKER_PIN.RED
            }}
          >
            <div>오홍홍</div>
          </Marker>
        ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyD2F5CSl8i_8Afao6BZZCrkY5elVEG9DKk"
})(MapContainer);
