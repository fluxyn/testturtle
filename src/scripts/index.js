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

function getRW(data, formData) {
    if ((+formData.get('rw-cas') + +formData.get('rw-iai') + +formData.get('rw-sec') + +formData.get('rw-eoi')) != 27) {
        alert('R&W Question Type Distribution must add up to 27.')
        return
    }
    if ((+formData.get('rw-m1e') + +formData.get('rw-m1m') + +formData.get('rw-m1h')) != 27) {
        alert('R&W Module 1 Difficulty Distribution must add up to 27.')
        return
    }
    if ((+formData.get('rw-em2e') + +formData.get('rw-em2m') + +formData.get('rw-em2h')) != 27) {
        alert('R&W Easy Module 2 Difficulty Distribution must add up to 27.')
        return
    }
    if ((+formData.get('rw-hm2e') + +formData.get('rw-hm2m') + +formData.get('rw-hm2h')) != 27) {
        alert('R&W Hard Module 2 Difficulty Distribution must add up to 27.')
        return
    }
}

function getMath(data, formData) {
    if ((+formData.get('math-alg') + +formData.get('math-am') + +formData.get('math-psda') + +formData.get('math-gat')) != 22) {
        alert('Math Question Type Distribution must add up to 22.')
        return
    }
    if ((+formData.get('math-m1e') + +formData.get('math-m1m') + +formData.get('math-m1h')) != 22) {
        alert('Math Module 1 Difficulty Distribution must add up to 22.')
        return
    }
    if ((+formData.get('math-em2e') + +formData.get('math-em2m') + +formData.get('math-em2h')) != 22) {
        alert('Math Easy Module 2 Difficulty Distribution must add up to 22.')
        return
    }
    if ((+formData.get('math-hm2e') + +formData.get('math-hm2m') + +formData.get('math-hm2h')) != 22) {
        alert('Math Hard Module 2 Difficulty Distribution must add up to 22.')
        return
    }
    if ((+formData.get('math-mcq') + +formData.get('math-spr')) != 22) {
        alert('Math MCQ and SPR Distribution must add up to 22.')
        return
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(document.getElementById('form'))
        
        if (formData.get('rw') == 'on' && formData.get('math') == 'off') {
            getData()
                .then(data => {
                    getRW(data, formData)
                })
        } else if (formData.get('rw') == 'off' && formData.get('math') == 'on') {
            getData()
                .then(data => {
                    getMath(data, formData)
                })
        } else if (formData.get('rw') == 'on' && formData.get('math') == 'on') {
            getData()
                .then(data => {
                    getRW(data, formData)
                    getMath(data, formData)
                })
        } else if (formData.get('rw') == 'off' && formData.get('math') == 'off') {
            alert('At least one module must be selected.')
        }
    })
})