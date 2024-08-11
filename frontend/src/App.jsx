import { useState, Suspense, lazy, useEffect } from 'react';
import Loader from './components/Loader.jsx';
import StickyNavbar from './components/StickyNavbar.jsx';
import SimpleFooter from './components/SimpleFooter.jsx';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	currentUserStart,
	currentUserSuccess,
	currentUserFailure,
} from './redux/users/userSlice.js';
import { extractErrorMessage } from './extractErrorMessage.jsx';

const LazyContent = lazy(() => import('./LazyContent'));

// const apiUrl = String(import.meta.env.VITE_URL_API);

function App() {
	const dispatch = useDispatch();
	// const navigate = useNavigate();

	// const { success } = useSelector((state) => state.user);
	const [showContent, setShowContent] = useState(false);
	const loading = false;

	useEffect(() => {
		setShowContent(true);
	}, []);

	useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				dispatch(currentUserStart());
				const res = await axios.get('/api/v1/users/current-user');
				// console.log('res', res.data);
				dispatch(currentUserSuccess(res.data.data));
			} catch (error) {
				let htmlError = extractErrorMessage(error.response?.data);
				// console.log(htmlError);
				dispatch(currentUserFailure(htmlError || error.message));
			}
		};
		fetchCurrentUser();
	}, [dispatch]);

	return (
		<>
			<div className='sticky top-0 z-10'>
				<StickyNavbar />
			</div>

			{showContent ? (
				<Suspense fallback={<Loader />}>
					{loading ? (
						<div className='min-h-screen w-full flex items-center justify-center '>
							<Loader />
						</div>
					) : (
						<div>
							<LazyContent />
						</div>
					)}
				</Suspense>
			) : (
				<div className='min-h-screen w-full flex items-center justify-center '>
					<Loader />
				</div>
			)}
			<SimpleFooter />
		</>
	);
}

export default App;
