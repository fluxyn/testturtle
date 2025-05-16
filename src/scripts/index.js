async function getData() {
    const response = await fetch('https://raw.githubusercontent.com/mdn522/sat-question-bank/refs/heads/main/data/cb-digital-questions.json')
    const data = await response.json()
    return data
}

function getRW(data) {
    
}

function getMath(data) {
    
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