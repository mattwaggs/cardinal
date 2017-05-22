import * as React from 'react';
import './styles.sass'
import { Calculate } from '../calculator';

interface componentProps {
    onLoanAmountChange: (newValue) => void
    onInterestRateChange: (newValue) => void
    onPeriodChange: (newValue) => void
}

export default class InputArea extends React.Component<componentProps, void> {

    public render() {
        return (
            <div className="input-area">
                <div className="form">
                    <h1>Loan Amortization Calculator</h1>
                    <div className="input-grp">
                        <label htmlFor="loanAmnt">Total Loan Amount: </label>
                        <input type="text"
                            id="loanAmnt"
                            className="input loanAmnt"
                            onChange={(e) => this.props.onLoanAmountChange(e.currentTarget.value)}
                        />
                    </div>
                    <div className="input-grp">
                        <label htmlFor="interest">Interest Rate (%): </label>
                        <input type="text"
                            id="interest"
                            className="input interest"
                            onChange={(e) => this.props.onInterestRateChange(e.currentTarget.value)}
                        />
                    </div>
                    <div className="input-grp">
                        <label htmlFor="period">Period (months): </label>
                        <input type="text"
                            id="period"
                            className="input period"
                            onChange={(e) => this.props.onPeriodChange(e.currentTarget.value)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}