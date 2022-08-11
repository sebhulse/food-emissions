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
const TRANSPORT_EMISSIONS = [
  {
    mode: "Electric Bike",
    emissions: 0.055,
    unit: "kgCO2e/mile",
    description:
      "This is for a bike traveling at the same speed with five stops per mile and 20m of climbing. This includes 50 gCO2e/mile for the embodied energy of the bike (this could be as low as 10 gCOe/mile depending on use).",
    source:
      "'How bad are bananas?', Mike Berners-Lee, Profile Books, 2020 [p. 28-29",
  },
  {
    mode: "Bus",
    emissions: 0.046,
    unit: "kgCO2e/mile",
    description: "This is for a half-full London Routemaster (Diesel Hybrid)",
    source:
      "'How bad are bananas?', Mike Berners-Lee, Profile Books, 2020 [p. 30-31]",
  },
  {
    mode: "Bicycle",
    emissions: 0.09,
    unit: "kgCO2e/mile",
    description:
      "This is for a cyclist powered by bananas. This includes 50 gCO2e/mile for the embodied energy of the bike (this could be as low as 10 gCOe/mile depending on use).",
    source:
      "'How bad are bananas?', Mike Berners-Lee, Profile Books, 2020 [p. 32-33]",
  },
  {
    mode: "Train",
    emissions: 0.08,
    unit: "kgCO2e/mile",
    description: "This is for an intercity standard class rail service.",
    source:
      "'How bad are bananas?', Mike Berners-Lee, Profile Books, 2020 [p. 33-35]",
  },
  {
    mode: "Electric Car",
    emissions: 0.18,
    unit: "kgCO2e/mile",
    description:
      "This is for a mid-sized five-door electric car. This source is generally higher than others because it includes manufacture and maintenance of the vehicle.",
    source:
      "'How bad are bananas?', Mike Berners-Lee, Profile Books, 2020 [p. 62-63]",
  },
];

let CREATED_ON = "";
let HTML_TABLE_DATA_ROWS = "";
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
    insertElement(
      `<div class="alert alert-info mt-3" role="alert">
      <strong>Thank you</strong> for entering your data. By choosing Vegan 🌱 next time, you could reduce your emissions by <strong>${emissionsReductionPercent(
        totalEmissionsData.totalEmissions,
        totalEmissionsData.potentialTotalEmissionsIfVegan
      )}%</strong> - the equivalent of ${randomEquivalentEmissionsReduction(
        totalEmissionsData.totalEmissions,
        totalEmissionsData.potentialTotalEmissionsIfVegan
      )}.
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
    HTML_TABLE_DATA_ROWS += `<td>${el}</td>`;
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
      [`<table><tbody><tr>${HTML_TABLE_DATA_ROWS}</tr></tbody></table>`],
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

const downloadJSONEmissionsData = () => {
  let json = JSON.stringify(JSON_DATA, null, 2);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(json);
  let exportFileDefaultName = `food_emissions_${CREATED_ON}.json`;
  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
};

const downloadCSVEmissionsData = () => {
  let csv = [HEADINGS, ALL_DATA_FLAT];
  let dataUri =
    "data:text/csv;charset=utf-8," +
    encodeURIComponent(csv.map((e) => e.join(",")).join("\n"));
  let exportFileDefaultName = `food_emissions_${CREATED_ON}.csv`;
  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
};

const emissionsReductionPercent = (
  totalEmissions,
  potentialTotalEmissionsIfVegan
) => {
  return Math.round(
    ((totalEmissions - potentialTotalEmissionsIfVegan) / totalEmissions) * 100
  );
};

const randomEquivalentEmissionsReduction = (
  totalEmissions,
  potentialTotalEmissionsIfVegan
) => {
  const dataLength = TRANSPORT_EMISSIONS.length;
  const data = TRANSPORT_EMISSIONS[Math.floor(Math.random() * dataLength)];
  const emissionsDifference = Number(
    totalEmissions - potentialTotalEmissionsIfVegan
  ).toFixed(2);
  console.log(emissionsDifference);
  let emissionsStatement = `${Math.round(
    emissionsDifference / data.emissions
  )} miles by ${data.mode}! `;
  return `${emissionsStatement}<button type="button" class="btn btn-link p-0" data-bs-toggle="modal" data-bs-target="#methodologyModal">How is this calculated?</button>
  <div class="modal fade" id="methodologyModal" tabindex="-1" aria-labelledby="methodologyModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="methodologyModalLabel">${data.mode}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Emissions: ${data.emissions} ${data.unit}</p>
          <p>Description: ${data.description}</p>
          <p>Source: ${data.source}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`;
};

results();
