import { useState } from 'react';
import { useHistory } from 'react-router';
import Input from '../@commons/Input/Input';
import Button from '../@commons/Button/Button';
import { RESPONSE } from '../../constants/api';
import { authAPI } from '../../api/auth';
import {
  getAgeErrorMessage,
  getConfirmPasswordErrorMessage,
  getEmailErrorMessage,
  getPasswordErrorMessage,
} from './SignUpForm.validation';
import mailSVG from '../../assets/svg/mail.svg';
import userSVG from '../../assets/svg/user.svg';
import lockSVG from '../../assets/svg/lock.svg';
import * as S from './SignUpForm.styles';
import { BASE_URL, ROUTE } from '../../constants/route';

const SignUpForm = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
  });

  const emailErrorMessage = getEmailErrorMessage(userInfo.email);
  const ageErrorMessage = getAgeErrorMessage(userInfo.age);
  const passwordErrorMessage = getPasswordErrorMessage(userInfo.password);
  const confirmPasswordErrorMessage = getConfirmPasswordErrorMessage(userInfo.password, userInfo.confirmPassword);
  const isValidForm = !(emailErrorMessage || ageErrorMessage || passwordErrorMessage || confirmPasswordErrorMessage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidForm) return;

    const { email, age, password } = userInfo;
    const results = await Promise.all(
      Object.values(BASE_URL).map(({ URL }) => authAPI.signUp({ url: URL, email, password, age }))
    );

    const errorMessage = results.find(result => result.data !== RESPONSE.SUCCESS);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    alert('회원가입에 성공하였습니다!');
    history.push(ROUTE.SIGN_IN);
  };

  return (
    <S.SignUpForm onSubmit={handleSignUp}>
      <S.Title>회원가입</S.Title>
      <S.InputWrapper>
        <Input
          type='email'
          value={userInfo.email}
          emoji={mailSVG}
          placeholder='이메일을 입력해주세요'
          name='email'
          onChange={handleChange}
          required={true}
        />
        <S.Message>{userInfo.email && emailErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input
          type='number'
          value={userInfo.age}
          emoji={userSVG}
          placeholder='나이를 입력해주세요'
          name='age'
          onChange={handleChange}
        />
        <S.Message>{userInfo.age && ageErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input
          type='password'
          value={userInfo.password}
          emoji={lockSVG}
          placeholder='비밀번호를 입력해주세요'
          name='password'
          onChange={handleChange}
          required={true}
        />
        <S.Message>{userInfo.password && passwordErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input
          type='password'
          value={userInfo.confirmPassword}
          emoji={lockSVG}
          placeholder='비밀번호를 한번 더 입력해주세요'
          name='confirmPassword'
          onChange={handleChange}
          required={true}
        />
        <S.Message>{userInfo.confirmPassword && confirmPasswordErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.ButtonWrapper>
        <Button isDisabled={isValidForm ? false : true}>회원가입</Button>
      </S.ButtonWrapper>
    </S.SignUpForm>
  );
};

export default SignUpForm;
