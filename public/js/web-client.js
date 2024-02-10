
window.addEventListener("load",function (){

    console.log("working");

    displayPartialArticle();

    async function displayPartialArticle(){
        let articleContentObj = await fetch("/articleJson");
        let articleContentJson = await articleContentObj.json();
        // console.log( articleContentJson.article[0]);
        for (let i = 0; i < articleContentJson.article.length; i++) {
            const contentDiv = document.createElement("div");
            contentDiv.setAttribute("class" ,"articleContainer");
            contentDiv.setAttribute("id",`${articleContentJson.article[i].id}`);
            contentDiv.innerHTML = articleContentJson.article[i].content;
             contentDiv.addEventListener("click",pageChange);
            const articleBox = document.querySelector("#articles-inner");
            articleBox.appendChild(contentDiv);
        }
    }

function pageChange(){

        location.replace("/article");
}


    const dropButton = document.querySelector(".dropbtn");
    dropButton.addEventListener("click",myFunction);
    const likeButton = document.querySelector(".likes");
    likeButton.addEventListener("click",likesCount());
    function myFunction() {
        document.querySelector(".dropdown-content").classList.toggle("show");
    }
    function likesCount(){

    }
// Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            const dropdowns = document.querySelectorAll(".dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }

    }
});