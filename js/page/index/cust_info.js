$(function () {
    var user_id, user_pwd;
    $("#cuser_id").val(getCookie("user_id"));
    // C:cust I:info L:login  CustInfoLogin_submit
    $("#CIL_submit").click(function () {
        user_id = $("#cuser_id").val();
        user_pwd = $("#cpassword").val();
        var form_data =
        {
            user_id: user_id,
            user_pwd: user_pwd,
            action: 'cust_info_login'
        };
        if (user_id && user_pwd) {
            var api_url = root_url + "/orchard/app/CRUD/cust_info_Read_one.php" ;
            $.ajax({
                type: "POST",
                url: api_url,
                data: JSON.stringify(form_data),
                dataType: "json",
                // contentType: 'application/json;charset=utf-8',
                success: infoValid,
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

    function infoValid(info) {
        // 這個success, 是指連到後端的api 成功, 所以後端的程式判斷的response/echo,這裏都接收的到
        // 由這裏來判斷, 後端處理資料的狀況
        var action = "登入";
        if (info.state) {
            alert(action + info.message);
            // 顯示會員資料-------------------------------------------begin
            // var obj = (info.data)[0];
            // console.log(obj);
            var obj = info.data;
            console.log(obj);

            $('#cpassword1').removeAttr('disabled');
            $('#cpassword2').removeAttr('disabled');

            $('#cname').removeAttr('disabled').val(obj.cust_name);
            $('#cemail').removeAttr('disabled').val(obj.email);

            // alert(obj.zipcode1 +"  "+(obj.zipcode1).length+ "\n" + obj.city1+"   "+(obj.city1).length + "\n" + obj.dist1+"  "+(obj.dist1).length);
            // alert(obj.zipcode1 + " " + obj.dist1 + "\n"
            //     + obj.zipcode2 + " " + obj.city2 + "\n"
            //     + obj.zipcode3 + " " + obj.city3 );
            // 以下順序,不可改變----------------------------------------------------------------------begin
            $('#city1').removeAttr('disabled').val(obj.city1).change();  
            $('#city1').removeAttr('disabled').val(obj.city1);  
            $('#dist1').removeAttr('disabled').val(obj.zipcode1+" "+obj.dist1).change();
            $('#tw_zipcode1').removeAttr('disabled').val(obj.zipcode1);
            $('#address1').removeAttr('disabled').val(obj.address1);
            // 以上順序,不可改變----------------------------------------------------------------------begin

            
            if (obj.city2 && obj.city2!="---" ) {
                $('#city2').removeAttr('disabled').val(obj.city2).change();
            } else {
                $('#city2').removeAttr('disabled').val(obj.city2);
            }
            $('#dist2').removeAttr('disabled' ).val(obj.zipcode2+" "+obj.dist2).change();
            $('#tw_zipcode2').removeAttr('disabled').val(obj.zipcode2);
            $('#address2').removeAttr('disabled').val(obj.address2);

            if (obj.city3 && obj.city3!="---" ) { 
                $('#city3').removeAttr('disabled').val(obj.city3).change();
            } else {
                $('#city3').removeAttr('disabled').val(obj.city3);   
            }
            $('#dist3').removeAttr('disabled').val(obj.zipcode3+" "+obj.dist3);
            $('#tw_zipcode3').removeAttr('disabled').val(obj.zipcode3);
            $('#address3').removeAttr('disabled').val(obj.address3);

            $('#cust_info_submit').removeAttr('disabled');
            // 顯示會員資料-------------------------------------------end
        } else {
            alert(action + info.message + "\n\n錯誤代碼:" + info.error_code);
            form_elements_disabled();
        }  
        
    }

    // 表單的部份元input元件, 停止使用 
    function form_elements_disabled() {
        $('#cpassword1').attr('disabled');
        $('#cpassword2').attr('disabled');

        $('#cname').attr('disabled');
        $('#cemail').attr('disabled');

        $('#tw_zipcode1').attr('disabled');
        $('#city1').attr('disabled');
        $('#dist1').attr('disabled');
        $('#address1').attr('disabled');

        $('#tw_zipcode2').attr('disabled');
        $('#city2').attr('disabled');
        $('#dist2').attr('disabled');
        $('#address2').attr('disabled');

        $('#tw_zipcode3').attr('disabled');
        $('#city3').attr('disabled');
        $('#dist3').attr('disabled');
        $('#address3').attr('disabled');

        $('#cust_info_submit').attr('disabled');
    }
})