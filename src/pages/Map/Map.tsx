import { useEffect } from 'react';
import ContentContainer from '../../components/@commons/ContentContainer/ContentContainer';
import MapLineListItem from '../../components/Map/MapLineListItem';
import useMap from '../../hook/useMap';
import * as S from './Map.styles';

const Map = () => {
  const { mapData, error, resetError } = useMap();

  useEffect(() => {
    if (error) {
      alert('전체보기 정보를 불러오는데 실패하였습니다.');
      resetError();
    }
  }, [error, resetError]);

  return (
    <S.Container>
      <ContentContainer hasHat={true}>
        <S.Title>전체보기</S.Title>
        <S.MapContainer>
          {mapData.map(line => (
            <MapLineListItem line={line} />
          ))}
        </S.MapContainer>
      </ContentContainer>
    </S.Container>
  );
};

export default Map;
