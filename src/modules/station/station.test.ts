import { call, select } from '@redux-saga/core/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { stationAPI } from '../../api/station';
import {
  addStationAsync,
  deleteStationAsync,
  editStationAsync,
  error,
  getStationsAsync,
  pending,
  setStations,
} from './stationReducer';
import { getStationsSaga, addStationSaga, selectStations, deleteStationSaga, editStationSaga } from './stationSaga';
import stationReducer from './stationReducer';
import { Station } from '../../interfaces';

const stationList: Station[] = [
  {
    id: 1,
    name: '인치역',
    lines: [
      { id: 21, name: '2호선', color: '#FFFFFF' },
      { id: 22, name: '3호선', color: '#AAAAAA' },
    ],
  },
  {
    id: 2,
    name: '곤이역',
    lines: [
      { id: 55, name: '4호선', color: '#FDDEAF' },
      { id: 53, name: '5호선', color: '#492382' },
    ],
  },
];

const errorMessage = '에러 메세지';

const newStation = {
  id: 3,
  name: '포코역',
};

const newStationName = '새로운역이름';

it('지하철 역 목록을 성공적으로 불러온다.', async () => {
  return expectSaga(getStationsSaga)
    .withReducer(stationReducer)
    .put(pending())
    .provide([[call(stationAPI.getStations), { data: stationList }]])
    .put(setStations(stationList))
    .hasFinalState({ stations: stationList, error: '' })
    .run();
});

it('지하철 역 목록을 불러오는데 실패한다.', async () => {
  return expectSaga(getStationsSaga)
    .withReducer(stationReducer)
    .put(pending())
    .provide([[call(stationAPI.getStations), { error: errorMessage }]])
    .put(error(errorMessage))
    .hasFinalState({ stations: [], error: errorMessage })
    .run();
});

it('지하철 역 목록을 성공적으로 추가한다.', async () => {
  return expectSaga(addStationSaga, { type: addStationAsync.type, payload: newStation.name })
    .withReducer(stationReducer)
    .put(pending())
    .provide([
      [call(stationAPI.addStation, newStation.name), { data: newStation }],
      [select(selectStations), stationList],
    ])
    .put(setStations([Object.assign(newStation, { lines: [] }), ...stationList]))
    .hasFinalState({ stations: [Object.assign(newStation, { lines: [] }), ...stationList], error: '' })
    .run();
});

it('지하철 역 목록을 추가하는데 실패한다.', async () => {
  return expectSaga(addStationSaga, { type: addStationAsync.type, payload: newStation.name })
    .withReducer(stationReducer)
    .put(pending())
    .provide([[call(stationAPI.addStation, newStation.name), { error: errorMessage }]])
    .put(error(errorMessage))
    .hasFinalState({ stations: [], error: errorMessage })
    .run();
});

it('지하철 역 목록을 성공적으로 삭제한다.', async () => {
  return expectSaga(deleteStationSaga, { type: deleteStationAsync.type, payload: newStation.id })
    .withReducer(stationReducer)
    .put(pending())
    .provide([
      [call(stationAPI.deleteStation, newStation.id), {}],
      [select(selectStations), stationList],
    ])
    .put(setStations(stationList.filter(station => station.id !== newStation.id)))
    .hasFinalState({ stations: stationList.filter(station => station.id !== newStation.id), error: '' })
    .run();
});

it('지하철 역 목록을 삭제하는데 실패한다.', async () => {
  return expectSaga(deleteStationSaga, { type: deleteStationAsync.type, payload: newStation.id })
    .withReducer(stationReducer)
    .put(pending())
    .provide([[call(stationAPI.deleteStation, newStation.id), { error: errorMessage }]])
    .put(error(errorMessage))
    .hasFinalState({ stations: [], error: errorMessage })
    .run();
});

it('지하철 역 이름을 성공적으로 수정한다.', async () => {
  return expectSaga(editStationSaga, {
    type: editStationAsync.type,
    payload: { id: stationList[0].id, name: newStationName },
  })
    .withReducer(stationReducer)
    .put(pending())
    .provide([
      [call(stationAPI.editStation, stationList[0].id, newStationName), {}],
      [select(selectStations), stationList],
    ])
    .put(getStationsAsync())
    .run();
});

it('지하철 역 목록을 수정하는데 실패한다.', async () => {
  return expectSaga(editStationSaga, {
    type: editStationAsync.type,
    payload: { id: stationList[0].id, name: newStationName },
  })
    .withReducer(stationReducer)
    .put(pending())
    .provide([[call(stationAPI.editStation, stationList[0].id, newStationName), { error: errorMessage }]])
    .put(error(errorMessage))
    .hasFinalState({ stations: [], error: errorMessage })
    .run();
});
