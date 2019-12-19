import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import { ButtonToolbar, Button, Col, Row, Form, FormGroup, Label, Container } from 'reactstrap';
import { Input } from 'antd';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios'
export default class EditUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            firstname: '',
            lastname: '',
            position: 'Planner',
            email: '',
            phone: ''
        }
    }
    componentDidMount() {
        console.log(this.props.data)
        console.log(this.state.data)
    }
    handleClick() {
        var edit = {
            id: this.props.data._id,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            position: this.state.position,
            email: this.state.email,
            phone: this.state.phone

        };
        console.log(edit)
        axios.put('http://localhost:4000/editusers', { edit }).then(res => {
            console.log(res)
        })
    }
    onTextChange(type, e) {
        var value = e.target.value
        switch (type) {
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
                this.setState({ position: 'Planner' })
                break;
            case 'email':
                this.setState({ email: value })
                break;
            case 'phone':
                console.log(value)
                this.setState({ phone: value })
        }
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
                        Edit Users
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
                                        <Input type="text" name="firstname" id="example-firstname" placeholder={this.props.data.firstname} onChange={(e) => this.onTextChange('firstname', e)} />
                                    </Col>

                                    <Col md={6} style={{ marginTop: "1%" }} >
                                        <Label >Lastname :</Label>
                                    </Col>
                                    <Col md={6} style={{ marginTop: "1%", marginLeft: "-35%" }}>
                                        <Input type="text" name="password" id="example-password" placeholder={this.props.data.lastname} onChange={(e) => this.onTextChange('lastname', e)} />
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
                                        <Input type="email" name="email" id="example-email" placeholder={this.props.data.email} onChange={(e) => this.onTextChange('email', e)} />
                                    </Col>
                                    <Col md={6} style={{ marginTop: "1%" }} >
                                        <Label >Password :</Label>
                                    </Col>
                                    <Col md={6} style={{ marginTop: "1%", marginLeft: "-35%" }}>
                                        <Input type="password" name="password" id="example-password" placeholder={this.props.data.password} onChange={(e) => this.onTextChange('password', e)} />
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
                                        <Input type="number" name="phone" id="example-phone"  onInput={this.maxLengthCheck}
                                            required onChange={(e) => this.onTextChange('phone', e)} placeholder={this.props.data.phone} />
                                    </Col>

                                    <Col md={6} style={{ marginTop: "1%" }} >
                                        <Label for="examplePosition" >Position :</Label>
                                    </Col>
                                    <Col md={6} style={{ marginTop: "1%", marginLeft: "-35%" }}>
                                        <Dropdown xs={6}>
                                            <Dropdown.Toggle variant="secondary" id="examplePosition" name="Position" >
                                                Position
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu >
                                                <Dropdown.Item value={this.state.Position} >Planner</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                </Row> <hr />
                                <Row>
                                    <ButtonToolbar>
                                        <Col >
                                            <Button color="primary" size="lg" block onClick={() => this.handleClick()}>Edit</Button>
                                        </Col>
                                    </ButtonToolbar>
                                </Row>
                            </Form>
                        </Container>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}
