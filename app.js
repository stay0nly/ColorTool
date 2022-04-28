const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const sliderText = document.getElementById('slidertext');
const slider = document.getElementById('slider');
const newColorHex = document.getElementById('newColorHex');
const lightenText = document.getElementById('lightenText');
const toggleBtn = document.getElementById('toggleBtn');
const darkenText = document.getElementById('darkenText');

toggleBtn.addEventListener('click', () => {
    if(toggleBtn.classList.contains('toggled')) {
        toggleBtn.classList.remove('toggled');
        lightenText.classList.remove('unselected');
        darkenText.classList.add('unselected');
    } else {
        toggleBtn.classList.add('toggled');
        lightenText.classList.add('unselected');
        darkenText.classList.remove('unselected');
    }
    reset();
});

hexInput.addEventListener('keyup', () => {
    const hex = hexInput.value;
    if(!isValidHex(hex)) return;

    const strippedHex = hex.replace('#', '');
    inputColor.style.backgroundColor = "#" + strippedHex;
    reset();
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

    const valueSwitch = 
    toggleBtn.classList.contains('toggled') ? -slider.value : slider.value;
    
    const alteredHex = alterColor(hexInput.value, valueSwitch);
    alteredColor.style.backgroundColor = alteredHex;
    newColorHex.innerText = `${alteredHex}`;
});

const reset = () => {
    slider.value = 0;
    sliderText.innerText = '0%';
    alteredColor.style.backgroundColor = hexInput.value;
    newColorHex.innerText = `${hexInput.value}`;
}


