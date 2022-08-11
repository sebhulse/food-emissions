const DATA_METHODOLOGY = "Methodology V1 foodemissions.uk/methodology";
const DATA_AGGREGATION_TOOL = "foodemissions.uk";
const HEADINGS = [
  "Trip Information-Start Date (ISO)",
  "Trip Information-Total Days",
  "Trip Information-Total Emissions (kgCO2e)",

  "Breakfast-Vegan-Number",
  "Breakfast-Vegan-Emissions (kgCO2e)",
  "Breakfast-Vegetarian-Number",
  "Breakfast-Vegetarian-Emissions (kgCO2e)",
  "Breakfast-Meat and Dairy-Number",
  "Breakfast-Meat and Dairy-Emissions (kgCO2e)",
  "Breakfast-Total Breakfast-Number",
  "Breakfast-Total Breakfast-Emissions (kgCO2e)",

  "Lunch-Vegan-Number",
  "Lunch-Vegan-Emissions (kgCO2e)",
  "Lunch-Vegetarian-Number",
  "Lunch-Vegetarian-Emissions (kgCO2e)",
  "Lunch-Meat and Dairy-Number",
  "Lunch-Meat and Dairy-Emissions (kgCO2e)",
  "Lunch-Total Lunch-Number",
  "Lunch-Total Lunch-Emissions (kgCO2e)",

  "Evening Meal-Vegan-Number",
  "Evening Meal-Vegan-Emissions (kgCO2e)",
  "Evening Meal-Vegetarian-Number",
  "Evening Meal-Vegetarian-Emissions (kgCO2e)",
  "Evening Meal-Meat and Dairy-Number",
  "Evening Meal-Meat and Dairy-Emissions (kgCO2e)",
  "Evening Meal-Total Evening Meal-Number",
  "Evening Meal-Total Evening Meal-Emissions (kgCO2e)",

  "Everything Else-Vegan-Number",
  "Everything Else-Vegan-Emissions (kgCO2e)",
  "Everything Else-Vegetarian-Number",
  "Everything Else-Vegetarian-Emissions (kgCO2e)",
  "Everything Else-Meat and Dairy-Number",
  "Everything Else-Meat and Dairy-Emissions (kgCO2e)",
  "Everything Else-Total Everything Else-Number",
  "Everything Else-Total Everything Else-Emissions (kgCO2e)",

  "Data Information-Created On (ISO)",
  "Data Information-Methodology and Data",
  "Data Information-Data Aggregation Tool",
];

let CREATED_ON = "";
let htmlTableDataRows = "";
let JSON_DATA = "";
let ALL_DATA_FLAT = [];

const results = () => {
  try {
    ALL_DATA_FLAT = displayEmissionsDataBreakdown();
    displayEmissionsTableData();
    const calculatedEmissionsData = JSON.parse(
      sessionStorage.getItem("calculatedEmissionsData")
    );
    const totalEmissionsData = JSON.parse(
      sessionStorage.getItem("totalEmissionsData")
    );
    JSON_DATA = {
      calculatedEmissionsData: calculatedEmissionsData,
      totalEmissionsData: totalEmissionsData,
      dataInformation: {
        createdOn: CREATED_ON,
        methodologyAndData: DATA_METHODOLOGY,
        dataAggregationTool: DATA_AGGREGATION_TOOL,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

const displayEmissionsDataBreakdown = () => {
  const calculatedEmissionsData = JSON.parse(
    sessionStorage.getItem("calculatedEmissionsData")
  );
  const totalEmissionsData = JSON.parse(
    sessionStorage.getItem("totalEmissionsData")
  );
  let data = [];
  try {
    data.push(
      totalEmissionsData.tripStart,
      totalEmissionsData.totalDays,
      totalEmissionsData.totalEmissions
    );
  } catch {
    insertElement(
      `<div class="alert alert-warning mt-3" role="alert">
      <strong>Oops, no data was found!</strong> Please <a href="/" class="alert-link">enter some data</a>.</div>`,
      "infoPlaceholder"
    );
  }

  calculatedEmissionsData.map(
    ({
      meal,
      placeholder,
      vegan,
      vegetarian,
      meatAndDairy,
      totalEmissions,
    }) => {
      data.push(
        vegan.number,
        vegan.emissions,
        vegetarian.number,
        vegetarian.emissions,
        meatAndDairy.number,
        meatAndDairy.emissions,
        totalEmissions.number,
        totalEmissions.emissions
      );
      vegan.number &&
        insertEmissionsData(
          placeholder,
          vegan.number,
          "Vegan",
          vegan.emissions
        );
      vegetarian.number &&
        insertEmissionsData(
          placeholder,
          vegetarian.number,
          "Vegetarian",
          vegetarian.emissions
        );
      meatAndDairy.number &&
        insertEmissionsData(
          placeholder,
          meatAndDairy.number,
          "Meat & Dairy",
          meatAndDairy.emissions
        );
      totalEmissions &&
        insertElement(
          `<p class="mt-3"><strong>Total ${meal} emissions</strong>: <strong>${totalEmissions.emissions}</strong> kgCO2e</p>`,
          `${placeholder}TotalPlaceholder`
        );
    }
  );
  CREATED_ON = new Date().toISOString().split("T")[0];
  data.push(CREATED_ON, DATA_METHODOLOGY, DATA_AGGREGATION_TOOL);
  const tripStartDateString = new Date(
    totalEmissionsData.tripStart
  ).toDateString();
  totalEmissionsData.tripStart &&
    insertElement(
      `<tr><td>Trip start:</td><td>${tripStartDateString}</td></tr>`,
      "tripInformationPlaceholder"
    );
  insertElement(
    `<tr><td>Total days:</td><td>${totalEmissionsData.totalDays}</td></tr>`,
    "tripInformationPlaceholder"
  );
  insertElement(
    `<tr>
    <td>Total emissions</td>
    <td><strong>${totalEmissionsData.totalEmissions}</strong> kgCO2e</td>
  </tr>`,
    "totalEmissionsPlaceholder"
  );
  insertElement(
    `<tr>
    <td>Total days</td>
    <td><strong>${totalEmissionsData.totalDays}</strong> days</td>
  </tr>`,
    "totalEmissionsPlaceholder"
  );
  insertElement(
    `<tr>
    <td>Average daily emissions</td>
    <td><strong>${(
      totalEmissionsData.totalEmissions / totalEmissionsData.totalDays
    ).toFixed(2)}</strong> kgCO2e</td>
  </tr>`,
    "totalEmissionsPlaceholder"
  );
  insertElement(
    `<tr>
    <td>Methodology and Data</td>
    <td>${DATA_METHODOLOGY}</td>
  </tr>`,
    "totalEmissionsPlaceholder"
  );
  if (
    totalEmissionsData.totalEmissions ===
    totalEmissionsData.potentialTotalEmissionsIfVegan
  ) {
    insertElement(
      `<div class="alert alert-success mt-3" role="alert">
      <strong>Nice one!</strong> Since you went 100% Vegan 🌱, your food and drink emissions are <strong>as low as they can be</strong> using this methodology.
    </div>`,
      "infoPlaceholder"
    );
  } else {
    const emissionsReductionPercent = Math.round(
      ((totalEmissionsData.totalEmissions -
        totalEmissionsData.potentialTotalEmissionsIfVegan) /
        totalEmissionsData.totalEmissions) *
        100
    );
    insertElement(
      `<div class="alert alert-info mt-3" role="alert">
      <strong>Thank you</strong> for entering your data. By choosing Vegan 🌱 next time, you could reduce your emissions by <strong>${emissionsReductionPercent}%</strong>!
    </div>`,
      "infoPlaceholder"
    );
  }
  return data;
};

const displayEmissionsTableData = () => {
  const tableBodyPlaceholder = document.getElementById(`tableBodyPlaceholder`);
  ALL_DATA_FLAT.map((el) => {
    tableBodyPlaceholder.innerHTML += `<td>${el}</td>`;
    htmlTableDataRows += `<td>${el}</td>`;
  });
};

const insertEmissionsData = (section, number, diet, emissions) => {
  const sectionPlaceholder = document.getElementById(`${section}Placeholder`);
  sectionPlaceholder.innerHTML += `<tr><td>${number}</td><td>${diet}</td><td><strong>${emissions}</strong></td></tr>`;
};

const insertElement = (message, placeholder) => {
  const sectionPlaceholder = document.getElementById(placeholder);
  sectionPlaceholder.innerHTML += `${message}`;
};

const copyTableData = (isEntireTable, elementId, buttonId) => {
  let blob;
  if (isEntireTable) {
    const tableElement = document.getElementById(elementId);
    blob = new Blob([tableElement.outerHTML], { type: "text/html" });
  } else {
    blob = new Blob(
      [`<table><tbody><tr>${htmlTableDataRows}</tr></tbody></table>`],
      { type: "text/html" }
    );
  }
  const tableHtml = new ClipboardItem({ [blob.type]: blob });
  navigator.clipboard.write([tableHtml]).then(
    () => {
      setButtonStyle("Copied to Clipboard!", true, buttonId);
    },
    () => {
      setButtonStyle("Copy failed", false, buttonId);
    }
  );
};

const setButtonStyle = (buttonText, isSuccess, elementId) => {
  const button = document.getElementById(elementId);
  const previousCopy = button.innerHTML;
  const previousClass = button.className;
  button.innerHTML = buttonText;
  isSuccess
    ? (button.className = "btn btn-outline-success m-2")
    : (button.className = "btn btn-outline-danger m-2");
  setInterval(() => {
    button.innerHTML = previousCopy;
    button.className = previousClass;
  }, 2000);
};

const downloadJsonEmissionsData = () => {
  let dataStr = JSON.stringify(JSON_DATA, null, 2);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
  let exportFileDefaultName = `food_emissions_${CREATED_ON}.json`;
  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
};

const downloadAllCSVEmissionsData = () => {
  let csv = [HEADINGS, ALL_DATA_FLAT];
  let csvContent =
    "data:text/csv;charset=utf-8," + csv.map((e) => e.join(",")).join("\n");
  console.log(csvContent);
};

results();
