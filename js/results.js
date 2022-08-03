const results = () => {
  const data = displayEmissionsDataBreakdown();
  displayEmissionsTableData(data);
};

const displayEmissionsDataBreakdown = () => {
  const calculatedEmissionsData = JSON.parse(
    sessionStorage.getItem("calculatedEmissionsData")
  );
  const totalEmissionsData = JSON.parse(
    sessionStorage.getItem("totalEmissionsData")
  );
  let data = [];
  data.push(
    totalEmissionsData.tripStart,
    totalEmissionsData.totalDays,
    totalEmissionsData.totalEmissions
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
      totalEmissions &&
        insertElement(
          `<p>Total ${meal} emissions: ${totalEmissions.emissions} kgCO2e</p>`,
          `${placeholder}Placeholder`
        );
    }
  );
  insertElement(
    `<p>Trip length: ${totalEmissionsData.totalDays} days</p>`,
    "tripInformationPlaceholder"
  );
  insertElement(
    `<p>Total emissions: ${totalEmissionsData.totalEmissions} kgCO2e</p>`,
    "totalEmissionsPlaceholder"
  );
  if (
    totalEmissionsData.totalEmissions ===
    totalEmissionsData.potentialTotalVeganEmissions
  ) {
    insertElement(
      `<div class="alert alert-success mt-3" role="alert">
      <strong>Nice one!</strong> Since you ate and drank 100% Vegan 🌱, your food and drink emissions are <strong>as low as they can be</strong> using this methodology.
    </div>`,
      "infoPlaceholder"
    );
  } else {
    const emissionsReductionPercent = Math.round(
      ((totalEmissionsData.totalEmissions -
        totalEmissionsData.potentialTotalVeganEmissions) /
        totalEmissionsData.totalEmissions) *
        100
    );
    insertElement(
      `<div class="alert alert-info mt-3" role="alert">
      <strong>Thank you</strong> for submitting your data. By choosing Vegan 🌱 next time, you could reduce your emissions by <strong>${emissionsReductionPercent}%</strong>!
    </div>`,
      "infoPlaceholder"
    );
  }
  return data;
};

const displayEmissionsTableData = (data) => {
  const tableBodyPlaceholder = document.getElementById(`tableBodyPlaceholder`);
  data.map((el) => {
    tableBodyPlaceholder.innerHTML += `<td>${el}</td>`;
  });
};

const insertEmissionsData = (section, sectionName, number, diet, emissions) => {
  const sectionPlaceholder = document.getElementById(`${section}Placeholder`);
  sectionPlaceholder.innerHTML += `<p>${number}x ${diet} ${sectionName} = ${emissions} kgCO2e</p>`;
};

const insertElement = (message, placeholder) => {
  const sectionPlaceholder = document.getElementById(`${placeholder}`);
  sectionPlaceholder.innerHTML += `${message}`;
};

const copyTableData = () => {
  const tableElement = document.getElementById("table");
  const blob = new Blob([tableElement.outerHTML], { type: "text/html" });
  const tableHtml = new ClipboardItem({ "text/html": blob });
  navigator.clipboard.write([tableHtml]).then(
    () => {
      setButtonStyle(
        "Copied to Clipboard!",
        "Copy Entire Table",
        true,
        "copyEntireTable"
      );
    },
    () => {
      setButtonStyle(
        "Copy failed",
        "Copy Entire Table",
        false,
        "copyEntireTable"
      );
    }
  );
};

const setButtonStyle = (
  buttonText,
  buttonTextOriginal,
  isSuccess,
  elementId
) => {
  const button = document.getElementById("copyEntireTable");
  button.innerHTML = buttonText;
  isSuccess
    ? (button.className = "btn btn-outline-success m-2")
    : (button.className = "btn btn-outline-danger m-2");
  setInterval(() => {
    button.innerHTML = buttonTextOriginal;
    button.className = "btn btn-outline-dark m-2";
  }, 2000);
};

const downloadJsonEmissionsData = () => {};

const downloadCsvEmissionsData = () => {};

results();
