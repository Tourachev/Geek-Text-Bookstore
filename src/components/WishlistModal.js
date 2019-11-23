import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Icon } from 'semantic-ui-react';
import { Button } from 'react-bootstrap';

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
        this.state = {listname: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }

    mySubmitHandler = event => {
        event.preventDefault();

        fetch('/wishlist/rename', {
            method: 'POST',
            body: JSON.stringify({
                userid: this.props.username,
                bookid: this.props.bookid,
                listnum: this.state.listnum
            }),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(result => {
                if (result.decision == true) {
                    alert('Book added to Wishlist');
                } else {
                    alert('Book is already in Wishlist!');
                }
            })
            .catch(err => {
                console.log(err);
            });

        alert('Name Changed!');
        this.props.closeMethod();
    };
    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <p>Add Book to a Wishlist</p>
                <div classname='radio'>
                    <label>
                        <input type='radio' value={1} className='form-control'
                        checked={this.state.listnum === 1}
                        onChange={this.handleChange}/>
                        {this.props.names[0]}
                    </label>
                </div>
                <div classname='radio'>
                    <label>
                        <input type='radio' value={2} className='form-control'
                        checked={this.state.listnum === 2}
                        onChange={this.handleChange}/>
                        {this.props.names[1]}
                    </label>
                </div>
                <div classname='radio'>
                    <label>
                        <input type='radio' value={3} className='form-control'
                        checked={this.state.listnum === 3}
                        onChange={this.handleChange}/>
                        {this.props.names[2]}
                    </label>
                </div>
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
        if (props.isLoggedIn) {
            setOpen(true);
        } else {
            alert('You are not logged in!');
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                size="lg" style={{ width: "30%"}}
                type='button'
                class='option-button'
                onClick={handleOpen}
            >Save to Wishlist
            </Button>
            <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id='simple-modal-title'>Edit Wishlist Name</h2>
                    <MyForm
                        username={props.username}
                        closeMethod={handleClose}
                        bookid={props.bookid}
                        listnum={props.listnum}
                        names={props.names}
                    />
                </div>
            </Modal>
        </div>
    );
}