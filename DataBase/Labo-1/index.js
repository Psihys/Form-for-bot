const checkButton = document.querySelector('.check')
const createButton = document.querySelector('.create')
const editButton = document.querySelector('.editing')
const deleteButton = document.querySelector('.delete')
const saveButton = document.querySelector('.save')

const form = document.querySelector('.create-form')
const submitButton = document.getElementById('submit-button')

const getAllItems = () => {
  const items = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.startsWith('record_')) {
      const item = JSON.parse(localStorage.getItem(key))
      items.push(item)
    }
  }

  return items
}
const displayItems = () => {
  form.classList.add('is-hidden')
  const items = getAllItems()
  const listContainer = document.querySelector('.container-list')
  listContainer.querySelectorAll('li').forEach((li) => li.remove())

  if (items.length === 0) {
    listContainer.innerHTML = '<p>Немає записів.</p>'
    return
  }

  items.forEach((item) => {
    const li = document.createElement('li')
    li.classList.add('item')

    const numberP = document.createElement('p')
    numberP.classList.add('number')
    numberP.textContent = `Номер запису: ${item.number}`

    const nameP = document.createElement('p')
    nameP.classList.add('name')
    nameP.textContent = `Назва запису: ${item.name}`

    const countP = document.createElement('p')
    countP.classList.add('count')
    countP.textContent = `Кількість: ${item.count}`

    const unitP = document.createElement('p')
    unitP.classList.add('unit')
    unitP.textContent = `Одиниця вимірювання: ${item.unit}`

    li.appendChild(numberP)
    li.appendChild(nameP)
    li.appendChild(countP)
    li.appendChild(unitP)

    listContainer.appendChild(li)
  })
}

const handleCreate = (e) => {
  e.preventDefault()
  const number = document.getElementById('number').value.trim()

  if (!number) {
    alert('Number is required')
    return
  }

  const existingRecord = localStorage.getItem(`record_${number}`)
  if (existingRecord) {
    const confirmOverwrite = confirm(
      'Запис з таким номером вже існує. Бажаєте перезаписати?'
    )
    if (!confirmOverwrite) {
      return
    }
  }

  const formData = {
    number: number,
    name: document.getElementById('name').value.trim(),
    count: document.getElementById('count').value.trim(),
    unit: document.getElementById('unit').value.trim(),
  }

  localStorage.setItem(`record_${number}`, JSON.stringify(formData))
  alert('Запис додано успішно')
  form.reset()
  displayItems()
}

const createItem = () => {
  form.classList.remove('is-hidden')
  document.getElementById('number').disabled = false
  const listContainer = document.querySelector('.container-list')
  listContainer.querySelectorAll('li').forEach((li) => li.remove())

  submitButton.removeEventListener('click', handleCreate)
  submitButton.addEventListener('click', handleCreate)
}

const findItem = () => {
  form.classList.remove('is-hidden')
  const listContainer = document.querySelector('.container-list')
  listContainer.querySelectorAll('li').forEach((li) => li.remove())
  document.querySelectorAll('label').forEach((label, index) => {
    if (index !== 0) {
      label.classList.add('is-hidden')
    }
  })
  document.getElementById('name').classList.add('is-hidden')
  document.getElementById('count').classList.add('is-hidden')
  document.getElementById('unit').classList.add('is-hidden')

  submitButton.textContent = 'Перевірити'
  submitButton.removeEventListener('click', editItem)
  submitButton.addEventListener('click', handleCheck)
}

const handleCheck = (e) => {
  e.preventDefault()
  const number = document.getElementById('number').value.trim()

  if (!number) {
    alert('Number is required')
    return
  }

  const existingRecord = localStorage.getItem(`record_${number}`)

  if (!existingRecord) {
    alert('Record not found')
    return
  }

  const parsedRecord = JSON.parse(existingRecord)

  document.querySelectorAll('label').forEach((label, index) => {
    if (index !== 0) {
      label.classList.remove('is-hidden')
    }
  })
  document.getElementById('name').classList.remove('is-hidden')
  document.getElementById('count').classList.remove('is-hidden')
  document.getElementById('unit').classList.remove('is-hidden')

  document.getElementById('number').value = parsedRecord.number
  document.getElementById('name').value = parsedRecord.name
  document.getElementById('count').value = parsedRecord.count
  document.getElementById('unit').value = parsedRecord.unit
  document.getElementById('number').disabled = true

  submitButton.textContent = 'Редагувати'
  submitButton.removeEventListener('click', handleCheck)
  submitButton.addEventListener('click', () => editItem(parsedRecord))
}

const editItem = (existingRecord) => {
  const number = document.getElementById('number').value.trim()

  const formData = {
    number: number,
    name: document.getElementById('name').value.trim(),
    count: document.getElementById('count').value.trim(),
    unit: document.getElementById('unit').value.trim(),
  }

  localStorage.setItem(`record_${number}`, JSON.stringify(formData))
  alert('Запис оновлено успішно')
  form.reset()
  
}

const deleteItem = () => {
  form.classList.remove('is-hidden')
  const listContainer = document.querySelector('.container-list')
  listContainer.querySelectorAll('li').forEach((li) => li.remove())
  document.querySelectorAll('label').forEach((label, index) => {
    if (index !== 0) {
      label.classList.add('is-hidden')
    }
  })
  document.getElementById('name').classList.add('is-hidden')
  document.getElementById('count').classList.add('is-hidden')
  document.getElementById('unit').classList.add('is-hidden')

  submitButton.textContent = 'Delete item'
  submitButton.removeEventListener('click', handleDeleteItem);
  submitButton.addEventListener('click', handleDeleteItem);
}

const handleDeleteItem = (e) => {
  e.preventDefault()
  
  const number = document.getElementById('number').value.trim()
  if (!number) {
    alert('Number is required')
    return
  }

  const existingRecord = localStorage.getItem(`record_${number}`)

  if (!existingRecord) {
    alert('Record not found')
    return
  } else{
    localStorage.removeItem(`record_${number}`)
    alert('Запис видалено успішно')
    form.reset()
  }

  
}

editButton.addEventListener('click', findItem)
createButton.addEventListener('click', createItem)
deleteButton.addEventListener('click', deleteItem)
checkButton.addEventListener('click', displayItems)


const saveToFile = () => {
  const items = getAllItems(); 
  if (items.length === 0) {
      alert('Немає записів для збереження');
      return;
  }

  let fileContent = '';

  items.forEach(item => {
      fileContent += `Номер запису: ${item.number}\n`;
      fileContent += `Назва запису: ${item.name}\n`;
      fileContent += `Кількість: ${item.count}\n`;
      fileContent += `Одиниця вимірювання: ${item.unit}\n`;
      fileContent += '------------------------\n';
  });

  const blob = new Blob([fileContent], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'records.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};


saveButton.addEventListener('click', saveToFile);
