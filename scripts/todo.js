const addBtn = document.querySelector('.addToDo')
const input = document.querySelector('.inputToDo')
const list = document.querySelector('.listAll')
let todoCounter = 0

const save = () => {
    let fullList = document.querySelectorAll('li')
    fullList = Array.prototype.slice.call(fullList)
    let stringText = ""
    fullList.forEach(e => {
        if(e.textContent != "") {
        if(e.classList.contains('completes')) {
        stringText += e.textContent + "&com" + ","
        } else {
        stringText += e.textContent + ","}}
    });
    //console.log(stringText);
    localStorage.setItem("lista", stringText)
}

const addFromSave = (e) => {
    if(e != "") {
    let flag = false
    if(e.includes("&com")) {
        e = e.slice(0, -4)
        flag = true
    }
    let toDoDescription = e
    let newLi = document.createElement('li')
    let newText = document.createElement('a')
    newText.textContent = toDoDescription
    newLi.appendChild(newText)
    let btnComplete = document.createElement('div')
    let btnTrash = document.createElement('div')
    let btnEdit = document.createElement('div')
    btnComplete.innerHTML = '<button class="but complete"><i class="fas fa-check"></i></button>'
    btnTrash.innerHTML = '<button class="but trash"><i class="fas fa-trash"></i></button>'
    btnEdit.innerHTML = '<button class="but edit"><i class="fas fa-edit"></i></button>'
    newLi.appendChild(btnComplete)
    newLi.appendChild(btnTrash)
    newLi.appendChild(btnEdit)
    list.appendChild(newLi)
    if(flag==true) {
        newLi.classList.add('completes')
    }
    todoCounter++;
    document.querySelector('.number').textContent = todoCounter
    save()}
}

if (localStorage.getItem("lista") === null) {
    localStorage.setItem("lista", "")
} 
    let listFromSave = localStorage.getItem("lista")
    listFromSave = listFromSave.split(',')
    listFromSave.forEach(e => {
        addFromSave(e)
})


const addToDo = () => {
    let toDoDescription = input.value 
    let newLi = document.createElement('li')
    let newText = document.createElement('a')
    newText.textContent = toDoDescription
    newLi.appendChild(newText)
    let btnComplete = document.createElement('div')
    let btnTrash = document.createElement('div')
    let btnEdit = document.createElement('div')
    btnComplete.innerHTML = '<button class="but complete"><i class="fas fa-check"></i></button>'
    btnTrash.innerHTML = '<button class="but trash"><i class="fas fa-trash"></i></button>'
    btnEdit.innerHTML = '<button class="but edit"><i class="fas fa-edit"></i></button>'
    newLi.appendChild(btnComplete)
    newLi.appendChild(btnTrash)
    newLi.appendChild(btnEdit)
    list.appendChild(newLi)
    todoCounter++;
    document.querySelector('.number').textContent = todoCounter
    save()
}

addBtn.addEventListener('click', () => {
    if(input.value != "") {
    addToDo()}
})

input.addEventListener('keyup', (e) => {
    if(e.keyCode == 13) {
        addToDo()
    }
})
 
let actText

const editElement = (e) => {
    actText = e.target.closest('li').textContent
    actLi = e.target.closest('li')
    document.querySelector('.editForm').style.display = "block"
    document.querySelector('.changeForm').value = actText
}

list.addEventListener('click', (e) => {
    if(e.target.closest('button').classList.contains('trash')) {
        e.target.closest('li').remove()
        todoCounter--;
        document.querySelector('.number').textContent = todoCounter
        save()
    } else if(e.target.closest('button').classList.contains('edit')) {
        editElement(e)
    } else if(e.target.closest('button').classList.contains('complete')) {
        e.target.closest('li').classList.toggle('completes')
        save()
    }
})

const changeSave = document.querySelector('.changeSave')
changeSave.addEventListener('click', () => {
    actLi.textContent = document.querySelector('.changeForm').value
    document.querySelector('.editForm').style.display = "none"
    save()
    location.reload()
})