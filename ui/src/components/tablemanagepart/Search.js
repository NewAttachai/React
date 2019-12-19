import React, { Component } from 'react'
import './Search.css'
import axios from 'axios'
import { Table } from "react-bootstrap";
import { Button, Col, Row } from 'reactstrap';
import { Switch, Icon } from 'antd';
export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            data: [],
            renderOne: false,
            addList: [],
            partName: '',
            tableData: [],
            canUse: false,
        }
        this.onTextChange = this.onTextChange.bind(this)
        this.renderTable = this.renderTable.bind(this)
        this.onSetNameChange = this.onSetNameChange.bind(this)
    }
    componentDidMount() {
        var token = localStorage.getItem('myToken')
        var url = 'http://localhost:4000/findmypart'
        axios.get(url, { 'headers': { 'token': token } })
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch(err => {
                console.log(err)
            })
    }
    onTextChange(event) {
        const value = event.target.value
        this.setState({ text: value })
        this.setState({ renderOne: false })
        /* console.log(this.state.text)
         const { data, addList } = this.state
         console.log(Object.keys(addList).length)*/
    }
    searchSelected(value) {

        console.log(value)
        var text = value.partName
        var data = value.partList
        var canUse = value.canUse
        console.log(this.state.canUse)
        this.setState({ canUse: canUse })
        this.setState({ text: text })
        this.setState({ tableData: data })
        //this.setState({ addList: value })
        this.setState({ renderOne: true })
        /*console.log(this.state.addList)
        var length = this.state.addList.length
        let a = this.state.addList.slice(); //creates the clone of the state
        a[length] = value;
        a[length].composition = false
        this.setState({ addList: a });*/
    }
    renderTable() {
        const { data, addList } = this.state
        console.log(addList)
        var length = Object.keys(addList).length
        if (length == 0) return <h5 className="AppFont">กรุณาเพิ่ม material</h5>
        return (
            <Table striped hover>
                <thead className="AppFont">
                    <tr>
                        <th>No.</th>
                        <th>Material No.</th>
                        <th>Min</th>
                        <th>Max</th>
                        <th>Totaltouse</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {addList.map((list, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{list.materialno}</td>
                            <td>{list.min}</td>
                            <td>{list.max}</td>
                            <td>{list.totaltouse}</td>
                            <td><button onClick={() => this.deleteFunction(index)} >Delete</button></td>
                        </tr>)}
                </tbody>
            </Table>
        )
    }
    onSetNameChange(event) {
        const value = event.target.value
        this.setState({ partName: value })
    }
    render() {
        const { text, data } = this.state
        console.log(data)
        const material = data
            .filter(material => {
                return material.partName.toLowerCase().indexOf(text.toLowerCase()) >= 0
            }).slice(0, 2)
            .map((material, keys) => {
                if (this.state.renderOne == false)
                    return (
                        <ul key={keys}>
                            <li onClick={() => this.searchSelected(material)}>
                                <Row>
                                    <Col>
                                        {material.partName}
                                    </Col>
                                </Row>
                            </li>
                        </ul>
                    )
                if (this.state.renderOne == true) return null
            })
        return (
            <div>
                <br></br>
                <div>
                    <div>
                        <label>Search Part: </label>
                        <div className='Search' style={{ width: "300px" }}>
                            <input type='text' onChange={this.onTextChange} value={text} placeholder='Search By Part No.' />
                            {material}
                        </div>
                    </div>
                    <div>
                        <label>Part Name: </label> <label>{this.state.text}</label>
                    </div>
                    <div>
                        <button>Edit Part</button>
                        <button>Add More</button>
                    </div>
                    <Table striped bordered hover
                        style={{
                            border: "2px solid #59a8f4",
                            width: '60%',
                        }}>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Material no.</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tableData.map((i, keys) =>
                                <tr key={keys}>
                                    <td>{keys + 1}</td>
                                    <td>{i.materialno}</td>
                                    <td>{i.value}</td>
                                </tr>)}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}
