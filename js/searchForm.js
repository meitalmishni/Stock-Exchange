class SearchForm {
    constructor(searchFormElement) {
        this.searchFormElement = searchFormElement;
        this.searchType = "search";
        this.searchQuery = "";
        this.searchLimit = 10;
        this.searchExchange = 'NASDAQ';
        this.baseUrl = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";
        this.companies = [];
        this.createSearchBar();

    }

    createSearchBar() {
        const input = document.createElement("input");
        const button = document.createElement("button");

        input.classList.add("form-control");
        input.classList.add("me-2");
        input.setAttribute("id", "search-input");
        input.setAttribute("aria-label", "Search");
        input.setAttribute("placeholder", "Search");
        input.setAttribute("type", "search");

        button.classList.add("btn");
        button.classList.add("btn-outline-success");
        button.setAttribute("type", "submit");
        button.innerHTML = "Search";

        this.searchFormElement.append(input);
        this.searchFormElement.append(button);
    }

    async getSearchResult() {
        try {
            const url =
                this.baseUrl +
                this.searchType +
                "?query=" +
                encodeURIComponent(this.searchQuery) +
                "&limit=" +
                this.searchLimit +
                "&exchange=" +
                this.searchExchange;

            const response = await fetch(url);
            const results = await response.json();

            //console.log("Results:", results);

            return results;
        } catch (error) {
            return [];
        }
    }

    async runSearch(e) {
        this.searchQuery = this.searchFormElement.querySelector("#search-input").value;

        const container = document.getElementById("search-result");
        container.innerHTML = "";

        const loader = document.getElementById('loader');

        loader.classList.add("spinner-border");
        const results = await this.getSearchResult();

        this.callback(results);

        loader.classList.remove("spinner-border");

        //console.log(this.companies);

        // if (!results) return;

        // results.forEach((item) => {
        //     const stockExchange = new SearchResult(item);
        //     const card = stockExchange.createStockExchangeCard();

        //     container.appendChild(card);
        // });
    }

    onSearch(callback) {
        this.callback = callback;

        this.searchFormElement.addEventListener("submit", (e) => {
            e.preventDefault();

            this.runSearch();
        });
    }

}