import React, { Component } from 'react'
import axios from 'axios'
import { Layout, Row, Col, Form } from 'antd';
import Header from '../components/Header'
import Menubar from '../components/Menubar'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            data: [],
            searchData: [],
        }
    }
    componentDidMount() {
        var url = 'http://localhost:4000/findstock'
        axios.get(url).then(res => {
            console.log(res)
            this.setState({ data: res.data });
        })
    }
    handleChange = event => {
        const { data } = this.state
        const lowercasedFilter = event.target.value.toLowerCase();
        const searchData = data.filter(i => {
            return i.materialno.toLowerCase().search(lowercasedFilter) !== -1
        })
        this.setState({
            filter: event.target.value,
            searchData: lowercasedFilter === "" ? [] : searchData
        })

    };
    render() {
        const { Sider, Content } = Layout;
        const { filter } = this.state
        return (
            <Layout>
                <Header />
                <Layout>
                    <Sider width='25vh'>
                        <Menubar defaultSelectedKeys='3' />
                    </Sider>
                    <Content style={{
                        height: '100%',
                        width: '100%',
                    }}>
                        <div>
                            <center>
                                <table className="Navbar" >
                                    <tbody >
                                        <tr>
                                            <td>
                                                <img src={require('../assets/uih.png')} width="350" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </center>
                            <br></br>
                            <div>
                                <Form>
                                    <div className="container mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Search</span>
                                            <input className="form-control" style={{ fontSize: 30, display: 'block', paddingLeft: 20 }}
                                                value={filter} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </Form>
                                {this.state.searchData.map((i, keys) => (
                                    <div className="container mt-3" key={keys}>
                                        <div className="media border p-3">
                                            <div className="media-body" >
                                                <h4 key={i._id}>{i.materialno}</h4>
                                                <div style={{ fontSize: 20, display: 'block', paddingLeft: 10 }}>
                                                    <ul>Type : {i.color}</ul>
                                                    <ul>Min : {i.min}</ul>
                                                    <ul>Max : {i.max}</ul>
                                                    <ul>Totaltouse : {i.totaltouse}</ul>
                                                    <ul>Totalunrestrictuse : {i.totalunrestrictuse}</ul>
                                                    <ul>Totalreserve : {i.totalreserve}</ul>
                                                    <ul>Datemodified : {i.datemodified}</ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
