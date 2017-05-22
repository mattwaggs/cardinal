import * as React from 'react';
import './styles.sass'
import { result } from '../calculator';
import { LineChart, ChartDataPoint, LineCharProps } from './charts/lineChart';

interface componentProps {
    data: result[]
}

export default class GraohArea extends React.Component<componentProps, void> {
    private chartElement;
    private graph: LineChart;
    private resizeDebounceToken = null;

    public componentWillMount() {
        this.graph = new LineChart(this.getChartState())

        if (typeof window !== "undefined") {
            window.addEventListener("resize", this.handleWindowResize);
        }
    }

    componentDidMount() {
        this.graph.update(this.getChartState())
    }

    public componentDidUpdate() {
        if (this.graph)
            this.graph.update(this.getChartState())
    }

    public componentWillUnmount() {
        if (this.graph) {
            this.graph.destroy();
        }

        if (typeof window !== "undefined") {
            window.removeEventListener("resize", this.handleWindowResize);
        }
    }


    public render() {
        return (
            <div className="graph-area">
                <div ref={(el) => this.chartElement = el}></div>
            </div>
        )
    }

    private getChartState = () : LineCharProps => {
        return {
            el: this.chartElement,
            data: this.props.data.map(this.dataTranslation("totalInterestPaid")),
            height: 250,
            numXTicks: 10
        } as LineCharProps
    }

    private dataTranslation = (field: keyof result) => (result: result) : ChartDataPoint => {
        return {
            x: result.month,
            y: result[field],
            label: result[field].toString()
        }
    }

    private handleWindowResize = () => {
        if (this.resizeDebounceToken != null) {
            window.clearTimeout(this.resizeDebounceToken);
        }
        this.resizeDebounceToken = window.setTimeout(() => {
            this.graph.update(this.getChartState());
        }, 100);
    }

}