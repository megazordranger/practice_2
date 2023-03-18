import styled from 'styled-components';

const Input = styled.input`
	top: 0;
	left: 0;
	height: 15px;
	width: 25px;
	background-color: #0bb89b;
	accent-color: #0bb89b;
`;

const Container = styled.div`
	padding: 12px 20px;
	margin: 8px 0;
	margin-left: 10px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	border: 1px solid #cdd4db;
	display: flex;
	justify-content: space-between;
`;

const InputContainer = styled.div`
	display: flex;
`;

const Task = styled.div`
	padding-top: 1px;
`;

const Delete = styled.div`
	margin-right: 10px;
`;

export const TodoListComponent = ({
	id,
	todo,
	completed,
	onChangeTodo,
	onRemoveTodo,
}) => {
	const changeTodo = ({ target }) => onChangeTodo(id, target.checked);

	const removeTodo = () => onRemoveTodo(id);
	return (
		<Container aria-label="task-item">
			<InputContainer>
				<Input
					aria-label="check-task"
					type="checkbox"
					defaultChecked={completed}
					onChange={changeTodo}
				/>
				<Task>{todo}</Task>
			</InputContainer>

			<Delete aria-label="delete-task" onClick={removeTodo}>
				<div className="trash icon" style={{ color: 'red' }}></div>
			</Delete>
		</Container>
	);
};
