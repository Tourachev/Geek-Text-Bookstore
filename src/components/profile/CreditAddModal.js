import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

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
        this.state = { state: '', city: '', address: '', zip: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    mySubmitHandler = event => {
        event.preventDefault();

        fetch('/credit-info/insert', {
            method: 'POST',
            body: JSON.stringify({
                username: this.props.username,
                ccnum: this.state.ccnum,
                cvv: this.state.cvv,
                name: this.state.name,
                zip: this.state.zip,
                expdate: this.state.expdate
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(newInfo => {
                //look at address-info for return values
                this.getInfo();
            })
            .catch(err => {
                console.log(err);
            });

        alert('Submitted!');
        window.location.reload();
    };
    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <p>Enter Credit Card Number:</p>
                <input
                    type='text'
                    name='ccnum'
                    onChange={this.handleChange}
                    minlength='16'
                    maxlength='16'
                    required
                    className='form-control'
                />
                <p>Enter Expiration Date:</p>
                <input
                    type='text'
                    name='expdate'
                    onChange={this.handleChange}
                    placeholder='Format: 2020/01/01'
                    required
                    className='form-control'
                />
                <p>Enter CVV:</p>
                <input
                    type='text'
                    name='cvv'
                    onChange={this.handleChange}
                    minlength='3'
                    maxlength='3'
                    required
                    className='form-control'
                />
                <p>Enter Name On Card:</p>
                <input
                    type='text'
                    name='name'
                    onChange={this.handleChange}
                    required
                    className='form-control'
                />
                <p>Enter Zip:</p>
                <input
                    type='text'
                    name='zip'
                    onChange={this.handleChange}
                    minlength='5'
                    maxlength='5'
                    required
                    className='form-control'
                />
                <br />
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
                ADD
            </button>
            <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id='simple-modal-title'>Add A New Credit Card</h2>
                    <MyForm username={props.username} />
                </div>
            </Modal>
        </div>
    );
}
