import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ErrorPage from '../pages/Error';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/sign-in',
				element: <Signin />,
			},

			{
				path: '/sign-up',
				element: <Signup />,
			},
		],
	},
]);

export default router;
