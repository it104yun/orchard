var user_id, user_pwd;
var cookie_ary = ['UID01', 'UID02', 'UID03'];
buttonController("index","logout","");         //（初始化）預設為logout，待下方判斷完成，由下方判斷
cookieValidate("index", cookie_ary);

var city1 = [];
var city1_num = [];
var bgc_rgb =  ['rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(255, 180, 0)','rgb(100, 205, 86)','rgb(256,100, 50)',
                'rgb(100, 50, 256)','rgb(200, 50, 10)','rgb(100, 50, 100)','rgb(0, 255, 180)','rgb(200, 200, 100)',
                'rgb(100, 250, 50)','rgb(180, 30, 100)','rgb(100, 50, 200)','rgb(255, 255, 0)','rgb(0, 255, 255)'
                ];

$(function () {
    var api_url = root_url + "/orchard/app/CRUD/manage_dashboard.php" ;
    $.ajax({
        type: "GET",
        url: api_url,
        dataType: "JSON",
        success: showdata,
        error: function () {
            alert("Error");
        },
    });

    // 長條圖
    const ctx = document.getElementById('myChart_a');
    const mychart = new Chart(ctx, {
        type: 'bar',
        data: {
            // labels: ['台中市', '台北市'],
            labels: city1,
            datasets: [{
                label: '居住地人數',
                // data: [20,12],
                data: city1_num,
                borderWidth: 3,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(100, 205, 86)',
                    'rgb(100, 5, 86)'
                ],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    mychart.update();

    // 圓餅圖
    const ctxPie = document.getElementById('myPie_a');
    const myPie = new Chart(ctxPie, {
        type: 'pie',
        data: {
            // labels: ['台中市', '台北市','台南縣','新北市','苗栗縣'],
            labels: city1,
            datasets: [{
                label: '*居住地人數',
                // data: [20,12,30,15,32],
                data: city1_num,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(100, 205, 86)',
                    'rgb(100, 5, 86)'
                ],
                borderWidth: 5
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: '居住地人數'
                }
            }
        },
    });
    myPie.update();

    // 折線圖
    const ctxLine = document.getElementById('myChart_b');
    const myLine = new Chart(ctxLine, {
        type: 'line',
        data: {
            // labels: ['台中市', '台北市'],
            labels: city1,
            datasets: [{
                label: '居住地人數',
                data: city1_num,
                borderWidth: 3,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(100, 205, 86)',
                    'rgb(100, 5, 86)'
                ],
                borderWidth: 3,
                borderColor: 'rgb(0, 0, 0)',
                pointRadius: 20,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        }
    });
    myLine.update();



    const ctxDoughnut = document.getElementById('myPie_b');
        const myDoughnut = new Chart(ctxDoughnut, {
            type: 'doughnut',
            data: {
                // labels: ['台中市', '台北市','台南縣','新北市','苗栗縣'],
                labels: city1,
                datasets: [{
                    label: '*居住地人數',
                    // data: [20,12,30,15,32],
                    data: city1_num,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(100, 205, 86)',
                        'rgb(100, 5, 86)'
                    ],
                    borderWidth: 5
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: '居住地人數'
                    }
                }
            },
        });
    myDoughnut.update();

});

function showdata(info){
    var user_count = info.data;
    var data_city = info.data_city;

    if (user_count.hasOwnProperty("user_num")) 
    {
        $("#user_num").text(user_count.user_num);
    } else {
        $("#user_num").text("0");
    };
    // 由於後端的API, SQL是用GROUP BY "user_active", 會有Y沒有, 或N沒有的狀況
    // 所以, 要去檢查物件的屬性, 是否存在
    if (user_count.hasOwnProperty("user_numN"))
    {
        $("#user_numN").text(user_count.user_numN);
    } else { 
        $("#user_numN").text("0") 
    };
    if (user_count.hasOwnProperty("user_numY"))
    {
        $("#user_numY").text(user_count.user_numY)
    } else { 
        $("#user_numY").text("0") 
    };

    data_city.forEach(function(item){
        city1.push(item.city1)
        city1_num.push(item.city1_num)
    });
}