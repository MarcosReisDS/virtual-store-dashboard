import { UserType } from "../Types/Types"

class UserClass {
    public user: UserType
    constructor(user: UserType) {
        this.user = (user)
    }

    get name() {
        return this.user.name
    }

    get mail() {
        return this.user.mail
    }

    get password() {
        return this.user.password
    }

    get id() {
        return this.user.id
    }
}

export default UserClass