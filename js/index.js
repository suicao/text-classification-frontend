const API = "http://13.58.206.114/clf"

const inputTextarea = document.getElementById("input")
const submitBtn = document.getElementById("submit-btn")
const resetBtn = document.getElementById("reset-btn")
const visualBox = document.getElementById("visual")
const resultBox = document.getElementById("result")

const submit = () => {
    const data = {
        data: inputTextarea.value || inputTextarea.placeholder
    }
    axios.post(
        API,
        data
    ).then(function (res) {
        visualize(res.data)
    })
        .catch(function (err) {
            console.log("error")
        });
}

const reset = () => {
    inputTextarea.value = ""
}
classNames = ['Chính trị xã hội', 'Đời sống', 'Khoa học', 'Kinh doanh', 'Pháp luật', 'Sức khỏe', 'Thế giới',
    'Thể thao', 'Văn hóa', 'Vi tính']
colors = ["#ffffff", "#ffe3af", "#ffc58a", "#ffa474", "#fa8266", "#ed645c", "#db4551", "#c52940", "#aa0e27", "#8b0000", "#8b0000"]
const visualize = (data) => {
    visualBox.innerHTML = ""
    const sent = data.sent
    const wordAttns = data.attns
    const wordColors = []
    for (let i = 0; i < wordAttns.length; i++) {
        wordColors.push(colors[parseInt(parseFloat(wordAttns[i]) * 10)])
    }
    for (let i = 0; i < sent.length; i++) {
        const wordDiv = document.createElement("div");
        wordDiv.style.backgroundColor = wordColors[i];
        if (colors.indexOf(wordColors[i]) >= colors.length / 3) {
            wordDiv.style.color = "#ffffff"
        }
        wordDiv.classList.add("word-container");
        wordDiv.innerText = sent[i]
        visualBox.appendChild(wordDiv);
    }

    resultBox.innerHTML = ""
    resultBox.innerText = classNames[parseInt(data.pred)] +
        " (" + Math.round(parseFloat(data.probs[parseInt(data.pred)]) * 10000) / 100 + "%)."
}
