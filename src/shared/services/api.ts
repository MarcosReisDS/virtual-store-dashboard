import axios, { AxiosRequestConfig } from "axios"

export default class Api {
    private base_url: string = ''

    private base_url_virtual_store: string = import.meta.env.VITE_CONTENT_BASE_VIRTUAL_STORE || ''

    private configsDefault: AxiosRequestConfig<any> = {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: Number(import.meta.env.HTTP_TIMEOUT) || 5000
    }

    constructor(type: "virtual") {

        switch (type) {
            case 'virtual':
                this.base_url = this.base_url_virtual_store
                break;
        }
    }

    private resquest(config: AxiosRequestConfig<any>): Promise<any> {
        return axios({ ...this.configsDefault, ...config }).then(({ data }) => {
            return data
        }).catch(() => {

            throw null
        })
    }

    async get(path: string, params: any, header?: any): Promise<any> {
        return await this.resquest({
            method: "GET",
            url: this.base_url + path,
            params: params,
            headers: {'Authorization': `Bearer ${header}`}
        })
    }

    async put(path: string, data: any, header?: any): Promise<any> {
        return await this.resquest({
            method: "PUT",
            url: this.base_url + path,
            data: data,
            headers: {'Authorization': `Bearer ${header}`}
        })
    }

    async post(path: string, data: any, header?: any): Promise<any> {
        return await this.resquest({
            method: "POST",
            url: this.base_url + path,
            data: data,
            headers: {'Authorization': `Bearer ${header}`}
        })
    }

    async delete(path: string, header?: any): Promise<any> {
        return await this.resquest({
            method: "DELETE",
            url: this.base_url + path,
            headers: {'Authorization': `Bearer ${header}`}
        })
    }
}