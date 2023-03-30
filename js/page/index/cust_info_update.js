$(function () { 
    var cuser_id, cpassword1, cpassword2;
    var tf_cpassword1 = true;  //若沒修改, 也沒差
    var tf_cemail = true;      //若沒修改, 也沒差

    function checkChName(el) {
        el.addEventListener('input', e => {
        setTimeout(() => {
            return e.target.value = e.target.value.replace(/[a-zA-Z0-9]|[ws]|[!#$€£%&'"`()*+-./:：;；…,，。「」【】=<>?@{}^|[]]/g, '')
        }, 0)
        }, false);
    }
    const jsName = document.getElementById('cname');
    checkChName(jsName);

    $('#cpassword1').bind('input propertychange', function () {
        cpassword1 = $(this).val();
        const rules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!rules.test(cpassword1)) { 
            $('#cpassword1_desc').css('color', 'red');
            $('#cpassword1_desc').text('密碼错誤 : 至少8個字元,要有大小寫字母,至少一個數字 ' + cpassword1);
            tf_cpassword1 = false;
        } else {
            $('#cpassword1_desc').css('color', 'green');
            $('#cpassword1_desc').text('密碼...正確了 ' + cpassword1);  
            tf_cpassword1 = true;
        }
    });

    $('#cpassword2').bind('input propertychange', function () {
        cpassword2 = $(this).val();
        if (cpassword1 !== cpassword2) { 
            $('#cpassword2_desc').css('color', 'red');
            $('#cpassword2_desc').text('密碼不一致 ' + cpassword2);
            tf_cpassword1 = false;
        } else {
            $('#cpassword2_desc').css('color', 'green');
            $('#cpassword2_desc').text('密碼...一致了 '); 
            tf_cpassword1 = true;
        }
    });

    $('#cemail').bind('input propertychange', function () {
        email = this.value;
        const rules = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!rules.test(email)) { 
            $('#cemail_desc').css('color', 'red');
            $('#cemail_desc').text('email格式錯誤')
            tf_cemail = false;
        } else {
            $('#cemail_desc').css('color', 'green');
            $('#cemail_desc').text('email格式...正確了...');
            tf_cemail = true;
        }
    });
  

    $('#cust_info_submit').click(function () { 
        var user_id = $('#cuser_id').val();
        var user_pwd = $("#cpassword").val();

        cpassword1 = $('#cpassword1').val();
        var name = $('#cname').val();
        var email = $('#cemail').val();

        var zipcode1 = $('#tw_zipcode1').val();
        var city1 = $('#city1').val();
        var dist1 = $('#dist1').val();
        var address1 = $('#address1').val();

        var zipcode2 = $('#tw_zipcode2').val();
        var city2 = $('#city2').val();
        var dist2 = $('#dist2').val();
        var address2 = $('#address2').val();

        var zipcode3 = $('#tw_zipcode3').val();
        var city3 = $('#city3').val();
        var dist3 = $('#dist3').val();
        var address3 = $('#address3').val();
         // 配送地址1: 一定要有....配送地址2,3:可無
        /*
        alert(
            "tf_cpassword1 : " + tf_cpassword1 + "\n tf_cemail : " + tf_cemail +
            "\n name : " + name +
            "\n zipcode1 : " + zipcode1 +
            "\n city1 : " + city1 +
            "\n dist1 : " + dist1 +
            "\n address1 : " + address1 + "\n\n=====================================\n" +
            '資料都正確了, 確定送出囉!' + '\n' + user_id + '\n' + cpassword1 + '\n' + name + '\n' + email + '\n-----------------\n'
            + zipcode1 + '\n' + city1 + '\n' + dist1 + '\n' + address1 + '\n-----------------\n'
            + zipcode2 + '\n' + city2 + '\n' + dist2 + '\n' + address2 + '\n----------------------\n'
            + zipcode3 + '\n' + city3 + '\n' + dist3 + '\n' + address3+ '\n=============================='
        );
        */
        if (( tf_cpassword1 && tf_cemail ) &&
            (name != null && name != "") &&
            (zipcode1 != null && zipcode1 != "") &&
            (city1 != null && city1 != "") &&
            (dist1 != null && dist1 != "") &&
            (address1 != null && address1 != "") 
        ) {
            // user_pwd: 原來的密碼----做第二次的密碼驗証
            // password1: 修改後的密碼--驗証無誤,再修改資料
            var form_data = {
                user_id: user_id,
                user_pwd: user_pwd,
                cpassword1: cpassword1,
                cust_name: name,
                email: email,
                zipcode1: zipcode1,
                city1: city1,
                dist1: dist1,
                address1: address1,

                zipcode2: zipcode2,
                city2: city2,
                dist2: dist2,
                address2: address2,

                zipcode3: zipcode3,
                city3: city3,
                dist3: dist3,
                address3: address3,
            };
            var api_url = root_url + "/orchard/app/CRUD/cust_info_Update.php" ;
            $.ajax({
                type: "POST",
                url: api_url,
                data: JSON.stringify(form_data),
                dataType: "json",
                success: function (info) {
                    // 這個success, 是指連到後端的api 成功, 所以後端的程式判斷的response/echo,這裏都接收的到
                    // 由這裏來判斷, 後端處理資料的狀況
                    var action = "修改";
                    if (info.state) {
                        alert(action+info.message);
                        $("#cust_info").modal('hide');
                        $("#form_register")[0].reset()
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
        } else { alert("資料不齊全,無法修改"); }
    })
})