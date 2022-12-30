toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function addAppointment1(tasks){
    let root = document.getElementById("appointment-table");
    root.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        if (task.type == 1){
            task.type = "Xem xe";
        } else if (task.type == 2){
            task.type = "Sửa xe";
        }

        if (task.status == 1){
            task.status = "Đang chờ";
            task.class_view = "text-warning"
        } else if (task.status == 2){
            task.status = "Đã xác nhận";
            task.class_view = "text-success"
        } else if (task.status == 4){
            task.status = "Đã hủy";
            task.class_view = "text-danger"
        } else if (task.status == 3){
            task.status = "Đã hoàn thành";
            task.class_view = "text-primary"
        }
        root.innerHTML += `
            <tr>
                <td>${task.customer.name}</td>
                <td>${task.customer.phone}</td>
                <td>${task.type}</td>
                <td>${task.date}</td>
                <td class="${task.class_view}">${task.status}</td>
                <td>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalpopover" onclick="changeModel('${task._id}')">Xem</button>
                </td>
            </tr>
        `;
    }
}

function choseTime(type){
    let id = document.getElementById("mid").value;
    let date = document.getElementById("mdate").value;
    let time = document.getElementById("mtime").value;
    $.ajax({
        url: `/api/update-task`,
        type: "PUT",
        data: {
            id: id,
            status: type,
            date: date,
            time: time
        },
        dataType: "json",
        success: function (data) {
            getAppointment(1)
            $('#exampleModal').modal('hide');
            toastr["success"]("Cập nhập dữ liệu thành công.")
        },
        error: function (data) {
            toastr["error"]("Cập nhập dữ liệu thất bại.")
        }
    });
}

function changeModel(id){
    let modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = "Chờ xử lý";
    $.ajax({
        url: `/api/get-task-by-id/${id}`,
        type: "GET",
        success: function (data) {
            if (data.data.customer.address == null){
                data.data.customer.address = "";
            }
            if (data.data.type == 1){
                data.data.type = "Xem xe";
            } else if (data.data.type == 2){
                data.data.type = "Sửa xe";
            }
            if (!data.data.time){
                data.data.time = ""
            }
            modalBody.innerHTML = `
                <h5>Thông tin khách hàng</h5>
                <p>Họ tên: ${data.data.customer.name}</p>
                <p>Số điện thoại: ${data.data.customer.phone}</p>
                <p>Địa chỉ: ${data.data.customer.address}</p>
                <hr>
                <h5>Thông tin lịch hẹn</h5>
                <p>
                    Thể loại hẹn: ${data.data.type}
                </p>
                <p>
                    Ngày dự kiến: ${data.data.time} ${data.data.date} 
                </p>
                <p>
                    tiêu đề: ${data.data.title}
                </p>
                <p>
                    Nội dung: ${data.data.message}
                </p>
            `;
            document.getElementById("mid").value = data.data._id;
            document.getElementById("mdate").value = data.data.date;
            document.getElementById("mtime").value = data.data.time;
        },
    })
}

function getAppointment(status){
    document.getElementById("preloader").style.display = "block";
    $.ajax({
        url: "/api/filter-task-by-status",
        type: "POST",
        data: {
            status: status
        },
        dataType: "json",
        success: function (data) {
            addAppointment1(data.data);
            document.getElementById("preloader").style.display = "none";
        },
        error: function (err) {
            console.log(err);
        }
    });
}

$(document).ready(function(){
    $.ajax({
        url: "/api/get-all-task",
        type: "GET",
        dataType: "json",
        success: function (data) {
            addAppointment1(data.data);
            document.getElementById("preloader").style.display = "none";
        },
        error: function (err) {
            console.log(err);
        }
    });
});