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
        root.innerHTML += `
            <tr>
                <td>${task.customer.name}</td>
                <td>${task.customer.phone}</td>
                <td>${task.type}</td>
                <td>${task.date}</td>
                <td>${task.title}</td>
            </tr>
        `;
    }
}
let tasks = [];
$(document).ready(function () {
    $.ajax({
    type: "POST",
    url: "/api/filter-task-by-status",
    data: {
        status: "1"
    },
    dataType: "json",
    success: function (response) {
            tasks = response;
            document.getElementsByClassName("appointment-number")[2].innerHTML = tasks.Number;
            addAppointment1(tasks.data);
        }
    });
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    
    $.ajax({
        type: "POST",
        url: "/api/order/day",
        data: {
            date: today
        },
        dataType: "json",
        success: function (response) {
            document.getElementById("the-day-order").innerHTML = response.data.length;
        }
    });

    $.ajax({
        type: "GET",
        url: "/api/list/4",
        success: function (response) {
            document.getElementById("user-count").innerHTML = response.length;
        }
    });
});
