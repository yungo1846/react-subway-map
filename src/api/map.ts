import axios from 'axios';
import { API, RESPONSE } from '../constants/api';
import { MapData } from '../interfaces';

export const mapAPI = {
  getMap: async () => {
    try {
      const response: { status: number; data: MapData } = await axios.get(API.MAP());

      if (response.status >= 400) {
        throw new Error('전체보기 정보를 불러오는데 실패했습니다...!');
      }

      return { mapData: response.data };
    } catch (error) {
      return { error: error.message ?? RESPONSE.FAILURE };
    }
  },
};
