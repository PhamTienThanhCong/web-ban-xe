let listService = [];
    let listServiceId = "";
    let total = 0;

    function removeAccents(str) {
        var AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ", "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ"    
        ];
        for (var i=0; i<AccentsMap.length; i++) {
            var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
            var char = AccentsMap[i][0];
            str = str.replace(re, char);
        }
        return str;
    }

    function addService(index){
        $('#mathang').val('');
        $('#list-mat-hang').html('');
        listServiceId += listService[index]._id + ',';
        total += listService[index].price;
        document.getElementById('total-price').value = "Tỉnh Tổng: " + total + ' VND';
        document.getElementById('list-mat-hang-tam-tinh').innerHTML += `<li class="list-group-item">${listService[index].name} - ${listService[index].price} VNĐ</li>`;
    }
    $(document).ready(function () {
        $.ajax({
            url: "/api/get-all-service",
            type: "GET",
            success: function (data) {
                listService = data.data
            }
        })
    });
    
    $(document).ready(function () {
        $('#mathang').keyup(function () {
            let search = $(this).val().trim();
            search = removeAccents(search);
            let html = '';
            if (search != ""){
                for (let i = 0; i < listService.length; i++) {
                if (removeAccents(listService[i].name.toLowerCase()).indexOf(search.toLowerCase()) !== -1) {
                    html += `<li class="list-group-item" onclick="addService(${i})" style="cursor: pointer">${listService[i].name} - ${listService[i].price} VNĐ</li>`
                }
            }
            }
            $('#list-mat-hang').html(html)
        })
    })

    function submitForm(){
        listServiceId = listServiceId.substring(0, listServiceId.length - 1);
        let name = $('#name-kh').val();
        let phone = $('#phone-kh').val();
        if (name == '' || phone == ''){
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        $.ajax({
            url: "/api/order/create",
            type: "POST",
            data: {
                name: name,
                phone: phone,
                id_services: listServiceId
            },
            success: function (data) {
                if (data.status == 200){
                    swal({
                        title: "Thành công",
                        text: "Thêm hóa đơn thành công",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonClass: "btn-success",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                    },
                    function(){
                        window.location.href = `/admin/quan-ly-don-hang/xem/${data.id}`;
                    });
                } else {
                    swal({
                        title: "Thất bại",
                        text: "Thêm hóa đơn thất bại",
                        type: "error",
                        showCancelButton: false,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Xem bill",
                        closeOnConfirm: false
                    },
                    function(){
                        window.location.href = "/admin/them-don-hang";
                    });
                }

            }
        })
    }