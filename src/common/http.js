import { HttpError } from "./http-error";

export class Http {
    constructor(username = null, passwordHash = null) {
        this.applyCredentials(username, passwordHash);
    }

    applyCredentials(username, passwordHash) {
        if (username != null) {
            localStorage.setItem("username", username);
        }
        if (passwordHash != null) {
            localStorage.setItem("passwordHash", passwordHash);
        }
    }

    async doGet(url, data = null) {
        return await this.doRequest("GET", url, data);
    }

    async doPost(url, data = null) {
        return await this.doRequest("POST", url, data);
    }

    async doPut(url, data = null) {
        return await this.doRequest("PUT", url, data);
    }

    async doDelete(url, data = null) {
        return await this.doRequest("DELETE", url, data);
    }

    async doRequest(method, url, data = null) {
        const headers = {
            "Accept": "application/json"
        };
        let body = null;
        if (data != null) {
            headers["Content-Type"] = "application/json";
            body = JSON.stringify(data);
        }
        if (localStorage.getItem("username") != null && localStorage.getItem("passwordHash") != null) {
            headers["Authorization"] = `Basic ${this.__credentials()}`;
        }
        console.log(url);
        const response = await fetch(url, {
            headers: { ...headers },
            method: method,
            body: body
        });
        if (!response.ok) {
            throw new HttpError(response);
        }
        if (method === "DELETE") {
            return {};
        }
        return await response.json();
    }

    __credentials() {
        return btoa(`${localStorage.getItem("username")}:${localStorage.getItem("passwordHash")}`);
    }
};
