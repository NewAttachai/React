import React, { Component } from 'react'
import axios from 'axios'
import { Layout, Row, Col, Form } from 'antd';
import Header from '../components/Header'
import Menubar from '../components/Menubar'
import { Table, ButtonToolbar } from "react-bootstrap";
import EditUsers from '../components/EditUsers'
export default class TableUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            find: [],
            addModalShow: false,
            data: [],
        }
    }
    componentDidMount() {
        const url = "http://localhost:4000/findusers";
        fetch(url, {
            method: "GET"
        }).then(reponse => reponse.json()).then(find => {
            console.log(find)
            this.setState({ find: find })
        })
    }
    handdleChange(keys) {
        console.log(keys)
        this.setState({ data: this.state.find[keys] })
        this.setState({ addModalShow: true })
    }
    render() {
        let addModalClose = () => this.setState({ addModalShow: false });
        return (
            <Table striped bordered hover
                style={{
                    border: "2px solid #59a8f4",
                    width: '60%',
                }}>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Position</th>
                        <th>E-mail</th>
                        <th>Phone Number</th>
                        <th>Recent Login</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.find.map((i, keys) =>
                        <tr key={keys}>
                            <td>{keys + 1}</td>
                            <td>{i.username}</td>
                            <td>{i.password}</td>
                            <td>{i.firstname}</td>
                            <td>{i.lastname}</td>
                            <td>{i.position}</td>
                            <td>{i.email}</td>
                            <td>{i.phone}</td>
                            <td>{i.recent_login}</td>
                            <td>
                                <ButtonToolbar >
                                    <button onClick={() => this.handdleChange(keys)}>Edit</button>
                                </ButtonToolbar>
                            </td>
                        </tr>)}
                    <EditUsers
                        data={this.state.data}
                        show={this.state.addModalShow}
                        onHide={addModalClose} />
                </tbody>
            </Table>
        )
    }
}
