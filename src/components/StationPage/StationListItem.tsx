import * as S from './StationListItem.styles';
import trashCanSVG from '../../assets/svg/trash-can.svg';
import editSVG from '../../assets/svg/edit.svg';
import checkBoxPNG from '../../assets/png/check-box.png';
import returnPNG from '../../assets/png/return.png';
import { Station } from '../../interfaces';
import React, { useState } from 'react';

export interface Props {
  station: Station;
  deleteStation: (id: Station['id']) => void;
  editStation: (id: Station['id'], name: Station['name']) => void;
}

const StationListItem = ({ station, deleteStation, editStation }: Props) => {
  const [isEditMode, setEditMode] = useState(false);
  const [editedStationName, setEditedStationName] = useState(station.name);

  const handleChangeStationName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20) return;
    setEditedStationName(e.target.value);
  };

  const handleClickEditMode = () => {
    setEditMode(true);
  };

  const handleCancelEditMode = () => {
    setEditMode(false);
    setEditedStationName(station.name);
  };

  const handleSubmitEditedStationName = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedStationName === station.name) {
      setEditMode(false);
      return;
    }
    editStation(station.id, editedStationName);
    setEditMode(false);
  };

  const handleDeleteStation = () => {
    if (!window.confirm(`${station.name}을 삭제하시겠습니까?`)) return;

    deleteStation(station.id);
  };

  return (
    <S.StationListItem>
      {isEditMode ? (
        <>
          <S.StationWrapper>
            <S.Form onSubmit={handleSubmitEditedStationName}>
              <S.Input value={editedStationName} onChange={handleChangeStationName} />
            </S.Form>
          </S.StationWrapper>
          <S.ButtonContainer>
            <S.ButtonImage src={checkBoxPNG} onClick={handleSubmitEditedStationName} />
            <S.ButtonImage src={returnPNG} onClick={handleCancelEditMode} />
          </S.ButtonContainer>
        </>
      ) : (
        <>
          <S.StationWrapper>
            <S.Name>{station.name}</S.Name>
            <S.TransferLineCircleContainer>
              {station.lines.map(line => (
                <S.TransferLineCircle key={line.id} color={line.color} />
              ))}
            </S.TransferLineCircleContainer>
          </S.StationWrapper>
          <S.ButtonContainer>
            <S.ButtonImage src={editSVG} onClick={handleClickEditMode} />
            <S.ButtonImage src={trashCanSVG} onClick={handleDeleteStation} />
          </S.ButtonContainer>
        </>
      )}
    </S.StationListItem>
  );
};

export default StationListItem;
