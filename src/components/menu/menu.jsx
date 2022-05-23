import CategoryItem from '../category-item/castegory-item';
import './menu.scss'

const Menu = ({ categories }) => {
    return (
        <div className="menu-container">
			{categories.map(( category ) => (
				<CategoryItem key={category.id} category={category}/>	
			))}
		</div>
    )
}

export default Menu;