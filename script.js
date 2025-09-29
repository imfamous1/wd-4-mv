let ptd_header = document.getElementsByClassName("header")[0];
let ptd_logo = document.getElementById("sutd");
let ptd_button = document.querySelector(".btn");

// ptd_header.textContent = "ПРОМТЕХДИЗАЙН Санкт-Петербургский государственный университет промышленных технологий и дизайна"
// ptd_header.innerHTML = "ПРОМТЕХДИЗАЙН<br>Санкт-Петербургский государственный университет промышленных технологий и дизайна"

// ptd_logo.setAttribute('src', 'https://sutd.ru/images/news/snospbguptd.jpg');
// ptd_logo.src = 'https://sutd.ru/images/news/snospbguptd.jpg';
ptd_logo.setAttribute('my_attr', 1234);

ptd_header.style.color = "red";
ptd_header.style.fontFamily = "Tahoma";
ptd_header.style.fontSize = "24px";

// font-family, font-size, backgroud-image, background-color

let new_header = document.createElement("h2");
new_header.textContent = "Санкт-Петербургский государственный университет промышленных технологий и дизайна"
document.body.appendChild(new_header);

// ptd_button.remove();

ptd_button.addEventListener('click', () => {
    alert("Поздравляем!");
})