import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ProfileScreen = ({ history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error, loading, user } = userDetails;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords are not match');
		} else {
			dispatch(updateUserProfile({ _id: user._id, name, email, password }));
		}
	};

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user || !user.name) {
				// get user profile details
				dispatch(getUserDetails('profile'));
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user]);

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{success && <Message variant='success'>Profile updated</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='Name'
							placeholder='Enter Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='Email'
							placeholder='Enter Email'
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter Password'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm Password'
							onChange={(e) => setConfirmPassword(e.target.value)}
							value={confirmPassword}
						></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary'>
						Save
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h1>User Order</h1>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
