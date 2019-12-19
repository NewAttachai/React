import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import { ButtonToolbar, Button, Col, Row, Form, FormGroup, Label, Container } from 'reactstrap';
import { Input } from 'antd';
import Search from './Search'
export default class AddList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Modal className="AppFont"
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add List
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <div className="container">
                            <Search />
                        </div>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}
