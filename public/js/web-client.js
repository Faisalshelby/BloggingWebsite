window.addEventListener("load",function (){

    const dropButton = document.querySelector(".dropbtn");
    dropButton.addEventListener("click",myFunction);
    function myFunction() {
        document.querySelector(".dropdown-content").classList.toggle("show");
        console.log("DROP BUTTON");
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