import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
        this.state = { state: '', city: '', address: '', zip: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    mySubmitHandler = event => {
        event.preventDefault();

        alert('Submitted!');

        fetch('/address-info/insert', {
            method: 'POST',
            body: JSON.stringify({
                username: this.props.username,
                state: this.state.state,
                city: this.state.city,
                address: this.state.address,
                zip: this.state.zip
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
    };
    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                {/* <h1>Hello {this.state.username}</h1> */}
                <p>Enter Address:</p>
                <input
                    type='text'
                    name='address'
                    onChange={this.handleChange}
                    className='form-control'
                    required
                />
                <p>Enter City:</p>
                <input
                    type='text'
                    name='city'
                    onChange={this.handleChange}
                    className='form-control'
                    required
                />
                <p>Enter State:</p>
                <input
                    type='text'
                    name='state'
                    onChange={this.handleChange}
                    className='form-control'
                    required
                />
                <p>Enter Zip:</p>
                <input
                    type='text'
                    name='zip'
                    onChange={this.handleChange}
                    className='form-control'
                    required
                    minlength='5'
                    maxlength='5'
                />
                <br />
                <button type='submit' class='btn btn-outline-secondary'>
                    Submit
                </button>
                {/* <input type='submit' value='submit' /> */}
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
                    <h2 id='simple-modal-title'>Add A New Address</h2>
                    <MyForm username={props.username} />
                </div>
            </Modal>
        </div>
    );
}
