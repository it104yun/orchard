$(function () { 
    var user_id, password1, password2;
    var tf_ruser_id = false;
    var tf_rpassword1 = false;
    var tf_remail = false;
    // var tf_zipcode = false;
    // var tf_address = false;

    function checkChName(el) {
        el.addEventListener('input', e => {
        setTimeout(() => {
            return e.target.value = e.target.value.replace(/[a-zA-Z0-9]|[ws]|[!#$€£%&'"`()*+-./:：;；…,，。「」【】=<>?@{}^|[]]/g, '')
        }, 0)
        }, false);
    }
    const jsName = document.getElementById('rname');
    checkChName(jsName);

    $('#ruser_id').bind('input propertychange', function () {
        user_id = $(this).val();
        const rules = /^09\d{8}$/;
        if (!rules.test(user_id)) {
            $('#ruser_id_desc').css('color', 'red');
            $('#ruser_id_desc').text('手號號碼錯誤 ' + user_id);
            tf_ruser_id = false;
        } else {
            $('#ruser_id_desc').css('color', 'green');
            $('#ruser_id_desc').text('手號號碼...正確了...'); 
            tf_ruser_id = true;
        }
    });

    $('#rpassword1').bind('input propertychange', function () {
        password1 = $(this).val();
        const rules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!rules.test(password1)) { 
            // $('#rpassword1_desc').css('color', 'red');
            // $('#rpassword1_desc').text('密碼错誤 : 至少8個字元,要有大小寫字母,至少一個數字 ' + password1);
            // Bootstrap5 的valid機制--------------------begin
            $(this).removeClass("is-valid");
            $(this).addClass("is-invalid");
            $('#rpassword1_invalid').text('密碼错誤 : 至少8個字元,要有大小寫字母,至少一個數字 ' + password1);
            // Bootstrap5 的valid機制--------------------end

            tf_rpassword1 = false;
            
        } else {
            // $('#rpassword1_desc').css('color', 'green');
            // $('#rpassword1_desc').text('密碼...正確了 ' + password1);  
            // Bootstrap5 的valid機制--------------------begin
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            $('#rpassword1_valid').text('密碼正確' + password1);
            // Bootstrap5 的valid機制--------------------end

            tf_rpassword1 = true;
        }
    });

    $('#rpassword2').bind('input propertychange', function () {
        password2 = $(this).val();
        if (password1 !== password2) { 
            // $('#rpassword2_desc').css('color', 'red');
            // $('#rpassword2_desc').text('密碼不一致 ' + password2);
            $(this).removeClass("is-valid");
            $(this).addClass("is-invalid");
            $('#rpassword2_invalid').text('密碼不一致 ' + password2);
            tf_rpassword1 = false;
        } else {
            // $('#rpassword2_desc').css('color', 'green');
            // $('#rpassword2_desc').text('密碼...一致了'); 
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            $('#rpassword2_valid').text('...密碼一致了...' + password2);
            tf_rpassword1 = true;
        }
    });

    $('#remail').bind('input propertychange', function () {
        email = this.value;
        const rules = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!rules.test(email)) { 
            $('#remail_desc').css('color', 'red');
            $('#remail_desc').text('email格式錯誤');
            tf_remail = false;
        } else {
            $('#remail_desc').css('color', 'green');
            $('#remail_desc').text('email格式...正確了...');
            tf_remail = true;
        }
    });


    $('#address').bind('input propertychange', function () {
        $('#address_desc').text($(this).val());
    });

    $('#register_submit').click(function () { 
        // var member_terms = $("input[name='member_terms']:checkbox").val();  //其實直接用jQuery的Selector就可以了
        // $("input[name='member_terms']").prop("checked", true);
        // alert('Please select\n'+member_terms);
        if ($('#member_terms').is(":checked")) {
            user_id = $('#ruser_id').val();
            password1 = $('#rpassword1').val();
            var name = $('#rname').val();
            var gender = $("input[name=rgender]:checked").val();
            var email = $('#remail').val();
            var zipcode = $('#tw_zipcode').val();
            var city = $('#city').val();
            var dist = $('#dist').val();
            var address = $('#address').val();
            // alert('資料都正確了, 確定送出囉!' + '\n' + user_id + '\n' + password1 + '\n' + name + '\n' + gender + '\n' + email + '\n' + zipcode + '\n' + city + '\n' + dist + '\n' + address
            // + "\n\n\n "+tf_ruser_id +"\n"+ tf_rpassword1 +"\n"+tf_remail);
            // $("#form_register")[0].reset();
            if ((tf_ruser_id && tf_rpassword1 && tf_remail) &&
                (name != null && name != "") &&
                (gender != null && gender != "") &&
                (zipcode != null && zipcode != "") &&
                (city != null && city != "") &&
                (dist != null && dist != "") &&
                (address != null && address != "") &&
                ( password1==password2 )
            ) {
                var form_data = {
                    user_id: user_id,
                    user_pwd: password1,
                    cust_name: name,
                    gender: gender,
                    email: email,
                    zipcode1: zipcode,
                    city1: city,
                    dist1: dist,
                    address1: address
                };
                // alert(JSON.stringify(form_data));
                var api_url = root_url + "/orchard/app/CRUD/register_Create.php";
                $.ajax({
                    type: "POST",
                    url: api_url,
                    data: JSON.stringify(form_data),
                    dataType: "json",
                    success: function (info) {
                        // 這個success, 是指連到後端的api 成功, 所以後端的程式判斷的response/echo,這裏都接收的到
                        // 由這裏來判斷, 後端處理資料的狀況
                        var action = "註冊";
                        // alert("已接收到您的註冊申請,將在3~12時內,回覆驗証email給您!");
                        if (info.state) {
                            var login_tf = confirm(action + info.message + "\n\n\n 是否立即登入?");
                            $("#register").modal('hide');  
                            if (login_tf) { 
                                $("#login").modal('show'); 
                            };
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
                        alert("連線錯誤!\n\n" + JSON.stringify(result));
                    }
                })
            } else { alert("資料不齊全,無法註冊"); }
        } else {
            alert('您未勾選『同意以上會員條款』\n\n 請務必勾選,才能繼續註冊! \n\n 麻煩您了,謝謝您!');
        }
        
    })
})