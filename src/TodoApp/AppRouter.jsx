import { Route, Routes } from 'react-router-dom';
import { Home } from './home/Home';
import { Navbar } from './components/Navbar';
import { Calendar } from './calendar/Calendar';
import { Search } from './search/Search';

export const AppRouter = () => {
	return (
		<>
			<Navbar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/calendar/" element={<Calendar />} />
				<Route path="/calendar/:date" element={<Calendar />} />
				<Route path="/search" element={<Search />} />
			</Routes>
		</>
	);
};
