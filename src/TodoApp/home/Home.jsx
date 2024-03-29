import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { AddTodoComponent } from './components/AddTodo/AddTodoComponent';
import { TodoListComponent } from './components/TodoList/TodoListComponent';
import { getTodos, saveTodos } from './helpers/store';

const getId = () => {
	return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
};

const getIndexById = (list, id) => {
	return list.findIndex((item) => item.id === id);
};

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
	const [todo, setTodo] = useState([]);
	const [remaining, setRemaining] = useState([]);

	useEffect(() => {
		const todoList = getTodos();
		setTodo(todoList);
		updateRemaining(todoList);
	}, []);

	const onAddTodo = ({ todo: newTodo, date }) => {
		if (todo.find(({ todo }) => todo === newTodo)) return;

		const item = {
			id: getId(),
			todo: newTodo,
			date,
			completed: false,
		};
		const list = [item, ...todo];

		updateTodoList(list);
	};

	const onChangeTodo = (id, status) => {
		const index = getIndexById(todo, id);
		todo[index].completed = status;

		updateTodoList(todo);
	};

	const onRemoveTodo = (id) => {
		const index = getIndexById(todo, id);
		const list = [...todo];
		list.splice(index, 1);

		updateTodoList(list);
	};

	const removeAll = () => updateTodoList([]);

	const updateTodoList = (todo) => {
		saveTodos(todo);
		setTodo(todo);
		updateRemaining(todo);
	};

	const updateRemaining = (todo) => {
		const remainingCounter = todo.filter((item) => !item.completed).length;
		setRemaining(remainingCounter);
	};

	return (
		<StyledContainer>
			<Title>Todo List</Title>
			<AddTodoComponent onNewTodo={onAddTodo} />
			<RemainingButton aria-label="remaining-tasks">
				Remaining: {remaining}
			</RemainingButton>
			<Button aria-label="reset-todo-list" onClick={removeAll}>
				Delete all
			</Button>
			<div aria-label="todo-list">
				{todo.map((todo) => {
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
