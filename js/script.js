import { getStockExchangeData } from './company.js';
//import { Marquee } from './marquee.js';

// const loader = document.getElementById('loader');
const marqueeElement = document.getElementById("marquee");
const searchFormElement = document.getElementById("search-form");
const searchFormResultElement = document.getElementById("search-result");
// const container = document.getElementById("stock-exchange-container");


/*export class StockExchange {
    constructor(stockExchangeObject) {
        this.symbol = stockExchangeObject.symbol;
        this.name = stockExchangeObject.name;
        this.currency = stockExchangeObject.currency;
        this.stockExchange = stockExchangeObject.stockExchange;
        this.exchangeShortName = stockExchangeObject.exchangeShortName;
    }

    createStockExchangeCard() {
        const cardDiv = document.createElement("div");
        const cardA = document.createElement("a");

        cardA.setAttribute("href", "./company.html?symbol=" + this.symbol);
        cardA.setAttribute("target", "_blank");
        cardA.innerHTML = this.name + "(" + this.symbol + ")";

        cardDiv.classList.add("search-div");
        cardDiv.appendChild(cardA);

        cardDiv.addEventListener("click", () => {
            this.cardClicked();
        });

        return cardDiv;
    }

    async cardClicked() {
        console.log("cardClicked", this.name);

        if (!this.data) {
            console.log("Send request");
            this.data = await this.getStockExchangeData(this.symbol);
        }

    }

    async getStockExchangeData(symbol) {
        try {
            const url =
                "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" +
                symbol;

            const response = await fetch(url);
            const result = await response.json();

            console.log("Data Result:", result);

            return result;
        } catch (error) {
            return false;
        }
    }
}

class StockExchangeSearcher {
    constructor() {
        this.searchType = "search";
        this.searchQuery = "";
        this.searchLimit = 10;
        this.searchExchange = 'NASDAQ';

        const searchForm = document.getElementById("search-form");
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();

            this.runSearch();
        });
    }

    async getStockExchange() {
        try {
            const url =
                "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/" +
                this.searchType +
                "?query=" +
                encodeURIComponent(this.searchQuery) +
                "&limit=" +
                this.searchLimit +
                "&exchange=" +
                this.searchExchange;

            console.log("URL:", url);

            const response = await fetch(url);
            const results = await response.json();

            console.log("Results:", results);

            return results;
        } catch (error) {
            return [];
        }
    }

    async runSearch(e) {
        this.searchQuery = document.getElementById("search-input").value;

        const container = document.getElementById("stock-exchange-container");
        container.innerHTML = "";

        loader.classList.add("spinner-border");
        const results = await this.getStockExchange();
        loader.classList.remove("spinner-border");

        if (!results) return;

        const stockExchangeObjects = [];
        results.forEach((item) => {
            const stockExchange = new StockExchange(item);
            stockExchangeObjects.push(stockExchange);
            const card = stockExchange.createStockExchangeCard();

            container.appendChild(card);
        });
    }
}*/

/*let movieSearcherInstance = null;
window.onload = () => {
    movieSearcherInstance = new StockExchangeSearcher();
};*/


// async function getCompanyList() {
//     try {
//         const url = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list";
//         const response = await fetch(url);
//         const result = response.json();

//         return result;
//     } catch (error) {
//         return false;
//     }
// }

function createStockExchangeCard(name, symbol, image, percentage) {
    const cardDiv = document.createElement("div");
    const cardA = document.createElement("a");
    const cardImg = document.createElement("img");
    const cardSpan = document.createElement("span");

    cardA.setAttribute("href", "./company.html?symbol=" + symbol);
    cardA.setAttribute("target", "_blank");
    cardA.innerHTML = name + "(" + symbol + ")";

    cardImg.setAttribute("src", image);
    cardImg.classList.add("image-icone");

    cardSpan.innerHTML = "(" + percentage + ")";
    if (percentage > 0) {
        cardSpan.style.color = "#74AB8D";
    } else {
        cardSpan.style.color = "red";
    }

    cardDiv.classList.add("search-div");
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(cardA);
    cardDiv.appendChild(cardSpan);

    return cardDiv;
}

async function getStockExchange(searchType, searchQuery, searchLimit, searchExchange) {
    try {
        const url =
            "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/" +
            searchType +
            "?query=" +
            encodeURIComponent(searchQuery) +
            "&limit=" +
            searchLimit +
            "&exchange=" +
            searchExchange;

        const response = await fetch(url);
        const results = await response.json();

        console.log("Results:", results);

        return results;
    } catch (error) {
        return [];
    }
}


async function runSearch(e) {
    const searchQuery = document.getElementById("search-input").value;

    container.innerHTML = "";

    loader.classList.add("spinner-border");
    const results = await getStockExchange("search", searchQuery, 10, "NASDAQ");
    loader.classList.remove("spinner-border");

    if (!results) return;

    results.forEach(async (item) => {
        const details = await getStockExchangeData(item.symbol);
        const companyProfile = details.profile;
        console.log(companyProfile);

        const card = createStockExchangeCard(item.name, item.symbol, companyProfile.image, companyProfile.changesPercentage);
        container.appendChild(card);
    });
}

// window.onload = async () => {
//     const marquee = new Marquee(marquee);
//     marquee.load();

//     const form = new SearchForm(searchForm);
//     const results = new SearchResult(searchFormResult);

//     form.onSearch((companies) => {
//         console.log("companies", companies);
//         results.renderResults(companies);
//     });
// }
