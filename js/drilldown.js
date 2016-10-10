$(function () {
    //日常趋势
    function dailyChart(data,drilldown){

        var a=$('#drilldown-daily').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: '拉勾 web前端 西安 每日新建职位数量统计'
            },
            subtitle: {
                text: '点击柱图查看地区. 来源: <a href="http://www.lagou.com/">拉勾网</a>.'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: '职位数量'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },

            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: data
            }],
            drilldown: {
                series: drilldown
            }
        });
        // console.log(a)
        return a;//定义日常趋势图函数
    }
    $.getJSON('./data/daily',null,function(data){
           dailyChart(data.data,data.drilldown);
        });

    $('#nav-list > ul > li:nth-child(1) > a').click(function(){
        var chart=$('#drilldown-daily').highcharts();
        chart.reflow();
        setTimeout(function(){chart.reflow()},170);
    });

    //地区饼图
    function pieDistrict(data,dateRange){ //地区饼图函数
        // console.log(dateRange)
        $('#pie-district').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: '拉勾网 西安 职位地区分布'
            },
            subtitle:{
                text: dateRange[0]+' 至 '+dateRange[1]
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%,{point.y}个</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: '地区',
                colorByPoint: true,
                data:data,
            }]
        });
        // console.log(data)
    }
    $.getJSON('./data/district',null,function(data){
        data.pieData[0].sliced=true;
        data.pieData[0].selected=true;
        pieDistrict(data.pieData,data.dateRange);
    });
    $('#nav-list > ul > li:nth-child(2) > a').click(function(){
        var chart=$('#pie-district').highcharts();
        chart.reflow();
        setTimeout(function(){chart.reflow()},170);
    });

    //薪资饼图
    function pieSalary(data,dateRange){ //地区饼图函数
        // console.log(dateRange)
        $('#pie-salary').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: '拉勾网 西安 薪资区间分布'
            },
            subtitle:{
                text: dateRange[0]+' 至 '+dateRange[1]
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%,{point.y}个</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: '地区',
                colorByPoint: true,
                data:data,
            }]
        });
        // console.log(data)
    }
    $.getJSON('./data/salary',null,function(data){
        data.pieData[0].sliced=true;
        data.pieData[0].selected=true;
        pieSalary(data.pieData,data.dateRange);
    });
    $('#nav-list > ul > li:nth-child(3) > a').click(function(){
        var chart=$('#pie-salary').highcharts();
        chart.reflow();
        setTimeout(function(){chart.reflow()},170);
    });
    function pieWorkyear(data,dateRange){ //地区饼图函数
        // console.log(dateRange)
        $('#pie-workyear').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: '拉勾网 西安 职位年限要求分布'
            },
            subtitle:{
                text: dateRange[0]+' 至 '+dateRange[1]
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%,{point.y}个</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: '年限',
                colorByPoint: true,
                data:data,
            }]
        });
        // console.log(data)
    }
    $.getJSON('./data/salary',null,function(data){
        data.pieData[0].sliced=true;
        data.pieData[0].selected=true;
        pieWorkyear(data.pieWorkyear,data.dateRange);
    });
    $('#nav-list > ul > li:nth-child(3) > a').click(function(){
        var chart=$('#pie-workyear').highcharts();
        chart.reflow();
        setTimeout(function(){chart.reflow()},170);
    });
});

$(function () {
    
});
$(function () {
    $('#pie-district2').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares January, 2015 to May, 2015'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Microsoft Internet Explorer',
                y: 56.33
            }, {
                name: 'Chrome',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Firefox',
                y: 10.38
            }, {
                name: 'Safari',
                y: 4.77
            }, {
                name: 'Opera',
                y: 0.91
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2
            }]
        }]
    });
});