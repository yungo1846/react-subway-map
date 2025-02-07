import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { COLOR } from '../../../constants/styleConstant';
import { Props } from './Button';

const CircleButtonStyle = css`
  border-radius: 50%;
`;

const DisabledButtonStyle = css`
  background-color: ${COLOR.GRAY_200};
  color: ${COLOR.GRAY_400};
  cursor: not-allowed;
`;

export const Button = styled.button<Props>`
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
  border-style: none;
  padding: 1rem;
  cursor: pointer;
  background-color: ${({ bgColor, theme }) => (bgColor ? bgColor : theme.primaryColor)};
  color: ${({ fontColor }) => (fontColor ? fontColor : COLOR.WHITE)};
  font-weight: bold;
  letter-spacing: 0.125rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 3px, rgba(0, 0, 0, 0.24) 0 1px 2px;
  overflow: hidden;
  &:focus {
    outline: none;
  }

  ${({ shape }) => shape === 'CIRCLE' && CircleButtonStyle}
  ${({ isDisabled }) => isDisabled && DisabledButtonStyle}
`;
