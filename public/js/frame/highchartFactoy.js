/*
 * 2016-09-28
 * author wangzhao
 * 调用方法 $(id).chartFactory(type, option);
 */
define(['jquery', 'highStock'], function($) {
    //默认option
    var defaultOption = {
        credits: {
            enabled: false //版权去除
        },
        title: {
            text: null,
            align: 'left',
            style: {
                fontSize: '12px',
                color: '#666'
            }
        },
        xAxis: {
            lineColor: '#d4d4d4',
            tickColor: '#d4d4d4'
        },
        legend: {
            itemStyle: {
                color: '#666',
                fontWeight: 'normal'
            }
        },
        exporting: {
            enabled: false //禁止下载按钮
        },
        yAxis: {
            lineColor: '#d4d4d4',
            tickWidth: 1,
            tickColor: '#d4d4d4',
            title: {
                text: null
            },
            gridLineDashStyle: 'longdash',
            labels: {
                formatter: function() {
                    return (this.value * 100).toFixed(2);
                }
            }
        },

    };
    Highcharts.setOptions({
        global: {
            timezoneOffset: -8 * 60,
            useUTC: true
        },
        lang: {
            loading: '加载中...',
            noData: '暂无数据'
        }
    });

    function Chart() {}

    Chart.prototype = {
        constructor: Chart,
        chart: function(option) {
            return $.extend(true, {}, defaultOption, option);
        },

        line: function(option) {
            var _option = {
                chart: {
                    type: 'line'
                },
                colors: ['#70a4e2', '#999'],
                tooltip: {
                    shared: true,
                    crosshairs: {
                        width: 1,
                        color: '#d4d4d4'
                    }
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom'
                },
                plotOptions: {
                    series: {
                        marker: {
                            enabled: false, //数据点标记
                            states: {
                                hover: {
                                    enabled: false //hover状态
                                }
                            }
                        },
                        states: {
                            hover: {
                                enabled: false //hover状态
                            }
                        }
                    }
                }
            };
            return $.extend(true, {}, defaultOption, _option, option);
        },

        column: function(option) {
            var _option = {
                chart: {
                    type: 'column',
                    spacingLeft: 0,
                    spacingTop: 5,
                    spacingBottom: 0
                },
                title: {
                    x: 20
                },
                colors: ['#70a4e2'],
                legend: {
                    enabled: false
                },
                scrollbar: {
                    height: 5
                },
                navigator: {
                    enabled: false,
                    height: 30,
                    margin: 5,
                    adaptToUpdatedData: false,
                    xAxis: {
                        labels: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    style: {
                        color: '#fff'
                    },
                    backgroundColor: 'rabg(0, 0, 0, .4)',
                    borderColor: 'none',
                    formatter: function() {
                        return this.point.name + '<br>' + this.series.name + ': ' + (this.point.y * 100).toFixed(2) + ' %';
                    }
                },
                xAxis: {
                    title: {
                        text: null,
                        align: "high"
                    },
                },
                yAxis: {
                    title: {
                        text: null
                    },
                    lineWidth: 1
                }
            };
            return $.extend(true, {}, defaultOption, _option, option);
        },


    };

    $.fn.chartFactory = function() {
        var args = [].slice.call(arguments);
        var fn, result, obj = new Chart();
        if ($.type(args[0]) === "string" && $.isFunction(fn = obj[args[0]])) {
            $.type(args[2]) === "array" && (args[1].series = args[2]);
            result = obj[args[0]](args[1]);
            return this.highcharts(result);
        } else if ($.type(args[0]) === "object") {
            $.type(args[1]) === "array" && (args[0].series = args[1]);
            result = obj['chart'](args[0]);
            return this.highcharts(result);
        } else if ($.type(args[0]) === "string" && !$.isFunction(fn = obj[args[0]])) {
            return this.highcharts(args);
        } else if ($.type(args[0]) === "undefined") {
            return this.highcharts();
        }
    };

});
