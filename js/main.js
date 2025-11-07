const formElement = document.getElementsByClassName('myForm')[0];
// console.log(formElement);

formElement.addEventListener('submit', function(event) {
    event.preventDefault();

    console.log("Данные формы отправлены в консоль");
    console.log(formElement.username.value);
})


const example = "abc@";
const exampleRegex = /^\S+[a-zA-Z]/;

const isValid = exampleRegex.test(example);
console.log(isValid);

