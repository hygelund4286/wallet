import React, { useState } from "react";
import {Button, Dropdown, Icon, Input, Form} from "semantic-ui-react";
import {handlers} from "../control";


const Exchange = () => {
    const initialOptions = [
        { key: 'USD', text: 'USD', value: 'USD' },
        { key: 'EUR',text: 'EUR', value: 'EUR' },
        { key: 'CHF',text: 'CHF', value: 'CHF' },
        { key: 'Select',text: 'Select', value: 'Select' }
    ];

    // exchange from
    const [fromAmount, setFromAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [fromOptions, setFromOptions] = useState(initialOptions);

    // exchange to
    const [toAmount, setToAmount] = useState('');
    const [toCurrency, setToCurrency] = useState('USD');
    const [toOptions, setToOptions] = useState(initialOptions);



    const validExchange = (fromAmount,toAmount, fromCurrency, toCurrency) => {
        return (fromAmount.length > 0 && parseInt(fromAmount) > 0) && (toAmount.length > 0)
            && (fromCurrency === 'USD' || fromCurrency === 'EUR' || fromCurrency === 'CHF')
            && (toCurrency === 'USD' || toCurrency === 'EUR' || toCurrency === 'CHF')
    };

    const handleFromAmountChange = (e, { value }) => {
        setFromAmount(value);
    };

    const handleFromCurrencyChange = (e, { value }) => {
        setFromCurrency(value);
        const newOptions = initialOptions.filter(option => option.value !== value);
        setToOptions(newOptions);
    };


    /**
     * Exchange rate (hardcoded)
     *
     * 1 USD = 0.88 EUR
     * 1 USD = 1.00 CHF
     *
     * 1 EUR = 1.14 CHF
     * 1 EUR = 1.13 USD
     *
     * 1 CHF = 1 USD
     * 1 CHF = 0.88 EUR
     *
     */

    const handleToCurrencyChange = (e, { value }) => {
        setToCurrency(value);

        const compute = (amount, rate) => (parseInt(amount) * rate).toFixed(2);

        /**
         * hard-code exchange logic
         */
        if(toCurrency === '') {
            return
        }

        if(fromCurrency === 'USD' && toCurrency === 'EUR') {
            console.log('usd-eur');
            // setToAmount(fromAmount * 0.88);
            setToAmount(compute(fromAmount, 0.88));
        }

        if(fromCurrency === 'USD' && toCurrency === 'CHF') {
            console.log('usd-chf');
            //setToAmount(fromAmount * 1.00);
            setToAmount(compute(fromAmount, 1.00));
        }

        if(fromCurrency === 'EUR' && toCurrency === 'CHF') {
            console.log('eur-chf');
            setToAmount(fromAmount * 1.14);
            setToAmount(compute(fromAmount, 1.14));
        }

        if(fromCurrency === 'EUR' && toCurrency === 'USD') {
            console.log('eur-usd');
            //setToAmount(fromAmount * 1.13);
            setToAmount(compute(fromAmount, 1.13));
        }

        if(fromCurrency === 'CHF' && toCurrency === 'USD') {
            console.log('chf-usd');
            //setToAmount(fromAmount * 1.00);
            setToAmount(compute(fromAmount, 1.00));
        }

        if(fromCurrency === 'CHF' && toCurrency === 'EUR') {
            console.log('chf-eur');
            //setToAmount(fromAmount * 0.88);
            setToAmount(compute(fromAmount, 0.88));
        }
    };

    const handleExchange = () => {
        console.log('fromAmount: ', fromAmount);
        console.log('fromCurrency: ', fromCurrency);

        const rows = {
            from: {
                fromAmount,
                fromCurrency
            },
            to: {
                toAmount,
                toCurrency
            }
        };
        handlers.exchange(rows);
    };


    return (
        <Form>
            <Form.Group>
                <Form.Field>
                    <Input
                        action={<Dropdown button basic floating options={fromOptions} defaultValue='Select'
                                          onChange={handleFromCurrencyChange}/>}
                        labelPosition='right'
                        value={fromAmount}
                        onChange={handleFromAmountChange}
                        placeholder='Amount...'
                    />
                </Form.Field>
                <Form.Field >
                    <Icon name='shuffle' size='big' color='blue' />
                </Form.Field>
                <Form.Field>
                    <Input
                        action={<Dropdown button basic floating options={toOptions} defaultValue='Select'
                                          onChange={handleToCurrencyChange}/>}
                        labelPosition='right'
                        value={toAmount}
                        placeholder='Amount...'
                    />
                </Form.Field>
                <Form.Field>
                    <Button color='green'
                            disabled={!(validExchange(fromAmount,toAmount, fromCurrency, toCurrency))}
                            onClick={handleExchange}>Exchange</Button>
                </Form.Field>
            </Form.Group>
        </Form>
    )
};

export default Exchange;
