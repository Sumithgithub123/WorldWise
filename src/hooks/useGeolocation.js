import { useState } from "react";

export function useGeolocation() {
  const [position, setposition] = useState("");
  const [loading, setloading] = useState(false);
  const [err, seterror] = useState("");

  function getmyposition() {
    seterror("");
    if (!navigator.geolocation) {
      seterror("Not Support");
      return;
    }
    setloading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setposition({ lat: pos.coords.latitude, long: pos.coords.longitude });
      },
      (err) => {
        seterror(err.message);
      }
    );
    setloading(false);
  }

  return { position, loading, err, getmyposition };
}
