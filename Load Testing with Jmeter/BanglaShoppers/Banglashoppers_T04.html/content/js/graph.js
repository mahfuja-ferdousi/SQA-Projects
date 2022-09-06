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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 19.0, "series": [{"data": [[300.0, 2.0], [700.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[300.0, 1.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[100.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[0.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[0.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[0.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[0.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[0.0, 2.0], [300.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[200.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[400.0, 1.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1100.0, 1.0], [100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[0.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[200.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[0.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[0.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[0.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[0.0, 2.0], [100.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[100.0, 2.0], [400.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[300.0, 1.0], [100.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[0.0, 1.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[0.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[0.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[0.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[0.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[0.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[300.0, 1.0], [100.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[300.0, 2.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[0.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[0.0, 1.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[0.0, 11.0], [300.0, 1.0], [100.0, 8.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[4400.0, 1.0], [6300.0, 1.0], [7100.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1100.0, 2.0], [1300.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[300.0, 1.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [2400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[100.0, 2.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1200.0, 1.0], [600.0, 1.0], [1400.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[200.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[0.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[5000.0, 1.0], [5300.0, 1.0], [2700.0, 1.0], [6300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[4900.0, 1.0], [11500.0, 1.0], [7600.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[200.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1700.0, 3.0], [2000.0, 1.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[0.0, 1.0], [1200.0, 1.0], [700.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[600.0, 1.0], [200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[600.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[100.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[0.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[2900.0, 1.0], [1800.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[200.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[600.0, 1.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[100.0, 2.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1100.0, 1.0], [1500.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[200.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[0.0, 2.0], [400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[0.0, 1.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[200.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[300.0, 1.0], [100.0, 1.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1100.0, 1.0], [400.0, 1.0], [1700.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[4400.0, 1.0], [3000.0, 1.0], [1800.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[200.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[0.0, 3.0], [1500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[0.0, 3.0], [1400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[0.0, 2.0], [1100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [600.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[0.0, 1.0], [400.0, 1.0], [100.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[0.0, 19.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[5600.0, 1.0], [11700.0, 1.0], [7600.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1100.0, 1.0], [700.0, 1.0], [900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1400.0, 1.0], [2900.0, 1.0], [1600.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[100.0, 1.0], [1600.0, 1.0], [200.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[200.0, 1.0], [800.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[200.0, 1.0], [800.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [900.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[2300.0, 1.0], [400.0, 1.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[2600.0, 1.0], [1500.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[0.0, 1.0], [600.0, 1.0], [300.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[600.0, 1.0], [400.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[3300.0, 2.0], [3500.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[0.0, 3.0], [300.0, 8.0], [400.0, 2.0], [200.0, 18.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 11700.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 5.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 545.0, "series": [{"data": [[0.0, 545.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 62.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 36.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 5.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 2.0000000000000004, "minX": 1.66194186E12, "maxY": 3.8585526315789465, "series": [{"data": [[1.66194186E12, 3.8585526315789465], [1.66194198E12, 2.0000000000000004], [1.66194192E12, 3.6512455516014235]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194198E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 52.0, "minX": 1.0, "maxY": 9075.333333333334, "series": [{"data": [[4.0, 422.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[4.0, 422.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300-Aggregated", "isController": false}, {"data": [[4.0, 277.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[4.0, 277.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301-Aggregated", "isController": false}, {"data": [[4.0, 190.5], [3.0, 189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[3.5, 189.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21-Aggregated", "isController": false}, {"data": [[4.0, 63.5], [3.0, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[3.5, 70.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20-Aggregated", "isController": false}, {"data": [[4.0, 134.0], [3.0, 145.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[3.5, 139.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22-Aggregated", "isController": false}, {"data": [[4.0, 77.5], [3.0, 63.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[3.5, 70.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4-Aggregated", "isController": false}, {"data": [[4.0, 71.5], [3.0, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[3.5, 72.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5-Aggregated", "isController": false}, {"data": [[4.0, 102.5], [3.0, 101.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[3.5, 102.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6-Aggregated", "isController": false}, {"data": [[4.0, 68.5], [3.0, 130.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[3.5, 99.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7-Aggregated", "isController": false}, {"data": [[4.0, 78.0], [3.0, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[3.5, 73.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8-Aggregated", "isController": false}, {"data": [[4.0, 70.5], [3.0, 121.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[3.5, 95.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9-Aggregated", "isController": false}, {"data": [[4.0, 65.5], [3.0, 125.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[3.5, 95.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10-Aggregated", "isController": false}, {"data": [[4.0, 72.0], [3.0, 136.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[3.5, 104.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12-Aggregated", "isController": false}, {"data": [[4.0, 139.0], [3.0, 71.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[3.5, 105.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11-Aggregated", "isController": false}, {"data": [[4.0, 57.0], [2.0, 59.0], [1.0, 58.0], [3.0, 57.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[2.5, 57.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20-Aggregated", "isController": false}, {"data": [[4.0, 156.5], [3.0, 77.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[3.5, 117.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14-Aggregated", "isController": false}, {"data": [[4.0, 70.5], [3.0, 74.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[3.5, 72.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13-Aggregated", "isController": false}, {"data": [[4.0, 75.5], [3.0, 75.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[3.5, 75.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16-Aggregated", "isController": false}, {"data": [[4.0, 93.0], [2.0, 214.0], [1.0, 202.0], [3.0, 91.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[2.5, 150.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23-Aggregated", "isController": false}, {"data": [[4.0, 71.0], [3.0, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[3.5, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15-Aggregated", "isController": false}, {"data": [[4.0, 73.0], [3.0, 133.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[3.5, 103.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18-Aggregated", "isController": false}, {"data": [[4.0, 333.0], [2.0, 326.0], [1.0, 90.0], [3.0, 64.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[2.5, 203.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21-Aggregated", "isController": false}, {"data": [[4.0, 64.0], [3.0, 135.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[3.5, 99.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17-Aggregated", "isController": false}, {"data": [[4.0, 69.0], [2.0, 81.0], [1.0, 194.0], [3.0, 217.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[2.5, 140.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22-Aggregated", "isController": false}, {"data": [[4.0, 54.0], [3.0, 59.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[3.5, 56.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19-Aggregated", "isController": false}, {"data": [[4.0, 269.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[4.0, 269.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895-Aggregated", "isController": false}, {"data": [[4.0, 310.0], [3.0, 289.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[3.75, 304.75]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896-Aggregated", "isController": false}, {"data": [[4.0, 492.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[4.0, 492.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9-Aggregated", "isController": false}, {"data": [[4.0, 65.0], [2.0, 71.0], [1.0, 97.0], [3.0, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[2.5, 74.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18-Aggregated", "isController": false}, {"data": [[4.0, 65.0], [2.0, 204.0], [1.0, 68.0], [3.0, 65.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[2.5, 100.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19-Aggregated", "isController": false}, {"data": [[4.0, 155.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[4.0, 155.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3-Aggregated", "isController": false}, {"data": [[4.0, 107.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[4.0, 107.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4-Aggregated", "isController": false}, {"data": [[4.0, 67.33333333333333], [3.0, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[3.75, 68.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19-Aggregated", "isController": false}, {"data": [[4.0, 103.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[4.0, 103.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1-Aggregated", "isController": false}, {"data": [[4.0, 161.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[4.0, 161.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2-Aggregated", "isController": false}, {"data": [[4.0, 1148.0], [2.0, 1323.0], [1.0, 1296.0], [3.0, 1553.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[2.5, 1330.0]], "isOverall": false, "label": "Clearance-Aggregated", "isController": true}, {"data": [[4.0, 498.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[4.0, 498.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7-Aggregated", "isController": false}, {"data": [[4.0, 625.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[4.0, 625.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8-Aggregated", "isController": false}, {"data": [[4.0, 64.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[4.0, 64.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5-Aggregated", "isController": false}, {"data": [[4.0, 182.0], [2.0, 323.0], [1.0, 210.0], [3.0, 213.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[2.5, 232.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9-Aggregated", "isController": false}, {"data": [[4.0, 233.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[4.0, 233.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6-Aggregated", "isController": false}, {"data": [[4.0, 272.0], [3.0, 234.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[3.75, 262.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12-Aggregated", "isController": false}, {"data": [[4.0, 85.0], [2.0, 310.0], [1.0, 66.0], [3.0, 935.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[2.5, 349.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7-Aggregated", "isController": false}, {"data": [[4.0, 151.33333333333334], [3.0, 177.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[3.75, 157.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11-Aggregated", "isController": false}, {"data": [[4.0, 77.0], [2.0, 257.0], [1.0, 75.0], [3.0, 201.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[2.5, 152.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8-Aggregated", "isController": false}, {"data": [[4.0, 142.66666666666666], [3.0, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[3.75, 124.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14-Aggregated", "isController": false}, {"data": [[4.0, 64.0], [2.0, 64.0], [1.0, 204.0], [3.0, 85.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[2.5, 104.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5-Aggregated", "isController": false}, {"data": [[4.0, 70.66666666666667], [3.0, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[3.75, 72.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13-Aggregated", "isController": false}, {"data": [[4.0, 102.0], [2.0, 102.0], [1.0, 252.0], [3.0, 109.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[2.5, 141.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6-Aggregated", "isController": false}, {"data": [[4.0, 67.33333333333333], [3.0, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[3.75, 69.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16-Aggregated", "isController": false}, {"data": [[4.0, 182.0], [2.0, 69.0], [1.0, 206.0], [3.0, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[2.5, 132.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3-Aggregated", "isController": false}, {"data": [[4.0, 72.0], [3.0, 64.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[3.75, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15-Aggregated", "isController": false}, {"data": [[4.0, 182.0], [2.0, 86.0], [1.0, 73.0], [3.0, 103.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[2.5, 111.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4-Aggregated", "isController": false}, {"data": [[4.0, 62.666666666666664], [3.0, 64.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[3.75, 63.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18-Aggregated", "isController": false}, {"data": [[4.0, 189.0], [2.0, 77.0], [1.0, 206.0], [3.0, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[2.5, 135.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1-Aggregated", "isController": false}, {"data": [[4.0, 73.0], [3.0, 63.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[3.75, 70.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17-Aggregated", "isController": false}, {"data": [[4.0, 60.0], [2.0, 87.0], [1.0, 205.0], [3.0, 276.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[2.5, 157.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2-Aggregated", "isController": false}, {"data": [[4.0, 139.0], [2.0, 324.0], [1.0, 283.0], [3.0, 299.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[2.5, 261.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12-Aggregated", "isController": false}, {"data": [[4.0, 353.0], [2.0, 280.0], [1.0, 422.0], [3.0, 334.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[2.5, 347.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0-Aggregated", "isController": false}, {"data": [[4.0, 80.0], [2.0, 68.0], [1.0, 73.0], [3.0, 192.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[2.5, 103.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13-Aggregated", "isController": false}, {"data": [[4.0, 70.0], [2.0, 290.0], [1.0, 66.0], [3.0, 227.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[2.5, 163.25]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10-Aggregated", "isController": false}, {"data": [[4.0, 67.0], [2.0, 293.0], [1.0, 222.0], [3.0, 200.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[2.5, 195.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11-Aggregated", "isController": false}, {"data": [[4.0, 70.0], [2.0, 192.0], [1.0, 201.0], [3.0, 68.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[2.5, 132.75]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16-Aggregated", "isController": false}, {"data": [[4.0, 68.0], [2.0, 74.0], [1.0, 67.0], [3.0, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[2.5, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17-Aggregated", "isController": false}, {"data": [[4.0, 160.0], [3.0, 189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[3.75, 167.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10-Aggregated", "isController": false}, {"data": [[4.0, 69.0], [2.0, 83.0], [1.0, 65.0], [3.0, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[2.5, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14-Aggregated", "isController": false}, {"data": [[4.0, 68.0], [2.0, 192.0], [1.0, 68.0], [3.0, 64.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[2.5, 98.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15-Aggregated", "isController": false}, {"data": [[4.0, 242.66666666666669], [3.0, 511.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[3.75, 309.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-19-Aggregated", "isController": false}, {"data": [[4.0, 123.84615384615384], [2.0, 84.0], [1.0, 85.0], [3.0, 102.8]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[3.5, 114.65000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json-Aggregated", "isController": false}, {"data": [[4.0, 6401.75]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[4.0, 6401.75]], "isOverall": false, "label": "Makeupshop-Aggregated", "isController": true}, {"data": [[4.0, 980.0], [2.0, 1149.0], [1.0, 1147.0], [3.0, 1390.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[2.5, 1166.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-Aggregated", "isController": false}, {"data": [[4.0, 230.66666666666666], [3.0, 141.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[3.75, 208.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-11-Aggregated", "isController": false}, {"data": [[4.0, 368.6666666666667], [3.0, 93.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[3.75, 299.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-12-Aggregated", "isController": false}, {"data": [[4.0, 214.33333333333331], [3.0, 177.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[3.75, 205.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13-Aggregated", "isController": false}, {"data": [[4.0, 968.3333333333334], [3.0, 258.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[3.75, 790.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-14-Aggregated", "isController": false}, {"data": [[4.0, 298.3333333333333], [3.0, 189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[3.75, 271.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15-Aggregated", "isController": false}, {"data": [[4.0, 357.6666666666667], [3.0, 1111.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[3.75, 546.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-16-Aggregated", "isController": false}, {"data": [[4.0, 1214.3333333333333], [3.0, 1219.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[3.75, 1215.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-17-Aggregated", "isController": false}, {"data": [[4.0, 342.6666666666667], [3.0, 323.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[3.75, 337.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-18-Aggregated", "isController": false}, {"data": [[4.0, 268.0], [3.0, 236.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[3.5, 252.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696-Aggregated", "isController": false}, {"data": [[4.0, 107.33333333333333], [3.0, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[3.75, 97.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10-Aggregated", "isController": false}, {"data": [[4.0, 4875.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[4.0, 4875.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-Aggregated", "isController": false}, {"data": [[4.0, 8915.0], [3.0, 4958.0]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[3.75, 7925.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-Aggregated", "isController": false}, {"data": [[4.0, 318.5], [3.0, 230.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[3.5, 274.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695-Aggregated", "isController": false}, {"data": [[4.0, 89.66666666666667], [3.0, 92.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[3.75, 90.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-22-Aggregated", "isController": false}, {"data": [[4.0, 88.0], [3.0, 78.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[3.75, 85.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-23-Aggregated", "isController": false}, {"data": [[4.0, 248.33333333333331], [3.0, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[3.75, 205.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-24-Aggregated", "isController": false}, {"data": [[4.0, 1927.0], [3.0, 1766.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[3.5, 1846.5]], "isOverall": false, "label": "Combo-Aggregated", "isController": true}, {"data": [[4.0, 695.0], [3.0, 67.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[3.75, 538.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25-Aggregated", "isController": false}, {"data": [[4.0, 182.66666666666666], [3.0, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[3.75, 155.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-26-Aggregated", "isController": false}, {"data": [[4.0, 396.0], [3.0, 506.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[3.75, 423.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-27-Aggregated", "isController": false}, {"data": [[4.0, 317.3333333333333], [3.0, 64.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[3.75, 254.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28-Aggregated", "isController": false}, {"data": [[4.0, 77.66666666666667], [3.0, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[3.75, 74.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-29-Aggregated", "isController": false}, {"data": [[4.0, 373.6666666666667], [3.0, 248.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[3.75, 342.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-20-Aggregated", "isController": false}, {"data": [[4.0, 242.66666666666666], [3.0, 82.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[3.75, 202.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-21-Aggregated", "isController": false}, {"data": [[4.0, 636.0], [3.0, 631.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[3.5, 633.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-Aggregated", "isController": false}, {"data": [[4.0, 437.33333333333337], [3.0, 416.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[3.75, 432.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33-Aggregated", "isController": false}, {"data": [[4.0, 188.0], [3.0, 214.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[3.75, 194.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3-Aggregated", "isController": false}, {"data": [[4.0, 528.3333333333334], [3.0, 355.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[3.75, 485.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34-Aggregated", "isController": false}, {"data": [[4.0, 155.66666666666666], [3.0, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[3.75, 135.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2-Aggregated", "isController": false}, {"data": [[4.0, 113.66666666666667], [3.0, 182.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[3.75, 130.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1-Aggregated", "isController": false}, {"data": [[4.0, 505.0], [3.0, 350.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[3.75, 466.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0-Aggregated", "isController": false}, {"data": [[4.0, 2133.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[4.0, 2133.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22-Aggregated", "isController": false}, {"data": [[4.0, 190.33333333333334], [3.0, 190.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[3.75, 190.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7-Aggregated", "isController": false}, {"data": [[4.0, 84.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[4.0, 84.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21-Aggregated", "isController": false}, {"data": [[4.0, 227.66666666666666], [3.0, 244.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[3.75, 231.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6-Aggregated", "isController": false}, {"data": [[4.0, 209.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[4.0, 209.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24-Aggregated", "isController": false}, {"data": [[4.0, 335.0], [3.0, 187.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[3.75, 298.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5-Aggregated", "isController": false}, {"data": [[4.0, 262.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[4.0, 262.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23-Aggregated", "isController": false}, {"data": [[4.0, 196.0], [3.0, 194.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[3.75, 195.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4-Aggregated", "isController": false}, {"data": [[4.0, 1262.0], [3.0, 992.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[3.75, 1194.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-Aggregated", "isController": false}, {"data": [[4.0, 203.33333333333334], [3.0, 192.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[3.75, 200.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23-Aggregated", "isController": false}, {"data": [[4.0, 211.66666666666666], [3.0, 212.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[3.75, 211.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22-Aggregated", "isController": false}, {"data": [[4.0, 187.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[4.0, 187.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20-Aggregated", "isController": false}, {"data": [[4.0, 161.33333333333334], [3.0, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[3.75, 139.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9-Aggregated", "isController": false}, {"data": [[4.0, 210.66666666666666], [3.0, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[3.75, 175.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8-Aggregated", "isController": false}, {"data": [[4.0, 228.5], [3.0, 224.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[3.5, 226.25]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372-Aggregated", "isController": false}, {"data": [[4.0, 521.6666666666666], [3.0, 394.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[3.75, 489.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-30-Aggregated", "isController": false}, {"data": [[4.0, 1364.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[4.0, 1364.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0-Aggregated", "isController": false}, {"data": [[4.0, 78.33333333333333], [3.0, 55.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[3.75, 72.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-31-Aggregated", "isController": false}, {"data": [[4.0, 4883.0], [3.0, 1895.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[3.75, 4136.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32-Aggregated", "isController": false}, {"data": [[4.0, 226.0], [3.0, 236.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[3.5, 231.25]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371-Aggregated", "isController": false}, {"data": [[4.0, 78.33333333333333], [3.0, 86.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[3.75, 80.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21-Aggregated", "isController": false}, {"data": [[4.0, 55.666666666666664], [3.0, 52.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[3.75, 54.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20-Aggregated", "isController": false}, {"data": [[4.0, 92.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[4.0, 92.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19-Aggregated", "isController": false}, {"data": [[4.0, 188.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[4.0, 188.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18-Aggregated", "isController": false}, {"data": [[4.0, 126.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[4.0, 126.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15-Aggregated", "isController": false}, {"data": [[4.0, 131.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[4.0, 131.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14-Aggregated", "isController": false}, {"data": [[4.0, 95.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[4.0, 95.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17-Aggregated", "isController": false}, {"data": [[4.0, 433.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[4.0, 433.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16-Aggregated", "isController": false}, {"data": [[4.0, 410.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[4.0, 410.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11-Aggregated", "isController": false}, {"data": [[4.0, 455.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[4.0, 455.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10-Aggregated", "isController": false}, {"data": [[4.0, 307.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[4.0, 307.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13-Aggregated", "isController": false}, {"data": [[4.0, 567.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[4.0, 567.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12-Aggregated", "isController": false}, {"data": [[4.0, 57.30769230769231], [2.0, 90.0], [1.0, 64.0], [3.0, 156.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[3.5, 83.94999999999999]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?-Aggregated", "isController": false}, {"data": [[4.0, 181.0], [3.0, 171.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[3.5, 176.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0-Aggregated", "isController": false}, {"data": [[4.0, 66.0], [3.0, 76.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[3.5, 71.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1-Aggregated", "isController": false}, {"data": [[4.0, 128.5], [3.0, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[3.5, 102.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2-Aggregated", "isController": false}, {"data": [[4.0, 76.5], [3.0, 63.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[3.5, 69.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3-Aggregated", "isController": false}, {"data": [[4.0, 9075.333333333334], [3.0, 5608.0]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[3.75, 8208.5]], "isOverall": false, "label": "Home-Aggregated", "isController": true}, {"data": [[4.0, 1243.6666666666667], [3.0, 1134.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[3.75, 1216.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-0-Aggregated", "isController": false}, {"data": [[4.0, 2617.0], [3.0, 1421.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[3.75, 2318.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1-Aggregated", "isController": false}, {"data": [[4.0, 1256.3333333333333], [3.0, 179.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[3.75, 987.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-2-Aggregated", "isController": false}, {"data": [[4.0, 792.6666666666666], [3.0, 264.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[3.75, 660.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-Aggregated", "isController": false}, {"data": [[4.0, 769.6666666666666], [3.0, 263.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[3.75, 643.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4-Aggregated", "isController": false}, {"data": [[4.0, 1354.6666666666667], [3.0, 309.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[3.75, 1093.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-5-Aggregated", "isController": false}, {"data": [[4.0, 1231.0], [3.0, 466.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[3.75, 1039.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-6-Aggregated", "isController": false}, {"data": [[4.0, 1573.6666666666665], [3.0, 557.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[3.75, 1319.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-7-Aggregated", "isController": false}, {"data": [[4.0, 882.3333333333333], [3.0, 84.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[3.75, 682.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-8-Aggregated", "isController": false}, {"data": [[4.0, 419.6666666666667], [3.0, 440.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[3.75, 424.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-9-Aggregated", "isController": false}, {"data": [[4.0, 3579.0], [3.0, 3342.5]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[3.5, 3460.75]], "isOverall": false, "label": "HotOffers-Aggregated", "isController": true}, {"data": [[4.0, 278.7916666666667], [3.0, 264.25]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}, {"data": [[3.749999999999999, 275.15624999999994]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 4.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 2707.266666666667, "minX": 1.66194186E12, "maxY": 843699.3666666667, "series": [{"data": [[1.66194186E12, 843699.3666666667], [1.66194198E12, 28826.333333333332], [1.66194192E12, 105070.95]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66194186E12, 7703.6], [1.66194198E12, 2707.266666666667], [1.66194192E12, 7696.65]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194198E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 54.75, "minX": 1.66194186E12, "maxY": 8208.5, "series": [{"data": [[1.66194186E12, 422.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66194186E12, 277.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66194192E12, 189.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66194192E12, 70.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66194192E12, 139.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66194192E12, 70.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66194192E12, 72.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66194192E12, 102.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66194192E12, 99.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66194192E12, 73.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66194192E12, 95.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66194192E12, 95.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66194192E12, 104.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66194192E12, 105.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66194198E12, 58.0], [1.66194192E12, 57.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66194192E12, 117.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66194192E12, 72.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66194192E12, 75.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66194198E12, 169.0], [1.66194192E12, 93.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66194192E12, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66194192E12, 103.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66194198E12, 160.0], [1.66194192E12, 333.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66194192E12, 99.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66194198E12, 164.0], [1.66194192E12, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66194192E12, 56.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66194186E12, 269.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66194192E12, 304.75]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66194186E12, 492.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66194198E12, 78.0], [1.66194192E12, 65.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66194198E12, 112.33333333333333], [1.66194192E12, 65.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66194186E12, 155.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66194186E12, 107.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66194192E12, 68.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66194186E12, 103.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66194186E12, 161.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66194198E12, 1296.0], [1.66194192E12, 1341.3333333333333]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66194186E12, 498.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66194186E12, 625.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66194186E12, 64.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66194198E12, 248.66666666666666], [1.66194192E12, 182.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66194186E12, 233.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66194192E12, 262.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66194198E12, 437.0], [1.66194192E12, 85.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66194192E12, 157.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66194198E12, 177.66666666666666], [1.66194192E12, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66194192E12, 124.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66194198E12, 117.66666666666666], [1.66194192E12, 64.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66194192E12, 72.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66194198E12, 154.33333333333334], [1.66194192E12, 102.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66194192E12, 69.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66194198E12, 116.0], [1.66194192E12, 182.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66194192E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66194198E12, 87.33333333333333], [1.66194192E12, 182.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66194192E12, 63.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66194198E12, 117.66666666666666], [1.66194192E12, 189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66194192E12, 70.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66194198E12, 189.33333333333334], [1.66194192E12, 60.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66194198E12, 302.0], [1.66194192E12, 139.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66194198E12, 345.3333333333333], [1.66194192E12, 353.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66194198E12, 111.0], [1.66194192E12, 80.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66194198E12, 194.33333333333331], [1.66194192E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66194198E12, 238.33333333333334], [1.66194192E12, 67.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66194198E12, 153.66666666666666], [1.66194192E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66194198E12, 70.66666666666667], [1.66194192E12, 68.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66194192E12, 167.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66194198E12, 74.33333333333333], [1.66194192E12, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66194198E12, 108.0], [1.66194192E12, 68.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.66194186E12, 309.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66194186E12, 140.125], [1.66194198E12, 92.33333333333333], [1.66194192E12, 99.44444444444444]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66194186E12, 6401.75]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66194198E12, 1228.6666666666667], [1.66194192E12, 980.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.66194186E12, 208.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.66194186E12, 299.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.66194186E12, 205.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.66194186E12, 790.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.66194186E12, 271.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.66194186E12, 546.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.66194186E12, 1215.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.66194186E12, 337.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66194192E12, 252.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.66194186E12, 97.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66194186E12, 4875.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.66194186E12, 7925.75]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66194192E12, 274.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.66194186E12, 90.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.66194186E12, 85.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.66194186E12, 205.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66194192E12, 1846.5]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.66194186E12, 538.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.66194186E12, 155.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.66194186E12, 423.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.66194186E12, 254.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.66194186E12, 74.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.66194186E12, 342.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.66194186E12, 202.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66194192E12, 633.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.66194186E12, 432.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66194192E12, 194.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.66194186E12, 485.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66194192E12, 135.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66194192E12, 130.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66194192E12, 466.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66194186E12, 2133.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66194192E12, 190.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66194186E12, 84.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66194192E12, 231.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66194186E12, 209.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66194192E12, 298.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66194186E12, 262.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66194192E12, 195.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66194192E12, 1194.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66194192E12, 200.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66194192E12, 211.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66194186E12, 187.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66194192E12, 139.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66194192E12, 175.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66194192E12, 226.25]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.66194186E12, 489.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66194186E12, 1364.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.66194186E12, 72.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.66194186E12, 4136.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66194192E12, 231.25]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66194192E12, 80.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66194192E12, 54.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66194186E12, 92.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66194186E12, 188.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66194186E12, 126.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66194186E12, 131.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66194186E12, 95.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66194186E12, 433.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66194186E12, 410.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66194186E12, 455.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66194186E12, 307.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66194186E12, 567.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66194186E12, 116.125], [1.66194198E12, 71.25], [1.66194192E12, 58.125]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66194192E12, 176.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66194192E12, 71.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66194192E12, 102.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66194192E12, 69.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.66194186E12, 8208.5]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.66194186E12, 1216.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.66194186E12, 2318.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.66194186E12, 987.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.66194186E12, 660.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.66194186E12, 643.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66194186E12, 1093.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.66194186E12, 1039.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.66194186E12, 1319.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.66194186E12, 682.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.66194186E12, 424.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66194186E12, 3460.75]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.66194186E12, 300.1875], [1.66194192E12, 250.12499999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194198E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66194186E12, "maxY": 2327.5, "series": [{"data": [[1.66194186E12, 422.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66194186E12, 277.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66194192E12, 96.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66194192E12, 104.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66194198E12, 38.333333333333336], [1.66194192E12, 57.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66194192E12, 72.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66194192E12, 29.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66194186E12, 268.25]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66194192E12, 304.75]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66194198E12, 349.0], [1.66194192E12, 251.33333333333334]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66194186E12, 113.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66194192E12, 141.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66194192E12, 108.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66194192E12, 71.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66194198E12, 147.0], [1.66194192E12, 96.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66194198E12, 232.33333333333334], [1.66194192E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66194198E12, 202.33333333333334], [1.66194192E12, 233.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66194198E12, 110.66666666666667], [1.66194192E12, 80.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66194198E12, 73.33333333333333], [1.66194192E12, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.66194186E12, 158.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66194186E12, 52.625], [1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66194186E12, 1676.5]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66194198E12, 202.33333333333334], [1.66194192E12, 233.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.66194186E12, 156.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.66194186E12, 140.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.66194186E12, 148.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.66194186E12, 682.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.66194186E12, 118.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.66194186E12, 189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.66194186E12, 397.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.66194186E12, 165.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66194192E12, 252.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.66194186E12, 97.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66194186E12, 421.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.66194186E12, 756.5]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66194192E12, 274.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.66194186E12, 90.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.66194186E12, 78.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.66194186E12, 91.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66194192E12, 1201.75]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.66194186E12, 98.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.66194186E12, 155.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.66194186E12, 126.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.66194186E12, 253.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.66194186E12, 74.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.66194186E12, 237.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.66194186E12, 202.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66194192E12, 95.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.66194186E12, 432.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.66194186E12, 442.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66194192E12, 217.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66194186E12, 129.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66194192E12, 227.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66194192E12, 217.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66194192E12, 226.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.66194186E12, 89.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66194186E12, 421.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.66194186E12, 72.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.66194186E12, 144.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66194192E12, 231.25]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66194192E12, 14.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66194186E12, 126.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66194186E12, 131.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66194186E12, 165.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66194186E12, 567.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66194186E12, 116.125], [1.66194198E12, 71.25], [1.66194192E12, 58.125]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66194192E12, 95.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.66194186E12, 1037.75]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.66194186E12, 756.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.66194186E12, 416.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.66194186E12, 402.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.66194186E12, 559.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.66194186E12, 560.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66194186E12, 345.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.66194186E12, 1015.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.66194186E12, 678.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.66194186E12, 245.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.66194186E12, 424.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66194186E12, 2327.5]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.66194186E12, 259.75], [1.66194192E12, 249.81249999999997]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194198E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66194186E12, "maxY": 888.75, "series": [{"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66194192E12, 112.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66194192E12, 55.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66194192E12, 27.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66194192E12, 26.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66194192E12, 27.25]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66194192E12, 28.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66194192E12, 27.999999999999996]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66194192E12, 27.75]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66194198E12, 86.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66194192E12, 29.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66194192E12, 30.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66194198E12, 77.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66194186E12, 406.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66194198E12, 41.33333333333333], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66194186E12, 56.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66194186E12, 27.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66194186E12, 30.999999999999996]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66194186E12, 87.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66194198E12, 180.0], [1.66194192E12, 40.33333333333333]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66194186E12, 424.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66194186E12, 537.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66194198E12, 166.0], [1.66194192E12, 117.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66194192E12, 60.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66194198E12, 117.33333333333334], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66194192E12, 91.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66194198E12, 101.66666666666666], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66194192E12, 27.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66194198E12, 44.333333333333336], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66194198E12, 51.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66194198E12, 43.333333333333336], [1.66194192E12, 110.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 114.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66194198E12, 44.333333333333336], [1.66194192E12, 110.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66194198E12, 105.66666666666667], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66194198E12, 159.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66194198E12, 60.0], [1.66194192E12, 121.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66194198E12, 39.33333333333333], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66194198E12, 119.33333333333334], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66194198E12, 162.66666666666666], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66194198E12, 81.66666666666667], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66194192E12, 92.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66194198E12, 41.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66194186E12, 0.0], [1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66194186E12, 27.500000000000004]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66194198E12, 60.0], [1.66194192E12, 121.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.66194186E12, 45.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.66194186E12, 550.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.66194186E12, 35.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.66194186E12, 42.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.66194186E12, 123.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66194186E12, 27.500000000000004]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.66194186E12, 602.75]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.66194186E12, 43.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.66194186E12, 305.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66194192E12, 118.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.66194186E12, 276.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66194192E12, 62.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66194192E12, 58.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66194192E12, 116.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66194192E12, 120.25]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66194192E12, 132.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66194186E12, 115.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66194192E12, 231.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66194186E12, 168.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66194192E12, 117.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66194192E12, 116.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66194192E12, 110.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66194192E12, 119.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66194192E12, 67.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66194192E12, 93.75]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66194186E12, 27.500000000000004]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66194186E12, 77.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66194186E12, 54.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66194186E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66194186E12, 323.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66194186E12, 353.25]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66194186E12, 31.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66194186E12, 486.75]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66194186E12, 0.0], [1.66194198E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66194192E12, 27.500000000000004]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.66194186E12, 602.75]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.66194186E12, 602.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.66194186E12, 263.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.66194186E12, 268.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.66194186E12, 444.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.66194186E12, 307.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66194186E12, 256.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.66194186E12, 888.75]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.66194186E12, 589.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.66194186E12, 142.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.66194186E12, 189.25]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66194186E12, 116.75]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.66194186E12, 0.0], [1.66194192E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194198E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 51.0, "minX": 1.66194186E12, "maxY": 11560.0, "series": [{"data": [[1.66194186E12, 11560.0], [1.66194198E12, 1390.0], [1.66194192E12, 1591.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66194186E12, 1648.1], [1.66194198E12, 323.7], [1.66194192E12, 259.2]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66194186E12, 7564.810000000001], [1.66194198E12, 1390.0], [1.66194192E12, 1089.0999999999997]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66194186E12, 2725.750000000001], [1.66194198E12, 858.0499999999971], [1.66194192E12, 450.7000000000001]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66194186E12, 52.0], [1.66194198E12, 55.0], [1.66194192E12, 51.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66194186E12, 249.5], [1.66194198E12, 99.5], [1.66194192E12, 86.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194198E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 2.0, "minX": 1.0, "maxY": 485.0, "series": [{"data": [[2.0, 338.0], [10.0, 447.5], [41.0, 80.0], [11.0, 186.0], [3.0, 371.0], [12.0, 223.0], [13.0, 263.5], [14.0, 485.0], [15.0, 485.0], [16.0, 87.0], [4.0, 249.0], [1.0, 252.0], [17.0, 74.5], [18.0, 297.5], [19.0, 177.0], [5.0, 279.0], [23.0, 103.0], [6.0, 304.0], [24.0, 75.5], [25.0, 108.5], [26.0, 81.0], [7.0, 212.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[5.0, 286.0], [6.0, 255.0], [25.0, 64.0], [7.0, 2.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 41.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 257.0, "series": [{"data": [[2.0, 190.0], [10.0, 124.0], [41.0, 0.0], [11.0, 0.0], [3.0, 248.0], [12.0, 136.0], [13.0, 142.5], [14.0, 89.5], [15.0, 218.0], [16.0, 79.5], [4.0, 239.0], [1.0, 251.5], [17.0, 0.0], [18.0, 170.0], [19.0, 0.0], [5.0, 257.0], [23.0, 0.0], [6.0, 211.0], [24.0, 0.0], [25.0, 0.0], [26.0, 0.0], [7.0, 55.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[5.0, 0.0], [6.0, 0.0], [25.0, 0.0], [7.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 41.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.6619418E12, "maxY": 4.833333333333333, "series": [{"data": [[1.66194186E12, 4.833333333333333], [1.66194198E12, 1.3666666666666667], [1.6619418E12, 0.03333333333333333], [1.66194192E12, 4.566666666666666]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194198E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66194186E12, "maxY": 3.533333333333333, "series": [{"data": [[1.66194186E12, 3.533333333333333], [1.66194198E12, 0.4], [1.66194192E12, 1.6166666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66194186E12, 1.2666666666666666], [1.66194198E12, 0.9666666666666667], [1.66194192E12, 2.933333333333333]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.NoHttpResponseException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194198E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66194186E12, "maxY": 0.25, "series": [{"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-11-success", "isController": false}, {"data": [[1.66194198E12, 0.016666666666666666], [1.66194192E12, 0.05]], "isOverall": false, "label": "Clearance-success", "isController": true}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-28-success", "isController": false}, {"data": [[1.66194186E12, 0.13333333333333333], [1.66194198E12, 0.05], [1.66194192E12, 0.15]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-7-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-30-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-15-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-0-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-21-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-18-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-25-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-12-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-8-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-27-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-16-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-4-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-33-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "Combo-success", "isController": true}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-1-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-19-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-20-success", "isController": false}, {"data": [[1.66194186E12, 0.2], [1.66194192E12, 0.25]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-24-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-failure", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-13-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-9-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-26-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9-success", "isController": false}, {"data": [[1.66194186E12, 0.05]], "isOverall": false, "label": "HotOffers-success", "isController": true}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-17-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "Home-success", "isController": true}, {"data": [[1.66194186E12, 0.05]], "isOverall": false, "label": "Makeupshop-failure", "isController": true}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-5-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-32-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-2-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12-success", "isController": false}, {"data": [[1.66194186E12, 0.13333333333333333], [1.66194198E12, 0.06666666666666667], [1.66194192E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-23-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16-success", "isController": false}, {"data": [[1.66194186E12, 0.016666666666666666]], "isOverall": false, "label": "HotOffers-failure", "isController": true}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-31-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-6-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-14-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-29-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23-success", "isController": false}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-34-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-success", "isController": false}, {"data": [[1.66194186E12, 0.016666666666666666]], "isOverall": false, "label": "Makeupshop-success", "isController": true}, {"data": [[1.66194198E12, 0.05], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7-success", "isController": false}, {"data": [[1.66194192E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-22-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-10-success", "isController": false}, {"data": [[1.66194186E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194198E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66194186E12, "maxY": 4.933333333333334, "series": [{"data": [[1.66194186E12, 4.933333333333334], [1.66194198E12, 1.3833333333333333], [1.66194192E12, 4.666666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.66194186E12, 0.13333333333333333], [1.66194192E12, 0.016666666666666666]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194198E12, "title": "Total Transactions Per Second"}},
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
