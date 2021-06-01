import { mapAPI } from './../../api/map';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { error, getMapAsync, pending, setMap } from './mapReducer';
import { MapData } from '../../interfaces';

interface GetMapResult {
  error: string;
  mapData: MapData;
}

export function* getMapSaga() {
  yield put(pending());
  const result: GetMapResult = yield call(mapAPI.getMap);

  if (result.error) {
    yield put(error(result.error));
    return;
  }
  yield put(setMap(result.mapData));
}

export function* mapSaga() {
  yield takeLatest(getMapAsync.type, getMapSaga);
}
