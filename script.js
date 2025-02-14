const questions = [
    {
        question: "¿Tu pareja se interesa por tus actividades y respeta tu espacio personal?",
        options: ["Siempre", "Frecuentemente", "A veces", "Rara vez", "Nunca"],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: "¿Te sientes cómodo/a compartiendo tus opiniones sin miedo a ser juzgado/a?",
        options: ["Siempre", "Frecuentemente", "A veces", "Rara vez", "Nunca"],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: "¿Tu pareja te apoya cuando pasas tiempo con amigos o familiares?",
        options: ["Siempre", "Frecuentemente", "A veces", "Rara vez", "Nunca"],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: "¿Te sientes valorado/a y respetado/a en tu relación?",
        options: ["Siempre", "Frecuentemente", "A veces", "Rara vez", "Nunca"],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: "¿Puedes tomar decisiones importantes sin sentir presión o culpa?",
        options: ["Siempre", "Frecuentemente", "A veces", "Rara vez", "Nunca"],
        scores: [0, 25, 50, 75, 100]
    }
];

const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const messageDisplay = document.getElementById("message");
const adviceDisplay = document.getElementById("advice");
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
    let advice = "";
    let whatsappMessage = "";

    if (averageScore < 20) {
        message = "Tu relación parece muy saludable. ¡Felicidades!";
        advice = "Sigue fomentando la comunicación y el respeto mutuo.";
        whatsappMessage = "Hola, según el test, mi relación es muy saludable. ¿Tienes algún consejo para mantenerla así?";
    } else if (averageScore < 50) {
        message = "Tu relación tiene aspectos positivos, pero hay áreas para mejorar.";
        advice = "Reflexiona sobre cómo te sientes y habla con tu pareja para fortalecer la relación.";
        whatsappMessage = "Hola, según el test, mi relación tiene áreas para mejorar. ¿Me das algún consejo?";
    } else if (averageScore < 80) {
        message = "Tu relación tiene algunas señales que podrían afectar tu bienestar.";
        advice = "Considera hablar con alguien de confianza o un especialista para reflexionar sobre tu relación.";
        whatsappMessage = "Hola, según el test, mi relación tiene algunas señales preocupantes. ¿Me ayudas?";
    } else {
        message = "Tu relación tiene aspectos que podrían ser dañinos para ti.";
        advice = "No estás solo/a. Busca apoyo de un especialista o una organización de confianza.";
        whatsappMessage = "¡Urgente! Según el test, mi relación tiene aspectos preocupantes. ¿Podemos hablar?";
    }

    messageDisplay.textContent = message;
    adviceDisplay.textContent = advice;

    // Configurar el enlace de WhatsApp
    const phoneNumber = "1121726140";
    const encodedMessage = encodeURIComponent(whatsappMessage);
    whatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    resultContainer.classList.remove("hidden");
});
