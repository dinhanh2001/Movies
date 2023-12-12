import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTodayTrendingListRequest,
  getThisWeekTrendingListRequest,
  getPopularTrailersListRequest,
  getInThearsTrailersListRequest,
  searchHomePageListRequest,
  getPopularListRequest,
  getpeopleLeaderBoardRequest,
  getMoviesPopularListRequest,
  getMoviesNowPlayingListRequest,
  getMoviesUpcomingListRequest,
  getMoviesTopRatedListRequest,
  getTvShowsPopulardRequest,
  getTvShowsAiringTodayRequest,
  getTvShowsOnTvRequest,
  getTvShowsTopRatedRequest,
  getDetailPeopleRequest,
  getDetailMovieRequest,
  getDetailTVRequest,
  changeFavoriteListRequest,
  changeRateListRequest
} from '~/store/slices/homepage';

const useHomePageStore = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.homepage.loading);
  const todayTrendingList = useSelector((state) => state.homepage.todayTrendingList);
  const thisWeekTrendingList = useSelector((state) => state.homepage.thisWeekTrendingList);
  const popularTrailersList = useSelector((state) => state.homepage.popularTrailersList);
  const inThearsTrailersList = useSelector((state) => state.homepage.inThearsTrailersList);
  const popularList = useSelector((state) => state.homepage.popularList);
  const searchList = useSelector((state) => state.homepage.searchList);
  const leaderoardList = useSelector((state) => state.homepage.peopleLeaderBoard); //people
  // state homepage

  const moviesPopularList = useSelector((state) => state.homepage.moviesPopularList);
  const moviesNowPlayingList = useSelector((state) => state.homepage.moviesNowPlayingList);
  const moviesUpcomingList = useSelector((state) => state.homepage.moviesUpcomingList);
  const moviesTopRatedList = useSelector((state) => state.homepage.moviesTopRatedList);

  //state Movies
  const tvShowsPopulardList = useSelector((state) => state.homepage.tvShowsPopulardList);
  const tvShowsAiringTodayList = useSelector((state) => state.homepage.tvShowsAiringTodayList);
  const tvShowsOnTvList = useSelector((state) => state.homepage.tvShowsOnTvList);
  const tvShowsTopRatedList = useSelector((state) => state.homepage.tvShowsTopRatedList);
  //state tv shows

  const detailPeople = useSelector((state) => state.homepage.detailPeople);
  const detailMovie = useSelector((state) => state.homepage.detailMovie);
  const detailTV = useSelector((state) => state.homepage.detailTV);

  //detail
  const favoriteList = useSelector((state) => state.homepage.favoriteList);
  const rateList = useSelector((state) => state.homepage.rateList);

  const dispatchSearchHomePageList = useCallback(
    (payload) => {
      dispatch(searchHomePageListRequest(payload));
      return true;
    },
    [dispatch]
  );

  const dispatchGetTodayTrendingList = useCallback(
    (payload) => {
      dispatch(getTodayTrendingListRequest(payload));
      return true;
    },
    [dispatch]
  );

  const dispatchGetThisWeekTrendingList = useCallback(
    (payload) => {
      dispatch(getThisWeekTrendingListRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetPopularTrailersList = useCallback(
    (payload) => {
      dispatch(getPopularTrailersListRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetInThearsTrailersList = useCallback(
    (payload) => {
      dispatch(getInThearsTrailersListRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetPopularList = useCallback(
    (payload) => {
      dispatch(getPopularListRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetPeopleLeaderBoardList = useCallback(
    (payload) => {
      dispatch(getpeopleLeaderBoardRequest(payload));

      return true;
    },
    [dispatch]
  );

  // homepage

  const dispatchGetMoviesPopularListRequestList = useCallback(
    (payload) => {
      dispatch(getMoviesPopularListRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetMoviesNowPlayingListRequestList = useCallback(
    (payload) => {
      dispatch(getMoviesNowPlayingListRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetMoviesUpcomingListRequestList = useCallback(
    (payload) => {
      dispatch(getMoviesUpcomingListRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetMoviesTopRatedListRequestList = useCallback(
    (payload) => {
      dispatch(getMoviesTopRatedListRequest(payload));

      return true;
    },
    [dispatch]
  );
  //tv shows

  const dispatchGetTvShowsPopularRequestList = useCallback(
    (payload) => {
      dispatch(getTvShowsPopulardRequest(payload));

      return true;
    },
    [dispatch]
  );
  const dispatchGetTvShowsAiringTodayRequestList = useCallback(
    (payload) => {
      dispatch(getTvShowsAiringTodayRequest(payload));

      return true;
    },
    [dispatch]
  );
  const dispatchGetTvShowsOnTvRequestList = useCallback(
    (payload) => {
      dispatch(getTvShowsOnTvRequest(payload));

      return true;
    },
    [dispatch]
  );
  const dispatchGetTvShowsTopRatedRequestList = useCallback(
    (payload) => {
      dispatch(getTvShowsTopRatedRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetDetailPeopleRequest = useCallback(
    (payload) => {
      dispatch(getDetailPeopleRequest(payload));

      return true;
    },
    [dispatch]
  );
  const dispatchGetDetailMovieRequest = useCallback(
    (payload) => {
      dispatch(getDetailMovieRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetDetailTV = useCallback(
    (payload) => {
      dispatch(getDetailTVRequest(payload));
      return true;
    },
    [dispatch]
  );

  const dispatchChangeFavoriteList = useCallback(
    (payload) => {
      dispatch(changeFavoriteListRequest(payload));
      return true;
    },
    [dispatch]
  );

  const dispatchChangeRateList = useCallback(
    (payload) => {
      dispatch(changeRateListRequest(payload));
      return true;
    },
    [dispatch]
  );

  return {
    loading,
    todayTrendingList,
    thisWeekTrendingList,
    popularTrailersList,
    inThearsTrailersList,
    popularList,
    leaderoardList,
    searchList,
    dispatchSearchHomePageList,
    dispatchGetTodayTrendingList,
    dispatchGetThisWeekTrendingList,
    dispatchGetPopularTrailersList,
    dispatchGetInThearsTrailersList,
    dispatchGetPopularList, //homepage
    dispatchGetPeopleLeaderBoardList, //people
    moviesPopularList,
    moviesNowPlayingList,
    moviesUpcomingList,
    moviesTopRatedList,
    dispatchGetMoviesPopularListRequestList,
    dispatchGetMoviesNowPlayingListRequestList,
    dispatchGetMoviesUpcomingListRequestList,
    dispatchGetMoviesTopRatedListRequestList, // tv show
    tvShowsPopulardList,
    tvShowsAiringTodayList,
    tvShowsOnTvList,
    tvShowsTopRatedList,
    dispatchGetTvShowsPopularRequestList,
    dispatchGetTvShowsAiringTodayRequestList,
    dispatchGetTvShowsOnTvRequestList,
    dispatchGetTvShowsTopRatedRequestList,
    detailMovie,
    detailPeople,
    detailTV,
    dispatchGetDetailPeopleRequest,
    dispatchGetDetailMovieRequest,
    dispatchGetDetailTV,
    favoriteList,
    dispatchChangeFavoriteList,
    rateList,
    dispatchChangeRateList
  };
};

export { useHomePageStore };
