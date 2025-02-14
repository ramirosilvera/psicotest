const questions = [
    {
        question: "¿Tu pareja revisa tu teléfono o redes sociales sin tu permiso?",
        options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: "¿Te hace sentir culpable por pasar tiempo con amigos o familiares?",
        options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: "¿Te critica o humilla en público o en privado?",
        options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: "¿Te ha amenazado con hacerte daño a ti o a alguien que quieres?",
        options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: "¿Te controla el dinero o te impide trabajar o estudiar?",
        options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"],
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
        message = "Tu relación parece saludable. ¡Sigue así!";
        advice = "Recuerda mantener una comunicación abierta y respetuosa.";
        whatsappMessage = "Hola, según el test, mi relación es saludable. ¿Tienes algún consejo para mantenerla así?";
    } else if (averageScore < 50) {
        message = "Hay algunas señales de alerta. Presta atención a cómo te sientes.";
        advice = "Reflexiona sobre estos comportamientos y considera hablar con un profesional.";
        whatsappMessage = "Hola, según el test, mi relación tiene algunas señales de alerta. ¿Me das algún consejo?";
    } else if (averageScore < 80) {
        message = "Tu relación tiene aspectos tóxicos. Considera buscar ayuda.";
        advice = "Es importante que hables con alguien de confianza o un especialista.";
        whatsappMessage = "Hola, según el test, mi relación tiene aspectos tóxicos. ¿Me ayudas?";
    } else {
        message = "Tu relación es muy tóxica. Busca ayuda lo antes posible.";
        advice = "No estás solo/a. Contacta a un especialista o a una organización de apoyo.";
        whatsappMessage = "¡Urgente! Según el test, mi relación es muy tóxica. ¿Podemos hablar?";
    }

    messageDisplay.textContent = message;
    adviceDisplay.textContent = advice;

    // Configurar el enlace de WhatsApp
    const phoneNumber = "1121726140";
    const encodedMessage = encodeURIComponent(whatsappMessage);
    whatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    resultContainer.classList.remove("hidden");
});
