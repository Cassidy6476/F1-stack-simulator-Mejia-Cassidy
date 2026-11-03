class Queue {
  constructor() { this.items = []; }
  enqueue(value) { this.items.push(value); }
  dequeue() { return this.items.length ? this.items.shift() : undefined; }
  peek() { return this.items.length ? this.items[0] : undefined; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
  clear() { this.items = []; }
}
$(function () {
  const queue = new Queue(), $input = $("#value-input"), $queue = $("#queue"), $deleted = $("#deleted"), $status = $("#status");
  function render() {
    $queue.empty();
    $("#queue-size").text(queue.size() + (queue.size() === 1 ? " item" : " items"));
    if (queue.isEmpty()) { $queue.append($("<p>").addClass("empty").text("Queue is empty")); return; }
    queue.items.forEach((value, index) => {
      const $item = $("<div>").addClass("data-item").text(value);
      if (index === 0) $item.addClass("front-item").prepend($("<span>").addClass("item-label").text("FRONT"));
      if (index === queue.size() - 1) $item.addClass("rear-item").append($("<span>").addClass("rear-label").text("REAR"));
      $queue.append($item);
    });
  }
  function message(text, type) { $status.text(text).removeClass("success error").addClass(type || ""); }
  function enqueueValue() {
    const value = $input.val().trim();
    if (!value) { message("Please enter a value before enqueueing.", "error"); $input.trigger("focus"); return; }
    queue.enqueue(value); $input.val(""); render(); message(value + " added to the rear of the queue.", "success"); $input.trigger("focus");
  }
  $("#enqueue-btn").on("click", enqueueValue);
  $input.on("keydown", event => { if (event.key === "Enter") enqueueValue(); });
  $("#dequeue-btn").on("click", function () {
    const value = queue.dequeue();
    if (value === undefined) { message("Cannot dequeue: the queue is empty.", "error"); return; }
    $deleted.removeClass("empty-value").text(value); render(); message(value + " removed from the front of the queue.", "success");
  });
  $("#peek-btn").on("click", function () {
    const value = queue.peek();
    if (value === undefined) { message("Cannot peek: the queue is empty.", "error"); return; }
    render(); $queue.children().first().addClass("highlight"); message("Front value is " + value + ". It was not removed.", "success");
  });
  $("#clear-btn").on("click", function () {
    queue.clear(); $deleted.addClass("empty-value").text("Nothing deleted yet"); render(); message("Queue and deleted display cleared.", "success");
  });
  render();
});