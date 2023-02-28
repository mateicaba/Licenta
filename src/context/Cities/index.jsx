import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

const CityContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  error: null,
};

function cityReducer(state, action) {
  switch (action.type) {
    case "FETCH_CITIES_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "FETCH_CITIES_SUCCESS":
      return { ...state, cities: action.payload, isLoading: false };
    case "FETCH_CITIES_FAILURE":
      return { ...state, error: action.payload, isLoading: false };
    case "ADD_CITY":
      return { ...state, cities: [...state.cities, action.payload] };
    case "DELETE_CITY":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      return state;
  }
}

export function CityProvider(props) {
  const [state, dispatch] = useReducer(cityReducer, initialState);

  const fetchCities = async () => {
    dispatch({ type: "FETCH_CITIES_REQUEST" });
    try {
      const response = await axios.get("/cities");
      dispatch({ type: "FETCH_CITIES_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_CITIES_FAILURE", payload: error.message });
    }
  };

  const addCity = async (city) => {
    try {
      const response = await axios.post("/cities", city);
      dispatch({ type: "ADD_CITY", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCity = async (id) => {
    try {
      await axios.delete(`/cities/${id}`);
      dispatch({ type: "DELETE_CITY", payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    cities: state.cities,
    isLoading: state.isLoading,
    error: state.error,
    fetchCities,
    addCity,
    deleteCity,
  };

  return <CityContext.Provider value={value} {...props} />;
}

export function useCity() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
}
