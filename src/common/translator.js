export default class Translator {
    static translateRole(role) {
        if (role === "common") return "uczestnik";
        if (role === "leader") return "prowadzący";
        if (role === "admin") return "administrator";
        return "---";
    }
}
