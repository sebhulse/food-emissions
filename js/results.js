const displayEmissionsData = () => {
  console.log("display emissions data");
  console.log(JSON.parse(sessionStorage.getItem("calculatedEmissionsData")));
  console.log("download emissions data");
  console.log("submit emissions data to google sheet");
};
displayEmissionsData();
