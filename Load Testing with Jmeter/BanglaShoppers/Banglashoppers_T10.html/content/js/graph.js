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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 46.0, "series": [{"data": [[300.0, 2.0], [600.0, 1.0], [200.0, 6.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[600.0, 1.0], [200.0, 8.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[0.0, 3.0], [200.0, 4.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 7.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[0.0, 8.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[0.0, 7.0], [100.0, 1.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[0.0, 6.0], [100.0, 2.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[0.0, 7.0], [200.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[0.0, 7.0], [200.0, 1.0], [100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[0.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[0.0, 8.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [200.0, 3.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[0.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 7.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[600.0, 1.0], [200.0, 8.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[300.0, 1.0], [200.0, 9.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0], [100.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[0.0, 4.0], [200.0, 2.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[0.0, 2.0], [100.0, 8.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[0.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[0.0, 4.0], [100.0, 3.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[0.0, 1.0], [100.0, 7.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1100.0, 2.0], [1300.0, 1.0], [800.0, 3.0], [900.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[0.0, 1.0], [200.0, 5.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[0.0, 1.0], [100.0, 6.0], [200.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[0.0, 5.0], [100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[0.0, 3.0], [200.0, 5.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[0.0, 4.0], [1500.0, 1.0], [400.0, 1.0], [200.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[0.0, 3.0], [200.0, 4.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[0.0, 1.0], [100.0, 5.0], [200.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[0.0, 2.0], [100.0, 6.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[0.0, 1.0], [200.0, 5.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[0.0, 8.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[0.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[0.0, 7.0], [100.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[0.0, 4.0], [100.0, 3.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[0.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[0.0, 6.0], [100.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[0.0, 5.0], [200.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[0.0, 6.0], [200.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[0.0, 1.0], [200.0, 5.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[100.0, 5.0], [200.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[0.0, 7.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[0.0, 5.0], [200.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[0.0, 2.0], [200.0, 5.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[0.0, 3.0], [200.0, 3.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1200.0, 1.0], [300.0, 1.0], [800.0, 2.0], [100.0, 3.0], [3500.0, 1.0], [1800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[0.0, 28.0], [100.0, 19.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[9100.0, 1.0], [5000.0, 2.0], [10100.0, 1.0], [10300.0, 1.0], [5900.0, 1.0], [13300.0, 1.0], [15200.0, 1.0], [3800.0, 2.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1100.0, 1.0], [700.0, 4.0], [800.0, 2.0], [900.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [4900.0, 1.0], [170200.0, 1.0], [700.0, 1.0], [100.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[0.0, 1.0], [600.0, 3.0], [400.0, 2.0], [100.0, 3.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [600.0, 1.0], [1500.0, 1.0], [800.0, 1.0], [100.0, 2.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1200.0, 1.0], [2500.0, 1.0], [21700.0, 1.0], [3000.0, 2.0], [800.0, 1.0], [1700.0, 1.0], [3500.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 1.0], [1200.0, 1.0], [38900.0, 1.0], [2400.0, 1.0], [20200.0, 1.0], [700.0, 1.0], [3100.0, 1.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1100.0, 1.0], [2400.0, 2.0], [300.0, 1.0], [1500.0, 1.0], [1600.0, 3.0], [800.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1100.0, 1.0], [2200.0, 1.0], [600.0, 1.0], [2700.0, 1.0], [1400.0, 1.0], [800.0, 1.0], [3200.0, 1.0], [27700.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [100.0, 5.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [5500.0, 1.0], [2700.0, 1.0], [200.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[4400.0, 1.0], [8800.0, 1.0], [9000.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [2900.0, 1.0], [12100.0, 1.0], [12000.0, 1.0], [7200.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[17000.0, 1.0], [33200.0, 1.0], [37900.0, 1.0], [43000.0, 1.0], [173500.0, 1.0], [53000.0, 1.0], [27500.0, 1.0], [29800.0, 1.0], [30400.0, 1.0], [31600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[0.0, 2.0], [100.0, 6.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [600.0, 1.0], [1200.0, 1.0], [21100.0, 1.0], [700.0, 1.0], [200.0, 1.0], [400.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [5100.0, 1.0], [700.0, 1.0], [200.0, 4.0], [3300.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [2500.0, 1.0], [1700.0, 3.0], [1800.0, 2.0], [1900.0, 2.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[600.0, 2.0], [300.0, 1.0], [2500.0, 1.0], [20300.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [100.0, 1.0], [200.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[100.0, 8.0], [400.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1100.0, 1.0], [2300.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [6000.0, 1.0], [400.0, 2.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0], [100.0, 4.0], [800.0, 1.0], [200.0, 1.0], [1600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[700.0, 1.0], [100.0, 7.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[300.0, 1.0], [100.0, 5.0], [200.0, 1.0], [400.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 6.0], [1700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[600.0, 6.0], [1300.0, 1.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 2.0], [2900.0, 1.0], [1500.0, 2.0], [900.0, 2.0], [1900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[0.0, 2.0], [100.0, 5.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[2500.0, 1.0], [700.0, 1.0], [800.0, 1.0], [1700.0, 2.0], [900.0, 1.0], [1800.0, 2.0], [2000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[0.0, 3.0], [100.0, 7.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[0.0, 5.0], [300.0, 1.0], [100.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[300.0, 5.0], [600.0, 2.0], [200.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[2100.0, 1.0], [5800.0, 1.0], [3200.0, 1.0], [6400.0, 1.0], [1700.0, 2.0], [1800.0, 2.0], [3600.0, 1.0], [7600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[0.0, 2.0], [100.0, 7.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[0.0, 7.0], [300.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[0.0, 1.0], [200.0, 5.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1300.0, 1.0], [200.0, 5.0], [100.0, 2.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 6.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[400.0, 2.0], [100.0, 1.0], [200.0, 6.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[0.0, 2.0], [200.0, 3.0], [100.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[2400.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[0.0, 1.0], [100.0, 6.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[200.0, 3.0], [100.0, 7.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [100.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[0.0, 3.0], [100.0, 5.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[0.0, 3.0], [200.0, 2.0], [100.0, 5.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[300.0, 3.0], [400.0, 1.0], [200.0, 6.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [1300.0, 1.0], [2800.0, 1.0], [12000.0, 1.0], [3100.0, 1.0], [200.0, 2.0], [400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[2200.0, 1.0], [300.0, 2.0], [2500.0, 1.0], [5100.0, 1.0], [5200.0, 1.0], [1600.0, 2.0], [400.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[0.0, 1.0], [1300.0, 1.0], [2600.0, 1.0], [100.0, 5.0], [1600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[33400.0, 1.0], [17200.0, 1.0], [17700.0, 1.0], [35100.0, 1.0], [19800.0, 1.0], [21500.0, 1.0], [10900.0, 1.0], [25000.0, 1.0], [27400.0, 1.0], [15300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [200.0, 6.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[0.0, 5.0], [300.0, 1.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[0.0, 7.0], [300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[0.0, 7.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[0.0, 8.0], [700.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[0.0, 7.0], [100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[0.0, 7.0], [600.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 2.0], [100.0, 5.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[0.0, 2.0], [600.0, 1.0], [300.0, 2.0], [200.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[0.0, 4.0], [1200.0, 1.0], [700.0, 1.0], [2900.0, 1.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[0.0, 1.0], [700.0, 1.0], [200.0, 2.0], [100.0, 6.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[0.0, 46.0], [1100.0, 1.0], [400.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[0.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[0.0, 7.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[33300.0, 1.0], [17500.0, 1.0], [38300.0, 1.0], [43100.0, 1.0], [173700.0, 1.0], [53100.0, 1.0], [27700.0, 1.0], [30000.0, 1.0], [30500.0, 1.0], [31800.0, 1.0]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[5600.0, 1.0], [2700.0, 1.0], [1500.0, 1.0], [400.0, 1.0], [1700.0, 2.0], [900.0, 1.0], [7300.0, 1.0], [3600.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[8400.0, 1.0], [9900.0, 2.0], [5100.0, 1.0], [5400.0, 1.0], [11100.0, 1.0], [2800.0, 1.0], [1500.0, 1.0], [11800.0, 1.0], [6400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[2100.0, 1.0], [4300.0, 1.0], [300.0, 1.0], [4900.0, 1.0], [1300.0, 1.0], [3100.0, 1.0], [100.0, 1.0], [200.0, 1.0], [900.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[0.0, 1.0], [2200.0, 1.0], [300.0, 2.0], [1200.0, 1.0], [1500.0, 2.0], [1600.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [4700.0, 1.0], [700.0, 1.0], [3100.0, 1.0], [900.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [6200.0, 1.0], [200.0, 1.0], [6700.0, 1.0], [3500.0, 1.0], [900.0, 1.0], [2000.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 3.0], [11000.0, 1.0], [2900.0, 1.0], [1700.0, 1.0], [1900.0, 1.0], [3900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[5100.0, 1.0], [39900.0, 1.0], [2700.0, 1.0], [49300.0, 1.0], [200.0, 1.0], [1700.0, 2.0], [1800.0, 1.0], [900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[0.0, 1.0], [600.0, 3.0], [300.0, 1.0], [1200.0, 1.0], [700.0, 1.0], [13300.0, 1.0], [900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [1300.0, 1.0], [400.0, 1.0], [100.0, 2.0], [1600.0, 2.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[4200.0, 1.0], [4100.0, 1.0], [4500.0, 1.0], [5300.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [3200.0, 1.0], [3300.0, 1.0], [3500.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[0.0, 6.0], [300.0, 19.0], [600.0, 3.0], [800.0, 1.0], [400.0, 5.0], [200.0, 42.0], [1700.0, 1.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 173700.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 11.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1292.0, "series": [{"data": [[0.0, 1292.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 160.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 157.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 11.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.66194276E12, "maxY": 9.94225721784777, "series": [{"data": [[1.66194288E12, 8.746705710102493], [1.66194306E12, 1.0], [1.66194276E12, 9.430267062314536], [1.66194294E12, 3.404494382022472], [1.66194282E12, 9.94225721784777], [1.661943E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194306E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 53.5, "minX": 1.0, "maxY": 173793.0, "series": [{"data": [[1.0, 300.0], [10.0, 324.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[9.1, 321.9]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300-Aggregated", "isController": false}, {"data": [[1.0, 254.0], [10.0, 305.4444444444444]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[9.1, 300.29999999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301-Aggregated", "isController": false}, {"data": [[8.0, 174.66666666666666], [1.0, 71.0], [10.0, 182.0], [6.0, 95.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[7.7, 151.3]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21-Aggregated", "isController": false}, {"data": [[8.0, 69.66666666666667], [1.0, 68.0], [10.0, 69.75], [6.0, 74.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[7.7, 70.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20-Aggregated", "isController": false}, {"data": [[8.0, 151.66666666666666], [1.0, 202.0], [10.0, 165.0], [6.0, 285.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[7.7, 188.70000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22-Aggregated", "isController": false}, {"data": [[8.0, 106.33333333333333], [1.0, 67.0], [10.0, 111.0], [6.0, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[7.7, 97.6]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4-Aggregated", "isController": false}, {"data": [[8.0, 64.33333333333333], [1.0, 70.0], [10.0, 66.25], [6.0, 69.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[7.7, 66.69999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5-Aggregated", "isController": false}, {"data": [[8.0, 86.66666666666667], [1.0, 85.0], [10.0, 85.75], [6.0, 88.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[7.7, 86.40000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6-Aggregated", "isController": false}, {"data": [[8.0, 112.33333333333333], [1.0, 65.0], [10.0, 96.25], [6.0, 240.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[7.7, 126.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7-Aggregated", "isController": false}, {"data": [[8.0, 159.66666666666666], [1.0, 87.0], [10.0, 72.5], [6.0, 306.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[7.7, 146.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8-Aggregated", "isController": false}, {"data": [[8.0, 116.0], [1.0, 65.0], [10.0, 102.0], [6.0, 316.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[7.7, 145.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9-Aggregated", "isController": false}, {"data": [[8.0, 146.0], [1.0, 193.0], [10.0, 70.25], [6.0, 73.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[7.7, 105.9]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10-Aggregated", "isController": false}, {"data": [[8.0, 116.0], [1.0, 71.0], [10.0, 105.75], [6.0, 280.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[7.7, 140.2]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12-Aggregated", "isController": false}, {"data": [[8.0, 124.33333333333333], [1.0, 69.0], [10.0, 76.5], [6.0, 72.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[7.7, 89.29999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11-Aggregated", "isController": false}, {"data": [[8.0, 62.0], [4.0, 76.0], [2.0, 60.0], [1.0, 54.0], [10.0, 59.0], [5.0, 57.0], [6.0, 57.0], [3.0, 69.0], [7.0, 55.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[5.6, 60.800000000000004]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20-Aggregated", "isController": false}, {"data": [[8.0, 68.66666666666667], [1.0, 72.0], [10.0, 80.0], [6.0, 70.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[7.7, 73.9]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14-Aggregated", "isController": false}, {"data": [[8.0, 110.0], [1.0, 66.0], [10.0, 72.75], [6.0, 159.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[7.7, 100.6]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13-Aggregated", "isController": false}, {"data": [[8.0, 68.0], [1.0, 78.0], [10.0, 94.75], [6.0, 176.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[7.7, 101.4]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16-Aggregated", "isController": false}, {"data": [[8.0, 198.0], [4.0, 378.0], [2.0, 199.0], [1.0, 195.0], [10.0, 146.0], [5.0, 201.0], [6.0, 87.0], [3.0, 190.0], [7.0, 215.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[5.6, 195.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23-Aggregated", "isController": false}, {"data": [[8.0, 81.66666666666667], [1.0, 66.0], [10.0, 70.75], [6.0, 273.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[7.7, 113.99999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15-Aggregated", "isController": false}, {"data": [[8.0, 66.66666666666667], [1.0, 77.0], [10.0, 68.25], [6.0, 203.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[7.7, 95.69999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18-Aggregated", "isController": false}, {"data": [[8.0, 68.0], [4.0, 74.0], [2.0, 72.0], [1.0, 69.0], [10.0, 134.0], [5.0, 64.0], [6.0, 71.0], [3.0, 89.0], [7.0, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[5.6, 84.6]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21-Aggregated", "isController": false}, {"data": [[8.0, 72.66666666666667], [1.0, 77.0], [10.0, 72.0], [6.0, 68.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[7.7, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17-Aggregated", "isController": false}, {"data": [[8.0, 193.0], [4.0, 303.0], [2.0, 190.0], [1.0, 184.0], [10.0, 235.0], [5.0, 187.0], [6.0, 193.0], [3.0, 184.0], [7.0, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[5.6, 197.4]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22-Aggregated", "isController": false}, {"data": [[8.0, 55.333333333333336], [1.0, 58.0], [10.0, 53.5], [6.0, 221.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[7.7, 88.00000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19-Aggregated", "isController": false}, {"data": [[1.0, 234.0], [10.0, 303.1111111111111]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[9.1, 296.2]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895-Aggregated", "isController": false}, {"data": [[8.0, 223.0], [1.0, 244.0], [10.0, 269.0], [7.0, 251.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[8.299999999999999, 258.4]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896-Aggregated", "isController": false}, {"data": [[1.0, 197.0], [10.0, 226.22222222222223]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[9.1, 223.3]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9-Aggregated", "isController": false}, {"data": [[8.0, 69.0], [4.0, 91.0], [2.0, 86.0], [1.0, 64.0], [10.0, 67.5], [5.0, 65.0], [6.0, 73.0], [3.0, 67.0], [7.0, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[5.6, 72.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18-Aggregated", "isController": false}, {"data": [[8.0, 76.0], [4.0, 75.0], [2.0, 78.0], [1.0, 65.0], [10.0, 73.5], [5.0, 64.0], [6.0, 66.0], [3.0, 83.0], [7.0, 67.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[5.6, 72.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19-Aggregated", "isController": false}, {"data": [[1.0, 68.0], [10.0, 188.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[9.1, 176.6]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3-Aggregated", "isController": false}, {"data": [[1.0, 178.0], [10.0, 136.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[9.1, 140.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4-Aggregated", "isController": false}, {"data": [[8.0, 70.0], [1.0, 75.0], [10.0, 107.0], [7.0, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[8.299999999999999, 93.3]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19-Aggregated", "isController": false}, {"data": [[1.0, 206.0], [10.0, 175.11111111111111]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[9.1, 178.2]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1-Aggregated", "isController": false}, {"data": [[1.0, 207.0], [10.0, 160.88888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[9.1, 165.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2-Aggregated", "isController": false}, {"data": [[8.0, 854.0], [4.0, 1317.0], [2.0, 1011.0], [1.0, 1118.0], [9.0, 931.0], [10.0, 893.0], [5.0, 1019.0], [6.0, 1077.0], [3.0, 856.0], [7.0, 1137.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[5.5, 1021.2999999999998]], "isOverall": false, "label": "Clearance-Aggregated", "isController": true}, {"data": [[1.0, 182.0], [10.0, 209.77777777777777]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[9.1, 207.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7-Aggregated", "isController": false}, {"data": [[1.0, 189.0], [10.0, 269.8888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[9.1, 261.8]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8-Aggregated", "isController": false}, {"data": [[1.0, 211.0], [10.0, 99.77777777777777]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[9.1, 110.89999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5-Aggregated", "isController": false}, {"data": [[8.0, 204.0], [4.0, 208.0], [2.0, 186.0], [1.0, 77.0], [10.0, 141.5], [5.0, 177.0], [6.0, 212.0], [3.0, 253.0], [7.0, 65.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[5.6, 166.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9-Aggregated", "isController": false}, {"data": [[1.0, 214.0], [10.0, 318.8888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[9.1, 308.40000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6-Aggregated", "isController": false}, {"data": [[8.0, 82.0], [1.0, 127.0], [10.0, 164.0], [7.0, 195.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[8.299999999999999, 158.4]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12-Aggregated", "isController": false}, {"data": [[8.0, 201.0], [4.0, 215.0], [2.0, 187.0], [1.0, 190.0], [10.0, 135.0], [5.0, 175.0], [6.0, 201.0], [3.0, 199.0], [7.0, 271.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[5.6, 190.9]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7-Aggregated", "isController": false}, {"data": [[8.0, 210.0], [1.0, 78.0], [10.0, 173.33333333333334], [7.0, 189.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[8.299999999999999, 170.7]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11-Aggregated", "isController": false}, {"data": [[8.0, 201.0], [4.0, 239.0], [2.0, 181.0], [1.0, 201.0], [10.0, 146.5], [5.0, 182.0], [6.0, 182.0], [3.0, 192.0], [7.0, 229.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[5.6, 190.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8-Aggregated", "isController": false}, {"data": [[8.0, 183.0], [1.0, 72.0], [10.0, 76.16666666666667], [7.0, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[8.299999999999999, 84.39999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14-Aggregated", "isController": false}, {"data": [[8.0, 67.0], [4.0, 71.0], [2.0, 64.0], [1.0, 269.0], [10.0, 72.5], [5.0, 65.0], [6.0, 170.0], [3.0, 68.0], [7.0, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[5.6, 99.10000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5-Aggregated", "isController": false}, {"data": [[8.0, 185.0], [1.0, 66.0], [10.0, 89.16666666666666], [7.0, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[8.299999999999999, 92.39999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13-Aggregated", "isController": false}, {"data": [[8.0, 101.0], [4.0, 91.0], [2.0, 86.0], [1.0, 291.0], [10.0, 92.5], [5.0, 90.0], [6.0, 209.0], [3.0, 96.0], [7.0, 92.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[5.6, 124.1]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6-Aggregated", "isController": false}, {"data": [[8.0, 70.0], [1.0, 68.0], [10.0, 78.16666666666666], [7.0, 67.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[8.299999999999999, 74.19999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16-Aggregated", "isController": false}, {"data": [[8.0, 68.0], [4.0, 218.0], [2.0, 65.0], [1.0, 239.0], [10.0, 87.0], [5.0, 184.0], [6.0, 189.0], [3.0, 85.0], [7.0, 243.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[5.6, 146.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3-Aggregated", "isController": false}, {"data": [[8.0, 73.0], [1.0, 66.0], [10.0, 96.33333333333334], [7.0, 65.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[8.299999999999999, 84.80000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15-Aggregated", "isController": false}, {"data": [[8.0, 71.0], [4.0, 218.0], [2.0, 177.0], [1.0, 245.0], [10.0, 80.0], [5.0, 69.0], [6.0, 182.0], [3.0, 74.0], [7.0, 81.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[5.6, 127.7]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4-Aggregated", "isController": false}, {"data": [[8.0, 64.0], [1.0, 63.0], [10.0, 89.5], [7.0, 64.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[8.299999999999999, 79.3]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18-Aggregated", "isController": false}, {"data": [[8.0, 73.0], [4.0, 71.0], [2.0, 190.0], [1.0, 245.0], [10.0, 70.5], [5.0, 176.0], [6.0, 188.0], [3.0, 69.0], [7.0, 241.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[5.6, 139.4]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1-Aggregated", "isController": false}, {"data": [[8.0, 76.0], [1.0, 69.0], [10.0, 89.33333333333334], [7.0, 87.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[8.299999999999999, 85.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17-Aggregated", "isController": false}, {"data": [[8.0, 78.0], [4.0, 238.0], [2.0, 185.0], [1.0, 85.0], [10.0, 78.5], [5.0, 176.0], [6.0, 64.0], [3.0, 75.0], [7.0, 238.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[5.6, 129.6]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2-Aggregated", "isController": false}, {"data": [[8.0, 198.0], [4.0, 201.0], [2.0, 79.0], [1.0, 130.0], [10.0, 162.0], [5.0, 238.0], [6.0, 229.0], [3.0, 181.0], [7.0, 245.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[5.6, 182.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12-Aggregated", "isController": false}, {"data": [[8.0, 140.0], [4.0, 298.0], [2.0, 264.0], [1.0, 188.0], [10.0, 161.5], [5.0, 297.0], [6.0, 277.0], [3.0, 180.0], [7.0, 284.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[5.6, 225.10000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0-Aggregated", "isController": false}, {"data": [[8.0, 70.0], [4.0, 75.0], [2.0, 75.0], [1.0, 197.0], [10.0, 139.5], [5.0, 69.0], [6.0, 74.0], [3.0, 69.0], [7.0, 244.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[5.6, 115.2]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13-Aggregated", "isController": false}, {"data": [[8.0, 213.0], [4.0, 235.0], [2.0, 201.0], [1.0, 210.0], [10.0, 90.0], [5.0, 63.0], [6.0, 208.0], [3.0, 73.0], [7.0, 68.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[5.6, 145.10000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10-Aggregated", "isController": false}, {"data": [[8.0, 197.0], [4.0, 235.0], [2.0, 193.0], [1.0, 180.0], [10.0, 207.5], [5.0, 63.0], [6.0, 201.0], [3.0, 205.0], [7.0, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[5.6, 175.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11-Aggregated", "isController": false}, {"data": [[8.0, 69.0], [4.0, 198.0], [2.0, 72.0], [1.0, 89.0], [10.0, 76.0], [5.0, 63.0], [6.0, 66.0], [3.0, 73.0], [7.0, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[5.6, 84.8]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16-Aggregated", "isController": false}, {"data": [[8.0, 73.0], [4.0, 77.0], [2.0, 64.0], [1.0, 73.0], [10.0, 70.0], [5.0, 68.0], [6.0, 83.0], [3.0, 64.0], [7.0, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[5.6, 71.3]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17-Aggregated", "isController": false}, {"data": [[8.0, 191.0], [1.0, 96.0], [10.0, 158.83333333333334], [7.0, 198.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[8.299999999999999, 163.70000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10-Aggregated", "isController": false}, {"data": [[8.0, 70.0], [4.0, 76.0], [2.0, 65.0], [1.0, 77.0], [10.0, 73.0], [5.0, 69.0], [6.0, 71.0], [3.0, 67.0], [7.0, 99.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[5.6, 74.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14-Aggregated", "isController": false}, {"data": [[8.0, 70.0], [4.0, 78.0], [2.0, 76.0], [1.0, 92.0], [10.0, 137.5], [5.0, 69.0], [6.0, 66.0], [3.0, 97.0], [7.0, 74.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[5.6, 89.7]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15-Aggregated", "isController": false}, {"data": [[4.0, 3549.0], [10.0, 676.3333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[9.4, 963.6]], "isOverall": false, "label": "https://www.banglashoppers.com/-19-Aggregated", "isController": false}, {"data": [[8.0, 89.8], [4.0, 149.0], [2.0, 101.0], [1.0, 98.75], [10.0, 105.76666666666667], [5.0, 91.0], [6.0, 154.33333333333334], [3.0, 74.0], [7.0, 93.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[8.02, 106.47999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json-Aggregated", "isController": false}, {"data": [[1.0, 3860.0], [10.0, 8674.222222222223]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[9.1, 8192.800000000001]], "isOverall": false, "label": "Makeupshop-Aggregated", "isController": true}, {"data": [[8.0, 703.0], [4.0, 1173.0], [2.0, 851.0], [1.0, 968.0], [10.0, 752.0], [5.0, 870.0], [6.0, 932.0], [3.0, 728.0], [7.0, 967.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[5.6, 869.5999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-Aggregated", "isController": false}, {"data": [[4.0, 170218.0], [10.0, 947.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[9.4, 17874.7]], "isOverall": false, "label": "https://www.banglashoppers.com/-11-Aggregated", "isController": false}, {"data": [[4.0, 414.0], [10.0, 556.8888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[9.4, 542.6]], "isOverall": false, "label": "https://www.banglashoppers.com/-12-Aggregated", "isController": false}, {"data": [[4.0, 384.0], [10.0, 510.7777777777779]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[9.4, 498.1000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/-13-Aggregated", "isController": false}, {"data": [[4.0, 891.0], [10.0, 4314.777777777777]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[9.4, 3972.3999999999996]], "isOverall": false, "label": "https://www.banglashoppers.com/-14-Aggregated", "isController": false}, {"data": [[4.0, 2485.0], [10.0, 7938.777777777777]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[9.4, 7393.4]], "isOverall": false, "label": "https://www.banglashoppers.com/-15-Aggregated", "isController": false}, {"data": [[4.0, 1104.0], [10.0, 1609.2222222222222]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[9.4, 1558.7]], "isOverall": false, "label": "https://www.banglashoppers.com/-16-Aggregated", "isController": false}, {"data": [[4.0, 27730.0], [10.0, 1546.888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[9.4, 4165.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-17-Aggregated", "isController": false}, {"data": [[4.0, 861.0], [10.0, 282.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[9.4, 339.9]], "isOverall": false, "label": "https://www.banglashoppers.com/-18-Aggregated", "isController": false}, {"data": [[8.0, 263.0], [1.0, 226.0], [10.0, 254.25], [6.0, 234.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[7.7, 250.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696-Aggregated", "isController": false}, {"data": [[4.0, 135.0], [10.0, 1061.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[9.4, 968.4]], "isOverall": false, "label": "https://www.banglashoppers.com/-10-Aggregated", "isController": false}, {"data": [[1.0, 2626.0], [10.0, 7030.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[9.1, 6589.6]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-Aggregated", "isController": false}, {"data": [[4.0, 173521.0], [10.0, 33745.22222222222]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[9.4, 47722.799999999996]], "isOverall": false, "label": "https://www.banglashoppers.com/-Aggregated", "isController": false}, {"data": [[8.0, 246.0], [1.0, 238.0], [10.0, 244.75], [6.0, 268.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[7.7, 249.20000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695-Aggregated", "isController": false}, {"data": [[4.0, 400.0], [10.0, 125.55555555555557]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[9.4, 153.00000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/-22-Aggregated", "isController": false}, {"data": [[4.0, 1292.0], [10.0, 2826.444444444444]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[9.4, 2672.9999999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/-23-Aggregated", "isController": false}, {"data": [[4.0, 3339.0], [10.0, 962.5555555555555]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[9.4, 1200.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-24-Aggregated", "isController": false}, {"data": [[8.0, 1806.6666666666667], [1.0, 1726.0], [10.0, 1995.0], [6.0, 2365.5]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[7.7, 1985.7]], "isOverall": false, "label": "Combo-Aggregated", "isController": true}, {"data": [[4.0, 230.0], [10.0, 3081.3333333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[9.4, 2796.2000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/-25-Aggregated", "isController": false}, {"data": [[4.0, 106.0], [10.0, 189.11111111111111]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[9.4, 180.8]], "isOverall": false, "label": "https://www.banglashoppers.com/-26-Aggregated", "isController": false}, {"data": [[4.0, 2363.0], [10.0, 1370.888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[9.4, 1470.1]], "isOverall": false, "label": "https://www.banglashoppers.com/-27-Aggregated", "isController": false}, {"data": [[4.0, 1615.0], [10.0, 318.77777777777777]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[9.4, 448.4]], "isOverall": false, "label": "https://www.banglashoppers.com/-28-Aggregated", "isController": false}, {"data": [[4.0, 208.0], [10.0, 200.88888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[9.4, 201.6]], "isOverall": false, "label": "https://www.banglashoppers.com/-29-Aggregated", "isController": false}, {"data": [[4.0, 459.0], [10.0, 299.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[9.4, 315.6]], "isOverall": false, "label": "https://www.banglashoppers.com/-20-Aggregated", "isController": false}, {"data": [[4.0, 1751.0], [10.0, 185.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[9.4, 341.9]], "isOverall": false, "label": "https://www.banglashoppers.com/-21-Aggregated", "isController": false}, {"data": [[8.0, 618.0], [1.0, 602.0], [10.0, 618.75], [6.0, 1090.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[7.7, 711.0999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-Aggregated", "isController": false}, {"data": [[4.0, 958.0], [10.0, 1248.222222222222]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[9.4, 1219.1999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/-33-Aggregated", "isController": false}, {"data": [[8.0, 261.0], [1.0, 77.0], [10.0, 178.83333333333334], [7.0, 202.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[8.299999999999999, 181.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3-Aggregated", "isController": false}, {"data": [[4.0, 1762.0], [10.0, 1450.4444444444443]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[9.4, 1481.6]], "isOverall": false, "label": "https://www.banglashoppers.com/-34-Aggregated", "isController": false}, {"data": [[8.0, 199.0], [1.0, 102.0], [10.0, 149.5], [7.0, 129.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[8.299999999999999, 145.7]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2-Aggregated", "isController": false}, {"data": [[8.0, 219.0], [1.0, 301.0], [10.0, 116.33333333333333], [7.0, 130.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[8.299999999999999, 147.79999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1-Aggregated", "isController": false}, {"data": [[8.0, 580.0], [1.0, 625.0], [10.0, 344.0], [7.0, 557.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[8.299999999999999, 438.3]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0-Aggregated", "isController": false}, {"data": [[1.0, 1824.0], [10.0, 3820.3333333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[9.1, 3620.7000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22-Aggregated", "isController": false}, {"data": [[8.0, 61.0], [1.0, 72.0], [10.0, 183.0], [7.0, 203.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[8.299999999999999, 163.7]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7-Aggregated", "isController": false}, {"data": [[1.0, 57.0], [10.0, 152.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[9.1, 142.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21-Aggregated", "isController": false}, {"data": [[8.0, 403.0], [1.0, 108.0], [10.0, 183.83333333333331], [7.0, 232.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[8.299999999999999, 207.9]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6-Aggregated", "isController": false}, {"data": [[1.0, 223.0], [10.0, 462.66666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[9.1, 438.7]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24-Aggregated", "isController": false}, {"data": [[8.0, 374.0], [1.0, 119.0], [10.0, 168.83333333333331], [7.0, 192.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[8.299999999999999, 189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5-Aggregated", "isController": false}, {"data": [[1.0, 207.0], [10.0, 376.8888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[9.1, 359.90000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23-Aggregated", "isController": false}, {"data": [[8.0, 200.0], [1.0, 102.0], [10.0, 159.83333333333334], [7.0, 190.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[8.299999999999999, 164.1]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4-Aggregated", "isController": false}, {"data": [[8.0, 2472.0], [1.0, 1283.0], [10.0, 989.0], [7.0, 1238.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[8.299999999999999, 1216.6]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-Aggregated", "isController": false}, {"data": [[8.0, 198.0], [1.0, 201.0], [10.0, 175.16666666666666], [7.0, 183.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[8.299999999999999, 181.7]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23-Aggregated", "isController": false}, {"data": [[8.0, 240.0], [1.0, 194.0], [10.0, 188.16666666666669], [7.0, 214.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[8.299999999999999, 199.1]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22-Aggregated", "isController": false}, {"data": [[1.0, 67.0], [10.0, 134.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[9.1, 127.60000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20-Aggregated", "isController": false}, {"data": [[8.0, 201.0], [1.0, 92.0], [10.0, 168.16666666666669], [7.0, 131.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[8.299999999999999, 156.39999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9-Aggregated", "isController": false}, {"data": [[8.0, 72.0], [1.0, 76.0], [10.0, 173.5], [7.0, 184.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[8.299999999999999, 155.7]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8-Aggregated", "isController": false}, {"data": [[8.0, 229.5], [1.0, 227.0], [10.0, 326.6], [7.0, 282.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[8.1, 288.29999999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372-Aggregated", "isController": false}, {"data": [[4.0, 2823.0], [10.0, 2169.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[9.4, 2234.4]], "isOverall": false, "label": "https://www.banglashoppers.com/-30-Aggregated", "isController": false}, {"data": [[1.0, 322.0], [10.0, 2587.5555555555557]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[9.1, 2361.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0-Aggregated", "isController": false}, {"data": [[4.0, 534.0], [10.0, 690.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[9.4, 674.4]], "isOverall": false, "label": "https://www.banglashoppers.com/-31-Aggregated", "isController": false}, {"data": [[4.0, 27453.0], [10.0, 21814.88888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[9.4, 22378.7]], "isOverall": false, "label": "https://www.banglashoppers.com/-32-Aggregated", "isController": false}, {"data": [[8.0, 225.0], [1.0, 253.0], [10.0, 384.6], [7.0, 381.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[8.1, 338.90000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371-Aggregated", "isController": false}, {"data": [[8.0, 67.0], [1.0, 83.0], [10.0, 79.83333333333333], [7.0, 66.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[8.299999999999999, 76.2]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21-Aggregated", "isController": false}, {"data": [[8.0, 60.0], [1.0, 56.0], [10.0, 79.33333333333334], [7.0, 55.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[8.299999999999999, 70.30000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20-Aggregated", "isController": false}, {"data": [[1.0, 70.0], [10.0, 164.11111111111111]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[9.1, 154.7]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19-Aggregated", "isController": false}, {"data": [[1.0, 74.0], [10.0, 119.55555555555556]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[9.1, 115.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18-Aggregated", "isController": false}, {"data": [[1.0, 74.0], [10.0, 268.77777777777777]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[9.1, 249.29999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15-Aggregated", "isController": false}, {"data": [[1.0, 64.0], [10.0, 157.8888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[9.1, 148.50000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14-Aggregated", "isController": false}, {"data": [[1.0, 64.0], [10.0, 120.44444444444444]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[9.1, 114.8]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17-Aggregated", "isController": false}, {"data": [[1.0, 70.0], [10.0, 146.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[9.1, 138.70000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16-Aggregated", "isController": false}, {"data": [[1.0, 196.0], [10.0, 295.8888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[9.1, 285.90000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11-Aggregated", "isController": false}, {"data": [[1.0, 183.0], [10.0, 247.11111111111111]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[9.1, 240.7]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10-Aggregated", "isController": false}, {"data": [[1.0, 81.0], [10.0, 643.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[9.1, 586.8]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13-Aggregated", "isController": false}, {"data": [[1.0, 196.0], [10.0, 214.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[9.1, 212.79999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12-Aggregated", "isController": false}, {"data": [[8.0, 62.6], [4.0, 59.0], [2.0, 59.0], [1.0, 60.25], [9.0, 63.0], [10.0, 75.57142857142857], [5.0, 58.0], [6.0, 60.333333333333336], [3.0, 54.0], [7.0, 429.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[7.979999999999997, 91.06]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?-Aggregated", "isController": false}, {"data": [[8.0, 115.66666666666667], [1.0, 150.0], [10.0, 155.75], [6.0, 146.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[7.7, 141.3]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0-Aggregated", "isController": false}, {"data": [[8.0, 71.33333333333333], [1.0, 83.0], [10.0, 73.0], [6.0, 74.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[7.7, 73.8]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1-Aggregated", "isController": false}, {"data": [[8.0, 73.0], [1.0, 70.0], [10.0, 67.0], [6.0, 173.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[7.7, 90.3]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2-Aggregated", "isController": false}, {"data": [[8.0, 116.33333333333333], [1.0, 75.0], [10.0, 119.25], [6.0, 74.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[7.7, 104.9]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3-Aggregated", "isController": false}, {"data": [[4.0, 173793.0], [10.0, 33976.22222222222]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[9.4, 47957.899999999994]], "isOverall": false, "label": "Home-Aggregated", "isController": true}, {"data": [[4.0, 1798.0], [10.0, 2892.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[9.4, 2782.6]], "isOverall": false, "label": "https://www.banglashoppers.com/-0-Aggregated", "isController": false}, {"data": [[4.0, 8404.0], [10.0, 7157.777777777777]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[9.4, 7282.4]], "isOverall": false, "label": "https://www.banglashoppers.com/-1-Aggregated", "isController": false}, {"data": [[4.0, 257.0], [10.0, 2142.3333333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[9.4, 1953.8000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/-2-Aggregated", "isController": false}, {"data": [[4.0, 86.0], [10.0, 1171.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[9.4, 1063.1000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-Aggregated", "isController": false}, {"data": [[4.0, 566.0], [10.0, 1415.888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[9.4, 1330.9]], "isOverall": false, "label": "https://www.banglashoppers.com/-4-Aggregated", "isController": false}, {"data": [[4.0, 1074.0], [10.0, 2932.333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[9.4, 2746.5000000000005]], "isOverall": false, "label": "https://www.banglashoppers.com/-5-Aggregated", "isController": false}, {"data": [[4.0, 321.0], [10.0, 2829.555555555555]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[9.4, 2578.7]], "isOverall": false, "label": "https://www.banglashoppers.com/-6-Aggregated", "isController": false}, {"data": [[4.0, 2739.0], [10.0, 11450.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[9.4, 10578.9]], "isOverall": false, "label": "https://www.banglashoppers.com/-7-Aggregated", "isController": false}, {"data": [[4.0, 81.0], [10.0, 2284.9999999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[9.4, 2064.5999999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/-8-Aggregated", "isController": false}, {"data": [[4.0, 70.0], [10.0, 836.7777777777778]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[9.4, 760.1]], "isOverall": false, "label": "https://www.banglashoppers.com/-9-Aggregated", "isController": false}, {"data": [[8.0, 4277.5], [1.0, 3539.0], [10.0, 3659.4], [7.0, 3952.5]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[8.1, 3829.6000000000004]], "isOverall": false, "label": "HotOffers-Aggregated", "isController": true}, {"data": [[8.0, 254.375], [4.0, 262.0], [1.0, 271.33333333333337], [10.0, 354.1607142857142], [7.0, 230.875]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}, {"data": [[8.674999999999997, 323.3375]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 839.5, "minX": 1.66194276E12, "maxY": 1640348.5166666666, "series": [{"data": [[1.66194288E12, 253285.08333333334], [1.66194306E12, 9566.483333333334], [1.66194276E12, 390762.2833333333], [1.66194294E12, 204890.3], [1.66194282E12, 1640348.5166666666], [1.661943E12, 23858.316666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66194288E12, 19214.25], [1.66194306E12, 839.5], [1.66194276E12, 4196.55], [1.66194294E12, 5742.6], [1.66194282E12, 13527.9], [1.661943E12, 1764.4166666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194306E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 54.0, "minX": 1.66194276E12, "maxY": 173793.0, "series": [{"data": [[1.66194294E12, 300.0], [1.66194282E12, 324.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66194294E12, 254.0], [1.66194282E12, 305.4444444444444]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66194288E12, 160.22222222222223], [1.661943E12, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66194288E12, 70.66666666666667], [1.661943E12, 68.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66194288E12, 187.22222222222223], [1.661943E12, 202.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66194288E12, 100.99999999999999], [1.661943E12, 67.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66194288E12, 66.33333333333333], [1.661943E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66194288E12, 86.55555555555557], [1.661943E12, 85.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66194288E12, 133.66666666666666], [1.661943E12, 65.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66194288E12, 153.44444444444446], [1.661943E12, 87.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66194288E12, 154.33333333333334], [1.661943E12, 65.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66194288E12, 96.22222222222223], [1.661943E12, 193.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66194288E12, 147.88888888888889], [1.661943E12, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66194288E12, 91.55555555555554], [1.661943E12, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66194288E12, 58.75], [1.66194306E12, 54.0], [1.66194294E12, 63.8]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66194288E12, 74.11111111111111], [1.661943E12, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66194288E12, 104.44444444444444], [1.661943E12, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66194288E12, 104.0], [1.661943E12, 78.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66194288E12, 176.25], [1.66194306E12, 195.0], [1.66194294E12, 211.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66194288E12, 119.33333333333331], [1.661943E12, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66194288E12, 97.77777777777777], [1.661943E12, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66194288E12, 101.75], [1.66194306E12, 69.0], [1.66194294E12, 74.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66194288E12, 71.44444444444444], [1.661943E12, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66194288E12, 183.25], [1.66194306E12, 184.0], [1.66194294E12, 211.4]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66194288E12, 91.33333333333334], [1.661943E12, 58.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66194294E12, 234.0], [1.66194282E12, 303.1111111111111]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66194288E12, 260.0], [1.661943E12, 244.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66194294E12, 197.0], [1.66194282E12, 226.22222222222223]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66194288E12, 68.75], [1.66194306E12, 64.0], [1.66194294E12, 76.4]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66194288E12, 72.5], [1.66194306E12, 65.0], [1.66194294E12, 73.2]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66194294E12, 68.0], [1.66194282E12, 188.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66194294E12, 178.0], [1.66194282E12, 136.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66194288E12, 95.33333333333333], [1.661943E12, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66194294E12, 206.0], [1.66194282E12, 175.11111111111111]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66194294E12, 207.0], [1.66194282E12, 160.88888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66194288E12, 1029.875], [1.66194294E12, 856.0], [1.661943E12, 1118.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66194294E12, 182.0], [1.66194282E12, 209.77777777777777]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66194294E12, 189.0], [1.66194282E12, 269.8888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66194294E12, 211.0], [1.66194282E12, 99.77777777777777]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66194288E12, 138.0], [1.66194306E12, 77.0], [1.66194294E12, 207.2]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66194294E12, 214.0], [1.66194282E12, 318.8888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66194288E12, 161.88888888888889], [1.661943E12, 127.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66194288E12, 185.5], [1.66194306E12, 190.0], [1.66194294E12, 195.4]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66194288E12, 181.0], [1.661943E12, 78.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66194288E12, 180.75], [1.66194306E12, 201.0], [1.66194294E12, 195.2]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66194288E12, 85.77777777777777], [1.661943E12, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66194288E12, 71.0], [1.66194306E12, 269.0], [1.66194294E12, 87.6]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66194288E12, 95.33333333333331], [1.661943E12, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66194288E12, 94.5], [1.66194306E12, 291.0], [1.66194294E12, 114.4]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66194288E12, 74.88888888888887], [1.661943E12, 68.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66194288E12, 121.25], [1.66194306E12, 239.0], [1.66194294E12, 148.2]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66194288E12, 86.8888888888889], [1.661943E12, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66194288E12, 78.0], [1.66194306E12, 245.0], [1.66194294E12, 144.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66194288E12, 81.11111111111111], [1.661943E12, 63.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66194288E12, 113.75], [1.66194306E12, 245.0], [1.66194294E12, 138.8]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66194288E12, 87.33333333333333], [1.661943E12, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66194288E12, 118.25], [1.66194306E12, 85.0], [1.66194294E12, 147.6]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66194288E12, 191.75], [1.66194306E12, 130.0], [1.66194294E12, 185.6]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66194288E12, 186.75], [1.66194306E12, 188.0], [1.66194294E12, 263.2]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66194288E12, 148.25], [1.66194306E12, 197.0], [1.66194294E12, 72.4]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66194288E12, 115.25], [1.66194306E12, 210.0], [1.66194294E12, 156.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66194288E12, 169.5], [1.66194306E12, 180.0], [1.66194294E12, 179.4]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66194288E12, 71.75], [1.66194306E12, 89.0], [1.66194294E12, 94.4]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66194288E12, 71.0], [1.66194306E12, 73.0], [1.66194294E12, 71.2]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66194288E12, 171.22222222222223], [1.661943E12, 96.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66194288E12, 78.75], [1.66194306E12, 77.0], [1.66194294E12, 69.6]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66194288E12, 104.75], [1.66194306E12, 92.0], [1.66194294E12, 77.2]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.66194276E12, 963.6]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66194288E12, 101.5], [1.66194306E12, 93.0], [1.66194276E12, 120.0], [1.66194294E12, 106.28571428571428], [1.66194282E12, 113.29411764705883], [1.661943E12, 104.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66194294E12, 3860.0], [1.66194282E12, 8674.222222222223]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66194288E12, 793.5], [1.66194306E12, 968.0], [1.66194294E12, 910.8]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.66194276E12, 947.6666666666667], [1.66194294E12, 170218.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.66194276E12, 542.6]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.66194276E12, 498.1000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.66194276E12, 3972.3999999999996]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.66194276E12, 1839.375], [1.66194282E12, 29609.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.66194276E12, 1558.7]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.66194276E12, 1546.888888888889], [1.66194282E12, 27730.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.66194276E12, 339.9]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66194288E12, 252.66666666666666], [1.661943E12, 226.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.66194276E12, 968.4]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66194294E12, 2626.0], [1.66194282E12, 7030.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.66194276E12, 17010.0], [1.66194294E12, 173521.0], [1.66194282E12, 35837.125]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66194288E12, 250.44444444444446], [1.661943E12, 238.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.66194276E12, 153.00000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.66194276E12, 622.2222222222222], [1.66194282E12, 21130.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.66194276E12, 1200.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66194288E12, 2014.5555555555557], [1.661943E12, 1726.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.66194276E12, 846.0], [1.66194282E12, 20348.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.66194276E12, 180.8]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.66194276E12, 1470.1]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.66194276E12, 448.4]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.66194276E12, 201.6]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.66194276E12, 315.6]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.66194276E12, 341.9]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66194288E12, 723.2222222222222], [1.661943E12, 602.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.66194276E12, 1219.1999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66194288E12, 193.11111111111111], [1.661943E12, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.66194276E12, 1481.6]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66194288E12, 150.55555555555554], [1.661943E12, 102.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66194288E12, 130.77777777777777], [1.661943E12, 301.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66194288E12, 417.55555555555554], [1.661943E12, 625.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66194294E12, 1824.0], [1.66194282E12, 3820.3333333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66194288E12, 173.88888888888889], [1.661943E12, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66194294E12, 57.0], [1.66194282E12, 152.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66194288E12, 219.0], [1.661943E12, 108.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66194294E12, 223.0], [1.66194282E12, 462.66666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66194288E12, 196.77777777777777], [1.661943E12, 119.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66194294E12, 207.0], [1.66194282E12, 376.8888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66194288E12, 171.0], [1.661943E12, 102.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66194288E12, 1209.2222222222222], [1.661943E12, 1283.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66194288E12, 179.55555555555554], [1.661943E12, 201.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66194288E12, 199.66666666666666], [1.661943E12, 194.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66194294E12, 67.0], [1.66194282E12, 134.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66194288E12, 163.55555555555554], [1.661943E12, 92.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66194288E12, 164.55555555555554], [1.661943E12, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66194288E12, 295.1111111111111], [1.661943E12, 227.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.66194276E12, 1145.111111111111], [1.66194282E12, 12038.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66194294E12, 322.0], [1.66194282E12, 2587.5555555555557]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.66194276E12, 674.4]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.66194276E12, 10955.0], [1.66194282E12, 23648.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66194288E12, 348.44444444444446], [1.661943E12, 253.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66194288E12, 75.44444444444444], [1.661943E12, 83.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66194288E12, 71.8888888888889], [1.661943E12, 56.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66194294E12, 70.0], [1.66194282E12, 164.11111111111111]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66194294E12, 74.0], [1.66194282E12, 119.55555555555556]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66194294E12, 74.0], [1.66194282E12, 268.77777777777777]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66194294E12, 64.0], [1.66194282E12, 157.8888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66194294E12, 64.0], [1.66194282E12, 120.44444444444444]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66194294E12, 70.0], [1.66194282E12, 146.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66194294E12, 196.0], [1.66194282E12, 295.8888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66194294E12, 183.0], [1.66194282E12, 247.11111111111111]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66194294E12, 81.0], [1.66194282E12, 643.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66194294E12, 196.0], [1.66194282E12, 214.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66194288E12, 110.36363636363636], [1.66194306E12, 57.0], [1.66194276E12, 403.0], [1.66194294E12, 58.57142857142857], [1.66194282E12, 66.6470588235294], [1.661943E12, 61.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66194288E12, 140.33333333333334], [1.661943E12, 150.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66194288E12, 72.77777777777777], [1.661943E12, 83.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66194288E12, 92.55555555555556], [1.661943E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66194288E12, 108.22222222222223], [1.661943E12, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.66194276E12, 17533.0], [1.66194294E12, 173793.0], [1.66194282E12, 36031.625]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.66194276E12, 2782.6]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.66194276E12, 7282.4]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.66194276E12, 1953.8000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.66194276E12, 1063.1000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.66194276E12, 1330.9]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66194276E12, 2746.5000000000005]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.66194276E12, 2578.7]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.66194276E12, 2072.75], [1.66194282E12, 44603.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.66194276E12, 811.8888888888889], [1.66194282E12, 13339.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.66194276E12, 760.1]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66194294E12, 3539.0], [1.66194282E12, 3861.888888888889]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.66194288E12, 288.0833333333334], [1.66194276E12, 1150.0], [1.66194294E12, 254.75], [1.66194282E12, 324.82352941176464], [1.661943E12, 283.25]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194306E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66194276E12, "maxY": 24587.5, "series": [{"data": [[1.66194294E12, 300.0], [1.66194282E12, 283.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66194294E12, 254.0], [1.66194282E12, 266.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66194288E12, 81.88888888888889], [1.661943E12, 78.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66194288E12, 147.33333333333334], [1.661943E12, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66194288E12, 13.75], [1.66194306E12, 0.0], [1.66194294E12, 27.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66194288E12, 104.44444444444444], [1.661943E12, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66194288E12, 18.333333333333332], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66194294E12, 234.0], [1.66194282E12, 302.5555555555556]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66194288E12, 259.77777777777777], [1.661943E12, 244.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66194288E12, 220.0], [1.66194294E12, 153.0], [1.661943E12, 181.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66194294E12, 210.0], [1.66194282E12, 271.55555555555554]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66194288E12, 149.77777777777777], [1.661943E12, 78.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66194288E12, 85.66666666666667], [1.661943E12, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66194288E12, 94.22222222222223], [1.661943E12, 65.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66194288E12, 86.5], [1.66194306E12, 291.0], [1.66194294E12, 107.8]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66194288E12, 186.0], [1.66194306E12, 75.0], [1.66194294E12, 174.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66194288E12, 124.0], [1.66194306E12, 124.0], [1.66194294E12, 174.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66194288E12, 148.25], [1.66194306E12, 197.0], [1.66194294E12, 72.2]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66194288E12, 77.25], [1.66194306E12, 76.0], [1.66194294E12, 69.6]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.66194276E12, 749.9000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194276E12, 114.0], [1.66194294E12, 31.0], [1.66194282E12, 59.41176470588235], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66194294E12, 1242.0], [1.66194282E12, 1544.6666666666667]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66194288E12, 124.0], [1.66194306E12, 124.0], [1.66194294E12, 174.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.66194276E12, 134.55555555555554], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.66194276E12, 292.7]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.66194276E12, 207.4]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.66194276E12, 195.3]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.66194276E12, 351.625], [1.66194282E12, 174.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.66194276E12, 335.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.66194276E12, 518.4444444444445], [1.66194282E12, 5996.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.66194276E12, 339.7]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66194288E12, 252.66666666666666], [1.661943E12, 226.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.66194276E12, 968.4]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66194294E12, 102.0], [1.66194282E12, 278.22222222222223]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.66194276E12, 808.0], [1.66194294E12, 1412.0], [1.66194282E12, 1252.9999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66194288E12, 250.44444444444446], [1.661943E12, 238.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.66194276E12, 151.9]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.66194276E12, 198.88888888888889], [1.66194282E12, 1432.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.66194276E12, 741.6]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66194288E12, 1269.5555555555557], [1.661943E12, 1107.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.66194276E12, 352.1111111111111], [1.66194282E12, 106.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.66194276E12, 180.8]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.66194276E12, 465.7]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.66194276E12, 332.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.66194276E12, 163.3]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.66194276E12, 249.19999999999996]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.66194276E12, 177.20000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66194288E12, 92.88888888888889], [1.661943E12, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.66194276E12, 1219.1999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.66194276E12, 792.8000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66194288E12, 224.11111111111111], [1.661943E12, 130.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66194294E12, 66.0], [1.66194282E12, 112.77777777777777]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66194294E12, 57.0], [1.66194282E12, 36.77777777777778]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66194288E12, 216.55555555555554], [1.661943E12, 97.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66194288E12, 224.11111111111111], [1.661943E12, 130.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66194288E12, 295.1111111111111], [1.661943E12, 227.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.66194276E12, 253.55555555555554], [1.66194282E12, 5569.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66194294E12, 102.0], [1.66194282E12, 278.22222222222223]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.66194276E12, 674.1999999999998]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.66194276E12, 1034.0], [1.66194282E12, 239.55555555555551]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66194288E12, 348.44444444444446], [1.661943E12, 252.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66194288E12, 46.22222222222222], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66194294E12, 74.0], [1.66194282E12, 155.11111111111111]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66194294E12, 64.0], [1.66194282E12, 82.88888888888889]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66194294E12, 195.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66194294E12, 70.0], [1.66194282E12, 130.44444444444446]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66194294E12, 196.0], [1.66194282E12, 213.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66194288E12, 110.36363636363636], [1.66194306E12, 57.0], [1.66194276E12, 403.0], [1.66194294E12, 58.57142857142857], [1.66194282E12, 66.6470588235294], [1.661943E12, 61.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66194288E12, 92.88888888888889], [1.661943E12, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.66194276E12, 1325.0], [1.66194294E12, 1684.0], [1.66194282E12, 1446.125]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.66194276E12, 1224.4]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.66194276E12, 460.79999999999995]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.66194276E12, 536.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.66194276E12, 603.4]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.66194276E12, 1216.3000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66194276E12, 771.9]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.66194276E12, 1259.2000000000003]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.66194276E12, 376.625], [1.66194282E12, 24587.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.66194276E12, 290.6666666666667], [1.66194282E12, 11845.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.66194276E12, 760.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66194294E12, 2270.0], [1.66194282E12, 2774.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.66194288E12, 286.6388888888889], [1.66194276E12, 451.0], [1.66194294E12, 254.75], [1.66194282E12, 312.3235294117647], [1.661943E12, 282.5]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194306E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66194276E12, "maxY": 170218.0, "series": [{"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66194288E12, 66.22222222222223], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66194288E12, 105.11111111111111], [1.661943E12, 107.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66194288E12, 25.000000000000004], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66194288E12, 24.88888888888889], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66194288E12, 79.22222222222223], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66194288E12, 64.66666666666666], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66194288E12, 24.0], [1.661943E12, 112.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66194288E12, 26.666666666666668], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66194288E12, 14.222222222222225], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66194288E12, 12.333333333333334], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66194288E12, 27.333333333333332], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66194288E12, 92.0], [1.66194306E12, 114.0], [1.66194294E12, 125.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66194288E12, 37.44444444444444], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66194288E12, 30.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66194288E12, 29.25], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66194288E12, 85.75], [1.66194306E12, 112.0], [1.66194294E12, 115.6]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66194294E12, 120.0], [1.66194282E12, 140.55555555555554]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 70.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66194294E12, 114.0], [1.66194282E12, 50.55555555555556]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66194288E12, 24.222222222222225], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66194294E12, 130.0], [1.66194282E12, 43.666666666666664]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66194294E12, 122.0], [1.66194282E12, 78.77777777777777]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66194288E12, 61.375], [1.66194294E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66194294E12, 109.0], [1.66194282E12, 121.55555555555557]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66194294E12, 116.0], [1.66194282E12, 120.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66194294E12, 115.0], [1.66194282E12, 25.22222222222222]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66194288E12, 63.25], [1.66194306E12, 0.0], [1.66194294E12, 120.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66194294E12, 133.0], [1.66194282E12, 172.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66194288E12, 76.77777777777779], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66194288E12, 104.5], [1.66194306E12, 124.0], [1.66194294E12, 117.2]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66194288E12, 104.88888888888889], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66194288E12, 108.75], [1.66194306E12, 129.0], [1.66194294E12, 120.2]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66194288E12, 12.444444444444445], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 210.0], [1.66194294E12, 21.400000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66194288E12, 24.777777777777775], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 208.0], [1.66194294E12, 24.400000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66194288E12, 32.5], [1.66194306E12, 164.0], [1.66194294E12, 71.4]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66194288E12, 13.666666666666668], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 164.0], [1.66194294E12, 71.6]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66194288E12, 12.777777777777777], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66194288E12, 31.0], [1.66194306E12, 164.0], [1.66194294E12, 68.60000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66194288E12, 12.555555555555559], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66194288E12, 30.5], [1.66194306E12, 0.0], [1.66194294E12, 71.4]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66194288E12, 104.5], [1.66194306E12, 0.0], [1.66194294E12, 93.2]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66194288E12, 31.75], [1.66194306E12, 0.0], [1.66194294E12, 72.8]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66194288E12, 75.25], [1.66194306E12, 129.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66194288E12, 36.25], [1.66194306E12, 135.0], [1.66194294E12, 72.4]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66194288E12, 97.75], [1.66194306E12, 115.0], [1.66194294E12, 100.8]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 26.8]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66194288E12, 93.88888888888889], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66194288E12, 30.999999999999996], [1.66194306E12, 0.0], [1.66194294E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.66194276E12, 503.1]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194276E12, 0.0], [1.66194294E12, 15.999999999999998], [1.66194282E12, 6.9411764705882355], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 70.88888888888889]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66194288E12, 31.75], [1.66194306E12, 0.0], [1.66194294E12, 72.8]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.66194276E12, 20.888888888888893], [1.66194294E12, 170218.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.66194276E12, 154.20000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.66194276E12, 19.8]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.66194276E12, 48.3]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.66194276E12, 199.625], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.66194276E12, 59.69999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.66194276E12, 268.55555555555554], [1.66194282E12, 5896.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.66194276E12, 118.30000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.66194276E12, 624.4000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 34.22222222222222]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.66194276E12, 570.0], [1.66194294E12, 1204.0], [1.66194282E12, 987.625]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.66194276E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.66194276E12, 53.333333333333336], [1.66194282E12, 1204.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.66194276E12, 19.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.66194276E12, 43.77777777777777], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.66194276E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.66194276E12, 75.4]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.66194276E12, 172.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.66194276E12, 19.699999999999996]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.66194276E12, 18.299999999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.66194276E12, 20.3]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.66194276E12, 861.9000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66194288E12, 93.33333333333333], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.66194276E12, 602.1999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66194288E12, 76.11111111111111], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66194288E12, 53.33333333333334], [1.661943E12, 226.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66194288E12, 119.8888888888889], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 12.222222222222221]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66194288E12, 102.44444444444444], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66194288E12, 136.66666666666666], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66194294E12, 121.0], [1.66194282E12, 296.22222222222223]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66194288E12, 131.44444444444446], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66194294E12, 108.0], [1.66194282E12, 248.77777777777777]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66194288E12, 93.33333333333333], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66194288E12, 119.8888888888889], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66194288E12, 98.88888888888889], [1.661943E12, 116.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66194288E12, 119.66666666666667], [1.661943E12, 117.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 12.111111111111112]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66194288E12, 92.22222222222221], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66194288E12, 92.55555555555556], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.66194276E12, 21.333333333333332], [1.66194282E12, 2260.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 34.22222222222222]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.66194276E12, 48.3]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.66194276E12, 927.0], [1.66194282E12, 34.111111111111114]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66194288E12, 15.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 13.333333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 73.44444444444443]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66194294E12, 122.0], [1.66194282E12, 139.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66194294E12, 115.0], [1.66194282E12, 127.77777777777777]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 44.22222222222222]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66194294E12, 119.0], [1.66194282E12, 77.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.66194306E12, 0.0], [1.66194276E12, 0.0], [1.66194294E12, 0.0], [1.66194282E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66194288E12, 0.0], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66194288E12, 19.444444444444443], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66194288E12, 26.222222222222214], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.66194276E12, 570.0], [1.66194294E12, 1316.0], [1.66194282E12, 1002.3750000000001]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.66194276E12, 967.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.66194276E12, 187.20000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.66194276E12, 331.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.66194276E12, 413.2]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.66194276E12, 660.4000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66194276E12, 533.8]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.66194276E12, 2150.3]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.66194276E12, 230.87499999999997], [1.66194282E12, 2617.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.66194276E12, 145.44444444444446], [1.66194282E12, 11735.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.66194276E12, 474.3]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66194294E12, 0.0], [1.66194282E12, 119.8888888888889]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.66194288E12, 0.0], [1.66194276E12, 0.0], [1.66194294E12, 0.0], [1.66194282E12, 9.705882352941174], [1.661943E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194306E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 51.0, "minX": 1.66194276E12, "maxY": 53028.0, "series": [{"data": [[1.66194288E12, 2472.0], [1.66194306E12, 968.0], [1.66194276E12, 21790.0], [1.66194294E12, 2626.0], [1.66194282E12, 53028.0], [1.661943E12, 1283.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66194288E12, 282.0], [1.66194306E12, 273.4], [1.66194276E12, 3111.600000000001], [1.66194294E12, 258.9000000000001], [1.66194282E12, 5138.0], [1.661943E12, 255.10000000000002]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66194288E12, 1043.8500000000004], [1.66194306E12, 968.0], [1.66194276E12, 11613.07999999999], [1.66194294E12, 2040.5400000000081], [1.66194282E12, 41451.0], [1.661943E12, 1283.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66194288E12, 455.0], [1.66194306E12, 697.1999999999986], [1.66194276E12, 5251.399999999997], [1.66194294E12, 341.5999999999997], [1.66194282E12, 20739.0], [1.661943E12, 569.1499999999987]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66194288E12, 51.0], [1.66194306E12, 54.0], [1.66194276E12, 70.0], [1.66194294E12, 54.0], [1.66194282E12, 52.0], [1.661943E12, 56.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66194288E12, 92.0], [1.66194306E12, 180.0], [1.66194276E12, 683.0], [1.66194294E12, 96.5], [1.66194282E12, 204.0], [1.661943E12, 80.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194306E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 1.0, "minX": 1.0, "maxY": 29872.0, "series": [{"data": [[2.0, 1104.0], [36.0, 185.0], [3.0, 264.5], [48.0, 93.0], [52.0, 87.5], [4.0, 304.5], [5.0, 238.0], [6.0, 247.0], [7.0, 213.0], [8.0, 295.0], [9.0, 271.5], [10.0, 187.0], [11.0, 274.0], [12.0, 833.5], [13.0, 626.0], [14.0, 102.0], [15.0, 199.5], [16.0, 318.0], [1.0, 516.5], [17.0, 637.0], [18.0, 1787.5], [20.0, 189.0], [21.0, 235.0], [22.0, 90.0], [24.0, 79.0], [25.0, 172.5], [26.0, 128.5], [27.0, 120.0], [28.0, 172.0], [29.0, 114.5], [31.0, 98.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[9.0, 1.0], [10.0, 29872.0], [21.0, 1.0], [3.0, 18.0], [27.0, 3.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 52.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 498.5, "series": [{"data": [[2.0, 239.5], [36.0, 0.0], [3.0, 249.0], [48.0, 0.0], [52.0, 0.0], [4.0, 236.5], [5.0, 234.0], [6.0, 210.5], [7.0, 80.5], [8.0, 128.0], [9.0, 234.5], [10.0, 75.0], [11.0, 144.0], [12.0, 114.0], [13.0, 343.0], [14.0, 76.5], [15.0, 97.5], [16.0, 220.0], [1.0, 242.5], [17.0, 237.0], [18.0, 498.5], [20.0, 71.0], [21.0, 0.0], [22.0, 0.0], [24.0, 0.0], [25.0, 0.0], [26.0, 0.0], [27.0, 0.0], [28.0, 67.0], [29.0, 107.0], [31.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[9.0, 0.0], [10.0, 0.0], [21.0, 0.0], [3.0, 0.0], [27.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 52.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.45, "minX": 1.66194276E12, "maxY": 11.1, "series": [{"data": [[1.66194288E12, 11.1], [1.66194306E12, 0.45], [1.66194276E12, 6.1], [1.66194294E12, 2.8666666666666667], [1.66194282E12, 5.45], [1.661943E12, 1.0333333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194306E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66194276E12, "maxY": 7.183333333333334, "series": [{"data": [[1.66194288E12, 3.8833333333333333], [1.66194306E12, 0.11666666666666667], [1.66194276E12, 5.583333333333333], [1.66194294E12, 0.9666666666666667], [1.66194282E12, 3.066666666666667], [1.661943E12, 0.36666666666666664]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66194288E12, 7.183333333333334], [1.66194306E12, 0.3333333333333333], [1.66194294E12, 1.9166666666666667], [1.66194282E12, 2.7666666666666666], [1.661943E12, 0.6666666666666666]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.66194288E12, 0.03333333333333333], [1.66194276E12, 0.016666666666666666], [1.66194282E12, 0.08333333333333333]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.NoHttpResponseException", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194306E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66194276E12, "maxY": 0.5666666666666667, "series": [{"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1-success", "isController": false}, {"data": [[1.66194276E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/-11-success", "isController": false}, {"data": [[1.66194288E12, 0.13333333333333333], [1.66194294E12, 0.016666666666666666], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "Clearance-success", "isController": true}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-28-success", "isController": false}, {"data": [[1.66194288E12, 0.36666666666666664], [1.66194306E12, 0.016666666666666666], [1.66194276E12, 0.016666666666666666], [1.66194294E12, 0.11666666666666667], [1.66194282E12, 0.2833333333333333], [1.661943E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-11-failure", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16-success", "isController": false}, {"data": [[1.66194276E12, 0.13333333333333333], [1.66194282E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-7-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7-success", "isController": false}, {"data": [[1.66194276E12, 0.15], [1.66194282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-30-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7-success", "isController": false}, {"data": [[1.66194276E12, 0.13333333333333333], [1.66194282E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-15-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-0-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-21-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-18-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14-success", "isController": false}, {"data": [[1.66194276E12, 0.15], [1.66194282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-25-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-12-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6-success", "isController": false}, {"data": [[1.66194276E12, 0.016666666666666666], [1.66194282E12, 0.11666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-success", "isController": false}, {"data": [[1.66194276E12, 0.15], [1.66194282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-8-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-27-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-16-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-4-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-33-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "Combo-success", "isController": true}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-1-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-19-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-20-success", "isController": false}, {"data": [[1.66194288E12, 0.5666666666666667], [1.66194276E12, 0.03333333333333333], [1.66194294E12, 0.06666666666666667], [1.66194282E12, 0.48333333333333334], [1.661943E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-24-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696-success", "isController": false}, {"data": [[1.66194288E12, 0.03333333333333333], [1.66194282E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-failure", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-13-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-9-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-26-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.016666666666666666]], "isOverall": false, "label": "Home-failure", "isController": true}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.08333333333333333]], "isOverall": false, "label": "HotOffers-success", "isController": true}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1-success", "isController": false}, {"data": [[1.66194276E12, 0.15], [1.66194282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-17-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22-success", "isController": false}, {"data": [[1.66194276E12, 0.016666666666666666], [1.66194282E12, 0.11666666666666667]], "isOverall": false, "label": "Home-success", "isController": true}, {"data": [[1.66194282E12, 0.05]], "isOverall": false, "label": "Makeupshop-failure", "isController": true}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-5-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371-success", "isController": false}, {"data": [[1.66194276E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/-32-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-2-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12-success", "isController": false}, {"data": [[1.66194288E12, 0.36666666666666664], [1.66194306E12, 0.016666666666666666], [1.66194276E12, 0.016666666666666666], [1.66194294E12, 0.11666666666666667], [1.66194282E12, 0.2833333333333333], [1.661943E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?-success", "isController": false}, {"data": [[1.66194276E12, 0.15], [1.66194282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-23-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-failure", "isController": false}, {"data": [[1.66194282E12, 0.06666666666666667]], "isOverall": false, "label": "HotOffers-failure", "isController": true}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-31-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19-success", "isController": false}, {"data": [[1.66194276E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/-6-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-14-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-29-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23-success", "isController": false}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-34-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11-success", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.1]], "isOverall": false, "label": "Makeupshop-success", "isController": true}, {"data": [[1.66194288E12, 0.06666666666666667], [1.66194306E12, 0.016666666666666666], [1.66194294E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7-success", "isController": false}, {"data": [[1.66194276E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-6-failure", "isController": false}, {"data": [[1.66194288E12, 0.15], [1.661943E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-22-success", "isController": false}, {"data": [[1.66194276E12, 0.16666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-10-success", "isController": false}, {"data": [[1.66194294E12, 0.016666666666666666], [1.66194282E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194306E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66194276E12, "maxY": 11.35, "series": [{"data": [[1.66194288E12, 11.35], [1.66194306E12, 0.45], [1.66194276E12, 5.6], [1.66194294E12, 2.9166666666666665], [1.66194282E12, 6.116666666666666], [1.661943E12, 1.0666666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.66194288E12, 0.03333333333333333], [1.66194276E12, 0.016666666666666666], [1.66194294E12, 0.05], [1.66194282E12, 0.23333333333333334]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194306E12, "title": "Total Transactions Per Second"}},
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
