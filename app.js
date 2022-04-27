const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const sliderText = document.getElementById('slidertext');
const slider = document.getElementById('slider');
const newColorHex = document.getElementById('newColorHex');

hexInput.addEventListener('keyup', () => {
    const hex = hexInput.value;
    if(!isValidHex(hex)) return;

    const strippedHex = hex.replace('#', '');
    inputColor.style.backgroundColor = "#" + strippedHex;
})


const isValidHex = (hex) => {
    if(!hex) return false;

    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}

const convertHexToRgb = (hex) => {
    if(!isValidHex(hex)) return null;

    let strippedHex = hex.replace('#', '');

    if(strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2]
    }

    const r = parseInt(strippedHex.substring(0,2), 16);
    const g = parseInt(strippedHex.substring(2,4), 16);
    const b = parseInt(strippedHex.substring(4,6), 16);

    return {r,g,b}
}

const convertRgbToHex = (r,g,b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);

    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
}


// function range() {
//     const slidertext = document.getElementById('slidertext');
//     const slider = document.getElementById('slider');
//     slidertext.innerHTML = slider.value + "%";
// }




const alterColor = (hex, percentage) => {
    const {r, g, b} = convertHexToRgb(hex);

    const amount = Math.floor((percentage/100) * 255);

    const newR = increase(r, amount);
    const newG = increase(g, amount);
    const newB = increase(b, amount);
    return convertRgbToHex(newR, newG, newB);
}

const increase = (hex, amount) => {
    const newHex = hex + amount;
    if(newHex > 255) return 255;
    if(newHex < 0) return 0;
    return newHex;
}

slider.addEventListener('input', () => {
    if(!isValidHex(hexInput.value)) return;

    sliderText.textContent = `${slider.value}%`;
    
    const alteredHex = alterColor(hexInput.value, slider.value);
    alteredColor.style.backgroundColor = alteredHex;
    newColorHex.innerText = `${alteredHex}`;
})