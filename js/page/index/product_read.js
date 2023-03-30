//jQuery
$(function () {
    get_product_data();
})


function get_product_data()
{
    var api_url = root_url + "/orchard/app/CRUD/product_read_all.php" ;
    $.ajax({
        type: "GET",
        url: api_url,
        async:false,
        dataType: "json",
        success: function (info) {
            // 這個success, 是指連到後端的api 成功, 所以後端的程式判斷的response/echo,這裏都接收的到
            // 由這裏來判斷, 後端處理資料的狀況
            if (info.state) {
                // alert(info.message);
                //console.log(info.data);
                render_all_data(info.data);
            } else {
                alert(info.message + "\n\n錯誤代碼:" + info.error_code);
            }
        },
        error: function (result) {
            // 這個error"無法完全"由後端的api定義, 
            // 這裏的error, 是指連不到後端的api 或 api本身程式的語法有錯, 
            // 這裏的錯誤訊息, 無法完全由後端定義
            // 如何判斷, 是否有連到後端的api? 
            // 1-有連到api 但api語法有錯: 後端server訊息+你的一堆html碼+(後端api的response / echo)
            // 2-未連到api:  只有browser的錯誤訊息
            alert("連線錯誤!\n" + JSON.stringify(result));
        }
    }) 
}



function render_all_data(data,data_test) { 
    var obj;
    var hstr0, hstr1, hstr2, hstr3, hstr4, hstr5, hstr6, hstr7, hstr8, hstr9, hstra;
    var user_counter = 0;
    var stk_qty = 0;
    $("#product_show").empty();
    for (var i = 0; i < data.length; i++){
        obj = data[i];
        stk_qty = obj.quantity / obj.pkg_weight;
        hstr0 = '<div class="col-sm-6 col-md-4 col-lg-3 p-1"><div class="d-flex flex-column border border-secondary rounded-2 p-4">';
        hstr1 = '<img id="item_img_sm" src="'+obj.picture1+'" class="img-fluid"><div id="item_name" class="text-center gf gfw400 h4">'+obj.item_name+'</div>';
        hstr2 = '<div class="gf gfw100 h6"><span class="text-bg-secondary px-1">每顆果重</span><span id="weight" class="ms-3 text-dark fw-bold">'+obj.weight+'</span><span id="weight_unit" class="text-dark fw-bold">'+obj.weight_unit+'(大約)</span></div>';
        hstr3 = '<div class="text-bg-secondary"><div><span id="pkg_content">' + obj.pkg_content + '</span><span id="pkg_weight">(' + obj.pkg_weight + obj.unit + "/" + obj.pkg_unit + ')</span></div></div>';
        hstr4 = '<div class="gf gfw100 h6 mt-2 d-flex"><span class="text-bg-secondary px-1">價格:</span><span id="weight" class="ms-2 text-dark fw-bold">'+obj.pkg_price+'</span><span id="weight_unit" class="text-dark fw-bold">/'+obj.pkg_unit+'</span>'+'<span class="text-bg-secondary mx-2 px-1 ms-auto">庫存:</span><span id="pkg_unit" class="text-dark fw-bold">'+Math.floor(stk_qty) +obj.pkg_unit+'</span></div>';
        hstr5 = '<div class="gf gfw100 h6 mt-2 d-flex"><input id="order_qty" class="text-dark fw-bold rounded-1 p-0" type="number" min="1" max="'+obj.quantity+'" placeholder="訂購數量">'+obj.pkg_unit;
        hstr6 = '<button class="btn btn-sm btn-outline-secondary ms-auto px-4 py-0" id="add_cart" data-item_code="'+obj.item_code+'" data-item_name="'+obj.item_name+'">選購</button></div>';
        hstr7 = '</div></div>';
        $("#product_show").append(hstr0 + hstr1 + hstr2 + hstr3 + hstr4 + hstr5 + hstr6 + hstr7);
    }

    $("#product_show #add_cart").click(function (e) {
        var item_code = $(this).data("item_code");
        var item_name = $(this).data("item_name");
        console.log( item_code +"\n"+ item_name);
    });
}

//vue
var latest_cart = [
    [
        {
            picture1: "https://fakeimg.pl/150x100/ffaa00/000000?text=FruitImage01&font=lobster&font_size=20",
            name:"紅色火龍果",
            item_qty:1,
        },
        {
            picture1: "https://fakeimg.pl/150x100/aaaaff/000000?text=FruitImage01&font=lobster&font_size=20",
            name:"白色火龍果",
            qty:1,
        },
        {
            picture1: "https://fakeimg.pl/150x100/00aa00/000000?text=FruitImage01&font=lobster&font_size=20",
            name:"黃色火龍果",
            qty:1,
        },
    ],
    [
        {
            picture1: "https://fakeimg.pl/150x100/ff00cc/000000?text=FruitImage01&font=lobster&font_size=20",
                name: "紅肉李",
                    qty: 1,
        },
        {
            picture1: "https://fakeimg.pl/150x100/aa00ff/000000?text=FruitImage01&font=lobster&font_size=20",
                name: "AAAAA",
                    item_qty: 1,
        },
        {
            picture1: "https://fakeimg.pl/150x100/00ccff/000000?text=FruitImage01&font=lobster&font_size=20",
                name: "BBBBBB",
                    qty: 1,
        },
    ],
        [
            {
                picture1: "https://fakeimg.pl/150x100/00ff00/000000?text=FruitImage01&font=lobster&font_size=20",
                    name: "CCCC",
                        qty: 1,
            },
            {
                picture1: "https://fakeimg.pl/150x100/ff55ff/000000?text=FruitImage01&font=lobster&font_size=20",
                    name: "DDDD",
                        qty: 1,
            },
        ]
    ];
var App = {
    data() {
        return {
            demo: "This is a demo",
            myCart: [],
            isActive: false,
        }
    },
    created() {
        this.myCart = latest_cart;  
    },
}

Vue.createApp(App).mount("#vue_app");

