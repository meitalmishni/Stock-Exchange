class Marquee {
    constructor(marqueeEelement) {
        this.marqueeEelement = marqueeEelement;
        //this.url = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list";
        //this.getCompanyList(this.url);
    }

    //async getCompanyList(url) {
    async load() {
        try {
            this.marqueeEelement.style.visibility = "hidden";

            const response = await fetch("https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list");
            const result = await response.json();

            this.marqueeEelement.style.visibility = "visible";

            const resultSlice = result.slice(0, 50);

            this.createMarqueeElement(resultSlice);
            //return result;
        } catch (error) {
            return false;
        }
    }

    async createMarqueeElement(list) {
        const companyList = await list;

        const divContent = document.createElement("div");
        divContent.classList.add("marquee-content");
        divContent.setAttribute("id", "marquee-content");

        companyList.forEach(item => {
            const divItem = document.createElement("div");
            divItem.classList.add("marquee-tag");
            divItem.innerHTML = item.symbol + " $" + item.price;
            divContent.append(divItem);
        });

        this.marqueeEelement.append(divContent);
    }

}