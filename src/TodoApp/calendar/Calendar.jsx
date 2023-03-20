import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { getTodos } from '../home/helpers/store';

const List = styled.ul`
	padding: 0;
	background: #c41e3a;
	font-family: Arial, sans serif;
	font-size: 12px;
	text-transform: uppercase;
	margin: 0;
	display: flex;
	justify-content: space-evenly;

	.selected {
		background: #800020;
	}

	.disable {
		pointer-events: none;
	}
`;

const Item = styled.li`
	display: inline-block;

	.link {
		display: block;
		padding: 10px;
		color: white;
		text-decoration: none;
	}
`;

const Status = styled.span`
	.check {
		color: #000;
		position: absolute;
		margin-left: 3px;
		margin-top: 4px;
		width: 14px;
		height: 8px;
		border-bottom: solid 1px currentColor;
		border-left: solid 1px currentColor;
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
	}

	.remove {
		color: #000;
		position: absolute;
		margin-left: 3px;
		margin-top: 10px;
	}
	.remove:before {
		content: '';
		position: absolute;
		width: 15px;
		height: 1px;
		background-color: currentColor;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}
	.remove:after {
		content: '';
		position: absolute;
		width: 15px;
		height: 1px;
		background-color: currentColor;
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
	}
`;

const TodoList = styled.div`
	margin: auto;
	max-width: 300px;
	font-family: Helvetica, Arial, sans-serif;
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
	color: #707073;
`;

const getDaysArray = function (start, end) {
	for (
		var arr = [], dt = new Date(start);
		dt <= new Date(end);
		dt.setDate(dt.getDate() + 1)
	) {
		arr.push(new Date(dt));
	}
	return arr;
};

const getWeek = (date) => {
	const dt = new Date(date); // current date of week
	const currentWeekDay = dt.getDay();
	const lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
	const wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
	const wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6));

	return getDaysArray(wkStart, wkEnd);
};

const formatDate = (date) => {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
};

const getDate = (date) => {
	const week = getWeek(date || new Date());

	return week;
};

const sameDay = (date1, date2) => {
	const d1 = new Date(date1);
	const d2 = new Date(date2);

	return (
		d1.getFullYear() === d2.getFullYear() &&
		d1.getMonth() === d2.getMonth() &&
		d1.getDate() === d2.getDate()
	);
};

const parseDate = (date) => {
	return date ? date.split('-') : new Date();
};

const getPreviousDay = (date = new Date()) => {
	const previous = new Date(date.getTime());
	previous.setDate(date.getDate() - 1);

	return previous;
};

const getNextDay = (date = new Date()) => {
	const next = new Date(date.getTime());
	next.setDate(date.getDate() + 1);

	return next;
};

const isBeforeToday = (dateValue) => {
	const today = formatDate(new Date());
	const date = formatDate(dateValue);

	return new Date(date) < new Date(today);
};

export const Calendar = () => {
	const { date } = useParams();
	const [dateParsed, setDateParsed] = useState(parseDate(date));
	const [week, setWeek] = useState(getDate(date));
	const [todo, setTodo] = useState([]);
	const [prevWeekDay, setPrevWeekDay] = useState();
	const [nextWeekDay, setNextWeekDay] = useState();

	useEffect(() => {
		const todoList = getTodos();
		setTodo(todoList);

		const parsedDate = parseDate(date);
		const newWeek = getDate(parsedDate);

		setWeek(newWeek);
		setDateParsed(parsedDate);
		setPrevWeekDay(getPreviousDay(newWeek[0]));
		setNextWeekDay(getNextDay(newWeek[6]));
	}, [date]);

	return (
		<>
			<List>
				<Item className={isBeforeToday(prevWeekDay) && 'disable'}>
					<NavLink className="link" to={'/calendar/' + formatDate(prevWeekDay)}>
						{'<'}
					</NavLink>
				</Item>
				{week.map((item) => (
					<Item
						key={formatDate(item)}
						className={`${sameDay(dateParsed, item) && 'selected'} ${
							isBeforeToday(item) && 'disable'
						}`}
					>
						<NavLink className="link" to={'/calendar/' + formatDate(item)}>
							{formatDate(item)}
						</NavLink>
					</Item>
				))}
				<Item className={isBeforeToday(nextWeekDay) && 'disable'}>
					<NavLink className="link" to={'/calendar/' + formatDate(nextWeekDay)}>
						{'>'}
					</NavLink>
				</Item>
			</List>

			<TodoList>
				{todo.map(
					({ id, todo, completed, date }) =>
						sameDay(dateParsed, date) && (
							<Container key={id}>
								<ul style={{ listStyleType: 'none' }}>
									<li>Todo: {todo}</li>
									<li>Date: {formatDate(date)}</li>
									<li style={{ display: 'flex' }}>
										Complete:
										{
											<Status>
												<div className={completed ? 'check' : 'remove'}></div>
											</Status>
										}
									</li>
								</ul>
							</Container>
						)
				)}
			</TodoList>
		</>
	);
};
