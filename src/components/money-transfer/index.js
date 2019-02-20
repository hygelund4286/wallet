import React, { Component } from 'react';
import { Grid} from "semantic-ui-react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';

import Deposit from './deposit';
import Withdraw from './withdraw';
import Exchange from './exchange';
import Account from './account';
import Transaction from "./transaction";
import { appState$ } from '../control';

class MoneyTransfer extends Component {
    state = {};

    componentDidMount() {
        appState$.subscribe(val => {
            this.setState(val);
        });
    }

    render() {
        const { transactions, accounts } = this.state;

        return (
            <div>
                <Deposit/>
                <br/>
                <Withdraw/>
                <br/>
                <Exchange/>
                <br/>
                <Grid columns={2}>
                    <Grid.Column width={8}>
                        <Account items={accounts} />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Transaction items={transactions}/>
                    </Grid.Column>
                </Grid>
                <br/>
            </div>
        )
    }
}

export default MoneyTransfer;
