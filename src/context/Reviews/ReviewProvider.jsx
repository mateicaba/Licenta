import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewContext from "./ReviewContext";
import { API_URL } from "../../api/constants";

const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const response = await axios.get(`${API_URL}/reviews`);
      setReviews(response.data);
    };

    getReviews();
  }, []);

  const addReview = async (review) => {
    const response = await axios.post(`${API_URL}/reviews`, review);
    setReviews([...reviews, response.data]);
  };

  const deleteReview = async (id) => {
    await axios.delete(`${API_URL}/reviews/${id}`);
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const editReview = async (id, updatedReview) => {
    const response = await axios.put(`${API_URL}/reviews/${id}`, updatedReview);
    setReviews(
      reviews.map((review) => (review.id === id ? response.data : review))
    );
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        deleteReview,
        editReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
