import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MemberManage from './pages/MemberManagePAge';

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
	]);

	return <RouterProvider router={router} />;
}

export default App;
