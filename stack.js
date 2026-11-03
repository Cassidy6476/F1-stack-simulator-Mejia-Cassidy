class Stack {
  constructor() { this.items = []; }
  push(value) { this.items.push(value); }
  pop() { return this.items.length ? this.items.pop() : undefined; }
  peek() { return this.items.length ? this.items[this.items.length - 1] : undefined; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
  clear() { this.items = []; }
}

$(function () {
  const stack = new Stack();
  const $input = $("#value-input");
  const $stack = $("#stack");
  const $deleted = $("#deleted");
  const $status = $("#status");

  function render() {
    $stack.empty();
    $("#stack-size").text(stack.size() + (stack.size() === 1 ? " item" : " items"));
    if (stack.isEmpty()) {
      $stack.append($("<p>").addClass("empty").text("Stack is empty"));
      return;
    }
    stack.items.slice().reverse().forEach((value, index) => {
      const $item = $("<div>").addClass("data-item").text(value);
      if (index === 0) $item.addClass("top-item").prepend($("<span>").addClass("item-label").text("TOP"));
      $stack.append($item);
    });
  }

  function message(text, type) {
    $status.text(text).removeClass("success error").addClass(type || "");
  }

  function pushValue() {
    const value = $input.val().trim();
    if (!value) { message("Please enter a value before pushing.", "error"); $input.trigger("focus"); return; }
    stack.push(value);
    $input.val("");
    render();
    message(value + " pushed onto the stack.", "success");
    $input.trigger("focus");
  }

  $("#push-btn").on("click", pushValue);
  $input.on("keydown", event => { if (event.key === "Enter") pushValue(); });

  $("#pop-btn").on("click", function () {
    const value = stack.pop();
    if (value === undefined) { message("Cannot pop: the stack is empty.", "error"); return; }
    $deleted.removeClass("empty-value").text(value);
    render();
    message(value + " popped from the top.", "success");
  });

  $("#peek-btn").on("click", function () {
    const value = stack.peek();
    if (value === undefined) { message("Cannot peek: the stack is empty.", "error"); return; }
    render();
    $stack.children().first().addClass("highlight");
    message("Top value is " + value + ". It was not removed.", "success");
  });

  $("#clear-btn").on("click", function () {
    stack.clear();
    $deleted.addClass("empty-value").text("Nothing deleted yet");
    render();
    message("Stack and deleted display cleared.", "success");
  });

  render();
});
