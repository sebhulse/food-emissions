VEGAN_EMISSIONS_DAILY_KG = Number((36 * 52) / 365);
VEGETARIAN_EMISSIONS_DAILY_KG = Number((46 * 52) / 365);
MEAT_AND_DAIRY_EMISSIONS_DAILY_KG = Number((61 * 52) / 365);

BREAKFAST_PROPORTION = Number(0.2);
LUNCH_PROPORTION = Number(0.3);
EVENING_PROPORTION = Number(0.3);
SNACK_PROPORTION = Number(0.2);

const submit = () => {
  const valuesKey = getAndCheckInputData();
  let result;
  if (valuesKey) {
    result = calculateEmissionsData(valuesKey);
    window.location.href = "/results.html";
  }
};

const getAndCheckInputData = () => {
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
    const inputData = {
      totalDays: totalDays,
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
    sessionStorage.setItem("inputData", JSON.stringify(inputData));
    return "inputData";
  }
};

const calculateEmissionsData = (valuesKey) => {
  const values = JSON.parse(sessionStorage.getItem(valuesKey));
  const veganBreakfastEmissions = Number(
    values.breakfasts.vegan * VEGAN_EMISSIONS_DAILY_KG * BREAKFAST_PROPORTION
  );
  const vegetarianBreakfastEmissions = Number(
    values.breakfasts.vegetarian *
      VEGETARIAN_EMISSIONS_DAILY_KG *
      BREAKFAST_PROPORTION
  );
  const meatAndDairyBreakfastEmissions = Number(
    values.breakfasts.meatAndDairy *
      MEAT_AND_DAIRY_EMISSIONS_DAILY_KG *
      BREAKFAST_PROPORTION
  );

  const veganLunchEmissions = Number(
    values.lunches.vegan * VEGAN_EMISSIONS_DAILY_KG * LUNCH_PROPORTION
  );
  const vegetarianLunchEmissions = Number(
    values.lunches.vegetarian * VEGETARIAN_EMISSIONS_DAILY_KG * LUNCH_PROPORTION
  );
  const meatAndDairyLunchEmissions = Number(
    values.lunches.meatAndDairy *
      MEAT_AND_DAIRY_EMISSIONS_DAILY_KG *
      LUNCH_PROPORTION
  );

  const veganEveningEmissions = Number(
    values.evening.vegan * VEGAN_EMISSIONS_DAILY_KG * EVENING_PROPORTION
  );
  const vegetarianEveningEmissions = Number(
    values.evening.vegetarian *
      VEGETARIAN_EMISSIONS_DAILY_KG *
      EVENING_PROPORTION
  );
  const meatAndDairyEveningEmissions = Number(
    values.evening.meatAndDairy *
      MEAT_AND_DAIRY_EMISSIONS_DAILY_KG *
      EVENING_PROPORTION
  );

  const veganSnackEmissions = Number(
    values.snacks.vegan * VEGAN_EMISSIONS_DAILY_KG * SNACK_PROPORTION
  );
  const vegetarianSnackEmissions = Number(
    values.snacks.vegetarian * VEGETARIAN_EMISSIONS_DAILY_KG * SNACK_PROPORTION
  );
  const meatAndDairySnackEmissions = Number(
    values.snacks.meatAndDairy *
      MEAT_AND_DAIRY_EMISSIONS_DAILY_KG *
      SNACK_PROPORTION
  );

  const breakfastsTotalEmissions = Number(
    veganBreakfastEmissions +
      vegetarianBreakfastEmissions +
      meatAndDairyBreakfastEmissions
  );
  const lunchesTotalEmissions = Number(
    veganLunchEmissions + vegetarianLunchEmissions + meatAndDairyLunchEmissions
  );
  const eveningTotalEmissions = Number(
    veganEveningEmissions +
      vegetarianEveningEmissions +
      meatAndDairyEveningEmissions
  );
  const snacksTotalEmissions = Number(
    veganSnackEmissions + vegetarianSnackEmissions + meatAndDairySnackEmissions
  );
  const totalEmissions = Number(
    breakfastsTotalEmissions +
      lunchesTotalEmissions +
      eveningTotalEmissions +
      snacksTotalEmissions
  );

  const calculatedEmissionsData = {
    totalDays: values.totalDays,
    totalEmissions: +totalEmissions.toFixed(2),
    potentialTotalVeganEmissions: +(
      values.totalDays * VEGAN_EMISSIONS_DAILY_KG
    ).toFixed(2),
    breakfasts: {
      vegan: Number(veganBreakfastEmissions.toFixed(2)),
      vegetarian: Number(vegetarianBreakfastEmissions.toFixed(2)),
      meatAndDairy: Number(meatAndDairyBreakfastEmissions.toFixed(2)),
      breakfastsTotalEmissions: Number(breakfastsTotalEmissions.toFixed(2)),
    },
    lunches: {
      vegan: Number(veganLunchEmissions.toFixed(2)),
      vegetarian: Number(vegetarianLunchEmissions.toFixed(2)),
      meatAndDairy: Number(meatAndDairyLunchEmissions.toFixed(2)),
      lunchesTotalEmissions: Number(lunchesTotalEmissions.toFixed(2)),
    },
    evening: {
      vegan: Number(veganEveningEmissions.toFixed(2)),
      vegetarian: Number(vegetarianEveningEmissions.toFixed(2)),
      meatAndDairy: Number(meatAndDairyEveningEmissions.toFixed(2)),
      eveningTotalEmissions: Number(eveningTotalEmissions.toFixed(2)),
    },
    snacks: {
      vegan: Number(veganSnackEmissions.toFixed(2)),
      vegetarian: Number(vegetarianSnackEmissions.toFixed(2)),
      meatAndDairy: Number(meatAndDairySnackEmissions.toFixed(2)),
      snacksTotalEmissions: Number(snacksTotalEmissions.toFixed(2)),
    },
  };
  sessionStorage.setItem(
    "calculatedEmissionsData",
    JSON.stringify(calculatedEmissionsData)
  );
  return "calculatedEmissionsData";
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
