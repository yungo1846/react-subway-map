import * as S from './StationListItem.styles';
import trashCanSVG from '../../assets/svg/trash-can.svg';
import editSVG from '../../assets/svg/edit.svg';
import { Station } from '../../interfaces';

export interface Props {
  station: Station;
  deleteStation: (id: Station['id']) => void;
}

const StationListItem = ({ station, deleteStation }: Props) => {
  const handleDeleteStation = () => {
    if (!window.confirm(`${station.name}을 삭제하시겠습니까?`)) return;

    deleteStation(station.id);
  };

  return (
    <S.StationListItem>
      <S.StationWrapper>
        <S.Name>{station.name}</S.Name>
        <S.TransferLineCircleContainer>
          {station.lines.map(line => (
            <S.TransferLineCircle key={line.id} color={line.color} />
          ))}
        </S.TransferLineCircleContainer>
      </S.StationWrapper>
      <S.ButtonContainer>
        <S.ButtonWrapper>
          <S.Button src={editSVG} />
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <S.Button src={trashCanSVG} onClick={handleDeleteStation} />
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.StationListItem>
  );
};

export default StationListItem;
