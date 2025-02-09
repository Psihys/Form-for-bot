const answer = document.getElementById('answer');
const button = document.querySelector('button');

button.addEventListener('click', (e) => {
    e.preventDefault();
    let text = answer.value;
    if(text === '') {
        alert('Введіть текст');
    } else if (text !== 'Орел'){
        alert('Неправильна відповідь, спробуй ще!');
    }
    else {
        alert('Правильна відповідь, молодець!');
    }

    answer.value = '';
});