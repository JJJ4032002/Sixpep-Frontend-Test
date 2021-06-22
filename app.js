const table = document.body.querySelector("table");
const alphabetBtn = document.getElementById("SortByAlphabet");
const priceBtn = document.getElementById("SortByPrice");
const defaultValues = document.body.querySelector(".head");
let dataArray = [];
let defaultArr = [];

window.addEventListener("load", FetchData);

async function FetchData() {
  const response = await fetch("https://api.binance.com/api/v3/ticker/price");

  const dataValue = await response.json();
  dataArray = [...dataValue];
  defaultArr = [...dataValue];
  tableRowsCreator(dataArray);
}

alphabetBtn.addEventListener("click", SortByAlpha);
priceBtn.addEventListener("click", SortByPrice);
defaultValues.addEventListener("click", SortByDefault);

function SortByAlpha() {
  table.innerHTML = "";
  const rowHead = headingCreator();

  table.appendChild(rowHead);
  dataArray.sort(function (a, b) {
    if (a.symbol < b.symbol) {
      return -1;
    } else if (a.symbol > b.symbol) {
      return 1;
    } else {
      return 0;
    }
  });
  tableRowsCreator(dataArray);
}

function SortByPrice() {
  table.innerHTML = "";
  const rowHead = headingCreator();

  table.appendChild(rowHead);

  dataArray.sort(function (a, b) {
    return Number(a.price) - Number(b.price);
  });

  tableRowsCreator(dataArray);
}

function SortByDefault() {
  table.innerHTML = "";
  const rowHead = headingCreator();

  table.appendChild(rowHead);
  tableRowsCreator(defaultArr);
}

function headingCreator() {
  const rowHeading = document.createElement("tr");
  const symbHead = document.createElement("th");
  symbHead.textContent = "Symbol";
  const priceHeading = document.createElement("th");
  priceHeading.textContent = "Price";
  rowHeading.appendChild(symbHead);
  rowHeading.appendChild(priceHeading);
  return rowHeading;
}

function tableRowsCreator(arr) {
  arr.forEach(function (e) {
    const row = document.createElement("tr");
    const symbol = document.createElement("td");
    symbol.textContent = e.symbol;
    const price = document.createElement("td");
    price.textContent = e.price;
    row.appendChild(symbol);
    row.appendChild(price);
    console.log(e);
    table.appendChild(row);
  });
}
