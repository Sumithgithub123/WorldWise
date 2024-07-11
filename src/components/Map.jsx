/* eslint-disable react/prop-types */
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlposition } from "../hooks/useUrlposition";

function Map() {
  const [maposition, setmapposition] = useState([40, 0]);
  const { cities } = useCities();
  const { position: geoposition, loading, getmyposition } = useGeolocation();
  // const navigate = useNavigate();
  // const [search, setsearch] = useSearchParams();
  const { lat, lng: long } = useUrlposition();

  useEffect(() => {
    if (lat && long) {
      setmapposition([lat, long]);
    }
  }, [lat, long]);

  useEffect(() => {
    if (geoposition) {
      setmapposition([geoposition.lat, geoposition.long]);
    }
  }, [geoposition]);

  return (
    <div
      className={styles.mapContainer}
      // onClick={() => {
      //   navigate("form");
      // }}
    >
      {/* <h1>Map</h1>
      <h1>
        Position: {lat} {long}
      </h1>
      <button
        onClick={() => {
          setsearch({ lat: 23, long: 50 });
        }}
      >
        Change position
      </button> */}
      {!geoposition && (
        <Button type="position" onclick={getmyposition}>
          {loading ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={maposition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                <span>{city.emoji}</span>
                <p>{city.cityName}</p>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={maposition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      let lat = e.latlng.lat;
      let lng = e.latlng.lng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
  return null;
}

export default Map;
