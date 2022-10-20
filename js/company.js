// import { StockExchange } from './script.js';

async function getStockExchangeHistory(symbol) {
    try {
        const url =
            "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/" +
            symbol + "?serietype = line";

        const response = await fetch(url);
        const result = response.json();

        return result;
    } catch (error) {
        return false;
    }
}

export async function getStockExchangeData(symbol) {
    try {
        const url =
            "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" +
            symbol;

        const response = await fetch(url);
        const result = response.json();

        return result;
    } catch (error) {
        return false;
    }
}

window.onload = async () => {
    const companyImg = document.getElementById("company-img");
    const companyName = document.getElementById("company-name");
    const companyPrice = document.getElementById("company-price");
    const companyPercentages = document.getElementById("company-percentages");
    const companyDetails = document.getElementById("company-details");

    const urlParams = new URLSearchParams(window.location.search);
    const symbolName = urlParams.get("symbol");

    const details = await getStockExchangeData(symbolName);
    const companyProfile = details.profile;
    console.log(companyProfile);

    companyImg.setAttribute("src", companyProfile.image);

    companyName.setAttribute("href", companyProfile.website);
    companyName.setAttribute("target", "_blank");
    companyName.innerHTML = companyProfile.companyName;

    companyPrice.innerHTML = "Stock price: " + companyProfile.price + "$";
    companyPercentages.innerHTML = "(" + parseFloat(companyProfile.changesPercentage).toFixed(2) + "%)";

    if (companyProfile.changesPercentage > 0) {
        companyPercentages.style.color = "#74AB8D";
    } else {
        companyPercentages.style.color = "red";
    }

    companyDetails.innerHTML = companyProfile.description;
    console.log("Data Result:", details.profile);

    const history = await getStockExchangeHistory("AAON");
    console.log("History Result:", history);

    const ctx = document.getElementById('myChart');
    const data = {
        datasets: [{
            label: 'Stock Price History',
            data: [{ x: "2022-01-01", y: 65 }, { x: "2022-02-01", y: 59 },
            { x: "2022-03-01", y: 40 }, { x: "2022-04-01", y: 47 },
            { x: "2022-05-01", y: 70 }, { x: "2022-06-01", y: 74 }],
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };
    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
    });
};



