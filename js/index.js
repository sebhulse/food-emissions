VEGAN_EMISSIONS_DAILY_KG = Number((36 * 52) / 365);
VEGETARIAN_EMISSIONS_DAILY_KG = Number((46 * 52) / 365);
MEAT_AND_DAIRY_EMISSIONS_DAILY_KG = Number((61 * 52) / 365);

BREAKFAST_PROPORTION = Number(0.2);
LUNCH_PROPORTION = Number(0.3);
EVENING_PROPORTION = Number(0.3);
SNACK_PROPORTION = Number(0.2);

const submit = () => {
  const valuesKey = getAndCheckInputData();
  if (valuesKey) {
    calculateEmissionsData(valuesKey);
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
  const totalEmissionsData = {
    totalDays: values.totalDays,
    totalEmissions: +totalEmissions.toFixed(2),
    potentialTotalVeganEmissions: +(
      values.totalDays * VEGAN_EMISSIONS_DAILY_KG
    ).toFixed(2),
  };
  const calculatedEmissionsData = [
    {
      meal: "Breakfasts",
      placeholder: "breakfasts",
      vegan: {
        emissions: Number(veganBreakfastEmissions.toFixed(2)),
        number: values.breakfasts.vegan,
      },
      vegetarian: {
        emissions: Number(vegetarianBreakfastEmissions.toFixed(2)),
        number: values.breakfasts.vegetarian,
      },
      meatAndDairy: {
        emissions: Number(meatAndDairyBreakfastEmissions.toFixed(2)),
        number: values.breakfasts.meatAndDairy,
      },
      totalEmissions: {
        emissions: Number(breakfastsTotalEmissions.toFixed(2)),
        number: values.totalDays,
      },
    },
    {
      meal: "Lunches",
      placeholder: "lunches",
      vegan: {
        emissions: Number(veganLunchEmissions.toFixed(2)),
        number: values.lunches.vegan,
      },
      vegetarian: {
        emissions: Number(vegetarianLunchEmissions.toFixed(2)),
        number: values.lunches.vegetarian,
      },
      meatAndDairy: {
        emissions: Number(meatAndDairyLunchEmissions.toFixed(2)),
        number: values.lunches.meatAndDairy,
      },
      totalEmissions: {
        emissions: Number(lunchesTotalEmissions.toFixed(2)),
        number: values.totalDays,
      },
    },
    {
      meal: "Evening Meals",
      placeholder: "evening",
      vegan: {
        emissions: Number(veganEveningEmissions.toFixed(2)),
        number: values.evening.vegan,
      },
      vegetarian: {
        emissions: Number(vegetarianEveningEmissions.toFixed(2)),
        number: values.evening.vegetarian,
      },
      meatAndDairy: {
        emissions: Number(meatAndDairyEveningEmissions.toFixed(2)),
        number: values.evening.meatAndDairy,
      },
      totalEmissions: {
        emissions: Number(eveningTotalEmissions.toFixed(2)),
        number: values.totalDays,
      },
    },
    {
      meal: "Everything Else",
      placeholder: "snacks",
      vegan: {
        emissions: Number(veganSnackEmissions.toFixed(2)),
        number: values.snacks.vegan,
      },
      vegetarian: {
        emissions: Number(vegetarianSnackEmissions.toFixed(2)),
        number: values.snacks.vegetarian,
      },
      meatAndDairy: {
        emissions: Number(meatAndDairySnackEmissions.toFixed(2)),
        number: values.snacks.meatAndDairy,
      },
      totalEmissions: {
        emissions: Number(snacksTotalEmissions.toFixed(2)),
        number: values.totalDays,
      },
    },
  ];
  sessionStorage.setItem(
    "calculatedEmissionsData",
    JSON.stringify(calculatedEmissionsData)
  );
  sessionStorage.setItem(
    "totalEmissionsData",
    JSON.stringify(totalEmissionsData)
  );
  return ["calculatedEmissionsData", "totalEmissionsData"];
};

const insertWarningMessages = (
  sectionText,
  sectionId,
  totalDays,
  currentDays
) => {
  let warningPlaceholder = document.getElementById("warningPlaceholder");
  let warningSubheadingPlaceholder = document.getElementById(sectionId);
  warningPlaceholder.innerHTML += [
    `<div class="alert alert-danger" role="alert">`,
    `<h4>Oops, please check your numbers</h4>`,
    `Please ensure that your total <strong><em>${sectionText}</em></strong> days (all diets) add up to <strong>${totalDays}</strong> (your 'Total days of trip'). You've currently allocated <strong>${currentDays} of ${totalDays}</strong> total days.`,
    `<hr>`,
    `<p class="mb-0"><strong>Please note:</strong> If your eating patterns do not follow this structure, please distribute your 'Days' to each meal time to best reflect how you ate and drank on each day (assuming one <em>Breakfast</em>, <em>Lunch</em>, <em>Evening Meal</em> and <em>Everything Else</em> for each of the days on your trip). Please see the methodology for more information.</p>`,
    `</div>`,
  ].join("");
  warningSubheadingPlaceholder.innerHTML = [
    `<div class="alert alert-warning" role="alert">`,
    `Please ensure that your total <strong><em>${sectionText}</em></strong> days (all diets) add up to <strong>${totalDays}</strong> (your 'Total days of trip'). You've currently allocated <strong>${currentDays} of ${totalDays}</strong> total days.`,
    `</div>`,
  ].join("");
  warningPlaceholder.focus();
  window.location.href = "/#warningPlaceholder";
};
