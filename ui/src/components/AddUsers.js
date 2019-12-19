import React, { Component } from 'react'
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { Dropdown, ButtonToolbar, Form, Label, Input, } from 'reactstrap';
import DropdownButton from 'react-bootstrap/DropdownButton'
import axios from 'axios'
export default class AddUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            position: '',
            email: '',
            phone: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(type, e) {
        const value = e.target.value
        switch (type) {
            case 'username':
                this.setState({ username: value })
                break;
            case 'password':
                this.setState({ password: value })
                break;
            case 'firstname':
                this.setState({ firstname: value })
                break;
            case 'lastname':
                this.setState({ lastname: value })
                break;
            case 'position':
                this.setState({ position: value })
                break;
            case 'email':
                console.log(value)
                this.setState({ email: value })
                break;
            case 'phone':
                console.log(value)
                this.setState({ phone: value })
        }
    }
    handleClick() {
        var edit = {
            username: this.state.username,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            position: 'Planner',
            email: this.state.email,
            phone: this.state.phone
        };
        console.log(edit);
        var url = 'http://localhost:4000/addusers'
        axios.post(url, { edit })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <Container >
                <Row>
                    <Col>
                        <Modal
                            {...this.props}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter" className="AppFont">
                                    Add User
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="container">
                                    <Container className="AppFont">
                                        <Form>
                                            <Row>
                                                <h5>Name</h5>
                                            </Row>
                                            <Row>
                                                <Col md={6} style={{ marginTop: "1%", marginLeft: "0%" }}>
                                                    <Label >Firstname :</Label>
                                                </Col>
                                                <Col md={6} style={{ marginTop: "1%", marginLeft: "-35%" }}>
                                                    <Input type="text" name="firstname" id="example-firstname" required onChange={(e) => this.handleChange('firstname', e)} />
                                                </Col>

                                                <Col md={6} style={{ marginTop: "1%" }} >
                                                    <Label >Lastname :</Label>
                                                </Col>
                                                <Col md={6} style={{ marginTop: "1%", marginLeft: "-35%" }}>
                                                    <Input type="text" name="lastname" id="example-lastname" required onChange={(e) => this.handleChange('lastname', e)} />
                                                </Col>
                                            </Row><hr />

                                            <Row>
                                                <h5>Email</h5>
                                            </Row>
                                            <Row >
                                                <Col md={6} style={{ marginTop: "1%" }} >
                                                    <Label >Email :</Label>
                                                </Col>
                                                <Col md={6} style={{ marginTop: "1%", marginLeft: "-35%" }}>
                                                    <Input type="email" name="email" id="example-email" required onChange={(e) => this.handleChange('email', e)} />
                                                </Col>

                                                <Col md={6} style={{ marginTop: "1%" }} >
                                                    <Label>Username :</Label>
                                                </Col>
                                                <Col md={6} style={{ marginTop: "1%", marginLeft: "-35%" }}>
                                                    <Input type="username" name="username" id="example-username" required onChange={(e) => this.handleChange('username', e)} />
                                                </Col>

                                                <Col md={6} style={{ marginTop: "1%" }} >
                                                    <Label >Password :</Label>
                                                </Col>
                                                <Col md={6} style={{ marginTop: "1%", marginLeft: "-35%" }}>
                                                    <Input type="password" name="password" id="example-password" required onChange={(e) => this.handleChange('password', e)} />
                                                </Col>
                                            </Row><hr />

                                            <Row>
                                                <h5>Other</h5>
                                            </Row>
                                            <Row>
                                                <Col md={6} style={{ marginTop: "1%" }} >
                                                    <Label >Phone :</Label>
                                                </Col>
                                                <Col md={6} style={{ marginTop: "1%", marginLeft: "-35%" }}>
                                                    <Input type="number" name="phone" id="example-phone" maxLength="10"
                                                        onInput={this.maxLengthCheck} required onChange={(e) => this.handleChange('phone', e)} />
                                                </Col>

                                                <Col md={6} style={{ marginTop: "1%" }} >
                                                    <Label >Position :</Label>
                                                </Col>

                                                <Col md={6} style={{ marginTop: "1%", marginLeft: "-35%" }}>
                                                    <DropdownButton id="dropdown-basic-button" title="Planner" variant="dark" >

                                                    </DropdownButton>
                                                </Col>


                                            </Row> <hr />

                                            <Row>
                                                <ButtonToolbar>
                                                    <Col >
                                                        <Button color="primary" size="lg" block onClick={() => this.handleClick()}>Add</Button>
                                                    </Col>
                                                </ButtonToolbar>
                                            </Row>
                                        </Form>
                                    </Container>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        )
    }
}
