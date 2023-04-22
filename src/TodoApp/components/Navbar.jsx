import styled from 'styled-components';

const List = styled.ul`
	padding: 0;
	background: black;
	font-family: Arial, sans serif;
	font-size: 12px;
	text-transform: uppercase;
	margin: 0;
`;

const Item = styled.li`
	display: inline-block;
`;

const Link = styled.a`
	display: block;
	padding: 10px;
	color: white;
	text-decoration: none;
`;

export const Navbar = () => {
	return (
		<List>
			<Item>
				<Link href="/">Home</Link>
			</Item>
			<Item>
				<Link href="/calendar">Calendar</Link>
			</Item>
			<Item>
				<Link href="/search">Search</Link>
			</Item>
		</List>
	);
};
