function updateTime() {
    const time = new Date(Date.now() - localStorage.getItem('start-time'))
    document.getElementById('time').innerHTML = time.getMinutes() + ':' + (('0' + time.getSeconds()).slice(-2))
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(document.location.search)
    const question = JSON.parse(localStorage.getItem(params.get('section') + params.get('module')))[parseInt(params.get('q'))].content
    console.log(question)
        
    updateTime()
    document.getElementById('question').innerHTML = question.stem
    document.getElementById('question-number').innerHTML = parseInt(params.get('q')) + 1
    document.getElementById('name').innerHTML = localStorage.getItem('name')
    
    if (params.get('section') == 'rw') {
        document.getElementById('title').innerHTML = 'Section 1, Module ' + (parseInt(params.get('module')) + 1) + ': Reading and Writing'
        document.getElementById('rw-buttons').style.display = 'block'
        document.getElementById('left').style.display = 'block'
        document.getElementById('passage').style.display = 'block'
        document.getElementById('passage').innerHTML = question.stimulus
        document.getElementById('question-nav').innerHTML = 'Question ' + (parseInt(params.get('module')) + 1) + ' of 27 <i class="fa-solid fa-chevron-up"></i>'

        if (params.get('q') == '26') {
            document.getElementById('next').style.display = 'none'
        }
    } else if (params.get('section') == 'math') { 
        document.getElementById('title').innerHTML = 'Section 2, Module ' + (parseInt(params.get('module')) + 1) + ': Math'
        document.getElementById('math-buttons').style.display = 'block'
        document.getElementById('question-nav').innerHTML = 'Question ' + (parseInt(params.get('module')) + 1) + ' of 22 <i class="fa-solid fa-chevron-up"></i>'

        if (params.get('q') == '23') {
            document.getElementById('next').style.display = 'none'
        }
    }

    if (question.type == 'mcq') {
        document.getElementById('mcq').style.display = 'block'
        document.querySelector('label[for="option-a"]').innerHTML = question.answerOptions[0].content
        document.querySelector('label[for="option-b"]').innerHTML = question.answerOptions[1].content
        document.querySelector('label[for="option-c"]').innerHTML = question.answerOptions[2].content
        document.querySelector('label[for="option-d"]').innerHTML = question.answerOptions[3].content
    } else if (question.type == 'spr') {
        document.getElementById('left').style.display = 'block'
        document.getElementById('spr-directions').style.display = 'block'
        document.getElementById('spr').style.display = 'block'
    }
    
    if (params.get('q') == '0') {
        document.getElementById('back').style.display = 'none'
    }

    setInterval(updateTime, 1000)
})