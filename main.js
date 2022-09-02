// ====PSEUDO CODE====
// get the color input from the Dom
// get the inputEl and add event listener to get the value
// add eventlistener to the button
// on button click, fetch the selected color scheme from the API

let colorString = "";
const count = 5;

// ARRAY OF COLOR PANELS
let colorPanels = document.getElementsByClassName("color-panel");
let colorNames = document.getElementsByClassName("color-name");

// console.log(colorPicker)

document.getElementById("color-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const colorPicker = document.getElementById("color-picker").value;
  const selectScheme = document.getElementById("select-scheme").value;
  colorString = ` 
    https://www.thecolorapi.com/scheme?hex=${colorPicker.substring(
      1
    )}&mode=${selectScheme}&count=5
    `;
  getColors(colorString);
});

function getColors(colorString) {
  fetch(colorString)
    .then((res) => res.json())
    .then((data) => {
      render(data);
    });
}

function render(data) {
  Array.from(colorNames).map(
    (colorName, index) =>
      (colorName.textContent = data.colors[index].name.value)
  );

  Array.from(colorPanels).map((colorPanel, index) => {
    colorPanel.style.background = data.colors[index].name.closest_named_hex;

    // EVENT HANDLER FOR PANEL CLICK-TO-COPY
    colorPanel.addEventListener("click", () => {
      // document.execCommand("copy");
      colorPanel.style.background = "white";
      setTimeout(() => {
        colorPanel.style.background = data.colors[index].name.closest_named_hex;
      }, 100);

      //RENDER COLOR PANELS AGAIN
      let newScheme = document.getElementById("select-scheme").value;
      colorString = ` 
        https://www.thecolorapi.com/scheme?hex=${data.colors[
          index
        ].name.closest_named_hex.substring(1)}&mode=${newScheme}&count=5
        `;
      getColors(colorString); // Call getColors again (which calls render)
    });
    colorPanel.addEventListener("copy", (event) => {
      event.preventDefault();
      event.clipboardData.setData(
        "text/plain",
        data.colors[index].name.closest_named_hex
      );
    });
  });

  // MAKE BACKGROUND GRADIENT STRING
  bg = `
linear-gradient(to right,
    ${data.colors[0].name.closest_named_hex},
    ${data.colors[1].name.closest_named_hex},
    ${data.colors[2].name.closest_named_hex},
    ${data.colors[3].name.closest_named_hex},
    ${data.colors[4].name.closest_named_hex})
`;
  // document.body.style.background = bg
  // DEFAULT: linear-gradient(to right, #000, #888);
}
