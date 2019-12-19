import React, { Component } from 'react'
import { Layout, Row, Col, Form } from 'antd';
import Header from '../components/Header'
import Menubar from '../components/Menubar'
import axios from 'axios'
export default class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
        }
        this.setValue = this.setValue.bind(this)
    }
    componentDidMount() {
        var url = 'http://localhost:4000/login'
        var token = localStorage.getItem('myToken')
        axios.get(url, { 'headers': { 'token': token } }).then(res => {
            console.log(res)
            this.setState({ password: res.data[0].password })
            this.setState({ firstname: res.data[0].firstname })
            this.setState({ lastname: res.data[0].lastname })
            this.setState({ email: res.data[0].email })
            this.setState({ phone: res.data[0].phone })
        })
    }
    setValue(type, e) {
        var text = e.target.value
        var type = type
        switch (type) {
            case 'password':
                this.setState({ password: text })
                break;
            case 'firstname':
                this.setState({ firstname: text })
                break;
            case 'lastname':
                this.setState({ lastname: text })
                break;
            case 'email':
                this.setState({ email: text })
                break;
            case 'phone':
                this.setState({ phone: text })
        }
    }
    onEdit() {
        var url = 'http://localhost:4000/editprofile'
        var obj = {
            token: localStorage.getItem('myToken'),
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
        }
        axios.post(url, { obj }).then(res => {
            if (res.status = 200) {
                alert('Edit Completed')
            } else {
                console.log(res)
            }
        })
    }
    render() {
        const { Sider, Content } = Layout;
        const { password, firstname, lastname, email, phone } = this.state
        return (
            <Layout>
                <Header />
                <Layout>
                    <Sider width='25vh'>
                        <Menubar defaultSelectedKeys='6' />
                    </Sider>
                    <Content style={{
                        height: '100%',
                        width: '100%',
                        marginTop: '1%',
                        marginLeft: '1%',
                    }}>
                        <div style={{
                            border: "2px solid #59a8f4", height: '50%',
                            width: '50%',
                        }}>
                            <h1>My Profile</h1>
                            <Form>
                                <div style={{ display: 'flex' }}>
                                    <Form.Item>
                                        <label>Password: </label>
                                    </Form.Item>
                                    <Form.Item style={{ marginLeft: '2vh' }}>
                                        <input onChange={(e) => this.setValue('password', e)} value={password} type='password' />
                                    </Form.Item>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Form.Item>
                                        <label>Firstname: </label>
                                    </Form.Item>
                                    <Form.Item style={{ marginLeft: '2vh' }}>
                                        <input onChange={(e) => this.setValue('firstname', e)} value={firstname} />
                                    </Form.Item>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Form.Item>
                                        <label>Lastname: </label>
                                    </Form.Item>
                                    <Form.Item style={{ marginLeft: '2vh' }}>
                                        <input onChange={(e) => this.setValue('lastname', e)} value={lastname} />
                                    </Form.Item>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Form.Item>
                                        <label>Email: </label>
                                    </Form.Item>
                                    <Form.Item style={{ marginLeft: '5vh' }}>
                                        <input onChange={(e) => this.setValue('email', e)} value={email} />
                                    </Form.Item>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Form.Item>
                                        <label>Phone: </label>
                                    </Form.Item>
                                    <Form.Item style={{ marginLeft: '4vh' }}>
                                        <input onChange={(e) => this.setValue('phone', e)} value={phone} />
                                    </Form.Item>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <button onClick={() => this.onEdit()}>SAVE</button>
                                </div>
                            </Form>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
