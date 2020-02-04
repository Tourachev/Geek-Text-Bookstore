import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		width: 600,
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}));

class MyForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {username: this.props.username, newPassword: ''};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(evt) {
		this.setState({[evt.target.name]: evt.target.value});
	}

	mySubmitHandler = event => {
		event.preventDefault();

		fetch('/personal-info/change-password', {
			method: 'POST',
			body: JSON.stringify({
				username: this.props.username,
				newPassword: this.state.newPassword
			}),
			headers: {'Content-Type': 'application/json'}
		})
			.then(res => res.json())
			.catch(err => {
				console.log(err);
			});

		alert('Submitted!');
		this.props.closeMethod();
	};
	render() {
		return (
			<form onSubmit={this.mySubmitHandler}>
				<p>Enter New Password:</p>
				<input
					type='password'
					name='newPassword'
					pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
					title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
					onChange={this.handleChange}
					className='form-control'
					required
				/>
				<br />
				<button type='submit' class='btn btn-outline-secondary'>
					Submit
				</button>
			</form>
		);
	}
}

export default function SimpleModal(props) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<button
				type='button'
				class='btn btn-link btn-lg'
				onClick={handleOpen}
			>
				CHANGE PASSWORD
			</button>
			<Modal
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'
				open={open}
				onClose={handleClose}
			>
				<div style={modalStyle} className={classes.paper}>
					<h2 id='simple-modal-title'>Enter a new Password:</h2>
					<MyForm
						username={props.username}
						closeMethod={handleClose}
					/>
				</div>
			</Modal>
		</div>
	);
}
