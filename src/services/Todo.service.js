import { gql } from '@apollo/client';

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
