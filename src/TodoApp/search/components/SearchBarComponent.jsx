import { useState } from 'react';
import styled from 'styled-components';

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

export const SearchBarComponent = ({ onSearch }) => {
	const [inputValue, setInputValue] = useState('');

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

		onSearch({ key: newInputValue });
		setInputValue('');
	};

	return (
		<form onSubmit={onSubmit}>
			<Input
				type="text"
				placeholder="Search"
				value={inputValue}
				onChange={onChange}
				aria-label="input-search"
			/>

			<Button type="submit" aria-label="search">
				Search
			</Button>
		</form>
	);
};
