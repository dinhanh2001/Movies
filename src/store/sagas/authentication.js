import { put, call, delay, takeLatest } from 'redux-saga/effects';
import { refreshTokenRequestApi } from '~/api/authentication';
import { initApp, loginRequest, loginSuccess, refreshTokenSuccess, refreshTokenFail } from '~/store/slices/rootAction';
import dayjs from 'dayjs';

function* loginRequestSaga() {
  yield put(loginSuccess({}));
}

function* refreshTokenRequestSaga(action) {
  try {
    let { accessToken, refreshToken } = action.payload;

    const refreshTokenExpirationTime = dayjs(refreshToken?.expires);
    const accessTokenExpirationTime = dayjs(accessToken?.expires);
    const currentTime = dayjs();

    // Trong trường hợp refresh token hết hạn. throws luôn ra error:
    if (refreshTokenExpirationTime.isBefore(currentTime)) {
      throw new Error('Refresh token expired');
    }

    if (accessTokenExpirationTime.isAfter(currentTime)) {
      const diffInMillis = accessTokenExpirationTime.diff(currentTime);
      yield delay(diffInMillis);
    }

    const data = yield call(refreshTokenRequestApi, {
      refreshToken: refreshToken.token
    });

    yield put(
      refreshTokenSuccess({
        accessToken: data.access,
        refreshToken: data.refresh
      })
    );
  } catch (error) {
    yield put(refreshTokenFail(error?.message || 'Refresh Token Failed!'));
  }
}

export default function* watchAuthentication() {
  yield takeLatest(loginRequest.type, loginRequestSaga);
  yield takeLatest([initApp.type, loginSuccess.type, refreshTokenSuccess.type], refreshTokenRequestSaga);
}
