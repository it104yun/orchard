var user_id, user_pwd;
var cookie_ary = ['UID01', 'UID02', 'UID03'];
buttonController("index","logout","");         //（初始化）預設為logout，待下方判斷完成，由下方判斷
cookieValidate("index",cookie_ary);
$(function () { 
    // $("#btn_logout").click(function () { 
    //     for (var i = 0; i < cookie_ary.length; i++){
    //         setCookie(cookie_ary[i], "", -1);
    //     };
    //     location.reload();
    //     buttonController("index","logout","");
    // });

    user_has_logout(cookie_ary, "index");

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
                    // 這個success, 是指連到後端的api 成功, 所以後端的程式判斷的response/echo,這裏都接收的到
                    // 由這裏來判斷, 後端處理資料的狀況
                success: login_success,
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
        };
    });


    function login_success(info) {
        var action = "登入";
        var alert_middle_txt = "";
        var UID;
        var obj = info.data;
        if (info.state) {
            alert(action + info.message);
            $("#login").modal('hide');
            UID = info.UID;
            Object.keys(UID).forEach((item) => {
                setCookie(item,UID[item], 7);
            });
            user_has_login(info);
            buttonController("index", "login", obj['user_role']);

            if (obj['user_active'] == "N") {
                $("#cart_checkout").hide();               //無法使用購物車的結帳
                $("#btn_manager").hide();                 //無法使用後台管堙
                switch (obj['user_role']) {
                    case "Customer":
                        alert_middle_txt = "『購物車->結帳』";
                        break;
                    case "Manager":
                        alert_middle_txt = "『購物車->結帳、後台管理』";
                        break;
                    default:
                        break;
                }
                alert("—————您的帳號 未啟用/失效—————\n\n一般功能皆可使用，唯無法進行" + alert_middle_txt + "\n\n 若有疑問，請洽系統管理員");
            } else { 
                $("#cart_checkout").show();
                $("#btn_manager").show();      
            };
        } else {
            alert(action + info.message + "\n\n錯誤代碼:" + info.error_code);
        }  
    }

})