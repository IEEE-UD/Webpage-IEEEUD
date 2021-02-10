document.addEventListener("DOMContentLoaded", loadScroll());

function loadScroll(){
    setTimeout(function(){
        let onloadScroll = document.getElementById("onloadScroll");
        let scrollM = document.getElementById("mouseScroll");
        scrollM.style.marginTop = "135%";
        scrollM.style.opacity = "0";
        onloadScroll.style.opacity = "0";
        scrollM.addEventListener("transitionend", function(){
            onloadScroll.style.zIndex = "-1";
        });
        clearInterval();
    }, 500);  
};

window.addEventListener("popstate",function(){
    let onloadScroll = document.getElementById("onloadScroll");
    let scrollM = document.getElementById("mouseScroll");
    scrollM.style.marginTop = "15%";
    scrollM.style.opacity = "100%";
    onloadScroll.style.zIndex = "10";
    onloadScroll.style.opacity = "50%";
    //onloadScroll.style.background = "none";
    setTimeout(function(){
        loadScroll();
        clearInterval();
    }, 200);
   
});
