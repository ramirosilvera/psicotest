const questions = [
    {
        question: "¿Tu pareja controla tu forma de vestir o con quién pasas tiempo?",
        options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: "¿Te sientes menospreciado/a o insultado/a por tu pareja?",
        options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: "¿Tu pareja te hace sentir culpable por cosas que no son tu responsabilidad?",
        options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: "¿Te sientes inseguro/a o con miedo de expresar tus opiniones?",
        options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: "¿Tu pareja te ha amenazado o intimidado de alguna manera?",
        options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"],
        scores: [0, 25, 50, 75, 100]
    }
];

const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const messageDisplay = document.getElementById("message");
const jokeDisplay = document.getElementById("joke");
const whatsappLink = document.getElementById("whatsappLink");

// Generar preguntas dinámicamente
questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const label = document.createElement("label");
    label.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(label);

    const select = document.createElement("select");
    select.id = `q${index}`;
    q.options.forEach((option, i) => {
        const optionElement = document.createElement("option");
        optionElement.value = q.scores[i];
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
    questionDiv.appendChild(select);

    quizContainer.appendChild(questionDiv);
});

// Calcular puntuación
submitButton.addEventListener("click", () => {
    let totalScore = 0;
    questions.forEach((q, index) => {
        const selectedOption = document.getElementById(`q${index}`).value;
        totalScore += parseInt(selectedOption);
    });

    const averageScore = totalScore / questions.length;
    scoreDisplay.textContent = averageScore.toFixed(0);

    let message = "";
    let joke = "";
    let whatsappMessage = "";

    if (averageScore < 20) {
        message = "¡Sos un verdadero soberano! 🎉 Tu relación es sana y equilibrada.";
        joke = "¿Sabías que el primo dice que sos tan sano que hasta los médicos te piden consejos? 😂";
        whatsappMessage = "¡Hola! Según el test, soy un verdadero soberano. ¿Qué tal si charlamos?";
    } else if (averageScore < 50) {
        message = "Hay algunas señales de alerta. 🚧 Presta atención a cómo te sientes.";
        joke = "El primo dice que sos como un semáforo: a veces en verde, a veces en amarillo. 🚦";
        whatsappMessage = "Hola, según el test, mi relación tiene algunas señales de alerta. ¿Me das algún consejo?";
    } else if (averageScore < 80) {
        message = "Sos un dominacho. 😬 Tu relación tiene aspectos tóxicos. Considera hablar con un profesional.";
        joke = "El primo dice que sos tan dominacho que hasta el Joker te tiene miedo. 🃏";
        whatsappMessage = "Hola, según el test, soy un dominacho. ¿Me ayudas a mejorar mi relación?";
    } else {
        message = "¡SOS UN DOMINACHO TOTAL! 🚨 Tu relación es muy tóxica. Busca ayuda lo antes posible.";
        joke = "El primo dice que sos tan tóxico que hasta Chernóbil te pide consejos. ☢️";
        whatsappMessage = "¡Urgente! Según el test, soy un dominacho total. ¿Podemos hablar?";
    }

    messageDisplay.textContent = message;
    jokeDisplay.textContent = joke;

    // Configurar el enlace de WhatsApp
    const phoneNumber = "1121726140";
    const encodedMessage = encodeURIComponent(whatsappMessage);
    whatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    resultContainer.classList.remove("hidden");
});
