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
        this.state = {
            selectedOption: 'option1',
            names: ['Wishlist1', 'Wishlist2', 'Wishlist3']
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({selectedOption: evt.target.value});
    }

    componentDidMount() {
        fetch('/wishlist/getNames', {
            method: 'POST',
            body: JSON.stringify({
                userid: this.props.username
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ names: data });
        })
    }

    mySubmitHandler = event => {
        event.preventDefault();
        var listnum = 1;
        if (this.state.selectedOption === 'option1') {
            listnum = 1;
        } else if (this.state.selectedOption === 'option2') {
            listnum = 2;
        } else {
            listnum = 3;
        }

        fetch('/wishlist/addToWish', {
            method: 'POST',
            body: JSON.stringify({
                userid: this.props.username,
                bookid: this.props.bookid,
                listnum: listnum
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
        this.props.closeMethod();
    }

    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <p>Add Book to a Wishlist</p>
                <div classname='radio'>
                    <label>
                        <input type='radio' value='option1'
                        checked={this.state.selectedOption === 'option1'}
                        onChange={this.handleChange}/>
                        {this.state.names[0]}
                    </label>
                </div>
                <div classname='radio'>
                    <label>
                        <input type='radio' value='option2'
                        checked={this.state.selectedOption === 'option2'}
                        onChange={this.handleChange}/>
                        {this.state.names[1]}
                    </label>
                </div>
                <div classname='radio'>
                    <label>
                        <input type='radio' value='option3'
                        checked={this.state.selectedOption === 'option3'}
                        onChange={this.handleChange}/>
                        {this.state.names[2]}
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
    let names = ['Wishlist1', 'Wishlist2', 'Wishlist3'];
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

    const getNames = () => {
        if (props.isLoggedIn) {
            fetch('/wishlist/getNames', {
                method: 'POST',
                body: JSON.stringify({
                    userid: props.username
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(data => {
                return data;
            })
        } else {
            return ['Wishlist1', 'Wishlist2', 'Wishlist3'];
        }
    }

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
                    <h2 id='simple-modal-title'>Select Wishlist</h2>
                    <MyForm
                        username={props.username}
                        closeMethod={handleClose}
                        bookid={props.bookid}
                    />
                </div>
            </Modal>
        </div>
    );
}