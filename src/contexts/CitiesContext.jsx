/* eslint-disable no-dupe-keys */
/* eslint-disable react/prop-types */
import {
  createContext,
  // useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";
// import { useNavigate } from "react-router-dom";
const BASEURL = "http://localhost:8000";

const CitiesContext = createContext();

function reducer(state, { type, payload }) {
  switch (type) {
    case "loading":
      return { ...state, loading: true };

    case "cities/loaded":
      return { ...state, loading: false, cities: payload };

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, payload],
        currentCity: payload,
        loading: false,
      };

    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => {
          if (city.id !== payload) return city;
        }),
        // currentCity: {},
        loading: false,
      };

    case "currentcity/loaded":
      return { ...state, loading: false, currentCity: payload };

    case "rejected":
      return { ...state, err: payload, loading: false };

    default:
      throw new Error("Unknown action");
  }
}

const initialstate = { cities: [], loading: false, currentCity: {}, err: "" };

function CitiesProvider({ children }) {
  // const [cities, setcities] = useState([]);
  // const [loading, setloading] = useState(false);
  // const [currentCity, setcurrentCity] = useState({});
  const [{ cities, loading, currentCity, err }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  useEffect(() => {
    async function fetchcities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASEURL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (e) {
        dispatch({
          type: "rejected",
          payload: "There are an error loading data...",
        });
      }
    }
    fetchcities();
  }, []);

  const getcurr = useCallback(
    async function getcurr(id) {
      if (id === currentCity.id) return;
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASEURL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "currentcity/loaded", payload: data });
      } catch (e) {
        dispatch({
          type: "rejected",
          payload: "There are an error loading data...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(city) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASEURL}/cities`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();
      // setcities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payload: data });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "There are an error creating city...",
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASEURL}/cities/${id}`, {
        method: "Delete",
      });
      // setcities((cities) =>
      //   cities.filter((city) => {
      //     if (city.id !== id) return city;
      //   })
      // );
      // const data = cities.filter((city) => {
      //   if (city.id !== id) return city;
      // });
      dispatch({ type: "city/deleted", payload: id });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "There are an error deleting city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        err,
        getcurr,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context used outside of its provider");
  return context;
}

export { CitiesProvider, useCities };
