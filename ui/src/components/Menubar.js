import React, { Component } from 'react'
import { Layout, Menu, Icon, Button } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
export default class Menubar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { Sider } = Layout;
        var position = localStorage.getItem('myPosition')
        if (position == 'Admin') {
            return (
                <Layout >
                    <Layout >
                        <Sider width='100%' >
                            <Menu
                                defaultSelectedKeys={[this.props.defaultSelectedKeys]}
                                mode="inline"
                                theme="dark"
                                style={{ height: '100vh', backgroundColor: '#9D9DA4', }}
                            >
                                <Menu.Item key="1">
                                    <Icon type="ordered-list" />
                                    <span>MY LIST</span>
                                    <Link to="/mylist" />
                                </Menu.Item>
                                <Menu.Item key="2" >
                                    <Icon type="snippets" />
                                    <span>MY MATERIAL SET</span>
                                    <Link to="/myset" />
                                </Menu.Item>
                                <Menu.Item key="3" >
                                    <Icon type="file-search" />
                                    <span>SEARCH</span>
                                    <Link to="/search" />
                                </Menu.Item>
                                <Menu.Item key="4" >
                                    <Icon type="plus-circle" />
                                    <span>ADD MIN-MAX</span>
                                    <Link to="/addminmax" />
                                </Menu.Item>
                                <Menu.Item key="5" >
                                    <Icon type="tablet" />
                                    <span>MANAGE PART</span>
                                    <Link to="/mpart" />
                                </Menu.Item>
                                <Menu.Item key="6" >
                                    <Icon type="user" />
                                    <span>MY PROFILE</span>
                                    <Link to="/profile" />
                                </Menu.Item>
                                <Menu.Item key="7" >
                                    <Icon type="team" />
                                    <span>MANAGE USERS</span>
                                    <Link to="/musers" />
                                </Menu.Item>
                            </Menu>
                        </Sider>
                    </Layout>
                </Layout>
            )
        } else {
            return (
                <Layout >
                    <Layout >
                        <Sider width='100%' >
                            <Menu
                                defaultSelectedKeys={[this.props.defaultSelectedKeys]}
                                mode="inline"
                                theme="dark"
                                style={{ height: '100vh', backgroundColor: '#9D9DA4', }}
                            >
                                <Menu.Item key="1">
                                    <Icon type="ordered-list" />
                                    <span>MY LIST</span>
                                    <Link to="/mylist" />
                                </Menu.Item>
                                <Menu.Item key="2" >
                                    <Icon type="snippets" />
                                    <span>MY MATERIAL SET</span>
                                    <Link to="/myset" />
                                </Menu.Item>
                                <Menu.Item key="3" >
                                    <Icon type="file-search" />
                                    <span>SEARCH</span>
                                    <Link to="/search" />
                                </Menu.Item>
                                <Menu.Item key="4" >
                                    <Icon type="plus-circle" />
                                    <span>ADD MIN-MAX</span>
                                    <Link to="/addminmax" />
                                </Menu.Item>
                                <Menu.Item key="5" >
                                    <Icon type="tablet" />
                                    <span>MANAGE PART</span>
                                    <Link to="/mpart" />
                                </Menu.Item>
                                <Menu.Item key="6" >
                                    <Icon type="user" />
                                    <span>MY PROFILE</span>
                                    <Link to="/profile" />
                                </Menu.Item>
                            </Menu>
                        </Sider>
                    </Layout>
                </Layout>
            )
        }
    }
}
