import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation";
import SignIn from "./routes/signin/sign-in";
import Home from './routes/home/home';

const Shop = () => {
	return <h1>I am aa SHOP Page</h1>
}
const App = () => {  
	return (
		<Routes>
			<Route path="/" element={<Navigation/>}>
				<Route index element={<Home/>}/>
				<Route path="shop" element={<Shop/>}/>
				<Route path="sign-in" element={<SignIn/>}/>
			</Route>
		</Routes>
	);
}

export default App;
