// ---------- CHATGPT ----------
function* range(min, max) {
    for (let i = min; i <= max; i++) yield i;
}
function generateAllValidCombinations(ranges, target) {
    const results = [];

    for (let a of range(...ranges[0])) {
        for (let b of range(...ranges[1])) {
            for (let c of range(...ranges[2])) {
                for (let d of range(...ranges[3])) {
                    if (a + b + c + d === target) {
                        results.push([a, b, c, d]);
                    }
                }
            }
        }
    }

    return results;
}
function getRandomValidCombination(ranges, target) {
    const valid = generateAllValidCombinations(ranges, target);
    if (valid.length === 0) {
        throw new Error("No valid combinations found.");
    }
    const randomIndex = Math.floor(Math.random() * valid.length);
    return valid[randomIndex];
}
// ---------- CHATGPT ----------

async function getData() {
    const response = await fetch('https://raw.githubusercontent.com/mdn522/sat-question-bank/refs/heads/main/data/cb-digital-questions.json')
    const data = await response.json()
    return data
}

function getRW(data) {
    const questionAmounts = getRandomValidCombination([
        [13, 15], // Craft and Structure
        [12, 14], // Information and Ideas
        [11, 15], // Standard English Conventions
        [8, 12]  // Expression of Ideas
    ], 54)
    console.log(questionAmounts)
}

function getMath(data) {
    const questionAmounts = getRandomValidCombination([
        [13, 15], // Algebra
        [13, 15], // Advanced Math
        [5, 7], // Problem-Solving and Data Analysis
        [5, 7]  // Geometry and Trigonometry
    ], 44)
    console.log(questionAmounts)
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(document.getElementById('form'))
        
        if (formData.get('rw') == 'on' && formData.get('math') == 'off') {
            getData()
                .then(data => {
                    getRW(data)
                })
        } else if (formData.get('rw') == 'off' && formData.get('math') == 'on') {
            getData()
                .then(data => {
                    getMath(data)
                })
        } else if (formData.get('rw') == 'on' && formData.get('math') == 'on') {
            getData()
                .then(data => {
                    getRW(data)
                    getMath(data)
                })
        } else if (formData.get('rw') == 'off' && formData.get('math') == 'off') {
            alert('At least one module must be selected.')
        }
    })
})