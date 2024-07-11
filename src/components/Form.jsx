// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUrlposition } from "../hooks/useUrlposition";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const { lat, lng } = useUrlposition();
  const [loadingeocoding, setloadingeocoding] = useState(false);
  const [emoji, setemoji] = useState("");
  const [error, seterror] = useState("");
  const { createCity, loading } = useCities();

  useEffect(() => {
    async function fetchcityData() {
      if (!lat && !lng) return;
      try {
        setloadingeocoding(true);
        seterror("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryName) {
          throw new Error("Try another location😊");
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setemoji(convertToEmoji(data.countryCode));
      } catch (e) {
        seterror(e.message);
      } finally {
        setloadingeocoding(false);
      }
    }
    fetchcityData();
  }, [lat, lng]);

  function onclick(e) {
    e.preventDefault();
    navigate(-1);
  }

  async function handlesubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (loadingeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message={"Start by clicking somewhere on map😊"} />;

  if (error) return <Message message={error} />;

  return (
    <form
      className={`${styles.form} ${loading && styles.loading}`}
      onSubmit={handlesubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back" onclick={onclick}>
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
