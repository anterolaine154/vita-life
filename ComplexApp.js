/*
   Filename: ComplexApp.js
   Description: This JavaScript file contains a complex and elaborate application that demonstrates various programming concepts and techniques.
*/

// Global variables
let mainData = [];
let filteredData = [];

// Fetching data from an API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    mainData = data.results;
    console.log("Data fetched successfully.");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Filtering data based on criteria
function filterData(criteria) {
  filteredData = mainData.filter(item => {
    if (item.category === criteria) {
      return true;
    } else {
      return false;
    }
  });
  console.log("Data filtered based on criteria:", criteria);
}

// Sorting data based on a specific property
function sortData(property, order) {
  filteredData.sort((a, b) => {
    if (order === "asc") {
      return a[property] - b[property];
    } else {
      return b[property] - a[property];
    }
  });
  console.log("Data sorted based on property:", property, "in", order, "order");
}

// Calculate statistics on filtered data
function calculateStatistics() {
  let sum = 0;
  let max = Number.MIN_SAFE_INTEGER;
  let min = Number.MAX_SAFE_INTEGER;

  for (let item of filteredData) {
    sum += item.value;
    max = Math.max(max, item.value);
    min = Math.min(min, item.value);
  }

  const average = sum / filteredData.length;
  console.log("Statistics calculated:");
  console.log("- Total items:", filteredData.length);
  console.log("- Sum of values:", sum);
  console.log("- Average value:", average);
  console.log("- Maximum value:", max);
  console.log("- Minimum value:", min);
}

// Run the application
async function run() {
  await fetchData("https://api.example.com/data");

  filterData("categoryA");
  sortData("value", "desc");
  calculateStatistics();
}

run();