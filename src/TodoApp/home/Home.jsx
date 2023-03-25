import { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';

import { AddTodoComponent } from './components/AddTodo/AddTodoComponent';
import { TodoListComponent } from './components/TodoList/TodoListComponent';
import {
	GET_TODOS,
	GET_TODOS_COUNT,
	ADD_TODO,
	TOGGLE_COMPLETED,
	DELETE_TODO,
	DELETE_ALL_TODOS,
} from '../../services/Todo.service';
import { formatDate } from '../../services/Date.service';
import { PaginationItem } from '../components/Pagination';

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

const StyledContainer = styled.div`
	margin: auto;
	pading: 0 5%;
	max-width: 800px;
	text-align: center;
	font-family: Helvetica, Arial, sans-serif;
`;

const Button = styled.button`
	background-color: #dc3545;
	color: white;
	padding: 12px 20px;
	margin: 8px 0;
	margin-left: 10px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

const RemainingButton = styled(Button)`
	background-color: white;
	color: #dc3545;
	border: 1px solid #dc3545;
`;

export const Home = () => {
	const [page, setPage] = useState(1);
	const [addTodo] = useMutation(ADD_TODO);
	const [toggleCompleted] = useMutation(TOGGLE_COMPLETED);
	const [deleteTodo] = useMutation(DELETE_TODO);
	const [deleteAllTodos] = useMutation(DELETE_ALL_TODOS);
	const { data: { allTodosCount } = {}, refetch: refetchCountTodos } = useQuery(
		GET_TODOS_COUNT,
		{ notifyOnNetworkStatusChange: true }
	);
	const { data: { allTodos } = {}, refetch } = useQuery(
		GET_TODOS,
		{
			variables: {
				limit: 10,
				skip: 0,
			},
		},
		{ notifyOnNetworkStatusChange: true }
	);

	const onAddTodo = async ({ todo: newTodo, date }) => {
		const fomatedDate = formatDate(date) + 'T00:00:00.000Z';

		const item = {
			content: newTodo,
			dueDate: fomatedDate,
			completed: false,
		};
		await addTodo({ variables: { data: item, userId: 1 } });

		updateTodoList();
	};

	const onChangeTodo = async (id) => {
		await toggleCompleted({ variables: { toggleTodoCompletedId: id } });
		updateTodoList();
	};

	const updatePageOnDelete = () => {
		if (allTodos?.length === 1 && page > 1) onChangePage(null, page - 1);
	};

	const onRemoveTodo = async (id) => {
		await deleteTodo({ variables: { deleteTodoId: id } });
		updateTodoList();
		updatePageOnDelete();
	};

	const removeAll = async () => {
		await deleteAllTodos();
		updateTodoList();
	};

	const updateTodoList = async () => {
		refetchCountTodos();
		refetch();
	};

	const onChangePage = async (event, page) => {
		setPage(page);
		const skip = 10 * (page - 1);

		refetch({ skip });
		refetchCountTodos();
	};

	return (
		<StyledContainer>
			<Title>Todo List</Title>
			<AddTodoComponent onNewTodo={onAddTodo} />
			<RemainingButton aria-label="remaining-tasks">
				Remaining: {allTodosCount?.count}
			</RemainingButton>
			<Button aria-label="reset-todo-list" onClick={removeAll}>
				Delete all
			</Button>

			<PaginationItem onChange={onChangePage} />

			<div aria-label="todo-list">
				{allTodos?.map((todo) => {
					return (
						<TodoListComponent
							key={todo.id}
							{...todo}
							onChangeTodo={onChangeTodo}
							onRemoveTodo={onRemoveTodo}
						/>
					);
				})}
			</div>
		</StyledContainer>
	);
};
