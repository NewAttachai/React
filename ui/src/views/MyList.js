import React, { Component } from 'react'
import axios from 'axios'
import { Layout, Row, Col } from 'antd';
import Header from '../components/Header'
import Menubar from '../components/Menubar'
import { Pie } from 'react-chartjs-2'
import { ButtonToolbar } from 'reactstrap';
import TableList from '../components/TableList'
import AddList from '../components/addlist/AddList'
export default class MyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pieData: [],
            tabletype: 'Table Danger',
            tableData: [],
            tableRed: [],
            tableYellow: [],
            tableGreen: [],
            addModalShow: false,
        }
    }
    componentDidMount() {
        var token = localStorage.getItem('myToken')
        var url = 'http://localhost:4000/mylist'
        axios.get(url, { 'headers': { 'token': token } })
            .then(res => {
                var list = res.data.listall
                var listLength = list.length
                var colorRed = 0
                var colorYellow = 0
                var colorGreen = 0
                var colorArr = []
                var redTable = []
                var yellowTable = []
                var greenTable = []
                for (var i = 0; i < listLength; i++) {
                    var color = list[i].color
                    switch (color) {
                        case 'red':
                            redTable.push(list[i])
                            colorRed += 1
                            break;
                        case 'yellow':
                            yellowTable.push(list[i])
                            colorYellow += 1
                            break;
                        case 'green':
                            greenTable.push(list[i])
                            colorGreen += 1
                    }
                }
                colorArr.push(colorRed)
                colorArr.push(colorYellow)
                colorArr.push(colorGreen)
                this.setState({ pieData: colorArr })
                this.setState({ tableRed: redTable })
                this.setState({ tableYellow: yellowTable })
                this.setState({ tableGreen: greenTable })
                this.setState({ tableData: redTable })
            })
            .catch(err => {
                console.log(err)
            })
    }
    handleClick(value) {
        switch (value) {
            case 'Table Danger':
                this.setState({ tableData: this.state.tableRed })
                break;
            case 'Table Low':
                this.setState({ tableData: this.state.tableYellow })
                break;
            case 'Table Normal':
                this.setState({ tableData: this.state.tableGreen })
        }
        this.setState({ tabletype: value })
        console.log(value)
    }
    render() {
        const { Sider, Content } = Layout;
        let addModalClose = () => this.setState({ addModalShow: false });
        return (
            <Layout>
                <Header />
                <Layout>
                    <Sider width='25vh'>
                        <Menubar defaultSelectedKeys='1' />
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
                                <h1>My List</h1>
                            </div>
                            <Pie
                                data={{
                                    labels: ['Danger', 'Low', 'Normal'],
                                    datasets: [{
                                        data: this.state.pieData,
                                        backgroundColor: ['#fe4849', '#ffcc00', '#1ad1a3']
                                    }],
                                }}
                                height={4}
                                width={9} />
                            <div style={{ border: "2px solid #59a8f4", marginTop: '2%' }}>
                                <ButtonToolbar>
                                    <button
                                        onClick={() => this.setState({ addModalShow: true })}>
                                        Add List
                                        </button>
                                    <AddList show={this.state.addModalShow} onHide={addModalClose} />
                                </ButtonToolbar>
                            </div>
                            <div style={{ border: "2px solid #59a8f4", marginTop: '1%' }}>
                                <button
                                    style={{ width: "120px", backgroundColor: '#fe4849' }}
                                    onClick={() => this.handleClick('Table Danger')}>
                                    Danger Views
                                </button>
                                <button
                                    style={{ width: "120px", backgroundColor: '#ffcc00' }}
                                    onClick={() => this.handleClick('Table Low')}>
                                    Low Views
                                    </button>
                                <button
                                    style={{ width: "120px", backgroundColor: '#1ad1a3' }}
                                    onClick={() => this.handleClick('Table Normal')}>
                                    Normal Views
                                    </button>
                            </div>
                        </div>
                        <TableList
                            type={this.state.tabletype}
                            data={this.state.tableData} />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
