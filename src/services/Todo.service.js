import { gql } from '@apollo/client';

export const GET_TODO = gql`
	query GetTodo($todoId: Int!) {
		todo(id: $todoId) {
			id
			content
			dueDate
			comments {
				content
				id
			}
		}
	}
`;

export const GET_TODOS = gql`
	query GetTodos($skip: Int!, $limit: Int!) {
		allTodos(skip: $skip, limit: $limit) {
			completed
			content
			dueDate
			id
		}
	}
`;

export const GET_TODOS_BY_DATE = gql`
	query TodosByDueDate($dueDate: DateTime!, $skip: Int!, $limit: Int!) {
		todosByDueDate(dueDate: $dueDate, skip: $skip, limit: $limit) {
			completed
			content
			dueDate
			id
		}
	}
`;

export const GET_TODOS_COUNT = gql`
	query GetTodosCount {
		allTodosCount {
			count
		}
	}
`;

export const GET_TODOS_COUNT_BY_DATE = gql`
	query GetTodosCountByDate($dueDate: DateTime!) {
		allTodosCountByDueDate(dueDate: $dueDate) {
			count
		}
	}
`;

export const ADD_TODO = gql`
	mutation Mutation($data: TodoCreateInput!, $userId: Int!) {
		createTodo(data: $data, userId: $userId) {
			completed
			content
			dueDate
			id
		}
	}
`;

export const TOGGLE_COMPLETED = gql`
	mutation ToggleTodoCompleted($toggleTodoCompletedId: Int!) {
		toggleTodoCompleted(id: $toggleTodoCompletedId) {
			completed
		}
	}
`;

export const DELETE_TODO = gql`
	mutation DeleteTodo($deleteTodoId: Int!) {
		deleteTodo(id: $deleteTodoId) {
			id
		}
	}
`;

export const DELETE_ALL_TODOS = gql`
	mutation DeleteAllTodos {
		deleteAllTodos {
			count
		}
	}
`;

export const CREATE_COMMENT = gql`
	mutation CreateComment($data: CommentCreateInput!, $todoId: Int!) {
		createComment(data: $data, todoId: $todoId) {
			content
			createdAt
			id
			updatedAt
		}
	}
`;

export const SEARCH = gql`
	query Search($key: String!) {
		todoSearch(key: $key) {
			todoId
			id
			content
			comments {
				content
			}
		}
	}
`;
