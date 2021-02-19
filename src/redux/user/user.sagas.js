import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { signInFailure, signInSuccess } from './user.actions';
import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(user){
  try {
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data() }));
  } catch(err) {
    yield put(signInFailure(err.message));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch(err) {
    yield put(signInFailure(err.message));
  }
}

export function* onGoogleSignIn() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithEmail({payload: {email, password}}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch(err) {
    yield put(signInFailure(err.message));
  }
}

export function* onEmailSignIn() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* userSagas() {
  yield all([call(onGoogleSignIn), call(onEmailSignIn)]);
}