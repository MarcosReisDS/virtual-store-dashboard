
interface returnValidation {
    validated: boolean
    message?: string
}

export const validationNameUser = (name: string): returnValidation => {
    return name.length > 4 ? { validated: true } : { validated: false, message: "nome inválido" }
}

export const validationMailUser = (mail: string): returnValidation => {
    if (mail.includes("@")) {
        if (mail.split("@")[1].includes(".")) {
            return { validated: true }
        }
    }

    return { validated: false, message: "email inválido" }
}

export const validationPasswordUser = (password: string): returnValidation => {
    return password.length >= 8 ? { validated: true } : { validated: false, message: "senha inválida" }
}


export const validationNameProduct = (name: string): returnValidation => {
    return name.length >= 4 ? { validated: true } : { validated: false, message: "nome inválido" }
}

export const validationAmountsProduct = (amounts: string): returnValidation => {
    return amounts.length >= 1 ? { validated: true } : { validated: false, message: "quatidade inválida" }
}

export const validationValueProduct = (value: string): returnValidation => {
    if (value.includes(",")) {
        if(value.split(",")[1].length === 2) {
            return { validated: true }
        }
    }
    return { validated: false, message: "valor inválido" }
}