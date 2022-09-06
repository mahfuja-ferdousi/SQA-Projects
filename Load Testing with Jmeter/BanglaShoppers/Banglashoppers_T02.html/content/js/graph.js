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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 6.0, "series": [{"data": [[600.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[300.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[0.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[300.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[0.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[0.0, 1.0], [5300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[300.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[700.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[100.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[2400.0, 1.0], [1300.0, 1.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[0.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[700.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[600.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[600.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[600.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[600.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[700.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[0.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[0.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[0.0, 2.0], [100.0, 6.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[6500.0, 1.0], [13200.0, 1.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1200.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[300.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[4900.0, 1.0], [7400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[25700.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[8300.0, 1.0], [3100.0, 1.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[6900.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[300.0, 1.0], [22400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[300.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[300.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1200.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[600.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[4100.0, 1.0], [3000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[0.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[900.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1200.0, 1.0], [2600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[5500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[16400.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1200.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1500.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[2400.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[600.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[200.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[0.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[600.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[0.0, 1.0], [600.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[0.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[0.0, 6.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[200.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1500.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[26000.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1100.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[700.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1600.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[700.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[16800.0, 1.0], [19100.0, 1.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[0.0, 1.0], [300.0, 5.0], [10200.0, 1.0], [200.0, 5.0], [400.0, 2.0], [3700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 26000.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 3.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 244.0, "series": [{"data": [[0.0, 244.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 47.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 30.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 3.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.5, "minX": 1.6619406E12, "maxY": 2.0, "series": [{"data": [[1.66194078E12, 1.5], [1.6619406E12, 2.0], [1.66194072E12, 1.9921875], [1.66194066E12, 2.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194078E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 61.5, "minX": 1.0, "maxY": 17962.0, "series": [{"data": [[2.0, 478.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[2.0, 478.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300-Aggregated", "isController": false}, {"data": [[2.0, 412.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[2.0, 412.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301-Aggregated", "isController": false}, {"data": [[2.0, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[2.0, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21-Aggregated", "isController": false}, {"data": [[2.0, 72.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[2.0, 72.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20-Aggregated", "isController": false}, {"data": [[2.0, 169.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[2.0, 169.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22-Aggregated", "isController": false}, {"data": [[2.0, 410.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[2.0, 410.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4-Aggregated", "isController": false}, {"data": [[2.0, 119.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[2.0, 119.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5-Aggregated", "isController": false}, {"data": [[2.0, 133.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[2.0, 133.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6-Aggregated", "isController": false}, {"data": [[2.0, 104.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[2.0, 104.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7-Aggregated", "isController": false}, {"data": [[2.0, 186.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[2.0, 186.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8-Aggregated", "isController": false}, {"data": [[2.0, 185.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[2.0, 185.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9-Aggregated", "isController": false}, {"data": [[2.0, 237.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[2.0, 237.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10-Aggregated", "isController": false}, {"data": [[2.0, 314.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[2.0, 314.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12-Aggregated", "isController": false}, {"data": [[2.0, 228.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[2.0, 228.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11-Aggregated", "isController": false}, {"data": [[2.0, 84.0], [1.0, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.5, 80.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20-Aggregated", "isController": false}, {"data": [[2.0, 663.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[2.0, 663.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14-Aggregated", "isController": false}, {"data": [[2.0, 336.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[2.0, 336.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13-Aggregated", "isController": false}, {"data": [[2.0, 94.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[2.0, 94.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16-Aggregated", "isController": false}, {"data": [[2.0, 108.0], [1.0, 248.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.5, 178.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23-Aggregated", "isController": false}, {"data": [[2.0, 2711.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[2.0, 2711.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15-Aggregated", "isController": false}, {"data": [[2.0, 145.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[2.0, 145.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18-Aggregated", "isController": false}, {"data": [[2.0, 100.0], [1.0, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.5, 84.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21-Aggregated", "isController": false}, {"data": [[2.0, 89.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[2.0, 89.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17-Aggregated", "isController": false}, {"data": [[2.0, 99.0], [1.0, 251.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.5, 175.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22-Aggregated", "isController": false}, {"data": [[2.0, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[2.0, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19-Aggregated", "isController": false}, {"data": [[2.0, 404.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[2.0, 404.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895-Aggregated", "isController": false}, {"data": [[2.0, 291.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[2.0, 291.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896-Aggregated", "isController": false}, {"data": [[2.0, 268.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[2.0, 268.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9-Aggregated", "isController": false}, {"data": [[2.0, 104.0], [1.0, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.5, 86.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18-Aggregated", "isController": false}, {"data": [[2.0, 103.0], [1.0, 67.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.5, 85.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19-Aggregated", "isController": false}, {"data": [[2.0, 431.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[2.0, 431.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3-Aggregated", "isController": false}, {"data": [[2.0, 1061.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[2.0, 1061.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4-Aggregated", "isController": false}, {"data": [[2.0, 384.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[2.0, 384.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19-Aggregated", "isController": false}, {"data": [[2.0, 162.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[2.0, 162.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1-Aggregated", "isController": false}, {"data": [[2.0, 778.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[2.0, 778.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2-Aggregated", "isController": false}, {"data": [[2.0, 1392.0], [1.0, 2426.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.5, 1909.0]], "isOverall": false, "label": "Clearance-Aggregated", "isController": true}, {"data": [[2.0, 948.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[2.0, 948.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7-Aggregated", "isController": false}, {"data": [[2.0, 123.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[2.0, 123.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8-Aggregated", "isController": false}, {"data": [[2.0, 150.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[2.0, 150.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5-Aggregated", "isController": false}, {"data": [[2.0, 103.0], [1.0, 198.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.5, 150.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9-Aggregated", "isController": false}, {"data": [[2.0, 447.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[2.0, 447.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6-Aggregated", "isController": false}, {"data": [[2.0, 105.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[2.0, 105.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12-Aggregated", "isController": false}, {"data": [[2.0, 111.0], [1.0, 673.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.5, 392.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7-Aggregated", "isController": false}, {"data": [[2.0, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[2.0, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11-Aggregated", "isController": false}, {"data": [[2.0, 112.0], [1.0, 368.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.5, 240.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8-Aggregated", "isController": false}, {"data": [[2.0, 203.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[2.0, 203.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14-Aggregated", "isController": false}, {"data": [[2.0, 409.0], [1.0, 680.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.5, 544.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5-Aggregated", "isController": false}, {"data": [[2.0, 121.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[2.0, 121.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13-Aggregated", "isController": false}, {"data": [[2.0, 401.0], [1.0, 628.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.5, 514.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6-Aggregated", "isController": false}, {"data": [[2.0, 190.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[2.0, 190.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16-Aggregated", "isController": false}, {"data": [[2.0, 412.0], [1.0, 350.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.5, 381.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3-Aggregated", "isController": false}, {"data": [[2.0, 192.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[2.0, 192.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15-Aggregated", "isController": false}, {"data": [[2.0, 122.0], [1.0, 610.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.5, 366.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4-Aggregated", "isController": false}, {"data": [[2.0, 117.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[2.0, 117.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18-Aggregated", "isController": false}, {"data": [[2.0, 379.0], [1.0, 610.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.5, 494.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1-Aggregated", "isController": false}, {"data": [[2.0, 103.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[2.0, 103.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17-Aggregated", "isController": false}, {"data": [[2.0, 117.0], [1.0, 108.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.5, 112.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2-Aggregated", "isController": false}, {"data": [[2.0, 128.0], [1.0, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.5, 101.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12-Aggregated", "isController": false}, {"data": [[2.0, 268.0], [1.0, 702.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.5, 485.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0-Aggregated", "isController": false}, {"data": [[2.0, 118.0], [1.0, 137.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.5, 127.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13-Aggregated", "isController": false}, {"data": [[2.0, 97.0], [1.0, 213.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.5, 155.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10-Aggregated", "isController": false}, {"data": [[2.0, 100.0], [1.0, 202.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.5, 151.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11-Aggregated", "isController": false}, {"data": [[2.0, 110.0], [1.0, 77.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.5, 93.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16-Aggregated", "isController": false}, {"data": [[2.0, 403.0], [1.0, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.5, 239.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17-Aggregated", "isController": false}, {"data": [[2.0, 81.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[2.0, 81.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10-Aggregated", "isController": false}, {"data": [[2.0, 440.0], [1.0, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.5, 257.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14-Aggregated", "isController": false}, {"data": [[2.0, 114.0], [1.0, 66.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.5, 90.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15-Aggregated", "isController": false}, {"data": [[2.0, 109.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[2.0, 109.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19-Aggregated", "isController": false}, {"data": [[2.0, 168.33333333333337], [1.0, 426.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.9, 194.10000000000002]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json-Aggregated", "isController": false}, {"data": [[2.0, 9897.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[2.0, 9897.0]], "isOverall": false, "label": "Makeupshop-Aggregated", "isController": true}, {"data": [[2.0, 1214.0], [1.0, 1887.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.5, 1550.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-Aggregated", "isController": false}, {"data": [[2.0, 125.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[2.0, 125.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11-Aggregated", "isController": false}, {"data": [[2.0, 109.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[2.0, 109.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-12-Aggregated", "isController": false}, {"data": [[2.0, 88.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[2.0, 88.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13-Aggregated", "isController": false}, {"data": [[2.0, 233.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[2.0, 233.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14-Aggregated", "isController": false}, {"data": [[2.0, 295.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[2.0, 295.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15-Aggregated", "isController": false}, {"data": [[2.0, 393.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[2.0, 393.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-16-Aggregated", "isController": false}, {"data": [[2.0, 305.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[2.0, 305.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17-Aggregated", "isController": false}, {"data": [[2.0, 111.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[2.0, 111.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18-Aggregated", "isController": false}, {"data": [[2.0, 260.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[2.0, 260.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696-Aggregated", "isController": false}, {"data": [[2.0, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[2.0, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10-Aggregated", "isController": false}, {"data": [[2.0, 6213.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[2.0, 6213.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-Aggregated", "isController": false}, {"data": [[2.0, 14807.5]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[2.0, 14807.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-Aggregated", "isController": false}, {"data": [[2.0, 331.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[2.0, 331.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695-Aggregated", "isController": false}, {"data": [[2.0, 81.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[2.0, 81.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22-Aggregated", "isController": false}, {"data": [[2.0, 159.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[2.0, 159.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-23-Aggregated", "isController": false}, {"data": [[2.0, 120.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[2.0, 120.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24-Aggregated", "isController": false}, {"data": [[2.0, 5776.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[2.0, 5776.0]], "isOverall": false, "label": "Combo-Aggregated", "isController": true}, {"data": [[2.0, 220.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[2.0, 220.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25-Aggregated", "isController": false}, {"data": [[2.0, 210.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[2.0, 210.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-26-Aggregated", "isController": false}, {"data": [[2.0, 340.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[2.0, 340.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27-Aggregated", "isController": false}, {"data": [[2.0, 154.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[2.0, 154.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28-Aggregated", "isController": false}, {"data": [[2.0, 77.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[2.0, 77.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-29-Aggregated", "isController": false}, {"data": [[2.0, 88.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[2.0, 88.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-20-Aggregated", "isController": false}, {"data": [[2.0, 80.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[2.0, 80.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-21-Aggregated", "isController": false}, {"data": [[2.0, 4402.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[2.0, 4402.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-Aggregated", "isController": false}, {"data": [[2.0, 11392.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[2.0, 11392.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33-Aggregated", "isController": false}, {"data": [[2.0, 894.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[2.0, 894.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3-Aggregated", "isController": false}, {"data": [[2.0, 655.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[2.0, 655.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34-Aggregated", "isController": false}, {"data": [[2.0, 1121.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[2.0, 1121.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2-Aggregated", "isController": false}, {"data": [[2.0, 1428.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[2.0, 1428.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1-Aggregated", "isController": false}, {"data": [[2.0, 2148.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[2.0, 2148.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0-Aggregated", "isController": false}, {"data": [[2.0, 3610.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[2.0, 3610.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22-Aggregated", "isController": false}, {"data": [[2.0, 413.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[2.0, 413.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7-Aggregated", "isController": false}, {"data": [[2.0, 88.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[2.0, 88.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21-Aggregated", "isController": false}, {"data": [[2.0, 1459.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[2.0, 1459.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6-Aggregated", "isController": false}, {"data": [[2.0, 783.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[2.0, 783.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24-Aggregated", "isController": false}, {"data": [[2.0, 1957.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[2.0, 1957.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5-Aggregated", "isController": false}, {"data": [[2.0, 847.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[2.0, 847.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23-Aggregated", "isController": false}, {"data": [[2.0, 3797.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[2.0, 3797.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4-Aggregated", "isController": false}, {"data": [[2.0, 10147.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[2.0, 10147.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-Aggregated", "isController": false}, {"data": [[2.0, 763.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[2.0, 763.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23-Aggregated", "isController": false}, {"data": [[2.0, 285.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[2.0, 285.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22-Aggregated", "isController": false}, {"data": [[2.0, 176.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[2.0, 176.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20-Aggregated", "isController": false}, {"data": [[2.0, 74.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[2.0, 74.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9-Aggregated", "isController": false}, {"data": [[2.0, 78.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[2.0, 78.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8-Aggregated", "isController": false}, {"data": [[2.0, 263.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[2.0, 263.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372-Aggregated", "isController": false}, {"data": [[2.0, 118.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[2.0, 118.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30-Aggregated", "isController": false}, {"data": [[2.0, 1505.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[2.0, 1505.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0-Aggregated", "isController": false}, {"data": [[2.0, 61.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[2.0, 61.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-31-Aggregated", "isController": false}, {"data": [[2.0, 2035.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[2.0, 2035.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32-Aggregated", "isController": false}, {"data": [[2.0, 455.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[2.0, 455.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371-Aggregated", "isController": false}, {"data": [[2.0, 80.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[2.0, 80.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21-Aggregated", "isController": false}, {"data": [[2.0, 80.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[2.0, 80.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20-Aggregated", "isController": false}, {"data": [[2.0, 535.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[2.0, 535.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19-Aggregated", "isController": false}, {"data": [[2.0, 285.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[2.0, 285.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18-Aggregated", "isController": false}, {"data": [[2.0, 100.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[2.0, 100.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15-Aggregated", "isController": false}, {"data": [[2.0, 150.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[2.0, 150.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14-Aggregated", "isController": false}, {"data": [[2.0, 103.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[2.0, 103.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17-Aggregated", "isController": false}, {"data": [[2.0, 113.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[2.0, 113.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16-Aggregated", "isController": false}, {"data": [[2.0, 113.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[2.0, 113.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11-Aggregated", "isController": false}, {"data": [[2.0, 377.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[2.0, 377.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10-Aggregated", "isController": false}, {"data": [[2.0, 345.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[2.0, 345.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13-Aggregated", "isController": false}, {"data": [[2.0, 335.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[2.0, 335.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12-Aggregated", "isController": false}, {"data": [[2.0, 81.44444444444446], [1.0, 113.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.9, 84.60000000000001]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?-Aggregated", "isController": false}, {"data": [[2.0, 658.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[2.0, 658.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0-Aggregated", "isController": false}, {"data": [[2.0, 997.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[2.0, 997.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1-Aggregated", "isController": false}, {"data": [[2.0, 896.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[2.0, 896.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2-Aggregated", "isController": false}, {"data": [[2.0, 117.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[2.0, 117.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3-Aggregated", "isController": false}, {"data": [[2.0, 15029.5]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[2.0, 15029.5]], "isOverall": false, "label": "Home-Aggregated", "isController": true}, {"data": [[2.0, 1086.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[2.0, 1086.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-0-Aggregated", "isController": false}, {"data": [[2.0, 849.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[2.0, 849.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-1-Aggregated", "isController": false}, {"data": [[2.0, 631.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[2.0, 631.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-2-Aggregated", "isController": false}, {"data": [[2.0, 512.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[2.0, 512.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-Aggregated", "isController": false}, {"data": [[2.0, 254.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[2.0, 254.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4-Aggregated", "isController": false}, {"data": [[2.0, 1303.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[2.0, 1303.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-5-Aggregated", "isController": false}, {"data": [[2.0, 393.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[2.0, 393.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-6-Aggregated", "isController": false}, {"data": [[2.0, 495.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[2.0, 495.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7-Aggregated", "isController": false}, {"data": [[2.0, 189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[2.0, 189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8-Aggregated", "isController": false}, {"data": [[2.0, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[2.0, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-9-Aggregated", "isController": false}, {"data": [[2.0, 17962.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[2.0, 17962.0]], "isOverall": false, "label": "HotOffers-Aggregated", "isController": true}, {"data": [[2.0, 1145.5]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}, {"data": [[2.0, 1145.5]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 2.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 1376.0166666666667, "minX": 1.6619406E12, "maxY": 251248.21666666667, "series": [{"data": [[1.66194078E12, 19112.5], [1.6619406E12, 186614.13333333333], [1.66194072E12, 48123.2], [1.66194066E12, 251248.21666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66194078E12, 1679.0], [1.6619406E12, 1376.0166666666667], [1.66194072E12, 3505.3333333333335], [1.66194066E12, 2487.5333333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194078E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 61.5, "minX": 1.6619406E12, "maxY": 26033.0, "series": [{"data": [[1.66194066E12, 478.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66194066E12, 412.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66194072E12, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66194072E12, 72.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66194072E12, 169.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66194072E12, 410.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66194072E12, 119.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66194072E12, 133.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66194072E12, 104.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66194072E12, 186.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66194072E12, 185.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66194072E12, 237.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66194072E12, 314.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66194072E12, 228.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66194078E12, 80.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66194072E12, 663.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66194072E12, 336.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66194072E12, 94.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66194078E12, 178.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66194072E12, 2711.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66194072E12, 145.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66194078E12, 84.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66194072E12, 89.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66194078E12, 175.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66194072E12, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66194066E12, 404.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66194072E12, 291.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66194066E12, 268.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66194078E12, 86.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66194078E12, 85.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66194066E12, 431.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66194066E12, 1061.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66194072E12, 384.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66194066E12, 162.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66194066E12, 778.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66194072E12, 1909.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66194066E12, 948.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66194066E12, 123.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66194066E12, 150.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66194078E12, 150.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66194066E12, 447.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66194072E12, 105.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66194078E12, 392.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66194072E12, 79.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66194078E12, 240.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66194072E12, 203.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66194078E12, 544.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66194072E12, 121.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66194078E12, 514.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66194072E12, 190.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66194078E12, 381.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66194072E12, 192.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66194078E12, 366.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66194072E12, 117.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66194078E12, 494.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66194072E12, 103.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66194078E12, 112.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66194078E12, 101.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66194078E12, 485.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66194078E12, 127.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66194078E12, 155.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66194078E12, 151.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66194078E12, 93.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66194078E12, 239.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66194072E12, 81.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66194078E12, 257.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66194078E12, 90.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.6619406E12, 109.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66194078E12, 274.5], [1.6619406E12, 100.0], [1.66194072E12, 115.25], [1.66194066E12, 277.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66194066E12, 9897.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66194078E12, 1550.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.6619406E12, 125.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.6619406E12, 109.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.6619406E12, 88.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.6619406E12, 233.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.6619406E12, 295.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.6619406E12, 393.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.6619406E12, 305.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.6619406E12, 111.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66194072E12, 260.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.6619406E12, 71.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66194066E12, 6213.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.6619406E12, 3843.0], [1.66194066E12, 25772.0]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66194072E12, 331.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.6619406E12, 81.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.6619406E12, 159.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.6619406E12, 120.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66194072E12, 5776.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.6619406E12, 220.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.6619406E12, 210.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.6619406E12, 340.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.6619406E12, 154.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.6619406E12, 77.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.6619406E12, 88.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.6619406E12, 80.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66194072E12, 4402.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.6619406E12, 354.0], [1.66194066E12, 22430.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66194072E12, 894.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.6619406E12, 655.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66194072E12, 1121.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66194072E12, 1428.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66194072E12, 2148.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66194066E12, 3610.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66194072E12, 413.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66194066E12, 88.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66194072E12, 1459.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66194066E12, 783.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66194072E12, 1957.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66194066E12, 847.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66194072E12, 3797.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66194072E12, 10147.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66194072E12, 763.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66194072E12, 285.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66194066E12, 176.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66194072E12, 74.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66194072E12, 78.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66194072E12, 263.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.6619406E12, 118.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66194066E12, 1505.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.6619406E12, 61.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.6619406E12, 2035.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66194072E12, 455.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66194072E12, 80.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66194072E12, 80.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66194066E12, 535.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66194066E12, 285.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66194066E12, 100.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66194066E12, 150.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66194066E12, 103.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66194066E12, 113.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66194066E12, 113.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66194066E12, 377.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66194066E12, 345.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66194066E12, 335.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66194078E12, 84.0], [1.6619406E12, 83.0], [1.66194072E12, 82.0], [1.66194066E12, 89.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66194072E12, 658.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66194072E12, 997.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66194072E12, 896.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66194072E12, 117.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.6619406E12, 4026.0], [1.66194066E12, 26033.0]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.6619406E12, 1086.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.6619406E12, 849.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.6619406E12, 631.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.6619406E12, 512.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.6619406E12, 254.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.6619406E12, 1303.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.6619406E12, 393.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.6619406E12, 495.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.6619406E12, 189.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.6619406E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66194066E12, 17962.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.6619406E12, 300.0], [1.66194072E12, 278.125], [1.66194066E12, 2583.8333333333335]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194078E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.6619406E12, "maxY": 22429.0, "series": [{"data": [[1.66194066E12, 477.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66194066E12, 412.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66194072E12, 119.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66194072E12, 278.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66194072E12, 335.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66194066E12, 401.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66194072E12, 291.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66194072E12, 246.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66194066E12, 439.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66194072E12, 89.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66194072E12, 203.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66194072E12, 120.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66194078E12, 508.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66194078E12, 90.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66194078E12, 162.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66194078E12, 127.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66194078E12, 257.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.6619406E12, 109.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66194078E12, 0.0], [1.6619406E12, 98.0], [1.66194072E12, 0.0], [1.66194066E12, 51.66666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66194066E12, 3602.5]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66194078E12, 162.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.6619406E12, 83.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.6619406E12, 108.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.6619406E12, 88.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.6619406E12, 121.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.6619406E12, 215.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.6619406E12, 115.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.6619406E12, 136.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.6619406E12, 110.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66194072E12, 260.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.6619406E12, 70.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66194066E12, 458.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.6619406E12, 253.0], [1.66194066E12, 1082.0]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66194072E12, 331.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.6619406E12, 81.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.6619406E12, 152.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.6619406E12, 119.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66194072E12, 1728.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.6619406E12, 109.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.6619406E12, 210.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.6619406E12, 301.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.6619406E12, 153.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.6619406E12, 77.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.6619406E12, 88.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.6619406E12, 80.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66194072E12, 479.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.6619406E12, 354.0], [1.66194066E12, 22429.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.6619406E12, 312.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66194072E12, 1622.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66194066E12, 378.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66194066E12, 87.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66194072E12, 1430.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66194072E12, 1622.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66194072E12, 262.5]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.6619406E12, 75.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66194066E12, 458.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.6619406E12, 61.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.6619406E12, 116.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66194072E12, 453.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66194066E12, 100.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66194066E12, 150.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66194066E12, 289.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66194066E12, 112.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66194078E12, 84.0], [1.6619406E12, 83.0], [1.66194072E12, 82.0], [1.66194066E12, 89.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66194072E12, 479.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.6619406E12, 434.0], [1.66194066E12, 1342.0]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.6619406E12, 667.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.6619406E12, 114.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.6619406E12, 314.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.6619406E12, 512.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.6619406E12, 251.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.6619406E12, 1207.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.6619406E12, 366.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.6619406E12, 169.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.6619406E12, 188.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.6619406E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66194066E12, 9169.0]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.6619406E12, 299.5], [1.66194072E12, 239.125], [1.66194066E12, 2516.6666666666665]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194078E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.6619406E12, "maxY": 21592.0, "series": [{"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20", "isController": false}, {"data": [[1.66194072E12, 61.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22", "isController": false}, {"data": [[1.66194072E12, 197.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7", "isController": false}, {"data": [[1.66194072E12, 97.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8", "isController": false}, {"data": [[1.66194072E12, 90.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20", "isController": false}, {"data": [[1.66194072E12, 100.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14", "isController": false}, {"data": [[1.66194072E12, 236.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16", "isController": false}, {"data": [[1.66194078E12, 67.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23", "isController": false}, {"data": [[1.66194072E12, 576.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15", "isController": false}, {"data": [[1.66194072E12, 59.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17", "isController": false}, {"data": [[1.66194078E12, 76.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19", "isController": false}, {"data": [[1.66194066E12, 125.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3", "isController": false}, {"data": [[1.66194066E12, 888.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1", "isController": false}, {"data": [[1.66194066E12, 117.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "Clearance", "isController": true}, {"data": [[1.66194066E12, 653.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5", "isController": false}, {"data": [[1.66194078E12, 58.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12", "isController": false}, {"data": [[1.66194078E12, 298.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11", "isController": false}, {"data": [[1.66194078E12, 78.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8", "isController": false}, {"data": [[1.66194072E12, 98.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14", "isController": false}, {"data": [[1.66194078E12, 116.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13", "isController": false}, {"data": [[1.66194078E12, 124.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6", "isController": false}, {"data": [[1.66194072E12, 101.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16", "isController": false}, {"data": [[1.66194078E12, 116.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3", "isController": false}, {"data": [[1.66194072E12, 101.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15", "isController": false}, {"data": [[1.66194078E12, 112.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18", "isController": false}, {"data": [[1.66194078E12, 112.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13", "isController": false}, {"data": [[1.66194078E12, 61.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10", "isController": false}, {"data": [[1.66194078E12, 63.5]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14", "isController": false}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-19", "isController": false}, {"data": [[1.66194078E12, 0.0], [1.6619406E12, 0.0], [1.66194072E12, 0.0], [1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json", "isController": false}, {"data": [[1.66194066E12, 1628.0]], "isOverall": false, "label": "Makeupshop", "isController": true}, {"data": [[1.66194078E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-11", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-12", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-13", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-14", "isController": false}, {"data": [[1.6619406E12, 85.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-15", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-16", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-17", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-18", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-10", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html", "isController": false}, {"data": [[1.6619406E12, 153.0], [1.66194066E12, 961.0]], "isOverall": false, "label": "https://www.banglashoppers.com/", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-22", "isController": false}, {"data": [[1.6619406E12, 73.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-23", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-24", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "Combo", "isController": true}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-25", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-26", "isController": false}, {"data": [[1.6619406E12, 224.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-27", "isController": false}, {"data": [[1.6619406E12, 70.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-28", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-29", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-20", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-21", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html", "isController": false}, {"data": [[1.6619406E12, 217.0], [1.66194066E12, 21592.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-33", "isController": false}, {"data": [[1.66194072E12, 572.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3", "isController": false}, {"data": [[1.6619406E12, 192.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-34", "isController": false}, {"data": [[1.66194072E12, 601.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2", "isController": false}, {"data": [[1.66194072E12, 1169.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1", "isController": false}, {"data": [[1.66194072E12, 226.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22", "isController": false}, {"data": [[1.66194072E12, 186.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21", "isController": false}, {"data": [[1.66194072E12, 960.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6", "isController": false}, {"data": [[1.66194066E12, 156.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24", "isController": false}, {"data": [[1.66194072E12, 1666.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5", "isController": false}, {"data": [[1.66194066E12, 600.5]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23", "isController": false}, {"data": [[1.66194072E12, 1167.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4", "isController": false}, {"data": [[1.66194072E12, 226.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html", "isController": false}, {"data": [[1.66194072E12, 652.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23", "isController": false}, {"data": [[1.66194072E12, 186.5]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-30", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-31", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-32", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11", "isController": false}, {"data": [[1.66194066E12, 110.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13", "isController": false}, {"data": [[1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12", "isController": false}, {"data": [[1.66194078E12, 0.0], [1.6619406E12, 0.0], [1.66194072E12, 0.0], [1.66194066E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0", "isController": false}, {"data": [[1.66194072E12, 749.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1", "isController": false}, {"data": [[1.66194072E12, 619.5]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2", "isController": false}, {"data": [[1.66194072E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3", "isController": false}, {"data": [[1.6619406E12, 153.0], [1.66194066E12, 961.0]], "isOverall": false, "label": "Home", "isController": true}, {"data": [[1.6619406E12, 557.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-0", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-1", "isController": false}, {"data": [[1.6619406E12, 163.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-2", "isController": false}, {"data": [[1.6619406E12, 165.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-3", "isController": false}, {"data": [[1.6619406E12, 162.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-4", "isController": false}, {"data": [[1.6619406E12, 992.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-5", "isController": false}, {"data": [[1.6619406E12, 213.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-6", "isController": false}, {"data": [[1.6619406E12, 69.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-7", "isController": false}, {"data": [[1.6619406E12, 105.5]], "isOverall": false, "label": "https://www.banglashoppers.com/-8", "isController": false}, {"data": [[1.6619406E12, 0.0]], "isOverall": false, "label": "https://www.banglashoppers.com/-9", "isController": false}, {"data": [[1.66194066E12, 291.5]], "isOverall": false, "label": "HotOffers", "isController": true}, {"data": [[1.6619406E12, 0.0], [1.66194072E12, 16.25], [1.66194066E12, 542.6666666666667]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194078E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 54.0, "minX": 1.6619406E12, "maxY": 25772.0, "series": [{"data": [[1.66194078E12, 1887.0], [1.6619406E12, 3843.0], [1.66194072E12, 16485.0], [1.66194066E12, 25772.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66194078E12, 650.5], [1.6619406E12, 963.5], [1.66194072E12, 1603.5], [1.66194066E12, 3602.599999999998]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66194078E12, 1887.0], [1.6619406E12, 3843.0], [1.66194072E12, 14292.639999999963], [1.66194066E12, 25772.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66194078E12, 830.0], [1.6619406E12, 1638.0], [1.66194072E12, 3510.899999999994], [1.66194066E12, 8574.199999999977]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66194078E12, 55.0], [1.6619406E12, 58.0], [1.66194072E12, 54.0], [1.66194066E12, 59.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66194078E12, 120.0], [1.6619406E12, 183.0], [1.66194072E12, 242.5], [1.66194066E12, 221.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194078E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 5.0, "minX": 1.0, "maxY": 3432.5, "series": [{"data": [[2.0, 3432.5], [8.0, 74.0], [10.0, 121.5], [11.0, 140.0], [3.0, 394.0], [12.0, 107.5], [13.0, 144.5], [14.0, 229.5], [4.0, 261.0], [1.0, 1508.0], [18.0, 137.0], [19.0, 149.0], [5.0, 474.0], [20.0, 158.5], [22.0, 111.0], [6.0, 264.0], [26.0, 128.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[3.0, 401.0], [6.0, 5.0], [26.0, 303.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 26.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 426.0, "series": [{"data": [[2.0, 352.0], [8.0, 0.0], [10.0, 0.0], [11.0, 87.0], [3.0, 130.0], [12.0, 0.0], [13.0, 0.0], [14.0, 75.5], [4.0, 175.5], [1.0, 426.0], [18.0, 0.0], [19.0, 140.0], [5.0, 376.5], [20.0, 79.0], [22.0, 0.0], [6.0, 134.0], [26.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[3.0, 0.0], [6.0, 0.0], [26.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 26.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.9, "minX": 1.6619406E12, "maxY": 2.066666666666667, "series": [{"data": [[1.66194078E12, 0.9], [1.6619406E12, 1.2666666666666666], [1.66194072E12, 2.066666666666667], [1.66194066E12, 1.1666666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194078E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.6619406E12, "maxY": 1.3333333333333333, "series": [{"data": [[1.66194078E12, 0.23333333333333334], [1.6619406E12, 1.2333333333333334], [1.66194072E12, 0.7], [1.66194066E12, 0.5833333333333334]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66194078E12, 0.6666666666666666], [1.66194072E12, 1.3333333333333333], [1.66194066E12, 0.6]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333], [1.66194066E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.NoHttpResponseException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66194078E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.6619406E12, "maxY": 0.1, "series": [{"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-0-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-12-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-1-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-11-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "Clearance-success", "isController": true}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-28-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333], [1.6619406E12, 0.016666666666666666], [1.66194072E12, 0.06666666666666667], [1.66194066E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/static/frontend/Sm/topmart/en_US/js-translation.json-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-18-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-18-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-16-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-7-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-20-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-4-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-7-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-30-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-24-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-10-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-17-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194301-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-7-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-15-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-21-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236895-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-3-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-10-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-0-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-21-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-8-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-18-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-14-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-25-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-14-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-14-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-4-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-12-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-2-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-18-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-13-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-6-success", "isController": false}, {"data": [[1.6619406E12, 0.016666666666666666], [1.66194066E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-8-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-21-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-27-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-17-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-17-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-8-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-16-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-5-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-0-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-4-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-10-success", "isController": false}, {"data": [[1.6619406E12, 0.016666666666666666], [1.66194066E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/-33-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-22-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781194300-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267372-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-20-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "Combo-success", "isController": true}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-1-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-22-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-13-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781236896-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-8-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-19-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-9-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-20-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333], [1.66194072E12, 0.1], [1.66194066E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-4-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-17-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-24-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-13-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-3-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-0-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-11-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-1-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-5-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305696-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333], [1.66194066E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglashoppers.com/event/action/capture/-failure", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-16-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-5-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-3-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-13-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-19-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-9-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-2-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-14-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-26-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-10-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-9-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-15-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-1-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-17-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-21-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-23-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-9-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-22-success", "isController": false}, {"data": [[1.6619406E12, 0.016666666666666666], [1.66194066E12, 0.016666666666666666]], "isOverall": false, "label": "Home-success", "isController": true}, {"data": [[1.66194066E12, 0.016666666666666666]], "isOverall": false, "label": "Makeupshop-failure", "isController": true}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-5-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-6-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-18-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781267371-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-32-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-2-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-9-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-21-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-5-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-12-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333], [1.6619406E12, 0.016666666666666666], [1.66194072E12, 0.06666666666666667], [1.66194066E12, 0.05]], "isOverall": false, "label": "https://www.banglashoppers.com/cdn-cgi/rum?-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-23-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-6-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-12-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-16-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "HotOffers-failure", "isController": true}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-12-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-1-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-15-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-4-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=1661781305695-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-11-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-16-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-8-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-19-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-15-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-3-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-2-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-11-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-31-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-22-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-19-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-6-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-0-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-7-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-14-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-19-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-6-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-29-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-23-success", "isController": false}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-23-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/hot-offers.html-20-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-34-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-11-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-2-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-3-success", "isController": false}, {"data": [[1.66194066E12, 0.016666666666666666]], "isOverall": false, "label": "Makeupshop-success", "isController": true}, {"data": [[1.66194078E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/clearance-sale.html-20-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-7-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/combo-offer.html-13-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-22-success", "isController": false}, {"data": [[1.6619406E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/-10-success", "isController": false}, {"data": [[1.66194066E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglashoppers.com/makeup-shop.html-15-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194078E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.6619406E12, "maxY": 2.1, "series": [{"data": [[1.66194078E12, 0.9], [1.6619406E12, 1.25], [1.66194072E12, 2.1], [1.66194066E12, 1.2166666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.66194072E12, 0.03333333333333333], [1.66194066E12, 0.06666666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66194078E12, "title": "Total Transactions Per Second"}},
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
