const filter = document.querySelector('.filter')
filter.addEventListener('keyup', () => {
    let array = document.querySelectorAll('li')
    array = Array.prototype.slice.call(array);
    array.forEach((e) => {
        if(e.textContent.toLowerCase().includes(filter.value.toLowerCase())) {
            e.style.display = 'flex'
        } else {
            e.style.display = 'none'
        }
    })
})