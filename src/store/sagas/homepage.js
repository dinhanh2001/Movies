import { put, call, takeLatest } from 'redux-saga/effects';
import {
  getTodayTrendingListApi,
  getThisWeekListApi,
  getPopularLatestTrailersApi,
  getIntheatersLatestTrailersListApi,
  getPopularListApi,
  searchHomePage,
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
} from '~/api/homepage';
import {
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
  searchHomePageListRequest,
  searchHomePageListSuccess,
  searchHomePageListFailt,
  getPopularListRequest,
  getPopularListSuccess,
  getPopularListFailt,
  getpeopleLeaderBoardRequest,
  getpeopleLeaderBoardSuccess,
  getpeopleLeaderBoardFailt,
  getMoviesPopularListRequest,
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
  getMoviesTopRatedListFailt,
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
  changeRateListRequest,
  changeRateListSuccess
} from '~/store/slices/rootAction';

function* requestTodayTrendingListSaga(action) {
  try {
    const data = yield call(getTodayTrendingListApi, action.payload);
    yield put(getTodayTrendingListSuccess(data)); // thnah cong
  } catch (error) {
    console.log('error', error);
    yield put(getTodayTrendingListFailt(error?.message || 'Get  getTodayTrendingListFailt failed!'));
  }
}
// giao hien => hooks => saga => slice => hooks lay data slice da luu => trag ve giao dien
function* requestThisWeekTrendingListSaga(action) {
  try {
    console.log('requestThisWeekTrendingListSaga');
    const data = yield call(getThisWeekListApi, action.payload);
    yield put(getThisWeekTrendingListSuccess(data));
  } catch (error) {
    console.log('error', error);
    yield put(getThisWeekTrendingListFailt(error?.message || 'Get  getTodayTrendingListFailt failed!'));
  }
}

function* requestgetPopularTrailersListSaga(action) {
  try {
    const data = yield call(getPopularLatestTrailersApi, action.payload);
    yield put(getPopularTrailersListSuccess(data));
  } catch (error) {
    console.log('error', error);
    yield put(getPopularTrailersListFailt(error?.message || 'Get  getTodayTrendingListFailt failed!'));
  }
}
function* requestgetIntheatersLatestTrailersListSaga(action) {
  try {
    const data = yield call(getIntheatersLatestTrailersListApi, action.payload);
    yield put(getInThearsTrailersListSuccess(data));
  } catch (e) {
    yield put(getInThearsTrailersListFailt(error?.message || 'requestgetIntheatersLatestTrailersListSaga failt '));
  }
}

function* requestgetPopularListSaga(action) {
  try {
    const data = yield call(getPopularListApi, action.payload);
    yield put(getPopularListSuccess(data));
  } catch (e) {
    yield put(getPopularListFailt(error?.message || 'requestgetIntheatersLatestTrailersListSaga failt '));
  }
}

function* requestSearchHomePageListSaga(action) {
  try {
    const data = yield call(searchHomePage, action.payload);

    yield put(searchHomePageListSuccess(data));
  } catch (e) {
    yield put(searchHomePageListFailt(error?.message || 'requestgetIntheatersLatestTrailersListSaga failt '));
  }
}

/// saga call api api homepage

function* requesstgetPeopleLeaderBoardSaga(action) {
  try {
    const data = yield call(getPeopleLeaderBoardApi, action.payload);
    yield put(getpeopleLeaderBoardSuccess(data));
  } catch (e) {
    yield put(getpeopleLeaderBoardFailt(e?.message || 'get leaderboard failt'));
  }
}

//saga call api people
function* requestGetMoviesPopularSaga(action) {
  try {
    const data = yield call(getMoviesPopularApi, action.payload);
    yield put(getMoviesPopularListSuccess(data));
  } catch (e) {
    yield put(getMoviesPopularListFailt(e?.message || 'get leaderboard failt'));
  }
}
function* requestGetMoviesNowPlayingSaga(action) {
  try {
    const data = yield call(getMoviesNowPlayingApi, action.payload);
    yield put(getMoviesNowPlayingListSuccess(data));
  } catch (e) {
    yield put(getMoviesNowPlayingListFailt(e?.message || 'get leaderboard failt'));
  }
}
function* requestGetMoviesUpcomingSaga(action) {
  try {
    const data = yield call(getMoviesUpcomingApi, action.payload);
    yield put(getMoviesUpcomingListSuccess(data));
  } catch (e) {
    yield put(getMoviesUpcomingListFailt(e?.message || 'get leaderboard failt'));
  }
}
function* requestGetMoviesTopRatedSaga(action) {
  try {
    const data = yield call(getMoviesTopRatedApi, action.payload);
    yield put(getMoviesTopRatedListSuccess(data));
  } catch (e) {
    yield put(getMoviesTopRatedListFailt(e?.message || 'get leaderboard failt'));
  }
}

//saga tv shows
function* requestgetTvShowsPopulardSaga(action) {
  try {
    const data = yield call(getTvShowsPopulardApi, action.payload);
    yield put(getTvShowsPopulardSuccess(data));
  } catch (e) {
    yield put(getTvShowsPopulardFailt(e?.message || 'get leaderboard failt'));
  }
}
function* requestgetTvShowsAiringTodaySaga(action) {
  try {
    const data = yield call(getTvShowsAiringTodayApi, action.payload);
    yield put(getTvShowsAiringTodaySuccess(data));
  } catch (e) {
    yield put(getTvShowsAiringTodayFailt(e?.message || 'get leaderboard failt'));
  }
}
function* requestgetTvShowsOnTvSaga(action) {
  try {
    const data = yield call(getTvShowsOnTvApi, action.payload);
    yield put(getTvShowsOnTvSuccess(data));
  } catch (e) {
    yield put(getTvShowsOnTvFailt(e?.message || 'get leaderboard failt'));
  }
}
function* requestgetTvShowsTopRatedSaga(action) {
  try {
    const data = yield call(getTvShowsTopRatedApi, action.payload);
    yield put(getTvShowsTopRatedSuccess(data));
  } catch (e) {
    yield put(getTvShowsTopRatedFailt(e?.message || 'get leaderboard failt'));
  }
}

function* requestgetDetailPeopleSaga(action) {
  try {
    const data = yield call(getDetailPeopleApi, action.payload);
    yield put(getDetailPeopleSuccess(data));
  } catch (e) {
    yield put(getDetailPeopleFailt(e?.message || 'get leaderboard failt'));
  }
}
function* requestgetDetailMovieSaga(action) {
  try {
    const data = yield call(getDetailMovieApi, action.payload);
    yield put(getDetailMovieSuccess(data));
  } catch (e) {
    yield put(getDetailMovieFailt(e?.message || 'get leaderboard failt'));
  }
}
function* requestgetDetailTVSaga(action) {
  try {
    const data = yield call(getDetailTVApi, action.payload);
    yield put(getDetailTVSuccess(data));
  } catch (e) {
    yield put(getDetailTVFailt(e?.message || 'get detail tv failt'));
  }
}

function* requestRequestChangeFavoriteRequest(action) {
  console.log(action);
  yield put(changeFavoriteListSuccess(action.payload)); // nhan id tu giao dien
}

function* requestChangeRateRequest(action) {
  yield put(changeRateListSuccess(action.payload)); // nhan id tu giao dien
}

export default function* watchHomePage() {
  yield takeLatest(getTodayTrendingListRequest.type, requestTodayTrendingListSaga);
  yield takeLatest(getThisWeekTrendingListRequest.type, requestThisWeekTrendingListSaga);
  yield takeLatest(getPopularTrailersListRequest.type, requestgetPopularTrailersListSaga);
  yield takeLatest(getInThearsTrailersListRequest.type, requestgetIntheatersLatestTrailersListSaga);
  yield takeLatest(getPopularListRequest.type, requestgetPopularListSaga);
  yield takeLatest(searchHomePageListRequest.type, requestSearchHomePageListSaga);
  yield takeLatest(getpeopleLeaderBoardRequest.type, requesstgetPeopleLeaderBoardSaga); ///homepage
  yield takeLatest(getMoviesPopularListRequest.type, requestGetMoviesPopularSaga);
  yield takeLatest(getMoviesNowPlayingListRequest.type, requestGetMoviesNowPlayingSaga);
  yield takeLatest(getMoviesUpcomingListRequest.type, requestGetMoviesUpcomingSaga);
  yield takeLatest(getMoviesTopRatedListRequest.type, requestGetMoviesTopRatedSaga);
  //tvshow
  yield takeLatest(getTvShowsPopulardRequest.type, requestgetTvShowsPopulardSaga);
  yield takeLatest(getTvShowsAiringTodayRequest.type, requestgetTvShowsAiringTodaySaga);
  yield takeLatest(getTvShowsOnTvRequest.type, requestgetTvShowsOnTvSaga);
  yield takeLatest(getTvShowsTopRatedRequest.type, requestgetTvShowsTopRatedSaga);

  //detail
  yield takeLatest(getDetailPeopleRequest.type, requestgetDetailPeopleSaga);
  yield takeLatest(getDetailMovieRequest.type, requestgetDetailMovieSaga);
  yield takeLatest(getDetailTVRequest.type, requestgetDetailTVSaga);
  // favoriteList
  yield takeLatest(changeFavoriteListRequest.type, requestRequestChangeFavoriteRequest);
  yield takeLatest(changeRateListRequest.type, requestChangeRateRequest);

  // Khi thêm organization thành công hoặc xóa organization thành công thì đều gọi lại requestAllOrganizations để cập nhật lại list
  // yield takeLatest(
  //   [deleteOrganizationSuccess.type, updateOrganizationSuccess.type, addOrganizationSuccess.type],
  //   requestAllOrganizationsSaga
  // );
}
// khi disspatch 1 action
