const submit = () => {
  const veganBreakfasts = document.getElementById("vegan-breakfasts");
  console.log(veganBreakfasts.value);
  warningMessage("Evening Meals", camelCase("Evening Meals"));
};

const warningMessage = (sectionText, sectionId) => {
  let warningPlaceholder = document.getElementById("warningPlaceholder");
  let warningSubheadingPlaceholder = document.getElementById(
    `${sectionId}WarningPlaceholder`
  );
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-danger" role="alert">`,
    `<h4>Oops, please check your numbers</h4>`,
    `Please ensure that your total <strong><em>${sectionText}</em></strong> days (all diets) add up to your 'Total days of trip'.`,
    `</div>`,
  ].join("");
  const wrapperSubheading = document.createElement("div");
  wrapperSubheading.innerHTML = [
    `<div class="alert alert-danger" role="alert">`,
    `Please ensure that your total <strong><em>${sectionText}</em></strong> days (all diets) add up to your 'Total days of trip'.`,
    `</div>`,
  ].join("");
  warningPlaceholder.innerHTML = wrapper.innerHTML;
  warningSubheadingPlaceholder.innerHTML = wrapperSubheading.innerHTML;
  warningPlaceholder.focus();
  window.location.href = "/#warningPlaceholder";
};

const camelCase = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};
