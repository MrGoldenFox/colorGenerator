const list = document.getElementById("list-El");
const inputEl = document.getElementById("input-El");

let hex = "";

document.addEventListener("click", (e) => {
  if (e.target.dataset.color) {
    getColor(e.target);
  }

  if (e.target.id === "btn-El" && hex != '') {
    ChangePatterns(hex);
    list.style.display = "none";
  }

  if(e.target.id === "vektor"){
    showList();
  }
});

function ChangePatterns(newHex) {
  document.getElementById("pattern5").style.backgroundColor =
    document.getElementById("code4").textContent;
  document.getElementById("pattern4").style.backgroundColor =
    document.getElementById("code3").textContent;
  document.getElementById("pattern3").style.backgroundColor =
    document.getElementById("code2").textContent;
  document.getElementById("pattern2").style.backgroundColor =
    document.getElementById("code1").textContent;

  document.getElementById("code5").textContent =
    document.getElementById("code4").textContent;
  document.getElementById("code4").textContent =
    document.getElementById("code3").textContent;
  document.getElementById("code3").textContent =
    document.getElementById("code2").textContent;
  document.getElementById("code2").textContent =
    document.getElementById("code1").textContent;

  document.getElementById("code1").textContent = newHex;
  document.getElementById("pattern1").style.backgroundColor = newHex;
}

function getColor(color) {
  inputEl.value = color.textContent;
  document.getElementById("container").style.backgroundColor =
    color.dataset.color;
  hex = `${color.dataset.color}`;
}

function fetchColorData(hexCode) {
  return fetch(`https://www.thecolorapi.com/id?rgb=rgb(${hexCode})`)
    .then((res) => res.json())
    .then((data) => {
      return {
        name: data.name.value,
        hex: data.hex.value,
      };
    });
}

function addColorToList(colorName, colorHex) {
  let listItem = document.createElement("li");
  listItem.dataset.color = colorHex;
  listItem.textContent = colorName;
  list.appendChild(listItem);
}

function renderList() {
  for (let r = 0; r <= 255; r += 50) {
    for (let g = 0; g <= 255; g += 10) {
      for (let b = 0; b <= 255; b += 50) {
        let hexCode = `${r}, ${g}, ${b}`;
        fetchColorData(hexCode).then((colorData) => {
          if (colorData) {
            addColorToList(colorData.name, colorData.hex);
          }
        });
      }
    }
  }
}

function showList() {
  if(list.style.display == "block"){
    list.style.display = "none"
  }
  else{
    list.style.display = "block";
  }
}

renderList();
