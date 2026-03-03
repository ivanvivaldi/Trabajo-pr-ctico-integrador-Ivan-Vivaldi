
export const formatTime = (date) => {
    return date.getHours() + ":" + date.getMinutes().toString().padStart(2, '0');
};

 
export const getBotResponse = (userName, userText) => {
    const respuestas = [
        `Hola ${userName}! Como estas?? como venis con la cursada??.`,
        'Asique voliendo por aca eh??',
        `aca ando, ${userName}... la vida de un rey.. que decirte`,
        `Hola ${userName}! No tengras alguna golosina que te sobre por ahi?? 🐶😂`,
        `Hola ${userName}! Gracias por tu mensajito... en que te ayudo??`
    ];
    return respuestas[Math.floor(Math.random() * respuestas.length)];
};