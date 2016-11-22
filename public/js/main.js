require.config({
    paths: {
        jquery: 'js/frame/jquery-1.11.3.min',
        highStock: 'js/frame/highstock-all',
        highchartsFactory: 'js/frame/highchartFactoy'
    },
    shim: {
        'highStock': {
            exports: 'Highcharts'
        }
    },
    waitSeconds: 0
});
