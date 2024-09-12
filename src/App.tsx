import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import BoothManagePage from '@/pages/BoothManagePage';
import MemberManage from '@/pages/MemberManagePage';

function App() {
	const router = createBrowserRouter([
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
	]);

	return <RouterProvider router={router} />;
}

export default App;
