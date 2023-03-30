$(function () {
    $("#render_all_row").empty();

    // $("#cust_manage_all_row").click(function () { 
        var api_url = root_url + "/orchard/app/CRUD/cust_info_Read_all.php" ;
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
    // })

    function render_all_data(data,data_test) { 
        var obj;
        console.log(data);
        console.log(data_test);
        var hstr0, hstr1, hstr2, hstr3, hstr4, hstr5, hstr6, hstr7, hstr8, hstr9, hstra;
        var get_data;
        var duser_role, duser_id, dcust_name;
        var user_counter=0;
        // $("#render_all_row").empty();
        for (var i = 0; i < data.length; i++){
            user_counter++;
            obj = data[i];
            hstr0 = '<tr><td class="text-center" data-th="NO">'+user_counter+'</td>';
            hstr1 = '<td data-th="角色">'+obj.user_role+'</td>'+'<td data-th="帳號">'+obj.user_id+'</td>'+'<td data-th="姓名">'+obj.cust_name+'</td>'+'<td data-th="email">'+obj.email+'</td>';
            // hstr2 = '<td data-th="郵遞區號">' + obj.zipcode1 + '</td>' + '<td data-th="縣市">' + obj.city1 + '</td>' + '<td data-th="鄉鎮">' + obj.dist1 + '</td>' + '<td data-th="地址">' + obj.address1 + '</td>';
            hstr3 = '<td class="text-center" data-th="">';
            get_data = '?user_role='+obj.user_role+'&user_id='+obj.user_id+'&cust_name='+obj.cust_name;
            data_item = ' data-user_role="'+obj.user_role+'" data-user_id="'+obj.user_id+'" data-cust_name="'+obj.cust_name+'"';
            hstr4 = '<button type="button" class="btn btn-outline-success border-success" data-bs-toggle="modal" data-bs-target="#cust_manage_edit_modal" id="cust_manage_edit"'+data_item+'><i class="fa-solid fa-circle-info">詳細資料</i></button>';
            hstr5 = '<button type="button" class="btn btn-outline-warning border-success ms-3" data-bs-toggle="modal" data-bs-target="#cust_manage_edit_modal" id="cust_manage_edit"'+data_item+'><i class="fa-solid fa-pen-to-square">編輯</i></button>';
            hstr6 = '<button type="button" class="btn btn-outline-danger border-success ms-3" data-bs-toggle="modal" data-bs-target="#cust_manage_del_modal" id="cust_manage_del"'+data_item+'><i class="fa-solid fa-trash">刪除</i></button>';
            hstra = '</td></tr>';
            
            // $("#render_all_row").append(hstr0+hstr1+hstr2+hstr3+hstr4+hstr5+hstra);
            $("#render_all_row").append(hstr0+hstr1+hstr3+hstr4+hstr5+hstr6+hstra);
        }
        $("#user_counter_show").html("會員總數:"+user_counter);

        $("#cust_manage_array #cust_manage_del").click(function () {
            duser_role = $(this).data("user_role");
            duser_id = $(this).data("user_id");
            dcust_name = $(this).data("cust_name");
            $("#del_role").val(duser_role);
            $("#del_user_id").val(duser_id);
            $("#del_name").val(dcust_name);
        });

        
        $("#cust_manage_array #cust_manage_edit").click(function () {
            duser_role = $(this).data("user_role");
            duser_id = $(this).data("user_id");
            dcust_name = $(this).data("cust_name");
            $("#edit_role").val(duser_role);
            $("#edit_user_id").val(duser_id);
            $("#edit_name").val(dcust_name);
        });
    }
    


    $("#cust_edit_submit").click(function () { 
        alert("修改成功");
        $("#cust_manage_edit_modal").modal("hide");
    });
    
})
/*
get_item = '?id='+o.ID;

user_role:"Customer"  user_id:"0900111002"  cust_name:"陳美美" user_pwd:"123456"   email:"olive.oyl168@gmail.com"  gender:"1"
zipcode1:"116"   city1:"臺北市"   dist1:"文山區"   address1:"中山路-----幸福里"
zipcode2:"300"   city2:"新竹市"   dist2:"東區"     address2:"---中山路十段10巷100號,美滿街"
zipcode3:"813"   city3:"高雄市"   dist3:"左營區"   address3:"$$$$$$rrrrrrrrrrrrrrr今天天氣不錯"
contract_id:"999999999"   contract_ip:"---"    contract_machine:"---"


<tbody id="render_all_row">
    <tr>
        <td>Customer</td>
        <td>0900123456</td>
        <td>張春春</td>
        <td>kkk@abc.com.tw</td>
        <td>438</td>
        <td>台中市</td>
        <td>西屯區</td>
        <td>文心路三段10巷5弄10號8樓B室</td>
        <td class="text-center">
            <button type="button" class="btn btn-outline-warning border-success" data-bs-toggle="modal" data-bs-target="#cust_manage_edit"><i class="fa-solid fa-pen-to-square"></i>編輯</i></button>
            <button type="button" class="btn btn-outline-danger border-success ms-3" data-bs-toggle="modal" data-bs-target="#cust_manage_del"><i class="fa-solid fa-trash"></i>刪除</i></button>
        </td>
    </tr>
</tbody>
*/