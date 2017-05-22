export interface result {
    month: number,
    remainingBalance: number,
    interestValue: number,
    totalInterestPaid: number,
    paymentAmount: number
}

export const Calculate = (loanAmnt: number, rate: number, months: number) => {
    let loanAmount = Number(loanAmnt);
    let interestRate = Number(rate) / 100;
    let period = Number(months);

    if (period >= 100) {
        throw "Period must be < 100 months"
    }

    if (!numbersAreValid(loanAmount, interestRate, period)) {
        return [];
    }

    let equalPaymentAmount = calculateMonthlyPaymentAmount(loanAmount, interestRate, period);
    let remainingBalance = loanAmount;
    let results = [] as result[]
    let month = 1;

    while (remainingBalance > 0 && month <= period) {
        let interestValue = remainingBalance * interestRate / 12;
        remainingBalance -= (equalPaymentAmount - interestValue);

        let result = {
            month,
            remainingBalance,
            interestValue,
            totalInterestPaid: results.filter((r) => r.month < month)
                                      .map((r) => r.interestValue)
                                      .reduce((prev, curr) => prev+curr, 0) + interestValue,

            paymentAmount: equalPaymentAmount
        } as result;

        results.push(result)
        month += 1;
    }

    return results;
}

const numbersAreValid = (loanAmount: number, interestRate: number, period: number) => {
    return loanAmount !== NaN && interestRate !== NaN && period !== NaN;
}

const calculateMonthlyPaymentAmount = (loanAmount: number, interestRate: number, period: number) => {
    return (interestRate/12 * loanAmount) / ( 1 - Math.pow((1 + interestRate/12), -period));
}