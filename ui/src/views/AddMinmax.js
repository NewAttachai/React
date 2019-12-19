import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd';
import Header from '../components/Header'
import Menubar from '../components/Menubar'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import axios from 'axios'
export default class AddMinmax extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reRender: true,
            dataArr: []
        }
        this.overrideValue = this.overrideValue.bind(this)
    }
    componentDidMount() {
        const url = "http://localhost:4000/findstock";
        fetch(url, {
            method: "GET"
        }).then(reponse => reponse.json()).then(find => {
            console.log(find)
            this.setState({ dataArr: find })
        })
    }
    shouldComponentUpdate() {
        if (this.state.reRender == true) return true
        if (this.state.reRender == false) return false
    }

    overrideValue = (index, type, value) => {
        this.setState({ reRender: false })
        const newExcel = this.state.dataArr.slice()
        if (type == 'min') {
            newExcel[index].min = parseInt(value)
            this.setState({ dataArr: newExcel })
        } else {
            newExcel[index].max = parseInt(value)
            this.setState({ dataArr: newExcel })
        }
    }
    handleClick(e) {
        console.log(e)
        var url = 'http://localhost:4000/addminmax'
        axios.post(url, e)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        const { Sider, Content } = Layout;
        var columns = [
            {
                Header: "Materialno",
                accessor: "materialno",
                style: {
                    textAlign: 'center'
                },
                width: 300,
                maxWidth: 300,
                minWidth: 200
            },
            {
                Header: "Total To Use",
                accessor: "totaltouse",
                style: {
                    textAlign: 'right'
                },
                width: 100,
                maxWidth: 150,
                minWidth: 100

            },
            {
                Header: "min",
                accessor: "min",
                Cell: props => {
                    var index = props.row._index
                    var type = 'min'
                    return (
                        <div >
                            <input
                                onChange={(e) => {
                                    this.overrideValue(index, type, e.target.value)
                                }}
                                placeholder={props.original.min} type="number" min="0" max="1000" />
                        </div>

                    )
                },
                style: {
                    textAlign: 'right'
                },
                width: 100,
                maxWidth: 200,
                minWidth: 100
            },
            {
                Header: "max",
                accessor: "max",
                Cell: props => {
                    var index = props.row._index
                    var type = 'max'
                    return (
                        <input
                            onChange={(e) => {
                                this.overrideValue(index, type, e.target.value)
                            }}
                            placeholder={props.original.max} type="number" min="0" max="1000" />
                    )
                },
                style: {
                    textAlign: 'right'
                },
                width: 100,
                maxWidth: 200,
                minWidth: 100
            },
            {
                Header: "Add",
                Cell: props => {
                    var id = props.original._id
                    var index = props.row._index
                    return (
                        <button onClick={() => this.handleClick(this.state.dataArr[index])}>Confirm</button>
                    )
                },
                sortable: false,
                filterable: false,
                width: 100,
                maxWidth: 100,
                minWidth: 100
            }

        ]

        return (
            <Layout>
                <Header />
                <Layout>
                    <Sider width='25vh'>
                        <Menubar defaultSelectedKeys='4' />
                    </Sider>
                    <Content style={{
                        height: '100%',
                        width: '100%',
                        marginTop: '1%',
                        marginLeft: '1%',
                    }}>
                        <div style={{
                            height: '50%',
                            width: '75vh',
                        }}>
                            <h1>Add Minmax</h1>
                            <ReactTable
                                columns={columns}
                                data={this.state.dataArr}
                                noDataText={'Please Wait'}
                                filterable
                                defaultPageSize={10}>
                            </ReactTable>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
