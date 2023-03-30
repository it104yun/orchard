var selCity;
var selArea;
var selZip;
var selArea_eng;
var selZip_eng;
var cityZone = [];  //儲存所選取的縣市的資訊
var mask_info = [];  //儲存所選取的縣市的資訊的口罩
var save_data = [];  //儲存所選取的縣市的資訊的口罩
var maskData;
var map;
var markers;
var map_popup = []; //

if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successGPS, errorGPS);
} else {
  window.alert('您的裝置不具備GPS，無法使用此功能');
  // 接著寫使用者裝置不支援位置資訊時要執行的事
}


$(function () {

    //載入全國休閒農業區旅遊資訊
    $.ajax({
        type: "GET",
        url: "https://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvAttractions.aspx",
        dataType: "json",
        async: false,
        success: function (info) { 
            info.forEach(function (data) { 
                save_data.push(data);
            }); 
            // console.log(save_data);
        },
        error: function (jqXHR, textStatus, errorTh) {
            alert(errorTh);
        }
    });

    $("#cityName").empty();
    $("#cityName").append('<option value="">---選擇縣市---</option>');
    CityCounty.forEach(function (item) {
        var strH1 = '<option value="' + item.CityName + '">' + item.CityName + '</option>';
        $("#cityName").append(strH1);
    });

    $("#cityName").change(function () {
        $("#address1").empty();
        selCity = $(this).val();
        //尋找縣市,取出行政區
        CityCounty.find(function (item) {
            if (item.CityName == selCity) {
                cityZone = item.AreaList;
            }
        });
        //根據所選到的"縣市" 新增行政區的option
        $("#cityZone").empty();
        $("#cityName").append("---鄉鎮區---");
        cityZone.forEach(function (item) {
            // var strH1 = '<option value="' + item.ZipCode+" "+item.AreaName + '">' + item.ZipCode+" "+item.AreaName + '</option>';;
            var strH1 = '<option value="' + item.AreaName + '">' + item.AreaName + '</option>';;
            $("#cityZone").append(strH1);
            cityZone.push(item.AreaName);
        });

    });

    $("#cityZone").change(function () {
        $("#address1").empty();
        var area = $(this).val();
        selArea = area;
        $("#zipCode").val(selZip);
        $("#address1").val(selCity + selArea);

        $("#zipCode_eng").val(selZip);
        $("#address1_eng").val(selCity + selArea);
        showSelData();
    })

});

//顯示所選中的區域的口罩資訊
function showSelData() {
    //顯示所選中的區域的口罩資訊
    // console.log(selCity,selArea);
    var strh1, strh2, strh3, strh4, strh5, strh6, strh7, strh8, strh9;
    var strHTML;
    var store, geo;
    var has_find = false;
    var this_map_popup;
    var count = 0;
    $("#list_data").empty();
    removeMarkers();
    save_data.find(function (obj) {
        if (obj.City == selCity && obj.Town == selArea) { 
            has_find = true;
            store = obj.Name;
            phone = obj.Tel;
            address = obj.Address;
            introduction = obj.Introduction;
            intro = introduction.substr(0, 10).concat("...");
            lat = obj.Latitude;
            lon = obj.Longitude;
            photo = obj.Photo;

            strh1 = '<div class="fs-5 gf gfw400 text-bg-secondary text-center p-1">'+store+'</div>';
            strh2 = '<ul class="list-group list-group-flush text-success"><li class="list-group-item p-1"><span class="fs-6 gf gfw500">電話:</span><span class="fs-6">'+phone+'</span></li>';
            strh3 = '<li class="list-group-item p-1"><span class="fs-6 gf gfw500">地址:</span><span class="fs-6">' + address + '</span></li>';
            strh4 = '<li class="list-group-item p-1"><span class="fs-6 gf gfw500">介紹:</span><span class="fs-6">' + intro;
            strh5 = '<a href="#data_list" id="pophover'+count.toString+'" title="" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-content="'+introduction+'"  class="text-decoration-none gf gfw700">查看更多</a></span></li></ul>';
            strh5x = '<a href="#data_list" id="pophover'+count.toString+'" title="'+introduction+'" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-content=""  class="text-decoration-none gf gfw700">查看更多</a></span></li></ul>';
            strHTML = strh1 + strh2 + strh3 + strh4 + strh5;
            $("#list_data").append(strHTML);

            strh1 = '<div class="card"><div class="card-header mb-0" style="background-color: rgba(256,256,100,0.8);"><img src="'+photo+'" class="img-fluid rounded-3"><div class="fs-5 gf gfw400 text-bg-dark text-center p-0 mt-1">'+store+'</div></div><div class="card-body">';
            strh5 = '<a href="#data_list" id="pophover'+count.toString+'" title="'+introduction+'" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-content=""  class="text-decoration-none gf gfw700">查看更多</a></span></li></ul></div></div>';
            strHTML = strh1 + strh2 + strh3 + strh4 + strh5;
            this_map_popup = markers.addLayer(L.marker([lat, lon]).bindPopup(strHTML));
            pophover_detail_data();
            // map_popup.push(this_map_popup);
            // markers.addLayer(L.marker([geo[1], geo[0]], {icon:redIcon}).bindPopup(strHTML));
        };
    });
    if (has_find) {
        // map.panTo(L.latLng(geo[1], geo[0]));   //移至最後一個點
        map.panTo([lat, lon]);   //移至最後一個點
    };
}

//清除含marker的所有圖層(Layer)
function removeMarkers() { 
    map.eachLayer(function(layer){
        if (layer instanceof L.Marker) { 
            map.removeLayer(layer);
        }
    })
}

// 跟使用者要位置
function successGPS(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  center = [lat, lng];
  // 接著寫確認了座標後要執行的事
  map = L.map('my_map').setView(center, 17);    
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
  markers = new L.markerClusterGroup().addTo(map);
};

function errorGPS() {
  window.alert('無法判斷您的所在位置，無法使用此功能。預設地點將為 台北市動物園');
  // 接著寫使用者「封鎖」位置資訊請求後要執行的事
}


function pophover_detail_data() {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    // $("#list_data1 #pophover01").attr('data-bs-content', popContent);
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })
}