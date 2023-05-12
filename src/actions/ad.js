import axios from 'axios';
import {
  LOAD_ADS,
  LOAD_AD_DETAILS,
  LOAD_HIGHEST_BID,
  PLACE_BID,
  POST_AD,
  START_AUCTION,
  USER_PURCHASED_LOADED,
  AD_POSTED_BY_OTHER,
  UPDATE_AD_IN_AD_LIST,
  UPDATE_TIMER,
  UPDATE_AD_DETAILS,
  LOAD_AD_IMAGE,
  CLEAR_AD_IMAGE,
  IMAGE_LOADING,
  CLEAR_AD_DETAILS,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Get Recommendation Ad
export const updateRecommendationAd = (userId, adId) => async (dispatch) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/recommendation`, { userId: userId, adId: adId });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// Load ads
export const loadAds =
  (userId) =>
    async (dispatch) => {
      let config = null;
      if (userId) {
        config = { params: { user: userId } };
      }
      try {
        // Without recommendation
        // const res = await axios.get(
        //   `${process.env.REACT_APP_API_BASE_URL}/ad?option=notexpired`,
        //   // `https://auctionit-api.onrender.com/?user_id=${userId}`,
        //   config
        // );

        // console.log("Res from loadAds API : ");
        // console.log(res);

        // console.log("res.data from loadAds API : ");
        // console.log(res.data);

        // With Recommendation
        // const res = await axios.get(
        //   // `${process.env.REACT_APP_RECOMMENDATION_URL}/?user_id=${userId}`
        // `https://auctionit-api.onrender.com/?user_id=${userId}`
        //   `http://127.0.0.1:105/?user_id=${userId}`

        // )
        // const res = await axios.get('http://127.0.0.1:105/', {
        //   params: {
        //     user_id: userId
        //   }
        // });
        // const res = await axios.get(`http://127.0.0.1:105/?user_id=${userId._id}`);
        const res = await axios.get(`${process.env.REACT_APP_RECOMMENDATION_URL}/?user_id=${userId._id}`);

        dispatch({
          type: LOAD_ADS,
          payload: res.data,
        });
      } catch (error) {
        // Get errors array sent by api
        if (!error.response) {
          return dispatch(setAlert('Server error', 'error'));
        }
        console.log(error.response);
        const errors = error.response.data.errors;
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
        }
      }
    };
// Previous Load Add Function... Directly returns all the ads available 
// export const loadAds =
//   (userId = null) =>
//     async (dispatch) => {
//       let config = null;
//       if (userId) {
//         config = { params: { user: userId } };
//       }
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/ad?option=notexpired`,
//           config
//         );

//         dispatch({
//           type: LOAD_ADS,
//           payload: res.data,
//         });
//       } catch (error) {
//         // Get errors array sent by api
//         if (!error.response) {
//           return dispatch(setAlert('Server error', 'error'));
//         }
//         console.log(error.response);
//         const errors = error.response.data.errors;
//         if (errors) {
//           errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
//         }
//       }
//     };

// Load ad details
export const loadAdDetails = (adId) => async (dispatch) => {
  try {
    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'));
    }
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ad/${adId}`);

    dispatch({
      type: LOAD_AD_DETAILS,
      payload: res.data,
    });
  } catch (error) {
    // Get errors array sent by api
    if (!error.response) {
      return dispatch(setAlert('Server error', 'error'));
    }
    console.log(error.response);
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 50000)));
    }
  }
};

// Clear ad details
export const clearAdDetails = () => (dispatch) => {
  dispatch({
    type: CLEAR_AD_DETAILS,
  });
};

// Load ad image
export const loadAdImage = (imageUrl) => async (dispatch) => {
  try {
    const res = await axios.get(imageUrl, {
      responseType: 'blob',
    });

    dispatch({
      type: LOAD_AD_IMAGE,
      payload: URL.createObjectURL(res.data),
    });
  } catch (error) {
    // Get errors array sent by api
    console.log(error);
    if (!error.response) {
      return dispatch(setAlert('Server error', 'error'));
    }
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 50000)));
    }
  }
};

// Clear ad image
export const clearAdImage = (adId) => async (dispatch) => {
  dispatch({
    type: CLEAR_AD_IMAGE,
  });
};

// Set image status to loading
export const setImageLoadingStatus = () => async (dispatch) => {
  dispatch({
    type: IMAGE_LOADING,
  });
};

// Set ad details
export const setAdDetails = (ad) => (dispatch) => {
  dispatch({
    type: LOAD_AD_DETAILS,
    payload: ad,
  });
};

// Current highest bid on ad
export const loadHighestBid = (adId) => async (dispatch) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/bid/${adId}`;
  try {
    const res = await axios.get(url, { params: { option: 'highest' } });

    dispatch({
      type: LOAD_HIGHEST_BID,
      payload: res.data[0],
    });
  } catch (error) {
    // Get errors array sent by api
    if (!error.response) {
      return dispatch(setAlert('Server error', 'error'));
    }
    console.log(error.response);
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 50000)));
    }
  }
};

// Place bid
export const placeBid = (adId, bidAmount) => async (dispatch) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/bid/${adId}`;
  try {
    const res = await axios.post(url, null, { params: { amount: bidAmount } });
    const res2 = await axios.get(url, { params: { option: 'highest' } });
    dispatch({
      type: PLACE_BID,
      payload: { adDetails: res.data, highestBid: res2.data[0] },
    });
    setAlert('Bid submitted', 'success');
  } catch (error) {
    // Get errors array sent by api
    if (!error.response) {
      return dispatch(setAlert('Server error', 'error'));
    }
    console.log(error.response);
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 50000)));
    }
  }
};

// Add Review
export const addReview = (adId, comment, ownerId) => async (dispatch) => {
  console.log("Request received at backend");
  const url = `${process.env.REACT_APP_API_BASE_URL}/ad/${adId}`;
  const ratingUrl = `${process.env.REACT_APP_RATING_URL}/postreview`;
  // const ratingUrl = "http://127.0.0.1:5000/postreview"; // Require to change rating url as per the deployment
  const userProfilUrl = `${process.env.REACT_APP_API_BASE_URL}/user/${ownerId}`;
  try {
    let rating = await axios.post(ratingUrl, { review: comment });
    rating = parseFloat(rating.data);
    const res = await axios.put(url, { review: comment, rating: rating });

    let user = await axios.get(userProfilUrl);
    let newratings = user.data.ratings;
    newratings.push(rating)
    const updatedUserResponse = await axios.put(userProfilUrl, { ratings: newratings })
    setAlert('Review Submitted', 'success');
  } catch (error) {
    // Get errors array sent by api
    if (!error.response) {
      return dispatch(setAlert('Server error', 'error'));
    }
  }
}

// Post ad
export const postAd = (data) => async (dispatch) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/ad`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });

    dispatch({
      type: POST_AD,
      payload: res.data.ad,
    });
  } catch (error) {
    // Get errors array sent by api
    if (!error.response) {
      return dispatch(setAlert('Server error', 'error'));
    }
    console.log(error.response);
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 50000)));
    }
  }
};

// Start Auction
export const startAuction = (adId) => async (dispatch) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/auction/start/${adId}`;
  try {
    const res = await axios.get(url);

    dispatch({
      type: START_AUCTION,
      payload: res,
    });
  } catch (error) {
    // Get errors array sent by api
    if (!error.response) {
      return dispatch(setAlert('Server error', 'error'));
    }
    console.log(error.response);
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 50000)));
    }
  }
};

// Load ads purchased by user
export const getUserPurchasedAds = () => async (dispatch) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/user/products/purchased`;
  try {
    const res = await axios.get(url);

    dispatch({
      type: USER_PURCHASED_LOADED,
      payload: res.data,
    });
  } catch (error) {
    // Get errors array sent by api
    if (!error.response) {
      return dispatch(setAlert('Server error', 'error'));
    }
    console.log(error.response);
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 50000)));
    }
  }
};

// Load ads purchased by user
export const adPostedByOther = (ad) => (dispatch) => {
  dispatch({
    type: AD_POSTED_BY_OTHER,
    payload: ad,
  });
};

// Update ad in ad list
export const updateAdInList = (ad) => (dispatch) => {
  dispatch({
    type: UPDATE_AD_IN_AD_LIST,
    payload: ad,
  });
};

// Update current ad (adDetails)
export const updateTimer = (timer) => (dispatch) => {
  dispatch({
    type: UPDATE_TIMER,
    payload: timer,
  });
};

// Update current ad (adDetails)
export const updateAdDetails = (ad) => (dispatch) => {
  dispatch({
    type: UPDATE_AD_DETAILS,
    payload: ad,
  });
};
