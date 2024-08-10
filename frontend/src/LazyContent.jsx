import { Outlet } from 'react-router-dom';

const LazyContent = () => {
	return (
		<div className='h-full cursor-default'>
			<Outlet />
		</div>
	);
};

export default LazyContent;
