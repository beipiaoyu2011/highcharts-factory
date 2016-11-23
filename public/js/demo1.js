/**
 * demo1
 */
define(['jquery','highStock'],function($, Highcharts) {
    var seriesOptions = [],
        seriesCounter = 0,
        names = ['MSFT', 'AAPL', 'GOOG'],
        chart;
    /**
     * create  chart
     */
    function createChart () {
        chart = Highcharts.stockChart('container',{
            rangeSelector:{
                selected: 4
            },
            yAxis:{
                labels:{
                    formatter:function () {
                        var compare = this.axis.series[0].userOptions.compare || 'none';
                        var str = (compare !=='none' && this.value > 0 ? '+' : '')+ this.value + {"none": " USD","value":" USD","percent":" %"}[compare];
                        // debugger
                        // console.log(str);
                        return str;
                    }
                }
            },
            plotOptions:{
                series:{
                    compare: "value"
                }
            },
            tooltip:{
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} USD</b> ({point.change})<br/>',
                changeDecimals: 2,
                valueDecimals: 2
            },
            series: seriesOptions
        });
    }
    $.each(names, function(i, name) {
        $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?', function(data) {
            seriesOptions[i]={
                name: name,
                data: data
            };
            seriesCounter +=1;
            if(seriesCounter === names.length){
                createChart();
                // console.log(seriesOptions);
            }
        });
    });
    $('button.compare').click(function () {
        var compare = $(this).data().compare;
        // console.log(chart.yAxis[0].setCompare());
        chart.yAxis[0].setCompare(compare);

    });

});
