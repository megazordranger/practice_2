import { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const Input = styled.input`
	width: calc(100% - 105px);
	padding: 12px 20px;
	margin: 8px 0;
	display: inline-block;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
	outline: none;
`;

const Button = styled.button`
	background-color: #0bb89b;
	color: white;
	padding: 12px 20px;
	margin: 8px 0;
	margin-left: 10px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

const charlimit = 300;

export const AddTodoComponent = ({ onNewTodo }) => {
	const [inputValue, setInputValue] = useState('');
	const [pickerValue, setPickerValue] = useState(new Date());

	const onChange = ({ target: { value } }) => {
		setInputValue(value);

		if (value.length > charlimit) {
			const slicedValue = value.slice(0, charlimit);

			setInputValue(slicedValue);
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		const newInputValue = inputValue.trim();

		if (newInputValue.length <= 0) return;

		onNewTodo({ todo: newInputValue, date: pickerValue });
		setInputValue('');
		setPickerValue(new Date());
	};

	return (
		<form onSubmit={onSubmit}>
			<Input
				type="text"
				placeholder="Todo"
				value={inputValue}
				onChange={onChange}
				aria-label="input-task"
			/>

			<DatePicker
				clearIcon={null}
				minDate={new Date()}
				onChange={setPickerValue}
				value={pickerValue}
			/>

			<Button type="submit" aria-label="add-task">
				Add todo
			</Button>
		</form>
	);
};
