document.addEventListener("DOMContentLoaded", function () {
  const elems = document.querySelectorAll(".datepicker");
  const instances = M.Datepicker.init(elems, {});
});

$(document).ready(function () {
  $("#new-train-form").on("submit", function (event) {
    event.preventDefault();
    console.log("Submitted the form");
    const newTrain = {
      name: $("#name").val(),
      number: $("#number").val(),
      status: $("#status").val(),
      currentStation: $("#currentStation").val(),
      eta: $("#eta").val(),
    };

    if (
      !newTrain.name ||
      !newTrain.number ||
      !newTrain.status ||
      !newTrain.currentStation ||
      !newTrain.eta
    ) {
      alert("Please complete all fields!");
    } else {
      $.ajax({
        url: "/api/trains",
        method: "POST",
        data: newTrain,
      }).then((response) => {
        console.log(response);
        window.location.href = "/trains";
      });
    }
  });
});
