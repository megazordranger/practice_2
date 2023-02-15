export const getTodos = () => {
	const list = sessionStorage.getItem('todolist');
	const todoList = list ? JSON.parse(list) : [];

	return todoList;
};

export const saveTodos = (todoList) => {
	return sessionStorage.setItem('todolist', JSON.stringify(todoList));
};
