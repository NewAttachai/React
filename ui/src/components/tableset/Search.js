import React, { Component } from 'react'
import './Search.css'
import axios from 'axios'
import { Table } from "react-bootstrap";
import { Button, Col, Row } from 'reactstrap';
import { Switch, Icon, Popover } from 'antd';

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
            content: '555',
            partAll: [],
            materialAll: [],
            value: 0,
            popUp: [],
        }
        this.onTextChange = this.onTextChange.bind(this)
        this.renderTable = this.renderTable.bind(this)
        this.onSetNameChange = this.onSetNameChange.bind(this)
        this.onHandleClick = this.onHandleClick.bind(this)
    }
    componentDidMount() {
        var token = localStorage.getItem('myToken')
        var url = 'http://localhost:4000/findmyset'
        axios.get(url, { 'headers': { 'token': token } })
            .then(res => {
                console.log(res)
                this.setState({ data: res.data.setList })
                this.setState({ partAll: res.data.partAll })
                this.setState({ materialAll: res.data.materialAll })
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
        var text = value.setName
        var data = value.setList
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
    onHandleClick(keys, i) {
        var partName = i.partName
        var value = i.value
        console.log(partName)
        const { partAll, materialAll } = this.state
        this.setState({ content: partName })
        this.setState({ value: value })
        const resultPart = partAll.filter((i) => {
            return i.partName == partName
        })
        const partList = this.arrPartList(resultPart)
        const resultMaterial = materialAll.filter((i) => {
            var resultMaterial = []
            for (var i = 0; i < partList.length; i++) {
                var result = i.materialno == partList[i]
                resultMaterial.push(result)
            }
            return resultMaterial
        })
        this.setState({ popUp: resultMaterial })
    }
    arrPartList(obj) {
        var obj = obj
        var partList = []
        for (var i = 0; i < obj[0].partList.length; i++) {
            partList.push(obj[0].partList[i].materialno)
        }
        return partList
    }
    render() {
        const { text, data, popUp, value } = this.state
        var status = 'available'
        var totaltouse = 10
        const content = (
            <div>
                <p>Value: {value}</p>
                {popUp.map((list, index) =>
                    <div key={index}>
                        <p>Material no: {list.materialno}</p>
                        <p>Total to use: {list.totaltouse}</p>
                    </div>
                )}
            </div>
        );
        const material = data
            .filter(material => {
                return material.setName.toLowerCase().indexOf(text.toLowerCase()) >= 0
            }).slice(0, 5)
            .map((material, keys) => {
                if (this.state.renderOne == false)
                    return (
                        <ul key={keys}>
                            <li onClick={() => this.searchSelected(material)}>
                                <Row>
                                    <Col>
                                        {material.setName}
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
                        <label>Search Sets: </label>
                        <div className='Search' style={{ width: "300px" }}>
                            <input type='text' onChange={this.onTextChange} value={text} placeholder='Search By Set No.' />
                            {material}
                        </div>
                    </div>
                    <div>
                        <label>Set Name: </label> <label>{this.state.text}</label>
                    </div>
                    <div>
                        <button>Edit Set</button>
                    </div>
                    <Table striped bordered hover
                        style={{
                            border: "2px solid #59a8f4",
                            width: '60%',
                        }}>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Part no.</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.tableData.map((i, keys) =>
                                <Popover content={content} title={'Part No.' + i.partName} trigger="hover" key={keys} >
                                    <tr onMouseOver={() => this.onHandleClick(keys, i)}>
                                        <td>{keys + 1}</td>
                                        <td>{i.partName}</td>
                                        <td>{i.value}</td>
                                    </tr>
                                </Popover>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}
