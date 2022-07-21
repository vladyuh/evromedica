//Remove animations on load
window.onload = function () {
    document.querySelector("body").classList.remove("perf-no-animation");
};

//Check webp support
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
    if (support === true) {
        document.querySelector("body").classList.add("webp");
    } else {
        document.querySelector("body").classList.add("no-webp");
    }
});

//100vh hack
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
window.addEventListener("resize", function () {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
});

//Browser-level image lazy-loading
if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll("img[loading=\"lazy\"]");
    for (var i = 0; i < images.length; i++) {
        images[i].src = images[i].dataset.src;
    }
}
else {
    const script = document.createElement("script");
    script.src = "js/lazysizes.min.js";
    document.body.appendChild(script);
}

function scrollTop() {
    if (window.pageYOffset > 0) {
        this.document.querySelector(".scroll-top").classList.add("is-active");
    }
    else {
        this.document.querySelector(".scroll-top").classList.remove("is-active");
    }
}

window.addEventListener("scroll", () => {

    //Scroll to top btn
    scrollTop();

});

//Scroll to top btn
scrollTop();
document.querySelector(".scroll-top").addEventListener("click", function (){
    window.scroll({top: 0, left: 0, behavior: "smooth"});
});

//Load scripts after page load
window.addEventListener("load", function () {

    if(document.querySelector(".splide")){
        var splide = document.createElement("script");
        splide.src = "js/splide.min.js";
        splide.onload = initSliders;
        document.body.appendChild(splide);
    }



    var select = document.createElement("script");
    select.src = "js/select.min.js";
    select.onload = function () {
        const selectCustom = new customSelect({
            selector: "select"
        });
        selectCustom.init();
    };
    document.body.appendChild(select);
});

function initSliders(){
    if(document.querySelector(".banner-block__slider")){
        new Splide( ".banner-block__slider", {
            type: "loop",
            perPage: 1,
            gap: 16,
            arrows: false,
        }).mount();
    }
}

function initMaska(){
    var maska = document.createElement("script");
    maska.src = "js/maska.js";
    maska.onload = function (){
        Maska.create("input[type=\"tel\"]", {
            mask: "+7 (###) ###-##-##"
        });
        window.removeEventListener("click", initMaska);
    };
    document.body.appendChild(maska);
}

window.addEventListener("click", initMaska);


var tabToggle = document.querySelectorAll(".tab-block__toggle");
var tabContent = document.querySelectorAll(".tab-block__content");
tabToggle.forEach(function (el){
    el.addEventListener("click", function (){

        var index = el.getAttribute("data-tab");

        tabToggle.forEach(function (em){
            em.classList.remove("is-active");
        });

        el.classList.add("is-active");

        tabContent.forEach(function (em){
            em.classList.remove("is-active");
        });

        tabContent[Number(index) - 1].classList.add("is-active");
    });
});


var pincode = document.querySelectorAll(".pincode input");
pincode.forEach(function (el){
    el.addEventListener("keydown", function (){
        el.value = "";
    });
    el.addEventListener("keyup", function (){
        var parent = el.parentElement;
        var val = el.value;
        var inputs = el.parentNode.querySelectorAll("input[type=\"number\"]");

        if(val === val.replace(/[0-9]/, "")) {
            el.value= "";
            return false;
        }

        el.nextElementSibling.focus();

        var fullval = "";
        inputs.forEach(function (elem){
            fullval = fullval + (parseInt(elem.value) || "0");
        });

        parent.querySelector("input[type=\"hidden\"]").value= fullval;

    });
});

var photo = document.querySelector(".register-block .form__field.photo input");
if(photo){
    photo.addEventListener("change",function (event){

        var parent = this.parentElement;
        var photo = parent.querySelector(".photo-placeholder");

        if(event.target.files[0]){
            photo.classList.add("uploaded");
            photo.style.backgroundImage = "url(" + URL.createObjectURL(event.target.files[0]) + ")";
        }
        else{
            photo.classList.remove("uploaded");
            photo.removeAttribute("style");
        }


    });
}

var serviceItem = document.querySelectorAll(".services-sections__item.has-submenu");
serviceItem.forEach(function (el){
    var arrow = document.createElement("div");
    arrow.classList.add("services-sections__toggle");
    arrow.addEventListener("click", function (){
        el.classList.toggle("is-active");
    });
    el.appendChild(arrow);
});

var readmore = document.querySelector(".services-description__readmore input[type=\"checkbox\"]");
if(readmore){
    readmore.addEventListener("change", function (){
        var label = this.parentElement;
        var parent = label.parentElement;
        label.classList.toggle("is-active");
        parent.querySelectorAll(".hidden").forEach(function (el){
            el.classList.toggle("visible");
        });
    });
}

var doctorToggle = document.querySelectorAll(".doctors-block--directions .text-toggle");
doctorToggle.forEach(function (el){
    el.addEventListener("click", function (){
        var text = el.parentElement;
        var parent = text.parentElement;
        parent.classList.toggle("is-active");
    });
});

var doctorItems = document.querySelectorAll(".doctors-block--all .doctors-block__item");
var doctorSearch = document.querySelector(".doctors-block__search input");
if (doctorSearch){
    doctorSearch.addEventListener("input", function (){
        var search_query = this.value;
        for (var i = 0; i < doctorItems.length; i++) {
            if (doctorItems[i].querySelector(".text-name").textContent.toLowerCase()
                .includes(search_query.toLowerCase())) {
                doctorItems[i].classList.remove("is-hidden");
            } else {
                doctorItems[i].classList.add("is-hidden");
            }
        }
    });
}

//open popup
var popupLink = document.querySelectorAll("a[data-popup]");
popupLink.forEach(function (element){
    element.addEventListener("click", function (e){
    });
});
//close popups
var popupClose = document.querySelectorAll(".popup__wrp");
popupClose.forEach(function (element){
    element.addEventListener("click", function (e){
        if(e.target !== e.currentTarget)
        {
            console.log("clicked on popup");
        }
        else{
            console.log("clicked on popup wrapper");
            window.location.href="#close";
        }
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js');
    });
}
