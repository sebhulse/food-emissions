function submit() {
  const veganBreakfasts = document.getElementById("vegan-breakfasts");
  console.log(veganBreakfasts.value);
  warningMessage(
    "Addition Error",
    "Please ensure that your Days of <em>Breakfasts</em> add up to your 'Total days of trip'."
  );
}

const warningMessage = (heading, message) => {
  let warningPlaceholder = document.getElementById("warningPlaceholder");
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-danger" role="alert">`,
    `<h4>${heading}</h4>`,
    `${message}`,
    `</div>`,
  ].join("");
  warningPlaceholder.innerHTML = wrapper.innerHTML;
  warningPlaceholder.focus();
  window.location.href = "/#warningPlaceholder";
};
