import axiosClient from './axiosClient';

// nếu muốn đổi ngôn ngữ trả về ủa phim thì replace language = en-US hoặc vi
const getTodayTrendingListApi = () => {
  return axiosClient.get(`trending/movie/day?language=vi`);
};
const getThisWeekListApi = () => {
  return axiosClient.get(`trending/movie/week?language=vi`);
};
const getPopularLatestTrailersApi = () => {
  return axiosClient.get('movie/popular');
};

const getIntheatersLatestTrailersListApi = () => {
  return axiosClient.get('trending/tv/day?language=vi');
};
const getPopularListApi = () => {
  return axiosClient.get('movie/popular');
};

const searchHomePage = (params) => {
  ///{type:"movie",keyword:"dgdgd",page:4}
  console.log(params);
  return axiosClient.get(`search/${params?.type}?query=${params?.keyword}&language=vi&page=${params?.page ?? 1}`);
};

/// api homepage
const getPeopleLeaderBoardApi = (params) => {
  ///4
  return axiosClient.get(`person/popular?language=vi&page=${params}`); //4
};
///api people
const getMoviesPopularApi = (params) => {
  return axiosClient.get(`movie/popular?language=vi&page=${params}`);
};

const getMoviesNowPlayingApi = (params) => {
  return axiosClient.get(`movie/now_playing?language=vi&page=${params}`);
};

const getMoviesUpcomingApi = (params) => {
  return axiosClient.get(`movie/upcoming?language=vi&page=${params}`);
};
const getMoviesTopRatedApi = (params) => {
  return axiosClient.get(`movie/top_rated?language=vi&page=${params}`);
};
/// api movies
const getTvShowsPopulardApi = (params) => {
  return axiosClient.get(`tv/popular?language=vi&page=${params}`);
};
const getTvShowsAiringTodayApi = (params) => {
  return axiosClient.get(`tv/airing_today?language=vi&page=${params}`);
};
const getTvShowsOnTvApi = (params) => {
  return axiosClient.get(`tv/on_the_air?language=vi&page=${params}`);
};
const getTvShowsTopRatedApi = (params) => {
  return axiosClient.get(`tv/top_rated?language=vi&page=${params}`);
};
// api tv shows

// const getDetailActorApi = (params) => {
//   return axiosClient.get(`person/${params}`);
// };

const getDetailMovieApi = (params) => {
  return axiosClient.get(`movie/${params}`);
};
const getDetailPeopleApi = (params) => {
  return axiosClient.get(`person/${params}`);
};
const getDetailTVApi = (params) => {
  return axiosClient.get(`tv/${params}?language=vi`);
};
//api detail
export {
  getTodayTrendingListApi,
  getThisWeekListApi,
  getPopularLatestTrailersApi,
  getIntheatersLatestTrailersListApi,
  searchHomePage,
  getPopularListApi,
  getPeopleLeaderBoardApi,
  getMoviesPopularApi,
  getMoviesNowPlayingApi,
  getMoviesUpcomingApi,
  getMoviesTopRatedApi,
  getTvShowsPopulardApi,
  getTvShowsAiringTodayApi,
  getTvShowsOnTvApi,
  getTvShowsTopRatedApi,
  getDetailMovieApi,
  getDetailPeopleApi,
  getDetailTVApi
};
