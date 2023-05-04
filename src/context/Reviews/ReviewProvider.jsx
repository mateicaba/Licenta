import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ReviewContext from "./ReviewContext";
import { API_URL } from "../../api/constants";

const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const placeId = location.pathname.split("/")[2];
  const currentUsername = sessionStorage.getItem("currentUsername");

   useEffect(() => {
     const fetchReviews = async () => {
       try {
         const response = await axios.get(`${API_URL}/reviews`);
         setReviews(response.data);
         console.log(response.data);
       } catch (error) {
         console.error("Error fetching reviews:", error);
       }
     };
     fetchReviews();
   }, []);


  const addReview = async (review) => {
    try {
      const reviewData = {
        ...review,
        placeId,
        username: currentUsername,
      };
      const response = await axios.post(`${API_URL}/reviews`, reviewData);
      setReviews([...reviews, response.data]);
    } catch (error) {
      console.error("Error adding review:", error);
    }
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
