/* parameters comment
    page: string     頁面, 網頁名稱index,sys_manage.....不用輸入.html
    action: string   在該頁面的行為(login/logout...button), 不同的頁面,會有不同的按紐
    role: string     在table-->auth_info所定義的角色
*/
function buttonController(page, action, role) {
    // alert("page="+page+"\naction="+action+"\nrole="+role);
    switch (page) { 
        case 'index':
            switch (action) { 
                case "login":
                    $('#btn_login').hide();
                    $('#btn_register').hide();
                    $('#btn_manager').hide();

                    $('#btn_logout').show();
                    $('#btn_cust_info').show();
                    $('#btn_cart').show();
                    switch (role) { 
                        case "Customer":
                            $('#btn_manager').hide();
                            break;
                        case "Manager":
                            $('#btn_manager').show();
                            break;
                        default:
                            $('#btn_cust_info').hide();
                            $('#btn_cart').hide();
                            $('#btn_manager').hide();
                            break;
                    }
                    break;
                case "logout":
                    $('#btn_logout').hide();
                    $('#btn_cust_info').hide();
                    $('#btn_cart').hide();
                    $('#btn_manager').hide();
                    $('#btn_login').show();
                    $('#btn_register').show();
                    break;
                default:
                    $('#btn_logout').hide();
                    $('#btn_cust_info').hide();
                    $('#btn_cart').hide();
                    $('#btn_manager').hide();
                    $('#btn_login').show();
                    $('#btn_register').show();
                    break;
            };
            break;
        case 'sys_manage':
            switch (action) {
                case "login":
                    // $('#btn_login').hide();
                    $('#btn_logout').show();
                    switch (role) {
                        case "Customer":
                            $('#cust_manage_all_row').hide();
                            $('#cust_manage_detail').hide();
                            $('#cust_manage_search').hide();
                            $('#cust_manage_sort').hide();

                            $('#cust_manage_array').hide();   //會員的table
                            break;
                        case "Manager":
                            $('#cust_manage_all_row').show();
                            $('#cust_manage_detail').show();
                            $('#cust_manage_search').show();
                            $('#cust_manage_sort').show();

                            $('#cust_manage_array').show();   //會員的table 
                            break;
                        default:
                            $('#cust_manage_all_row').hide();
                            $('#cust_manage_detail').hide();
                            $('#cust_manage_search').hide();
                            $('#cust_manage_sort').hide();

                            $('#cust_manage_array').hide();   //會員的table
                            break;
                    }
                    break;
                case "logout":
                    // $('#btn_login').show();
                    $('#btn_logout').hide();

                    $('#cust_manage_array').hide();   //會員的table
                    break;
                default:
                    // $('#btn_login').show();
                    $('#btn_logout').hide();
                    $('#cust_manage_all_row').hide();
                    $('#cust_manage_detail').hide();
                    $('#cust_manage_search').hide();
                    $('#cust_manage_sort').hide();

                    $('#cust_manage_array').hide();   //會員的table
                    break;
            }
            break;
        // default:
        //     break;
    };    
}

function cookieValidate(page, uid_ary) {
    // alert_txt         "!。..."--最一個字元的不同, 代表是來字那個狀態
    var alert_txt = "您尚未登入，將轉跳至首頁,請您登入!";
    var home_url = "index.html";
    var cookie_obj = {};
    var cookie_value;
    uid_ary.forEach(function (item) {
        cookie_value = getCookie(item);
        if (cookie_value != "") {
            cookie_obj[item] = getCookie(item);
        }
    });
    if ( Object.keys(cookie_obj).length > 0 ) { 
        var api_url = root_url + "/orchard/app/CRUD/auth_info_Read_UID.php";
        $.ajax({
            type: "POST",
            url: api_url,
            data: JSON.stringify(cookie_obj),
            dataType: "json",
            success: function (info) { 
                if (info.state) {
                    user_has_login(info);
                    buttonController(page, "login", info.data['user_role']);
                } else {
                    buttonController(page, "logout", ""); 
                    if (page != "index") {
                        alert( alert_txt + "!" );
                        location.href = home_url;
                    }
                }
                ;   
            },
            error: function (result) {
                buttonController(page,"logout","");
                alert("連線錯誤!\n" + JSON.stringify(result));
                if (page != "index") {
                    alert( alert_txt + "。" );
                    location.href = home_url;
                }
            },
        });
    } else {
        // alert(page);
        if (page != "index") {
            alert(alert_txt + "...");
            location.href = home_url;
        }
    }
}

function user_has_login(info) { 
    // 顯示會員相關訊息 & 登入後的反差------------------------------------------------begin
    var data = info.data;
    setCookie("user_id",data['user_id'], 7);   //登入成功後, 將user_id寫在cookie
    setCookie("cust_name",data['cust_name'], 7);   //登入成功後, 將cust_name寫在cookie
    $("#welcome_msg").empty();
    $("#welcome_msg").text(data.cust_name + " 會員,您好!");
    $('body').removeClass();
    // $('body').css('background-color', 'GreenYellow');
    $('body').css('background-color', '#cfff7f');
    if (data['user_id'] == "demomap") {
        $('#countryside').show();
    } else { 
       $('#countryside').hide(); 
    };
    // 顯示會員相關訊息 & 登入後的反差------------------------------------------------end
}

function user_has_logout(cookie_ary,page) {
      $("#btn_logout").click(function () { 
        for (var i = 0; i < cookie_ary.length; i++){
            setCookie(cookie_ary[i], "", -1);
        };
        location.reload();
        buttonController(page,"logout","");
    });
}


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

function getCookie(cname) {
    /* 若其他網站有相同的cookie name 如何必免抓到其他網站的？
    由於Chrome有跨網域禁止的機制, 這裏只會針對該Domain的COOKIE NAMES去比對
    緃使其他Domain有相同的COOKIE NAMES,也不會去抓取
    */
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}
