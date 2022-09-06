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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 13.0, "series": [{"data": [[300.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[0.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[0.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[0.0, 1.0], [1100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[0.0, 1.0], [1400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[0.0, 2.0], [5300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[200.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[2800.0, 1.0], [3400.0, 1.0], [7300.0, 1.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[0.0, 1.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[0.0, 1.0], [1200.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[0.0, 2.0], [1200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[600.0, 1.0], [700.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[0.0, 2.0], [2700.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[0.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[0.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[0.0, 13.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[4700.0, 1.0], [24900.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[2400.0, 1.0], [3200.0, 1.0], [7100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[0.0, 1.0], [600.0, 1.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[0.0, 1.0], [2300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[700.0, 1.0], [1400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[0.0, 1.0], [600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[0.0, 1.0], [600.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[5800.0, 1.0], [22800.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[5400.0, 1.0], [6100.0, 1.0], [6300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[0.0, 2.0], [700.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[2100.0, 1.0], [4500.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[700.0, 1.0], [900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[2200.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[300.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[300.0, 1.0], [800.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[2200.0, 1.0], [2400.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[200.0, 1.0], [100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[21200.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[4800.0, 1.0], [1200.0, 1.0], [3100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[3100.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[2100.0, 1.0], [3100.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[700.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[0.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[0.0, 12.0], [300.0, 1.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[5600.0, 1.0], [6500.0, 1.0], [6800.0, 1.0]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1100.0, 1.0], [1400.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[700.0, 1.0], [5900.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1200.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[700.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1400.0, 1.0], [200.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[0.0, 1.0], [600.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[0.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[7200.0, 1.0], [3600.0, 1.0], [7600.0, 1.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[0.0, 1.0], [300.0, 5.0], [600.0, 1.0], [1200.0, 1.0], [1400.0, 1.0], [800.0, 1.0], [400.0, 2.0], [200.0, 12.0]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 24900.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 3.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 407.0, "series": [{"data": [[0.0, 407.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 47.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 29.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 3.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 2.4246575342465753, "minX": 1.66194132E12, "maxY": 3.0, "series": [{"data": [[1.66194138E12, 3.0], [1.66194132E12, 2.8227272727272723], [1.66194144E12, 2.4246575342465753]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194144E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 55.0, "minX": 1.0, "maxY": 12303.333333333332, "series": [{"data": [[3.0, 303.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[3.0, 303.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300-Aggregated", "isController": false}, {"data": [[3.0, 249.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[3.0, 249.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301-Aggregated", "isController": false}, {"data": [[3.0, 162.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[3.0, 162.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21-Aggregated", "isController": false}, {"data": [[3.0, 73.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[3.0, 73.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20-Aggregated", "isController": false}, {"data": [[3.0, 123.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[3.0, 123.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22-Aggregated", "isController": false}, {"data": [[3.0, 121.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[3.0, 121.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4-Aggregated", "isController": false}, {"data": [[3.0, 156.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[3.0, 156.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5-Aggregated", "isController": false}, {"data": [[3.0, 103.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[3.0, 103.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6-Aggregated", "isController": false}, {"data": [[3.0, 215.66666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[3.0, 215.66666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7-Aggregated", "isController": false}, {"data": [[3.0, 140.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[3.0, 140.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8-Aggregated", "isController": false}, {"data": [[3.0, 165.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[3.0, 165.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9-Aggregated", "isController": false}, {"data": [[3.0, 488.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[3.0, 488.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10-Aggregated", "isController": false}, {"data": [[3.0, 128.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[3.0, 128.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12-Aggregated", "isController": false}, {"data": [[3.0, 160.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[3.0, 160.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11-Aggregated", "isController": false}, {"data": [[2.0, 364.0], [1.0, 57.0], [3.0, 55.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[2.0, 158.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20-Aggregated", "isController": false}, {"data": [[3.0, 117.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[3.0, 117.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14-Aggregated", "isController": false}, {"data": [[3.0, 130.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[3.0, 130.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13-Aggregated", "isController": false}, {"data": [[3.0, 94.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[3.0, 94.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16-Aggregated", "isController": false}, {"data": [[2.0, 77.0], [1.0, 214.0], [3.0, 1441.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[2.0, 577.3333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23-Aggregated", "isController": false}, {"data": [[3.0, 172.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[3.0, 172.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15-Aggregated", "isController": false}, {"data": [[3.0, 96.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[3.0, 96.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18-Aggregated", "isController": false}, {"data": [[2.0, 66.0], [1.0, 66.0], [3.0, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[2.0, 70.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21-Aggregated", "isController": false}, {"data": [[3.0, 80.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[3.0, 80.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17-Aggregated", "isController": false}, {"data": [[2.0, 5318.0], [1.0, 79.0], [3.0, 83.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[2.0, 1826.6666666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22-Aggregated", "isController": false}, {"data": [[3.0, 62.666666666666664]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[3.0, 62.666666666666664]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19-Aggregated", "isController": false}, {"data": [[3.0, 367.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[3.0, 367.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895-Aggregated", "isController": false}, {"data": [[3.0, 317.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[3.0, 317.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896-Aggregated", "isController": false}, {"data": [[3.0, 206.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[3.0, 206.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9-Aggregated", "isController": false}, {"data": [[2.0, 96.0], [1.0, 71.0], [3.0, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[2.0, 80.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18-Aggregated", "isController": false}, {"data": [[2.0, 338.0], [1.0, 85.0], [3.0, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[2.0, 165.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19-Aggregated", "isController": false}, {"data": [[3.0, 132.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[3.0, 132.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3-Aggregated", "isController": false}, {"data": [[3.0, 227.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[3.0, 227.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4-Aggregated", "isController": false}, {"data": [[3.0, 73.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[3.0, 73.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19-Aggregated", "isController": false}, {"data": [[3.0, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[3.0, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1-Aggregated", "isController": false}, {"data": [[3.0, 154.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[3.0, 154.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2-Aggregated", "isController": false}, {"data": [[2.0, 7307.0], [1.0, 3422.0], [3.0, 2831.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[2.0, 4520.0]], "isOverall": false, "label": "Clearance-Aggregated", "isController": true}, {"data": [[3.0, 247.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[3.0, 247.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7-Aggregated", "isController": false}, {"data": [[3.0, 188.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[3.0, 188.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8-Aggregated", "isController": false}, {"data": [[3.0, 73.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[3.0, 73.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5-Aggregated", "isController": false}, {"data": [[2.0, 431.0], [1.0, 206.0], [3.0, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[2.0, 234.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9-Aggregated", "isController": false}, {"data": [[3.0, 164.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[3.0, 164.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6-Aggregated", "isController": false}, {"data": [[3.0, 350.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[3.0, 350.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12-Aggregated", "isController": false}, {"data": [[2.0, 186.0], [1.0, 1252.0], [3.0, 188.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[2.0, 542.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7-Aggregated", "isController": false}, {"data": [[3.0, 157.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[3.0, 157.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11-Aggregated", "isController": false}, {"data": [[2.0, 219.0], [1.0, 1227.0], [3.0, 74.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[2.0, 506.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8-Aggregated", "isController": false}, {"data": [[3.0, 247.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[3.0, 247.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14-Aggregated", "isController": false}, {"data": [[2.0, 62.0], [1.0, 58.0], [3.0, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[2.0, 65.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5-Aggregated", "isController": false}, {"data": [[3.0, 111.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[3.0, 111.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13-Aggregated", "isController": false}, {"data": [[2.0, 169.0], [1.0, 309.0], [3.0, 104.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[2.0, 194.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6-Aggregated", "isController": false}, {"data": [[3.0, 73.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[3.0, 73.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16-Aggregated", "isController": false}, {"data": [[2.0, 82.0], [1.0, 77.0], [3.0, 93.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[2.0, 84.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3-Aggregated", "isController": false}, {"data": [[3.0, 81.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[3.0, 81.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15-Aggregated", "isController": false}, {"data": [[2.0, 1200.0], [1.0, 62.0], [3.0, 74.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[2.0, 445.33333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4-Aggregated", "isController": false}, {"data": [[3.0, 123.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[3.0, 123.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18-Aggregated", "isController": false}, {"data": [[2.0, 78.0], [1.0, 339.0], [3.0, 82.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[2.0, 166.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1-Aggregated", "isController": false}, {"data": [[3.0, 160.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[3.0, 160.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17-Aggregated", "isController": false}, {"data": [[2.0, 68.0], [1.0, 74.0], [3.0, 84.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[2.0, 75.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2-Aggregated", "isController": false}, {"data": [[2.0, 793.0], [1.0, 642.0], [3.0, 714.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[2.0, 716.3333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12-Aggregated", "isController": false}, {"data": [[2.0, 868.0], [1.0, 1936.0], [3.0, 652.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[2.0, 1152.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0-Aggregated", "isController": false}, {"data": [[2.0, 2707.0], [1.0, 69.0], [3.0, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[2.0, 948.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13-Aggregated", "isController": false}, {"data": [[2.0, 229.0], [1.0, 192.0], [3.0, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[2.0, 164.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10-Aggregated", "isController": false}, {"data": [[2.0, 468.0], [1.0, 73.0], [3.0, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[2.0, 204.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11-Aggregated", "isController": false}, {"data": [[2.0, 69.0], [1.0, 67.0], [3.0, 65.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[2.0, 67.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16-Aggregated", "isController": false}, {"data": [[2.0, 71.0], [1.0, 68.0], [3.0, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[2.0, 68.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17-Aggregated", "isController": false}, {"data": [[3.0, 162.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[3.0, 162.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10-Aggregated", "isController": false}, {"data": [[2.0, 537.0], [1.0, 458.0], [3.0, 78.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[2.0, 357.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14-Aggregated", "isController": false}, {"data": [[2.0, 261.0], [1.0, 64.0], [3.0, 80.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[2.0, 135.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15-Aggregated", "isController": false}, {"data": [[2.0, 224.0], [3.0, 86.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[2.6666666666666665, 132.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-19-Aggregated", "isController": false}, {"data": [[2.0, 91.5], [1.0, 82.0], [3.0, 89.91666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[2.733333333333333, 89.6]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json-Aggregated", "isController": false}, {"data": [[3.0, 12303.333333333332]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[3.0, 12303.333333333332]], "isOverall": false, "label": "Makeupshop-Aggregated", "isController": true}, {"data": [[2.0, 7152.0], [1.0, 3285.0], [3.0, 2429.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[2.0, 4288.666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-Aggregated", "isController": false}, {"data": [[2.0, 79.0], [3.0, 151.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[2.6666666666666665, 127.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-11-Aggregated", "isController": false}, {"data": [[2.0, 70.0], [3.0, 238.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[2.6666666666666665, 182.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/-12-Aggregated", "isController": false}, {"data": [[2.0, 99.0], [3.0, 500.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[2.6666666666666665, 366.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-13-Aggregated", "isController": false}, {"data": [[2.0, 151.0], [3.0, 1229.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[2.6666666666666665, 870.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14-Aggregated", "isController": false}, {"data": [[2.0, 211.0], [3.0, 1107.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[2.6666666666666665, 808.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-15-Aggregated", "isController": false}, {"data": [[2.0, 88.0], [3.0, 598.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[2.6666666666666665, 428.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-16-Aggregated", "isController": false}, {"data": [[2.0, 93.0], [3.0, 759.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[2.6666666666666665, 537.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17-Aggregated", "isController": false}, {"data": [[2.0, 85.0], [3.0, 272.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[2.6666666666666665, 210.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18-Aggregated", "isController": false}, {"data": [[3.0, 276.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[3.0, 276.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696-Aggregated", "isController": false}, {"data": [[2.0, 82.0], [3.0, 158.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[2.6666666666666665, 132.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-10-Aggregated", "isController": false}, {"data": [[3.0, 10808.333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[3.0, 10808.333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-Aggregated", "isController": false}, {"data": [[2.0, 5454.0], [3.0, 6285.5]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[2.6666666666666665, 6008.333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-Aggregated", "isController": false}, {"data": [[3.0, 252.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[3.0, 252.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695-Aggregated", "isController": false}, {"data": [[2.0, 61.0], [3.0, 88.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[2.6666666666666665, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22-Aggregated", "isController": false}, {"data": [[2.0, 216.0], [3.0, 224.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[2.6666666666666665, 221.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/-23-Aggregated", "isController": false}, {"data": [[2.0, 69.0], [3.0, 416.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[2.6666666666666665, 300.33333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-24-Aggregated", "isController": false}, {"data": [[3.0, 2848.6666666666665]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[3.0, 2848.6666666666665]], "isOverall": false, "label": "Combo-Aggregated", "isController": true}, {"data": [[2.0, 74.0], [3.0, 139.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[2.6666666666666665, 117.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-25-Aggregated", "isController": false}, {"data": [[2.0, 118.0], [3.0, 81.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[2.6666666666666665, 93.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-26-Aggregated", "isController": false}, {"data": [[2.0, 73.0], [3.0, 80.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[2.6666666666666665, 77.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-27-Aggregated", "isController": false}, {"data": [[2.0, 62.0], [3.0, 70.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[2.6666666666666665, 67.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-28-Aggregated", "isController": false}, {"data": [[2.0, 88.0], [3.0, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[2.6666666666666665, 75.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-29-Aggregated", "isController": false}, {"data": [[2.0, 68.0], [3.0, 85.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[2.6666666666666665, 79.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-20-Aggregated", "isController": false}, {"data": [[2.0, 65.0], [3.0, 99.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[2.6666666666666665, 87.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-21-Aggregated", "isController": false}, {"data": [[3.0, 1237.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[3.0, 1237.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-Aggregated", "isController": false}, {"data": [[2.0, 271.0], [3.0, 233.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[2.6666666666666665, 245.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-33-Aggregated", "isController": false}, {"data": [[3.0, 915.6666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[3.0, 915.6666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3-Aggregated", "isController": false}, {"data": [[2.0, 344.0], [3.0, 279.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[2.6666666666666665, 300.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-34-Aggregated", "isController": false}, {"data": [[3.0, 135.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[3.0, 135.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2-Aggregated", "isController": false}, {"data": [[3.0, 248.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[3.0, 248.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1-Aggregated", "isController": false}, {"data": [[3.0, 1733.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[3.0, 1733.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0-Aggregated", "isController": false}, {"data": [[3.0, 4158.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[3.0, 4158.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22-Aggregated", "isController": false}, {"data": [[3.0, 174.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[3.0, 174.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21-Aggregated", "isController": false}, {"data": [[3.0, 738.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[3.0, 738.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6-Aggregated", "isController": false}, {"data": [[3.0, 198.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[3.0, 198.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24-Aggregated", "isController": false}, {"data": [[3.0, 313.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[3.0, 313.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5-Aggregated", "isController": false}, {"data": [[3.0, 7226.666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[3.0, 7226.666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23-Aggregated", "isController": false}, {"data": [[3.0, 280.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[3.0, 280.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4-Aggregated", "isController": false}, {"data": [[3.0, 3099.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[3.0, 3099.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-Aggregated", "isController": false}, {"data": [[3.0, 277.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[3.0, 277.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23-Aggregated", "isController": false}, {"data": [[3.0, 125.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[3.0, 125.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22-Aggregated", "isController": false}, {"data": [[3.0, 102.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[3.0, 102.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20-Aggregated", "isController": false}, {"data": [[3.0, 112.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[3.0, 112.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9-Aggregated", "isController": false}, {"data": [[3.0, 126.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[3.0, 126.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8-Aggregated", "isController": false}, {"data": [[3.0, 249.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[3.0, 249.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372-Aggregated", "isController": false}, {"data": [[2.0, 76.0], [3.0, 87.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[2.6666666666666665, 83.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-30-Aggregated", "isController": false}, {"data": [[3.0, 1580.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[3.0, 1580.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0-Aggregated", "isController": false}, {"data": [[2.0, 65.0], [3.0, 61.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[2.6666666666666665, 62.666666666666664]], "isOverall": false, "label": "https://www.banglashoppers.com/-31-Aggregated", "isController": false}, {"data": [[2.0, 2174.0], [3.0, 2582.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[2.6666666666666665, 2446.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32-Aggregated", "isController": false}, {"data": [[3.0, 405.33333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[3.0, 405.33333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371-Aggregated", "isController": false}, {"data": [[3.0, 184.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[3.0, 184.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21-Aggregated", "isController": false}, {"data": [[3.0, 184.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[3.0, 184.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20-Aggregated", "isController": false}, {"data": [[3.0, 124.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[3.0, 124.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19-Aggregated", "isController": false}, {"data": [[3.0, 108.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[3.0, 108.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18-Aggregated", "isController": false}, {"data": [[3.0, 156.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[3.0, 156.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15-Aggregated", "isController": false}, {"data": [[3.0, 149.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[3.0, 149.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14-Aggregated", "isController": false}, {"data": [[3.0, 96.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[3.0, 96.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17-Aggregated", "isController": false}, {"data": [[3.0, 98.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[3.0, 98.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16-Aggregated", "isController": false}, {"data": [[3.0, 201.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[3.0, 201.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11-Aggregated", "isController": false}, {"data": [[3.0, 214.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[3.0, 214.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10-Aggregated", "isController": false}, {"data": [[3.0, 150.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[3.0, 150.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13-Aggregated", "isController": false}, {"data": [[3.0, 181.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[3.0, 181.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12-Aggregated", "isController": false}, {"data": [[2.0, 72.5], [1.0, 55.0], [3.0, 134.41666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[2.733333333333333, 120.86666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?-Aggregated", "isController": false}, {"data": [[3.0, 423.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[3.0, 423.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0-Aggregated", "isController": false}, {"data": [[3.0, 68.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[3.0, 68.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1-Aggregated", "isController": false}, {"data": [[3.0, 74.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[3.0, 74.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2-Aggregated", "isController": false}, {"data": [[3.0, 74.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[3.0, 74.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3-Aggregated", "isController": false}, {"data": [[2.0, 5627.0], [3.0, 6668.5]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[2.6666666666666665, 6321.333333333333]], "isOverall": false, "label": "Home-Aggregated", "isController": true}, {"data": [[2.0, 1427.0], [3.0, 776.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[2.6666666666666665, 993.3333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-0-Aggregated", "isController": false}, {"data": [[2.0, 747.0], [3.0, 3723.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[2.6666666666666665, 2731.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1-Aggregated", "isController": false}, {"data": [[2.0, 775.0], [3.0, 546.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[2.6666666666666665, 622.6666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-2-Aggregated", "isController": false}, {"data": [[2.0, 775.0], [3.0, 284.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[2.6666666666666665, 448.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-Aggregated", "isController": false}, {"data": [[2.0, 281.0], [3.0, 767.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[2.6666666666666665, 605.3333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-4-Aggregated", "isController": false}, {"data": [[2.0, 770.0], [3.0, 273.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[2.6666666666666665, 438.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-5-Aggregated", "isController": false}, {"data": [[2.0, 1437.0], [3.0, 581.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[2.6666666666666665, 866.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-6-Aggregated", "isController": false}, {"data": [[2.0, 681.0], [3.0, 488.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[2.6666666666666665, 552.3333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-7-Aggregated", "isController": false}, {"data": [[2.0, 86.0], [3.0, 411.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[2.6666666666666665, 302.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-8-Aggregated", "isController": false}, {"data": [[2.0, 86.0], [3.0, 224.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[2.6666666666666665, 178.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-9-Aggregated", "isController": false}, {"data": [[3.0, 6188.666666666667]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[3.0, 6188.666666666667]], "isOverall": false, "label": "HotOffers-Aggregated", "isController": true}, {"data": [[3.0, 408.4166666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}, {"data": [[3.0, 408.4166666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 3.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 3789.483333333333, "minX": 1.66194132E12, "maxY": 656189.5333333333, "series": [{"data": [[1.66194138E12, 48813.166666666664], [1.66194132E12, 656189.5333333333], [1.66194144E12, 52682.13333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66194138E12, 3789.483333333333], [1.66194132E12, 5517.05], [1.66194144E12, 4282.916666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194144E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 62.0, "minX": 1.66194132E12, "maxY": 12303.333333333332, "series": [{"data": [[1.66194138E12, 273.0], [1.66194132E12, 319.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66194138E12, 253.0], [1.66194132E12, 247.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66194138E12, 207.0], [1.66194144E12, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66194138E12, 74.0], [1.66194144E12, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66194138E12, 141.5], [1.66194144E12, 87.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66194138E12, 148.5], [1.66194144E12, 67.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66194138E12, 70.0], [1.66194144E12, 329.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66194138E12, 102.0], [1.66194144E12, 105.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66194138E12, 151.5], [1.66194144E12, 344.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66194138E12, 150.5], [1.66194144E12, 119.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66194138E12, 212.5], [1.66194144E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66194138E12, 138.0], [1.66194144E12, 1189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66194138E12, 154.5], [1.66194144E12, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66194138E12, 198.0], [1.66194144E12, 84.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66194144E12, 158.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66194138E12, 137.5], [1.66194144E12, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66194138E12, 81.5], [1.66194144E12, 229.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66194138E12, 97.0], [1.66194144E12, 90.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66194144E12, 577.3333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66194138E12, 95.0], [1.66194144E12, 326.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66194138E12, 101.5], [1.66194144E12, 87.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66194144E12, 70.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66194138E12, 87.0], [1.66194144E12, 68.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66194144E12, 1826.6666666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66194138E12, 63.0], [1.66194144E12, 62.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66194138E12, 278.0], [1.66194132E12, 412.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66194138E12, 250.0], [1.66194144E12, 451.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66194132E12, 206.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66194144E12, 80.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66194144E12, 165.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66194132E12, 132.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66194132E12, 227.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66194138E12, 77.0], [1.66194144E12, 67.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66194132E12, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66194132E12, 154.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66194138E12, 2831.0], [1.66194144E12, 5364.5]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66194132E12, 247.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66194132E12, 188.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66194132E12, 73.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66194144E12, 234.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66194132E12, 164.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66194138E12, 228.5], [1.66194144E12, 595.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66194144E12, 542.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66194138E12, 196.0], [1.66194144E12, 80.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66194144E12, 506.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66194138E12, 91.0], [1.66194144E12, 561.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66194144E12, 65.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66194138E12, 96.5], [1.66194144E12, 140.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66194144E12, 194.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66194138E12, 68.5], [1.66194144E12, 84.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66194144E12, 84.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66194138E12, 78.0], [1.66194144E12, 89.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66194144E12, 445.33333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66194138E12, 146.5], [1.66194144E12, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66194144E12, 166.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66194138E12, 72.5], [1.66194144E12, 335.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66194144E12, 75.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66194144E12, 716.3333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66194144E12, 1152.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66194144E12, 948.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66194144E12, 164.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66194144E12, 204.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66194144E12, 67.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66194144E12, 68.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66194138E12, 206.5], [1.66194144E12, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66194144E12, 357.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66194144E12, 135.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.66194132E12, 132.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66194138E12, 85.8], [1.66194132E12, 82.2], [1.66194144E12, 100.8]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66194132E12, 12303.333333333332]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66194144E12, 4288.666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.66194132E12, 127.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.66194132E12, 182.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.66194132E12, 366.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.66194132E12, 870.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.66194132E12, 808.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.66194132E12, 428.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.66194132E12, 537.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.66194132E12, 210.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66194138E12, 252.0], [1.66194144E12, 326.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.66194132E12, 132.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66194132E12, 10808.333333333332]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.66194132E12, 6008.333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66194138E12, 249.0], [1.66194144E12, 259.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.66194132E12, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.66194132E12, 221.33333333333331]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.66194132E12, 300.33333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66194138E12, 2012.5], [1.66194144E12, 4521.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.66194132E12, 117.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.66194132E12, 93.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.66194132E12, 77.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.66194132E12, 67.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.66194132E12, 75.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.66194132E12, 79.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.66194132E12, 87.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66194138E12, 854.5], [1.66194144E12, 2002.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.66194132E12, 245.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66194138E12, 244.5], [1.66194144E12, 2258.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.66194132E12, 300.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66194138E12, 167.0], [1.66194144E12, 72.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66194138E12, 258.5], [1.66194144E12, 227.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66194138E12, 2154.5], [1.66194144E12, 891.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66194132E12, 4158.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66194138E12, 227.0], [1.66194144E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66194132E12, 86.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66194138E12, 283.0], [1.66194144E12, 1650.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66194132E12, 198.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66194138E12, 235.5], [1.66194144E12, 470.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66194132E12, 7226.666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66194138E12, 185.0], [1.66194144E12, 471.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66194138E12, 3054.5], [1.66194144E12, 3188.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66194138E12, 312.5], [1.66194144E12, 208.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66194138E12, 93.5], [1.66194144E12, 189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66194132E12, 102.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66194138E12, 136.0], [1.66194144E12, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66194138E12, 155.5], [1.66194144E12, 68.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66194138E12, 228.0], [1.66194144E12, 293.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.66194132E12, 83.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66194132E12, 1580.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.66194132E12, 62.666666666666664]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.66194132E12, 2446.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66194138E12, 228.5], [1.66194144E12, 759.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66194138E12, 86.0], [1.66194144E12, 381.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66194138E12, 67.5], [1.66194144E12, 418.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66194132E12, 124.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66194132E12, 108.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66194132E12, 156.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66194132E12, 149.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66194132E12, 96.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66194132E12, 98.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66194132E12, 201.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66194132E12, 214.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66194132E12, 150.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66194132E12, 181.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66194138E12, 62.6], [1.66194132E12, 190.6], [1.66194144E12, 109.4]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66194138E12, 271.5], [1.66194144E12, 726.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66194138E12, 70.5], [1.66194144E12, 65.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66194138E12, 73.5], [1.66194144E12, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66194138E12, 78.5], [1.66194144E12, 67.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.66194132E12, 6321.333333333333]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.66194132E12, 993.3333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.66194132E12, 2731.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.66194132E12, 622.6666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.66194132E12, 448.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.66194132E12, 605.3333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66194132E12, 438.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.66194132E12, 866.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.66194132E12, 552.3333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.66194132E12, 302.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.66194132E12, 178.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66194138E12, 7683.0], [1.66194132E12, 5441.5]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.66194138E12, 262.4], [1.66194132E12, 350.5], [1.66194144E12, 918.25]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194144E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66194132E12, "maxY": 7079.0, "series": [{"data": [[1.66194138E12, 272.0], [1.66194132E12, 319.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66194138E12, 252.0], [1.66194132E12, 246.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66194138E12, 97.0], [1.66194144E12, 99.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66194138E12, 153.0], [1.66194144E12, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66194144E12, 37.333333333333336]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66194138E12, 81.5], [1.66194144E12, 229.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66194138E12, 63.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66194138E12, 278.0], [1.66194132E12, 411.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66194138E12, 250.0], [1.66194144E12, 451.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66194138E12, 418.0], [1.66194144E12, 241.5]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66194132E12, 122.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66194138E12, 214.5], [1.66194144E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66194138E12, 83.5], [1.66194144E12, 247.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66194138E12, 96.5], [1.66194144E12, 139.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66194144E12, 100.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66194144E12, 193.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66194144E12, 157.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66194144E12, 791.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66194144E12, 109.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.66194132E12, 132.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194132E12, 49.8], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66194132E12, 2216.6666666666665]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66194144E12, 157.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.66194132E12, 127.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.66194132E12, 160.66666666666669]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.66194132E12, 279.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.66194132E12, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.66194132E12, 122.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.66194132E12, 95.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.66194132E12, 97.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.66194132E12, 169.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66194138E12, 252.0], [1.66194144E12, 325.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.66194132E12, 132.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66194132E12, 928.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.66194132E12, 585.3333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66194138E12, 249.0], [1.66194144E12, 258.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.66194132E12, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.66194132E12, 82.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.66194132E12, 259.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66194138E12, 1241.5], [1.66194144E12, 2970.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.66194132E12, 116.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.66194132E12, 93.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.66194132E12, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.66194132E12, 67.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.66194132E12, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.66194132E12, 78.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.66194132E12, 87.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66194138E12, 172.0], [1.66194144E12, 553.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.66194132E12, 245.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.66194132E12, 300.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66194138E12, 803.0], [1.66194144E12, 314.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66194132E12, 141.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66194132E12, 18.666666666666664]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66194138E12, 282.5], [1.66194144E12, 1571.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66194132E12, 7079.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66194138E12, 803.0], [1.66194144E12, 314.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66194138E12, 228.0], [1.66194144E12, 293.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.66194132E12, 83.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66194132E12, 928.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.66194132E12, 62.666666666666664]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.66194132E12, 84.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66194138E12, 228.5], [1.66194144E12, 759.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66194138E12, 37.5], [1.66194144E12, 418.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66194132E12, 155.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66194132E12, 133.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66194132E12, 122.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66194132E12, 156.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66194138E12, 62.6], [1.66194132E12, 190.6], [1.66194144E12, 109.4]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66194138E12, 172.0], [1.66194144E12, 553.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.66194132E12, 898.3333333333334]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.66194132E12, 585.3333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.66194132E12, 833.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.66194132E12, 308.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.66194132E12, 447.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.66194132E12, 605.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66194132E12, 423.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.66194132E12, 859.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.66194132E12, 234.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.66194132E12, 301.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.66194132E12, 178.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66194138E12, 4664.0], [1.66194132E12, 2987.5]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.66194138E12, 261.50000000000006], [1.66194132E12, 290.29999999999995], [1.66194144E12, 918.25]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194144E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66194132E12, "maxY": 7143.0, "series": [{"data": [[1.66194138E12, 0.0], [1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66194138E12, 126.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66194138E12, 60.5], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66194138E12, 62.5], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66194138E12, 73.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66194138E12, 68.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66194138E12, 138.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66194138E12, 69.0], [1.66194144E12, 1120.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66194138E12, 62.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66194138E12, 123.5], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66194138E12, 68.5], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66194144E12, 488.66666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66194144E12, 1748.6666666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66194132E12, 111.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66194132E12, 50.666666666666664]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66194132E12, 141.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66194132E12, 80.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66194132E12, 64.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66194132E12, 66.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66194144E12, 160.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66194138E12, 128.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66194144E12, 461.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66194138E12, 125.5], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66194144E12, 426.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 124.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66194144E12, 374.66666666666663]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66194138E12, 68.5], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66194144E12, 122.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66194144E12, 715.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66194144E12, 84.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66194144E12, 42.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66194138E12, 129.5], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66194144E12, 37.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66194144E12, 63.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.66194132E12, 43.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194132E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.66194132E12, 40.333333333333336]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.66194132E12, 60.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.66194132E12, 64.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.66194132E12, 45.333333333333336]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.66194132E12, 485.33333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.66194132E12, 39.666666666666664]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.66194132E12, 154.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66194138E12, 164.0], [1.66194144E12, 2184.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.66194132E12, 176.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66194138E12, 70.5], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66194138E12, 170.5], [1.66194144E12, 132.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66194138E12, 76.0], [1.66194144E12, 127.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66194132E12, 40.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66194138E12, 145.5], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66194138E12, 180.0], [1.66194144E12, 1472.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66194132E12, 58.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66194138E12, 171.5], [1.66194144E12, 152.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66194132E12, 7143.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66194138E12, 107.5], [1.66194144E12, 121.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66194138E12, 76.0], [1.66194144E12, 127.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66194138E12, 69.5], [1.66194144E12, 118.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 112.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66194138E12, 61.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66194138E12, 69.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66194132E12, 41.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66194132E12, 106.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66194132E12, 107.33333333333334]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66194132E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66194132E12, 56.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194132E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66194138E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.66194132E12, 485.33333333333337]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.66194132E12, 485.33333333333337]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.66194132E12, 726.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.66194132E12, 112.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.66194132E12, 182.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.66194132E12, 503.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.66194132E12, 347.3333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.66194132E12, 763.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.66194132E12, 125.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.66194132E12, 215.66666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.66194132E12, 85.33333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66194138E12, 127.0], [1.66194132E12, 76.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.66194138E12, 0.0], [1.66194132E12, 0.0], [1.66194144E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194144E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 53.0, "minX": 1.66194132E12, "maxY": 22843.0, "series": [{"data": [[1.66194138E12, 4832.0], [1.66194132E12, 22843.0], [1.66194144E12, 7152.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66194138E12, 297.19999999999993], [1.66194132E12, 1293.0], [1.66194144E12, 1219.3999999999999]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66194138E12, 4546.560000000006], [1.66194132E12, 19888.60000000008], [1.66194144E12, 6345.0400000000045]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66194138E12, 392.4], [1.66194132E12, 3147.0], [1.66194144E12, 2206.7999999999956]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66194138E12, 54.0], [1.66194132E12, 53.0], [1.66194144E12, 55.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66194138E12, 188.0], [1.66194132E12, 193.0], [1.66194144E12, 93.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194144E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 2.0, "minX": 1.0, "maxY": 2371.0, "series": [{"data": [[2.0, 305.0], [8.0, 257.5], [32.0, 78.5], [35.0, 129.0], [9.0, 192.0], [10.0, 117.5], [3.0, 2371.0], [12.0, 231.5], [14.0, 228.0], [15.0, 78.5], [1.0, 870.0], [4.0, 219.0], [16.0, 92.5], [19.0, 225.0], [5.0, 273.0], [21.0, 77.0], [24.0, 89.0], [6.0, 198.5], [25.0, 129.0], [7.0, 210.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 246.0], [3.0, 261.0], [15.0, 2.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 35.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 325.0, "series": [{"data": [[2.0, 278.0], [8.0, 244.5], [32.0, 0.0], [35.0, 0.0], [9.0, 0.0], [10.0, 89.0], [3.0, 80.0], [12.0, 167.5], [14.0, 0.0], [15.0, 0.0], [1.0, 325.0], [4.0, 186.5], [16.0, 0.0], [19.0, 77.5], [5.0, 252.0], [21.0, 0.0], [24.0, 85.5], [6.0, 0.0], [25.0, 67.0], [7.0, 57.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 0.0], [3.0, 0.0], [15.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 35.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 2.1666666666666665, "minX": 1.66194132E12, "maxY": 3.55, "series": [{"data": [[1.66194138E12, 2.1666666666666665], [1.66194132E12, 3.55], [1.66194144E12, 2.3833333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194144E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.05, "minX": 1.66194132E12, "maxY": 2.5833333333333335, "series": [{"data": [[1.66194138E12, 0.8833333333333333], [1.66194132E12, 2.5833333333333335], [1.66194144E12, 0.7666666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66194138E12, 1.3], [1.66194132E12, 0.9], [1.66194144E12, 1.6166666666666667]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.NoHttpResponseException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194144E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66194132E12, "maxY": 0.16666666666666666, "series": [{"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-11-success", "isController": false}, {"data": [[1.66194138E12, 0.016666666666666666], [1.66194144E12, 0.03333333333333333]], "isOverall": false, "label": "Clearance-success", "isController": true}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-28-success", "isController": false}, {"data": [[1.66194138E12, 0.08333333333333333], [1.66194132E12, 0.08333333333333333], [1.66194144E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-7-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-30-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17-success", "isController": false}, {"data": [[1.66194138E12, 0.016666666666666666], [1.66194132E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-15-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21-success", "isController": false}, {"data": [[1.66194138E12, 0.016666666666666666], [1.66194132E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-0-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-21-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-18-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-25-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-12-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-8-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-27-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-16-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-4-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-33-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22-success", "isController": false}, {"data": [[1.66194138E12, 0.016666666666666666], [1.66194132E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "Combo-success", "isController": true}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-1-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-19-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-20-success", "isController": false}, {"data": [[1.66194138E12, 0.16666666666666666], [1.66194132E12, 0.11666666666666667], [1.66194144E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-24-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-failure", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-13-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-9-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-26-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9-success", "isController": false}, {"data": [[1.66194138E12, 0.016666666666666666], [1.66194132E12, 0.016666666666666666]], "isOverall": false, "label": "HotOffers-success", "isController": true}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-17-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "Home-success", "isController": true}, {"data": [[1.66194132E12, 0.03333333333333333]], "isOverall": false, "label": "Makeupshop-failure", "isController": true}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-5-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-32-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-2-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12-success", "isController": false}, {"data": [[1.66194138E12, 0.08333333333333333], [1.66194132E12, 0.08333333333333333], [1.66194144E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-23-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16-success", "isController": false}, {"data": [[1.66194132E12, 0.016666666666666666]], "isOverall": false, "label": "HotOffers-failure", "isController": true}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-31-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-6-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-14-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-29-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23-success", "isController": false}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-34-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-success", "isController": false}, {"data": [[1.66194132E12, 0.016666666666666666]], "isOverall": false, "label": "Makeupshop-success", "isController": true}, {"data": [[1.66194144E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7-success", "isController": false}, {"data": [[1.66194138E12, 0.03333333333333333], [1.66194144E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-22-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/-10-success", "isController": false}, {"data": [[1.66194132E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194144E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.1, "minX": 1.66194132E12, "maxY": 3.566666666666667, "series": [{"data": [[1.66194138E12, 2.25], [1.66194132E12, 3.566666666666667], [1.66194144E12, 2.433333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.66194132E12, 0.1]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194144E12, "title": "Total Transactions Per Second"}},
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
