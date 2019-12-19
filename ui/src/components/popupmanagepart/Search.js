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
        }
        this.onTextChange = this.onTextChange.bind(this)
        this.deleteFunction = this.deleteFunction.bind(this)
        this.renderTable = this.renderTable.bind(this)
        this.onSetNameChange = this.onSetNameChange.bind(this)
        this.onValueChange = this.onValueChange.bind(this)
    }
    componentDidMount() {
        var url = 'http://localhost:4000/findstock'
        axios.get(url).then(res => {
            this.setState({ data: res.data });
        })
    }
    onValueChange(index, e) {
        var value = parseInt(e.target.value)
        const newaddList = this.state.addList.slice()
        newaddList[index].value = value
        this.setState({ addList: newaddList })
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
        var text = value.materialno
        this.setState({ text: text })
        //this.setState({ addList: value })
        this.setState({ renderOne: true })
        console.log(value)
        console.log(this.state.addList)
        var length = this.state.addList.length
        let a = this.state.addList.slice(); //creates the clone of the state
        a[length] = value;
        a[length].composition = false
        this.setState({ addList: a });
    }
    deleteFunction(index) {
        var obj = this.state.addList
        obj.splice(index, 1)
        this.setState({ renderOne: true })
    }
    addFunction() {
        var post = {
            token: localStorage.getItem('myToken'),
            partName: this.state.partName,
            add: this.state.addList
        }
        var url = 'http://localhost:4000/addpart'
        axios.post(url, post)
            .then(res => {
                if (res.data.insertedCount == 0) {
                    alert('Part Name Is In Use')
                } else {
                    alert('Success')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    onSwitch(event, index) {
        let a = this.state.addList//.slice(); //creates the clone of the state
        a[index].composition = event;
        this.setState({ addList: a });
        console.log(this.state.addList)
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
                        <th>Value</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {addList.map((list, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{list.materialno}</td>
                            <td>
                                <input onChange={(e) => this.onValueChange(index, e)}
                                    type='text'
                                    maxLength="5"
                                    size='2'
                                    style={{
                                        textAlign: 'right'
                                    }}
                                />
                            </td>
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
        console.log(this.state.renderOne)
        const material = data
            .filter(material => {
                return material.materialno.toLowerCase().indexOf(text.toLowerCase()) >= 0
            }).slice(0, 5) //limit
            .map((material, keys) => {
                if (this.state.renderOne == false)
                    return (
                        <ul key={keys}>
                            <li onClick={() => this.searchSelected(material)}>
                                {material.materialno}
                            </li>
                        </ul>
                    )
                if (this.state.renderOne == true) return null
            })
        return (
            <div>
                <label>Part Name: </label><input onChange={this.onSetNameChange}></input>
                {this.renderTable()}
                <div className='Search' style={{ width: "300px" }}>
                    <input type='text' onChange={this.onTextChange} value={text} placeholder='Search By Material No.' />
                    {material}
                </div>
                <br></br>
                <div>
                    <Button color="primary" onClick={() => this.addFunction()} >Add</Button>
                </div>
            </div>
        )
    }
}
