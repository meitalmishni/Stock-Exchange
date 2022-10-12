const loader = document.getElementById('loader');

class StockExchange {
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
            this.data = await this.getStockExchangeData();
        }
    }

    async getStockExchangeData() {
        try {
            const url =
                "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" +
                this.symbol;

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

            //console.log("URL:", url);

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

        loader.classList.add("spinner-border");
        const results = await this.getStockExchange();
        loader.classList.remove("spinner-border");

        if (!results) return;

        const container = document.getElementById("stock-exchange-container");

        const stockExchangeObjects = [];
        results.forEach((item) => {
            const stockExchange = new StockExchange(item);
            stockExchangeObjects.push(stockExchange);
            const card = stockExchange.createStockExchangeCard();

            container.appendChild(card);
        });
    }
}

let movieSearcherInstance = null;
window.onload = () => {
    movieSearcherInstance = new StockExchangeSearcher();

};