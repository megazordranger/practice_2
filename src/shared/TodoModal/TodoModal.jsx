import { useState, useEffect } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useQuery, useMutation } from '@apollo/client';
import { GET_TODO, CREATE_COMMENT } from '../../services/Todo.service';
import { AddCommentComponent } from './components/AddCommentComponent';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export const TodoModal = ({ open = false, handleClose, todoId = 0 }) => {
	const [expanded, setExpanded] = useState(false);
	const [createTodo] = useMutation(CREATE_COMMENT);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const { data: { todo = [] } = {}, refetch } = useQuery(GET_TODO, {
		variables: {
			todoId: todoId,
		},
	});

	const getTodo = async (todoId) => {
		setExpanded(false);
		await refetch({ todoId: parseInt(todoId) });
	};

	useEffect(() => {
		getTodo(todoId);
	}, [todoId]);

	const onAddComment = async ({ comment }) => {
		console.log(comment);

		await createTodo({
			variables: { data: { content: comment }, todoId: parseInt(todoId) },
		});
		await refetch();
	};

	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
					></Typography>
					<div>
						<Typography sx={{ width: '100%', flexShrink: 0, marginBottom: '10px' }}>
							{todo[0]?.dueDate.split('T')[0]} - {todo[0]?.content}
						</Typography>

						<AddCommentComponent onAddComment={onAddComment} />

						<Accordion
							expanded={expanded === 'panel1'}
							onChange={handleChange('panel1')}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1bh-content"
								id="panel1bh-header"
							>
								<Typography sx={{ color: 'text.secondary' }}>Comments</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<ul>
									{todo[0]?.comments.map(({ content, id }) => {
										return <li key={id}>{content}</li>;
									})}
								</ul>
							</AccordionDetails>
						</Accordion>
					</div>
				</Box>
			</Modal>
		</>
	);
};
