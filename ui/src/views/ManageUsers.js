import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd';
import Header from '../components/Header'
import Menubar from '../components/Menubar'
import { Table, ButtonToolbar } from "react-bootstrap";
import AddUsers from '../components/AddUsers'
import TableUsers from '../components/TableUsers'
export default class ManageUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalShow: false,
        }
    }
    render() {
        const { Sider, Content } = Layout;
        let addModalClose = () => this.setState({ addModalShow: false });
        return (
            <Layout>
                <Header />
                <Layout>
                    <Sider width='25vh'>
                        <Menubar defaultSelectedKeys='7' />
                    </Sider>
                    <Content style={{
                        height: '100%',
                        width: '100%',
                        marginTop: '1%',
                        marginLeft: '1%',
                    }}>
                        <div style={{
                            width: '100%',
                        }}>
                            <h1>Manage Users</h1>
                            <ButtonToolbar >
                                <button onClick={() => this.setState({ addModalShow: true })}>Add Users</button>
                                <AddUsers show={this.state.addModalShow} onHide={addModalClose} />
                            </ButtonToolbar>
                            <TableUsers />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
