function Car(){
    // Hàm này được gọi khi bạn tạo một đối tượng car.

function bindEvent(){
            // Hàm này thực hiện việc gắn các sự kiện cho các phần tử HTML trên trang.

    $(".car_edit").click(function(e){
        console.log(12345);

        // Khi một phần tử có lớp CSS là "post_edit" được nhấp vào (thường là nút "Edit" trên trang),
        // hàm xử lý sự kiện click dưới đây sẽ được thực thi.
        var params = {
            car_id:$(".car_id").val(),
            model:$(".model").val(),
            specifications:$(".specifications").val(),

            price:$(".price").val()


        };
                    // Ở đây, ta đang lấy giá trị từ các trường input trong biểu mẫu và đóng gói chúng vào một đối tượng params.

        var base_url = location.protocol + "//" + document.domain + ":" + location.port;
                    // Đoạn mã này xây dựng đường dẫn cơ sở (base_url) dựa trên thông tin về giao thức, tên miền, và cổng hiện tại của trang web.


        $.ajax({
            url: base_url + "/admin/cars/edit",
            type:"PUT",
            data:params,
            dataType: "json",
            success: function(res){
                // Gửi một yêu cầu AJAX đến URL "/admin/post/edit" trên máy chủ.
                // Loại yêu cầu là PUT và dữ liệu gửi đi được lưu trong biến params.
                if(res && res.status_code ==200){
                    console.log(res.status_code);

                    // Nếu yêu cầu thành công và trả về một phản hồi có trường status_code bằng 200,
                    // tức là cập nhật đã thành công, trang web sẽ được tải lại để hiển thị lại dữ liệu.
                    location.reload();
                }
            }

        });
    });

    $(".car_delete").click(function (e) {
        var car_id = $(this).attr("car_id");
        var base_url = location.protocol + "//" + document.domain + ":" + location.port;
        $.ajax({
            url: base_url + "/admin/cars/delete",
            type: "DELETE",
            data: { car_id: car_id },
            dataType: "json",
            success: function (res) {
                if (res && res.status_code == 200) {
                    location.reload();
                }
            }
        });
    });
    
}
bindEvent();
// Gọi hàm bindEvent để bắt đầu việc gắn sự kiện khi tạo một đối tượng Post.
}

$(document).ready(function(){
new Car();
// Khi tài liệu HTML đã sẵn sàng (document ready), tạo một đối tượng Post mới.


})