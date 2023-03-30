$(function () { 
    var user_id, user_pwd;
    var cookie_ary = ['UID01', 'UID02', 'UID03'];
    cookieValidate(cookie_ary);
    buttonController("logout");
    $("#btn_logout").click(function () { 
        for (var i = 0; i < cookie_ary.length; i++){
            setCookie(cookie_ary[i], "", -1);
        };
        location.reload();
        buttonController("logout");
    });

    $("#login_submit").click(function () { 
        user_id = $("#user_id").val();
        user_pwd = $("#password").val();
        var form_data =
        {
            user_id: user_id,
            user_pwd: user_pwd,
            action:'login'
        };
        if (user_id && user_pwd) {
            var api_url = root_url + "/orchard/app/CRUD/cust_info_Read_one.php" ;
            $.ajax({
                type: "POST",
                url: api_url,
                data:JSON.stringify(form_data),
                dataType: "json",
                success: function (info) {
                    // 這個success, 是指連到後端的api 成功, 所以後端的程式判斷的response/echo,這裏都接收的到
                    // 由這裏來判斷, 後端處理資料的狀況
                    var action = "登入";
                    var UID;
                    if (info.state) {
                        alert(action + info.message);
                        $("#login").modal('hide');
                        $("#cuser_id").val(user_id);
                        UID = info.UID;
                        Object.keys(UID).forEach((item) => {
                            setCookie(item,UID[item], 7);
                        });
                        user_has_login(info);
                        buttonController("login",info.data['user_role']);
                    } else {
                        alert(action + info.message + "\n\n錯誤代碼:" + info.error_code);
                        $("#cuser_id").val();
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
    });


    function buttonController(action, role) {
        switch (action) { 
            case "login":
                $('#btn_login').hide();
                $('#btn_register').hide();
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
                $('#btn_login').show();
                $('#btn_register').show();
                $('#btn_logout').hide();
                $('#btn_cust_info').hide();
                $('#btn_cart').hide();
                $('#btn_manager').hide();
                break;
            default:
                $('#btn_login').show();
                $('#btn_register').show();
                $('#btn_logout').hide();
                $('#btn_cust_info').hide();
                $('#btn_cart').hide();
                $('#btn_manager').hide();
                break;
        };
    }

    function cookieValidate(uid_ary) {
        var cookie_obj = {};
        var cookie_name;
        var cookie_value;
        uid_ary.forEach(function (item) {
            cookie_value = getCookie(item);
            if (cookie_value != "") {
                cookie_obj[item] = getCookie(item);
            }
        });
        if ( Object.keys(cookie_obj).length > 0 ) { 
            var api_url = root_url + "/orchard/app/CRUD/auto_info_Read_UID.php" ;
            $.ajax({
                type: "POST",
                url: api_url,
                data: JSON.stringify(cookie_obj),
                dataType: "json",
                success: function (info) { 
                    if (info.state) {
                        user_has_login(info);
                        buttonController("login",info.data['user_role']);
                    } else {
                       buttonController("louout"); 
                    }
                    ;   
                },
                error: function (result) {
                     buttonController("",""); 
                     alert("連線錯誤!\n" + JSON.stringify(result));
                },
            });
        }
    }

    function user_has_login(info) { 
        // 顯示會員相關訊息 & 登入後的反差------------------------------------------------begin
        var data = info.data;
        $("#welcome_msg").empty();
        $("#welcome_msg").text(data.cust_name + " 會員,您好!");
        $('body').removeClass();
        $('body').css('background-color', 'yellow');
        // 顯示會員相關訊息 & 登入後的反差------------------------------------------------end
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

})