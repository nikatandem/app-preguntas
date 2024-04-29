let currentIndex = 0; // Variable para realizar seguimiento del índice de la pregunta actual

fetch('./data.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    return response.json();
  })
  .then((data) => {
    // Llama a la función pregunta y pasa los datos
    pregunta(data.questions);
  })
  .catch((err) => {
    console.error(err);
    // Manejar el error de carga del archivo JSON aquí
  });

const root = document.getElementById('root');

function pregunta(questions) {
  const form = document.createElement('form');
  const divQ = document.createElement('div');
  form.appendChild(divQ);
  root.appendChild(form);
  
  questions.forEach((question, index) => {
    const divPregunta = crearQuestion(question);
    divPregunta.style.display = index === currentIndex ? 'block' : 'none'; // Mostrar solo la pregunta actual
    divQ.appendChild(divPregunta);
  });

  const divBotones = document.createElement('div');
  divBotones.className = "botones";
  const btnAnterior = document.createElement('button');
  btnAnterior.textContent = "Anterior";
  btnAnterior.className = "prev btn-root"
  btnAnterior.addEventListener('click', mostrarAnterior);
  const btnSiguiente = document.createElement('button');
  btnSiguiente.textContent = "Siguiente";
  btnSiguiente.className = "next "
  btnSiguiente.addEventListener('click', mostrarSiguiente);
  divBotones.appendChild(btnAnterior);
  divBotones.appendChild(btnSiguiente);
  root.appendChild(divBotones);
}

function crearQuestion(question) {
  const inputRadio = `
    <p>${question.id}. ${question.question}</p>
    <img src="${question.img.url}" alt="${question.img.alt}"> <button class="hint" onclick="alert('${question.hint}')"><i class="bi bi-question-circle-fill"></i></button>
    <div>
      <label>${question.answer.a}</label>
      <input type='radio' value='a'>
    </div>
    <div>
      <label>${question.answer.b}</label>
      <input type='radio' value='b'>
    </div>
    <div>
      <label>${question.answer.c}</label>
      <input type='radio' value='c'>
    </div>
    <div>
      <label>${question.answer.d}</label>
      <input type='radio' value='d'>
    </div>
    <button class="send">Responder</button>
  `;
  const div = document.createElement('div');
  div.className = "pregunta";
  div.innerHTML = inputRadio;

  // Agregar evento de clic al botón "send"
  div.querySelector('.send').addEventListener('click', function() {
    const selectedAnswer = div.querySelector('input[type="radio"]:checked').value;
    checkAnswer(selectedAnswer, question);
  });

  return div;
}


function mostrarSiguiente() {
  const preguntas = document.querySelectorAll('.pregunta');
  preguntas[currentIndex].style.display = 'none'; // Ocultar la pregunta actual

  // Incrementar el índice y mostrar la siguiente pregunta
  currentIndex = (currentIndex + 1) % preguntas.length;
  preguntas[currentIndex].style.display = 'block';
}

function mostrarAnterior() {
  const preguntas = document.querySelectorAll('.pregunta');
  preguntas[currentIndex].style.display = 'none'; // Ocultar la pregunta actual

  // Decrementar el índice y mostrar la pregunta anterior
  currentIndex = (currentIndex - 1 + preguntas.length) % preguntas.length;
  preguntas[currentIndex].style.display = 'block';
}
