import styled from '@emotion/styled';

export const MapLineListItem = styled.div`
  width: 100%;
  padding: 3rem 0;
`;

export const LineContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6rem 0;
`;

export const LineName = styled.div`
  width: fit-content;
  height: fit-content;
  border: 3px solid ${({ color }) => color};
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
`;

export const StationLine = styled.div`
  position: relative;
  width: 4rem;
  height: 0;
  border: 4px solid ${({ color }) => color};

  &:last-child {
    border-radius: 0 1rem 1rem 0;
  }
`;

export const StationName = styled.div`
  position: absolute;
  width: 5rem;
  bottom: 2.2rem;
  left: 50%;
  transform: translateX(-50%);
  transform: rotate(-45deg);
`;

export const StationDot = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50% 50%;
  border: 2px solid black;
  background-color: white;
`;
