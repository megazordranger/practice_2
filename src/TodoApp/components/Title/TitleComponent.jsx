import styled from 'styled-components';

const Title = styled.div`
	font-size: 4rem;
	font-weight: 700;
	color: white;
	background: #5795f4;

	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
`;

export const TitleComponent = () => {
	return <Title>Todo List</Title>;
};
