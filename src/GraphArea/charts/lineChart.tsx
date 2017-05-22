import * as d3 from 'd3';

export interface LineCharProps {
    el: any,
    data: ChartDataPoint[],
    height: number,
    maxY?: number,
    numXTicks?: number,
    xLabelGenerator?: (x: number) => string
}

export interface ChartDataPoint {
    x: number,
    y: number,
    label: string
}

export class LineChart {
    constructor(props: LineCharProps) {
        this.update(props)
    }

    public update(props: LineCharProps) {
        if (!props.el) {
            return;
        }

        let boundingRect = props.el.getBoundingClientRect();

        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 25, bottom: 40, left: 40},
            width = boundingRect.width - margin.left - margin.right,
            height = props.height - margin.top - margin.bottom;

        // set the ranges
        var x = d3.scaleLinear()
                .domain(d3.extent(props.data, function(d) { return d.x; }))
                .range([0, width]);

        var y = d3.scaleLinear()
                .domain([0, props.maxY != null ? props.maxY : d3.max(props.data, function(d) { return d.y; })])
                .range([height, 0]);

        // define the line
        var valueline = d3.line<ChartDataPoint>()
            .x(function(d) { return x(d.x); })
            .y(function(d) { return y(d.y); });

        d3.select(props.el)
            .select("svg").remove();

        var svg = d3.select(props.el)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                // .selectAll("*")
                // .remove()
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            // add the valueline path.
            svg.append("path")
                .data([props.data])
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", "#222")
                .attr("d", valueline);

            svg.append("path")
                .data([props.data])
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", "#222")
                .attr("d", valueline);

            // add the X Axis
            svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x)
                    .ticks(props.numXTicks != null ? props.numXTicks : props.data.length)
                    .tickFormat(props.xLabelGenerator ? props.xLabelGenerator : (d, i) => {
                        return d.toString();
                    }));

            // add the Y Axis
            svg.append("g")
                .call(d3.axisLeft(y));
    }

    public destroy() {
        // Any clean-up would go here
        // in this example there is nothing to do
    }
}