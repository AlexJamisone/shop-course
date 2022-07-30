import { FC } from 'react'
import { MenuCategory } from '../menu/menu'
import { useNavigate } from 'react-router-dom'
import './directory-item.scss'

type DirectoryItemProps = {
	category: MenuCategory
}

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
	const { imageUrl, title, route } = category
	const navigate = useNavigate()

	const onNavigateHenlder = () => navigate(route)
	return (
		<div className="directory-item-container" onClick={onNavigateHenlder}>
			<div
				className="background-image"
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			/>
			<div className="directory-item-body">
				<h2>{title}</h2>
				<p>Shop Now</p>
			</div>
		</div>
	)
}

export default DirectoryItem
