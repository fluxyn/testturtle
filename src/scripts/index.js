// ---------- CHATGPT ----------
function* range(min, max) {
    for (let i = min; i <= max; i++) yield i;
}
function getRandomBalancedSplitCombo(ranges, target) {
    // Step 1: Find all valid combinations
    const validCombos = [];
    for (let a of range(...ranges[0])) {
        for (let b of range(...ranges[1])) {
            for (let c of range(...ranges[2])) {
                for (let d of range(...ranges[3])) {
                    if (a + b + c + d === target) {
                        validCombos.push([a, b, c, d]);
                    }
                }
            }
        }
    }

    if (validCombos.length === 0) {
        throw new Error("No valid combinations found for target sum.");
    }

    // Step 2: Pick one at random
    const combo = validCombos[Math.floor(Math.random() * validCombos.length)];

    // Step 3: Split each number into two parts so both halves sum to target/2
    const split = [];
    const halfTarget = target / 2;
    let runningSum = 0;

    for (let i = 0; i < combo.length; i++) {
        const num = combo[i];

        if (i === combo.length - 1) {
            let part1 = halfTarget - runningSum;

            // Clamp to valid range [0, num]
            part1 = Math.max(0, Math.min(num, Math.round(part1)));
            const part2 = num - part1;
            split.push([part1, part2]);
        } else {
            const min = Math.max(0, Math.floor(num / 2) - 1);
            const max = Math.min(num, Math.ceil(num / 2) + 1);
            const part1 = getRandomInt(min, max);
            const part2 = num - part1;
            split.push([part1, part2]);
            runningSum += part1;
        }
    }

    return split;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = getRandomInt(0, i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function distributeByPercentages(total, percentages) {
    // Step 1: Multiply total by each decimal and floor the result
    let rawValues = percentages.map(p => p * total);
    let roundedValues = rawValues.map(Math.floor);

    // Step 2: Calculate how much is left to reach the total
    let currentSum = roundedValues.reduce((a, b) => a + b, 0);
    let remainder = total - currentSum;

    // Step 3: Distribute the remainder based on largest decimal remainders
    let decimalParts = rawValues.map((val, i) => ({
        index: i,
        fraction: val - Math.floor(val)
    }));

    decimalParts.sort((a, b) => b.fraction - a.fraction);

    for (let i = 0; i < remainder; i++) {
        roundedValues[decimalParts[i].index]++;
    }

    return roundedValues;
}
// ---------- CHATGPT ----------

const module1Distributions = [0.07, 0.74, 0.19]
const module2EasyDistributions = [0.26, 0.7, 0.04]
const module2HardDistributions = [0.04, 0.63, 0.33]
const rwQuestionRanges = [
    [13, 15], // Craft and Structure
    [12, 14], // Information and Ideas
    [11, 15], // Standard English Conventions
    [8, 12]   // Expression of Ideas
]
const mathQuestionRanges = [
    [13, 15], // Algebra
    [13, 15], // Advanced Math
    [5, 7],   // Problem-Solving and Data Analysis
    [5, 7]    // Geometry and Trigonometry
]

const difficultyMap = ['E', 'M', 'H']
const domainMapRW = ['CAS', 'INI', 'SEC', 'EOI']

async function getData() {
    const response = await fetch('https://raw.githubusercontent.com/mdn522/sat-question-bank/refs/heads/main/data/cb-digital-questions.json')
    const data = await response.json()
    return data
}

function getRW(data) {
    const questionAmounts = getRandomBalancedSplitCombo(rwQuestionRanges, 54)
    localStorage.setItem('rw-questionAmounts', JSON.stringify(questionAmounts))

    let questions = []
    
    const d = shuffle(Object.entries(data))
    for (let domain = 0; domain < 4; domain++) {
        distributeByPercentages(questionAmounts[domain][0], module1Distributions).forEach((qNum, diff) => {
            for (let i = 0; i < qNum; i++) {
                let x = 0
                while (d[x][1]['primary_class_cd'] != domainMapRW[domain] || d[x][1]['difficulty'] != difficultyMap[diff] || questions.includes(d[x][0])) {
                    x++
                }
                questions.push(d[x][1])
            }
        })
    }

    localStorage.setItem('rw0', JSON.stringify(questions))
}

function getMath(data) {
    const questionAmounts = getRandomBalancedSplitCombo(mathQuestionRanges, 44)
    localStorage.setItem('math-questionAmounts', JSON.stringify(questionAmounts))

    const questionAmountsShuffled = shuffle(
        Array(questionAmounts[0][0]).fill('H').concat(
        Array(questionAmounts[1][0]).fill('P'),
        Array(questionAmounts[2][0]).fill('Q'),
        Array(questionAmounts[3][0]).fill('S'))
    )

    /*
    fillInType = 1
        16 mcq, 6 spr
    fillInType = 0
        17 mcq, 5 spr
    */
    const fillInType = getRandomInt(0, 1)
    localStorage.setItem('math-fillInType', fillInType)
    
    let fillIns = []
    if (fillInType) {
        fillIns = shuffle(Array(16).fill('mcq').concat(Array(6).fill('spr')))
    } else {
        fillIns = shuffle(Array(17).fill('mcq').concat(Array(5).fill('spr')))
    }

    let questions = []

    const distributions = distributeByPercentages(22, module1Distributions)
    const d = shuffle(Object.entries(data))
    fillIns.forEach((ansType, i) => {
        let diff
        if (i < distributions[0]) {
            diff = 'E'
        } else if (i < (distributions[0] + distributions[1])) {
            diff = 'M'
        } else if (i < (distributions[0] + distributions[1] + distributions[2])) {
            diff ='H'
        }
        
        let x = 0
        while (d[x][1]['primary_class_cd'] != questionAmountsShuffled[i] || d[x][1]['difficulty'] != diff || d[x][1]['content']['type'] != ansType || questions.includes(d[x][0])) {
            x++
        }
        questions.push(d[x][1])
    })

    localStorage.setItem('math0', JSON.stringify(questions))
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault()
        localStorage.clear()

        localStorage.setItem('name', document.getElementById('name').value)

        if (document.getElementById('rw').checked && !document.getElementById('math').checked) {
            getData()
                .then(data => {
                    getRW(data)
                    localStorage.setItem('start-time', Date.now())
                    window.location.href = '/test?section=rw&module=0&q=0'
                })
        } else if (!document.getElementById('rw').checked && document.getElementById('math').checked) {
            getData()
                .then(data => {
                    getMath(data)
                    localStorage.setItem('start-time', Date.now())
                    window.location.href = '/test?section=math&module=0&q=0'
                })
        } else if (document.getElementById('rw').checked && document.getElementById('math').checked) {
            getData()
                .then(data => {
                    getRW(data)
                    getMath(data)
                    localStorage.setItem('start-time', Date.now())
                    window.location.href = '/test?section=rw&module=0&q=0'
                })
        } else if (!document.getElementById('rw').checked && !document.getElementById('math').checked) {
            alert('At least one module must be selected.')
        }
    })
})