import { useForm } from 'react-hook-form';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import {
	signInStart,
	signInSuccess,
	signInFailure,
} from '../redux/users/userSlice';
import { useDispatch } from 'react-redux';
import { extractErrorMessage } from '../extractErrorMessage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signin() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			dispatch(signInStart());
			const config = { headers: { 'Content-Type': 'application/json' } };
			const res = await axios.post(`/api/v1/users/sign-in`, data, config);
			dispatch(signInSuccess(res.data));
			navigate('/');
		} catch (error) {
			let htmlError = extractErrorMessage(error.response?.data);
			dispatch(signInFailure(htmlError || error.message));
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
				Sign In
			</Typography>
			<Typography
				color='gray'
				className='mt-1 font-normal'>
				Welcome back! Enter your credentials to access your account.
			</Typography>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='my-2 w-80 max-w-screen-lg sm:w-96'>
				<div className='flex flex-col gap-6'>
					<div className='w-full'>
						<Typography
							variant='h6'
							color='blue-gray'
							className='mb-1'>
							Your Email
						</Typography>
						<Input
							size='sm'
							placeholder='name@mail.com'
							className='!border-t-blue-gray-200 focus:!border-t-gray-900'
							labelProps={{
								className: 'before:content-none after:content-none',
							}}
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
							<p className='text-red-500 text-xs mt-1'>
								{errors.email.message}
							</p>
						)}
					</div>
					<div>
						<Typography
							variant='h6'
							color='blue-gray'
							className='mb-1'>
							Password
						</Typography>
						<Input
							type='password'
							size='sm'
							placeholder='********'
							className='!border-t-blue-gray-200 focus:!border-t-gray-900'
							labelProps={{
								className: 'before:content-none after:content-none',
							}}
							{...register('password', { required: 'Password is required' })}
							error={errors.password}
						/>
						{errors.password && (
							<p className='text-red-500 text-xs mt-1'>
								{errors.password.message}
							</p>
						)}
					</div>
				</div>

				<Button
					className='mt-6'
					fullWidth
					type='submit'>
					Sign In
				</Button>
				<Typography
					color='gray'
					className='mt-4 text-center font-normal'>
					Do not have an account?{' '}
					<a
						href='/signup'
						className='font-medium text-gray-900'>
						Sign Up
					</a>
				</Typography>
			</form>
		</Card>
	);
}
