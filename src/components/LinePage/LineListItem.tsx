import * as S from './LineListItem.styles';
import trashCanSVG from '../../assets/svg/trash-can.svg';

export interface Props {
  name: string;
  id: number;
  color: string;
  deleteLine: (id: number) => void;
}

const LineListItem = ({ name, id, color, deleteLine }: Props) => {
  const handleDeleteLine = () => {
    if (!window.confirm(`${name}을 삭제하시겠습니까?`)) return;
    deleteLine(id);
  };

  return (
    <S.LineListItem>
      <S.LineColorCircleContainer>
        <S.LineColorCircle color={color} />
      </S.LineColorCircleContainer>
      <S.Name>{name}</S.Name>
      <S.ButtonContainer>
        <S.ButtonWrapper>
          <S.Button src={trashCanSVG} onClick={handleDeleteLine} />
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.LineListItem>
  );
};

export default LineListItem;
