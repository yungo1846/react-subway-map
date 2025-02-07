import React from 'react';
import { Color } from '../../../constants/styleType';
import * as S from './Input.styles';

export interface Props {
  type?: 'email' | 'number' | 'password' | 'submit' | 'text';
  emoji?: string;
  label?: string;
  placeholder?: string;
  borderColor?: Color;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value?: string | number;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ type = 'text', emoji, label, placeholder, borderColor, name, onChange, required, value }, ref) => {
    return (
      <S.InputContainer>
        {label && <S.Label>{label}</S.Label>}
        {emoji && <S.Emoji src={emoji} />}
        <S.Input
          ref={ref}
          type={type}
          value={value}
          placeholder={placeholder}
          borderColor={borderColor}
          emoji={emoji}
          name={name}
          onChange={onChange}
          required={required}
        />
      </S.InputContainer>
    );
  }
);

export default Input;
