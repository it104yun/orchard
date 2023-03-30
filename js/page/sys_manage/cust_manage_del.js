$(function () { 
    var user_id, user_pwd;

    $("#cust_del_submit").click(function () { 
        var user_id = $("#del_user_id").val();
        var form_data = { user_id: user_id };
        
        var api_url = root_url + "/orchard/app/CRUD/cust_info_Delete.php";
        $.ajax({
            type: "POST",
            url: api_url,
            data:JSON.stringify(form_data),
            dataType: "json",
            async : false,
            success: function (info) {
                // 這個success, 是指連到後端的api 成功, 所以後端的程式判斷的response/echo,這裏都接收的到
                // 由這裏來判斷, 後端處理資料的狀況
                var action = "刪除";
                if (info.state) {
                    alert(action + info.message);
                    $("#cust_manage_del_modal").modal("hide");
                    location.reload;
                    click_load_all_data();
                } else {
                    alert(action + info.message + "\n\n錯誤代碼:" + info.error_code);
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
    });

})