import { Outlet } from 'react-router-dom'
import Menu from '../../components/menu/menu'

const Home = () => {
	return (
		<div>
			<Outlet />
			<Menu />
		</div>
	)
}

export default Home
