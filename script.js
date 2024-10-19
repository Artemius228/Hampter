let score = 0;
let clickValue = 1;
let autoClickerCost = 100;
let upgradeClickCost = 10;
let autoClickActive = false;


function updateScore() {
    document.getElementById("score").innerText = score;
}


document.getElementById("click-button").addEventListener("click", () => {
    score += clickValue;
    updateScore();
});


document.getElementById("upgrade-click").addEventListener("click", () => {
    if (score >= upgradeClickCost) {
        score -= upgradeClickCost;
        clickValue += 1;
        upgradeClickCost *= 1;
        updateScore();
    }
});

document.getElementById("auto-clicker").addEventListener("click", () => {
    if (score >= autoClickerCost && !autoClickActive) {
        score -= autoClickerCost;
        autoClickActive = true;
        setInterval(() => {
            score += clickValue;
            updateScore();
        }, 1000);
        updateScore();
    }
});


document.getElementById("save-button").addEventListener("click", () => {
    let saveData = {
        score: score,
        clickValue: clickValue,
        autoClickActive: autoClickActive
    };
    let json = JSON.stringify(saveData);
    download("progress.json", json);
});

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

document.getElementById("load-button").addEventListener("click", () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
            let content = readerEvent.target.result;
            let loadedData = JSON.parse(content);
            score = loadedData.score;
            clickValue = loadedData.clickValue;
            autoClickActive = loadedData.autoClickActive;
            updateScore();
        };
    };
    input.click();
});

