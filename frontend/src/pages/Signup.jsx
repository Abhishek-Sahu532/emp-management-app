import { useForm } from 'react-hook-form';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	signUpUser,
	signUpUserFailure,
	signUpUserSuccess,
} from '../redux/users/userSlice';
import { toast } from 'react-toastify';
import { extractErrorMessage } from '../extractErrorMessage.jsx';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		// Handle signup logic here
		dispatch(signUpUser());
		try {
			const response = await axios.post('/api/v1/users/sign-up', data, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			// console.log(response);
			dispatch(signUpUserSuccess(response.data.data.message));
			toast.success(response.data.data.message);
			navigate('/sign-in');
		} catch (error) {
			let htmlError = extractErrorMessage(error.response?.data);
			dispatch(signUpUserFailure(htmlError || error.message));
			toast.error(htmlError || error.message);
		}
	};

	return (
		<Card
			color='transparent'
			shadow={false}
			className='flex justify-center items-center m-2 p-4'>
			<Typography
				variant='h4'
				color='blue-gray'>
				Sign Up
			</Typography>
			<Typography
				color='gray'
				className='mt-1 font-normal'>
				Nice to meet you! Enter your details to register.
			</Typography>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='my-2 w-80 max-w-screen-lg sm:w-96'>
				<div className='flex flex-col gap-4'>
					<Input
						size='sm'
						label='First Name'
						placeholder='John'
						{...register('firstName', { required: 'First name is required' })}
						error={errors.firstName}
					/>
					{errors.firstName && (
						<p className='text-red-500 text-xs mt-1'>
							{errors.firstName.message}
						</p>
					)}

					<Input
						size='sm'
						label='Last Name'
						placeholder='Doe'
						{...register('lastName', { required: 'Last name is required' })}
						error={errors.lastName}
					/>
					{errors.lastName && (
						<p className='text-red-500 text-xs mt-1'>
							{errors.lastName.message}
						</p>
					)}

					<Input
						size='sm'
						placeholder='name@mail.com'
						label='Email'
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Invalid email address',
							},
						})}
						error={errors.email}
					/>
					{errors.email && (
						<p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>
					)}

					<Input
						size='sm'
						label='Hobbies'
						placeholder='Singing, Dancing, Reading, etc...'
						{...register('hobbies', { required: 'Hobbies is required' })}
						error={errors.hobbies}
					/>
					{errors.hobbies && (
						<p className='text-red-500 text-xs mt-1'>
							{errors.hobbies.message}
						</p>
					)}

					<Input
						type='password'
						size='sm'
						label='Password'
						placeholder='********'
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 8,
								message: 'Password must be at least 8 characters long',
							},
						})}
						error={errors.password}
					/>
					{errors.password && (
						<p className='text-red-500 text-xs mt-1'>
							{errors.password.message}
						</p>
					)}
				</div>

				<Button
					className='mt-6'
					fullWidth
					type='submit'>
					Sign Up
				</Button>
				<Typography
					color='gray'
					className='mt-4 text-center font-normal'>
					Already have an account?{' '}
					<a
						href='/signin'
						className='font-medium text-gray-900'>
						Sign In
					</a>
				</Typography>
			</form>
		</Card>
	);
}
