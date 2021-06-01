import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getMapAsync, resetError as _resetError } from '../modules/map/mapReducer';

const useMap = () => {
  const { mapData, error } = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMapAsync());
  }, [dispatch]);

  const resetError = () => {
    dispatch(_resetError());
  };

  return { mapData, error, resetError };
};

export default useMap;
