var tasks = [];

var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) {
        tasks = [{
            time: "",
            task: ""
        }]
    }

    for (var i = 0; i < tasks.length; i++) {
        if (!tasks[i]) {
            tasks[i] = {
                time: "",
                tasks: ""
            }
        }
    }

    tasks.forEach(function (task) {
        addTask(task.time, task.task);
    })
}

var addTask = function (taskTime, taskText) {
    var taskItem = $("<p>").addClass("m-2 task-item").text(taskText)
    $("#hr-" + taskTime).find(".time-block").append(taskItem)
}

var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

$(".time-slot").on("click", ".time-block", function () {
    console.log($(this))
    var text = $(this).text().trim();
    var textInput = $("<textarea>")
    .addClass("col-10 form-control")
    .val(text);

    $(this).replaceWith(textInput);
    textInput.trigger("focus")
});

$(".save-btn").on("click", function () {
    var textArea = $(this).closest(".time-slot").find(".form-control")

    var text = textArea.val().trim();
    var taskP = $("<div>")
        .addClass("col-10 time-block")
        .html("<p class='m-2 task-item'>"  + text + "<p>");

        textArea.replaceWith(taskP);
    var index = $(this).closest(".time-slot").index();

    var taskTime = $(this)
        .closest(".time-slot")
        .attr("id")
        .replace("hr-", "");

    var taskObj = {
        time: taskTime,
        task: text
    }

    tasks[index] = taskObj;
    saveTasks();
    auditTime();
})

var auditTime = function () {
    var currentHr = moment().hour();

    for (i=9; i < 18; i++) {
        var timeSlotEl = $("#hr-" + i).find(".time-block");
        timeSlotEl.removeClass("past present future");

        if (currentHr < i) {
            timeSlotEl.addClass("future");
        } else if (currentHr > i) {
            timeSlotEl.addClass("past");
        } else {
            timeSlotEl.addClass("present");
        }
    }
}

$(".reset.btn").on("click", function () {
    localStorage.clear();
    $(".task-item").remove();
});

$("#currentDay").text("It is currently " + moment().format("h:mm A on ddd, MMMM D" + "."))
setInterval(function() {
    $("#currentDay").text("It is currently " + moment().format("h:mm A on ddd, MMMM D" + "."))
    auditTime();
}, 60000)

loadTasks();
auditTime();