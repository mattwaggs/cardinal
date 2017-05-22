import * as React from 'react';
import './styles.sass'
import { result } from '../calculator';

interface componentProps {
    data: result[]
}

export default class InputArea extends React.Component<componentProps, void> {

    public render() {
        return (
            <div className="details-area">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="center">Month</th>
                            <th className="right">Monthly Payment</th>
                            <th className="right">Remaining Balance</th>
                            <th className="right">Interest</th>
                            <th className="right">Total Interest</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.length == 0 ?
                            <tr>
                                <td className="empty" colSpan={5}>Nothing to display</td>
                            </tr>
                            :
                            this.props.data.map((d) => {
                                return (
                                    <tr key={d.month} className={d.month % 12 == 0 ? "year-end" : ""}>
                                        <td className="center">{d.month}</td>
                                        <td className="right">{d.paymentAmount.toFixed(2)}</td>
                                        <td className="right">{d.remainingBalance.toFixed(2)}</td>
                                        <td className="right">{d.interestValue.toFixed(2)}</td>
                                        <td className="right">{d.totalInterestPaid.toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}