import * as React from 'react';
import InputArea from '../InputArea';
import DetailsArea from '../DetailsArea';
import GraphArea from '../GraphArea';
import './styles.sass'

import { Calculate } from '../calculator';

interface componentState {
    loanAmount: number,
    interestRate: number,
    period: number
}

export default class App extends React.Component<void, componentState> {

    constructor() {
        super();
        this.state = { loanAmount: 0, interestRate: 0, period: 0 }
    }

    public render() {
        let data = [];
        let error = "";

        try {
            data = Calculate(this.state.loanAmount, this.state.interestRate, this.state.period);
        } catch (ex) {
            error = ex;
        }

        return (
            <div>
                <InputArea
                    onLoanAmountChange={this.onLoanAmountChange}
                    onInterestRateChange={this.onInterestRateChange}
                    onPeriodChange={this.onPeriodChange}
                    />
                {
                    (data.length > 0 && !error) ?
                        <div>
                            {this.renderOverview(data)}
                            <GraphArea data={data as any} />
                            <DetailsArea data={data as any} />
                        </div>
                        :
                        <h2 className="empty">{error.length > 0 ? error : "Nothing To Display"}</h2>
                }
            </div>
        )
    }

    private onLoanAmountChange = (newValue: number) => {
        this.setState({ ...this.state, loanAmount: newValue });
    }
    private onInterestRateChange = (newValue: number) => {
        this.setState({ ...this.state, interestRate: newValue });
    }
    private onPeriodChange = (newValue: number) => {
        this.setState({ ...this.state, period: newValue });
    }
    private renderOverview = (data) => {
        return (
            <div className="overview-area">
                <div className="item item1">
                    <div className="number">
                        {
                            this.money(data[0].paymentAmount)
                        }
                    </div>
                    <div className="label">Monthly Payment</div>
                </div>
                <div className="item item2">
                    <div className="number">
                        {
                            this.money(data[data.length - 1].totalInterestPaid)
                        }
                    </div>
                    <div className="label">Total Interest</div>
                </div>
                <div className="item item3">
                    <div className="number">
                        {
                            this.money(Number(data[data.length - 1].totalInterestPaid) + Number(this.state.loanAmount))
                        }
                    </div>
                    <div className="label">Total Cost</div>
                </div>
            </div>
        )
    }
    private money = (input) => {
        return `$${Number(input).toFixed(2)}`;
    }
}
