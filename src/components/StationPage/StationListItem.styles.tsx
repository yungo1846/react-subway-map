import styled from '@emotion/styled';
import { Line } from '../../interfaces';

export const StationListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 1rem 1.5rem;
  width: 100%;
`;

export const StationWrapper = styled.div`
  display: flex;
`;

export const TransferLineCircleContainer = styled.div`
  display: flex;
`;

export const Name = styled.div`
  line-height: 1rem;
  width: 100%;
  margin-right: 0.4rem;
`;

export const TransferLineCircle = styled.div<{ color: Line['color'] }>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin: 0 0.1rem 0 0.1rem;
  background-color: ${({ color }) => color};
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const ButtonWrapper = styled.div`
  width: 1rem;
  height: 1rem;
  margin-left: 1rem;
`;

export const Button = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;
