import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import store from "../store";
import {
  setAuthUser,
  setAuthUserId,
  setWorkout,
  setVideos,
  setVideoUrl,
} from "./index";

const API_KEY = "AIzaSyDeWfwn0P0AECmyb_k_BrjJWh-eYLkKZ0I";

export const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const storedLocalId = localStorage.getItem("localId");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("localId");

    return {};
  }

  return {
    token: storedToken,
    duration: remainingTime,
    localId: storedLocalId,
  };
};

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    const { data } = response;
    const { idToken, localId } = data;

    store.dispatch(setAuthUser(idToken));
    store.dispatch(setAuthUserId(localId));
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    const { data } = response;
    const { idToken, expiresIn, localId } = data;

    localStorage.setItem("token", idToken);
    localStorage.setItem("expirationTime", expiresIn);
    localStorage.setItem("localId", localId);

    store.dispatch(setAuthUser(idToken));
    store.dispatch(setAuthUserId(localId));
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = async () => {
  store.dispatch(setAuthUser(null));
  store.dispatch(setAuthUserId(null));
  store.dispatch(setWorkout(null));
  store.dispatch(setVideos(null));

  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("localId");
};

export const fetchWorkout = async () => {
  try {
    const response = await axios.get(
      `https://candicecock-7375c-default-rtdb.firebaseio.com/workout.json`
    );
    const { data } = response;
    const convertedData = { ...data, exercises: Object.values(data.exercises) };

    store.dispatch(setWorkout(convertedData));
  } catch (error) {
    console.error(error);
  }
};

export const uploadVideo = async (videoUrl) => {
  const { authUser, authUserId, workout } = store.getState();

  try {
    await axios.post(
      `https://candicecock-7375c-default-rtdb.firebaseio.com/video.json?auth=${authUser}`,
      {
        workout_date: workout.date,
        videoUrl,
        userId: authUserId,
        videoId: uuidv4(),
      }
    );

    store.dispatch(setVideoUrl(null));

    await fetchVideos();
  } catch (error) {
    console.error(error);
  }
};

export const fetchVideos = async () => {
  const { authUser, authUserId } = store.getState();

  const queryParams =
    "?auth=" + authUser + '&orderBy="userId"&equalTo="' + authUserId + '"';

  try {
    const response = await axios.get(
      `https://candicecock-7375c-default-rtdb.firebaseio.com/video.json${queryParams}`
    );
    const { data } = response;
    const convertedData = Object.values(data);

    store.dispatch(setVideos(convertedData));
  } catch (error) {
    console.error(error);
  }
};
