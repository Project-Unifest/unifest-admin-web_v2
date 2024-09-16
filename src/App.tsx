import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import BoothManagePage from './pages/BoothManagePage';
import MemberManage from './pages/MemberManagePage';
import { basename } from 'path';

function App() {
	const router = createBrowserRouter(
		[
			{
				path: '/login',
				element: <LoginPage />,
			},
			{
				path: '/',
				element: <MemberManage />,
			},
			{
				path: '/booth/:memberId',
				element: <BoothManagePage />,
			},
		],
		{ basename: '/unifest-admin-web_v2' },
	);

	return <RouterProvider router={router} />;
}

export default App;
