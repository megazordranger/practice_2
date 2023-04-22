import { useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
	width: 267px;
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

export const AddCommentComponent = ({ onAddComment }) => {
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

		onAddComment({ comment: newInputValue });
		setInputValue('');
	};

	return (
		<form onSubmit={onSubmit}>
			<Input
				type="text"
				placeholder="Comment"
				value={inputValue}
				onChange={onChange}
				aria-label="input-comment"
			/>

			<Button type="submit" aria-label="comment">
				Add comment
			</Button>
		</form>
	);
};
