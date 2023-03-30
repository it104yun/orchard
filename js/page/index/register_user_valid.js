$(function () { 
    var user_id;
    var valid_ruser_id = false;

    $('#ruser_id').bind('input propertychange', function () {
        user_id = $(this).val();
        const rules = /^09\d{8}$/;
        if (!rules.test(user_id)) {
            $('#ruser_id_desc').css('color', 'red');
            $('#ruser_id_desc').text('手號號碼錯誤 ' + user_id);
            register_user_valid(user_id);
            tf_ruser_id = false;
        } else {
            $('#ruser_id_desc').css('color', 'green');
            $('#ruser_id_desc').text('手號號碼...正確了...');
            register_user_valid(user_id);
            tf_ruser_id = true;
        }
    });
})


function register_user_valid(user_id) {
    var form_data = { user_id: user_id };
    var api_url = root_url + "/orchard/app/CRUD/register_user_valid.php" ;
    $.ajax({
        type: "POST",
        url: api_url,
        data: JSON.stringify(form_data),
        dataType: "json",
        // contentType: "application/json",
        success: function (info) {
            // 這個success, 是指連到後端的api 成功, 所以後端的程式判斷的response/echo,這裏都接收的到
            // 由這裏來判斷, 後端處理資料的狀況
            // alert("已接收到您的註冊申請,將在3~12時內,回覆驗証email給您!");
            if (info.state) {
                // alert(info.message);
                $("#ruser_id").removeClass("is-invalid");
                $("#ruser_id").addClass("is-valid");
                $("#ruser_id_valid").text(info.message);
            } else { 
                // alert(info.message + "\n\n錯誤代碼:" + info.error_code);
                $("#ruser_id").removeClass("is-valid");
                $("#ruser_id").addClass("is-invalid");
                $("#ruser_id_invalid").text(info.message);
            }
        },
        error: function (result) {
            // 這個error"無法完全"由後端的api定義, 
            // 這裏的error, 是指連不到後端的api 或 api本身程式的語法有錯, 
            // 這裏的錯誤訊息, 無法完全由後端定義
            // 如何判斷, 是否有連到後端的api? 
            // 1-有連到api 但api語法有錯: 後端server訊息+你的一堆html碼+(後端api的response / echo)
            // 2-未連到api:  只有browser的錯誤訊息
            alert("連線錯誤!\n\n" + JSON.stringify(result));
        }
    })
}




