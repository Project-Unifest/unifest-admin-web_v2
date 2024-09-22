import '@/App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import BoothManagePage from '@/pages/BoothManagePage';
import MemberManage from '@/pages/MemberManagePage';
import SettingPage from './pages/SettingPage';
import SelectOwnerPage from './pages/SelectOwnerPage';

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
				path: '/booth/:schoolId/:memberId/',
				element: <BoothManagePage />,
			},
			{
				path: '/setting',
				element: <SettingPage />,
			},
			{
				path: '/changeowner/:schoolId/:boothId/',
				element: <SelectOwnerPage />,
			},
		],
		{ basename: '/unifest-admin-web_v2' },
	);

	return <RouterProvider router={router} />;
}

export default App;
