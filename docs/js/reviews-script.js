const reviewPage = document.querySelector("#current");
let reviewList =[];
let counter = 1

window.onload
{
    displayButton();
}

function displayButton() {
    reviewPage.innerHTML = '';
    const button = document.querySelector("#template-button");
    const buttonItem = button.content.cloneNode(true);
    reviewPage.append(buttonItem);
}

function displayFilter() {
    reviewList = []
    let promise = new Promise(async function (resolve, reject) {
        reviewPage.innerHTML = '';
        const loaderTemplate = document.querySelector("#template-loader");
        const loaderItem = loaderTemplate.content.cloneNode(true);
        reviewPage.append(loaderItem);
        let review;
        for (let i = counter; i < counter + 10; i++) {
            await fetch(`https://jsonplaceholder.typicode.com/posts?id=${i}`)
                .then((response) => response.json())
                .then((data) => {
                    review = data;
                });
            if (review.length === 0) {
                reject("error");
            }
            reviewList.push(review)
        }
        resolve("result");
    });
    promise
        .then(
            result => {
                reviewPage.innerHTML = '';
                const button = document.querySelector("#template-button");
                const buttonItem = button.content.cloneNode(true);
                const buttonItem2 = buttonItem.querySelector(".display-review")
                reviewPage.append(buttonItem);
                reviewList.forEach(function (review){
                    const template = document.querySelector("#template-list");
                    const item = template.content.cloneNode(true);
                    const item2 = item.querySelector(".review-title");
                    item2.querySelector("#span-title").textContent = "• " + review[0].title;
                    const item3 = item.querySelector(".review-body");
                    item3.querySelector("#span-body").textContent =  review[0].body;
                    reviewPage.append(item2)
                    reviewPage.append(item3)
                })
                counter += 10
            },
            error => {
                displayFailureForm()
            }
        );

}


function displayFailureForm(){
    reviewPage.innerHTML = '';
    const form = document.querySelector("#template-error");
    const formItem = form.content.cloneNode(true);
    reviewPage.append(formItem);
}

