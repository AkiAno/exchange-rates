let currencies = ["EUR", "USD", "GBP", "AUD", "CAD", "JPY"];

let rate = document.getElementById("rate");

let rates = {};
let ascending = true;

for (let i = 0; i < currencies.length; i++) {
  let option = document.createElement("option");
  // console.log("workings");
  option.innerHTML = currencies[i];
  option.setAttribute("value", currencies[i]);
  rate.appendChild(option);
}

let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", () => {
  let rate = document.getElementById("rate");
  let date = document.querySelector(".datepicker");
  console.log(rate.value);
  console.log(date.value);
  fetch("https://api.exchangeratesapi.io/" + date.value + "?base=" + rate.value)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      rates = data["rates"];
      display();
    });
});

function display() {
  let result = document.getElementById("rate-result");
  result.innerHTML = "";
  result.innerHTML = `<table id="rate-result">
                        <tr>
                            <th class="currency" onclick="sort()">Currency &#8645</th>
                            <th>Buy</th>
                            <th>Sell</th>
                        </tr>
                      </table>`;
  for (let cur_rate in rates) {
    let buy = Object(rates[cur_rate] - rates[cur_rate] * 0.05).toFixed(5);
    let sell = Object(rates[cur_rate] + rates[cur_rate] * 0.05).toFixed(5);

    result.innerHTML += `
                            <tr>
                                <td>${cur_rate}
                                </td>
                                <td class='buy'>${buy}
                                </td>
                                <td class='sell'>${sell}
                                </td>
                            </tr>
                `;
  }
}

function sort() {
  let arr = [];
  for (let i in rates) {
    arr.push([i, rates[i]]);
  }
  if (ascending) {
    arr.sort();
    ascending = false;
    console.log("working");
    console.log(arr);
  } else {
    arr.sort();
    arr.reverse();
    ascending = true;
  }
  rates = {};
  for (let i = 0; i < arr.length; i++) {
    rates[arr[i][0]] = arr[i][1];
  }
  display();
}
