import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

const ErrorMessage = styled.div`
	color: red;
`;

const Signup = () => {
	const [id, onChangeId] = useInput('');
	const [password, onChangePassword] = useInput('');
	const [nickname, onChangeNickname] = useInput('');

	// passwordCheck은 setPasswordError가 추가적으로 있으므로, 커스텀훅 useInput을 사용하지 못함
	const [passwordCheck, setPasswordCheck] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const onChangePasswordCheck = useCallback(
		(e) => {
			setPasswordCheck(e.target.value);
			setPasswordError(e.target.value !== password);
		},
		[password]
	);

	// 약관 동의
	const [term, setTerm] = useState('');
	const [termError, setTermError] = useState(false);
	const onChangeTerm = useCallback((e) => {
		setTerm(e.target.checked);
		setTermError(false);
	}, []);

	// 폼 제출
	const onSubmit = useCallback(() => {
		if (password !== passwordCheck) {
			return setPasswordError(true);
		}

		if (!term) {
			return setTermError(true);
		}
		console.log(id, nickname, password);
	}, [password, passwordCheck, term]);

	return (
		<AppLayout>
			<Head>
				<title>회원가입 | NodeBird</title>
			</Head>
			<Form onFinish={onSubmit}>
				<div>
					<label htmlFor="user-id">아이디</label>
					<br />
					<Input name="user-id" value={id} required onChange={onChangeId} />
				</div>
				<div>
					<label htmlFor="user-nick">닉네임</label>
					<br />
					<Input
						name="user-nick"
						value={nickname}
						required
						onChange={onChangeNickname}
					/>
				</div>
				<div>
					<label htmlFor="user-password">비밀번호</label>
					<br />
					<Input
						name="user-password"
						type="password"
						value={password}
						required
						onChange={onChangePassword}
					/>
				</div>
				<div>
					<label htmlFor="user-password">비밀번호 체크</label>
					<br />
					<Input
						name="user-password"
						type="password"
						value={passwordCheck}
						required
						onChange={onChangePasswordCheck}
					/>
					{passwordError && (
						<ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
					)}
				</div>
				<div>
					<Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
						제로초 말을 잘 들을 것을 동의합니다.
					</Checkbox>
					{termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
				</div>
				<div style={{ marginTop: 10 }}>
					<Button type="primary" htmlType="submit">
						가입
					</Button>
				</div>
			</Form>
		</AppLayout>
	);
};

export default Signup;
