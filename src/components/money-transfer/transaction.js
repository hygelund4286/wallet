import React, { useState } from "react";
import moment from "moment";
import { Header } from 'semantic-ui-react';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';



const Transaction = (props) => {
    const [api, setApi] = useState(null);
    const { items } = props;

    if(api !== null) {
        api.setRowData(items);
    }

    const columnDefs = [
        {headerName: "From Account Type", field: "fromCurrencyType"},
        {headerName: "To Account Type", field: "toCurrencyType"},
        {headerName: "From Account Number", field: "fromAccountNumber"},
        {headerName: "To Account Number", field: "toAccountNumber"},
        {headerName: "From Balance", field: "fromBalance"},
        {headerName: "To Balance", field: "toBalance"},
        {headerName: "Transaction Type", field: "transactionType"},
        {headerName: "User", field: "userName"},
        {
            headerName: "Created Time",
            field: 'createdTime',
            cellRenderer: (data) => {
                return moment(data.createdAt).format('MM/DD/YYYY HH:mm')
            }
        }
    ];

    const onGridReady = e => {
        const { api } = e;
        setApi(api);
    };

    return (
        (items !== undefined && items.length > 0) ?
            <div>
                <div style={{height: 30}}><Header as={'h3'}>Transactions Log</Header></div>
                <div className="ag-theme-balham" style={{height: '400px'}}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={items}
                        onGridReady={onGridReady}
                    />
                </div>
            </div> :  null
    )
};

export default Transaction;
