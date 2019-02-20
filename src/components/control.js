import { Observable, Subject, merge, pipe } from 'rxjs';
import { map, scan, startWith } from 'rxjs/operators';

const deposit$ = new Subject;
const withdraw$ = new Subject;
const exchange$ = new Subject;
const persist$ = new Subject;

const initialState = {
    transactions: [],

    accounts: [
        {
            currencyType: 'USD',
            userName: 'yang',
            accountNumber: '67890',
            balance: '4857',
            createdTime: Date.now()
        },
        {
            currencyType: 'EUR',
            userName: 'yang',
            accountNumber: '289234',
            balance: '84883',
            createdTime: Date.now()
        },
        {
            currencyType: 'CHF',
            userName: 'yang',
            accountNumber: '83774',
            balance: '39393',
            createdTime: Date.now()
        }
    ]
};

export const handlers = {
    deposit: row => deposit$.next(row),
    withdraw: row => withdraw$.next(row),
    exchange: rows => exchange$.next(rows),
    persist: accounts => persist$.next(accounts)
};


const depositCmd = row => state => {
    const { currencyType, balance,  user } = row;

    state.accounts.map(account => {
        if(account.currencyType === currencyType) {
            account.balance = parseInt(account.balance) + parseInt(balance);

            state.transactions.push({
                fromCurrencyType: currencyType,
                toCurrencyType: currencyType,
                fromAccountNumber: account.accountNumber,
                toAccountNumber: account.accountNumber,
                fromBalance: parseInt(account.balance),
                toBalance: parseInt(account.balance) + parseInt(balance),
                transactionType: 'deposit',
                userName: user,
                createdTime: Date.now()
            });
        }
        return account;
    });
    return state;
};

const withdrawCmd = row => state => {
    const { currencyType, balance,  user } = row;

    state.accounts.map(account => {
        if(account.currencyType === currencyType) {
            account.balance = parseInt(account.balance) - parseInt(balance);

            state.transactions.push({
                fromCurrencyType: currencyType,
                toCurrencyType: currencyType,
                fromAccountNumber: account.accountNumber,
                toAccountNumber: account.accountNumber,
                fromBalance: parseInt(account.balance),
                toBalance: parseInt(account.balance) - parseInt(balance),
                transactionType: 'withdraw',
                userName: user,
                createdTime: Date.now()
            });
        }
        return account;
    });

    return state;
};

const exchangeCmd = rows => state => {
    console.log('--exchange rows: ', rows);

    const { accounts, transactions } = state;
    const { fromCurrency,  fromAmount }  = rows.from;
    const { toCurrency, toAmount } = rows.to;

    state.accounts.map(account => {
        if(account.currencyType === fromCurrency) {
            console.log('inside from ');
            account.balance = parseInt(account.balance) - parseInt(fromAmount);

            state.transactions.push({
                fromCurrencyType: fromCurrency,
                toCurrencyType: toCurrency,
                fromAccountNumber: account.accountNumber,
                toAccountNumber: account.accountNumber,
                fromBalance: parseInt(fromAmount),
                toBalance: parseInt(toAmount),
                transactionType: 'exchange',
                userName: 'yang',
                createdTime: Date.now()
            });
        }

        if(account.currencyType === toCurrency) {
            console.log('inside to ');
            account.balance = parseInt(account.balance) + parseInt(toAmount);
        }

        return account;
    });

    return state;
};

const persistCmd = accounts => state => {
    state.accounts = accounts;
    return state;

};

export const appState$ =
    merge(
        deposit$.pipe(map(depositCmd)),
        withdraw$.pipe(map(withdrawCmd)),
        exchange$.pipe(map(exchangeCmd)),
        persist$.pipe(startWith(initialState.accounts), map(persistCmd))
    ).pipe(scan((acc, c) => c(acc), initialState));

