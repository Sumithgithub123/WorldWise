/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, loading } = useCities();
  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first Country by clicking on a Country on the map" />
    );
  let set = new Set();

  const countries = cities
    .filter((city) => {
      if (!set.has(city.country)) {
        set.add(city.country);
        return city;
      }
    })
    .map((city) => {
      return { country: city.country, emoji: city.emoji };
    });

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
