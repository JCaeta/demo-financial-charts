import React, { useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import { createChart, CrosshairMode, LineStyle} from 'lightweight-charts';
import styles from './CandlestickChart.module.scss';

export const CandlestickChart = (props) => {
    const chartRef = useRef(null);
    const [candlestickSeries, setCandlestickSeries] = useState(null) 
    var chart = null;
    const [data, setData] = useState(null)
    const [title, setTitle] = useState('')

    useEffect(() => {
        createCandlestickChart();
    }, [])

    useEffect(() => {
        if(props.data !== null){
            setData(props.data.data)
            setTitle(props.data.title)
        }
    }, [props.data])

    useEffect(() => {
        if(data !== null && candlestickSeries !== null){
            setupData()
        }
    }, [data, candlestickSeries])

    const setupData = async () => {
        try {
            await candlestickSeries.setData(data);
        } catch (error) {
            console.error(error);
        }
    }

    function createCandlestickChart() {
        // Access the chart element using document.getElementById()
        const chartElement = chartRef.current;
        if (!chartElement) return;

        chart = createChart(chartElement, {
            autoSize: true,
            height: props.height,
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
        });

        chart.applyOptions({
            crosshair: {
                // Change mode from default 'magnet' to 'normal'.
                // Allows the crosshair to move freely without snapping to datapoints
                mode: CrosshairMode.Normal,
        
                // Vertical crosshair line (showing Date in Label)
                vertLine: {
                    width: 8,
                    color: '#C3BCDB44',
                    style: LineStyle.Solid,
                    labelBackgroundColor: '#9B7DFF',
                },
        
                // Horizontal crosshair line (showing Price in Label)
                horzLine: {
                    color: '#9B7DFF',
                    labelBackgroundColor: '#9B7DFF',
                },
            },
        });

        setCandlestickSeries(chart.addCandlestickSeries())
        
        // Example data
        // const data = [
        //     { time: '2022-01-01', open: 50, high: 60, low: 40, close: 55 },
        //     { time: '2022-01-02', open: 55, high: 65, low: 45, close: 60 },
        //     { time: '2022-01-03', open: 60, high: 70, low: 50, close: 65 },
        //     // ...
        // ];
    }

    return (<>
        {/* Use the chartRef to reference the chart element */}
        <h3>{title}</h3>
        <div ref={chartRef} id="chart" className={styles.container}/>
    </>);
};

CandlestickChart.defaultProps = {
    data: null,
    width: 1200,
    height: 800
}

CandlestickChart.propTypes = {
    data: PropTypes.any,
    width: PropTypes.number,
    height: PropTypes.number
}
