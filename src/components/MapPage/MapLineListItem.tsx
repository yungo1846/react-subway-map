import * as S from './MapLineListItem.styles';
import { MapLine } from '../../interfaces';

interface Props {
  line: MapLine;
}

const MapLineListItem = ({ line }: Props) => {
  return (
    <S.MapLineListItem>
      <S.LineContainer>
        <S.LineName color={line.color}>{line.name}</S.LineName>
        {line.stations.map(station => (
          <S.StationLine key={station.id} color={line.color}>
            <S.StationName>{station.name}</S.StationName>
            <S.StationDot hasTransferLines={station.transferLines.length > 0} />
          </S.StationLine>
        ))}
      </S.LineContainer>
    </S.MapLineListItem>
  );
};

export default MapLineListItem;
