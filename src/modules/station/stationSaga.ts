import {
  setStations,
  getStationsAsync,
  error,
  pending,
  addStationAsync,
  deleteStationAsync,
  editStationAsync,
  AddStationPayload,
  DeleteStationPayload,
  EditStationPayload,
} from './stationReducer';
import { call, takeLatest, put, select } from 'redux-saga/effects';
import { stationAPI } from '../../api/station';
import { Station } from '../../interfaces';
import { RootState } from '..';
import { PayloadAction } from '@reduxjs/toolkit';

interface GetStationResult {
  error: string;
  stations: Station[];
}
interface AddStationResult {
  error: string;
  station: {
    id: number;
    name: string;
  };
}

interface DeleteStationResult {
  error: string;
}

interface EditStationResult {
  error: string;
}

export const selectStations = (state: RootState) => state.station.stations;

export function* getStationsSaga() {
  yield put(pending());
  const result: GetStationResult = yield call(stationAPI.getStations);

  if (result.error) {
    yield put(error(result.error));
    return;
  }
  yield put(setStations(result.stations));
}

export function* addStationSaga(action: PayloadAction<AddStationPayload>) {
  yield put(pending());
  const result: AddStationResult = yield call(stationAPI.addStation, action.payload);

  if (result.error) {
    yield put(error(result.error));
    return;
  }

  const stations: Station[] = yield select(selectStations);

  yield put(setStations([Object.assign(result.station, { lines: [] }), ...stations]));
}

export function* deleteStationSaga(action: PayloadAction<DeleteStationPayload>) {
  yield put(pending());
  const result: DeleteStationResult = yield call(stationAPI.deleteStation, action.payload);

  if (result.error) {
    yield put(error(result.error));
    return;
  }
  const stations: Station[] = yield select(selectStations);
  yield put(setStations(stations.filter(station => station.id !== action.payload)));
}

export function* editStationSaga(action: PayloadAction<EditStationPayload>) {
  yield put(pending());
  const result: EditStationResult = yield call(stationAPI.editStation, action.payload.id, action.payload.name);

  if (result.error) {
    yield put(error(result.error));
    return;
  }

  yield put(getStationsAsync());
}

export function* stationSaga() {
  yield takeLatest(getStationsAsync.type, getStationsSaga);
  yield takeLatest(addStationAsync.type, addStationSaga);
  yield takeLatest(deleteStationAsync.type, deleteStationSaga);
  yield takeLatest(editStationAsync.type, editStationSaga);
}
