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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 50.0, "series": [{"data": [[300.0, 1.0], [1200.0, 1.0], [200.0, 5.0], [400.0, 2.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1200.0, 1.0], [300.0, 3.0], [200.0, 8.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[0.0, 1.0], [300.0, 5.0], [1300.0, 1.0], [200.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[0.0, 7.0], [300.0, 1.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[0.0, 3.0], [300.0, 3.0], [200.0, 4.0], [400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[0.0, 6.0], [300.0, 1.0], [100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[0.0, 1.0], [100.0, 10.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [100.0, 3.0], [200.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [600.0, 1.0], [200.0, 3.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [200.0, 3.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[0.0, 6.0], [600.0, 1.0], [100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[0.0, 10.0], [1500.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[0.0, 6.0], [100.0, 1.0], [200.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[0.0, 11.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[0.0, 5.0], [700.0, 1.0], [100.0, 6.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[0.0, 6.0], [300.0, 2.0], [100.0, 2.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[0.0, 6.0], [300.0, 1.0], [100.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [200.0, 8.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[0.0, 5.0], [200.0, 3.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[0.0, 10.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[0.0, 8.0], [300.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[0.0, 6.0], [200.0, 2.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[0.0, 1.0], [200.0, 6.0], [100.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[0.0, 8.0], [100.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [200.0, 9.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[300.0, 4.0], [200.0, 8.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [200.0, 5.0], [400.0, 2.0], [900.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[0.0, 7.0], [200.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[0.0, 9.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[300.0, 2.0], [1200.0, 1.0], [200.0, 5.0], [100.0, 2.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[300.0, 2.0], [1500.0, 1.0], [200.0, 5.0], [100.0, 2.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[0.0, 3.0], [100.0, 6.0], [400.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [1500.0, 1.0], [200.0, 3.0], [100.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[0.0, 3.0], [100.0, 4.0], [400.0, 2.0], [200.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 3.0], [4700.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [2600.0, 1.0], [1600.0, 1.0], [900.0, 1.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[0.0, 2.0], [300.0, 4.0], [100.0, 2.0], [200.0, 3.0], [800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[300.0, 2.0], [200.0, 5.0], [100.0, 2.0], [400.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [1200.0, 1.0], [100.0, 2.0], [200.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [100.0, 2.0], [200.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[300.0, 3.0], [700.0, 1.0], [100.0, 4.0], [200.0, 3.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[600.0, 1.0], [300.0, 2.0], [1500.0, 1.0], [200.0, 4.0], [400.0, 1.0], [100.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[0.0, 1.0], [100.0, 3.0], [200.0, 7.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[300.0, 2.0], [100.0, 4.0], [200.0, 5.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [800.0, 1.0], [200.0, 7.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[0.0, 7.0], [100.0, 4.0], [800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[0.0, 6.0], [200.0, 4.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[0.0, 6.0], [100.0, 6.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [400.0, 1.0], [200.0, 4.0], [100.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[0.0, 7.0], [100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[0.0, 3.0], [2900.0, 1.0], [100.0, 5.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[0.0, 4.0], [2900.0, 1.0], [200.0, 3.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[0.0, 5.0], [2900.0, 1.0], [200.0, 2.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[0.0, 4.0], [700.0, 1.0], [100.0, 2.0], [200.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[0.0, 1.0], [2300.0, 1.0], [600.0, 1.0], [200.0, 6.0], [400.0, 1.0], [100.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [700.0, 1.0], [200.0, 3.0], [100.0, 1.0], [800.0, 1.0], [1700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[0.0, 4.0], [100.0, 4.0], [200.0, 3.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [200.0, 3.0], [100.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[200.0, 7.0], [100.0, 3.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[0.0, 9.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[0.0, 7.0], [200.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [100.0, 3.0], [200.0, 5.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[0.0, 5.0], [200.0, 2.0], [100.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[0.0, 9.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[600.0, 2.0], [1400.0, 1.0], [100.0, 4.0], [400.0, 2.0], [200.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[0.0, 15.0], [300.0, 1.0], [200.0, 4.0], [100.0, 39.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[8400.0, 2.0], [8600.0, 1.0], [16500.0, 1.0], [8900.0, 1.0], [9100.0, 1.0], [4500.0, 1.0], [21900.0, 1.0], [5700.0, 1.0], [6300.0, 1.0], [6400.0, 1.0], [59600.0, 1.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[4500.0, 1.0], [1100.0, 1.0], [2400.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [1700.0, 1.0], [900.0, 3.0], [1800.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 2.0], [5300.0, 1.0], [100.0, 2.0], [200.0, 3.0], [400.0, 1.0], [1600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[300.0, 1.0], [600.0, 2.0], [200.0, 3.0], [100.0, 3.0], [1600.0, 1.0], [3400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[600.0, 2.0], [1400.0, 1.0], [700.0, 1.0], [3000.0, 2.0], [100.0, 3.0], [200.0, 1.0], [1700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[2300.0, 1.0], [1100.0, 1.0], [300.0, 1.0], [1200.0, 1.0], [20400.0, 1.0], [1300.0, 1.0], [11100.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [1600.0, 2.0], [58100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[2100.0, 1.0], [600.0, 1.0], [1300.0, 1.0], [2800.0, 1.0], [1400.0, 1.0], [5900.0, 1.0], [400.0, 1.0], [3400.0, 1.0], [3600.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[85700.0, 1.0], [11200.0, 1.0], [1500.0, 1.0], [800.0, 1.0], [1600.0, 1.0], [6400.0, 1.0], [3500.0, 1.0], [7100.0, 1.0], [900.0, 1.0], [1800.0, 1.0], [1900.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [1200.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [1500.0, 4.0], [1700.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[300.0, 1.0], [3000.0, 1.0], [100.0, 7.0], [200.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[300.0, 3.0], [200.0, 9.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[2500.0, 1.0], [1300.0, 2.0], [100.0, 8.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[4100.0, 1.0], [20000.0, 1.0], [4900.0, 1.0], [5200.0, 1.0], [5900.0, 1.0], [6600.0, 1.0], [3200.0, 1.0], [6700.0, 1.0], [7400.0, 1.0], [14600.0, 1.0], [57700.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[34700.0, 1.0], [33200.0, 1.0], [37000.0, 1.0], [37400.0, 1.0], [75000.0, 1.0], [42800.0, 1.0], [92000.0, 1.0], [49100.0, 1.0], [50300.0, 1.0], [52100.0, 1.0], [27800.0, 1.0], [32300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[300.0, 2.0], [200.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[2500.0, 1.0], [100.0, 6.0], [200.0, 2.0], [900.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[600.0, 2.0], [300.0, 3.0], [5200.0, 1.0], [700.0, 1.0], [400.0, 2.0], [1800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[600.0, 1.0], [300.0, 2.0], [2600.0, 1.0], [5900.0, 1.0], [200.0, 3.0], [400.0, 2.0], [1800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[2100.0, 3.0], [2200.0, 1.0], [2400.0, 2.0], [2500.0, 2.0], [2700.0, 1.0], [2800.0, 1.0], [1900.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[4400.0, 1.0], [600.0, 1.0], [700.0, 1.0], [200.0, 5.0], [400.0, 3.0], [1700.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[9000.0, 1.0], [100.0, 5.0], [400.0, 3.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1100.0, 1.0], [1400.0, 1.0], [700.0, 3.0], [400.0, 1.0], [800.0, 1.0], [1000.0, 2.0], [500.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1200.0, 1.0], [100.0, 4.0], [200.0, 2.0], [500.0, 4.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1200.0, 1.0], [100.0, 4.0], [400.0, 1.0], [200.0, 1.0], [800.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[600.0, 1.0], [100.0, 6.0], [400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[700.0, 1.0], [100.0, 5.0], [400.0, 1.0], [800.0, 1.0], [900.0, 1.0], [3600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1100.0, 2.0], [600.0, 1.0], [2600.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [800.0, 2.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[300.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [2600.0, 1.0], [5500.0, 2.0], [1500.0, 1.0], [6100.0, 1.0], [11900.0, 1.0], [1600.0, 1.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [100.0, 7.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[4200.0, 1.0], [1400.0, 2.0], [2900.0, 1.0], [1500.0, 1.0], [3100.0, 1.0], [1600.0, 1.0], [6500.0, 1.0], [1700.0, 1.0], [1900.0, 1.0], [2000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[0.0, 2.0], [300.0, 2.0], [700.0, 1.0], [200.0, 5.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[0.0, 3.0], [300.0, 2.0], [100.0, 3.0], [200.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[600.0, 2.0], [300.0, 2.0], [2600.0, 1.0], [1300.0, 1.0], [700.0, 3.0], [400.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[4500.0, 1.0], [2200.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [2700.0, 1.0], [11100.0, 1.0], [2900.0, 1.0], [3300.0, 1.0], [3500.0, 1.0], [14700.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[300.0, 3.0], [400.0, 1.0], [200.0, 7.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[0.0, 9.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[300.0, 3.0], [200.0, 6.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[0.0, 1.0], [600.0, 1.0], [300.0, 1.0], [700.0, 3.0], [1400.0, 1.0], [400.0, 2.0], [200.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[0.0, 3.0], [300.0, 2.0], [1500.0, 1.0], [200.0, 4.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [200.0, 6.0], [100.0, 1.0], [1700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[2200.0, 1.0], [300.0, 3.0], [200.0, 4.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1300.0, 1.0], [2700.0, 1.0], [1400.0, 1.0], [2900.0, 1.0], [1500.0, 1.0], [1600.0, 2.0], [3300.0, 1.0], [1800.0, 1.0], [2000.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[300.0, 2.0], [200.0, 7.0], [100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[300.0, 1.0], [100.0, 3.0], [200.0, 6.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[0.0, 6.0], [100.0, 5.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[300.0, 3.0], [200.0, 6.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[300.0, 4.0], [200.0, 7.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0], [200.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [600.0, 1.0], [20600.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [2700.0, 1.0], [2800.0, 1.0], [3000.0, 1.0], [400.0, 1.0], [800.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[4300.0, 1.0], [4500.0, 1.0], [4800.0, 1.0], [1200.0, 2.0], [300.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [54200.0, 1.0], [1000.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[0.0, 2.0], [1500.0, 1.0], [100.0, 4.0], [400.0, 1.0], [200.0, 2.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[16600.0, 1.0], [17300.0, 1.0], [35200.0, 1.0], [38500.0, 1.0], [20200.0, 1.0], [20300.0, 1.0], [39200.0, 1.0], [20000.0, 1.0], [21000.0, 1.0], [13600.0, 1.0], [14200.0, 1.0], [28700.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[300.0, 3.0], [200.0, 9.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[0.0, 7.0], [100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[0.0, 9.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[0.0, 7.0], [100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[0.0, 4.0], [100.0, 6.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[0.0, 3.0], [300.0, 2.0], [200.0, 2.0], [100.0, 3.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[0.0, 1.0], [700.0, 2.0], [200.0, 1.0], [400.0, 1.0], [100.0, 5.0], [800.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[0.0, 4.0], [100.0, 5.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[0.0, 3.0], [200.0, 3.0], [100.0, 6.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[0.0, 1.0], [300.0, 3.0], [1200.0, 1.0], [100.0, 1.0], [200.0, 2.0], [500.0, 3.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[0.0, 3.0], [300.0, 2.0], [700.0, 2.0], [200.0, 3.0], [100.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[300.0, 1.0], [1200.0, 1.0], [1400.0, 1.0], [200.0, 2.0], [1600.0, 1.0], [800.0, 1.0], [100.0, 4.0], [3300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[0.0, 2.0], [1100.0, 1.0], [300.0, 2.0], [700.0, 1.0], [100.0, 2.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[0.0, 50.0], [200.0, 1.0], [100.0, 8.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [200.0, 6.0], [800.0, 1.0], [100.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[0.0, 9.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[0.0, 7.0], [1200.0, 1.0], [200.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[0.0, 6.0], [200.0, 2.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[33000.0, 1.0], [33400.0, 1.0], [34900.0, 1.0], [37200.0, 1.0], [37700.0, 1.0], [75600.0, 1.0], [42900.0, 1.0], [92400.0, 1.0], [50500.0, 1.0], [49300.0, 1.0], [52500.0, 1.0], [28400.0, 1.0]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[18100.0, 1.0], [2300.0, 1.0], [2200.0, 1.0], [11100.0, 1.0], [2900.0, 1.0], [1500.0, 1.0], [5900.0, 1.0], [900.0, 1.0], [3700.0, 1.0], [1800.0, 1.0], [14800.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[8600.0, 1.0], [10100.0, 1.0], [2600.0, 1.0], [11500.0, 1.0], [24100.0, 1.0], [11900.0, 1.0], [25900.0, 1.0], [3500.0, 1.0], [7400.0, 2.0], [14800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [2400.0, 1.0], [77500.0, 1.0], [2500.0, 1.0], [22800.0, 1.0], [1600.0, 1.0], [27300.0, 1.0], [3500.0, 1.0], [1800.0, 1.0], [3800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[2200.0, 1.0], [2300.0, 1.0], [300.0, 1.0], [19900.0, 1.0], [700.0, 1.0], [2800.0, 1.0], [3100.0, 1.0], [1600.0, 2.0], [3200.0, 1.0], [1800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[2300.0, 1.0], [2400.0, 1.0], [300.0, 2.0], [700.0, 2.0], [1400.0, 1.0], [2700.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[4100.0, 1.0], [1100.0, 1.0], [2200.0, 1.0], [2400.0, 1.0], [39300.0, 1.0], [2600.0, 1.0], [1500.0, 1.0], [24800.0, 1.0], [49700.0, 1.0], [3700.0, 1.0], [31000.0, 1.0], [15400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [2400.0, 1.0], [1300.0, 1.0], [2900.0, 1.0], [1500.0, 1.0], [1800.0, 1.0], [900.0, 1.0], [1900.0, 1.0], [4000.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1200.0, 2.0], [2500.0, 1.0], [40700.0, 1.0], [1300.0, 1.0], [11000.0, 1.0], [5800.0, 1.0], [6000.0, 1.0], [6900.0, 1.0], [1700.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [600.0, 1.0], [2600.0, 1.0], [1400.0, 1.0], [700.0, 1.0], [100.0, 1.0], [400.0, 1.0], [800.0, 1.0], [3900.0, 1.0], [8000.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [700.0, 1.0], [100.0, 7.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[4100.0, 1.0], [4300.0, 1.0], [4200.0, 1.0], [4800.0, 2.0], [5500.0, 1.0], [5700.0, 1.0], [3500.0, 1.0], [3600.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[0.0, 13.0], [600.0, 3.0], [300.0, 21.0], [700.0, 1.0], [400.0, 10.0], [200.0, 44.0], [100.0, 1.0], [800.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 92400.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 28.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1435.0, "series": [{"data": [[0.0, 1435.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 249.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 232.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 28.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 6.654320987654321, "minX": 1.66195494E12, "maxY": 15.0, "series": [{"data": [[1.66195512E12, 6.654320987654321], [1.661955E12, 14.970588235294116], [1.66195506E12, 12.621345029239755], [1.66195494E12, 15.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66195512E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 51.0, "minX": 4.0, "maxY": 59622.0, "series": [{"data": [[14.0, 570.0], [15.0, 469.4545454545455]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[14.916666666666666, 477.83333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300-Aggregated", "isController": false}, {"data": [[14.0, 372.0], [15.0, 362.1818181818182]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[14.916666666666666, 363.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301-Aggregated", "isController": false}, {"data": [[9.0, 179.0], [11.0, 245.0], [12.0, 207.0], [13.0, 289.0], [15.0, 480.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[13.25, 349.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21-Aggregated", "isController": false}, {"data": [[9.0, 66.0], [11.0, 102.0], [12.0, 70.0], [13.0, 84.75], [15.0, 222.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[13.25, 140.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20-Aggregated", "isController": false}, {"data": [[9.0, 157.0], [11.0, 289.0], [12.0, 218.0], [13.0, 201.75], [15.0, 240.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[13.25, 222.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22-Aggregated", "isController": false}, {"data": [[9.0, 95.0], [11.0, 87.0], [12.0, 81.0], [13.0, 207.0], [15.0, 141.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[13.25, 149.99999999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4-Aggregated", "isController": false}, {"data": [[9.0, 67.0], [11.0, 129.0], [12.0, 65.0], [13.0, 108.5], [15.0, 127.6]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[13.25, 111.08333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5-Aggregated", "isController": false}, {"data": [[9.0, 108.0], [11.0, 124.0], [12.0, 101.0], [13.0, 153.25], [15.0, 106.6]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[13.25, 123.24999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6-Aggregated", "isController": false}, {"data": [[9.0, 218.0], [11.0, 70.0], [12.0, 78.0], [13.0, 177.75], [15.0, 197.2]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[13.25, 171.91666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7-Aggregated", "isController": false}, {"data": [[9.0, 76.0], [11.0, 233.0], [12.0, 120.0], [13.0, 240.0], [15.0, 212.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[13.25, 204.41666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8-Aggregated", "isController": false}, {"data": [[9.0, 202.0], [11.0, 69.0], [12.0, 112.0], [13.0, 221.25], [15.0, 167.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[13.25, 175.41666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9-Aggregated", "isController": false}, {"data": [[9.0, 181.0], [11.0, 85.0], [12.0, 289.0], [13.0, 116.5], [15.0, 237.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[13.25, 184.16666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10-Aggregated", "isController": false}, {"data": [[9.0, 92.0], [11.0, 79.0], [12.0, 128.0], [13.0, 80.25], [15.0, 362.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[13.25, 202.66666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12-Aggregated", "isController": false}, {"data": [[9.0, 84.0], [11.0, 248.0], [12.0, 97.0], [13.0, 186.75], [15.0, 134.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[13.25, 153.83333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11-Aggregated", "isController": false}, {"data": [[8.0, 51.0], [4.0, 54.0], [9.0, 54.0], [10.0, 65.0], [11.0, 88.0], [12.0, 66.0], [6.0, 95.5], [13.0, 65.0], [14.0, 56.0], [7.0, 55.0], [15.0, 549.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[9.583333333333334, 107.83333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20-Aggregated", "isController": false}, {"data": [[9.0, 195.0], [11.0, 77.0], [12.0, 131.0], [13.0, 110.0], [15.0, 235.2]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[13.25, 168.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14-Aggregated", "isController": false}, {"data": [[9.0, 78.0], [11.0, 408.0], [12.0, 143.0], [13.0, 112.5], [15.0, 184.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[13.25, 166.58333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13-Aggregated", "isController": false}, {"data": [[9.0, 74.0], [11.0, 81.0], [12.0, 565.0], [13.0, 102.25], [15.0, 170.6]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[13.25, 165.16666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16-Aggregated", "isController": false}, {"data": [[8.0, 201.0], [4.0, 273.0], [9.0, 206.0], [10.0, 76.0], [11.0, 214.0], [12.0, 217.0], [6.0, 321.5], [13.0, 212.0], [14.0, 242.0], [7.0, 194.0], [15.0, 218.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[9.583333333333334, 224.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23-Aggregated", "isController": false}, {"data": [[9.0, 69.0], [11.0, 257.0], [12.0, 120.0], [13.0, 141.5], [15.0, 136.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[13.25, 141.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15-Aggregated", "isController": false}, {"data": [[9.0, 82.0], [11.0, 73.0], [12.0, 63.0], [13.0, 96.25], [15.0, 96.6]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[13.25, 90.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18-Aggregated", "isController": false}, {"data": [[8.0, 72.0], [4.0, 67.0], [9.0, 72.0], [10.0, 73.0], [11.0, 137.0], [12.0, 90.0], [6.0, 101.5], [13.0, 66.0], [14.0, 99.0], [7.0, 71.0], [15.0, 314.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[9.583333333333334, 105.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21-Aggregated", "isController": false}, {"data": [[9.0, 91.0], [11.0, 80.0], [12.0, 76.0], [13.0, 119.0], [15.0, 178.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[13.25, 134.41666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17-Aggregated", "isController": false}, {"data": [[8.0, 176.0], [4.0, 198.0], [9.0, 191.0], [10.0, 207.0], [11.0, 208.0], [12.0, 227.0], [6.0, 207.5], [13.0, 212.0], [14.0, 90.0], [7.0, 172.0], [15.0, 298.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[9.583333333333334, 199.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22-Aggregated", "isController": false}, {"data": [[9.0, 61.0], [11.0, 68.0], [12.0, 56.0], [13.0, 154.0], [15.0, 97.2]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[13.25, 107.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19-Aggregated", "isController": false}, {"data": [[14.0, 296.0], [15.0, 315.27272727272725]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[14.916666666666666, 313.66666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895-Aggregated", "isController": false}, {"data": [[11.0, 254.0], [13.0, 305.2], [14.0, 323.0], [15.0, 273.4]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[13.75, 289.16666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896-Aggregated", "isController": false}, {"data": [[14.0, 298.0], [15.0, 408.72727272727275]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[14.916666666666666, 399.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9-Aggregated", "isController": false}, {"data": [[8.0, 74.0], [4.0, 68.0], [9.0, 68.0], [10.0, 80.0], [11.0, 75.0], [12.0, 91.0], [6.0, 104.5], [13.0, 122.0], [14.0, 82.0], [7.0, 116.0], [15.0, 252.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[9.583333333333334, 103.08333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18-Aggregated", "isController": false}, {"data": [[8.0, 68.0], [4.0, 67.0], [9.0, 67.0], [10.0, 82.0], [11.0, 76.0], [12.0, 90.0], [6.0, 111.0], [13.0, 78.0], [14.0, 80.0], [7.0, 73.0], [15.0, 146.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[9.583333333333334, 87.41666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19-Aggregated", "isController": false}, {"data": [[14.0, 521.0], [15.0, 347.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[14.916666666666666, 361.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3-Aggregated", "isController": false}, {"data": [[14.0, 546.0], [15.0, 382.4545454545455]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[14.916666666666666, 396.08333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4-Aggregated", "isController": false}, {"data": [[11.0, 216.0], [13.0, 127.8], [14.0, 212.0], [15.0, 174.2]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[13.75, 161.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19-Aggregated", "isController": false}, {"data": [[14.0, 521.0], [15.0, 406.0909090909091]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[14.916666666666666, 415.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1-Aggregated", "isController": false}, {"data": [[14.0, 540.0], [15.0, 256.45454545454544]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[14.916666666666666, 280.0833333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2-Aggregated", "isController": false}, {"data": [[8.0, 1128.0], [4.0, 1655.0], [9.0, 932.0], [10.0, 1076.0], [5.0, 1935.0], [11.0, 1169.0], [12.0, 1371.0], [6.0, 2124.0], [13.0, 1246.0], [14.0, 1161.0], [7.0, 2651.0], [15.0, 4760.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[9.5, 1767.3333333333335]], "isOverall": false, "label": "Clearance-Aggregated", "isController": true}, {"data": [[14.0, 390.0], [15.0, 285.8181818181818]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[14.916666666666666, 294.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7-Aggregated", "isController": false}, {"data": [[14.0, 282.0], [15.0, 393.3636363636363]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[14.916666666666666, 384.0833333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8-Aggregated", "isController": false}, {"data": [[14.0, 522.0], [15.0, 272.9090909090909]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[14.916666666666666, 293.66666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5-Aggregated", "isController": false}, {"data": [[8.0, 85.0], [4.0, 187.0], [9.0, 200.0], [10.0, 261.0], [11.0, 73.0], [12.0, 551.0], [6.0, 97.0], [13.0, 286.0], [14.0, 180.0], [7.0, 219.0], [15.0, 343.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[9.583333333333334, 214.9166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9-Aggregated", "isController": false}, {"data": [[14.0, 396.0], [15.0, 422.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[14.916666666666666, 419.8333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6-Aggregated", "isController": false}, {"data": [[11.0, 386.0], [13.0, 290.4], [14.0, 618.0], [15.0, 623.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[13.75, 464.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12-Aggregated", "isController": false}, {"data": [[8.0, 197.0], [4.0, 211.0], [9.0, 85.0], [10.0, 255.0], [11.0, 218.0], [12.0, 297.0], [6.0, 273.5], [13.0, 233.0], [14.0, 192.0], [7.0, 187.0], [15.0, 976.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[9.583333333333334, 283.16666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7-Aggregated", "isController": false}, {"data": [[11.0, 190.0], [13.0, 268.6], [14.0, 470.0], [15.0, 232.8]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[13.75, 263.91666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11-Aggregated", "isController": false}, {"data": [[8.0, 212.0], [4.0, 198.0], [9.0, 184.0], [10.0, 229.0], [11.0, 281.0], [12.0, 281.0], [6.0, 295.5], [13.0, 250.0], [14.0, 218.0], [7.0, 87.0], [15.0, 871.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[9.583333333333334, 283.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8-Aggregated", "isController": false}, {"data": [[11.0, 83.0], [13.0, 96.4], [14.0, 180.0], [15.0, 248.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[13.75, 165.41666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14-Aggregated", "isController": false}, {"data": [[8.0, 64.0], [4.0, 195.0], [9.0, 83.0], [10.0, 96.0], [11.0, 61.0], [12.0, 82.0], [6.0, 274.5], [13.0, 251.0], [14.0, 60.0], [7.0, 244.0], [15.0, 543.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[9.583333333333334, 185.66666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5-Aggregated", "isController": false}, {"data": [[11.0, 72.0], [13.0, 104.6], [14.0, 111.0], [15.0, 98.6]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[13.75, 99.91666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13-Aggregated", "isController": false}, {"data": [[8.0, 104.0], [4.0, 215.0], [9.0, 107.0], [10.0, 112.0], [11.0, 109.0], [12.0, 113.0], [6.0, 307.5], [13.0, 245.0], [14.0, 97.0], [7.0, 224.0], [15.0, 441.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[9.583333333333334, 198.50000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6-Aggregated", "isController": false}, {"data": [[11.0, 76.0], [13.0, 114.6], [14.0, 143.0], [15.0, 97.6]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[13.75, 106.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16-Aggregated", "isController": false}, {"data": [[8.0, 198.0], [4.0, 205.0], [9.0, 73.0], [10.0, 96.0], [11.0, 237.0], [12.0, 74.0], [6.0, 201.5], [13.0, 112.0], [14.0, 100.0], [7.0, 193.0], [15.0, 2945.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[9.583333333333334, 386.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3-Aggregated", "isController": false}, {"data": [[11.0, 299.0], [13.0, 112.6], [14.0, 127.0], [15.0, 98.4]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[13.75, 123.41666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15-Aggregated", "isController": false}, {"data": [[8.0, 198.0], [4.0, 218.0], [9.0, 80.0], [10.0, 96.0], [11.0, 73.0], [12.0, 157.0], [6.0, 183.0], [13.0, 250.0], [14.0, 76.0], [7.0, 186.0], [15.0, 2931.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[9.583333333333334, 385.91666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4-Aggregated", "isController": false}, {"data": [[11.0, 61.0], [13.0, 116.6], [14.0, 221.0], [15.0, 94.8]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[13.75, 111.58333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18-Aggregated", "isController": false}, {"data": [[8.0, 190.0], [4.0, 70.0], [9.0, 126.0], [10.0, 96.0], [11.0, 236.0], [12.0, 181.0], [6.0, 85.5], [13.0, 248.0], [14.0, 79.0], [7.0, 196.0], [15.0, 2932.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[9.583333333333334, 377.0833333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1-Aggregated", "isController": false}, {"data": [[11.0, 80.0], [13.0, 188.0], [14.0, 141.0], [15.0, 95.2]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[13.75, 136.41666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17-Aggregated", "isController": false}, {"data": [[8.0, 88.0], [4.0, 218.0], [9.0, 227.0], [10.0, 96.0], [11.0, 237.0], [12.0, 129.0], [6.0, 258.0], [13.0, 82.0], [14.0, 84.0], [7.0, 100.0], [15.0, 765.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[9.583333333333334, 211.83333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2-Aggregated", "isController": false}, {"data": [[8.0, 198.0], [4.0, 277.0], [9.0, 73.0], [10.0, 232.0], [11.0, 220.0], [12.0, 443.0], [6.0, 791.0], [13.0, 285.0], [14.0, 271.0], [7.0, 203.0], [15.0, 2357.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[9.583333333333334, 511.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12-Aggregated", "isController": false}, {"data": [[8.0, 307.0], [4.0, 662.0], [9.0, 188.0], [10.0, 267.0], [11.0, 344.0], [12.0, 269.0], [6.0, 675.5], [13.0, 285.0], [14.0, 342.0], [7.0, 1741.0], [15.0, 750.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[9.583333333333334, 542.1666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0-Aggregated", "isController": false}, {"data": [[8.0, 229.0], [4.0, 76.0], [9.0, 202.0], [10.0, 67.0], [11.0, 184.0], [12.0, 121.0], [6.0, 188.5], [13.0, 82.0], [14.0, 126.0], [7.0, 69.0], [15.0, 906.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[9.583333333333334, 203.25000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13-Aggregated", "isController": false}, {"data": [[8.0, 72.0], [4.0, 188.0], [9.0, 175.0], [10.0, 250.0], [11.0, 79.0], [12.0, 539.0], [6.0, 209.0], [13.0, 289.0], [14.0, 80.0], [7.0, 177.0], [15.0, 311.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[9.583333333333334, 214.83333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10-Aggregated", "isController": false}, {"data": [[8.0, 176.0], [4.0, 201.0], [9.0, 186.0], [10.0, 236.0], [11.0, 199.0], [12.0, 213.0], [6.0, 428.0], [13.0, 257.0], [14.0, 215.0], [7.0, 223.0], [15.0, 988.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[9.583333333333334, 312.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11-Aggregated", "isController": false}, {"data": [[8.0, 67.0], [4.0, 64.0], [9.0, 89.0], [10.0, 79.0], [11.0, 82.0], [12.0, 90.0], [6.0, 177.5], [13.0, 95.0], [14.0, 108.0], [7.0, 78.0], [15.0, 143.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[9.583333333333334, 104.16666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16-Aggregated", "isController": false}, {"data": [[8.0, 79.0], [4.0, 61.0], [9.0, 78.0], [10.0, 67.0], [11.0, 81.0], [12.0, 275.0], [6.0, 105.5], [13.0, 75.0], [14.0, 110.0], [7.0, 83.0], [15.0, 250.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[9.583333333333334, 114.16666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17-Aggregated", "isController": false}, {"data": [[11.0, 184.0], [13.0, 248.2], [14.0, 422.0], [15.0, 194.2]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[13.75, 234.83333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10-Aggregated", "isController": false}, {"data": [[8.0, 90.0], [4.0, 81.0], [9.0, 80.0], [10.0, 176.0], [11.0, 91.0], [12.0, 115.0], [6.0, 176.5], [13.0, 79.0], [14.0, 184.0], [7.0, 103.0], [15.0, 290.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[9.583333333333334, 136.83333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14-Aggregated", "isController": false}, {"data": [[8.0, 70.0], [4.0, 125.0], [9.0, 67.0], [10.0, 67.0], [11.0, 80.0], [12.0, 223.0], [6.0, 82.0], [13.0, 63.0], [14.0, 88.0], [7.0, 62.0], [15.0, 266.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[9.583333333333334, 106.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15-Aggregated", "isController": false}, {"data": [[15.0, 464.4166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[15.0, 464.4166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-19-Aggregated", "isController": false}, {"data": [[8.0, 123.0], [4.0, 146.0], [9.0, 92.5], [10.0, 114.0], [5.0, 150.0], [11.0, 98.0], [12.0, 108.0], [6.0, 150.0], [13.0, 116.9], [14.0, 138.0], [7.0, 171.0], [15.0, 145.11764705882348]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[13.266666666666667, 134.26666666666668]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json-Aggregated", "isController": false}, {"data": [[14.0, 59622.0], [15.0, 9572.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[14.916666666666666, 13742.833333333332]], "isOverall": false, "label": "Makeupshop-Aggregated", "isController": true}, {"data": [[8.0, 942.0], [4.0, 1447.0], [9.0, 780.0], [10.0, 905.0], [11.0, 1001.0], [12.0, 1170.0], [6.0, 1808.5], [13.0, 1042.0], [14.0, 998.0], [7.0, 2422.0], [15.0, 4534.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[9.583333333333334, 1571.5000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-Aggregated", "isController": false}, {"data": [[15.0, 944.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[15.0, 944.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-11-Aggregated", "isController": false}, {"data": [[15.0, 731.4166666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[15.0, 731.4166666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-12-Aggregated", "isController": false}, {"data": [[15.0, 1046.9999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[15.0, 1046.9999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/-13-Aggregated", "isController": false}, {"data": [[15.0, 8543.166666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[15.0, 8543.166666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-14-Aggregated", "isController": false}, {"data": [[15.0, 2092.083333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[15.0, 2092.083333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-15-Aggregated", "isController": false}, {"data": [[15.0, 10393.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[15.0, 10393.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-16-Aggregated", "isController": false}, {"data": [[15.0, 1632.9166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[15.0, 1632.9166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-17-Aggregated", "isController": false}, {"data": [[15.0, 459.08333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[15.0, 459.08333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-18-Aggregated", "isController": false}, {"data": [[9.0, 228.0], [11.0, 273.0], [13.0, 256.5], [15.0, 293.8]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[13.166666666666666, 272.4166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696-Aggregated", "isController": false}, {"data": [[15.0, 547.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[15.0, 547.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10-Aggregated", "isController": false}, {"data": [[14.0, 57744.0], [15.0, 7891.727272727271]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[14.916666666666666, 12046.083333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-Aggregated", "isController": false}, {"data": [[15.0, 47029.416666666664]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[15.0, 47029.416666666664]], "isOverall": false, "label": "https://www.banglashoppers.com/-Aggregated", "isController": false}, {"data": [[9.0, 278.0], [11.0, 296.0], [12.0, 342.0], [13.0, 260.5], [15.0, 270.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[13.25, 275.66666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695-Aggregated", "isController": false}, {"data": [[15.0, 526.8333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[15.0, 526.8333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-22-Aggregated", "isController": false}, {"data": [[15.0, 1010.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[15.0, 1010.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-23-Aggregated", "isController": false}, {"data": [[15.0, 1204.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[15.0, 1204.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-24-Aggregated", "isController": false}, {"data": [[9.0, 1959.0], [11.0, 2518.5], [13.0, 2355.5], [15.0, 2810.6]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[13.166666666666666, 2539.25]], "isOverall": false, "label": "Combo-Aggregated", "isController": true}, {"data": [[15.0, 846.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[15.0, 846.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-25-Aggregated", "isController": false}, {"data": [[15.0, 1084.2500000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[15.0, 1084.2500000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/-26-Aggregated", "isController": false}, {"data": [[15.0, 942.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[15.0, 942.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-27-Aggregated", "isController": false}, {"data": [[15.0, 456.16666666666674]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[15.0, 456.16666666666674]], "isOverall": false, "label": "https://www.banglashoppers.com/-28-Aggregated", "isController": false}, {"data": [[15.0, 582.8333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[15.0, 582.8333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-29-Aggregated", "isController": false}, {"data": [[15.0, 341.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[15.0, 341.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-20-Aggregated", "isController": false}, {"data": [[15.0, 702.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[15.0, 702.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-21-Aggregated", "isController": false}, {"data": [[9.0, 767.0], [11.0, 1348.0], [12.0, 1071.0], [13.0, 1023.0], [15.0, 1449.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[13.25, 1210.4166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-Aggregated", "isController": false}, {"data": [[15.0, 3414.6666666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[15.0, 3414.6666666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/-33-Aggregated", "isController": false}, {"data": [[11.0, 160.0], [13.0, 223.0], [14.0, 100.0], [15.0, 182.4]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[13.75, 190.58333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3-Aggregated", "isController": false}, {"data": [[15.0, 2432.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[15.0, 2432.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34-Aggregated", "isController": false}, {"data": [[11.0, 80.0], [13.0, 232.0], [14.0, 345.0], [15.0, 323.6]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[13.75, 266.91666666666674]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2-Aggregated", "isController": false}, {"data": [[11.0, 86.0], [13.0, 224.8], [14.0, 327.0], [15.0, 223.4]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[13.75, 221.16666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1-Aggregated", "isController": false}, {"data": [[11.0, 646.0], [13.0, 576.4], [14.0, 1366.0], [15.0, 1061.2]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[13.75, 850.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0-Aggregated", "isController": false}, {"data": [[14.0, 2540.0], [15.0, 4720.454545454545]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[14.916666666666666, 4538.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22-Aggregated", "isController": false}, {"data": [[11.0, 216.0], [13.0, 263.4], [14.0, 377.0], [15.0, 270.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[13.75, 271.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7-Aggregated", "isController": false}, {"data": [[14.0, 53.0], [15.0, 100.9090909090909]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[14.916666666666666, 96.91666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21-Aggregated", "isController": false}, {"data": [[11.0, 113.0], [13.0, 241.6], [14.0, 342.0], [15.0, 270.8]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[13.75, 251.41666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6-Aggregated", "isController": false}, {"data": [[14.0, 477.0], [15.0, 553.4545454545454]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[14.916666666666666, 547.0833333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24-Aggregated", "isController": false}, {"data": [[11.0, 74.0], [13.0, 179.0], [14.0, 314.0], [15.0, 492.2]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[13.75, 312.00000000000006]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5-Aggregated", "isController": false}, {"data": [[14.0, 220.0], [15.0, 495.7272727272727]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[14.916666666666666, 472.74999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23-Aggregated", "isController": false}, {"data": [[11.0, 203.0], [13.0, 229.0], [14.0, 348.0], [15.0, 637.4]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[13.75, 406.91666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4-Aggregated", "isController": false}, {"data": [[11.0, 1382.0], [13.0, 1508.2], [14.0, 2723.0], [15.0, 2216.4]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[13.75, 1894.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-Aggregated", "isController": false}, {"data": [[11.0, 266.0], [13.0, 258.6], [14.0, 356.0], [15.0, 239.6]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[13.75, 259.4166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23-Aggregated", "isController": false}, {"data": [[11.0, 282.0], [13.0, 235.8], [14.0, 457.0], [15.0, 251.2]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[13.75, 264.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22-Aggregated", "isController": false}, {"data": [[14.0, 108.0], [15.0, 109.9090909090909]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[14.916666666666666, 109.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20-Aggregated", "isController": false}, {"data": [[11.0, 198.0], [13.0, 279.8], [14.0, 384.0], [15.0, 244.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[13.75, 266.74999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9-Aggregated", "isController": false}, {"data": [[11.0, 210.0], [13.0, 281.8], [14.0, 308.0], [15.0, 242.4]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[13.75, 261.5833333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8-Aggregated", "isController": false}, {"data": [[11.0, 265.0], [13.0, 268.2], [14.0, 263.0], [15.0, 289.6]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[13.75, 276.41666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372-Aggregated", "isController": false}, {"data": [[15.0, 3036.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[15.0, 3036.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-30-Aggregated", "isController": false}, {"data": [[14.0, 54215.0], [15.0, 2187.7272727272725]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[14.916666666666666, 6523.333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0-Aggregated", "isController": false}, {"data": [[15.0, 383.49999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[15.0, 383.49999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/-31-Aggregated", "isController": false}, {"data": [[15.0, 23791.833333333336]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[15.0, 23791.833333333336]], "isOverall": false, "label": "https://www.banglashoppers.com/-32-Aggregated", "isController": false}, {"data": [[11.0, 307.0], [13.0, 282.8], [14.0, 256.0], [15.0, 256.8]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[13.75, 271.75]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371-Aggregated", "isController": false}, {"data": [[11.0, 172.0], [13.0, 115.0], [14.0, 134.0], [15.0, 94.2]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[13.75, 112.66666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21-Aggregated", "isController": false}, {"data": [[11.0, 89.0], [13.0, 77.8], [14.0, 152.0], [15.0, 71.6]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[13.75, 82.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20-Aggregated", "isController": false}, {"data": [[14.0, 76.0], [15.0, 118.0909090909091]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[14.916666666666666, 114.58333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19-Aggregated", "isController": false}, {"data": [[14.0, 96.0], [15.0, 160.27272727272728]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[14.916666666666666, 154.91666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18-Aggregated", "isController": false}, {"data": [[14.0, 306.0], [15.0, 267.1818181818182]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[14.916666666666666, 270.4166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15-Aggregated", "isController": false}, {"data": [[14.0, 139.0], [15.0, 412.09090909090907]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[14.916666666666666, 389.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14-Aggregated", "isController": false}, {"data": [[14.0, 245.0], [15.0, 167.9090909090909]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[14.916666666666666, 174.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17-Aggregated", "isController": false}, {"data": [[14.0, 119.0], [15.0, 144.72727272727275]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[14.916666666666666, 142.58333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16-Aggregated", "isController": false}, {"data": [[14.0, 288.0], [15.0, 488.27272727272725]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[14.916666666666666, 471.5833333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11-Aggregated", "isController": false}, {"data": [[14.0, 312.0], [15.0, 369.81818181818187]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[14.916666666666666, 365.00000000000006]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10-Aggregated", "isController": false}, {"data": [[14.0, 148.0], [15.0, 879.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[14.916666666666666, 818.0833333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13-Aggregated", "isController": false}, {"data": [[14.0, 301.0], [15.0, 356.8181818181818]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[14.916666666666666, 352.1666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12-Aggregated", "isController": false}, {"data": [[8.0, 63.0], [4.0, 62.0], [9.0, 60.0], [10.0, 57.0], [5.0, 57.0], [11.0, 63.25], [12.0, 93.0], [6.0, 85.0], [13.0, 76.8], [14.0, 79.66666666666667], [7.0, 58.0], [15.0, 98.14705882352942]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[13.266666666666667, 86.53333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?-Aggregated", "isController": false}, {"data": [[9.0, 237.0], [11.0, 625.0], [12.0, 280.0], [13.0, 276.5], [15.0, 455.2]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[13.25, 376.99999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0-Aggregated", "isController": false}, {"data": [[9.0, 79.0], [11.0, 245.0], [12.0, 81.0], [13.0, 117.0], [15.0, 169.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[13.25, 143.50000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1-Aggregated", "isController": false}, {"data": [[9.0, 87.0], [11.0, 222.0], [12.0, 221.0], [13.0, 117.25], [15.0, 314.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[13.25, 214.24999999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2-Aggregated", "isController": false}, {"data": [[9.0, 194.0], [11.0, 195.0], [12.0, 73.0], [13.0, 118.0], [15.0, 133.2]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[13.25, 133.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3-Aggregated", "isController": false}, {"data": [[15.0, 47363.666666666664]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[15.0, 47363.666666666664]], "isOverall": false, "label": "Home-Aggregated", "isController": true}, {"data": [[15.0, 5817.166666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[15.0, 5817.166666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-0-Aggregated", "isController": false}, {"data": [[15.0, 10846.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[15.0, 10846.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1-Aggregated", "isController": false}, {"data": [[15.0, 12390.916666666668]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[15.0, 12390.916666666668]], "isOverall": false, "label": "https://www.banglashoppers.com/-2-Aggregated", "isController": false}, {"data": [[15.0, 3432.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[15.0, 3432.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-Aggregated", "isController": false}, {"data": [[15.0, 1380.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[15.0, 1380.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-4-Aggregated", "isController": false}, {"data": [[15.0, 14861.666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[15.0, 14861.666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-5-Aggregated", "isController": false}, {"data": [[15.0, 2064.666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[15.0, 2064.666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-6-Aggregated", "isController": false}, {"data": [[15.0, 6795.749999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[15.0, 6795.749999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/-7-Aggregated", "isController": false}, {"data": [[15.0, 1870.3333333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[15.0, 1870.3333333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-8-Aggregated", "isController": false}, {"data": [[15.0, 292.5833333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[15.0, 292.5833333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-9-Aggregated", "isController": false}, {"data": [[11.0, 3503.0], [13.0, 4200.8], [14.0, 4842.0], [15.0, 4596.4]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[13.75, 4360.916666666667]], "isOverall": false, "label": "HotOffers-Aggregated", "isController": true}, {"data": [[11.0, 260.5], [13.0, 289.95], [14.0, 214.33333333333331], [15.0, 309.3484848484847]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}, {"data": [[14.35416666666667, 297.3333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 15.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 5037.0, "minX": 1.66195494E12, "maxY": 1738319.6833333333, "series": [{"data": [[1.66195512E12, 56284.1], [1.661955E12, 902858.2333333333], [1.66195506E12, 324000.0833333333], [1.66195494E12, 1738319.6833333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66195512E12, 5037.0], [1.661955E12, 15089.116666666667], [1.66195506E12, 19665.316666666666], [1.66195494E12, 14374.966666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66195512E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 53.0, "minX": 1.66195494E12, "maxY": 85716.0, "series": [{"data": [[1.661955E12, 559.0], [1.66195506E12, 570.0], [1.66195494E12, 312.75]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.661955E12, 283.85714285714283], [1.66195506E12, 372.0], [1.66195494E12, 499.24999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.661955E12, 245.0], [1.66195506E12, 384.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.661955E12, 119.0], [1.66195506E12, 148.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.661955E12, 199.0], [1.66195506E12, 230.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.661955E12, 160.25], [1.66195506E12, 144.87499999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.661955E12, 139.0], [1.66195506E12, 97.125]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.661955E12, 106.0], [1.66195506E12, 131.87500000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.661955E12, 169.75], [1.66195506E12, 173.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.661955E12, 189.0], [1.66195506E12, 212.125]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.661955E12, 132.5], [1.66195506E12, 196.875]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.661955E12, 258.0], [1.66195506E12, 147.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.661955E12, 73.33333333333333], [1.66195506E12, 245.77777777777777]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.661955E12, 101.25], [1.66195506E12, 180.125]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66195512E12, 67.5], [1.66195506E12, 148.16666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.661955E12, 273.25], [1.66195506E12, 115.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.661955E12, 151.25], [1.66195506E12, 174.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.661955E12, 165.25], [1.66195506E12, 165.125]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66195512E12, 252.83333333333334], [1.66195506E12, 196.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.661955E12, 126.0], [1.66195506E12, 149.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.661955E12, 73.0], [1.66195506E12, 99.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66195512E12, 80.83333333333333], [1.66195506E12, 129.83333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.661955E12, 174.5], [1.66195506E12, 114.375]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66195512E12, 192.0], [1.66195506E12, 207.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.661955E12, 78.75], [1.66195506E12, 121.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.661955E12, 320.14285714285717], [1.66195506E12, 296.0], [1.66195494E12, 306.75]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.661955E12, 273.4], [1.66195506E12, 300.4285714285714]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.661955E12, 394.71428571428567], [1.66195506E12, 298.0], [1.66195494E12, 433.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66195512E12, 89.16666666666667], [1.66195506E12, 117.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66195512E12, 82.83333333333333], [1.66195506E12, 92.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.661955E12, 407.14285714285717], [1.66195506E12, 521.0], [1.66195494E12, 241.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.661955E12, 452.0], [1.66195506E12, 546.0], [1.66195494E12, 260.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.661955E12, 174.2], [1.66195506E12, 152.42857142857144]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.661955E12, 540.8571428571428], [1.66195506E12, 521.0], [1.66195494E12, 170.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.661955E12, 214.0], [1.66195506E12, 540.0], [1.66195494E12, 330.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.661955E12, 2430.6666666666665], [1.66195506E12, 1546.2222222222222]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.661955E12, 323.85714285714283], [1.66195506E12, 390.0], [1.66195494E12, 219.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.661955E12, 383.2857142857143], [1.66195506E12, 282.0], [1.66195494E12, 411.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.661955E12, 364.2857142857143], [1.66195506E12, 522.0], [1.66195494E12, 113.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66195512E12, 147.5], [1.66195506E12, 282.33333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.661955E12, 576.5714285714286], [1.66195506E12, 396.0], [1.66195494E12, 151.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.661955E12, 623.0], [1.66195506E12, 350.85714285714283]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66195512E12, 204.5], [1.66195506E12, 361.8333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.661955E12, 232.8], [1.66195506E12, 286.1428571428571]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66195512E12, 212.0], [1.66195506E12, 355.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.661955E12, 248.0], [1.66195506E12, 106.42857142857143]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66195512E12, 189.16666666666666], [1.66195506E12, 182.16666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.661955E12, 98.6], [1.66195506E12, 100.85714285714286]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66195512E12, 210.83333333333334], [1.66195506E12, 186.16666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.661955E12, 97.6], [1.66195506E12, 113.14285714285714]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66195512E12, 178.66666666666669], [1.66195506E12, 594.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.661955E12, 98.4], [1.66195506E12, 141.28571428571428]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66195512E12, 174.66666666666666], [1.66195506E12, 597.1666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.661955E12, 94.8], [1.66195506E12, 123.57142857142857]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66195512E12, 125.5], [1.66195506E12, 628.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.661955E12, 95.2], [1.66195506E12, 165.85714285714286]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66195512E12, 191.5], [1.66195506E12, 232.16666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66195512E12, 388.8333333333333], [1.66195506E12, 634.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66195512E12, 708.1666666666666], [1.66195506E12, 376.1666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66195512E12, 158.83333333333334], [1.66195506E12, 247.66666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66195512E12, 171.66666666666669], [1.66195506E12, 258.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66195512E12, 273.66666666666663], [1.66195506E12, 351.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66195512E12, 108.83333333333333], [1.66195506E12, 99.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66195512E12, 85.33333333333334], [1.66195506E12, 143.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.661955E12, 194.2], [1.66195506E12, 263.8571428571429]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66195512E12, 117.83333333333334], [1.66195506E12, 155.83333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66195512E12, 81.33333333333333], [1.66195506E12, 131.16666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.66195494E12, 464.4166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66195512E12, 139.5], [1.661955E12, 146.2941176470588], [1.66195506E12, 115.08695652173913], [1.66195494E12, 148.92857142857142]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.661955E12, 17637.0], [1.66195494E12, 8291.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66195512E12, 1534.6666666666667], [1.66195506E12, 1608.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.66195494E12, 944.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.66195494E12, 731.4166666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.66195494E12, 1046.9999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.661955E12, 58191.0], [1.66195494E12, 4029.7272727272725]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.66195494E12, 2092.083333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.661955E12, 85716.0], [1.66195494E12, 3546.2727272727275]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.66195494E12, 1632.9166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.66195494E12, 459.08333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.661955E12, 280.0], [1.66195506E12, 269.8888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.66195494E12, 547.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.661955E12, 8613.285714285716], [1.66195506E12, 57744.0], [1.66195494E12, 6629.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.661955E12, 83553.0], [1.66195494E12, 39724.7]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.661955E12, 253.66666666666666], [1.66195506E12, 283.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.66195494E12, 526.8333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.66195494E12, 1010.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.66195494E12, 1204.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.661955E12, 2507.0], [1.66195506E12, 2555.3750000000005]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.66195494E12, 846.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.66195494E12, 1084.2500000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.66195494E12, 942.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.66195494E12, 456.16666666666674]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.66195494E12, 582.8333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.66195494E12, 341.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.66195494E12, 702.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.661955E12, 1039.0], [1.66195506E12, 1267.5555555555557]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.66195494E12, 3414.6666666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.661955E12, 182.4], [1.66195506E12, 196.42857142857142]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.66195494E12, 2432.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.661955E12, 323.6], [1.66195506E12, 226.42857142857144]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.661955E12, 223.4], [1.66195506E12, 219.57142857142858]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.661955E12, 1061.2], [1.66195506E12, 699.1428571428571]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.661955E12, 5892.571428571428], [1.66195506E12, 2540.0], [1.66195494E12, 2669.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.661955E12, 270.0], [1.66195506E12, 272.85714285714283]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.661955E12, 98.57142857142857], [1.66195506E12, 53.0], [1.66195494E12, 105.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.661955E12, 270.8], [1.66195506E12, 237.5714285714286]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.661955E12, 667.8571428571429], [1.66195506E12, 477.0], [1.66195494E12, 353.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.661955E12, 492.2], [1.66195506E12, 183.28571428571428]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.661955E12, 631.5714285714286], [1.66195506E12, 220.0], [1.66195494E12, 258.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.661955E12, 637.4], [1.66195506E12, 242.2857142857143]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.661955E12, 2216.4], [1.66195506E12, 1663.7142857142856]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.661955E12, 239.6], [1.66195506E12, 273.5714285714286]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.661955E12, 251.2], [1.66195506E12, 273.99999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.661955E12, 113.71428571428571], [1.66195506E12, 108.0], [1.66195494E12, 103.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.661955E12, 244.0], [1.66195506E12, 282.99999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.661955E12, 242.4], [1.66195506E12, 275.2857142857143]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.661955E12, 289.6], [1.66195506E12, 267.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.66195494E12, 3036.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.661955E12, 1649.0000000000002], [1.66195506E12, 54215.0], [1.66195494E12, 3130.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.66195494E12, 383.49999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.66195494E12, 23791.833333333336]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.661955E12, 256.8], [1.66195506E12, 282.4285714285714]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.661955E12, 94.2], [1.66195506E12, 125.85714285714286]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.661955E12, 71.6], [1.66195506E12, 90.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.661955E12, 133.28571428571428], [1.66195506E12, 76.0], [1.66195494E12, 91.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.661955E12, 136.0], [1.66195506E12, 96.0], [1.66195494E12, 202.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.661955E12, 225.85714285714286], [1.66195506E12, 306.0], [1.66195494E12, 339.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.661955E12, 425.14285714285717], [1.66195506E12, 139.0], [1.66195494E12, 389.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.661955E12, 193.42857142857142], [1.66195506E12, 245.0], [1.66195494E12, 123.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.661955E12, 150.71428571428572], [1.66195506E12, 119.0], [1.66195494E12, 134.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.661955E12, 467.2857142857143], [1.66195506E12, 288.0], [1.66195494E12, 525.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.661955E12, 382.42857142857144], [1.66195506E12, 312.0], [1.66195494E12, 347.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.661955E12, 921.8571428571427], [1.66195506E12, 148.0], [1.66195494E12, 804.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.661955E12, 421.99999999999994], [1.66195506E12, 301.0], [1.66195494E12, 242.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66195512E12, 63.333333333333336], [1.661955E12, 78.6470588235294], [1.66195506E12, 78.56521739130434], [1.66195494E12, 119.14285714285714]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.661955E12, 455.2], [1.66195506E12, 321.1428571428571]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.661955E12, 194.75], [1.66195506E12, 117.87499999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.661955E12, 77.33333333333333], [1.66195506E12, 259.8888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.661955E12, 107.0], [1.66195506E12, 146.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.661955E12, 84018.0], [1.66195494E12, 40032.8]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.66195494E12, 5817.166666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.66195494E12, 10846.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.661955E12, 77598.0], [1.66195494E12, 6463.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.66195494E12, 3432.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.66195494E12, 1380.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66195494E12, 14861.666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.66195494E12, 2064.666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.66195494E12, 6795.749999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.66195494E12, 1870.3333333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.66195494E12, 292.5833333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.661955E12, 4521.888888888889], [1.66195506E12, 3503.0], [1.66195494E12, 4065.5]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.661955E12, 327.42500000000007], [1.66195506E12, 270.90000000000003], [1.66195494E12, 281.53846153846155]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66195512E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66195494E12, "maxY": 5477.0, "series": [{"data": [[1.661955E12, 546.1428571428571], [1.66195506E12, 570.0], [1.66195494E12, 312.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.661955E12, 283.57142857142856], [1.66195506E12, 372.0], [1.66195494E12, 499.24999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.661955E12, 102.25], [1.66195506E12, 124.37499999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.661955E12, 73.33333333333333], [1.66195506E12, 245.00000000000006]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.661955E12, 135.75], [1.66195506E12, 130.625]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.661955E12, 320.0], [1.66195506E12, 296.0], [1.66195494E12, 306.75]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.661955E12, 273.4], [1.66195506E12, 300.4285714285714]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 25.749999999999996]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.661955E12, 12.571428571428573], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.661955E12, 348.3333333333333], [1.66195506E12, 308.8888888888889]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.661955E12, 250.42857142857142], [1.66195506E12, 393.0], [1.66195494E12, 118.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.661955E12, 306.0], [1.66195506E12, 278.42857142857144]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.661955E12, 244.6], [1.66195506E12, 104.42857142857143]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.661955E12, 98.0], [1.66195506E12, 100.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66195512E12, 205.0], [1.66195506E12, 161.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66195512E12, 166.16666666666666], [1.66195506E12, 506.50000000000006]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66195512E12, 284.5], [1.66195506E12, 215.16666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66195512E12, 158.16666666666666], [1.66195506E12, 247.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66195512E12, 117.16666666666667], [1.66195506E12, 155.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.66195494E12, 311.0833333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.661955E12, 41.94117647058824], [1.66195506E12, 0.0], [1.66195494E12, 116.14285714285714]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.661955E12, 1631.857142857143], [1.66195494E12, 1910.8]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66195512E12, 284.5], [1.66195506E12, 215.16666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.66195494E12, 169.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.66195494E12, 228.83333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.66195494E12, 362.1666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.661955E12, 122.0], [1.66195494E12, 210.18181818181822]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.66195494E12, 376.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.661955E12, 5477.0], [1.66195494E12, 286.90909090909093]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.66195494E12, 281.41666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.66195494E12, 457.99999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.661955E12, 279.0], [1.66195506E12, 269.8888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.66195494E12, 546.9166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.661955E12, 198.14285714285714], [1.66195506E12, 131.0], [1.66195494E12, 390.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.661955E12, 3235.5], [1.66195494E12, 2504.0000000000005]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.661955E12, 253.66666666666666], [1.66195506E12, 283.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.66195494E12, 432.16666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.66195494E12, 301.4166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.66195494E12, 310.91666666666674]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.661955E12, 1430.5], [1.66195506E12, 1328.375]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.66195494E12, 277.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.66195494E12, 1084.2500000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.66195494E12, 222.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.66195494E12, 363.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.66195494E12, 424.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.66195494E12, 305.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.66195494E12, 658.0000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.661955E12, 172.0], [1.66195506E12, 134.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.66195494E12, 3414.6666666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.66195494E12, 1495.4166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.661955E12, 515.4], [1.66195506E12, 195.7142857142857]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.661955E12, 118.0], [1.66195506E12, 115.0], [1.66195494E12, 145.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.661955E12, 268.6], [1.66195506E12, 209.85714285714286]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.661955E12, 515.4], [1.66195506E12, 195.7142857142857]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.661955E12, 289.6], [1.66195506E12, 266.42857142857144]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.66195494E12, 478.4166666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.661955E12, 198.14285714285714], [1.66195506E12, 131.0], [1.66195494E12, 390.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.66195494E12, 383.49999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.66195494E12, 400.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.661955E12, 256.8], [1.66195506E12, 282.4285714285714]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.661955E12, 210.71428571428572], [1.66195506E12, 304.0], [1.66195494E12, 323.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.661955E12, 158.85714285714286], [1.66195506E12, 137.0], [1.66195494E12, 388.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.661955E12, 243.85714285714286], [1.66195506E12, 104.0], [1.66195494E12, 177.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.661955E12, 327.0], [1.66195506E12, 300.0], [1.66195494E12, 242.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66195512E12, 63.333333333333336], [1.661955E12, 78.6470588235294], [1.66195506E12, 78.56521739130434], [1.66195494E12, 119.14285714285714]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.661955E12, 166.2], [1.66195506E12, 127.28571428571429]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.661955E12, 3700.0], [1.66195494E12, 2809.7]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.66195494E12, 2625.916666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.66195494E12, 473.9166666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.661955E12, 429.0], [1.66195494E12, 1076.090909090909]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.66195494E12, 1489.8333333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.66195494E12, 1260.7500000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66195494E12, 3239.333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.66195494E12, 1587.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.66195494E12, 835.4166666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.66195494E12, 1151.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.66195494E12, 292.49999999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.661955E12, 2613.2222222222226], [1.66195506E12, 1884.0], [1.66195494E12, 2225.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.661955E12, 288.175], [1.66195506E12, 227.20000000000005], [1.66195494E12, 268.92307692307696]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66195512E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66195494E12, "maxY": 5335.0, "series": [{"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.661955E12, 121.33333333333334], [1.66195506E12, 259.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 16.11111111111111]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.661955E12, 106.0], [1.66195506E12, 98.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.661955E12, 56.74999999999999], [1.66195506E12, 44.00000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 16.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 19.125]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.661955E12, 55.0], [1.66195506E12, 73.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.661955E12, 85.0], [1.66195506E12, 103.37500000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.661955E12, 29.25], [1.66195506E12, 93.125]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.661955E12, 27.75], [1.66195506E12, 35.375]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 158.44444444444446]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.661955E12, 26.75], [1.66195506E12, 72.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 46.333333333333336]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.661955E12, 27.249999999999996], [1.66195506E12, 13.625]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 28.625]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 59.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66195512E12, 146.33333333333334], [1.66195506E12, 85.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.661955E12, 39.25], [1.66195506E12, 15.375000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 34.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.661955E12, 29.000000000000004], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66195512E12, 104.0], [1.66195506E12, 122.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 42.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.661955E12, 271.42857142857144], [1.66195506E12, 218.0], [1.66195494E12, 279.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.661955E12, 271.7142857142857], [1.66195506E12, 267.0], [1.66195494E12, 103.74999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.661955E12, 273.4285714285714], [1.66195506E12, 267.0], [1.66195494E12, 136.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.661955E12, 22.4], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.661955E12, 352.7142857142857], [1.66195506E12, 267.0], [1.66195494E12, 30.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 270.0], [1.66195494E12, 76.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.661955E12, 109.66666666666666], [1.66195506E12, 79.55555555555556]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.661955E12, 176.71428571428572], [1.66195506E12, 228.0], [1.66195494E12, 127.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.661955E12, 249.71428571428575], [1.66195506E12, 195.0], [1.66195494E12, 253.24999999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.661955E12, 253.28571428571428], [1.66195506E12, 267.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66195512E12, 55.66666666666667], [1.66195506E12, 154.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.661955E12, 127.57142857142857], [1.66195506E12, 229.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.661955E12, 110.2], [1.66195506E12, 133.42857142857142]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66195512E12, 111.33333333333333], [1.66195506E12, 241.49999999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.661955E12, 75.6], [1.66195506E12, 164.57142857142856]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66195512E12, 116.0], [1.66195506E12, 221.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.661955E12, 155.2], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66195512E12, 94.16666666666666], [1.66195506E12, 24.333333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66195512E12, 97.5], [1.66195506E12, 24.166666666666668]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66195512E12, 82.0], [1.66195506E12, 273.66666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 17.142857142857142]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66195512E12, 81.16666666666667], [1.66195506E12, 273.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66195512E12, 38.5], [1.66195506E12, 297.66666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 64.71428571428571]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66195512E12, 91.5], [1.66195506E12, 25.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66195512E12, 85.66666666666666], [1.66195506E12, 120.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66195512E12, 95.66666666666666], [1.66195506E12, 78.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66195512E12, 63.16666666666668], [1.66195506E12, 19.666666666666668]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66195512E12, 84.33333333333333], [1.66195506E12, 132.83333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66195512E12, 131.5], [1.66195506E12, 124.16666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66195512E12, 22.166666666666668], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 23.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.661955E12, 76.8], [1.66195506E12, 156.85714285714286]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66195512E12, 22.166666666666668], [1.66195506E12, 17.666666666666668]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.66195506E12, 19.333333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.661955E12, 20.58823529411765], [1.66195506E12, 0.0], [1.66195494E12, 22.28571428571429]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.661955E12, 56.57142857142857], [1.66195494E12, 90.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66195512E12, 95.66666666666666], [1.66195506E12, 78.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.66195494E12, 15.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.66195494E12, 80.74999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.66195494E12, 130.24999999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.66195494E12, 16.166666666666668]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.661955E12, 5335.0], [1.66195494E12, 37.54545454545454]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.66195494E12, 33.333333333333336]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.66195494E12, 82.41666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.66195494E12, 201.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.661955E12, 24.57142857142857], [1.66195506E12, 0.0], [1.66195494E12, 26.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.661955E12, 2846.0], [1.66195494E12, 2148.5]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.66195494E12, 115.83333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.66195494E12, 15.999999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.66195494E12, 32.333333333333336]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.66195494E12, 39.41666666666668]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.66195494E12, 164.83333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.66195494E12, 17.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.66195494E12, 2948.5833333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.661955E12, 91.2], [1.66195506E12, 93.85714285714286]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.66195494E12, 1216.3333333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.661955E12, 145.0], [1.66195506E12, 116.28571428571428]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.661955E12, 52.4], [1.66195506E12, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.661955E12, 347.4], [1.66195506E12, 61.714285714285715]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.661955E12, 158.2], [1.66195506E12, 169.42857142857142]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 27.500000000000004]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.661955E12, 150.8], [1.66195506E12, 93.71428571428571]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.661955E12, 399.14285714285717], [1.66195506E12, 161.0], [1.66195494E12, 131.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.661955E12, 343.0], [1.66195506E12, 83.42857142857143]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.661955E12, 447.42857142857144], [1.66195506E12, 129.0], [1.66195494E12, 145.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.661955E12, 539.2], [1.66195506E12, 133.57142857142856]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.661955E12, 347.4], [1.66195506E12, 61.714285714285715]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.661955E12, 122.6], [1.66195506E12, 147.85714285714286]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.661955E12, 159.4], [1.66195506E12, 186.85714285714286]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.661955E12, 135.2], [1.66195506E12, 159.42857142857144]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.661955E12, 145.6], [1.66195506E12, 176.85714285714286]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.661955E12, 24.57142857142857], [1.66195506E12, 0.0], [1.66195494E12, 26.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.66195494E12, 77.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.66195494E12, 187.16666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 24.285714285714285]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 126.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 131.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 133.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.661955E12, 302.00000000000006], [1.66195506E12, 214.0], [1.66195494E12, 91.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.661955E12, 210.85714285714286], [1.66195506E12, 218.0], [1.66195494E12, 63.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.661955E12, 57.71428571428571], [1.66195506E12, 0.0], [1.66195494E12, 28.250000000000004]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.661955E12, 180.28571428571425], [1.66195506E12, 201.0], [1.66195494E12, 120.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66195512E12, 0.0], [1.661955E12, 0.0], [1.66195506E12, 0.0], [1.66195494E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 36.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 178.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.661955E12, 0.0], [1.66195506E12, 60.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.661955E12, 3021.0], [1.66195494E12, 2179.7000000000003]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.66195494E12, 2264.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.66195494E12, 106.58333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.661955E12, 196.0], [1.66195494E12, 3325.5454545454545]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.66195494E12, 2509.416666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.66195494E12, 901.1666666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66195494E12, 2383.9166666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.66195494E12, 1321.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.66195494E12, 585.4166666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.66195494E12, 682.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.66195494E12, 70.58333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.661955E12, 236.44444444444443], [1.66195506E12, 0.0], [1.66195494E12, 80.5]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.661955E12, 9.400000000000002], [1.66195506E12, 0.0], [1.66195494E12, 12.076923076923075]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66195512E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 51.0, "minX": 1.66195494E12, "maxY": 92081.0, "series": [{"data": [[1.66195512E12, 2422.0], [1.661955E12, 92081.0], [1.66195506E12, 57744.0], [1.66195494E12, 50387.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66195512E12, 310.40000000000003], [1.661955E12, 973.0], [1.66195506E12, 441.0], [1.66195494E12, 5921.300000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66195512E12, 2086.2100000000023], [1.661955E12, 54372.79999999913], [1.66195506E12, 2806.1999999999953], [1.66195494E12, 39523.02999999999]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66195512E12, 805.4999999999998], [1.661955E12, 2027.5], [1.66195506E12, 906.0], [1.66195494E12, 16247.249999999973]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66195512E12, 51.0], [1.661955E12, 52.0], [1.66195506E12, 53.0], [1.66195494E12, 54.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66195512E12, 148.0], [1.661955E12, 225.0], [1.66195506E12, 198.0], [1.66195494E12, 567.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66195512E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 1.0, "minX": 1.0, "maxY": 19921.0, "series": [{"data": [[2.0, 445.5], [32.0, 187.0], [34.0, 96.0], [40.0, 94.0], [41.0, 124.0], [44.0, 128.5], [3.0, 1295.0], [49.0, 207.0], [52.0, 184.0], [62.0, 122.5], [4.0, 280.5], [5.0, 631.0], [6.0, 391.0], [7.0, 278.0], [8.0, 323.5], [9.0, 223.0], [10.0, 309.0], [11.0, 273.0], [12.0, 266.5], [13.0, 600.0], [14.0, 446.0], [15.0, 174.5], [16.0, 255.0], [1.0, 463.0], [17.0, 184.0], [18.0, 329.0], [19.0, 232.0], [20.0, 251.0], [21.0, 127.0], [22.0, 165.0], [23.0, 612.0], [24.0, 150.5], [25.0, 188.5], [26.0, 171.0], [27.0, 177.5], [28.0, 293.0], [31.0, 238.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 148.5], [2.0, 271.0], [9.0, 259.0], [10.0, 270.0], [3.0, 19921.0], [13.0, 13672.0], [14.0, 2.0], [4.0, 257.5], [16.0, 1.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [5.0, 1.0], [24.0, 147.5], [26.0, 1.0], [7.0, 17451.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 62.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 1005.0, "series": [{"data": [[2.0, 303.0], [32.0, 0.0], [34.0, 0.0], [40.0, 0.0], [41.0, 0.0], [44.0, 0.0], [3.0, 306.0], [49.0, 0.0], [52.0, 0.0], [62.0, 0.0], [4.0, 257.0], [5.0, 216.5], [6.0, 0.0], [7.0, 239.0], [8.0, 174.5], [9.0, 80.0], [10.0, 127.0], [11.0, 105.0], [12.0, 184.5], [13.0, 236.0], [14.0, 150.0], [15.0, 0.0], [16.0, 117.0], [1.0, 463.0], [17.0, 0.0], [18.0, 150.0], [19.0, 0.0], [20.0, 0.0], [21.0, 0.0], [22.0, 0.0], [23.0, 168.0], [24.0, 0.0], [25.0, 0.0], [26.0, 0.0], [27.0, 0.0], [28.0, 116.5], [31.0, 114.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 0.0], [2.0, 0.0], [9.0, 0.0], [10.0, 0.0], [3.0, 0.0], [13.0, 0.0], [14.0, 0.0], [4.0, 0.0], [16.0, 0.0], [17.0, 0.0], [18.0, 0.0], [19.0, 0.0], [5.0, 0.0], [24.0, 0.0], [26.0, 0.0], [7.0, 1005.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 62.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 2.7, "minX": 1.66195494E12, "maxY": 10.85, "series": [{"data": [[1.66195512E12, 2.7], [1.661955E12, 8.8], [1.66195506E12, 10.85], [1.66195494E12, 10.05]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66195512E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66195494E12, "maxY": 8.55, "series": [{"data": [[1.66195512E12, 0.7], [1.661955E12, 3.3666666666666667], [1.66195506E12, 3.5833333333333335], [1.66195494E12, 8.55]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66195512E12, 2.0], [1.661955E12, 5.116666666666666], [1.66195506E12, 7.4], [1.66195494E12, 1.25]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.661955E12, 0.16666666666666666], [1.66195506E12, 0.11666666666666667], [1.66195494E12, 0.13333333333333333]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.NoHttpResponseException", "isController": false}, {"data": [[1.66195494E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66195512E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66195494E12, "maxY": 0.5, "series": [{"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-11-success", "isController": false}, {"data": [[1.661955E12, 0.05], [1.66195506E12, 0.15]], "isOverall": false, "label": "Clearance-success", "isController": true}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-28-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.661955E12, 0.2833333333333333], [1.66195506E12, 0.38333333333333336], [1.66195494E12, 0.23333333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-7-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-30-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10-success", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301-success", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-15-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895-success", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3-success", "isController": false}, {"data": [[1.66195494E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-failure", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-0-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-21-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-18-success", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-25-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-12-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2-success", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6-success", "isController": false}, {"data": [[1.661955E12, 0.03333333333333333], [1.66195494E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-8-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-27-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17-success", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8-success", "isController": false}, {"data": [[1.661955E12, 0.016666666666666666], [1.66195494E12, 0.18333333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/-16-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-4-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-33-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372-success", "isController": false}, {"data": [[1.661955E12, 0.05], [1.66195506E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20-success", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "Combo-success", "isController": true}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-1-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-19-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-20-success", "isController": false}, {"data": [[1.661955E12, 0.5], [1.66195506E12, 0.38333333333333336], [1.66195494E12, 0.31666666666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-success", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-24-success", "isController": false}, {"data": [[1.661955E12, 0.05], [1.66195506E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0-success", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5-success", "isController": false}, {"data": [[1.661955E12, 0.05], [1.66195506E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696-success", "isController": false}, {"data": [[1.661955E12, 0.16666666666666666], [1.66195506E12, 0.11666666666666667], [1.66195494E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-failure", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-13-success", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-9-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-26-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10-success", "isController": false}, {"data": [[1.66195494E12, 0.03333333333333333]], "isOverall": false, "label": "Home-failure", "isController": true}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9-success", "isController": false}, {"data": [[1.661955E12, 0.016666666666666666]], "isOverall": false, "label": "HotOffers-success", "isController": true}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-17-success", "isController": false}, {"data": [[1.661955E12, 0.05], [1.66195506E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22-success", "isController": false}, {"data": [[1.661955E12, 0.03333333333333333], [1.66195494E12, 0.13333333333333333]], "isOverall": false, "label": "Home-success", "isController": true}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195494E12, 0.03333333333333333]], "isOverall": false, "label": "Makeupshop-failure", "isController": true}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-5-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-32-success", "isController": false}, {"data": [[1.661955E12, 0.016666666666666666], [1.66195494E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-2-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21-success", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.661955E12, 0.2833333333333333], [1.66195506E12, 0.38333333333333336], [1.66195494E12, 0.23333333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-23-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16-success", "isController": false}, {"data": [[1.66195494E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-failure", "isController": false}, {"data": [[1.661955E12, 0.13333333333333333], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.03333333333333333]], "isOverall": false, "label": "HotOffers-failure", "isController": true}, {"data": [[1.661955E12, 0.05], [1.66195506E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12-success", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4-success", "isController": false}, {"data": [[1.661955E12, 0.05], [1.66195506E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11-success", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-31-success", "isController": false}, {"data": [[1.661955E12, 0.05], [1.66195506E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22-success", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-6-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7-success", "isController": false}, {"data": [[1.661955E12, 0.016666666666666666], [1.66195494E12, 0.18333333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/-14-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19-success", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-29-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23-success", "isController": false}, {"data": [[1.66195494E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-2-failure", "isController": false}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23-success", "isController": false}, {"data": [[1.661955E12, 0.08333333333333333], [1.66195506E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-34-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11-success", "isController": false}, {"data": [[1.661955E12, 0.05], [1.66195506E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2-success", "isController": false}, {"data": [[1.66195494E12, 0.18333333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-success", "isController": false}, {"data": [[1.661955E12, 0.03333333333333333], [1.66195494E12, 0.05]], "isOverall": false, "label": "Makeupshop-success", "isController": true}, {"data": [[1.66195512E12, 0.1], [1.66195506E12, 0.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7-success", "isController": false}, {"data": [[1.661955E12, 0.06666666666666667], [1.66195506E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-22-success", "isController": false}, {"data": [[1.66195494E12, 0.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-10-success", "isController": false}, {"data": [[1.661955E12, 0.11666666666666667], [1.66195506E12, 0.016666666666666666], [1.66195494E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66195512E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.13333333333333333, "minX": 1.66195494E12, "maxY": 11.266666666666667, "series": [{"data": [[1.66195512E12, 2.7], [1.661955E12, 8.683333333333334], [1.66195506E12, 11.266666666666667], [1.66195494E12, 9.95]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.661955E12, 0.38333333333333336], [1.66195506E12, 0.13333333333333333], [1.66195494E12, 0.2833333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66195512E12, "title": "Total Transactions Per Second"}},
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
