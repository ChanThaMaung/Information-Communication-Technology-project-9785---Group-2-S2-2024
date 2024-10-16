import axios from "axios";
import { API_URL } from "./constants";

export const checkProjectNameExists = async (name) => {
  try {
    const encodedName = encodeURIComponent(name);
    const response = await axios.get(API_URL+"/check-project-name/"+encodedName);
    return response.data.exists;
  } catch (error) {
    console.error('Error checking project name:', error);
    return false;
  }
};

export const getLastYearCredits = async (address) => {
  const response = await axios.get(API_URL+"/getLastYearCredits/"+address);
  return response.data;
}

export const getByAddress = async (address) => {
  const response = await axios.get(API_URL+"/address/"+address);
  return response.data;
}

export const getVerifiedCredits = async (address) => {
  const response = await axios.get(API_URL+"/getVerifiedCredits/"+address);
  return response.data;
}

export const getRetiredCredits = async (address) => {
  const response = await axios.get(API_URL+"/getRetiredCredits/"+address);
  return response.data;
}

export const getTotalCredits = async (address) => {
  const response = await axios.get(API_URL+"/getTotalCredits/"+address);
  return response.data;
}

export const getYearlyCredits = async (address) => {
  const response = await axios.get(API_URL+"/getYearlyCredits/"+address);
  return response.data;
}

export const getYearlyAverage = async (address) => {
  const response = await axios.get(API_URL+"/getYearlyAverage/"+address);
  return response.data;
}

