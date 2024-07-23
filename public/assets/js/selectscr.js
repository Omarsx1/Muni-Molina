document.addEventListener('DOMContentLoaded', () => {
    const selectBtn = document.getElementById('select-btn');
    const text = document.getElementById('text');
    const options = document.getElementsByClassName('option');
    const list = document.querySelector('.list');

    selectBtn.addEventListener('click', () => {
        selectBtn.classList.toggle('active');
        list.classList.toggle('active');
    });

    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener('click', function() {
            text.innerHTML = this.textContent;
            selectBtn.classList.remove('active');
            list.classList.remove('active');
        });
    }
});
