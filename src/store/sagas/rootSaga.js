import { all } from 'redux-saga/effects';
import watchAuthentication from './authentication';
import watchUsers from './users';
import watchHomePage from './homepage';
export default function* rootSaga() {
  yield all([watchHomePage(), watchAuthentication(), watchUsers()]);
}
