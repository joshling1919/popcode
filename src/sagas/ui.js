import {all, call, debounce, put, take, takeEvery} from 'redux-saga/effects';
import {userDoneTyping as userDoneTypingAction} from '../actions/ui';
import {
  projectExportDisplayed,
  projectExportNotDisplayed,
} from '../actions/clients';
import {openWindowWithContent} from '../util';
import spinnerPageHtml from '../../templates/project-export.html';

export function* userDoneTyping() {
  yield put(userDoneTypingAction());
}

function* projectExport(
  successAction,
  failureAction,
  notDisplayedAction,
  displayedAction,
) {
  const exportWindow = yield call(openWindowWithContent, spinnerPageHtml);
  const {
    type,
    payload: {url, exportType},
  } = yield take([successAction, failureAction]);
  if (type === successAction) {
    if (exportWindow.closed) {
      yield put(notDisplayedAction(url, exportType));
    } else {
      exportWindow.location.href = url;
      yield put(displayedAction());
    }
  } else {
    yield call([exportWindow, 'close']);
  }
}

export function* exportProject() {
  yield* projectExport(
    'PROJECT_EXPORTED',
    'PROJECT_EXPORT_ERROR',
    projectExportNotDisplayed,
    projectExportDisplayed,
  );
}

export default function* ui() {
  yield all([
    debounce(1000, 'UPDATE_PROJECT_SOURCE', userDoneTyping),
    takeEvery('EXPORT_PROJECT', exportProject),
  ]);
}
