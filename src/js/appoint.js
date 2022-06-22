window.addEventListener("load", function (){

    var directions = document.querySelector(".appointment-block__directions");
    var serv = document.querySelector(".appointment-block__services");

    var serviceBlock = document.querySelector('.appointment-block__item--service');

    for(var i=0;i<services.length;i++){
        var direction = document.createElement("a");
        direction.classList.add("appointment-block__direction");
        direction.setAttribute("href","#service");
        direction.textContent = services[i].title;
        direction.setAttribute("data-id", services[i].id);

        var radi = document.createElement("input");
        radi.type = "radio";
        radi.value = services[i].title;
        radi.setAttribute("name","direction");
        radi.addEventListener('change', function (){
            console.log(this.value);
            document.querySelector('.appointment-block__item--service .caption').innerHTML = "<div class='caption-title'>" +
                this.value + "</div><div class='caption-desc'>Выберите услугу</div>";
        })
        direction.appendChild(radi);

        if(services[i].values.length !== 0){
            directions.appendChild(direction);
        }
    }

    document.addEventListener('click', function (e){
        if(e.target.classList.contains('appointment-block__direction')){
            serviceBlock.classList.remove('is-done');

            document.querySelector(".appointment-block__services").textContent = "";
            var _this = e.target;
            var index = _this.getAttribute("data-id");
            _this.querySelector('input[type="radio"]').click();
            var arr = services[index].values;
            for(var j=0;j<arr.length;j++){

                var ser = document.createElement("a");
                ser.setAttribute("href","#choose");
                ser.classList.add("appointment-block__service");
                ser.textContent = arr[j].title;

                var radio = document.createElement("input");
                radio.type = "radio";
                radio.value = arr[j].title;
                radio.setAttribute("name","service");
                radio.addEventListener('change', function (){
                    console.log(this.value);
                    document.querySelector('.appointment-block__item--service .caption-desc').textContent = this.value;
                })

                ser.addEventListener('click', function (){
                    this.querySelector('input[type="radio"]').click();
                    serviceBlock.classList.add('is-done');
                });

                ser.appendChild(radio);
                serv.appendChild(ser);
            }
        }
    })

    var doctorItem = document.querySelectorAll('.appointment-block__doctors .doctors-block__item');
    doctorItem.forEach(function (el){
        el.addEventListener('click', function (){
            el.querySelector('input').click();
        })
        el.querySelectorAll('input[type="radio"]').forEach(function (em){
            em.addEventListener('change', function (){
                document.querySelector('.appointment-block__item--doctor .caption').innerHTML = "<div class='caption-title'>" +
                    em.value + "</div><div class='caption-desc'>Выберите услугу</div>";
            })
        })
    })




});