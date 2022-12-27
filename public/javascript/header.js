
function addAppointment(tasks) {
    let root = document.getElementById("appointment-list");
    root.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        root.innerHTML += `
            <li class="notification-unread">
                <a href="javascript:void()">
                    <div class="notification-content">
                        <div class="notification-heading">${task.customer.name}</div>
                        <div class="notification-timestamp">${task.date}</div>
                        <div class="notification-text">${task.title}</div>
                    </div>
                </a>
            </li>
        `;
    }
}

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
            let appointment_count = document.getElementsByClassName("appointment-number");
            appointment_count[0].innerHTML = tasks.Number;
            appointment_count[1].innerHTML = `${tasks.Number} Lịch hẹn mới`;
            addAppointment(tasks.data);
        }
    });
});