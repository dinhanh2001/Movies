import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';
const initialState = {
  todayTrendingList: [],
  thisWeekTrendingList: [],
  popularTrailersList: [],
  searchList: {},
  inThearsTrailersList: [], //home
  popularList: [],
  peopleLeaderBoard: {}, //
  moviesPopularList: [],
  moviesNowPlayingList: [],
  moviesUpcomingList: [],
  moviesTopRatedList: [], //
  tvShowsPopulardList: [],
  tvShowsAiringTodayList: [],
  tvShowsOnTvList: [],
  tvShowsTopRatedList: [], //
  detailPeople: {},
  detailMovie: {},
  detailTV: {},
  favoriteList: [],
  rateList: [],
  loading: false
};
/**
 
 */
// view => hooks => saga => slice
export const homepage = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    searchHomePageListRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    searchHomePageListSuccess: (state, action) => {
      state.searchList = action.payload;
      state.loading = false;
    },
    searchHomePageListFailt: () => {},
    getTodayTrendingListRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getTodayTrendingListSuccess: (state, action) => {
      state.todayTrendingList = action.payload.results;
      state.loading = false;
    },
    getTodayTrendingListFailt: (state) => {
      state.loading = false;
    },
    getThisWeekTrendingListRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getThisWeekTrendingListSuccess: (state, action) => {
      return { ...state, loading: false, thisWeekTrendingList: action?.payload.results };
    },
    getThisWeekTrendingListFailt: () => {},
    getPopularTrailersListRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getPopularTrailersListSuccess: (state, action) => {
      const { results } = action.payload;
      state.popularTrailersList = results;
      state.loading = false;
    },
    getPopularTrailersListFailt: () => {},
    getInThearsTrailersListRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getInThearsTrailersListSuccess: (state, action) => {
      const { results } = action.payload;
      state.inThearsTrailersList = results;
      state.loading = false;
    },
    getInThearsTrailersListFailt: () => {},
    getPopularListRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getPopularListSuccess: (state, action) => {
      const { results } = action.payload;
      state.popularList = results;
      state.loading = false;
    },
    getPopularListFailt: () => {}, //slice homepage
    getpeopleLeaderBoardRequest: () => {}, //slice people
    getpeopleLeaderBoardSuccess: (state, action) => {
      // const { results } = action.payload;
      state.peopleLeaderBoard = action.payload;
      state.loading = false;
    },
    getpeopleLeaderBoardFailt: () => {},
    ///list loading state Movies
    getMoviesPopularListRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getMoviesPopularListSuccess: (state, action) => {
      const { results } = action.payload;
      state.moviesPopularList = results;
      state.loading = false;
    },
    getMoviesPopularListFailt: () => {},
    getMoviesNowPlayingListRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getMoviesNowPlayingListSuccess: (state, action) => {
      const { results } = action.payload;
      state.moviesNowPlayingList = results;
      state.loading = false;
    },
    getMoviesNowPlayingListFailt: () => {},
    getMoviesUpcomingListRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getMoviesUpcomingListSuccess: (state, action) => {
      const { results } = action.payload;
      state.moviesUpcomingList = results;
      state.loading = false;
    },
    getMoviesUpcomingListFailt: () => {},
    getMoviesTopRatedListRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getMoviesTopRatedListSuccess: (state, action) => {
      const { results } = action.payload;
      state.moviesTopRatedList = results;
      state.loading = false;
    },
    getMoviesTopRatedListFailt: () => {},
    //list slice tv shows
    getTvShowsPopulardRequest: (state) => {
      return { ...state, loading: true };
    },
    getTvShowsPopulardSuccess: (state, action) => {
      const { results } = action.payload;
      state.tvShowsPopulardList = results;
      state.loading = false;
    },
    getTvShowsPopulardFailt: (state) => {
      return {
        ...state,
        loading: false
      };
    },
    getTvShowsAiringTodayRequest: (state) => {
      return { ...state, loading: true };
    },
    getTvShowsAiringTodaySuccess: (state, action) => {
      const { results } = action.payload;
      state.tvShowsAiringTodayList = results;
      state.loading = false;
    },
    getTvShowsAiringTodayFailt: (state) => {
      return {
        ...state,
        loading: false
      };
    },
    getTvShowsOnTvRequest: (state) => {
      return { ...state, loading: true };
    },
    getTvShowsOnTvSuccess: (state, action) => {
      const { results } = action.payload;
      state.tvShowsOnTvList = results;
      state.loading = false;
    },
    getTvShowsOnTvFailt: (state) => {
      return {
        ...state,
        loading: false
      };
    },
    getTvShowsTopRatedRequest: (state) => {
      return { ...state, loading: true };
    },
    getTvShowsTopRatedSuccess: (state, action) => {
      const { results } = action.payload;
      state.tvShowsTopRatedList = results;
      state.loading = false;
    },
    getTvShowsTopRatedFailt: (state) => {
      return {
        ...state,
        loading: false
      };
    }, ///slice TV
    getDetailPeopleRequest: (state) => {
      state.loading = true;
      // return {
      //   ...state,
      //   loading: true
      // };
    },
    getDetailPeopleSuccess: (state, action) => {
      state.loading = false;
      state.detailPeople = action.payload;
      // return {
      //   loading: false,
      //   ...state,
      //   detailPeople: action.payload
      // };
    },
    getDetailPeopleFailt: (state) => {
      state.loading = false;
    },
    getDetailMovieRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getDetailMovieSuccess: (state, action) => {
      return {
        loading: false,
        ...state,
        detailMovie: action.payload
      };
    },
    getDetailMovieFailt: (state) => {
      return {
        loading: false,
        ...state
      };
    }, ///slice detail
    getDetailTVRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getDetailTVSuccess: (state, action) => {
      return {
        loading: false,
        ...state,
        detailTV: action.payload
      };
    },
    getDetailTVFailt: (state) => {
      return {
        loading: false,
        ...state
      };
    },
    changeFavoriteListRequest: () => {},
    changeFavoriteListSuccess: (state, action) => {
      if (!state.favoriteList?.includes(action.payload)) {
        const newArray = [...state.favoriteList, action.payload];
        dispatchToast('success', 'Thêm vào danh sách yêu thích thành công!');
        return {
          ...state,
          favoriteList: newArray
        };
      } else {
        state.favoriteList = state.favoriteList?.filter((item) => item !== action.payload);
        dispatchToast('success', 'Xóa khỏi danh sách yêu thích thành công!');
      }
    },
    changeFavoriteListFailt: (state) => {
      dispatchToast('error', 'changeFavoriteListFailt!');
      return { ...state };
    },
    changeRateListRequest: () => {},
    changeRateListSuccess: (state, action) => {
      dispatchToast('success', 'Your rating has been saved.');
      if (state.rateList?.find((item) => item.id === action.payload.id)) {
        const newArray = state?.rateList?.map((item) => {
          if (item?.id === action.payload.id) {
            return {
              id: item?.id,
              star: action.payload.star // thay doi sao danh gia
            };
          }
          return item;
        });
        return {
          ...state,
          rateList: newArray
        };
      } else {
        const newList = [...state.rateList, action.payload];
        return {
          ...state,
          rateList: newList
        };
      }
      // eslint-disable-next-line no-unsafe-optional-chaining
      // if ([...state?.rateList]?.find((item) => item.id === action.payload.id)) {
      //   // th2: da danh gia => tim ptu va thay doi so sao
      //   console.log('thop1', action.payload);
      //   const newArray = state?.rateList?.map((item) => {
      //     if (item?.id === action.payload.id) {
      //       return {
      //         id: item?.id,
      //         star: action.payload.star // sao danh gia
      //       };
      //     }
      //     return item;
      //   });
      //   return {
      //     ...state,
      //     rateList: newArray
      //   };
      // } else {
      //   // th1: chua danh gia thi them vao []
      //   let newArray = [[...state.rateList], action.payload]; // chua danh gia
      //   return {
      //     ...state,
      //     rateList: newArray
      //   };
      // }
    },
    changeRateListFailt: (state) => {
      dispatchToast('error', 'changeFavoriteListFailt!');
      return { ...state };
    }
  }
});

export const {
  getTodayTrendingListRequest,
  getTodayTrendingListSuccess,
  getTodayTrendingListFailt,
  getThisWeekTrendingListRequest,
  getThisWeekTrendingListSuccess,
  getThisWeekTrendingListFailt,
  getPopularTrailersListRequest,
  getPopularTrailersListSuccess,
  getPopularTrailersListFailt,
  getInThearsTrailersListRequest,
  getInThearsTrailersListSuccess,
  getInThearsTrailersListFailt,
  getPopularListRequest,
  getPopularListSuccess,
  getPopularListFailt,
  getpeopleLeaderBoardRequest,
  getpeopleLeaderBoardSuccess,
  getpeopleLeaderBoardFailt,
  searchHomePageListRequest,
  searchHomePageListSuccess,
  searchHomePageListFailt,
  getMoviesPopularListRequest, //export list state manage Movies
  getMoviesPopularListSuccess,
  getMoviesPopularListFailt,
  getMoviesNowPlayingListRequest,
  getMoviesNowPlayingListSuccess,
  getMoviesNowPlayingListFailt,
  getMoviesUpcomingListRequest,
  getMoviesUpcomingListSuccess,
  getMoviesUpcomingListFailt,
  getMoviesTopRatedListRequest,
  getMoviesTopRatedListSuccess,
  getMoviesTopRatedListFailt, //export list sate manage tv shows
  getTvShowsPopulardRequest,
  getTvShowsPopulardSuccess,
  getTvShowsPopulardFailt,
  getTvShowsAiringTodayRequest,
  getTvShowsAiringTodaySuccess,
  getTvShowsAiringTodayFailt,
  getTvShowsOnTvRequest,
  getTvShowsOnTvSuccess,
  getTvShowsOnTvFailt,
  getTvShowsTopRatedRequest,
  getTvShowsTopRatedSuccess,
  getTvShowsTopRatedFailt,
  getDetailPeopleRequest,
  getDetailPeopleSuccess,
  getDetailPeopleFailt,
  getDetailMovieRequest,
  getDetailMovieSuccess,
  getDetailMovieFailt,
  getDetailTVRequest,
  getDetailTVSuccess,
  getDetailTVFailt,
  changeFavoriteListRequest,
  changeFavoriteListSuccess,
  changeFavoriteListFailt,
  changeRateListRequest,
  changeRateListSuccess,
  changeRateListFailt
} = homepage.actions;

export default homepage.reducer;
// quan li state muon luu
