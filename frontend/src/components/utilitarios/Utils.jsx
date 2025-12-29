export const obterIniciais = (nome) => {
    if(!nome) return "";
    const partes = nome.trim().split(" ");
    return partes.slice(0, 2).map(parte => parte[0].toUpperCase()).join("");
};