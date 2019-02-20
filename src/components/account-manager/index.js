import React, {Component, useState} from 'react';
import { Button, Grid, Dropdown, Label,Form } from 'semantic-ui-react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';
import { appState$, handlers } from '../control';


const Accounts = (props) => {
    const { items } = props;

    const [api, setApi] = useState(null);
    const [rowSelected, setRowSelected] = useState(false);
    const [currencyOptions, setCurrencyOptions] = useState(['USD', 'EUR', 'CHF']);

    const [options, setOptions] = useState([
        { text: 'USD', value: 'USD' },
        { text: 'EUR', value: 'EUR' },
        { text: 'CHF', value: 'CHF' },
    ]);

    const CurrencyTypes = () => {
        const [currentValue, setCurrentValue] = useState('');

        const handleAddition = (e, { value }) => {
            setCurrencyOptions([value, ...currencyOptions]);
            setOptions([{text: value, value}, ...options]);
        };

        const handleChange = (e, { value }) => {
            setCurrentValue(value);
        };

        return (
            <Form>
                <Form.Field inline>
                    <Dropdown
                        options={options}
                        placeholder='Choose Currency'
                        search
                        selection
                        allowAdditions
                        value={currentValue}
                        onAddItem={handleAddition}
                        onChange={handleChange}
                    />
                    <Label basic color='blue' pointing='left'>
                        Type in your NEW currency if not exist
                    </Label>
                </Form.Field>
            </Form>
        )
    };

    const columnDefs = [
        {headerName: "Currency Type", field: "currencyType",
            width: 150,
            resizable: true,
            editable: true,
            cellEditor: "agRichSelectCellEditor",
            cellEditorParams: {
                values: currencyOptions
            }
        },

        {
            headerName: "User Name",
            field: "userName",
            width: 150,
            editable: true
        },

        {
            headerName: "Account Number",
            field: "accountNumber",
            width: 150,
            editable: true,
        },

        {
            headerName: "Balance",
            field: "balance",
            width: 150,
            editable: true,
        },
    ];


    const onGridReady = e => {
        const { api } = e;
        setApi(api);
    };

    const onSelectionChanged = e => {
        const selectionRows = api.getSelectedRows();
        if(selectionRows.length > 0) {
            setRowSelected(true);
        } else {
            setRowSelected(false);
        }
    };

    const addRow = () => {
        const newRow = {
            currencyType: '',
            userName: '',
            accountNumber: '',
            balance: '',
        };
        api.updateRowData({ add: [newRow] , addIndex: 0});
    };

    // const editRow = () => {
    //     const selectedRows = api.getSelectedRows();
    // };

    const deleteRow = () => {
        const selectedRows = api.getSelectedRows();
        api.updateRowData({ remove: selectedRows });
    };

    const saveRow = () => {
        const temp = [];
        api.forEachNode( function(rowNode, index) {
            console.log('rowNode: ', rowNode, index);
            temp.push(rowNode.data);
        });

        handlers.persist(temp);
    };


    return (
        <Grid  >
            <Grid.Column >
                <Grid.Row>
                    <CurrencyTypes/>
                </Grid.Row>
                <br/>
                <Grid.Row>
                    <Form>
                        <Form.Field inline>
                            <Button color={'blue'} onClick={addRow} >Create Account</Button>
                            <Label basic color='blue' pointing='left'>
                                Double click currency cell to show options
                            </Label>
                        </Form.Field>
                        <Form.Field inline>
                            <Button color={'red'} onClick={deleteRow} disabled={!rowSelected}>Delete Account</Button>
                            <Label basic color='blue' pointing='left'>
                                Select account to delete, double click to edit
                            </Label>
                        </Form.Field>
                        <Form.Field>
                            <Button color={'green'} onClick={saveRow}>Persist Change</Button>
                        </Form.Field>
                    </Form>
                </Grid.Row>
                <br/>
                {(items !== undefined && items.length > 0) ?
                    <Grid.Row>
                        <div className="ag-theme-balham" style={{height: '400px', width: '600px'}}>
                            <AgGridReact
                                columnDefs={columnDefs}
                                rowData={items}
                                rowSelection="single"
                                onSelectionChanged={onSelectionChanged}
                                onGridReady = {onGridReady}
                            >
                            </AgGridReact>
                        </div>
                    </Grid.Row>:null}
            </Grid.Column>
        </Grid>
    )
};

class AccountManager extends Component {
    state = {};

    componentDidMount() {
        appState$.subscribe(val => {
            this.setState(val);
        });
    }

    render() {
        const { accounts } = this.state;
        return (
            <div>
                <Accounts items={accounts}/>
            </div>
        )
    }
}

export default AccountManager;

