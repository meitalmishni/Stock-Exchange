class Marquee {
    constructor(HTMLelement) {
        this.companyListURL = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list";
        this.HTMLelement = HTMLelement;
        this.getCompanyList(this.companyListURL);
    }

    async getCompanyList(url) {
        try {
            this.HTMLelement.style.visibility = "hidden";

            const response = await fetch(url);
            const result = await response.json();

            this.HTMLelement.style.visibility = "visible";

            const resultSlice = result.slice(0, 100);

            this.createMarqueeElement(resultSlice);
            //return result;
        } catch (error) {
            return false;
        }
    }

    async createMarqueeElement(list) {
        const companyList = await list;
        const marqueeUi = this.HTMLelement.querySelector("#marquee-content");

        companyList.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("marquee-tag");
            div.innerHTML = item.symbol + " $" + item.price;
            marqueeUi.append(div);
        });
    }

}