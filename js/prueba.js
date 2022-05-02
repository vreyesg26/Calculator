const botones = document.querySelectorAll("button");
const resultado = document.getElementById("result");
resultado.value = 0

for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', function () {
        resultado.value += this.innerHTML;
    })
};