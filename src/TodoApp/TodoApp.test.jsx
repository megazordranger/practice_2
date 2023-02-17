import { fireEvent, render, screen } from '@testing-library/react';
import { TodoApp } from './TodoApp';

describe('Test on <TodoApp />', () => {
	const getElements = (screen) => {
		const input = screen.getByLabelText('input-task');
		const button = screen.getByLabelText('add-task');
		const reset = screen.getByLabelText('reset-todo-list');
		const remaining = screen.getByLabelText('remaining-tasks');

		fireEvent.click(reset);

		return {
			input,
			button,
			reset,
			remaining,
		};
	};

	test('should can add 2 tasks with diferent value', () => {
		render(<TodoApp />);

		const { input, button } = getElements(screen);

		fireEvent.change(input, { target: { value: 'task 1' } });
		fireEvent.click(button);
		fireEvent.change(input, { target: { value: 'task 2' } });
		fireEvent.click(button);

		const tasks = screen.getAllByLabelText('task-item');

		expect(tasks.length).toBe(2);
	});

	test("should can't add 2 tasks with same value", () => {
		render(<TodoApp />);

		const { input, button } = getElements(screen);

		fireEvent.change(input, { target: { value: 'task 1' } });
		fireEvent.click(button);
		fireEvent.change(input, { target: { value: 'task 1' } });
		fireEvent.click(button);

		const tasks = screen.getAllByLabelText('task-item');

		expect(tasks.length).toBe(1);
	});

	test('should can reset todo list', () => {
		render(<TodoApp />);

		const { input, button, reset } = getElements(screen);

		fireEvent.change(input, { target: { value: 'task 1' } });
		fireEvent.click(button);
		fireEvent.change(input, { target: { value: 'task 2' } });
		fireEvent.click(button);
		fireEvent.change(input, { target: { value: 'task 3' } });
		fireEvent.click(button);

		fireEvent.click(reset);

		const tasks = screen.queryAllByLabelText('task-item');

		expect(tasks.length).toBe(0);
	});

	test('should can mark task as completed', () => {
		render(<TodoApp />);

		const { input, button, remaining } = getElements(screen);

		fireEvent.change(input, { target: { value: 'task 1' } });
		fireEvent.click(button);
		fireEvent.change(input, { target: { value: 'task 2' } });
		fireEvent.click(button);

		const checks = screen.queryAllByLabelText('check-task');
		fireEvent.click(checks[1]);
		const reamainingValue = Number(
			remaining.innerHTML.replace(/^Remaining: /, '')
		);

		expect(reamainingValue).toBe(1);
	});

	test('should can delete task', () => {
		render(<TodoApp />);

		const { input, button } = getElements(screen);

		fireEvent.change(input, { target: { value: 'task 1' } });
		fireEvent.click(button);
		fireEvent.change(input, { target: { value: 'task 2' } });
		fireEvent.click(button);

		const deletes = screen.queryAllByLabelText('delete-task');

		fireEvent.click(deletes[1]);

		const tasks = screen.getAllByLabelText('task-item');

		expect(tasks.length).toBe(1);
	});
});
