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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 56.0, "series": [{"data": [[300.0, 4.0], [200.0, 6.0], [800.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[300.0, 4.0], [600.0, 1.0], [200.0, 6.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[0.0, 2.0], [100.0, 7.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[0.0, 8.0], [200.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[0.0, 2.0], [200.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[0.0, 7.0], [100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[0.0, 11.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[100.0, 10.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [1200.0, 1.0], [200.0, 3.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[0.0, 7.0], [200.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[0.0, 2.0], [200.0, 3.0], [100.0, 7.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[0.0, 7.0], [100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[0.0, 7.0], [100.0, 2.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[0.0, 6.0], [100.0, 5.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[0.0, 11.0], [1100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[0.0, 8.0], [200.0, 2.0], [400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[0.0, 8.0], [300.0, 1.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[0.0, 10.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[300.0, 1.0], [200.0, 7.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[0.0, 10.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[0.0, 10.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[0.0, 10.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [200.0, 5.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[0.0, 9.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[300.0, 3.0], [200.0, 6.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[300.0, 4.0], [1300.0, 1.0], [200.0, 5.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [1200.0, 1.0], [200.0, 3.0], [100.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[0.0, 10.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [200.0, 3.0], [100.0, 3.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[0.0, 4.0], [600.0, 1.0], [200.0, 3.0], [400.0, 1.0], [100.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[0.0, 3.0], [1200.0, 1.0], [200.0, 6.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[0.0, 4.0], [600.0, 1.0], [200.0, 3.0], [100.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 2.0], [1200.0, 2.0], [1600.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [1000.0, 4.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 5.0], [100.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [200.0, 4.0], [400.0, 1.0], [100.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [100.0, 3.0], [200.0, 4.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [600.0, 1.0], [200.0, 1.0], [100.0, 8.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1200.0, 1.0], [300.0, 1.0], [100.0, 3.0], [200.0, 6.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[0.0, 1.0], [600.0, 1.0], [200.0, 4.0], [100.0, 4.0], [400.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[0.0, 3.0], [100.0, 6.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[0.0, 2.0], [200.0, 4.0], [100.0, 6.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[0.0, 2.0], [1200.0, 1.0], [300.0, 1.0], [100.0, 6.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[0.0, 8.0], [1100.0, 1.0], [300.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [100.0, 4.0], [200.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[0.0, 10.0], [400.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[0.0, 1.0], [100.0, 3.0], [400.0, 2.0], [200.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[0.0, 10.0], [600.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[0.0, 2.0], [100.0, 6.0], [200.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[0.0, 10.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[0.0, 4.0], [200.0, 4.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[0.0, 9.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [100.0, 5.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[0.0, 10.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[0.0, 5.0], [300.0, 1.0], [200.0, 2.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [700.0, 1.0], [200.0, 3.0], [100.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[300.0, 4.0], [600.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [200.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[0.0, 8.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [200.0, 3.0], [100.0, 6.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[0.0, 2.0], [1200.0, 1.0], [300.0, 1.0], [200.0, 5.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[0.0, 11.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[0.0, 11.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[0.0, 2.0], [1300.0, 1.0], [200.0, 3.0], [100.0, 5.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0], [100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[0.0, 11.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[200.0, 2.0], [100.0, 6.0], [500.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[0.0, 22.0], [100.0, 32.0], [200.0, 5.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[4300.0, 1.0], [9200.0, 2.0], [4800.0, 1.0], [5100.0, 1.0], [10500.0, 2.0], [6400.0, 1.0], [13100.0, 1.0], [7000.0, 1.0], [57000.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[2100.0, 1.0], [1500.0, 2.0], [800.0, 3.0], [1600.0, 1.0], [900.0, 2.0], [2000.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[4100.0, 1.0], [600.0, 2.0], [300.0, 1.0], [5100.0, 1.0], [1400.0, 1.0], [100.0, 2.0], [1600.0, 2.0], [1700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[2100.0, 1.0], [300.0, 1.0], [600.0, 1.0], [2700.0, 1.0], [1400.0, 1.0], [200.0, 1.0], [100.0, 5.0], [1600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [2800.0, 1.0], [400.0, 2.0], [100.0, 2.0], [900.0, 3.0], [2000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1100.0, 1.0], [2200.0, 1.0], [1200.0, 1.0], [79700.0, 1.0], [700.0, 1.0], [5700.0, 1.0], [3000.0, 1.0], [800.0, 1.0], [900.0, 2.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1300.0, 1.0], [700.0, 2.0], [11300.0, 1.0], [400.0, 1.0], [1700.0, 1.0], [3700.0, 1.0], [1900.0, 2.0], [7700.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1100.0, 2.0], [1400.0, 1.0], [1500.0, 2.0], [800.0, 1.0], [1600.0, 2.0], [3600.0, 1.0], [900.0, 1.0], [7600.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1100.0, 1.0], [2200.0, 1.0], [78000.0, 1.0], [1300.0, 1.0], [2700.0, 1.0], [2800.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [6800.0, 1.0], [3400.0, 1.0], [1900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [100.0, 5.0], [7700.0, 1.0], [1000.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[300.0, 4.0], [200.0, 7.0], [1600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [700.0, 1.0], [100.0, 5.0], [400.0, 1.0], [1700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[8700.0, 1.0], [4300.0, 1.0], [9000.0, 1.0], [5800.0, 1.0], [11300.0, 1.0], [3000.0, 1.0], [6400.0, 1.0], [3400.0, 1.0], [53400.0, 1.0], [3600.0, 1.0], [7400.0, 1.0], [7600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[33000.0, 2.0], [141900.0, 1.0], [84000.0, 1.0], [82400.0, 1.0], [88400.0, 1.0], [47000.0, 1.0], [47800.0, 1.0], [28500.0, 1.0], [30500.0, 1.0], [31300.0, 1.0], [32000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[300.0, 4.0], [200.0, 6.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1300.0, 1.0], [200.0, 3.0], [100.0, 7.0], [1600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[300.0, 4.0], [600.0, 2.0], [2500.0, 1.0], [700.0, 1.0], [2800.0, 1.0], [3000.0, 1.0], [100.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[10500.0, 1.0], [20600.0, 1.0], [1400.0, 1.0], [400.0, 3.0], [200.0, 3.0], [900.0, 1.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[2100.0, 2.0], [2300.0, 1.0], [4900.0, 1.0], [2500.0, 1.0], [5200.0, 1.0], [2800.0, 1.0], [3000.0, 1.0], [1800.0, 1.0], [3900.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[600.0, 3.0], [300.0, 2.0], [1300.0, 1.0], [3100.0, 1.0], [200.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[400.0, 3.0], [100.0, 8.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [1200.0, 1.0], [700.0, 1.0], [400.0, 1.0], [800.0, 1.0], [1600.0, 1.0], [900.0, 2.0], [1000.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[600.0, 2.0], [200.0, 1.0], [100.0, 5.0], [400.0, 2.0], [1800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [100.0, 5.0], [200.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[400.0, 1.0], [100.0, 9.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[600.0, 1.0], [100.0, 9.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [600.0, 2.0], [700.0, 2.0], [3000.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [900.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [10800.0, 1.0], [700.0, 1.0], [3000.0, 1.0], [1600.0, 1.0], [200.0, 1.0], [800.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [200.0, 3.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[4200.0, 1.0], [2200.0, 1.0], [2600.0, 1.0], [3300.0, 1.0], [1600.0, 1.0], [400.0, 1.0], [3500.0, 1.0], [900.0, 2.0], [2000.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[0.0, 4.0], [400.0, 2.0], [200.0, 3.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[0.0, 3.0], [200.0, 2.0], [100.0, 5.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 4.0], [2800.0, 1.0], [800.0, 1.0], [900.0, 2.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 2.0], [8800.0, 1.0], [2300.0, 2.0], [3000.0, 1.0], [3300.0, 1.0], [1900.0, 1.0], [3800.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[0.0, 1.0], [200.0, 4.0], [100.0, 7.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[0.0, 10.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[0.0, 1.0], [600.0, 1.0], [1300.0, 1.0], [200.0, 6.0], [100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[300.0, 1.0], [1400.0, 1.0], [800.0, 1.0], [200.0, 7.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[0.0, 3.0], [600.0, 1.0], [200.0, 2.0], [100.0, 5.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[300.0, 2.0], [100.0, 3.0], [200.0, 5.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [200.0, 4.0], [400.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1200.0, 2.0], [1300.0, 1.0], [5600.0, 1.0], [2900.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [3400.0, 1.0], [900.0, 1.0], [3800.0, 1.0], [1000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[0.0, 1.0], [1200.0, 1.0], [100.0, 4.0], [200.0, 6.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 3.0], [800.0, 1.0], [100.0, 6.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[0.0, 4.0], [100.0, 4.0], [200.0, 3.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[0.0, 4.0], [700.0, 1.0], [200.0, 3.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[600.0, 1.0], [200.0, 10.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [800.0, 2.0], [200.0, 1.0], [400.0, 2.0], [3500.0, 1.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[4300.0, 1.0], [2300.0, 1.0], [1100.0, 1.0], [1400.0, 1.0], [2900.0, 1.0], [6000.0, 1.0], [49700.0, 1.0], [3200.0, 1.0], [3400.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[0.0, 1.0], [1100.0, 1.0], [300.0, 1.0], [100.0, 5.0], [500.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[18300.0, 1.0], [19100.0, 1.0], [20000.0, 1.0], [20100.0, 1.0], [20300.0, 1.0], [22500.0, 1.0], [23200.0, 1.0], [12100.0, 1.0], [24300.0, 1.0], [25800.0, 1.0], [13700.0, 1.0], [26800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[300.0, 1.0], [200.0, 11.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[0.0, 11.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[0.0, 11.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[0.0, 7.0], [300.0, 1.0], [100.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[0.0, 7.0], [300.0, 1.0], [100.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[0.0, 11.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[0.0, 10.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [200.0, 5.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[200.0, 6.0], [400.0, 1.0], [100.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[0.0, 2.0], [1400.0, 1.0], [200.0, 6.0], [100.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[0.0, 3.0], [100.0, 5.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[0.0, 56.0], [1200.0, 1.0], [300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[2300.0, 1.0], [1200.0, 1.0], [300.0, 2.0], [200.0, 4.0], [100.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[0.0, 8.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[0.0, 7.0], [100.0, 2.0], [200.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[33200.0, 2.0], [142200.0, 1.0], [84300.0, 1.0], [82700.0, 1.0], [88700.0, 1.0], [47200.0, 1.0], [48000.0, 1.0], [28700.0, 1.0], [30700.0, 1.0], [31400.0, 1.0], [32200.0, 1.0]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[4300.0, 1.0], [2200.0, 1.0], [4700.0, 2.0], [9500.0, 1.0], [2500.0, 1.0], [10500.0, 1.0], [1300.0, 1.0], [1500.0, 1.0], [3200.0, 1.0], [400.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[4600.0, 1.0], [19400.0, 1.0], [10200.0, 1.0], [11200.0, 1.0], [11000.0, 1.0], [11700.0, 1.0], [12000.0, 1.0], [12400.0, 1.0], [1600.0, 1.0], [14100.0, 1.0], [7100.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[2300.0, 1.0], [77600.0, 1.0], [300.0, 1.0], [2500.0, 2.0], [2600.0, 1.0], [700.0, 1.0], [2800.0, 1.0], [2900.0, 1.0], [1600.0, 1.0], [7200.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[0.0, 1.0], [2200.0, 1.0], [1100.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [6000.0, 1.0], [1600.0, 3.0], [1700.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[600.0, 1.0], [300.0, 3.0], [2800.0, 1.0], [1400.0, 1.0], [2700.0, 1.0], [1600.0, 1.0], [200.0, 1.0], [900.0, 1.0], [3700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[2100.0, 2.0], [4100.0, 1.0], [2400.0, 1.0], [300.0, 1.0], [9800.0, 1.0], [22900.0, 1.0], [45500.0, 1.0], [1600.0, 1.0], [6800.0, 1.0], [1700.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [300.0, 1.0], [1300.0, 2.0], [2800.0, 1.0], [5700.0, 1.0], [800.0, 1.0], [1800.0, 1.0], [900.0, 1.0], [3700.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1100.0, 2.0], [2300.0, 1.0], [2200.0, 1.0], [140800.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [21400.0, 1.0], [44800.0, 1.0], [6000.0, 1.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[4200.0, 1.0], [600.0, 1.0], [4800.0, 1.0], [5000.0, 1.0], [800.0, 2.0], [400.0, 1.0], [1700.0, 1.0], [3400.0, 1.0], [900.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[300.0, 1.0], [100.0, 6.0], [400.0, 2.0], [3500.0, 1.0], [1800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[8500.0, 1.0], [4200.0, 1.0], [4100.0, 1.0], [4700.0, 1.0], [4900.0, 2.0], [5400.0, 1.0], [5800.0, 1.0], [6100.0, 1.0], [6000.0, 1.0], [6200.0, 1.0], [3300.0, 1.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[0.0, 3.0], [300.0, 17.0], [600.0, 4.0], [2500.0, 1.0], [700.0, 5.0], [200.0, 50.0], [400.0, 7.0], [800.0, 3.0], [900.0, 2.0], [500.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 142200.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 9.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1486.0, "series": [{"data": [[0.0, 1486.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 234.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 215.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 9.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.5, "minX": 1.66195602E12, "maxY": 12.0, "series": [{"data": [[1.66195614E12, 9.72869565217392], [1.66195608E12, 11.98529411764706], [1.66195626E12, 1.5], [1.6619562E12, 4.720338983050848], [1.66195602E12, 12.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66195626E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 50.0, "minX": 1.0, "maxY": 56920.25, "series": [{"data": [[12.0, 362.72727272727275], [6.0, 289.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[11.5, 356.58333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300-Aggregated", "isController": false}, {"data": [[12.0, 337.8181818181818], [6.0, 286.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[11.5, 333.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301-Aggregated", "isController": false}, {"data": [[9.0, 182.0], [5.0, 175.0], [12.0, 175.42857142857142], [6.0, 268.0], [7.0, 176.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[9.666666666666666, 183.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21-Aggregated", "isController": false}, {"data": [[9.0, 71.0], [5.0, 111.0], [12.0, 93.71428571428571], [6.0, 194.0], [7.0, 211.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[9.666666666666666, 112.83333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20-Aggregated", "isController": false}, {"data": [[9.0, 188.0], [5.0, 203.0], [12.0, 183.42857142857144], [6.0, 212.0], [7.0, 198.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[9.666666666666666, 190.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22-Aggregated", "isController": false}, {"data": [[9.0, 70.0], [5.0, 91.5], [12.0, 135.85714285714286], [6.0, 187.0], [7.0, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[9.666666666666666, 122.16666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4-Aggregated", "isController": false}, {"data": [[9.0, 61.0], [5.0, 85.0], [12.0, 83.57142857142857], [6.0, 59.0], [7.0, 84.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[9.666666666666666, 79.91666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5-Aggregated", "isController": false}, {"data": [[9.0, 108.0], [5.0, 157.5], [12.0, 121.0], [6.0, 154.0], [7.0, 102.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[9.666666666666666, 127.16666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6-Aggregated", "isController": false}, {"data": [[9.0, 174.0], [5.0, 138.0], [12.0, 341.00000000000006], [6.0, 178.0], [7.0, 90.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[9.666666666666666, 258.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7-Aggregated", "isController": false}, {"data": [[9.0, 70.0], [5.0, 93.5], [12.0, 129.14285714285714], [6.0, 182.0], [7.0, 98.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[9.666666666666666, 120.08333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8-Aggregated", "isController": false}, {"data": [[9.0, 190.0], [5.0, 197.0], [12.0, 176.57142857142856], [6.0, 186.0], [7.0, 190.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[9.666666666666666, 183.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9-Aggregated", "isController": false}, {"data": [[9.0, 191.0], [5.0, 105.5], [12.0, 125.57142857142858], [6.0, 68.0], [7.0, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[9.666666666666666, 118.83333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10-Aggregated", "isController": false}, {"data": [[9.0, 69.0], [5.0, 70.0], [12.0, 147.28571428571428], [6.0, 62.0], [7.0, 211.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[9.666666666666666, 126.08333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12-Aggregated", "isController": false}, {"data": [[9.0, 179.0], [5.0, 72.0], [12.0, 147.0], [6.0, 67.0], [7.0, 186.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[9.666666666666666, 133.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11-Aggregated", "isController": false}, {"data": [[8.0, 1165.0], [4.0, 56.0], [2.0, 54.0], [1.0, 57.0], [9.0, 55.0], [10.0, 67.0], [5.0, 54.0], [11.0, 51.0], [12.0, 59.0], [6.0, 55.0], [3.0, 61.0], [7.0, 58.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[6.5, 149.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20-Aggregated", "isController": false}, {"data": [[9.0, 77.0], [5.0, 175.0], [12.0, 154.14285714285714], [6.0, 104.0], [7.0, 91.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[9.666666666666666, 141.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14-Aggregated", "isController": false}, {"data": [[9.0, 202.0], [5.0, 73.5], [12.0, 135.7142857142857], [6.0, 70.0], [7.0, 89.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[9.666666666666666, 121.49999999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13-Aggregated", "isController": false}, {"data": [[9.0, 112.0], [5.0, 83.5], [12.0, 89.71428571428571], [6.0, 82.0], [7.0, 92.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[9.666666666666666, 90.08333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16-Aggregated", "isController": false}, {"data": [[8.0, 200.0], [4.0, 182.0], [2.0, 201.0], [1.0, 228.0], [9.0, 205.0], [10.0, 206.0], [5.0, 346.0], [11.0, 192.0], [12.0, 209.0], [6.0, 177.0], [3.0, 200.0], [7.0, 188.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[6.5, 211.16666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23-Aggregated", "isController": false}, {"data": [[9.0, 79.0], [5.0, 74.0], [12.0, 74.85714285714286], [6.0, 83.0], [7.0, 81.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[9.666666666666666, 76.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15-Aggregated", "isController": false}, {"data": [[9.0, 88.0], [5.0, 151.0], [12.0, 85.85714285714286], [6.0, 62.0], [7.0, 90.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[9.666666666666666, 95.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18-Aggregated", "isController": false}, {"data": [[8.0, 72.0], [4.0, 81.0], [2.0, 193.0], [1.0, 81.0], [9.0, 83.0], [10.0, 77.0], [5.0, 77.0], [11.0, 78.0], [12.0, 80.0], [6.0, 106.0], [3.0, 68.0], [7.0, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[6.5, 88.83333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21-Aggregated", "isController": false}, {"data": [[9.0, 74.0], [5.0, 122.0], [12.0, 90.42857142857143], [6.0, 68.0], [7.0, 92.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[9.666666666666666, 92.58333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17-Aggregated", "isController": false}, {"data": [[8.0, 200.0], [4.0, 65.0], [2.0, 193.0], [1.0, 186.0], [9.0, 203.0], [10.0, 207.0], [5.0, 83.0], [11.0, 352.0], [12.0, 208.0], [6.0, 177.0], [3.0, 259.0], [7.0, 182.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[6.5, 192.91666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22-Aggregated", "isController": false}, {"data": [[9.0, 54.0], [5.0, 117.0], [12.0, 73.71428571428572], [6.0, 164.0], [7.0, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[9.666666666666666, 86.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19-Aggregated", "isController": false}, {"data": [[12.0, 384.45454545454544], [6.0, 351.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[11.5, 381.66666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895-Aggregated", "isController": false}, {"data": [[9.0, 240.5], [10.0, 301.0], [5.0, 327.5], [12.0, 564.2857142857143]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[10.166666666666666, 448.91666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896-Aggregated", "isController": false}, {"data": [[12.0, 343.81818181818187], [7.0, 192.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[11.583333333333334, 331.16666666666674]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9-Aggregated", "isController": false}, {"data": [[8.0, 78.0], [4.0, 79.0], [2.0, 92.0], [1.0, 72.0], [9.0, 80.0], [10.0, 79.0], [5.0, 66.0], [11.0, 65.0], [12.0, 63.0], [6.0, 66.0], [3.0, 65.0], [7.0, 80.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[6.5, 73.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18-Aggregated", "isController": false}, {"data": [[8.0, 70.0], [4.0, 67.0], [2.0, 202.0], [1.0, 70.0], [9.0, 67.0], [10.0, 172.0], [5.0, 80.0], [11.0, 79.0], [12.0, 70.0], [6.0, 70.0], [3.0, 70.0], [7.0, 74.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[6.5, 90.91666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19-Aggregated", "isController": false}, {"data": [[12.0, 228.36363636363637], [7.0, 194.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[11.583333333333334, 225.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3-Aggregated", "isController": false}, {"data": [[12.0, 294.54545454545456], [7.0, 191.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[11.583333333333334, 285.9166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4-Aggregated", "isController": false}, {"data": [[9.0, 70.0], [10.0, 72.5], [5.0, 128.5], [12.0, 115.42857142857143]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[10.250000000000002, 106.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19-Aggregated", "isController": false}, {"data": [[12.0, 334.9090909090909], [7.0, 99.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[11.583333333333334, 315.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1-Aggregated", "isController": false}, {"data": [[12.0, 228.0909090909091], [7.0, 186.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[11.583333333333334, 224.58333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2-Aggregated", "isController": false}, {"data": [[8.0, 2200.0], [4.0, 1085.0], [2.0, 1204.0], [1.0, 1694.0], [9.0, 2258.0], [10.0, 1048.0], [5.0, 1225.0], [11.0, 1722.0], [12.0, 970.0], [6.0, 1064.0], [3.0, 1027.0], [7.0, 2111.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[6.5, 1467.333333333333]], "isOverall": false, "label": "Clearance-Aggregated", "isController": true}, {"data": [[12.0, 239.36363636363637], [7.0, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[11.583333333333334, 224.91666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7-Aggregated", "isController": false}, {"data": [[12.0, 278.18181818181813], [7.0, 121.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[11.583333333333334, 265.08333333333326]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8-Aggregated", "isController": false}, {"data": [[12.0, 253.72727272727272], [7.0, 168.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[11.583333333333334, 246.58333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5-Aggregated", "isController": false}, {"data": [[8.0, 72.0], [4.0, 189.0], [2.0, 182.0], [1.0, 604.0], [9.0, 187.0], [10.0, 178.0], [5.0, 183.0], [11.0, 328.0], [12.0, 215.0], [6.0, 183.0], [3.0, 173.0], [7.0, 187.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[6.5, 223.41666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9-Aggregated", "isController": false}, {"data": [[12.0, 341.8181818181818], [7.0, 211.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[11.583333333333334, 330.9166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6-Aggregated", "isController": false}, {"data": [[9.0, 1009.0], [10.0, 152.5], [5.0, 160.5], [12.0, 285.71428571428567]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[10.250000000000002, 302.91666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12-Aggregated", "isController": false}, {"data": [[8.0, 198.0], [4.0, 215.0], [2.0, 73.0], [1.0, 297.0], [9.0, 198.0], [10.0, 185.0], [5.0, 82.0], [11.0, 193.0], [12.0, 104.0], [6.0, 97.0], [3.0, 175.0], [7.0, 288.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[6.5, 175.41666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7-Aggregated", "isController": false}, {"data": [[9.0, 84.0], [10.0, 213.0], [5.0, 203.0], [12.0, 179.28571428571428]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[10.250000000000002, 180.91666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11-Aggregated", "isController": false}, {"data": [[8.0, 1204.0], [4.0, 179.0], [2.0, 74.0], [1.0, 309.0], [9.0, 197.0], [10.0, 185.0], [5.0, 194.0], [11.0, 204.0], [12.0, 119.0], [6.0, 76.0], [3.0, 175.0], [7.0, 258.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[6.5, 264.50000000000006]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8-Aggregated", "isController": false}, {"data": [[9.0, 1111.0], [10.0, 72.5], [5.0, 83.0], [12.0, 145.71428571428572]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[10.250000000000002, 203.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14-Aggregated", "isController": false}, {"data": [[8.0, 214.0], [4.0, 172.0], [2.0, 180.0], [1.0, 235.0], [9.0, 60.0], [10.0, 106.0], [5.0, 202.0], [11.0, 76.0], [12.0, 85.0], [6.0, 212.0], [3.0, 169.0], [7.0, 335.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[6.5, 170.50000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5-Aggregated", "isController": false}, {"data": [[9.0, 475.0], [10.0, 70.5], [5.0, 79.5], [12.0, 131.42857142857142]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[10.250000000000002, 141.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13-Aggregated", "isController": false}, {"data": [[8.0, 531.0], [4.0, 206.0], [2.0, 216.0], [1.0, 467.0], [9.0, 102.0], [10.0, 98.0], [5.0, 232.0], [11.0, 112.0], [12.0, 100.0], [6.0, 215.0], [3.0, 217.0], [7.0, 475.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[6.5, 247.58333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6-Aggregated", "isController": false}, {"data": [[9.0, 684.0], [10.0, 75.0], [5.0, 70.5], [12.0, 142.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[10.250000000000002, 164.08333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16-Aggregated", "isController": false}, {"data": [[8.0, 204.0], [4.0, 78.0], [2.0, 192.0], [1.0, 275.0], [9.0, 80.0], [10.0, 186.0], [5.0, 263.0], [11.0, 198.0], [12.0, 175.0], [6.0, 195.0], [3.0, 202.0], [7.0, 174.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[6.5, 185.16666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3-Aggregated", "isController": false}, {"data": [[9.0, 75.0], [10.0, 72.5], [5.0, 125.0], [12.0, 93.57142857142857]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[10.250000000000002, 93.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15-Aggregated", "isController": false}, {"data": [[8.0, 182.0], [4.0, 200.0], [2.0, 442.0], [1.0, 274.0], [9.0, 75.0], [10.0, 69.0], [5.0, 237.0], [11.0, 221.0], [12.0, 70.0], [6.0, 81.0], [3.0, 192.0], [7.0, 128.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[6.5, 180.91666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4-Aggregated", "isController": false}, {"data": [[9.0, 201.0], [10.0, 124.5], [5.0, 83.0], [12.0, 97.14285714285714]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[10.250000000000002, 108.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18-Aggregated", "isController": false}, {"data": [[8.0, 67.0], [4.0, 189.0], [2.0, 450.0], [1.0, 274.0], [9.0, 66.0], [10.0, 77.0], [5.0, 129.0], [11.0, 65.0], [12.0, 100.0], [6.0, 183.0], [3.0, 190.0], [7.0, 349.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[6.5, 178.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1-Aggregated", "isController": false}, {"data": [[9.0, 121.0], [10.0, 138.0], [5.0, 78.0], [12.0, 75.28571428571429]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[10.250000000000002, 90.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17-Aggregated", "isController": false}, {"data": [[8.0, 197.0], [4.0, 189.0], [2.0, 76.0], [1.0, 276.0], [9.0, 80.0], [10.0, 64.0], [5.0, 134.0], [11.0, 200.0], [12.0, 85.0], [6.0, 181.0], [3.0, 78.0], [7.0, 370.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[6.5, 160.83333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2-Aggregated", "isController": false}, {"data": [[8.0, 188.0], [4.0, 184.0], [2.0, 81.0], [1.0, 717.0], [9.0, 188.0], [10.0, 232.0], [5.0, 210.0], [11.0, 388.0], [12.0, 77.0], [6.0, 213.0], [3.0, 185.0], [7.0, 162.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[6.5, 235.41666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12-Aggregated", "isController": false}, {"data": [[8.0, 314.0], [4.0, 324.0], [2.0, 350.0], [1.0, 323.0], [9.0, 1513.0], [10.0, 255.0], [5.0, 227.0], [11.0, 710.0], [12.0, 209.0], [6.0, 287.0], [3.0, 179.0], [7.0, 699.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[6.5, 449.16666666666674]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0-Aggregated", "isController": false}, {"data": [[8.0, 134.0], [4.0, 71.0], [2.0, 70.0], [1.0, 98.0], [9.0, 68.0], [10.0, 77.0], [5.0, 201.0], [11.0, 66.0], [12.0, 74.0], [6.0, 180.0], [3.0, 63.0], [7.0, 157.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[6.5, 104.91666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13-Aggregated", "isController": false}, {"data": [[8.0, 87.0], [4.0, 179.0], [2.0, 197.0], [1.0, 316.0], [9.0, 224.0], [10.0, 178.0], [5.0, 85.0], [11.0, 192.0], [12.0, 227.0], [6.0, 176.0], [3.0, 185.0], [7.0, 200.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[6.5, 187.16666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10-Aggregated", "isController": false}, {"data": [[8.0, 1218.0], [4.0, 69.0], [2.0, 180.0], [1.0, 347.0], [9.0, 206.0], [10.0, 208.0], [5.0, 200.0], [11.0, 191.0], [12.0, 217.0], [6.0, 192.0], [3.0, 69.0], [7.0, 237.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[6.5, 277.83333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11-Aggregated", "isController": false}, {"data": [[8.0, 65.0], [4.0, 66.0], [2.0, 81.0], [1.0, 76.0], [9.0, 87.0], [10.0, 71.0], [5.0, 109.0], [11.0, 70.0], [12.0, 75.0], [6.0, 69.0], [3.0, 70.0], [7.0, 86.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[6.5, 77.08333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16-Aggregated", "isController": false}, {"data": [[8.0, 331.0], [4.0, 68.0], [2.0, 71.0], [1.0, 79.0], [9.0, 84.0], [10.0, 93.0], [5.0, 74.0], [11.0, 64.0], [12.0, 80.0], [6.0, 81.0], [3.0, 72.0], [7.0, 68.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[6.5, 97.08333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17-Aggregated", "isController": false}, {"data": [[9.0, 1359.0], [10.0, 184.5], [5.0, 187.5], [12.0, 276.7142857142857]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[10.250000000000002, 336.66666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10-Aggregated", "isController": false}, {"data": [[8.0, 83.0], [4.0, 64.0], [2.0, 74.0], [1.0, 94.0], [9.0, 80.0], [10.0, 114.0], [5.0, 68.0], [11.0, 386.0], [12.0, 75.0], [6.0, 88.0], [3.0, 70.0], [7.0, 468.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[6.5, 138.66666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14-Aggregated", "isController": false}, {"data": [[8.0, 82.0], [4.0, 71.0], [2.0, 71.0], [1.0, 73.0], [9.0, 75.0], [10.0, 220.0], [5.0, 79.0], [11.0, 66.0], [12.0, 64.0], [6.0, 69.0], [3.0, 73.0], [7.0, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[6.5, 84.58333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15-Aggregated", "isController": false}, {"data": [[12.0, 295.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[12.0, 295.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-19-Aggregated", "isController": false}, {"data": [[8.0, 107.5], [4.0, 93.0], [2.0, 126.0], [1.0, 100.0], [9.0, 93.33333333333333], [10.0, 99.0], [5.0, 100.75], [11.0, 128.0], [12.0, 135.5526315789474], [6.0, 89.33333333333333], [3.0, 101.0], [7.0, 98.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[9.933333333333335, 122.53333333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json-Aggregated", "isController": false}, {"data": [[12.0, 12860.727272727272], [6.0, 4391.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[11.5, 12154.916666666666]], "isOverall": false, "label": "Makeupshop-Aggregated", "isController": true}, {"data": [[8.0, 2015.0], [4.0, 940.0], [2.0, 1025.0], [1.0, 1531.0], [9.0, 2119.0], [10.0, 890.0], [5.0, 1076.0], [11.0, 1533.0], [12.0, 804.0], [6.0, 922.0], [3.0, 852.0], [7.0, 1689.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[6.5, 1283.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-Aggregated", "isController": false}, {"data": [[12.0, 1556.0000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[12.0, 1556.0000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/-11-Aggregated", "isController": false}, {"data": [[12.0, 817.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[12.0, 817.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-12-Aggregated", "isController": false}, {"data": [[12.0, 931.4166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[12.0, 931.4166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-13-Aggregated", "isController": false}, {"data": [[12.0, 8388.916666666668]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[12.0, 8388.916666666668]], "isOverall": false, "label": "https://www.banglashoppers.com/-14-Aggregated", "isController": false}, {"data": [[12.0, 2821.9999999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[12.0, 2821.9999999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/-15-Aggregated", "isController": false}, {"data": [[12.0, 2105.0833333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[12.0, 2105.0833333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-16-Aggregated", "isController": false}, {"data": [[12.0, 8707.666666666668]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[12.0, 8707.666666666668]], "isOverall": false, "label": "https://www.banglashoppers.com/-17-Aggregated", "isController": false}, {"data": [[12.0, 1032.4999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[12.0, 1032.4999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/-18-Aggregated", "isController": false}, {"data": [[8.0, 247.0], [4.0, 309.0], [5.0, 256.0], [12.0, 485.4285714285714], [6.0, 247.0], [7.0, 228.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[9.5, 390.41666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696-Aggregated", "isController": false}, {"data": [[12.0, 447.5833333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[12.0, 447.5833333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-10-Aggregated", "isController": false}, {"data": [[12.0, 11061.363636363636], [7.0, 3057.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[11.583333333333334, 10394.333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-Aggregated", "isController": false}, {"data": [[12.0, 56698.833333333336]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[12.0, 56698.833333333336]], "isOverall": false, "label": "https://www.banglashoppers.com/-Aggregated", "isController": false}, {"data": [[8.0, 324.0], [4.0, 247.0], [5.0, 255.0], [12.0, 424.0], [6.0, 330.0], [7.0, 336.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[9.5, 371.66666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695-Aggregated", "isController": false}, {"data": [[12.0, 377.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[12.0, 377.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-22-Aggregated", "isController": false}, {"data": [[12.0, 1132.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[12.0, 1132.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-23-Aggregated", "isController": false}, {"data": [[12.0, 3114.8333333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[12.0, 3114.8333333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-24-Aggregated", "isController": false}, {"data": [[8.0, 2339.0], [4.0, 2002.0], [5.0, 2557.0], [12.0, 3414.714285714286], [6.0, 2143.0], [7.0, 2121.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[9.5, 2922.083333333333]], "isOverall": false, "label": "Combo-Aggregated", "isController": true}, {"data": [[12.0, 758.5833333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[12.0, 758.5833333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-25-Aggregated", "isController": false}, {"data": [[12.0, 215.24999999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[12.0, 215.24999999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/-26-Aggregated", "isController": false}, {"data": [[12.0, 913.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[12.0, 913.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27-Aggregated", "isController": false}, {"data": [[12.0, 460.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[12.0, 460.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28-Aggregated", "isController": false}, {"data": [[12.0, 298.08333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[12.0, 298.08333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-29-Aggregated", "isController": false}, {"data": [[12.0, 204.66666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[12.0, 204.66666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/-20-Aggregated", "isController": false}, {"data": [[12.0, 180.08333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[12.0, 180.08333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-21-Aggregated", "isController": false}, {"data": [[9.0, 1156.0], [5.0, 744.5], [12.0, 1430.857142857143], [6.0, 956.0], [7.0, 907.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[9.666666666666666, 1210.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-Aggregated", "isController": false}, {"data": [[12.0, 1960.7499999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[12.0, 1960.7499999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/-33-Aggregated", "isController": false}, {"data": [[9.0, 206.0], [10.0, 189.0], [5.0, 130.0], [12.0, 171.57142857142858]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[10.250000000000002, 170.41666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3-Aggregated", "isController": false}, {"data": [[12.0, 2182.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[12.0, 2182.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-34-Aggregated", "isController": false}, {"data": [[9.0, 80.0], [10.0, 128.5], [5.0, 163.0], [12.0, 247.14285714285717]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[10.250000000000002, 199.41666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2-Aggregated", "isController": false}, {"data": [[9.0, 206.0], [10.0, 134.5], [5.0, 188.5], [12.0, 240.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[10.250000000000002, 211.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1-Aggregated", "isController": false}, {"data": [[9.0, 357.0], [10.0, 588.5], [5.0, 1622.5], [12.0, 789.7142857142857]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[10.250000000000002, 858.9166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0-Aggregated", "isController": false}, {"data": [[12.0, 3127.7272727272725], [7.0, 2074.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[11.583333333333334, 3039.9166666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22-Aggregated", "isController": false}, {"data": [[9.0, 223.0], [10.0, 197.5], [5.0, 135.0], [12.0, 197.14285714285714]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[10.250000000000002, 189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7-Aggregated", "isController": false}, {"data": [[12.0, 103.90909090909092], [7.0, 50.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[11.583333333333334, 99.41666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21-Aggregated", "isController": false}, {"data": [[9.0, 1383.0], [10.0, 162.0], [5.0, 159.0], [12.0, 322.5714285714286]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[10.250000000000002, 356.9166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6-Aggregated", "isController": false}, {"data": [[12.0, 401.5454545454545], [7.0, 188.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[11.583333333333334, 383.74999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24-Aggregated", "isController": false}, {"data": [[9.0, 928.0], [10.0, 129.5], [5.0, 125.5], [12.0, 241.14285714285714]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[10.250000000000002, 260.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5-Aggregated", "isController": false}, {"data": [[12.0, 344.0], [7.0, 176.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[11.583333333333334, 330.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23-Aggregated", "isController": false}, {"data": [[9.0, 195.0], [10.0, 191.0], [5.0, 86.0], [12.0, 260.7142857142857]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[10.250000000000002, 214.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4-Aggregated", "isController": false}, {"data": [[9.0, 3830.0], [10.0, 1278.0], [5.0, 2336.0], [12.0, 2286.0000000000005]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[10.250000000000002, 2255.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-Aggregated", "isController": false}, {"data": [[9.0, 204.0], [10.0, 238.5], [5.0, 194.5], [12.0, 356.14285714285717]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[10.250000000000002, 296.91666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23-Aggregated", "isController": false}, {"data": [[9.0, 169.0], [10.0, 202.0], [5.0, 153.5], [12.0, 309.85714285714283]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[10.250000000000002, 254.08333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22-Aggregated", "isController": false}, {"data": [[12.0, 179.36363636363637], [7.0, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[11.583333333333334, 170.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20-Aggregated", "isController": false}, {"data": [[9.0, 183.0], [10.0, 192.5], [5.0, 129.0], [12.0, 262.14285714285717]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[10.250000000000002, 221.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9-Aggregated", "isController": false}, {"data": [[9.0, 192.0], [10.0, 145.5], [5.0, 131.5], [12.0, 248.1428571428571]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[10.250000000000002, 206.91666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8-Aggregated", "isController": false}, {"data": [[8.0, 212.0], [9.0, 231.0], [10.0, 255.0], [5.0, 446.0], [12.0, 261.7142857142857]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[10.083333333333332, 285.1666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372-Aggregated", "isController": false}, {"data": [[12.0, 842.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[12.0, 842.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-30-Aggregated", "isController": false}, {"data": [[12.0, 6908.909090909091], [7.0, 526.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[11.583333333333334, 6377.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0-Aggregated", "isController": false}, {"data": [[12.0, 373.49999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[12.0, 373.49999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/-31-Aggregated", "isController": false}, {"data": [[12.0, 20559.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[12.0, 20559.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-32-Aggregated", "isController": false}, {"data": [[8.0, 280.0], [9.0, 261.0], [10.0, 237.0], [5.0, 294.0], [12.0, 250.57142857142856]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[10.083333333333332, 260.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371-Aggregated", "isController": false}, {"data": [[9.0, 71.0], [10.0, 66.0], [5.0, 79.0], [12.0, 78.14285714285714]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[10.250000000000002, 75.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21-Aggregated", "isController": false}, {"data": [[9.0, 56.0], [10.0, 57.5], [5.0, 110.5], [12.0, 114.85714285714286]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[10.250000000000002, 99.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20-Aggregated", "isController": false}, {"data": [[12.0, 79.36363636363636], [7.0, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[11.583333333333334, 78.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19-Aggregated", "isController": false}, {"data": [[12.0, 108.45454545454545], [7.0, 61.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[11.583333333333334, 104.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18-Aggregated", "isController": false}, {"data": [[12.0, 138.18181818181822], [7.0, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[11.583333333333334, 132.41666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15-Aggregated", "isController": false}, {"data": [[12.0, 143.0909090909091], [7.0, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[11.583333333333334, 137.41666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14-Aggregated", "isController": false}, {"data": [[12.0, 89.36363636363636], [7.0, 82.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[11.583333333333334, 88.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17-Aggregated", "isController": false}, {"data": [[12.0, 91.9090909090909], [7.0, 85.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[11.583333333333334, 91.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16-Aggregated", "isController": false}, {"data": [[12.0, 186.0], [7.0, 235.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[11.583333333333334, 190.08333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11-Aggregated", "isController": false}, {"data": [[12.0, 256.54545454545456], [7.0, 173.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[11.583333333333334, 249.58333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10-Aggregated", "isController": false}, {"data": [[12.0, 413.45454545454555], [7.0, 216.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[11.583333333333334, 397.0000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13-Aggregated", "isController": false}, {"data": [[12.0, 184.63636363636363], [7.0, 187.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[11.583333333333334, 184.83333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12-Aggregated", "isController": false}, {"data": [[8.0, 58.0], [4.0, 56.0], [2.0, 53.0], [1.0, 63.0], [9.0, 55.333333333333336], [10.0, 54.0], [5.0, 60.5], [11.0, 61.0], [12.0, 102.21052631578945], [6.0, 59.0], [3.0, 74.0], [7.0, 187.5]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[9.933333333333335, 90.51666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?-Aggregated", "isController": false}, {"data": [[9.0, 582.0], [5.0, 180.5], [12.0, 735.2857142857143], [6.0, 273.0], [7.0, 357.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[9.666666666666666, 559.9999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0-Aggregated", "isController": false}, {"data": [[9.0, 90.0], [5.0, 72.5], [12.0, 140.0], [6.0, 67.0], [7.0, 89.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[9.666666666666666, 114.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1-Aggregated", "isController": false}, {"data": [[9.0, 69.0], [5.0, 81.0], [12.0, 118.14285714285714], [6.0, 426.0], [7.0, 90.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[9.666666666666666, 131.16666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2-Aggregated", "isController": false}, {"data": [[9.0, 170.0], [5.0, 70.5], [12.0, 129.14285714285714], [6.0, 439.0], [7.0, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[9.666666666666666, 144.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3-Aggregated", "isController": false}, {"data": [[12.0, 56920.25]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[12.0, 56920.25]], "isOverall": false, "label": "Home-Aggregated", "isController": true}, {"data": [[12.0, 4077.416666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[12.0, 4077.416666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-0-Aggregated", "isController": false}, {"data": [[12.0, 9968.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[12.0, 9968.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1-Aggregated", "isController": false}, {"data": [[12.0, 8959.833333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[12.0, 8959.833333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-2-Aggregated", "isController": false}, {"data": [[12.0, 1968.9166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[12.0, 1968.9166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-Aggregated", "isController": false}, {"data": [[12.0, 1385.166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[12.0, 1385.166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-4-Aggregated", "isController": false}, {"data": [[12.0, 8639.999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[12.0, 8639.999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/-5-Aggregated", "isController": false}, {"data": [[12.0, 2411.0833333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[12.0, 2411.0833333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-6-Aggregated", "isController": false}, {"data": [[12.0, 18865.166666666668]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[12.0, 18865.166666666668]], "isOverall": false, "label": "https://www.banglashoppers.com/-7-Aggregated", "isController": false}, {"data": [[12.0, 2173.2499999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[12.0, 2173.2499999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/-8-Aggregated", "isController": false}, {"data": [[12.0, 699.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[12.0, 699.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-9-Aggregated", "isController": false}, {"data": [[8.0, 6087.0], [9.0, 4112.0], [10.0, 4790.0], [5.0, 5435.5], [12.0, 5555.285714285715]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[10.083333333333332, 5395.583333333333]], "isOverall": false, "label": "HotOffers-Aggregated", "isController": true}, {"data": [[8.0, 264.75], [9.0, 255.25], [10.0, 261.25], [5.0, 377.75], [12.0, 416.79729729729723], [6.0, 258.0]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}, {"data": [[10.916666666666664, 390.68749999999983]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 12.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 1679.0, "minX": 1.66195602E12, "maxY": 1343560.7833333334, "series": [{"data": [[1.66195614E12, 495977.4666666667], [1.66195608E12, 1079186.0], [1.66195626E12, 18764.1], [1.6619562E12, 85109.83333333333], [1.66195602E12, 1343560.7833333334]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66195614E12, 17633.583333333332], [1.66195608E12, 17486.433333333334], [1.66195626E12, 1679.0], [1.6619562E12, 6886.833333333333], [1.66195602E12, 10707.2]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66195626E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 50.0, "minX": 1.66195602E12, "maxY": 142246.0, "series": [{"data": [[1.66195614E12, 335.3333333333333], [1.66195608E12, 370.12500000000006], [1.66195602E12, 312.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66195614E12, 340.6666666666667], [1.66195608E12, 331.375], [1.66195602E12, 329.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66195614E12, 164.71428571428572], [1.66195608E12, 233.66666666666666], [1.6619562E12, 175.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66195614E12, 131.85714285714286], [1.66195608E12, 69.66666666666667], [1.6619562E12, 111.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66195614E12, 186.71428571428572], [1.66195608E12, 191.66666666666666], [1.6619562E12, 203.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66195614E12, 110.85714285714285], [1.66195608E12, 169.0], [1.6619562E12, 91.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66195614E12, 68.28571428571428], [1.66195608E12, 103.66666666666667], [1.6619562E12, 85.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66195614E12, 114.00000000000001], [1.66195608E12, 137.66666666666666], [1.6619562E12, 157.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66195614E12, 292.5714285714286], [1.66195608E12, 260.3333333333333], [1.6619562E12, 138.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66195614E12, 123.14285714285715], [1.66195608E12, 130.66666666666666], [1.6619562E12, 93.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66195614E12, 174.85714285714286], [1.66195608E12, 192.66666666666666], [1.6619562E12, 197.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66195614E12, 142.0], [1.66195608E12, 73.66666666666667], [1.6619562E12, 105.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66195614E12, 107.99999999999999], [1.66195608E12, 205.66666666666666], [1.6619562E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66195614E12, 121.42857142857143], [1.66195608E12, 203.66666666666666], [1.6619562E12, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66195614E12, 242.49999999999997], [1.66195626E12, 55.5], [1.6619562E12, 56.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66195614E12, 141.85714285714286], [1.66195608E12, 119.33333333333333], [1.6619562E12, 175.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66195614E12, 131.57142857142858], [1.66195608E12, 130.0], [1.6619562E12, 73.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66195614E12, 99.42857142857143], [1.66195608E12, 72.66666666666667], [1.6619562E12, 83.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66195614E12, 200.0], [1.66195626E12, 214.5], [1.6619562E12, 226.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66195614E12, 78.42857142857143], [1.66195608E12, 72.66666666666667], [1.6619562E12, 74.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66195614E12, 72.85714285714285], [1.66195608E12, 110.33333333333334], [1.6619562E12, 151.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66195614E12, 76.66666666666667], [1.66195626E12, 137.0], [1.6619562E12, 83.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66195614E12, 91.14285714285714], [1.66195608E12, 76.33333333333333], [1.6619562E12, 122.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66195614E12, 225.33333333333334], [1.66195626E12, 189.5], [1.6619562E12, 146.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66195614E12, 90.57142857142857], [1.66195608E12, 57.333333333333336], [1.6619562E12, 117.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66195614E12, 410.3333333333333], [1.66195608E12, 376.375], [1.66195602E12, 338.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66195614E12, 270.5], [1.66195608E12, 608.3333333333334], [1.6619562E12, 327.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66195614E12, 192.0], [1.66195608E12, 388.55555555555554], [1.66195602E12, 142.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66195614E12, 74.16666666666667], [1.66195626E12, 82.0], [1.6619562E12, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66195614E12, 88.66666666666666], [1.66195626E12, 136.0], [1.6619562E12, 71.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66195614E12, 194.0], [1.66195608E12, 241.55555555555554], [1.66195602E12, 169.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66195614E12, 191.0], [1.66195608E12, 323.0], [1.66195602E12, 166.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66195614E12, 138.0], [1.66195608E12, 78.5], [1.6619562E12, 128.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66195614E12, 99.0], [1.66195608E12, 394.0], [1.66195602E12, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66195614E12, 186.0], [1.66195608E12, 240.88888888888889], [1.66195602E12, 170.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66195614E12, 1518.0000000000002], [1.66195608E12, 1048.0], [1.6619562E12, 1449.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66195614E12, 66.0], [1.66195608E12, 239.99999999999997], [1.66195602E12, 236.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66195614E12, 121.0], [1.66195608E12, 304.77777777777777], [1.66195602E12, 158.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66195614E12, 168.0], [1.66195608E12, 290.4444444444444], [1.66195602E12, 88.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66195614E12, 194.5], [1.66195626E12, 393.0], [1.6619562E12, 182.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66195614E12, 211.0], [1.66195608E12, 392.7777777777778], [1.66195602E12, 112.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66195614E12, 442.75], [1.66195608E12, 257.16666666666663], [1.6619562E12, 160.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66195614E12, 194.33333333333331], [1.66195626E12, 185.0], [1.6619562E12, 142.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66195614E12, 175.75], [1.66195608E12, 177.0], [1.6619562E12, 203.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66195614E12, 361.1666666666667], [1.66195626E12, 191.5], [1.6619562E12, 156.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66195614E12, 343.25], [1.66195608E12, 150.5], [1.6619562E12, 83.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66195614E12, 146.0], [1.66195626E12, 207.5], [1.6619562E12, 188.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66195614E12, 175.5], [1.66195608E12, 139.0], [1.6619562E12, 79.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66195614E12, 236.33333333333331], [1.66195626E12, 341.5], [1.6619562E12, 217.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66195614E12, 231.0], [1.66195608E12, 150.66666666666666], [1.6619562E12, 70.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66195614E12, 169.5], [1.66195626E12, 233.5], [1.6619562E12, 184.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66195614E12, 75.25], [1.66195608E12, 95.66666666666667], [1.6619562E12, 125.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66195614E12, 124.16666666666667], [1.66195626E12, 358.0], [1.6619562E12, 177.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66195614E12, 134.75], [1.66195608E12, 98.5], [1.6619562E12, 83.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66195614E12, 120.66666666666666], [1.66195626E12, 362.0], [1.6619562E12, 172.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66195614E12, 118.0], [1.66195608E12, 75.33333333333334], [1.6619562E12, 78.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66195614E12, 166.0], [1.66195626E12, 176.0], [1.6619562E12, 145.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66195614E12, 205.83333333333331], [1.66195626E12, 399.0], [1.6619562E12, 198.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66195614E12, 616.6666666666667], [1.66195626E12, 336.5], [1.6619562E12, 254.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66195614E12, 96.0], [1.66195626E12, 84.0], [1.6619562E12, 128.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66195614E12, 184.66666666666666], [1.66195626E12, 256.5], [1.6619562E12, 156.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66195614E12, 379.5], [1.66195626E12, 263.5], [1.6619562E12, 132.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66195614E12, 75.66666666666666], [1.66195626E12, 78.5], [1.6619562E12, 78.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66195614E12, 120.0], [1.66195626E12, 75.0], [1.6619562E12, 73.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66195614E12, 489.75], [1.66195608E12, 284.33333333333337], [1.6619562E12, 187.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66195614E12, 201.0], [1.66195626E12, 84.0], [1.6619562E12, 72.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66195614E12, 96.5], [1.66195626E12, 72.0], [1.6619562E12, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.66195602E12, 295.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66195614E12, 128.81818181818187], [1.66195608E12, 129.3684210526316], [1.66195626E12, 113.0], [1.6619562E12, 97.25], [1.66195602E12, 117.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66195614E12, 4391.0], [1.66195608E12, 15992.833333333334], [1.66195602E12, 9102.2]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66195614E12, 1508.3333333333335], [1.66195626E12, 1278.0], [1.6619562E12, 947.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.66195602E12, 1556.0000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.66195602E12, 817.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.66195602E12, 931.4166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.66195608E12, 79768.0], [1.66195602E12, 1899.9090909090908]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.66195602E12, 2821.9999999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.66195602E12, 2105.0833333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.66195608E12, 78087.0], [1.66195602E12, 2400.4545454545455]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.66195602E12, 1032.4999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66195614E12, 448.25], [1.66195608E12, 267.0], [1.6619562E12, 282.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.66195602E12, 447.5833333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66195614E12, 4733.333333333333], [1.66195608E12, 13005.625], [1.66195602E12, 6487.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.66195614E12, 141950.0], [1.66195608E12, 84992.0], [1.66195602E12, 35432.5]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66195614E12, 418.125], [1.66195608E12, 306.5], [1.6619562E12, 251.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.66195602E12, 377.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.66195602E12, 1132.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.66195602E12, 3114.8333333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66195614E12, 2264.2], [1.66195608E12, 3837.0], [1.6619562E12, 2279.5]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.66195602E12, 758.5833333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.66195602E12, 215.24999999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.66195602E12, 913.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.66195602E12, 460.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.66195602E12, 298.08333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.66195602E12, 204.66666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.66195602E12, 180.08333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66195614E12, 1439.142857142857], [1.66195608E12, 987.0], [1.6619562E12, 744.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.66195602E12, 1960.7499999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66195614E12, 162.25], [1.66195608E12, 189.33333333333334], [1.6619562E12, 130.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.66195602E12, 2182.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66195614E12, 131.75], [1.66195608E12, 256.6666666666667], [1.6619562E12, 163.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66195614E12, 164.25], [1.66195608E12, 249.66666666666666], [1.6619562E12, 188.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66195614E12, 609.0], [1.66195608E12, 771.0], [1.6619562E12, 1622.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66195614E12, 2762.3333333333335], [1.66195608E12, 3272.25], [1.66195602E12, 2014.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66195614E12, 198.25], [1.66195608E12, 200.83333333333331], [1.6619562E12, 135.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66195614E12, 50.0], [1.66195608E12, 81.33333333333333], [1.66195602E12, 205.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66195614E12, 481.75], [1.66195608E12, 339.6666666666667], [1.6619562E12, 159.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66195614E12, 188.0], [1.66195608E12, 378.3333333333333], [1.66195602E12, 506.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66195614E12, 339.25], [1.66195608E12, 253.0], [1.6619562E12, 125.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66195614E12, 176.0], [1.66195608E12, 364.44444444444446], [1.66195602E12, 252.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66195614E12, 190.0], [1.66195608E12, 273.6666666666667], [1.6619562E12, 86.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66195614E12, 2020.0], [1.66195608E12, 2384.666666666667], [1.6619562E12, 2336.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66195614E12, 219.75], [1.66195608E12, 382.5], [1.6619562E12, 194.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66195614E12, 193.0], [1.66195608E12, 328.3333333333333], [1.6619562E12, 153.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66195614E12, 71.0], [1.66195608E12, 204.22222222222223], [1.66195602E12, 67.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66195614E12, 192.0], [1.66195608E12, 272.5], [1.6619562E12, 129.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66195614E12, 168.5], [1.66195608E12, 257.66666666666663], [1.6619562E12, 131.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66195614E12, 243.25], [1.66195608E12, 259.5], [1.6619562E12, 446.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.66195602E12, 842.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66195614E12, 526.0], [1.66195608E12, 7798.777777777777], [1.66195602E12, 2904.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.66195602E12, 373.49999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.66195602E12, 20559.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66195614E12, 255.5], [1.66195608E12, 251.66666666666666], [1.6619562E12, 294.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66195614E12, 73.25], [1.66195608E12, 76.16666666666666], [1.6619562E12, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66195614E12, 57.75], [1.66195608E12, 124.0], [1.6619562E12, 110.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66195614E12, 69.0], [1.66195608E12, 81.77777777777777], [1.66195602E12, 68.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66195614E12, 61.0], [1.66195608E12, 116.11111111111111], [1.66195602E12, 74.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66195614E12, 69.0], [1.66195608E12, 121.33333333333333], [1.66195602E12, 214.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66195614E12, 75.0], [1.66195608E12, 155.44444444444446], [1.66195602E12, 87.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66195614E12, 82.0], [1.66195608E12, 93.11111111111111], [1.66195602E12, 72.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66195614E12, 85.0], [1.66195608E12, 95.0], [1.66195602E12, 78.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66195614E12, 235.0], [1.66195608E12, 172.0], [1.66195602E12, 249.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66195614E12, 173.0], [1.66195608E12, 256.8888888888889], [1.66195602E12, 255.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66195614E12, 216.0], [1.66195608E12, 454.4444444444444], [1.66195602E12, 229.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66195614E12, 187.0], [1.66195608E12, 181.88888888888889], [1.66195602E12, 197.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66195614E12, 70.36363636363636], [1.66195608E12, 134.78947368421052], [1.66195626E12, 58.0], [1.6619562E12, 60.25], [1.66195602E12, 80.44444444444444]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66195614E12, 767.2857142857143], [1.66195608E12, 329.3333333333333], [1.6619562E12, 180.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66195614E12, 111.14285714285714], [1.66195608E12, 149.33333333333334], [1.6619562E12, 72.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66195614E12, 129.42857142857144], [1.66195608E12, 168.66666666666666], [1.6619562E12, 81.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66195614E12, 178.57142857142858], [1.66195608E12, 113.33333333333333], [1.6619562E12, 70.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.66195614E12, 142246.0], [1.66195608E12, 85283.66666666667], [1.66195602E12, 35618.25]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.66195602E12, 4077.416666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.66195602E12, 9968.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.66195608E12, 77693.0], [1.66195602E12, 2711.363636363636]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.66195602E12, 1968.9166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.66195602E12, 1385.166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66195602E12, 8639.999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.66195602E12, 2411.0833333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.66195614E12, 140801.0], [1.66195602E12, 7780.09090909091]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.66195602E12, 2173.2499999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.66195602E12, 699.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66195614E12, 5215.25], [1.66195608E12, 5374.714285714286], [1.66195602E12, 6263.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.66195614E12, 332.4583333333333], [1.66195608E12, 394.86956521739137], [1.6619562E12, 377.75], [1.66195602E12, 463.38888888888886]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66195626E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66195602E12, "maxY": 4285.0, "series": [{"data": [[1.66195614E12, 335.0], [1.66195608E12, 370.12500000000006], [1.66195602E12, 312.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66195614E12, 340.6666666666667], [1.66195608E12, 284.625], [1.66195602E12, 329.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66195614E12, 100.42857142857142], [1.66195608E12, 134.0], [1.6619562E12, 153.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66195614E12, 107.42857142857143], [1.66195608E12, 205.33333333333334], [1.6619562E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66195614E12, 131.57142857142858], [1.66195608E12, 129.66666666666666], [1.6619562E12, 72.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66195614E12, 394.0], [1.66195608E12, 375.75], [1.66195602E12, 338.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66195614E12, 270.5], [1.66195608E12, 608.0], [1.6619562E12, 327.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66195614E12, 296.66666666666674], [1.66195608E12, 176.0], [1.6619562E12, 256.5]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66195614E12, 210.0], [1.66195608E12, 379.8888888888889], [1.66195602E12, 103.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66195614E12, 162.5], [1.66195608E12, 226.5], [1.6619562E12, 128.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66195614E12, 343.25], [1.66195608E12, 99.33333333333334], [1.6619562E12, 82.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66195614E12, 73.25], [1.66195608E12, 77.83333333333334], [1.6619562E12, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66195614E12, 124.16666666666667], [1.66195626E12, 276.0], [1.6619562E12, 217.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66195614E12, 136.83333333333334], [1.66195626E12, 138.5], [1.6619562E12, 190.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66195614E12, 215.0], [1.66195626E12, 198.5], [1.6619562E12, 175.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66195614E12, 73.33333333333333], [1.66195626E12, 84.0], [1.6619562E12, 128.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66195614E12, 100.83333333333333], [1.66195626E12, 84.0], [1.6619562E12, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.66195602E12, 257.75000000000006]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66195614E12, 10.727272727272727], [1.66195608E12, 37.10526315789474], [1.66195626E12, 0.0], [1.6619562E12, 0.0], [1.66195602E12, 101.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66195614E12, 1505.0], [1.66195608E12, 2265.1666666666665], [1.66195602E12, 1576.8]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66195614E12, 215.0], [1.66195626E12, 198.5], [1.6619562E12, 175.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.66195602E12, 526.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.66195602E12, 317.4166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.66195602E12, 382.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.66195608E12, 129.0], [1.66195602E12, 223.6363636363636]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.66195602E12, 303.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.66195602E12, 686.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.66195608E12, 112.0], [1.66195602E12, 187.27272727272722]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.66195602E12, 921.3333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66195614E12, 448.125], [1.66195608E12, 266.5], [1.6619562E12, 281.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.66195602E12, 447.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66195614E12, 190.66666666666666], [1.66195608E12, 576.375], [1.66195602E12, 329.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.66195614E12, 250.0], [1.66195608E12, 1334.0], [1.66195602E12, 952.8750000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66195614E12, 418.0], [1.66195608E12, 306.5], [1.6619562E12, 251.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.66195602E12, 365.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.66195602E12, 446.66666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.66195602E12, 254.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66195614E12, 1247.4], [1.66195608E12, 2475.2], [1.6619562E12, 1552.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.66195602E12, 335.33333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.66195602E12, 215.24999999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.66195602E12, 199.08333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.66195602E12, 428.33333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.66195602E12, 265.5833333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.66195602E12, 190.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.66195602E12, 142.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66195614E12, 324.2857142857143], [1.66195608E12, 133.0], [1.6619562E12, 112.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.66195602E12, 1960.7499999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.66195602E12, 1340.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66195614E12, 213.75], [1.66195608E12, 370.83333333333337], [1.6619562E12, 504.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66195614E12, 74.0], [1.66195608E12, 85.5], [1.66195602E12, 82.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66195614E12, 351.0], [1.66195608E12, 276.3333333333333], [1.6619562E12, 156.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66195614E12, 213.75], [1.66195608E12, 370.83333333333337], [1.6619562E12, 504.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66195614E12, 243.25], [1.66195608E12, 259.5], [1.6619562E12, 446.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.66195602E12, 332.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66195614E12, 264.0], [1.66195608E12, 516.7777777777777], [1.66195602E12, 298.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.66195602E12, 361.9166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.66195602E12, 316.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66195614E12, 255.5], [1.66195608E12, 251.5], [1.6619562E12, 294.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66195614E12, 69.0], [1.66195608E12, 113.77777777777777], [1.66195602E12, 189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66195614E12, 75.0], [1.66195608E12, 120.1111111111111], [1.66195602E12, 87.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66195614E12, 210.0], [1.66195608E12, 178.0], [1.66195602E12, 110.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66195614E12, 187.0], [1.66195608E12, 127.55555555555556], [1.66195602E12, 163.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66195614E12, 70.36363636363636], [1.66195608E12, 134.78947368421052], [1.66195626E12, 58.0], [1.6619562E12, 60.25], [1.66195602E12, 80.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66195614E12, 324.2857142857143], [1.66195608E12, 133.0], [1.6619562E12, 112.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.66195614E12, 546.0], [1.66195608E12, 1625.3333333333333], [1.66195602E12, 1137.875]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.66195602E12, 989.5833333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.66195602E12, 585.4166666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.66195608E12, 303.0], [1.66195602E12, 553.8181818181818]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.66195602E12, 1716.4166666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.66195602E12, 1379.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66195602E12, 992.9166666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.66195602E12, 1246.9166666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.66195614E12, 2401.0], [1.66195602E12, 866.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.66195602E12, 1045.5833333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.66195602E12, 699.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66195614E12, 2934.75], [1.66195608E12, 3442.571428571429], [1.66195602E12, 4285.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.66195614E12, 332.3333333333333], [1.66195608E12, 379.5217391304347], [1.6619562E12, 377.75], [1.66195602E12, 372.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66195626E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66195602E12, "maxY": 1758.0000000000002, "series": [{"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66195614E12, 81.0], [1.66195608E12, 142.0], [1.6619562E12, 102.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66195614E12, 52.857142857142854], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66195614E12, 94.42857142857143], [1.66195608E12, 97.66666666666667], [1.6619562E12, 106.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66195614E12, 32.57142857142857], [1.66195608E12, 36.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66195614E12, 206.85714285714286], [1.66195608E12, 179.66666666666666], [1.6619562E12, 54.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66195614E12, 48.42857142857143], [1.66195608E12, 53.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66195614E12, 93.85714285714286], [1.66195608E12, 115.33333333333334], [1.6619562E12, 109.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66195614E12, 61.85714285714285], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66195614E12, 34.00000000000001], [1.66195608E12, 129.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66195614E12, 47.285714285714285], [1.66195608E12, 127.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66195614E12, 185.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66195614E12, 56.57142857142857], [1.66195608E12, 40.0], [1.6619562E12, 61.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66195614E12, 32.57142857142856], [1.66195608E12, 35.666666666666664], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66195614E12, 15.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66195614E12, 108.66666666666667], [1.66195626E12, 128.0], [1.6619562E12, 140.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 34.666666666666664], [1.6619562E12, 62.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 53.5], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66195614E12, 15.857142857142858], [1.66195608E12, 0.0], [1.6619562E12, 53.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66195614E12, 145.83333333333331], [1.66195626E12, 108.5], [1.6619562E12, 52.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66195614E12, 31.0], [1.66195608E12, 0.0], [1.6619562E12, 60.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66195614E12, 110.0], [1.66195608E12, 295.44444444444446], [1.66195602E12, 65.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66195614E12, 18.0], [1.66195626E12, 55.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66195614E12, 115.0], [1.66195608E12, 49.0], [1.66195602E12, 100.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66195614E12, 105.0], [1.66195608E12, 139.22222222222223], [1.66195602E12, 89.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 55.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 300.3333333333333], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66195614E12, 108.0], [1.66195608E12, 124.33333333333333], [1.66195602E12, 98.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66195614E12, 38.0], [1.66195608E12, 0.0], [1.6619562E12, 63.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 127.66666666666667], [1.66195602E12, 129.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 166.8888888888889], [1.66195602E12, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66195614E12, 103.0], [1.66195608E12, 161.33333333333334], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66195614E12, 78.66666666666667], [1.66195626E12, 294.0], [1.6619562E12, 103.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66195614E12, 121.0], [1.66195608E12, 255.11111111111111], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66195614E12, 58.75000000000001], [1.66195608E12, 57.166666666666664], [1.6619562E12, 52.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66195614E12, 111.5], [1.66195626E12, 108.5], [1.6619562E12, 54.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66195614E12, 82.75], [1.66195608E12, 77.33333333333334], [1.6619562E12, 108.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66195614E12, 270.6666666666667], [1.66195626E12, 114.0], [1.6619562E12, 80.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66195614E12, 255.25], [1.66195608E12, 21.833333333333332], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66195614E12, 18.833333333333336], [1.66195626E12, 141.0], [1.6619562E12, 116.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66195614E12, 20.166666666666664], [1.66195626E12, 154.0], [1.6619562E12, 121.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66195614E12, 148.25], [1.66195608E12, 18.833333333333336], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66195614E12, 58.66666666666667], [1.66195626E12, 140.0], [1.6619562E12, 106.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 21.833333333333332], [1.6619562E12, 53.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66195614E12, 40.5], [1.66195626E12, 146.0], [1.6619562E12, 87.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66195614E12, 58.0], [1.66195608E12, 19.333333333333332], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 142.0], [1.6619562E12, 84.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66195614E12, 29.25], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66195614E12, 40.833333333333336], [1.66195626E12, 84.5], [1.6619562E12, 58.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66195614E12, 54.83333333333333], [1.66195626E12, 62.0], [1.6619562E12, 109.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66195614E12, 18.166666666666668], [1.66195626E12, 63.0], [1.6619562E12, 58.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 54.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66195614E12, 100.16666666666666], [1.66195626E12, 170.0], [1.6619562E12, 79.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66195614E12, 288.5], [1.66195626E12, 168.0], [1.6619562E12, 55.75000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66195614E12, 403.75], [1.66195608E12, 195.0], [1.6619562E12, 110.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66195614E12, 19.166666666666668], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66195614E12, 19.166666666666668], [1.66195626E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66195614E12, 4.954545454545456], [1.66195608E12, 19.73684210526316], [1.66195626E12, 0.0], [1.6619562E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66195614E12, 124.0], [1.66195608E12, 47.5], [1.66195602E12, 0.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66195614E12, 18.166666666666668], [1.66195626E12, 63.0], [1.6619562E12, 58.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.66195602E12, 336.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.66195602E12, 128.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.66195602E12, 68.91666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.66195602E12, 443.24999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.66195602E12, 65.91666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.66195602E12, 210.66666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66195614E12, 41.333333333333336], [1.66195608E12, 18.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.66195614E12, 138.0], [1.66195608E12, 985.0], [1.66195602E12, 488.12499999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 226.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.66195602E12, 32.166666666666664]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.66195602E12, 35.333333333333336]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.66195602E12, 66.99999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66195614E12, 161.42857142857144], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.66195602E12, 1758.0000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66195614E12, 85.75], [1.66195608E12, 65.0], [1.6619562E12, 56.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.66195602E12, 1149.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66195614E12, 55.25], [1.66195608E12, 60.666666666666664], [1.6619562E12, 66.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66195614E12, 91.0], [1.66195608E12, 121.83333333333334], [1.6619562E12, 110.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66195614E12, 118.5], [1.66195608E12, 47.16666666666667], [1.6619562E12, 53.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66195614E12, 110.75], [1.66195608E12, 108.66666666666666], [1.6619562E12, 50.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 13.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66195614E12, 62.50000000000001], [1.66195608E12, 95.83333333333334], [1.6619562E12, 64.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66195614E12, 113.0], [1.66195608E12, 257.55555555555554], [1.66195602E12, 129.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66195614E12, 54.75], [1.66195608E12, 88.5], [1.6619562E12, 57.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66195614E12, 104.0], [1.66195608E12, 253.66666666666666], [1.66195602E12, 148.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66195614E12, 113.25], [1.66195608E12, 63.833333333333336], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66195614E12, 118.5], [1.66195608E12, 47.16666666666667], [1.6619562E12, 53.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66195614E12, 134.0], [1.66195608E12, 260.3333333333333], [1.6619562E12, 111.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66195614E12, 114.0], [1.66195608E12, 233.16666666666666], [1.6619562E12, 61.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 31.444444444444443], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66195614E12, 108.0], [1.66195608E12, 179.33333333333331], [1.6619562E12, 52.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66195614E12, 84.0], [1.66195608E12, 64.66666666666667], [1.6619562E12, 53.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66195614E12, 124.0], [1.66195608E12, 16.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.66195602E12, 40.833333333333336]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 21.666666666666668], [1.6619562E12, 55.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 29.11111111111111], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 31.555555555555557], [1.66195602E12, 75.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 15.444444444444445], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 16.11111111111111], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 12.333333333333334], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66195614E12, 106.0], [1.66195608E12, 90.22222222222223], [1.66195602E12, 143.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66195614E12, 107.0], [1.66195608E12, 123.77777777777777], [1.66195602E12, 140.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66195614E12, 117.0], [1.66195608E12, 83.66666666666666], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66195614E12, 108.0], [1.66195608E12, 40.666666666666664], [1.66195602E12, 76.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 0.0], [1.66195626E12, 0.0], [1.6619562E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66195614E12, 161.42857142857144], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66195614E12, 32.57142857142857], [1.66195608E12, 36.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66195614E12, 51.0], [1.66195608E12, 38.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66195614E12, 62.0], [1.66195608E12, 0.0], [1.6619562E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.66195614E12, 247.0], [1.66195608E12, 1110.0], [1.66195602E12, 488.12499999999994]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.66195602E12, 583.1666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.66195602E12, 305.41666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.66195608E12, 194.0], [1.66195602E12, 256.3636363636364]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.66195602E12, 772.9166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.66195602E12, 792.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66195602E12, 811.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.66195602E12, 986.5833333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.66195614E12, 0.0], [1.66195602E12, 624.9090909090909]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.66195602E12, 672.5833333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.66195602E12, 392.08333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66195614E12, 26.5], [1.66195608E12, 92.57142857142857], [1.66195602E12, 110.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.66195614E12, 0.0], [1.66195608E12, 3.0652173913043463], [1.6619562E12, 0.0], [1.66195602E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66195626E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 50.0, "minX": 1.66195602E12, "maxY": 141950.0, "series": [{"data": [[1.66195614E12, 141950.0], [1.66195608E12, 88478.0], [1.66195626E12, 1531.0], [1.6619562E12, 3472.0], [1.66195602E12, 47814.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66195614E12, 470.80000000000024], [1.66195608E12, 851.8000000000004], [1.66195626E12, 458.5], [1.6619562E12, 281.70000000000016], [1.66195602E12, 5850.700000000003]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66195614E12, 3732.5599999999895], [1.66195608E12, 77736.34000000001], [1.66195626E12, 1531.0], [1.6619562E12, 2328.279999999979], [1.66195602E12, 33061.48]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66195614E12, 1172.7999999999975], [1.66195608E12, 2028.6499999999962], [1.66195626E12, 794.0], [1.6619562E12, 550.5999999999992], [1.66195602E12, 14011.99999999999]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66195614E12, 50.0], [1.66195608E12, 52.0], [1.66195626E12, 53.0], [1.6619562E12, 54.0], [1.66195602E12, 56.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66195614E12, 175.0], [1.66195608E12, 213.5], [1.66195626E12, 184.0], [1.6619562E12, 127.5], [1.66195602E12, 632.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66195626E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 2.0, "minX": 1.0, "maxY": 1681.0, "series": [{"data": [[2.0, 639.0], [33.0, 182.0], [34.0, 86.0], [35.0, 114.0], [37.0, 173.0], [41.0, 85.0], [3.0, 310.5], [48.0, 194.0], [50.0, 108.0], [52.0, 184.0], [55.0, 118.0], [54.0, 207.0], [61.0, 108.0], [62.0, 199.0], [4.0, 264.5], [5.0, 266.5], [6.0, 287.0], [7.0, 420.0], [8.0, 279.0], [9.0, 330.0], [10.0, 1290.0], [11.0, 475.0], [12.0, 758.5], [13.0, 233.0], [14.0, 1681.0], [15.0, 551.5], [16.0, 717.5], [1.0, 703.5], [18.0, 592.5], [19.0, 402.0], [20.0, 254.5], [21.0, 183.0], [22.0, 139.0], [23.0, 179.0], [24.0, 191.5], [25.0, 88.0], [26.0, 179.5], [27.0, 1004.0], [28.0, 178.0], [29.0, 176.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 299.0], [5.0, 123.5], [3.0, 423.0], [6.0, 352.0], [14.0, 140.0], [7.0, 253.0], [28.0, 2.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 62.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 391.0, "series": [{"data": [[2.0, 290.0], [33.0, 0.0], [34.0, 0.0], [35.0, 0.0], [37.0, 0.0], [41.0, 0.0], [3.0, 262.0], [48.0, 0.0], [50.0, 0.0], [52.0, 0.0], [55.0, 0.0], [54.0, 0.0], [61.0, 0.0], [62.0, 0.0], [4.0, 254.5], [5.0, 116.5], [6.0, 119.0], [7.0, 136.0], [8.0, 254.5], [9.0, 248.0], [10.0, 364.5], [11.0, 149.0], [12.0, 307.0], [13.0, 128.0], [14.0, 359.0], [15.0, 122.5], [16.0, 238.0], [1.0, 391.0], [18.0, 253.0], [19.0, 156.0], [20.0, 0.0], [21.0, 0.0], [22.0, 0.0], [23.0, 0.0], [24.0, 0.0], [25.0, 0.0], [26.0, 0.0], [27.0, 295.0], [28.0, 0.0], [29.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 0.0], [5.0, 0.0], [3.0, 0.0], [6.0, 0.0], [14.0, 0.0], [7.0, 0.0], [28.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 62.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.9, "minX": 1.66195602E12, "maxY": 9.783333333333333, "series": [{"data": [[1.66195614E12, 9.166666666666666], [1.66195608E12, 9.783333333333333], [1.66195626E12, 0.9], [1.6619562E12, 3.8333333333333335], [1.66195602E12, 8.716666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66195626E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.66195602E12, "maxY": 7.816666666666666, "series": [{"data": [[1.66195614E12, 3.216666666666667], [1.66195608E12, 3.9833333333333334], [1.66195626E12, 0.23333333333333334], [1.6619562E12, 1.2], [1.66195602E12, 7.816666666666666]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66195614E12, 6.033333333333333], [1.66195608E12, 5.816666666666666], [1.66195626E12, 0.6666666666666666], [1.6619562E12, 2.6666666666666665], [1.66195602E12, 0.6166666666666667]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.66195608E12, 0.03333333333333333], [1.66195602E12, 0.11666666666666667]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.NoHttpResponseException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66195626E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66195602E12, "maxY": 0.7333333333333333, "series": [{"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-11-success", "isController": false}, {"data": [[1.66195614E12, 0.15], [1.66195608E12, 0.016666666666666666], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "Clearance-success", "isController": true}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-28-success", "isController": false}, {"data": [[1.66195614E12, 0.36666666666666664], [1.66195608E12, 0.31666666666666665], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.13333333333333333], [1.66195602E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195602E12, 0.18333333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/-7-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-30-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17-success", "isController": false}, {"data": [[1.66195614E12, 0.05], [1.66195608E12, 0.13333333333333333], [1.66195602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-15-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21-success", "isController": false}, {"data": [[1.66195614E12, 0.05], [1.66195608E12, 0.13333333333333333], [1.66195602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10-success", "isController": false}, {"data": [[1.66195614E12, 0.05], [1.66195608E12, 0.13333333333333333], [1.66195602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-0-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-21-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-18-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-25-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-12-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.05], [1.66195602E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-8-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-27-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-16-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-4-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-33-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22-success", "isController": false}, {"data": [[1.66195614E12, 0.05], [1.66195608E12, 0.13333333333333333], [1.66195602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20-success", "isController": false}, {"data": [[1.66195614E12, 0.08333333333333333], [1.66195608E12, 0.08333333333333333], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "Combo-success", "isController": true}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-1-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-19-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-20-success", "isController": false}, {"data": [[1.66195614E12, 0.4], [1.66195608E12, 0.7333333333333333], [1.6619562E12, 0.13333333333333333], [1.66195602E12, 0.18333333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-24-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5-success", "isController": false}, {"data": [[1.66195614E12, 0.13333333333333333], [1.66195608E12, 0.03333333333333333], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696-success", "isController": false}, {"data": [[1.66195608E12, 0.03333333333333333], [1.66195602E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-failure", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-13-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-9-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-26-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1]], "isOverall": false, "label": "HotOffers-success", "isController": true}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1-success", "isController": false}, {"data": [[1.66195608E12, 0.016666666666666666], [1.66195602E12, 0.18333333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/-17-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9-success", "isController": false}, {"data": [[1.66195614E12, 0.05], [1.66195608E12, 0.13333333333333333], [1.66195602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.05], [1.66195602E12, 0.13333333333333333]], "isOverall": false, "label": "Home-success", "isController": true}, {"data": [[1.66195608E12, 0.06666666666666667], [1.66195602E12, 0.05]], "isOverall": false, "label": "Makeupshop-failure", "isController": true}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-5-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-32-success", "isController": false}, {"data": [[1.66195608E12, 0.016666666666666666], [1.66195602E12, 0.18333333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/-2-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12-success", "isController": false}, {"data": [[1.66195614E12, 0.36666666666666664], [1.66195608E12, 0.31666666666666665], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.13333333333333333], [1.66195602E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-23-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16-success", "isController": false}, {"data": [[1.66195608E12, 0.016666666666666666], [1.66195602E12, 0.016666666666666666]], "isOverall": false, "label": "HotOffers-failure", "isController": true}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4-success", "isController": false}, {"data": [[1.66195614E12, 0.13333333333333333], [1.66195608E12, 0.03333333333333333], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-31-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-6-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7-success", "isController": false}, {"data": [[1.66195608E12, 0.016666666666666666], [1.66195602E12, 0.18333333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/-14-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-29-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23-success", "isController": false}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23-success", "isController": false}, {"data": [[1.66195614E12, 0.06666666666666667], [1.66195608E12, 0.1], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-34-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.03333333333333333], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "Makeupshop-success", "isController": true}, {"data": [[1.66195614E12, 0.1], [1.66195626E12, 0.03333333333333333], [1.6619562E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7-success", "isController": false}, {"data": [[1.66195614E12, 0.11666666666666667], [1.66195608E12, 0.05], [1.6619562E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-22-success", "isController": false}, {"data": [[1.66195602E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-10-success", "isController": false}, {"data": [[1.66195614E12, 0.016666666666666666], [1.66195608E12, 0.15], [1.66195602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66195626E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.11666666666666667, "minX": 1.66195602E12, "maxY": 10.083333333333334, "series": [{"data": [[1.66195614E12, 9.583333333333334], [1.66195608E12, 10.083333333333334], [1.66195626E12, 0.9], [1.6619562E12, 3.933333333333333], [1.66195602E12, 8.6]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.66195608E12, 0.11666666666666667], [1.66195602E12, 0.18333333333333332]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66195626E12, "title": "Total Transactions Per Second"}},
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
