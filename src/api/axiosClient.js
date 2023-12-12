import axios from 'axios';
import queryString from 'query-string';
import { store } from '~/store';

const axiosClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWI1MDExZjY2M2I2YmFmNjZjMzdkNDViNGQyYTcxNCIsInN1YiI6IjY1NTEwZjcxNzk4ZTA2MDBhZDc4MTE3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JR_atC_SKssO9gTFt5ya16PeGMHGYPfcgDKupWlVrio'
  },
  paramsSerializer: (params) => queryString.stringify(params)
});

axiosClient.interceptors.request.use((config) => {
  const token = store.getState()?.authentication?.accessToken?.token;

  if (token) {
    config.headers[
      'Authorization'
    ] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWI1MDExZjY2M2I2YmFmNjZjMzdkNDViNGQyYTcxNCIsInN1YiI6IjY1NTEwZjcxNzk4ZTA2MDBhZDc4MTE3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JR_atC_SKssO9gTFt5ya16PeGMHGYPfcgDKupWlVrio`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error?.response?.data;
  }
);

export default axiosClient;
