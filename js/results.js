const results = () => {
  console.log("display emissions data");
  displayEmissionsData();
  console.log("download emissions data");
  console.log("submit emissions data to google sheet");
};

const displayEmissionsData = () => {
  const calculatedEmissionsData = JSON.parse(
    sessionStorage.getItem("calculatedEmissionsData")
  );
  const totalEmissionsData = JSON.parse(
    sessionStorage.getItem("totalEmissionsData")
  );

  calculatedEmissionsData.map(
    ({
      meal,
      placeholder,
      vegan,
      vegetarian,
      meatAndDairy,
      totalEmissions,
    }) => {
      console.log(
        meal,
        placeholder,
        vegan,
        vegetarian,
        meatAndDairy,
        totalEmissions
      );
      vegan.number &&
        insertEmissionsData(
          placeholder,
          meal,
          vegan.number,
          "Vegan",
          vegan.emissions
        );
      vegetarian.number &&
        insertEmissionsData(
          placeholder,
          meal,
          vegetarian.number,
          "Vegetarian",
          vegetarian.emissions
        );
      meatAndDairy.number &&
        insertEmissionsData(
          placeholder,
          meal,
          meatAndDairy.number,
          "Meat & Dairy",
          meatAndDairy.emissions
        );
    }
  );
  insertGenericEmissionsData(
    `Trip length: ${totalEmissionsData.totalDays} days`,
    "tripInformationPlaceholder"
  );
  insertGenericEmissionsData(
    `Total emissions: ${totalEmissionsData.totalEmissions} kgCO2e`,
    "totalEmissionsPlaceholder"
  );
  if (
    totalEmissionsData.totalEmissions ===
    totalEmissionsData.potentialTotalVeganEmissions
  ) {
    insertGenericEmissionsData(
      `<div class="alert alert-success mt-2" role="alert">
      Nice one! Since you ate and drank 100% Vegan 🌱, your food and drink emissions are essentially as low as they can be.
    </div>`,
      "infoPlaceholder"
    );
  } else {
    insertGenericEmissionsData(
      `<div class="alert alert-info mt-2" role="alert">
      Thank you for submitting your data. Please consider eating 100% Plant-Based 🌱 (Vegan) next time to reduce your emissions by approximately ${Math.round(
        ((totalEmissionsData.totalEmissions -
          totalEmissionsData.potentialTotalVeganEmissions) /
          totalEmissionsData.totalEmissions) *
          100
      )}%.
    </div>`,
      "infoPlaceholder"
    );
  }
};

const insertEmissionsData = (section, sectionName, number, diet, emissions) => {
  const sectionPlaceholder = document.getElementById(`${section}Placeholder`);
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<p>${number}x ${diet} ${sectionName} = ${emissions} kgCO2e</p>`,
  ].join("");
  sectionPlaceholder.append(wrapper);
};
const insertGenericEmissionsData = (message, placeholder) => {
  const sectionPlaceholder = document.getElementById(`${placeholder}`);
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [`${message}`].join("");
  sectionPlaceholder.append(wrapper);
};

const downloadJsonEmissionsData = () => {};

const downloadCsvEmissionsData = () => {};

const submitEmissionsDataToGoogleSheet = () => {};

results();
