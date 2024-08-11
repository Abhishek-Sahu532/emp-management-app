import React from 'react';
import {
	Navbar,
	Typography,
	Button,
	IconButton,
	Collapse,
	Avatar,
} from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { sigOutSuccess } from '../redux/users/userSlice';

export default function StickyNavbar() {
	const [openNav, setOpenNav] = React.useState(false);
	const { success } = useSelector((state) => state.user);
  // console.log(success)
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handelLogout = async () => {
		try {
			const res = await axios.get('/api/v1/users/sign-out');

			const resData = res.data;
			if (resData.success === true) {
				dispatch(sigOutSuccess());
				navigate('/');
			}
		} catch (error) {
			console.error(error);
		}
	};

	React.useEffect(() => {
		window.addEventListener(
			'resize',
			() => window.innerWidth >= 960 && setOpenNav(false),
		);
	}, []);

	return (
		<div>
			<Navbar className='max-w-full rounded-none px-4 lg:px-8 lg:py-4'>
				<div className='flex items-center justify-between text-blue-gray-900'>
					<Typography
						as='a'
						href='/'
						className='mr-4 cursor-pointer font-medium'>
						Logo
					</Typography>
					<div className='flex items-center gap-4'>
						{!success ? (
							<div className='flex items-center gap-x-1'>
								<Button
									variant='text'
									size='sm'
									className='hidden lg:inline-block'>
									<span>
										<Link to={'/sign-in'}>Sign in </Link>
									</span>
								</Button>
								<Button
									variant='gradient'
									size='sm'
									className='hidden lg:inline-block'>
									<span>
										<Link to={'/sign-up'}>Sign up </Link>
									</span>
								</Button>
							</div>
						) : (
							<Menu>
								<MenuHandler>
									<Avatar
										src='/User.jpg'
										alt='avatar'
										variant='rounded'
									/>
								</MenuHandler>
								<MenuList>
									<MenuItem>
										<span onClick={handelLogout}>Sign out</span>
									</MenuItem>
								</MenuList>
							</Menu>
						)}

						<IconButton
							variant='text'
							className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
							ripple={false}
							onClick={() => setOpenNav(!openNav)}>
							{openNav ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									className='h-6 w-6'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth={2}>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6'
									fill='none'
									stroke='currentColor'
									strokeWidth={2}>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M4 6h16M4 12h16M4 18h16'
									/>
								</svg>
							)}
						</IconButton>
					</div>
				</div>
				<Collapse open={openNav}>
					{!success ? (
						<div className='flex items-center gap-x-1'>
							<Button
								variant='text'
								size='sm'
								className=' lg:inline-block'>
								<span>
									<Link to={'/sign-in'}>Sign in </Link>
								</span>
							</Button>
							<Button
								variant='gradient'
								size='sm'
								className=' lg:inline-block'>
								<span>
									<Link to={'/sign-up'}>Sign up </Link>
								</span>
							</Button>
						</div>
					) : (
						<Menu>
							<MenuHandler>
								<Avatar
									src='/User.jpg'
									alt='avatar'
									variant='rounded'
								/>
							</MenuHandler>
							<MenuList>
								<MenuItem onClick={handelLogout}>
									<span >Sign out</span>
								</MenuItem>
							</MenuList>
						</Menu>
					)}
				</Collapse>
			</Navbar>
		</div>
	);
}