import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import {
	GET_TODOS_COUNT,
	GET_TODOS_COUNT_BY_DATE,
} from '../../services/Todo.service';

const PaginationContainer = styled.div`
	margin: auto;
	margin-top: 15px;
	width: fit-content;
`;

const getPageCount = (items = 10, { count = 0 }) => Math.ceil(count / items);

const getQuery = (date) => {
	if (date) {
		return [
			GET_TODOS_COUNT_BY_DATE,
			{
				variables: {
					dueDate: date + 'T00:00:00.000Z',
				},
			},
		];
	}

	return [GET_TODOS_COUNT];
};

export const PaginationItem = ({
	onChange,
	itemsPerPage: items,
	date,
	page,
}) => {
	const {
		data: { allTodosCount, allTodosCountByDueDate } = {},
		refetch: refetchCountTodos,
	} = useQuery(...getQuery(date));

	return (
		(allTodosCount || allTodosCountByDueDate)?.count > 0 && (
			<PaginationContainer>
				<Pagination
					count={getPageCount(items, allTodosCount || allTodosCountByDueDate)}
					onChange={onChange}
					page={page}
				/>
			</PaginationContainer>
		)
	);
};
