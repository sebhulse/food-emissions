const submit = () => {
  const values = getAndCheckValues();
  console.log(!!values);
};

const getAndCheckValues = () => {
  const totalDays = Number(document.getElementById("trip-info").value);

  const veganBreakfasts = Number(
    document.getElementById("vegan-breakfasts").value
  );
  const vegetarianBreakfasts = Number(
    document.getElementById("vegetarian-breakfasts").value
  );
  const meatAndDairyBreakfasts = Number(
    document.getElementById("m-and-d-breakfasts").value
  );

  const veganLunches = Number(document.getElementById("vegan-lunches").value);
  const vegetarianLunches = Number(
    document.getElementById("vegetarian-lunches").value
  );
  const meatAndDairyLunches = Number(
    document.getElementById("m-and-d-lunches").value
  );

  const veganEvening = Number(document.getElementById("vegan-evening").value);
  const vegetarianEvening = Number(
    document.getElementById("vegetarian-evening").value
  );
  const meatAndDairyEvening = Number(
    document.getElementById("m-and-d-evening").value
  );

  const veganSnacks = Number(document.getElementById("vegan-snacks").value);
  const vegetarianSnacks = Number(
    document.getElementById("vegetarian-snacks").value
  );
  const meatAndDairySnacks = Number(
    document.getElementById("m-and-d-snacks").value
  );

  const breakfastsDays =
    veganBreakfasts + vegetarianBreakfasts + meatAndDairyBreakfasts;
  const lunchesDays = veganLunches + vegetarianLunches + meatAndDairyLunches;
  const eveningDays = veganEvening + vegetarianEvening + meatAndDairyEvening;
  const snacksDays = veganSnacks + vegetarianSnacks + meatAndDairySnacks;

  if (totalDays !== breakfastsDays) {
    insertWarningMessages(
      "Breakfasts",
      "breakfastsWarningPlaceholder",
      totalDays,
      breakfastsDays
    );
    return null;
  } else if (totalDays !== lunchesDays) {
    insertWarningMessages(
      "Lunches",
      "lunchesWarningPlaceholder",
      totalDays,
      lunchesDays
    );
    return null;
  } else if (totalDays !== eveningDays) {
    insertWarningMessages(
      "Evening Meals",
      "eveningMealsWarningPlaceholder",
      totalDays,
      eveningDays
    );
    return null;
  } else if (totalDays !== snacksDays) {
    insertWarningMessages(
      "Everything Else",
      "snacksWarningPlaceholder",
      totalDays,
      snacksDays
    );
    return null;
  } else {
    return {
      breakfasts: {
        vegan: veganBreakfasts,
        vegetarian: vegetarianBreakfasts,
        meatAndDairy: meatAndDairyBreakfasts,
      },
      lunches: {
        vegan: veganLunches,
        vegetarian: vegetarianLunches,
        meatAndDairy: meatAndDairyLunches,
      },
      evening: {
        vegan: veganEvening,
        vegetarian: vegetarianEvening,
        meatAndDairy: meatAndDairyEvening,
      },
      snacks: {
        vegan: veganSnacks,
        vegetarian: vegetarianSnacks,
        meatAndDairy: meatAndDairySnacks,
      },
    };
  }
};

const insertWarningMessages = (
  sectionText,
  sectionId,
  totalDays,
  currentDays
) => {
  let warningPlaceholder = document.getElementById("warningPlaceholder");
  let warningSubheadingPlaceholder = document.getElementById(sectionId);
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-danger" role="alert">`,
    `<h4>Oops, please check your numbers</h4>`,
    `Please ensure that your total <strong><em>${sectionText}</em></strong> days (all diets) add up to <strong>${totalDays}</strong> (your 'Total days of trip'). You've currently allocated <strong>${currentDays} of ${totalDays}</strong> total days.`,
    `<hr>`,
    `<p class="mb-0"><strong>Please note:</strong> If your eating patterns do not follow this structure, please distribute your 'Days' to each meal time to best reflect how you ate and drank on each day (assuming one <em>Breakfast</em>, <em>Lunch</em>, <em>Evening Meal</em> and <em>Everything Else</em> for each of the days on your trip). Please see the methodology for more information.</p>`,
    `</div>`,
  ].join("");
  const wrapperSubheading = document.createElement("div");
  wrapperSubheading.innerHTML = [
    `<div class="alert alert-warning" role="alert">`,
    `Please ensure that your total <strong><em>${sectionText}</em></strong> days (all diets) add up to <strong>${totalDays}</strong> (your 'Total days of trip'). You've currently allocated <strong>${currentDays} of ${totalDays}</strong> total days.`,
    `</div>`,
  ].join("");
  warningPlaceholder.innerHTML = wrapper.innerHTML;
  warningSubheadingPlaceholder.innerHTML = wrapperSubheading.innerHTML;
  warningPlaceholder.focus();
  window.location.href = "/#warningPlaceholder";
};
