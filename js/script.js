var updateDate = "2018_03_17";

var xmlData = "";
getRoutes();

//var options = {
//  enableHighAccuracy: true,
//  timeout: 5000,
//  maximumAge: 0
//};

//function success(pos) {
//  var crd = pos.coords;
//
//  console.log('Your current position is:');
//  console.log(`Latitude : ${crd.latitude}`);
//  console.log(`Longitude: ${crd.longitude}`);
//  console.log(`More or less ${crd.accuracy} meters.`);
//}
//
//function error(err) {
//  console.warn(`ERROR(${err.code}): ${err.message}`);
//}
//
//navigator.geolocation.getCurrentPosition(success, error, options);

function getRoutes() {

    var routes = [
        '0001', '0002', '0003',
        '0101', '0103', '0105',
        '0106', '0107', '0108',
        '0109', '0110', '0111',
        '0112', '0113', '0116',
        '0117', '0120', '0121',
        '0126', '0127', '0128',
        '0130', '0131', '0136',
        '0141', '0201', '0202',
        '0203', '0204', '0205',
        '0302', '0303', '0304',
        '0305', '0307', '0309',
        '0N01', '0N02'
    ];

    var routesList = document.createElement("ul");
    routesList.classList.add("buttons-list", "buttons-list-col-6");

    var mainContent = document.getElementById("main-content");
    while (mainContent.firstChild) {
        mainContent.removeChild(mainContent.firstChild);
    }

    mainContent.appendChild(routesList);

    for (let i = 0; i < routes.length; i++) {
        let routeItem = document.createElement("li");
        var routeItemButton = document.createElement("a");
        routeItemButton.href = "#";
        var routeName = "";
        var busIcon;
        if (i >= 0 && i < 3) {
            routeName = routes[i];
            routeName = routeName.substring(routeName.length - 1, routeName.length);
            busIcon = document.createElement("span");
            busIcon.classList.add("fas", "fa-train", "bus-icon");
            routeItemButton.appendChild(busIcon);
        } else {
            routeName = routes[i];
            routeName = routeName.substring(1, routeName.length);
            busIcon = document.createElement("span");
            busIcon.classList.add("fas", "fa-bus", "bus-icon");
            routeItemButton.appendChild(busIcon);
        }
        routeItemButton.setAttribute("data-route-name", routes[i]);
        routeItemButton.textContent = routeName;
        routeItemButton.addEventListener("click", getVariants, "false");
        routeItemButton.appendChild(busIcon);
        routeItem.appendChild(routeItemButton);
        routesList.appendChild(routeItem);
    }

    var breadLine = document.getElementsByClassName("breadcrumbs__line");
    breadLine[0].addEventListener("click", getRoutes, false);

    let breadcrumbs = document.getElementsByClassName("breadcrumbs");
    if (breadcrumbs[0].childElementCount > 1) {
        for (let i = 0; i < breadcrumbs[0].childElementCount; i++) {
            breadcrumbs[0].removeChild(breadcrumbs[0].lastChild);
        }
    }
}

//var xml = new XMLHttpRequest();
//xml.open('GET', '2018_03_17/0103/0103.xml', false);
//xml.send();
//var xmlData = xml.responseXML;
//xmlData = (new DOMParser()).parseFromString(xml.responseText, 'text/xml');

//getVariants();

//var breadLine = document.getElementsByClassName("breadcrumbs__line");
//breadLine[0].addEventListener("click", getVariants, false);


function getVariants(route) {

    var xmlFile = updateDate + "/" + route.target.getAttribute("data-route-name") + "/" + route.target.getAttribute("data-route-name") + ".xml";

    var xml = new XMLHttpRequest();
    xml.open('GET', xmlFile, false);
    xml.send();
    xmlData = xml.responseXML;
    xmlData = (new DOMParser()).parseFromString(xml.responseText, 'text/xml');

    let breadcrumbs = document.getElementsByClassName("breadcrumbs");
    if (breadcrumbs[0].childElementCount > 2) {
        for (let i = 2; i < breadcrumbs[0].childElementCount; i++) {
            breadcrumbs[0].removeChild(breadcrumbs[0].lastChild);
        }
    }

    var mainContent = document.getElementById("main-content");
    while (mainContent.firstChild) {
        mainContent.removeChild(mainContent.firstChild);
    }

    var variants = xmlData.getElementsByTagName("wariant");
    if (variants.length > 0) {
        var varList = document.createElement("ul");
        varList.classList.add("buttons-list");
        for (let i = 0; i < variants.length; i++) {
            let varListItem = document.createElement("li");
            let varListItemButton = document.createElement("a");
            varListItemButton.textContent = variants[i].getAttribute("nazwa");
            varListItemButton.href = "#";
            varListItemButton.setAttribute("data-variant-id", variants[i].getAttribute("id"));
            varListItemButton.addEventListener("click", getStops, false);
            varListItem.appendChild(varListItemButton);
            varList.appendChild(varListItem);
        }
        mainContent.appendChild(varList);
    }

    var breadcrumb = document.getElementsByClassName("breadcrumbs");
    let breadVar = document.createElement("span");
    breadVar.textContent = " / " + route.target.textContent;
    breadVar.classList.add("breadcrumbs__line");
    breadVar.setAttribute("data-route-name", route.target.getAttribute("data-route-name"));
    breadVar.addEventListener("click", getVariants, "false");
    if (breadcrumb[0].childElementCount < 2) {
        breadcrumb[0].appendChild(breadVar);
    }

}

function getStops(variant) {

    setTimeout(function () {
        var mainContent = document.getElementById("main-content");

        let breadcrumbs = document.getElementsByClassName("breadcrumbs");
        if (breadcrumbs[0].childElementCount > 3) {
            for (let i = 3; i < breadcrumbs[0].childElementCount; i++) {
                breadcrumbs[0].removeChild(breadcrumbs[0].lastChild);
            }
        }

        var stops = xmlData.getElementsByTagName("przystanek");
        //        var stopsList = document.createElement("table");
        //        stopsList.classList.add("table");
        //        let stopsListHead = document.createElement("thead");
        //        stopsList.appendChild(stopsListHead);
        //        stopsList.classList.add("stops-list");
        //        let stopsListHeadRow = document.createElement("tr");
        //        stopsListHead.appendChild(stopsListHeadRow);
        //        let stopsListHeadCol1 = document.createElement("th");
        //        stopsListHeadCol1.textContent = "Lp.";
        //        let stopsListHeadCol2 = document.createElement("th");
        //        stopsListHeadCol2.textContent = "Nazwa";
        //        let stopsListHeadCol3 = document.createElement("th");
        //        stopsListHeadCol3.textContent = "Ulica";
        //        let stopsListHeadCol4 = document.createElement("th");
        //        stopsListHeadCol4.textContent = "Czas";
        //        stopsListHeadRow.appendChild(stopsListHeadCol1);
        //        stopsListHeadRow.appendChild(stopsListHeadCol2);
        //        stopsListHeadRow.appendChild(stopsListHeadCol3);
        //        stopsListHeadRow.appendChild(stopsListHeadCol4);
        //        var stopsListBody = document.createElement("tbody");
        //        stopsList.appendChild(stopsListBody);


        var x1 = document.createElement("div");
        x1.classList.add("timeline-stops");

        if (stops.length > 0) {
            var x = 0;
            for (let i = 0; i < stops.length; i++) {
                if (stops[i].parentElement.getAttribute("id") == variant.target.getAttribute("data-variant-id")) {
                    //                    let stopListBodyRow = document.createElement("tr");
                    //
                    //                    let stopListBodyCol1 = document.createElement("td");
                    //                    stopListBodyCol1.textContent = x + 1;
                    //                    x++;
                    //                    stopListBodyRow.appendChild(stopListBodyCol1);
                    //
                    //                    let stopListBodyCol2 = document.createElement("td");
                    //                    let stopListCol2Button = document.createElement("a");
                    //                    stopListCol2Button.textContent = stops[i].getAttribute("nazwa");
                    //                    stopListCol2Button.href = "#";
                    //                    stopListCol2Button.setAttribute("data-stop-id", stops[i].getAttribute("id"));
                    //                    stopListCol2Button.setAttribute("data-variant-id", variant.target.getAttribute("data-variant-id"));
                    //                    stopListCol2Button.addEventListener("click", getTimetable, false);
                    //                    stopListBodyCol2.appendChild(stopListCol2Button);
                    //                    stopListBodyRow.appendChild(stopListBodyCol2);
                    //
                    //                    let stopListBodyCol3 = document.createElement("td");
                    //                    stopListBodyCol3.textContent = stops[i].getAttribute("ulica");
                    //                    stopListBodyRow.appendChild(stopListBodyCol3);
                    //
                    //                    let stopListBodyCol4 = document.createElement("td");
                    //
                    //                    if (stops[i].firstElementChild != null) {
                    //                        stopListBodyCol4.textContent = stops[i].firstElementChild.getAttribute("mc");
                    //                    }
                    //
                    //                    stopListBodyRow.appendChild(stopListBodyCol4);
                    //                    stopsListBody.appendChild(stopListBodyRow);

                    let timelineStop = document.createElement("div");
                    timelineStop.classList.add("timeline-stop");
                    let timelineStopName = document.createElement("a");
                    timelineStopName.href = "#";
                    timelineStopName.setAttribute("data-stop-id", stops[i].getAttribute("id"));
                    timelineStopName.setAttribute("data-variant-id", variant.target.getAttribute("data-variant-id"));
                    timelineStopName.addEventListener("click", getTimetable, false);
                    timelineStop.appendChild(timelineStopName);
                    timelineStopName.textContent = stops[i].getAttribute("nazwa");
                    timelineStop.appendChild(timelineStopName);
                    let stopCircle = document.createElement("span");
                    stopCircle.classList.add("stop-circle");
                    timelineStop.appendChild(stopCircle);

                    if (stops[i].firstElementChild != null) {
                        let stopTime = document.createElement("span");
                        stopTime.classList.add("stop-time");
                        if (stops[i + 1].firstElementChild != null) {
                            stopTime.textContent = stops[i + 1].firstElementChild.getAttribute("mc");
                            timelineStop.appendChild(stopTime);
                        }

                    }


                    x1.appendChild(timelineStop);

                    //                    x1.innerHTML = "<div class='timeline-stop'><p>Przystanek 1</p><span class='stop-circle'></span><span class='stop-time'>2</span></div><div class='timeline-stop'><p>Przystanek 2</p><span class='stop-circle'><span class='stop-time'>2</span></div><div class='timeline-stop'>Przystanek 3</div><div class='timeline-stop'>Przystanek 4</div><div class='timeline-stop'>Przystanek 1</div><div class='timeline-stop'>Przystanek 2</div><div class='timeline-stop'>Przystanek 3</div><div class='timeline-stop'>Przystanek 4</div><div class='timeline-stop'>Przystanek 1</div><div class='timeline-stop'>Przystanek 2</div><div class='timeline-stop'>Przystanek 3</div><div class='timeline-stop'>Przystanek 4</div><div class='timeline-stop'>Przystanek 1</div><div class='timeline-stop'>Przystanek 2</div><div class='timeline-stop'>Przystanek 3</div><div class='timeline-stop'>Przystanek 4</div><div class='timeline-stop'>Przystanek 1</div><div class='timeline-stop'>Przystanek 2</div><div class='timeline-stop'>Przystanek 3</div><div class='timeline-stop'>Przystanek 4</div>";


                }
            }
        }

        while (mainContent.firstChild) {
            mainContent.removeChild(mainContent.firstChild);
        }
        //        mainContent.appendChild(stopsList);

        mainContent.appendChild(x1);

        //        var breadcrumb = document.getElementsByClassName("breadcrumbs");
        //        if (breadcrumb[0].childElementCount <= 1) {
        //            let breadVar = document.createElement("span");
        //            breadVar.textContent = " / " + variant.target.textContent;
        //            breadVar.classList.add("breadcrumbs__line");
        //            breadVar.setAttribute("data-variant-id", variant.target.getAttribute("data-variant-id"));
        //            breadcrumb[0].appendChild(breadVar);
        //        }

        let breadVar = document.createElement("span");
        breadVar.textContent = " / " + variant.target.textContent;
        breadVar.classList.add("breadcrumbs__line");
        breadVar.setAttribute("data-variant-id", variant.target.getAttribute("data-variant-id"));
        breadVar.addEventListener("click", getStops, false);
        let breadcrumb = document.getElementsByClassName("breadcrumbs");
        if (breadcrumb[0].childElementCount < 3) {
            breadcrumb[0].appendChild(breadVar);
        }

    }, 200);



}

function getTimetable(stop) {
    var mainContent = document.getElementById("main-content");

    let stopsList = document.getElementsByClassName("timeline-stops");
    stopsList[0].parentNode.removeChild(stopsList[0]);

    var variants = xmlData.getElementsByTagName("wariant");
    for (let i = 0; i < variants.length; i++) {
        if (variants[i].getAttribute("id") == stop.target.getAttribute("data-variant-id")) {
            var stops = variants[i].getElementsByTagName("przystanek");
            break;
        }
    }
    for (let i = 0; i < stops.length; i++) {
        if (stops[i].getAttribute("id") == stop.target.getAttribute("data-stop-id")) {

            var days = stops[i].getElementsByTagName("dzien");
            for (let i = 0; i < days.length; i++) {

                let timeTable = document.createElement("div");
                timeTable.classList.add("timetable");
                let timeTableTitle = document.createElement("h6");
                timeTableTitle.textContent = days[i].getAttribute("nazwa");
                timeTable.appendChild(timeTableTitle);

                let table = document.createElement("table");
                table.classList.add("table", "table-1");
                var hoursRow = document.createElement("tr");
                let hoursThead = document.createElement("thead");
                hoursThead.classList.add("blue-grey", "lighten-4");
                var minutesRow = document.createElement("tr");
                let minutesTbody = document.createElement("tbody");

                var hours = days[i].getElementsByTagName("godz");
                for (let i = 0; i < hours.length; i++) {
                    let hour = document.createElement("th");
                    hour.textContent = hours[i].getAttribute("h");
                    hoursRow.appendChild(hour);

                    var minutes = hours[i].getElementsByTagName("min");
                    var minuteRow = document.createElement("td");
                    for (let i = 0; i < minutes.length; i++) {
                        let minute = document.createElement("p");
                        minute.textContent = minutes[i].getAttribute("m");
                        minuteRow.appendChild(minute);
                    }
                    minutesRow.appendChild(minuteRow);
                }

                hoursThead.appendChild(hoursRow);
                minutesTbody.appendChild(minutesRow);
                table.appendChild(hoursThead);
                table.appendChild(minutesTbody);
                timeTable.appendChild(table);
                mainContent.appendChild(timeTable);
            }
        }
    }

    let breadVar = document.createElement("span");
    breadVar.textContent = " / " + stop.target.textContent;
    breadVar.classList.add("breadcrumbs__line");
    //    breadVar.addEventListener("click", getStops, false);
    let breadcrumb = document.getElementsByClassName("breadcrumbs");
    breadcrumb[0].appendChild(breadVar);

}
