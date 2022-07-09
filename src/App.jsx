import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation";
import Home from './routes/home/home';
import Auth from "./routes/auth/auth";

const Shop = () => {
	return <h1>I am aa SHOP Page</h1>
}
const App = () => {  
	return (
		<Routes>
			<Route path="/" element={<Navigation/>}>
				<Route index element={<Home/>}/>
				<Route path="shop" element={<Shop/>}/>
				<Route path="auth" element={<Auth/>}/>
			</Route>
		</Routes>
	);
}

export default App;
