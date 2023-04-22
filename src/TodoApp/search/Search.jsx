import { useState } from 'react';
import { SearchBarComponent } from './components/SearchBarComponent';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { SEARCH } from '../../services/Todo.service';
import { TodoModal } from '../../shared/TodoModal/TodoModal';

const StyledContainer = styled.div`
	margin: auto;
	pading: 0 5%;
	max-width: 800px;
	text-align: center;
	font-family: Helvetica, Arial, sans-serif;
`;

const TodoList = styled.div`
	margin: auto;
	max-width: 800px;
	font-family: Helvetica, Arial, sans-serif;
`;

const Container = styled.div`
	padding: 12px 12px;
	margin: 10px 6px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	border: 1px solid #cdd4db;
	display: flex;
	justify-content: space-between;
	color: #707073;
`;

export const Search = () => {
	const [todoId, setTodoId] = useState();
	const [open, setOpen] = useState(false);
	const handleOpen = (id) => () => {
		setTodoId(id);
		setOpen(true);
	};
	const handleClose = () => setOpen(false);

	const { data: { todoSearch } = {}, refetch } = useQuery(SEARCH, {
		variables: {
			key: '',
		},
	});

	const onSearch = async ({ key }) => {
		console.log(key);

		await refetch({ key });
	};

	return (
		<>
			<StyledContainer>
				<SearchBarComponent onSearch={onSearch} />
			</StyledContainer>

			<TodoList>
				{todoSearch?.map(({ id, content, comments }) => (
					<Container key={id} onClick={handleOpen(id)}>
						<ul style={{ listStyleType: 'none' }}>
							{/* <li>Type: {type}</li> */}
							<li>Content: {content}</li>
						</ul>
					</Container>
				))}
			</TodoList>

			<TodoModal open={open} handleClose={handleClose} todoId={todoId} />
		</>
	);
};
