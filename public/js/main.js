require.config({
    paths: {
        jquery: 'js/frame/jquery-1.11.3.min',
        highStock: 'js/frame/highstock-all',
        highchartsFactory: 'js/frame/highchartFactoy',
        popup: 'js/popup'
    },
    shim: {
        'highStock': {
            exports: 'Highcharts'
        },
        'popup':{
            deps:['jquery']
        }
    },
    waitSeconds: 0
});
