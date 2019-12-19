import React, { Component } from 'react'
import { Layout } from 'antd';
export default class Header extends Component {
    handleClick() {
        alert('Goodbye')
        localStorage.clear();
    }
    render() {
        const { Header } = Layout;
        return (
            <Layout>
                <Header style={{ backgroundColor: '#332EB6' }}>
                    <div style={{
                        textAlign: 'right'
                    }}>
                        <a style={{ color: 'red', fontSize: '25px', paddingTop: '5px' }}
                            onClick={() => this.handleClick()} href="/">Logout</a>
                    </div>
                </Header>
            </Layout>
        )
    }
}
