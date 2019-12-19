import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd';
import Header from '../components/Header'
import Menubar from '../components/Menubar'
import AddParts from '../components/popupmanagepart/AddParts'
import { ButtonToolbar } from "react-bootstrap";
import axios from 'axios'
import Search from '../components/tablemanagepart/Search'
export default class ManagePart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalShow: false,
        }
    }

    componentDidMount() {
        /*var token = localStorage.getItem('myToken')
        var url = 'http://localhost:4000/findmypart'
        axios.get(url, { 'headers': { 'token': token } })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })*/
    }
    render() {
        const { Sider, Content } = Layout;
        let addModalClose = () => this.setState({ addModalShow: false });
        return (
            <Layout>
                <Header />
                <Layout>
                    <Sider width='25vh'>
                        <Menubar defaultSelectedKeys='5' />
                    </Sider>
                    <Content style={{
                        height: '100%',
                        width: '100%',
                        marginTop: '1%',
                        marginLeft: '1%',
                    }}>
                        <h1>Manage Part</h1>
                        <ButtonToolbar >
                            <button onClick={() => this.setState({ addModalShow: true })}>Add Part</button>
                            <AddParts show={this.state.addModalShow} onHide={addModalClose} />
                        </ButtonToolbar>
                        <Search />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
