import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd';
import Header from '../components/Header'
import Menubar from '../components/Menubar'
import { ButtonToolbar } from "react-bootstrap";
import AddSet from '../components/addset/AddSets'
import Search from '../components/tableset/Search'
export default class MySet extends Component {
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
                        <Menubar defaultSelectedKeys='2' />
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
                            <div>
                                <h1>Find My Set</h1>
                                <ButtonToolbar>
                                    <button
                                        onClick={() => this.setState({ addModalShow: true })}>
                                        Add Set
                                        </button>
                                    <AddSet show={this.state.addModalShow} onHide={addModalClose} />
                                </ButtonToolbar>
                                <Search />
                            </div>

                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
