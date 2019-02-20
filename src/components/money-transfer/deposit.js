import React, { useState } from "react";
import {Button, Dropdown, Input, Form} from "semantic-ui-react";
import {handlers} from "../control";

const Deposit = () => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');

    const options = [
        { key: 0, text: 'USD', value: 'USD' },
        { key: 1, text: 'EUR', value: 'EUR' },
        { key: 2, text: 'CHF', value: 'CHF' }
    ];

    const handleChange = (e, { value }) => {
        setAmount(value);
    };

    const handleDeposit = () => {
        handlers.deposit({
            currencyType: currency,
            balance: amount,
            transactionType: 'deposit',
            user: 'yang'
        });
        setAmount('');
    };

    const handleCurrencyChange = (e, { value }) => setCurrency(value);

    const currencyDropdown = <Dropdown defaultValue='USD' options={options} onChange={handleCurrencyChange}/>;

    const validInput = amount => amount.length > 0 && parseInt(amount) > 0;

    const handleSubmit = () => {
        if(validInput(amount)) {
            handlers.deposit({
                accountType: currency,
                balance: amount,
                transactionType: 'deposit',
                user: 'yang'
            });
            setAmount('');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Field>
                    <Input
                        label={currencyDropdown}
                        labelPosition='right'
                        value={amount}
                        onChange={handleChange}
                        placeholder='Input amount ...'
                    />
                </Form.Field>
                <Form.Field>
                    <Button color='green' onClick={handleDeposit} disabled={!validInput(amount)}>Deposit</Button>
                </Form.Field>
            </Form.Group>
        </Form>
    )
};

export default Deposit;
