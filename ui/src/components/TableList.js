import React, { Component } from 'react'
import { Table } from "react-bootstrap";

export default class TableList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.data)
        return (
            <div style={{
                width: '100%',
                marginTop: '1%'
            }}>
                <h1>{this.props.type}</h1>
                <div style={{
                    width: '100%',
                }}>
                    <Table striped bordered hover
                        style={{
                            border: "2px solid #59a8f4",
                            width: '60%',
                        }}>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Material no.</th>
                                <th>Type</th>
                                <th>Composition</th>
                                <th>Min</th>
                                <th>Max</th>
                                <th>Totalunrestrictuse</th>
                                <th>Totalreserve</th>
                                <th>Totaltouse</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map((i, keys) =>
                                <tr key={keys}>
                                    <td>{keys + 1}</td>
                                    <td>{i.materialno}</td>
                                    <td>{i.color}</td>
                                    <td>{i.composition}</td>
                                    <td style={{
                                        textAlign: 'right'
                                    }}>{i.min}</td>
                                    <td style={{
                                        textAlign: 'right'
                                    }}>{i.max}</td>
                                    <td style={{
                                        textAlign: 'right'
                                    }}>{i.totalunrestrictuse}</td>
                                    <td style={{
                                        textAlign: 'right'
                                    }}>{i.totalreserve}</td>
                                    <td style={{
                                        textAlign: 'right'
                                    }}>{i.totaltouse}</td>
                                </tr>)}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}
