function toggleRW() {
    document.getElementById('rw-i').classList.toggle('fa-chevron-down')
    document.getElementById('rw-i').classList.toggle('fa-chevron-up')
    document.getElementById('rw-f').classList.toggle('fieldset-hidden')
    document.getElementById('rw-set').classList.toggle('settings-hidden')
}

function toggleMath() {
    document.getElementById('math-i').classList.toggle('fa-chevron-down')
    document.getElementById('math-i').classList.toggle('fa-chevron-up')
    document.getElementById('math-f').classList.toggle('fieldset-hidden')
    document.getElementById('math-set').classList.toggle('settings-hidden')
}

async function getData() {
    const response = await fetch('https://raw.githubusercontent.com/mdn522/sat-question-bank/refs/heads/main/data/cb-digital-questions.json')
    const data = await response.json()
    return data
}

function getRW(data) {
    console.log(data)
}

function getMath(data) {
    console.log(data)
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault()
        console.log(new FormData(e.target))
        if (document.getElementById('rw').checked && !document.getElementById('math').checked) {
            getData()
                .then(data => {
                    getRW(data)
                })
        } else if (!document.getElementById('rw').checked && document.getElementById('math').checked) {
            getData()
                .then(data => {
                    getMath(data)
                })
        } else if (document.getElementById('rw').checked && document.getElementById('math').checked) {
            getData()
                .then(data => {
                    getRW(data)
                    getMath(data)
                })
        } else if (!document.getElementById('rw').checked && !document.getElementById('math').checked) {
            alert('At least one module must be selected.')
        }
    })
})