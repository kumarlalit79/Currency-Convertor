const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const date = '2024-07-16'; // Update this to the desired date
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies`;

for(let select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currcode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change" , (evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let contryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${contryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const fetchJSON = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return await response.json();
  };


btn.addEventListener("click", async (evt) => {
    evt.preventDefault(); // Prevent page refresh on form submit
    
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) { // Set default value if empty or negative
      amtVal = 1;
      amount.value = "1";
    }
  
    try {
      const fromCurrencyCode = fromCurrency.value.toLowerCase();
      const toCurrencyCode = toCurrency.value.toLowerCase();
      const URL = `${BASE_URL}/${fromCurrencyCode}.json`;
      
      let data = await fetchJSON(URL);
      let rate = data[fromCurrencyCode][toCurrencyCode];
      
      let finalAmount = amtVal * rate;
      msg.innerText = `${amtVal} ${fromCurrency.value} = ${finalAmount.toFixed(2)} ${toCurrency.value}`;
    } catch (error) {
      console.error(error);
      msg.innerText = "Error fetching conversion rate.";
    }
  });


