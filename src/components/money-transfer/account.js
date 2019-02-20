import React, {useState} from "react";
import moment from "moment";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';
import {Header} from "semantic-ui-react";


const Account = (props) => {
    const [api, setApi] = useState(null);
    const { items } = props;

    if(api !== null) {
        api.setRowData(items);
    }

    const columnDefs = [
        {headerName: "Currency Type", field: "currencyType"},
        {headerName: "Account Number", field: "accountNumber"},
        {headerName: "User", field: "userName"},
        {headerName: "Balance", field: "balance"},
        {headerName: "Created Time",
            field: 'createdAt',
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
        <div>
            <div style={{height: 30}}><Header as={'h3'}>Accounts</Header></div>
            <div className="ag-theme-balham" style={{height: '400px'}}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={items}
                    onGridReady={onGridReady}
                />
            </div>
        </div>
    )
};

export default Account;
