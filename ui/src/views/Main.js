import React, { Component } from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import { Layout, Row, Col, Form } from 'antd';

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
        this.onTextChange = this.onTextChange.bind(this)
    }
    componentDidMount() {
        var token = localStorage.getItem('myToken')
        if (token != null) this.props.history.push('/mylist')
    }
    onTextChange(type, e) {
        var text = e.target.value
        if (type == 'username') this.setState({ username: text })
        if (type == 'password') this.setState({ password: text })
    }
    onLogin() {
        var auth = {
            username: this.state.username,
            password: this.state.password,
        }
        console.log(auth)
        var url = 'http://localhost:4000/auth'
        axios.post(url, { auth })
            .then(res => {
                var data = res.data.result
                var token = res.data.result.token
                var position = res.data.result.position
                console.log(res)
                if (token == undefined) {
                    alert(data)
                } else {
                    alert('Hello  '+ auth.username)
                    localStorage.setItem('myToken', token)
                    localStorage.setItem('myPosition', position)
                    this.props.history.push('/mylist')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        const { Content } = Layout;
        const centerStyle = {
            display: 'inline',
            justifyContent: 'center',
            alignItems: 'center'
        };
        return (
            <Layout style={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center'
            }}>
                <img src={require('../assets/uih.png')} />
                <Content>
                    <div>
                        <Form style={{ width: '40vh' }}>
                            <Form.Item>
                                <label>Username: </label>
                            </Form.Item>
                            <Form.Item>
                                <input style={{ width: '100%' }} placeholder='Username' type='text' onChange={(e) => this.onTextChange('username', e)} />
                            </Form.Item>
                            <Form.Item>
                                <label>Password: </label>
                            </Form.Item>
                            <Form.Item>
                                <input style={{ width: '100%' }} placeholder='Password' type='password' onChange={(e) => this.onTextChange('password', e)} />
                            </Form.Item>
                            <Form.Item>
                                <button style={{ width: '100%' }} onClick={() => this.onLogin()}>Login</button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        )
    }
}
