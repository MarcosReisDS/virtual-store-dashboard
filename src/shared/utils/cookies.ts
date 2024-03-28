export const setCookie = (nome: string, valor: any, diasParaExpirar: number) => {
    var data = new Date();
    data.setTime(data.getTime() + (diasParaExpirar * 24 * 60 * 60 * 1000));
    var expira = "expires=" + data.toUTCString();
    document.cookie = nome + "=" + valor + ";" + expira + ";path=/";
}

export const getCookie = (nome: string) => {
    var nomeCookie = nome + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(nomeCookie) === 0) {
            return JSON.parse(cookie.substring(nomeCookie.length, cookie.length));
        }
    }
    return "";
}

export const deleteCookie = (cookieName: string) => {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}