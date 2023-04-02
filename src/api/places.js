import axios from "axios";
import { API_URL } from "./constants";

const fetchDashboard = async (city_id = null) => {
  const places = await axios.get(`${API_URL}/places`);
  let filteredPlaces = places.data.filter(({ available }) => available);
  if (city_id !== null) {
    filteredPlaces = filteredPlaces.filter(
      ({ city_id }) => city_id === city_id
    );
  }
  return filteredPlaces.map(
    ({ id, picture, city_id, available, price, company, about }) => ({
      id,
      picture,
      city_id,
      available,
      price,
      company,
      about,
    })
  );
};

const fetchBucharestDashboard = async (city_id = null) => {
  const places = await axios.get(`${API_URL}/places`);

  let filteredPlaces = places.data.filter(
    ({ available, city_id }) => available && city_id === 5
  );

  if (city_id !== null) {
    filteredPlaces = filteredPlaces.filter(
      ({ city_id }) => city_id === city_id
    );
  }
  return filteredPlaces.map(
    ({ id, picture, city_id, available, price, company, about }) => ({
      id,
      picture,
      city_id,
      available,
      price,
      company,
      about,
    })
  );
};

const fetchClujDashboard = async (city_id = null) => {
  const places = await axios.get(`${API_URL}/places`);

  let filteredPlaces = places.data.filter(
    ({ available, city_id }) => available && city_id === 1
  );

  if (city_id !== null) {
    filteredPlaces = filteredPlaces.filter(
      ({ city_id }) => city_id === city_id
    );
  }
  return filteredPlaces.map(
    ({ id, picture, city_id, available, price, company, about }) => ({
      id,
      picture,
      city_id,
      available,
      price,
      company,
      about,
    })
  );
};

const fetchIasiDashboard = async (city_id = null) => {
  const places = await axios.get(`${API_URL}/places`);

  let filteredPlaces = places.data.filter(
    ({ available, city_id }) => available && city_id === 2
  );

  if (city_id !== null) {
    filteredPlaces = filteredPlaces.filter(
      ({ city_id }) => city_id === city_id
    );
  }
  return filteredPlaces.map(
    ({ id, picture, city_id, available, price, company, about }) => ({
      id,
      picture,
      city_id,
      available,
      price,
      company,
      about,
    })
  );
};

const fetchBrasovDashboard = async (city_id = null) => {
  const places = await axios.get(`${API_URL}/places`);

  let filteredPlaces = places.data.filter(
    ({ available, city_id }) => available && city_id === 3
  );

  if (city_id !== null) {
    filteredPlaces = filteredPlaces.filter(
      ({ city_id }) => city_id === city_id
    );
  }
  return filteredPlaces.map(
    ({ id, picture, city_id, available, price, company, about }) => ({
      id,
      picture,
      city_id,
      available,
      price,
      company,
      about,
    })
  );
};

const fetchTimisoaraDashboard = async (city_id = null) => {
  const places = await axios.get(`${API_URL}/places`);

  let filteredPlaces = places.data.filter(
    ({ available, city_id }) => available && city_id === 4
  );

  if (city_id !== null) {
    filteredPlaces = filteredPlaces.filter(
      ({ city_id }) => city_id === city_id
    );
  }
  return filteredPlaces.map(
    ({ id, picture, city_id, available, price, company, about }) => ({
      id,
      picture,
      city_id,
      available,
      price,
      company,
      about,
    })
  );
};

const fetchPlace = async (id) => {
  const places = await axios.get(`${API_URL}/places/${id}`);
  return places.data;
};

const fetchReservedPlaces = async () => {
  const currentUsername = sessionStorage.getItem("currentUsername");
  const params = new URLSearchParams({
    available: false,
    reserved: currentUsername,
  });
  const places = await axios.get(
    `${API_URL}/places?${params}`
  );
  return places.data;
};

const createPlace = async (place) => {
  const newPlace = await axios.post(`${API_URL}/places`, place);
  return newPlace.data;
};

const updatePlace = async (place) => {
  const modifiedPlace = await axios.put(`${API_URL}/places/${place.id}`, place);
  return modifiedPlace.data;
};

const deletePlace = async (id) => {
  const deleted = await axios.delete(`${API_URL}/places/${id}`);
  return deleted;
};

export {
  fetchDashboard,
  fetchBucharestDashboard,
  fetchClujDashboard,
  fetchIasiDashboard,
  fetchBrasovDashboard,
  fetchTimisoaraDashboard,
  fetchPlace,
  createPlace,
  updatePlace,
  deletePlace,
  fetchReservedPlaces,
};
