/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 58.0, "series": [{"data": [[300.0, 4.0], [200.0, 9.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[300.0, 3.0], [200.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[0.0, 2.0], [200.0, 3.0], [100.0, 8.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[0.0, 12.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[0.0, 3.0], [200.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[0.0, 8.0], [300.0, 1.0], [100.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[0.0, 11.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[0.0, 2.0], [100.0, 11.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[0.0, 6.0], [300.0, 2.0], [100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[0.0, 10.0], [300.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[0.0, 8.0], [100.0, 2.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [400.0, 1.0], [100.0, 3.0], [200.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[0.0, 7.0], [300.0, 1.0], [200.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[0.0, 5.0], [100.0, 5.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[0.0, 12.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[0.0, 12.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[0.0, 11.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0], [100.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[0.0, 2.0], [200.0, 6.0], [100.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[0.0, 12.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[0.0, 10.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[0.0, 10.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[100.0, 12.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[200.0, 11.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[300.0, 2.0], [200.0, 9.0], [400.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [200.0, 6.0], [100.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[0.0, 10.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[0.0, 4.0], [1200.0, 1.0], [100.0, 4.0], [200.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [1200.0, 1.0], [100.0, 6.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[0.0, 11.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[0.0, 8.0], [300.0, 1.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[0.0, 5.0], [1200.0, 1.0], [200.0, 3.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[2100.0, 1.0], [1200.0, 3.0], [1300.0, 2.0], [1600.0, 1.0], [900.0, 1.0], [1000.0, 5.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[0.0, 2.0], [300.0, 1.0], [1200.0, 1.0], [200.0, 6.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[0.0, 2.0], [200.0, 8.0], [400.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[0.0, 8.0], [200.0, 1.0], [100.0, 3.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 9.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1400.0, 1.0], [100.0, 8.0], [200.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[0.0, 1.0], [300.0, 4.0], [200.0, 6.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [100.0, 7.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[0.0, 1.0], [100.0, 11.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 2.0], [100.0, 9.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[0.0, 9.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[0.0, 10.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[0.0, 8.0], [100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[0.0, 2.0], [100.0, 8.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[0.0, 12.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[0.0, 8.0], [200.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[0.0, 11.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [100.0, 5.0], [200.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[0.0, 7.0], [100.0, 5.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[0.0, 12.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[0.0, 6.0], [100.0, 3.0], [200.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 3.0], [200.0, 8.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[300.0, 5.0], [1400.0, 1.0], [400.0, 2.0], [200.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[0.0, 6.0], [200.0, 3.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[0.0, 4.0], [200.0, 2.0], [100.0, 7.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[0.0, 2.0], [200.0, 3.0], [100.0, 8.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[0.0, 12.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[0.0, 11.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0], [200.0, 8.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[0.0, 10.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[0.0, 10.0], [300.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[600.0, 1.0], [2700.0, 1.0], [100.0, 5.0], [200.0, 1.0], [400.0, 1.0], [15000.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[0.0, 29.0], [1100.0, 1.0], [100.0, 34.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[4600.0, 1.0], [4400.0, 1.0], [4700.0, 1.0], [10900.0, 1.0], [5900.0, 1.0], [12500.0, 1.0], [13800.0, 3.0], [13500.0, 1.0], [7500.0, 1.0], [15100.0, 1.0], [15800.0, 1.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1100.0, 4.0], [800.0, 3.0], [900.0, 3.0], [1900.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[600.0, 2.0], [300.0, 1.0], [2500.0, 1.0], [4900.0, 1.0], [2600.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [200.0, 1.0], [100.0, 2.0], [800.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[600.0, 1.0], [2700.0, 2.0], [1400.0, 1.0], [1500.0, 1.0], [100.0, 6.0], [7100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[0.0, 1.0], [2200.0, 1.0], [600.0, 1.0], [4800.0, 1.0], [19600.0, 1.0], [5200.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [400.0, 1.0], [100.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[600.0, 1.0], [3100.0, 1.0], [800.0, 1.0], [900.0, 1.0], [3800.0, 1.0], [4100.0, 1.0], [1200.0, 1.0], [76600.0, 1.0], [1300.0, 1.0], [6100.0, 1.0], [23700.0, 1.0], [6600.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [21100.0, 1.0], [1400.0, 2.0], [700.0, 1.0], [2700.0, 1.0], [5700.0, 1.0], [3000.0, 1.0], [3100.0, 1.0], [400.0, 1.0], [3300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 1.0], [2500.0, 1.0], [1300.0, 3.0], [700.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [500.0, 1.0], [1000.0, 2.0], [4000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[600.0, 1.0], [2600.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [1700.0, 3.0], [1800.0, 1.0], [1900.0, 1.0], [3900.0, 1.0], [2000.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[0.0, 1.0], [1200.0, 1.0], [600.0, 1.0], [700.0, 1.0], [200.0, 1.0], [100.0, 5.0], [1600.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[300.0, 3.0], [200.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [100.0, 5.0], [800.0, 2.0], [400.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[4500.0, 1.0], [9100.0, 1.0], [10900.0, 1.0], [6000.0, 1.0], [12200.0, 3.0], [12300.0, 1.0], [3100.0, 3.0], [13200.0, 1.0], [14300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[35700.0, 1.0], [38800.0, 1.0], [39100.0, 1.0], [39600.0, 1.0], [40800.0, 1.0], [39000.0, 1.0], [41700.0, 1.0], [58500.0, 1.0], [82500.0, 1.0], [25600.0, 1.0], [31000.0, 1.0], [31700.0, 1.0], [32000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[300.0, 3.0], [200.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[600.0, 1.0], [100.0, 8.0], [800.0, 1.0], [400.0, 1.0], [7800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[2300.0, 1.0], [19200.0, 1.0], [600.0, 1.0], [300.0, 1.0], [10100.0, 1.0], [700.0, 3.0], [100.0, 1.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1200.0, 1.0], [600.0, 1.0], [300.0, 2.0], [1300.0, 1.0], [700.0, 2.0], [1500.0, 1.0], [100.0, 1.0], [400.0, 1.0], [800.0, 1.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[2200.0, 3.0], [2300.0, 2.0], [2900.0, 1.0], [1900.0, 4.0], [2000.0, 3.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[300.0, 2.0], [2800.0, 1.0], [800.0, 2.0], [200.0, 4.0], [100.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[2300.0, 1.0], [600.0, 1.0], [2800.0, 1.0], [700.0, 1.0], [400.0, 3.0], [100.0, 6.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[600.0, 1.0], [1200.0, 2.0], [700.0, 4.0], [2900.0, 1.0], [400.0, 1.0], [3600.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[100.0, 9.0], [200.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[100.0, 7.0], [200.0, 2.0], [800.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[0.0, 2.0], [600.0, 1.0], [2500.0, 1.0], [2800.0, 1.0], [1500.0, 1.0], [100.0, 4.0], [800.0, 1.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[8700.0, 1.0], [0.0, 1.0], [700.0, 1.0], [100.0, 8.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[600.0, 2.0], [700.0, 7.0], [800.0, 1.0], [1700.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[2200.0, 1.0], [1200.0, 1.0], [700.0, 1.0], [1500.0, 2.0], [23800.0, 1.0], [200.0, 2.0], [800.0, 1.0], [900.0, 1.0], [2000.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[0.0, 2.0], [200.0, 6.0], [400.0, 1.0], [100.0, 3.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[4100.0, 1.0], [4400.0, 1.0], [2300.0, 1.0], [2200.0, 1.0], [600.0, 1.0], [2600.0, 1.0], [1500.0, 1.0], [800.0, 1.0], [1700.0, 2.0], [900.0, 1.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[0.0, 3.0], [200.0, 8.0], [100.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[0.0, 10.0], [200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 2.0], [1400.0, 1.0], [400.0, 5.0], [500.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[4400.0, 1.0], [2200.0, 2.0], [9600.0, 1.0], [10100.0, 1.0], [5800.0, 1.0], [6800.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 2.0], [2000.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[100.0, 4.0], [200.0, 8.0], [800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[200.0, 12.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [200.0, 7.0], [100.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 6.0], [200.0, 4.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [5500.0, 1.0], [200.0, 6.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[200.0, 7.0], [100.0, 5.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[4200.0, 1.0], [1100.0, 5.0], [2300.0, 1.0], [1200.0, 3.0], [1300.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[300.0, 1.0], [100.0, 3.0], [200.0, 9.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[0.0, 1.0], [100.0, 6.0], [200.0, 6.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[0.0, 11.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[200.0, 9.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[200.0, 5.0], [100.0, 7.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[300.0, 3.0], [200.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[600.0, 3.0], [300.0, 1.0], [10400.0, 1.0], [700.0, 1.0], [200.0, 1.0], [400.0, 2.0], [800.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[4200.0, 2.0], [2200.0, 1.0], [9500.0, 1.0], [600.0, 1.0], [4900.0, 1.0], [10500.0, 1.0], [700.0, 1.0], [1600.0, 1.0], [3400.0, 1.0], [3500.0, 1.0], [900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 6.0], [400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[11900.0, 1.0], [15000.0, 1.0], [16000.0, 1.0], [16800.0, 1.0], [20000.0, 1.0], [21800.0, 1.0], [23300.0, 1.0], [26000.0, 1.0], [25900.0, 1.0], [26900.0, 1.0], [27600.0, 1.0], [29600.0, 1.0], [32600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[300.0, 1.0], [200.0, 11.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[0.0, 10.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[0.0, 11.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[0.0, 8.0], [300.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[0.0, 9.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[0.0, 7.0], [1200.0, 1.0], [400.0, 2.0], [100.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[0.0, 5.0], [100.0, 5.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[0.0, 8.0], [100.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[0.0, 10.0], [300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[0.0, 2.0], [100.0, 5.0], [200.0, 5.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[0.0, 2.0], [200.0, 6.0], [100.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[0.0, 3.0], [4400.0, 1.0], [700.0, 1.0], [200.0, 3.0], [100.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[0.0, 3.0], [600.0, 2.0], [100.0, 3.0], [200.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[0.0, 58.0], [300.0, 2.0], [100.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1100.0, 1.0], [100.0, 6.0], [200.0, 6.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[0.0, 10.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[0.0, 12.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[0.0, 8.0], [200.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[35900.0, 1.0], [38900.0, 1.0], [39300.0, 1.0], [39800.0, 1.0], [39200.0, 1.0], [41900.0, 1.0], [41100.0, 1.0], [59800.0, 1.0], [82800.0, 1.0], [25900.0, 1.0], [31300.0, 1.0], [31900.0, 1.0], [32300.0, 1.0]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[2500.0, 1.0], [10300.0, 1.0], [2600.0, 1.0], [11400.0, 1.0], [12200.0, 1.0], [3500.0, 1.0], [4400.0, 1.0], [1200.0, 1.0], [6100.0, 1.0], [6600.0, 1.0], [1800.0, 1.0], [1900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[9200.0, 1.0], [9000.0, 1.0], [9100.0, 1.0], [9400.0, 1.0], [10200.0, 1.0], [10700.0, 1.0], [3000.0, 1.0], [13100.0, 1.0], [19300.0, 1.0], [21500.0, 1.0], [21700.0, 1.0], [1800.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[0.0, 2.0], [2400.0, 1.0], [2800.0, 1.0], [22800.0, 1.0], [800.0, 1.0], [6600.0, 1.0], [1600.0, 1.0], [3400.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [7500.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[600.0, 2.0], [4700.0, 1.0], [1200.0, 1.0], [2500.0, 1.0], [1300.0, 1.0], [3000.0, 1.0], [24000.0, 1.0], [200.0, 1.0], [100.0, 1.0], [900.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [10400.0, 1.0], [700.0, 1.0], [2700.0, 1.0], [5400.0, 1.0], [24200.0, 1.0], [200.0, 2.0], [900.0, 1.0], [3600.0, 1.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[2200.0, 1.0], [1200.0, 1.0], [2400.0, 1.0], [37900.0, 1.0], [1300.0, 1.0], [46300.0, 1.0], [3000.0, 1.0], [400.0, 1.0], [6800.0, 1.0], [1800.0, 1.0], [1900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[2200.0, 1.0], [1100.0, 1.0], [1200.0, 1.0], [600.0, 1.0], [1400.0, 2.0], [700.0, 1.0], [1500.0, 1.0], [6200.0, 1.0], [400.0, 2.0], [800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[2300.0, 1.0], [2400.0, 2.0], [300.0, 1.0], [1300.0, 1.0], [3000.0, 1.0], [100.0, 1.0], [3400.0, 1.0], [7100.0, 1.0], [14200.0, 1.0], [3700.0, 1.0], [1900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [2800.0, 1.0], [2700.0, 2.0], [11400.0, 1.0], [200.0, 1.0], [400.0, 2.0], [1600.0, 1.0], [900.0, 1.0], [7300.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[600.0, 2.0], [300.0, 2.0], [1500.0, 1.0], [100.0, 5.0], [400.0, 1.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[4200.0, 1.0], [4100.0, 1.0], [4300.0, 2.0], [4400.0, 1.0], [5500.0, 1.0], [6400.0, 1.0], [3400.0, 2.0], [3500.0, 3.0], [3600.0, 1.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[0.0, 1.0], [300.0, 26.0], [600.0, 4.0], [700.0, 3.0], [400.0, 10.0], [200.0, 56.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 82800.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 12.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1654.0, "series": [{"data": [[0.0, 1654.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 230.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 210.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 12.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 2.0, "minX": 1.6619565E12, "maxY": 14.0, "series": [{"data": [[1.66195662E12, 12.986754966887416], [1.66195656E12, 13.9873417721519], [1.66195674E12, 2.0], [1.66195668E12, 6.599999999999995], [1.6619565E12, 14.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66195674E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 52.0, "minX": 2.0, "maxY": 41591.769230769234, "series": [{"data": [[14.0, 295.2307692307692]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[14.0, 295.2307692307692]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300-Aggregated", "isController": false}, {"data": [[14.0, 274.9230769230769]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[14.0, 274.9230769230769]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301-Aggregated", "isController": false}, {"data": [[11.0, 67.0], [12.0, 158.0], [6.0, 192.0], [13.0, 191.33333333333334], [14.0, 196.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[12.461538461538462, 176.23076923076923]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21-Aggregated", "isController": false}, {"data": [[11.0, 319.0], [12.0, 84.0], [6.0, 78.0], [13.0, 73.66666666666667], [14.0, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[12.461538461538462, 94.23076923076924]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20-Aggregated", "isController": false}, {"data": [[11.0, 184.0], [12.0, 162.0], [6.0, 218.0], [13.0, 171.66666666666666], [14.0, 191.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[12.461538461538462, 181.53846153846158]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22-Aggregated", "isController": false}, {"data": [[11.0, 88.0], [12.0, 124.33333333333333], [6.0, 72.0], [13.0, 147.33333333333334], [14.0, 134.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[12.461538461538462, 126.53846153846158]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4-Aggregated", "isController": false}, {"data": [[11.0, 105.0], [12.0, 68.0], [6.0, 105.0], [13.0, 72.33333333333333], [14.0, 70.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[12.461538461538462, 75.76923076923075]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5-Aggregated", "isController": false}, {"data": [[11.0, 103.0], [12.0, 108.0], [6.0, 99.0], [13.0, 101.33333333333333], [14.0, 109.6]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[12.461538461538462, 105.99999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6-Aggregated", "isController": false}, {"data": [[11.0, 86.0], [12.0, 129.33333333333334], [6.0, 64.0], [13.0, 241.66666666666666], [14.0, 155.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[12.461538461538462, 156.76923076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7-Aggregated", "isController": false}, {"data": [[11.0, 71.0], [12.0, 82.0], [6.0, 84.0], [13.0, 171.33333333333334], [14.0, 125.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[12.461538461538462, 118.61538461538458]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8-Aggregated", "isController": false}, {"data": [[11.0, 69.0], [12.0, 165.0], [6.0, 68.0], [13.0, 184.0], [14.0, 85.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[12.461538461538462, 124.07692307692305]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9-Aggregated", "isController": false}, {"data": [[11.0, 99.0], [12.0, 160.66666666666666], [6.0, 71.0], [13.0, 255.33333333333334], [14.0, 214.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[12.461538461538462, 191.53846153846155]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10-Aggregated", "isController": false}, {"data": [[11.0, 79.0], [12.0, 166.66666666666666], [6.0, 79.0], [13.0, 212.33333333333334], [14.0, 127.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[12.461538461538462, 148.76923076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12-Aggregated", "isController": false}, {"data": [[11.0, 75.0], [12.0, 116.33333333333333], [6.0, 71.0], [13.0, 185.0], [14.0, 143.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[12.461538461538462, 136.07692307692307]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11-Aggregated", "isController": false}, {"data": [[8.0, 57.0], [2.0, 64.0], [9.0, 54.0], [10.0, 191.0], [11.0, 57.0], [12.0, 57.0], [3.0, 53.0], [13.0, 54.0], [14.0, 55.0], [4.0, 63.0], [5.0, 61.0], [6.0, 54.0], [7.0, 54.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[8.0, 67.23076923076923]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20-Aggregated", "isController": false}, {"data": [[11.0, 67.0], [12.0, 120.0], [6.0, 73.0], [13.0, 66.33333333333333], [14.0, 79.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[12.461538461538462, 84.30769230769232]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14-Aggregated", "isController": false}, {"data": [[11.0, 88.0], [12.0, 85.66666666666667], [6.0, 62.0], [13.0, 118.0], [14.0, 78.6]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[12.461538461538462, 88.76923076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13-Aggregated", "isController": false}, {"data": [[11.0, 89.0], [12.0, 123.66666666666667], [6.0, 71.0], [13.0, 159.66666666666669], [14.0, 107.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[12.461538461538462, 119.15384615384615]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16-Aggregated", "isController": false}, {"data": [[8.0, 197.0], [2.0, 201.0], [9.0, 206.0], [10.0, 215.0], [11.0, 196.0], [12.0, 164.0], [3.0, 76.0], [13.0, 193.0], [14.0, 208.0], [4.0, 96.0], [5.0, 254.0], [6.0, 214.0], [7.0, 198.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[8.0, 186.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23-Aggregated", "isController": false}, {"data": [[11.0, 70.0], [12.0, 74.33333333333333], [6.0, 72.0], [13.0, 75.66666666666667], [14.0, 106.2]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[12.461538461538462, 86.38461538461539]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15-Aggregated", "isController": false}, {"data": [[11.0, 85.0], [12.0, 134.33333333333334], [6.0, 105.0], [13.0, 85.66666666666667], [14.0, 91.2]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[12.461538461538462, 100.46153846153845]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18-Aggregated", "isController": false}, {"data": [[8.0, 60.0], [2.0, 79.0], [9.0, 78.0], [10.0, 77.0], [11.0, 62.0], [12.0, 69.0], [3.0, 80.0], [13.0, 70.0], [14.0, 85.0], [4.0, 72.0], [5.0, 75.0], [6.0, 74.0], [7.0, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[8.0, 73.38461538461537]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21-Aggregated", "isController": false}, {"data": [[11.0, 69.0], [12.0, 115.66666666666667], [6.0, 81.0], [13.0, 116.33333333333334], [14.0, 76.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[12.461538461538462, 94.61538461538461]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17-Aggregated", "isController": false}, {"data": [[8.0, 174.0], [2.0, 186.0], [9.0, 182.0], [10.0, 185.0], [11.0, 195.0], [12.0, 194.0], [3.0, 183.0], [13.0, 187.0], [14.0, 182.0], [4.0, 222.0], [5.0, 188.0], [6.0, 171.0], [7.0, 174.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[8.0, 186.3846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22-Aggregated", "isController": false}, {"data": [[11.0, 52.0], [12.0, 53.666666666666664], [6.0, 58.0], [13.0, 54.0], [14.0, 68.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[12.461538461538462, 59.61538461538462]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19-Aggregated", "isController": false}, {"data": [[14.0, 360.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[14.0, 360.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895-Aggregated", "isController": false}, {"data": [[8.0, 282.0], [12.0, 225.0], [13.0, 253.5], [14.0, 325.2857142857143]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[13.076923076923077, 292.15384615384613]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896-Aggregated", "isController": false}, {"data": [[14.0, 230.3846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[14.0, 230.3846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9-Aggregated", "isController": false}, {"data": [[8.0, 69.0], [2.0, 80.0], [9.0, 73.0], [10.0, 76.0], [11.0, 82.0], [12.0, 77.0], [3.0, 64.0], [13.0, 67.0], [14.0, 183.0], [4.0, 92.0], [5.0, 105.0], [6.0, 101.0], [7.0, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[8.0, 87.84615384615384]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18-Aggregated", "isController": false}, {"data": [[8.0, 79.0], [2.0, 82.0], [9.0, 70.0], [10.0, 80.0], [11.0, 63.0], [12.0, 73.0], [3.0, 69.0], [13.0, 73.0], [14.0, 73.0], [4.0, 90.0], [5.0, 89.0], [6.0, 77.0], [7.0, 85.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[8.0, 77.15384615384615]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19-Aggregated", "isController": false}, {"data": [[14.0, 252.15384615384616]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[14.0, 252.15384615384616]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3-Aggregated", "isController": false}, {"data": [[14.0, 268.38461538461536]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[14.0, 268.38461538461536]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4-Aggregated", "isController": false}, {"data": [[8.0, 76.0], [12.0, 64.0], [13.0, 134.33333333333334], [14.0, 92.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[13.153846153846155, 98.6923076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19-Aggregated", "isController": false}, {"data": [[14.0, 124.3076923076923]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[14.0, 124.3076923076923]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1-Aggregated", "isController": false}, {"data": [[14.0, 248.7692307692308]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[14.0, 248.7692307692308]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2-Aggregated", "isController": false}, {"data": [[8.0, 1000.0], [2.0, 1056.0], [9.0, 1336.0], [10.0, 1205.0], [11.0, 2135.0], [12.0, 1088.0], [3.0, 1204.0], [13.0, 942.0], [14.0, 1311.0], [4.0, 1082.0], [5.0, 1643.0], [6.0, 1299.0], [7.0, 1020.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[8.0, 1255.4615384615383]], "isOverall": false, "label": "Clearance-Aggregated", "isController": true}, {"data": [[14.0, 281.2307692307692]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[14.0, 281.2307692307692]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7-Aggregated", "isController": false}, {"data": [[14.0, 223.6153846153846]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[14.0, 223.6153846153846]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8-Aggregated", "isController": false}, {"data": [[14.0, 183.84615384615384]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[14.0, 183.84615384615384]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5-Aggregated", "isController": false}, {"data": [[8.0, 173.0], [2.0, 375.0], [9.0, 234.0], [10.0, 177.0], [11.0, 180.0], [12.0, 183.0], [3.0, 186.0], [13.0, 185.0], [14.0, 94.0], [4.0, 199.0], [5.0, 193.0], [6.0, 217.0], [7.0, 192.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[8.0, 199.07692307692307]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9-Aggregated", "isController": false}, {"data": [[14.0, 251.5384615384615]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[14.0, 251.5384615384615]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6-Aggregated", "isController": false}, {"data": [[8.0, 274.0], [12.0, 285.0], [13.0, 196.66666666666666], [14.0, 262.875]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[13.153846153846155, 250.15384615384616]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12-Aggregated", "isController": false}, {"data": [[8.0, 192.0], [2.0, 88.0], [9.0, 332.0], [10.0, 243.0], [11.0, 170.0], [12.0, 195.0], [3.0, 63.0], [13.0, 196.0], [14.0, 193.0], [4.0, 190.0], [5.0, 199.0], [6.0, 210.0], [7.0, 213.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[8.0, 191.07692307692307]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7-Aggregated", "isController": false}, {"data": [[8.0, 67.0], [12.0, 178.0], [13.0, 193.0], [14.0, 191.375]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[13.153846153846155, 181.15384615384613]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11-Aggregated", "isController": false}, {"data": [[8.0, 197.0], [2.0, 193.0], [9.0, 270.0], [10.0, 372.0], [11.0, 74.0], [12.0, 189.0], [3.0, 199.0], [13.0, 190.0], [14.0, 201.0], [4.0, 185.0], [5.0, 193.0], [6.0, 191.0], [7.0, 198.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[8.0, 204.00000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8-Aggregated", "isController": false}, {"data": [[8.0, 77.0], [12.0, 65.0], [13.0, 144.66666666666666], [14.0, 90.375]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[13.153846153846155, 99.92307692307693]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14-Aggregated", "isController": false}, {"data": [[8.0, 64.0], [2.0, 59.0], [9.0, 87.0], [10.0, 193.0], [11.0, 83.0], [12.0, 71.0], [3.0, 94.0], [13.0, 66.0], [14.0, 77.0], [4.0, 72.0], [5.0, 197.0], [6.0, 183.0], [7.0, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[8.0, 101.38461538461537]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5-Aggregated", "isController": false}, {"data": [[8.0, 82.0], [12.0, 66.0], [13.0, 189.0], [14.0, 100.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[13.153846153846155, 116.99999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13-Aggregated", "isController": false}, {"data": [[8.0, 106.0], [2.0, 102.0], [9.0, 99.0], [10.0, 214.0], [11.0, 100.0], [12.0, 97.0], [3.0, 105.0], [13.0, 102.0], [14.0, 109.0], [4.0, 101.0], [5.0, 249.0], [6.0, 217.0], [7.0, 103.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[8.0, 131.0769230769231]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6-Aggregated", "isController": false}, {"data": [[8.0, 71.0], [12.0, 78.0], [13.0, 159.0], [14.0, 76.62500000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[13.153846153846155, 95.30769230769232]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16-Aggregated", "isController": false}, {"data": [[8.0, 70.0], [2.0, 80.0], [9.0, 187.0], [10.0, 83.0], [11.0, 190.0], [12.0, 74.0], [3.0, 190.0], [13.0, 77.0], [14.0, 218.0], [4.0, 90.0], [5.0, 207.0], [6.0, 75.0], [7.0, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[8.0, 124.3076923076923]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3-Aggregated", "isController": false}, {"data": [[8.0, 68.0], [12.0, 83.0], [13.0, 83.33333333333333], [14.0, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[13.153846153846155, 79.46153846153845]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15-Aggregated", "isController": false}, {"data": [[8.0, 90.0], [2.0, 205.0], [9.0, 381.0], [10.0, 228.0], [11.0, 180.0], [12.0, 155.0], [3.0, 229.0], [13.0, 77.0], [14.0, 188.0], [4.0, 186.0], [5.0, 196.0], [6.0, 202.0], [7.0, 97.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[8.0, 185.69230769230768]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4-Aggregated", "isController": false}, {"data": [[8.0, 63.0], [12.0, 82.0], [13.0, 69.33333333333333], [14.0, 77.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[13.153846153846155, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18-Aggregated", "isController": false}, {"data": [[8.0, 125.0], [2.0, 108.0], [9.0, 186.0], [10.0, 268.0], [11.0, 95.0], [12.0, 175.0], [3.0, 66.0], [13.0, 94.0], [14.0, 73.0], [4.0, 87.0], [5.0, 68.0], [6.0, 192.0], [7.0, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[8.0, 123.61538461538461]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1-Aggregated", "isController": false}, {"data": [[8.0, 71.0], [12.0, 67.0], [13.0, 92.0], [14.0, 75.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[13.153846153846155, 78.46153846153847]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17-Aggregated", "isController": false}, {"data": [[8.0, 70.0], [2.0, 205.0], [9.0, 67.0], [10.0, 200.0], [11.0, 196.0], [12.0, 87.0], [3.0, 448.0], [13.0, 75.0], [14.0, 195.0], [4.0, 90.0], [5.0, 206.0], [6.0, 184.0], [7.0, 84.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[8.0, 162.07692307692304]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2-Aggregated", "isController": false}, {"data": [[8.0, 220.0], [2.0, 76.0], [9.0, 148.0], [10.0, 290.0], [11.0, 335.0], [12.0, 251.0], [3.0, 142.0], [13.0, 236.0], [14.0, 190.0], [4.0, 247.0], [5.0, 293.0], [6.0, 215.0], [7.0, 210.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[8.0, 219.46153846153845]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12-Aggregated", "isController": false}, {"data": [[8.0, 238.0], [2.0, 257.0], [9.0, 386.0], [10.0, 244.0], [11.0, 1400.0], [12.0, 312.0], [3.0, 369.0], [13.0, 227.0], [14.0, 424.0], [4.0, 305.0], [5.0, 364.0], [6.0, 446.0], [7.0, 269.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[8.0, 403.1538461538462]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0-Aggregated", "isController": false}, {"data": [[8.0, 65.0], [2.0, 200.0], [9.0, 115.0], [10.0, 87.0], [11.0, 217.0], [12.0, 73.0], [3.0, 188.0], [13.0, 76.0], [14.0, 249.0], [4.0, 112.0], [5.0, 195.0], [6.0, 80.0], [7.0, 94.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[8.0, 134.69230769230768]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13-Aggregated", "isController": false}, {"data": [[8.0, 218.0], [2.0, 87.0], [9.0, 199.0], [10.0, 199.0], [11.0, 75.0], [12.0, 188.0], [3.0, 73.0], [13.0, 207.0], [14.0, 91.0], [4.0, 177.0], [5.0, 198.0], [6.0, 183.0], [7.0, 183.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[8.0, 159.84615384615387]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10-Aggregated", "isController": false}, {"data": [[8.0, 189.0], [2.0, 64.0], [9.0, 194.0], [10.0, 207.0], [11.0, 77.0], [12.0, 185.0], [3.0, 186.0], [13.0, 192.0], [14.0, 239.0], [4.0, 205.0], [5.0, 198.0], [6.0, 188.0], [7.0, 185.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[8.0, 177.61538461538464]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11-Aggregated", "isController": false}, {"data": [[8.0, 66.0], [2.0, 69.0], [9.0, 83.0], [10.0, 78.0], [11.0, 67.0], [12.0, 92.0], [3.0, 70.0], [13.0, 87.0], [14.0, 95.0], [4.0, 79.0], [5.0, 74.0], [6.0, 92.0], [7.0, 184.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[8.0, 87.38461538461539]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16-Aggregated", "isController": false}, {"data": [[8.0, 81.0], [2.0, 92.0], [9.0, 122.0], [10.0, 68.0], [11.0, 71.0], [12.0, 74.0], [3.0, 73.0], [13.0, 80.0], [14.0, 96.0], [4.0, 73.0], [5.0, 74.0], [6.0, 104.0], [7.0, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[8.0, 82.84615384615385]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17-Aggregated", "isController": false}, {"data": [[8.0, 193.0], [12.0, 205.0], [13.0, 163.0], [14.0, 208.75000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[13.153846153846155, 196.6923076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10-Aggregated", "isController": false}, {"data": [[8.0, 83.0], [2.0, 214.0], [9.0, 185.0], [10.0, 78.0], [11.0, 73.0], [12.0, 71.0], [3.0, 67.0], [13.0, 103.0], [14.0, 89.0], [4.0, 65.0], [5.0, 89.0], [6.0, 71.0], [7.0, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[8.0, 97.3076923076923]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14-Aggregated", "isController": false}, {"data": [[8.0, 69.0], [2.0, 71.0], [9.0, 72.0], [10.0, 78.0], [11.0, 74.0], [12.0, 335.0], [3.0, 65.0], [13.0, 100.0], [14.0, 206.0], [4.0, 69.0], [5.0, 74.0], [6.0, 85.0], [7.0, 85.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[8.0, 106.38461538461539]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15-Aggregated", "isController": false}, {"data": [[14.0, 1649.076923076923]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[14.0, 1649.076923076923]], "isOverall": false, "label": "https://www.banglashoppers.com/-19-Aggregated", "isController": false}, {"data": [[8.0, 106.0], [2.0, 97.0], [9.0, 137.0], [10.0, 100.5], [11.0, 85.0], [12.0, 101.6], [3.0, 131.0], [13.0, 101.625], [14.0, 142.28205128205133], [4.0, 86.0], [5.0, 96.5], [6.0, 85.0], [7.0, 96.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[12.27692307692308, 126.04615384615387]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json-Aggregated", "isController": false}, {"data": [[14.0, 10541.923076923078]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[14.0, 10541.923076923078]], "isOverall": false, "label": "Makeupshop-Aggregated", "isController": true}, {"data": [[8.0, 822.0], [2.0, 902.0], [9.0, 1128.0], [10.0, 1025.0], [11.0, 1989.0], [12.0, 930.0], [3.0, 1006.0], [13.0, 800.0], [14.0, 1111.0], [4.0, 923.0], [5.0, 1184.0], [6.0, 1160.0], [7.0, 870.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[8.0, 1065.3846153846155]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-Aggregated", "isController": false}, {"data": [[14.0, 1448.3846153846155]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[14.0, 1448.3846153846155]], "isOverall": false, "label": "https://www.banglashoppers.com/-11-Aggregated", "isController": false}, {"data": [[14.0, 1352.9230769230771]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[14.0, 1352.9230769230771]], "isOverall": false, "label": "https://www.banglashoppers.com/-12-Aggregated", "isController": false}, {"data": [[14.0, 2846.5384615384614]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[14.0, 2846.5384615384614]], "isOverall": false, "label": "https://www.banglashoppers.com/-13-Aggregated", "isController": false}, {"data": [[14.0, 10100.153846153844]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[14.0, 10100.153846153844]], "isOverall": false, "label": "https://www.banglashoppers.com/-14-Aggregated", "isController": false}, {"data": [[14.0, 3602.0769230769233]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[14.0, 3602.0769230769233]], "isOverall": false, "label": "https://www.banglashoppers.com/-15-Aggregated", "isController": false}, {"data": [[14.0, 1609.846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[14.0, 1609.846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/-16-Aggregated", "isController": false}, {"data": [[14.0, 1877.8461538461538]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[14.0, 1877.8461538461538]], "isOverall": false, "label": "https://www.banglashoppers.com/-17-Aggregated", "isController": false}, {"data": [[14.0, 483.2307692307692]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[14.0, 483.2307692307692]], "isOverall": false, "label": "https://www.banglashoppers.com/-18-Aggregated", "isController": false}, {"data": [[10.0, 244.0], [5.0, 300.0], [12.0, 274.6666666666667], [13.0, 280.0], [14.0, 231.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[12.307692307692307, 258.6923076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696-Aggregated", "isController": false}, {"data": [[14.0, 317.92307692307696]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[14.0, 317.92307692307696]], "isOverall": false, "label": "https://www.banglashoppers.com/-10-Aggregated", "isController": false}, {"data": [[14.0, 8984.769230769232]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[14.0, 8984.769230769232]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-Aggregated", "isController": false}, {"data": [[14.0, 41283.53846153847]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[14.0, 41283.53846153847]], "isOverall": false, "label": "https://www.banglashoppers.com/-Aggregated", "isController": false}, {"data": [[11.0, 289.0], [12.0, 294.3333333333333], [6.0, 294.0], [13.0, 318.6666666666667], [14.0, 262.2]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[12.461538461538462, 287.15384615384613]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695-Aggregated", "isController": false}, {"data": [[14.0, 877.1538461538462]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[14.0, 877.1538461538462]], "isOverall": false, "label": "https://www.banglashoppers.com/-22-Aggregated", "isController": false}, {"data": [[14.0, 2804.846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[14.0, 2804.846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/-23-Aggregated", "isController": false}, {"data": [[14.0, 706.6923076923076]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[14.0, 706.6923076923076]], "isOverall": false, "label": "https://www.banglashoppers.com/-24-Aggregated", "isController": false}, {"data": [[10.0, 2964.0], [5.0, 2021.0], [12.0, 2133.6666666666665], [13.0, 2187.0], [14.0, 2052.4]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[12.307692307692307, 2169.9230769230767]], "isOverall": false, "label": "Combo-Aggregated", "isController": true}, {"data": [[14.0, 737.2307692307693]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[14.0, 737.2307692307693]], "isOverall": false, "label": "https://www.banglashoppers.com/-25-Aggregated", "isController": false}, {"data": [[14.0, 662.4615384615383]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[14.0, 662.4615384615383]], "isOverall": false, "label": "https://www.banglashoppers.com/-26-Aggregated", "isController": false}, {"data": [[14.0, 1137.6153846153848]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[14.0, 1137.6153846153848]], "isOverall": false, "label": "https://www.banglashoppers.com/-27-Aggregated", "isController": false}, {"data": [[14.0, 228.84615384615387]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[14.0, 228.84615384615387]], "isOverall": false, "label": "https://www.banglashoppers.com/-28-Aggregated", "isController": false}, {"data": [[14.0, 290.3846153846153]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[14.0, 290.3846153846153]], "isOverall": false, "label": "https://www.banglashoppers.com/-29-Aggregated", "isController": false}, {"data": [[14.0, 756.8461538461539]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[14.0, 756.8461538461539]], "isOverall": false, "label": "https://www.banglashoppers.com/-20-Aggregated", "isController": false}, {"data": [[14.0, 891.6923076923078]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[14.0, 891.6923076923078]], "isOverall": false, "label": "https://www.banglashoppers.com/-21-Aggregated", "isController": false}, {"data": [[11.0, 1714.0], [12.0, 752.3333333333334], [6.0, 679.0], [13.0, 839.6666666666666], [14.0, 752.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[12.461538461538462, 840.8461538461538]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-Aggregated", "isController": false}, {"data": [[14.0, 2914.3076923076924]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[14.0, 2914.3076923076924]], "isOverall": false, "label": "https://www.banglashoppers.com/-33-Aggregated", "isController": false}, {"data": [[8.0, 213.0], [12.0, 194.0], [13.0, 445.0], [14.0, 212.87499999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[13.153846153846155, 264.99999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3-Aggregated", "isController": false}, {"data": [[14.0, 2035.769230769231]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[14.0, 2035.769230769231]], "isOverall": false, "label": "https://www.banglashoppers.com/-34-Aggregated", "isController": false}, {"data": [[8.0, 198.0], [12.0, 74.0], [13.0, 476.6666666666667], [14.0, 183.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[13.153846153846155, 243.8461538461539]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2-Aggregated", "isController": false}, {"data": [[8.0, 67.0], [12.0, 197.0], [13.0, 74.0], [14.0, 101.62500000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[13.153846153846155, 99.92307692307693]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1-Aggregated", "isController": false}, {"data": [[8.0, 488.0], [12.0, 407.0], [13.0, 1084.0], [14.0, 491.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[13.153846153846155, 621.3076923076924]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0-Aggregated", "isController": false}, {"data": [[14.0, 4554.846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[14.0, 4554.846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22-Aggregated", "isController": false}, {"data": [[8.0, 184.0], [12.0, 180.0], [13.0, 423.3333333333333], [14.0, 224.62499999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[13.153846153846155, 263.9230769230769]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7-Aggregated", "isController": false}, {"data": [[14.0, 66.76923076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[14.0, 66.76923076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21-Aggregated", "isController": false}, {"data": [[8.0, 220.0], [12.0, 218.0], [13.0, 230.66666666666666], [14.0, 215.375]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[13.153846153846155, 219.46153846153845]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6-Aggregated", "isController": false}, {"data": [[14.0, 309.3846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[14.0, 309.3846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24-Aggregated", "isController": false}, {"data": [[8.0, 177.0], [12.0, 206.0], [13.0, 498.0], [14.0, 177.375]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[13.153846153846155, 253.53846153846155]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5-Aggregated", "isController": false}, {"data": [[14.0, 710.5384615384615]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[14.0, 710.5384615384615]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23-Aggregated", "isController": false}, {"data": [[8.0, 184.0], [12.0, 184.0], [13.0, 484.3333333333333], [14.0, 199.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[13.153846153846155, 262.6923076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4-Aggregated", "isController": false}, {"data": [[8.0, 1189.0], [12.0, 1161.0], [13.0, 2636.3333333333335], [14.0, 1237.125]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[13.153846153846155, 1550.4615384615383]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-Aggregated", "isController": false}, {"data": [[8.0, 232.0], [12.0, 255.0], [13.0, 226.33333333333334], [14.0, 212.625]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[13.153846153846155, 220.53846153846152]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23-Aggregated", "isController": false}, {"data": [[8.0, 178.0], [12.0, 219.0], [13.0, 204.33333333333334], [14.0, 188.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[13.153846153846155, 193.69230769230768]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22-Aggregated", "isController": false}, {"data": [[14.0, 88.23076923076923]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[14.0, 88.23076923076923]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20-Aggregated", "isController": false}, {"data": [[8.0, 211.0], [12.0, 179.0], [13.0, 215.33333333333334], [14.0, 214.875]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[13.153846153846155, 211.92307692307696]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9-Aggregated", "isController": false}, {"data": [[8.0, 178.0], [12.0, 188.0], [13.0, 305.3333333333333], [14.0, 200.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[13.153846153846155, 222.15384615384616]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8-Aggregated", "isController": false}, {"data": [[8.0, 233.0], [12.0, 247.0], [13.0, 243.25], [14.0, 275.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[13.076923076923077, 259.8461538461538]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372-Aggregated", "isController": false}, {"data": [[14.0, 1323.6153846153843]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[14.0, 1323.6153846153843]], "isOverall": false, "label": "https://www.banglashoppers.com/-30-Aggregated", "isController": false}, {"data": [[14.0, 3751.6923076923076]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[14.0, 3751.6923076923076]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0-Aggregated", "isController": false}, {"data": [[14.0, 288.69230769230774]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[14.0, 288.69230769230774]], "isOverall": false, "label": "https://www.banglashoppers.com/-31-Aggregated", "isController": false}, {"data": [[14.0, 22611.384615384613]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[14.0, 22611.384615384613]], "isOverall": false, "label": "https://www.banglashoppers.com/-32-Aggregated", "isController": false}, {"data": [[8.0, 248.0], [12.0, 288.0], [13.0, 321.75], [14.0, 265.85714285714283]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[13.076923076923077, 283.38461538461536]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371-Aggregated", "isController": false}, {"data": [[8.0, 77.0], [12.0, 138.0], [13.0, 92.33333333333333], [14.0, 89.375]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[13.153846153846155, 92.84615384615384]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21-Aggregated", "isController": false}, {"data": [[8.0, 53.0], [12.0, 56.0], [13.0, 53.666666666666664], [14.0, 93.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[13.153846153846155, 78.15384615384616]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20-Aggregated", "isController": false}, {"data": [[14.0, 116.69230769230768]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[14.0, 116.69230769230768]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19-Aggregated", "isController": false}, {"data": [[14.0, 108.23076923076924]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[14.0, 108.23076923076924]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18-Aggregated", "isController": false}, {"data": [[14.0, 252.3846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[14.0, 252.3846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15-Aggregated", "isController": false}, {"data": [[14.0, 189.53846153846155]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[14.0, 189.53846153846155]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14-Aggregated", "isController": false}, {"data": [[14.0, 90.61538461538461]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[14.0, 90.61538461538461]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17-Aggregated", "isController": false}, {"data": [[14.0, 109.61538461538461]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[14.0, 109.61538461538461]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16-Aggregated", "isController": false}, {"data": [[14.0, 211.69230769230768]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[14.0, 211.69230769230768]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11-Aggregated", "isController": false}, {"data": [[14.0, 196.46153846153845]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[14.0, 196.46153846153845]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10-Aggregated", "isController": false}, {"data": [[14.0, 565.6153846153845]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[14.0, 565.6153846153845]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13-Aggregated", "isController": false}, {"data": [[14.0, 268.61538461538464]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[14.0, 268.61538461538464]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12-Aggregated", "isController": false}, {"data": [[8.0, 56.0], [2.0, 57.0], [9.0, 71.0], [10.0, 63.0], [11.0, 61.0], [12.0, 70.6], [3.0, 67.0], [13.0, 58.5], [14.0, 79.20512820512819], [4.0, 73.0], [5.0, 213.0], [6.0, 54.0], [7.0, 54.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[12.27692307692308, 77.0923076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?-Aggregated", "isController": false}, {"data": [[11.0, 1156.0], [12.0, 221.0], [6.0, 226.0], [13.0, 200.0], [14.0, 187.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[12.461538461538462, 275.6923076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0-Aggregated", "isController": false}, {"data": [[11.0, 68.0], [12.0, 122.33333333333333], [6.0, 85.0], [13.0, 139.66666666666666], [14.0, 103.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[12.461538461538462, 112.00000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1-Aggregated", "isController": false}, {"data": [[11.0, 80.0], [12.0, 119.0], [6.0, 74.0], [13.0, 77.66666666666667], [14.0, 84.2]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[12.461538461538462, 89.61538461538461]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2-Aggregated", "isController": false}, {"data": [[11.0, 102.0], [12.0, 103.33333333333333], [6.0, 72.0], [13.0, 86.0], [14.0, 101.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[12.461538461538462, 96.23076923076923]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3-Aggregated", "isController": false}, {"data": [[14.0, 41591.769230769234]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[14.0, 41591.769230769234]], "isOverall": false, "label": "Home-Aggregated", "isController": true}, {"data": [[14.0, 5052.615384615384]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[14.0, 5052.615384615384]], "isOverall": false, "label": "https://www.banglashoppers.com/-0-Aggregated", "isController": false}, {"data": [[14.0, 11218.23076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[14.0, 11218.23076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/-1-Aggregated", "isController": false}, {"data": [[14.0, 4544.846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[14.0, 4544.846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/-2-Aggregated", "isController": false}, {"data": [[14.0, 3217.153846153846]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[14.0, 3217.153846153846]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-Aggregated", "isController": false}, {"data": [[14.0, 4251.846153846153]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[14.0, 4251.846153846153]], "isOverall": false, "label": "https://www.banglashoppers.com/-4-Aggregated", "isController": false}, {"data": [[14.0, 8369.692307692309]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[14.0, 8369.692307692309]], "isOverall": false, "label": "https://www.banglashoppers.com/-5-Aggregated", "isController": false}, {"data": [[14.0, 1570.5384615384617]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[14.0, 1570.5384615384617]], "isOverall": false, "label": "https://www.banglashoppers.com/-6-Aggregated", "isController": false}, {"data": [[14.0, 3327.6153846153843]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[14.0, 3327.6153846153843]], "isOverall": false, "label": "https://www.banglashoppers.com/-7-Aggregated", "isController": false}, {"data": [[14.0, 2545.2307692307695]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[14.0, 2545.2307692307695]], "isOverall": false, "label": "https://www.banglashoppers.com/-8-Aggregated", "isController": false}, {"data": [[14.0, 469.30769230769226]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[14.0, 469.30769230769226]], "isOverall": false, "label": "https://www.banglashoppers.com/-9-Aggregated", "isController": false}, {"data": [[8.0, 3462.0], [12.0, 3439.0], [13.0, 4738.5], [14.0, 4131.714285714286]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[13.076923076923077, 4213.615384615385]], "isOverall": false, "label": "HotOffers-Aggregated", "isController": true}, {"data": [[8.0, 275.5], [11.0, 303.0], [12.0, 268.6666666666667], [13.0, 321.8125], [14.0, 350.1]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}, {"data": [[13.528846153846157, 340.0769230769231]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 14.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 839.5, "minX": 1.6619565E12, "maxY": 1592199.55, "series": [{"data": [[1.66195662E12, 275900.4166666667], [1.66195656E12, 1296507.0], [1.66195674E12, 9380.416666666666], [1.66195668E12, 98842.88333333333], [1.6619565E12, 1592199.55]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66195662E12, 21251.383333333335], [1.66195656E12, 15680.733333333334], [1.66195674E12, 839.5], [1.66195668E12, 8480.416666666666], [1.6619565E12, 12635.25]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66195674E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 53.0, "minX": 1.6619565E12, "maxY": 76664.0, "series": [{"data": [[1.66195656E12, 293.75000000000006], [1.6619565E12, 313.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66195662E12, 264.0], [1.66195656E12, 273.09090909090907], [1.6619565E12, 306.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66195662E12, 166.3], [1.66195656E12, 218.0], [1.66195668E12, 192.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66195662E12, 100.69999999999999], [1.66195656E12, 70.0], [1.66195668E12, 78.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66195662E12, 183.2], [1.66195656E12, 155.0], [1.66195668E12, 218.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66195662E12, 138.2], [1.66195656E12, 95.5], [1.66195668E12, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66195662E12, 74.2], [1.66195656E12, 69.0], [1.66195668E12, 105.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66195662E12, 107.3], [1.66195656E12, 103.0], [1.66195668E12, 99.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66195662E12, 172.0], [1.66195656E12, 127.0], [1.66195668E12, 64.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66195662E12, 131.89999999999998], [1.66195656E12, 69.5], [1.66195668E12, 84.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66195662E12, 139.0], [1.66195656E12, 77.5], [1.66195668E12, 68.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66195662E12, 187.5], [1.66195656E12, 272.0], [1.66195668E12, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66195662E12, 170.9], [1.66195656E12, 73.0], [1.66195668E12, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66195662E12, 132.10000000000002], [1.66195656E12, 188.5], [1.66195668E12, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66195662E12, 55.75], [1.66195674E12, 64.0], [1.66195668E12, 73.375]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66195662E12, 87.89999999999999], [1.66195656E12, 72.0], [1.66195668E12, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66195662E12, 94.40000000000002], [1.66195656E12, 74.0], [1.66195668E12, 62.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66195662E12, 133.9], [1.66195656E12, 69.5], [1.66195668E12, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66195662E12, 190.25], [1.66195674E12, 201.0], [1.66195668E12, 182.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66195662E12, 89.4], [1.66195656E12, 78.5], [1.66195668E12, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66195662E12, 103.0], [1.66195656E12, 85.5], [1.66195668E12, 105.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66195662E12, 71.5], [1.66195674E12, 79.0], [1.66195668E12, 73.625]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66195662E12, 100.9], [1.66195656E12, 70.0], [1.66195668E12, 81.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66195662E12, 189.5], [1.66195674E12, 186.0], [1.66195668E12, 184.875]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66195662E12, 60.900000000000006], [1.66195656E12, 54.0], [1.66195668E12, 58.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66195662E12, 265.0], [1.66195656E12, 380.09090909090907], [1.6619565E12, 234.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66195662E12, 296.59999999999997], [1.66195656E12, 275.0], [1.66195668E12, 282.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66195656E12, 232.16666666666669], [1.6619565E12, 209.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66195662E12, 102.25], [1.66195674E12, 80.0], [1.66195668E12, 81.62500000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66195662E12, 70.5], [1.66195674E12, 82.0], [1.66195668E12, 79.875]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66195656E12, 266.25], [1.6619565E12, 83.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66195656E12, 284.33333333333337], [1.6619565E12, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66195662E12, 106.6], [1.66195656E12, 70.5], [1.66195668E12, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66195656E12, 127.91666666666667], [1.6619565E12, 81.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66195656E12, 263.66666666666663], [1.6619565E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66195662E12, 1301.2], [1.66195656E12, 1126.5], [1.66195668E12, 1056.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66195656E12, 286.16666666666663], [1.6619565E12, 222.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66195656E12, 223.83333333333337], [1.6619565E12, 221.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66195656E12, 192.83333333333334], [1.6619565E12, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66195662E12, 160.5], [1.66195674E12, 375.0], [1.66195668E12, 196.375]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66195656E12, 262.6666666666667], [1.6619565E12, 118.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66195662E12, 241.7], [1.66195656E12, 280.5], [1.66195668E12, 274.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66195662E12, 188.5], [1.66195674E12, 88.0], [1.66195668E12, 205.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66195662E12, 190.4], [1.66195656E12, 192.0], [1.66195668E12, 67.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66195662E12, 163.5], [1.66195674E12, 193.0], [1.66195668E12, 225.625]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66195662E12, 108.4], [1.66195656E12, 69.0], [1.66195668E12, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66195662E12, 74.25], [1.66195674E12, 59.0], [1.66195668E12, 120.24999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66195662E12, 130.1], [1.66195656E12, 69.0], [1.66195668E12, 82.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66195662E12, 102.0], [1.66195674E12, 102.0], [1.66195668E12, 149.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66195662E12, 103.10000000000001], [1.66195656E12, 68.5], [1.66195668E12, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66195662E12, 139.75], [1.66195674E12, 80.0], [1.66195668E12, 122.125]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66195662E12, 80.7], [1.66195656E12, 79.0], [1.66195668E12, 68.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66195662E12, 150.0], [1.66195674E12, 205.0], [1.66195668E12, 201.125]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66195662E12, 76.5], [1.66195656E12, 73.5], [1.66195668E12, 63.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66195662E12, 109.25], [1.66195674E12, 108.0], [1.66195668E12, 132.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66195662E12, 81.60000000000001], [1.66195656E12, 66.5], [1.66195668E12, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66195662E12, 138.25], [1.66195674E12, 205.0], [1.66195668E12, 168.625]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66195662E12, 253.0], [1.66195674E12, 76.0], [1.66195668E12, 220.62499999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66195662E12, 590.75], [1.66195674E12, 257.0], [1.66195668E12, 327.625]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66195662E12, 153.75], [1.66195674E12, 200.0], [1.66195668E12, 117.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66195662E12, 140.25], [1.66195674E12, 87.0], [1.66195668E12, 178.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66195662E12, 173.25], [1.66195674E12, 64.0], [1.66195668E12, 194.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66195662E12, 85.25], [1.66195674E12, 69.0], [1.66195668E12, 90.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66195662E12, 80.25], [1.66195674E12, 92.0], [1.66195668E12, 83.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66195662E12, 204.1], [1.66195656E12, 161.5], [1.66195668E12, 193.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66195662E12, 84.0], [1.66195674E12, 214.0], [1.66195668E12, 89.375]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66195662E12, 178.75], [1.66195674E12, 71.0], [1.66195668E12, 74.62499999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.6619565E12, 1649.076923076923]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66195662E12, 100.00000000000001], [1.66195656E12, 170.58823529411765], [1.66195674E12, 97.0], [1.66195668E12, 104.9], [1.6619565E12, 137.25000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66195656E12, 10472.6], [1.6619565E12, 10773.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66195662E12, 1207.5], [1.66195674E12, 902.0], [1.66195668E12, 1014.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.6619565E12, 1448.3846153846155]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.6619565E12, 1352.9230769230771]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.6619565E12, 2846.5384615384614]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.66195656E12, 76664.0], [1.6619565E12, 4553.166666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.6619565E12, 3602.0769230769233]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.6619565E12, 1609.846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.6619565E12, 1877.8461538461538]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.6619565E12, 483.2307692307692]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66195662E12, 259.90000000000003], [1.66195656E12, 232.0], [1.66195668E12, 300.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.6619565E12, 317.92307692307696]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66195656E12, 9232.666666666666], [1.6619565E12, 6010.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.66195656E12, 70549.5], [1.6619565E12, 35962.45454545455]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66195662E12, 290.50000000000006], [1.66195656E12, 267.0], [1.66195668E12, 294.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.6619565E12, 877.1538461538462]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.6619565E12, 2804.846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.6619565E12, 706.6923076923076]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66195662E12, 2235.3], [1.66195656E12, 1917.5], [1.66195668E12, 2021.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.6619565E12, 737.2307692307693]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.6619565E12, 662.4615384615383]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.6619565E12, 1137.6153846153848]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.6619565E12, 228.84615384615387]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.6619565E12, 290.3846153846153]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.6619565E12, 756.8461538461539]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.6619565E12, 891.6923076923078]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66195662E12, 886.1], [1.66195656E12, 695.5], [1.66195668E12, 679.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.6619565E12, 2914.3076923076924]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66195662E12, 278.3], [1.66195656E12, 224.5], [1.66195668E12, 213.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.6619565E12, 2035.769230769231]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66195662E12, 270.29999999999995], [1.66195656E12, 134.5], [1.66195668E12, 198.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66195662E12, 95.4], [1.66195656E12, 139.0], [1.66195668E12, 67.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66195662E12, 643.0], [1.66195656E12, 579.5], [1.66195668E12, 488.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66195656E12, 4759.750000000001], [1.6619565E12, 2096.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66195662E12, 285.5], [1.66195656E12, 196.0], [1.66195668E12, 184.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66195656E12, 67.83333333333334], [1.6619565E12, 54.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66195662E12, 214.4], [1.66195656E12, 244.5], [1.66195668E12, 220.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66195656E12, 316.33333333333326], [1.6619565E12, 226.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66195662E12, 277.0], [1.66195656E12, 174.5], [1.66195668E12, 177.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66195656E12, 749.3333333333334], [1.6619565E12, 245.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66195662E12, 281.7], [1.66195656E12, 207.0], [1.66195668E12, 184.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66195662E12, 1639.6000000000001], [1.66195656E12, 1285.5], [1.66195668E12, 1189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66195662E12, 232.40000000000003], [1.66195656E12, 155.5], [1.66195668E12, 232.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66195662E12, 189.70000000000002], [1.66195656E12, 221.5], [1.66195668E12, 178.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66195656E12, 90.0], [1.6619565E12, 67.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66195662E12, 210.2], [1.66195656E12, 221.0], [1.66195668E12, 211.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66195662E12, 231.7], [1.66195656E12, 196.5], [1.66195668E12, 178.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66195662E12, 266.3], [1.66195656E12, 241.0], [1.66195668E12, 233.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.6619565E12, 1323.6153846153843]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66195656E12, 3906.181818181818], [1.6619565E12, 2902.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.6619565E12, 288.69230769230774]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.6619565E12, 22611.384615384613]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66195662E12, 294.1], [1.66195656E12, 247.5], [1.66195668E12, 248.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66195662E12, 89.19999999999999], [1.66195656E12, 119.0], [1.66195668E12, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66195662E12, 84.6], [1.66195656E12, 58.5], [1.66195668E12, 53.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66195656E12, 120.58333333333331], [1.6619565E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66195656E12, 111.25], [1.6619565E12, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66195656E12, 266.5833333333333], [1.6619565E12, 82.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66195656E12, 198.99999999999997], [1.6619565E12, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66195656E12, 91.58333333333333], [1.6619565E12, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66195656E12, 113.58333333333333], [1.6619565E12, 62.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66195656E12, 220.58333333333334], [1.6619565E12, 105.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66195656E12, 195.25], [1.6619565E12, 211.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66195656E12, 595.25], [1.6619565E12, 210.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66195656E12, 278.5], [1.6619565E12, 150.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66195662E12, 73.72000000000001], [1.66195656E12, 70.52941176470587], [1.66195674E12, 57.0], [1.66195668E12, 92.80000000000001], [1.6619565E12, 82.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66195662E12, 298.70000000000005], [1.66195656E12, 185.5], [1.66195668E12, 226.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66195662E12, 123.8], [1.66195656E12, 66.5], [1.66195668E12, 85.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66195662E12, 93.5], [1.66195656E12, 78.0], [1.66195668E12, 74.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66195662E12, 104.1], [1.66195656E12, 69.0], [1.66195668E12, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.66195656E12, 71315.0], [1.6619565E12, 36187.545454545456]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.6619565E12, 5052.615384615384]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.6619565E12, 11218.23076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.6619565E12, 4544.846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.6619565E12, 3217.153846153846]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.6619565E12, 4251.846153846153]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66195656E12, 46327.0], [1.6619565E12, 5206.583333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.6619565E12, 1570.5384615384617]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.6619565E12, 3327.6153846153843]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.6619565E12, 2545.2307692307695]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.6619565E12, 469.30769230769226]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66195662E12, 3462.0], [1.66195656E12, 4276.25]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.66195662E12, 304.38095238095246], [1.66195656E12, 351.4705882352941], [1.66195668E12, 275.5], [1.6619565E12, 397.16666666666674]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66195674E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.6619565E12, "maxY": 7402.0, "series": [{"data": [[1.66195656E12, 293.58333333333337], [1.6619565E12, 313.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66195662E12, 264.0], [1.66195656E12, 272.09090909090907], [1.6619565E12, 306.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66195662E12, 100.6], [1.66195656E12, 95.0], [1.66195668E12, 95.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66195662E12, 170.7], [1.66195656E12, 73.0], [1.66195668E12, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66195662E12, 93.0], [1.66195656E12, 74.0], [1.66195668E12, 62.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66195662E12, 265.0], [1.66195656E12, 379.90909090909093], [1.6619565E12, 234.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66195662E12, 296.59999999999997], [1.66195656E12, 275.0], [1.66195668E12, 282.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66195656E12, 20.583333333333332], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66195656E12, 15.166666666666664], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66195662E12, 391.79999999999995], [1.66195656E12, 295.0], [1.66195668E12, 166.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66195656E12, 224.41666666666666], [1.6619565E12, 95.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66195662E12, 187.9], [1.66195656E12, 196.0], [1.66195668E12, 198.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66195662E12, 108.1], [1.66195656E12, 68.5], [1.66195668E12, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66195662E12, 130.0], [1.66195656E12, 68.5], [1.66195668E12, 82.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66195662E12, 95.75], [1.66195674E12, 93.0], [1.66195668E12, 145.75000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66195662E12, 178.5], [1.66195674E12, 75.0], [1.66195668E12, 174.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66195662E12, 477.5], [1.66195674E12, 109.0], [1.66195668E12, 189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66195662E12, 153.5], [1.66195674E12, 200.0], [1.66195668E12, 116.375]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66195662E12, 83.75], [1.66195674E12, 214.0], [1.66195668E12, 89.375]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.6619565E12, 1374.0769230769229]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 80.11764705882354], [1.66195674E12, 0.0], [1.66195668E12, 0.0], [1.6619565E12, 127.25]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66195656E12, 1766.5], [1.6619565E12, 2088.3333333333335]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66195662E12, 477.5], [1.66195674E12, 109.0], [1.66195668E12, 189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.6619565E12, 476.3846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.6619565E12, 802.3846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.6619565E12, 662.6153846153845]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.66195656E12, 114.0], [1.6619565E12, 399.41666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.6619565E12, 307.84615384615387]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.6619565E12, 298.0769230769231]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.6619565E12, 223.53846153846152]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.6619565E12, 483.1538461538462]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66195662E12, 259.90000000000003], [1.66195656E12, 232.0], [1.66195668E12, 300.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.6619565E12, 317.92307692307696]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66195656E12, 483.99999999999994], [1.6619565E12, 325.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.66195656E12, 3269.0], [1.6619565E12, 1148.909090909091]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66195662E12, 290.50000000000006], [1.66195656E12, 265.5], [1.66195668E12, 294.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.6619565E12, 876.3846153846152]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.6619565E12, 377.69230769230774]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.6619565E12, 427.7692307692308]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66195662E12, 1362.4], [1.66195656E12, 1205.5], [1.66195668E12, 1415.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.6619565E12, 294.9230769230769]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.6619565E12, 662.3846153846152]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.6619565E12, 241.46153846153845]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.6619565E12, 228.76923076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.6619565E12, 256.69230769230774]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.6619565E12, 745.9230769230769]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.6619565E12, 887.6923076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66195662E12, 118.80000000000001], [1.66195656E12, 94.5], [1.66195668E12, 174.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.6619565E12, 2914.3076923076924]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.6619565E12, 1353.2307692307693]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66195662E12, 292.79999999999995], [1.66195656E12, 257.5], [1.66195668E12, 200.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66195656E12, 102.49999999999999], [1.6619565E12, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66195662E12, 212.60000000000002], [1.66195656E12, 243.5], [1.66195668E12, 220.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66195662E12, 292.79999999999995], [1.66195656E12, 257.5], [1.66195668E12, 200.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66195662E12, 266.0], [1.66195656E12, 241.0], [1.66195668E12, 233.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.6619565E12, 354.9230769230769]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66195656E12, 512.2727272727273], [1.6619565E12, 249.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.6619565E12, 288.69230769230774]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.6619565E12, 267.61538461538464]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66195662E12, 294.1], [1.66195656E12, 247.5], [1.66195668E12, 248.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66195656E12, 223.66666666666666], [1.6619565E12, 82.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66195656E12, 164.33333333333331], [1.6619565E12, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66195656E12, 284.5], [1.6619565E12, 202.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66195656E12, 188.33333333333331], [1.6619565E12, 137.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66195662E12, 73.72000000000001], [1.66195656E12, 70.52941176470587], [1.66195674E12, 57.0], [1.66195668E12, 92.80000000000001], [1.6619565E12, 82.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66195662E12, 118.80000000000001], [1.66195656E12, 94.5], [1.66195668E12, 174.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.66195656E12, 4034.5], [1.6619565E12, 1372.181818181818]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.6619565E12, 1475.076923076923]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.6619565E12, 754.3076923076924]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.6619565E12, 1079.3846153846152]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.6619565E12, 1224.0769230769233]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.6619565E12, 2233.5384615384614]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66195656E12, 7402.0], [1.6619565E12, 1138.6666666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.6619565E12, 1172.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.6619565E12, 517.3846153846155]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.6619565E12, 911.6153846153845]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.6619565E12, 469.30769230769226]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66195662E12, 2377.0], [1.66195656E12, 2796.833333333333]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.66195662E12, 294.1904761904761], [1.66195656E12, 340.9411764705882], [1.66195668E12, 275.5], [1.6619565E12, 339.37499999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66195674E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.6619565E12, "maxY": 7298.0, "series": [{"data": [[1.66195656E12, 9.583333333333334], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66195662E12, 89.5], [1.66195656E12, 107.0], [1.66195668E12, 123.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66195662E12, 90.19999999999999], [1.66195656E12, 60.5], [1.66195668E12, 135.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66195662E12, 44.50000000000001], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66195662E12, 76.1], [1.66195656E12, 55.5], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66195662E12, 52.2], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66195662E12, 52.6], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66195662E12, 84.7], [1.66195656E12, 54.5], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66195662E12, 84.2], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66195662E12, 36.2], [1.66195656E12, 110.5], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 15.875]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66195662E12, 11.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66195662E12, 11.100000000000001], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66195662E12, 26.3], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66195662E12, 82.25], [1.66195674E12, 115.0], [1.66195668E12, 82.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66195662E12, 12.5], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66195662E12, 13.6], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66195662E12, 25.2], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66195662E12, 112.75], [1.66195674E12, 111.0], [1.66195668E12, 112.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66195656E12, 117.58333333333331], [1.6619565E12, 119.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66195662E12, 27.500000000000004], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66195656E12, 169.75000000000003], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66195656E12, 183.24999999999997], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66195662E12, 27.2], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66195656E12, 12.25], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66195656E12, 158.75], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66195662E12, 168.4], [1.66195656E12, 56.5], [1.66195668E12, 0.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66195656E12, 193.0], [1.6619565E12, 132.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66195656E12, 142.58333333333331], [1.6619565E12, 130.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66195656E12, 112.5], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66195662E12, 83.75], [1.66195674E12, 0.0], [1.66195668E12, 111.875]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66195656E12, 120.33333333333333], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66195662E12, 89.3], [1.66195656E12, 115.5], [1.66195668E12, 108.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66195662E12, 113.5], [1.66195674E12, 0.0], [1.66195668E12, 83.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66195662E12, 115.89999999999999], [1.66195656E12, 117.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66195662E12, 85.25], [1.66195674E12, 115.0], [1.66195668E12, 111.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66195662E12, 14.3], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 43.625]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66195662E12, 39.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 47.49999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66195662E12, 60.25], [1.66195674E12, 0.0], [1.66195668E12, 42.125]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66195662E12, 57.0], [1.66195674E12, 130.0], [1.66195668E12, 86.00000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66195662E12, 27.0], [1.66195674E12, 0.0], [1.66195668E12, 40.50000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66195662E12, 60.25], [1.66195674E12, 130.0], [1.66195668E12, 60.375]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66195662E12, 89.5], [1.66195674E12, 0.0], [1.66195668E12, 74.375]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66195662E12, 327.75], [1.66195674E12, 0.0], [1.66195668E12, 60.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66195662E12, 65.75], [1.66195674E12, 118.0], [1.66195668E12, 14.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66195662E12, 56.5], [1.66195674E12, 0.0], [1.66195668E12, 98.125]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66195662E12, 93.75], [1.66195674E12, 0.0], [1.66195668E12, 115.375]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 13.875]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66195662E12, 111.3], [1.66195656E12, 57.0], [1.66195668E12, 108.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195674E12, 113.0], [1.66195668E12, 13.999999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66195662E12, 32.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.6619565E12, 14.307692307692308]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 7.4705882352941195], [1.66195674E12, 0.0], [1.66195668E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66195656E12, 69.3], [1.6619565E12, 0.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66195662E12, 327.75], [1.66195674E12, 0.0], [1.66195668E12, 60.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.6619565E12, 43.61538461538461]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.6619565E12, 494.3076923076923]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 2097.333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.6619565E12, 134.84615384615384]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.6619565E12, 118.23076923076921]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.6619565E12, 86.38461538461539]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66195656E12, 48.16666666666667], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.66195656E12, 369.5], [1.6619565E12, 844.1818181818181]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.6619565E12, 14.307692307692308]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.6619565E12, 22.76923076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.6619565E12, 14.461538461538462]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.6619565E12, 23.53846153846154]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.6619565E12, 2780.076923076923]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66195662E12, 174.2], [1.66195656E12, 120.0], [1.66195668E12, 105.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.6619565E12, 1126.2307692307693]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66195662E12, 179.0], [1.66195656E12, 56.0], [1.66195668E12, 103.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66195662E12, 11.1], [1.66195656E12, 59.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66195662E12, 172.89999999999998], [1.66195656E12, 117.5], [1.66195668E12, 109.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66195662E12, 190.20000000000002], [1.66195656E12, 123.5], [1.66195668E12, 113.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66195662E12, 112.6], [1.66195656E12, 141.5], [1.66195668E12, 125.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66195656E12, 160.08333333333334], [1.6619565E12, 149.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66195662E12, 188.89999999999998], [1.66195656E12, 113.5], [1.66195668E12, 110.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66195656E12, 564.2500000000001], [1.6619565E12, 162.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66195662E12, 188.60000000000002], [1.66195656E12, 118.5], [1.66195668E12, 111.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66195662E12, 172.89999999999998], [1.66195656E12, 117.5], [1.66195668E12, 109.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66195662E12, 125.3], [1.66195656E12, 52.0], [1.66195668E12, 106.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66195662E12, 108.69999999999999], [1.66195656E12, 143.5], [1.66195668E12, 106.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66195662E12, 120.1], [1.66195656E12, 118.0], [1.66195668E12, 104.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66195662E12, 139.89999999999998], [1.66195656E12, 115.5], [1.66195668E12, 104.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.6619565E12, 22.692307692307693]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66195656E12, 52.54545454545455], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66195662E12, 23.199999999999996], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66195656E12, 9.5], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66195656E12, 21.583333333333332], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66195656E12, 21.75], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66195656E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66195656E12, 100.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66195656E12, 102.83333333333333], [1.6619565E12, 121.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66195656E12, 107.91666666666667], [1.6619565E12, 126.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66195656E12, 95.41666666666667], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195674E12, 0.0], [1.66195668E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66195662E12, 45.1], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66195662E12, 12.5], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66195662E12, 11.900000000000002], [1.66195656E12, 0.0], [1.66195668E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.66195656E12, 433.0], [1.6619565E12, 844.1818181818181]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.6619565E12, 771.1538461538462]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.6619565E12, 378.6923076923077]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.6619565E12, 796.7692307692308]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.6619565E12, 2418.153846153846]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.6619565E12, 2641.3076923076924]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66195656E12, 7298.0], [1.6619565E12, 1028.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.6619565E12, 1006.8461538461538]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.6619565E12, 206.23076923076925]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.6619565E12, 428.2307692307692]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.6619565E12, 161.6153846153846]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66195662E12, 109.0], [1.66195656E12, 163.66666666666669]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.66195662E12, 0.0], [1.66195656E12, 0.0], [1.66195668E12, 0.0], [1.6619565E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66195674E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 51.0, "minX": 1.6619565E12, "maxY": 82517.0, "series": [{"data": [[1.66195662E12, 4258.0], [1.66195656E12, 82517.0], [1.66195674E12, 902.0], [1.66195668E12, 1189.0], [1.6619565E12, 41785.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66195662E12, 325.5], [1.66195656E12, 893.0], [1.66195674E12, 280.5999999999999], [1.66195668E12, 274.79999999999995], [1.6619565E12, 7237.800000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66195662E12, 1324.0999999999997], [1.66195656E12, 14080.75], [1.66195674E12, 902.0], [1.66195668E12, 1165.0399999999995], [1.6619565E12, 37214.439999999886]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66195662E12, 560.25], [1.66195656E12, 4022.5], [1.66195674E12, 691.1999999999989], [1.66195668E12, 389.0000000000007], [1.6619565E12, 19264.199999999997]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66195662E12, 51.0], [1.66195656E12, 51.0], [1.66195674E12, 57.0], [1.66195668E12, 53.0], [1.6619565E12, 54.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66195662E12, 178.0], [1.66195656E12, 190.5], [1.66195674E12, 92.0], [1.66195668E12, 107.5], [1.6619565E12, 657.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66195674E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 2.0, "minX": 1.0, "maxY": 24174.0, "series": [{"data": [[2.0, 865.0], [32.0, 122.5], [33.0, 203.0], [34.0, 189.0], [43.0, 208.0], [42.0, 85.0], [45.0, 184.0], [3.0, 257.0], [50.0, 87.0], [56.0, 97.5], [4.0, 276.0], [5.0, 727.0], [6.0, 295.0], [7.0, 257.0], [8.0, 292.5], [9.0, 451.0], [10.0, 557.0], [11.0, 475.5], [12.0, 1544.0], [13.0, 215.0], [14.0, 501.0], [15.0, 702.0], [16.0, 1115.5], [1.0, 694.0], [17.0, 102.0], [18.0, 640.0], [19.0, 339.0], [20.0, 278.0], [21.0, 182.0], [22.0, 159.5], [23.0, 159.0], [24.0, 130.5], [25.0, 96.0], [26.0, 185.0], [27.0, 102.0], [28.0, 189.0], [29.0, 84.0], [30.0, 303.5], [31.0, 162.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 24174.0], [10.0, 23778.0], [12.0, 299.0], [6.0, 293.0], [7.0, 276.0], [28.0, 276.0], [29.0, 2.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 56.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 353.5, "series": [{"data": [[2.0, 301.0], [32.0, 0.0], [33.0, 0.0], [34.0, 0.0], [43.0, 0.0], [42.0, 0.0], [45.0, 0.0], [3.0, 231.0], [50.0, 0.0], [56.0, 0.0], [4.0, 247.0], [5.0, 345.5], [6.0, 265.0], [7.0, 234.0], [8.0, 250.0], [9.0, 123.5], [10.0, 228.0], [11.0, 40.0], [12.0, 277.0], [13.0, 68.5], [14.0, 305.5], [15.0, 163.0], [16.0, 353.5], [1.0, 273.0], [17.0, 0.0], [18.0, 225.0], [19.0, 116.0], [20.0, 0.0], [21.0, 0.0], [22.0, 0.0], [23.0, 96.0], [24.0, 0.0], [25.0, 0.0], [26.0, 0.0], [27.0, 0.0], [28.0, 0.0], [29.0, 0.0], [30.0, 167.5], [31.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 0.0], [10.0, 0.0], [12.0, 0.0], [6.0, 0.0], [7.0, 0.0], [28.0, 0.0], [29.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 56.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.45, "minX": 1.6619565E12, "maxY": 12.183333333333334, "series": [{"data": [[1.66195662E12, 12.183333333333334], [1.66195656E12, 8.716666666666667], [1.66195674E12, 0.45], [1.66195668E12, 4.633333333333334], [1.6619565E12, 9.116666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66195674E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.6619565E12, "maxY": 8.566666666666666, "series": [{"data": [[1.66195662E12, 4.216666666666667], [1.66195656E12, 3.65], [1.66195674E12, 0.11666666666666667], [1.66195668E12, 1.3], [1.6619565E12, 8.566666666666666]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66195662E12, 8.016666666666667], [1.66195656E12, 5.083333333333333], [1.66195674E12, 0.3333333333333333], [1.66195668E12, 3.3333333333333335], [1.6619565E12, 0.31666666666666665]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.66195656E12, 0.016666666666666666], [1.6619565E12, 0.13333333333333333]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.NoHttpResponseException", "isController": false}, {"data": [[1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66195674E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.6619565E12, "maxY": 0.7, "series": [{"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-11-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "Clearance-success", "isController": true}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-28-success", "isController": false}, {"data": [[1.66195662E12, 0.4166666666666667], [1.66195656E12, 0.2833333333333333], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.16666666666666666], [1.6619565E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-7-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-30-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17-success", "isController": false}, {"data": [[1.66195662E12, 0.016666666666666666], [1.66195656E12, 0.18333333333333332], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-15-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21-success", "isController": false}, {"data": [[1.66195662E12, 0.016666666666666666], [1.66195656E12, 0.18333333333333332], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3-success", "isController": false}, {"data": [[1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-failure", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-0-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-21-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-18-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-25-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-12-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6-success", "isController": false}, {"data": [[1.66195656E12, 0.03333333333333333], [1.6619565E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-8-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-27-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-16-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0-success", "isController": false}, {"data": [[1.6619565E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-4-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-33-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "Combo-success", "isController": true}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-1-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-19-success", "isController": false}, {"data": [[1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-4-failure", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-20-success", "isController": false}, {"data": [[1.66195662E12, 0.7], [1.66195656E12, 0.55], [1.66195668E12, 0.06666666666666667], [1.6619565E12, 0.3]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-24-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696-success", "isController": false}, {"data": [[1.66195656E12, 0.016666666666666666], [1.6619565E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-failure", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-13-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-9-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-26-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10-success", "isController": false}, {"data": [[1.6619565E12, 0.03333333333333333]], "isOverall": false, "label": "Home-failure", "isController": true}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9-success", "isController": false}, {"data": [[1.66195662E12, 0.016666666666666666], [1.66195656E12, 0.16666666666666666]], "isOverall": false, "label": "HotOffers-success", "isController": true}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-17-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22-success", "isController": false}, {"data": [[1.66195656E12, 0.03333333333333333], [1.6619565E12, 0.15]], "isOverall": false, "label": "Home-success", "isController": true}, {"data": [[1.66195656E12, 0.08333333333333333]], "isOverall": false, "label": "Makeupshop-failure", "isController": true}, {"data": [[1.66195656E12, 0.016666666666666666], [1.6619565E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-5-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-32-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-2-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12-success", "isController": false}, {"data": [[1.66195662E12, 0.4166666666666667], [1.66195656E12, 0.2833333333333333], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.16666666666666666], [1.6619565E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-23-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16-success", "isController": false}, {"data": [[1.6619565E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-failure", "isController": false}, {"data": [[1.66195656E12, 0.03333333333333333]], "isOverall": false, "label": "HotOffers-failure", "isController": true}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695-success", "isController": false}, {"data": [[1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-14-failure", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-31-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-6-success", "isController": false}, {"data": [[1.66195656E12, 0.18333333333333332], [1.6619565E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7-success", "isController": false}, {"data": [[1.66195656E12, 0.016666666666666666], [1.6619565E12, 0.18333333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/-14-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-29-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23-success", "isController": false}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-34-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2-success", "isController": false}, {"data": [[1.6619565E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-success", "isController": false}, {"data": [[1.66195656E12, 0.08333333333333333], [1.6619565E12, 0.05]], "isOverall": false, "label": "Makeupshop-success", "isController": true}, {"data": [[1.66195662E12, 0.06666666666666667], [1.66195674E12, 0.016666666666666666], [1.66195668E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7-success", "isController": false}, {"data": [[1.66195662E12, 0.16666666666666666], [1.66195656E12, 0.03333333333333333], [1.66195668E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-22-success", "isController": false}, {"data": [[1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-10-success", "isController": false}, {"data": [[1.66195656E12, 0.2], [1.6619565E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66195674E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.13333333333333333, "minX": 1.6619565E12, "maxY": 12.583333333333334, "series": [{"data": [[1.66195662E12, 12.583333333333334], [1.66195656E12, 9.083333333333334], [1.66195674E12, 0.45], [1.66195668E12, 4.666666666666667], [1.6619565E12, 9.05]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.66195656E12, 0.13333333333333333], [1.6619565E12, 0.21666666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66195674E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
