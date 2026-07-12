const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"


const dropdown = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

for(let select of dropdown) {
    for( currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name == "from" && currcode == "USD"){
            newoption.selected = "selected"
        }else if(select.name == "to" && currcode == "INR"){
            newoption.selected = "selected"
        }
        select.append(newoption)
    }
     
    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target)
    });
}

const updaterate = async () => {
        let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval == "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }

    // 1. Construct the URL for the BASE currency only
    const fromCurrency = fromcurr.value.toLowerCase();
    const toCurrency = tocurr.value.toLowerCase();
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;

    try {
        // 2. Fetch the data
        let response = await fetch(url);
        let data = await response.json();

        // 3. Access the rate from the object
        // The API returns an object where data[fromCurrency] contains all rates
        let rate = data[fromCurrency][toCurrency];

        let finalAmount = amtval * rate;
        msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value}`;
    } catch (error) {
        msg.innerText = "Error fetching exchange rates.";
        console.error(error);
    }
}

const updateFlag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc
}



btn.addEventListener("click",  (evt) => {
    evt.preventDefault();
    updaterate()
});

window.addEventListener("load", () => {
    updaterate()

})



