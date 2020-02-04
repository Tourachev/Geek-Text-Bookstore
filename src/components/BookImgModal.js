import React, { Component } from 'react'
import {Button, Modal } from 'semantic-ui-react'

export const BookImgModal = (props) => (
    <Modal centered="true" size='mini' trigger={<img class="book-img" src={props.img}></img>} style={{maxHeight:"500px"}}closeIcon>
        <img style={{ width: "100%"}} src={props.img}></img>
    </Modal>
)
export default BookImgModal
