import Api from "../api";

class ProductApi {
    private product_api = new Api("virtual")

    async listProducts(token?: any, id?: number) {
        if (id) {
            let data = await this.product_api.get(`/products/?id=${id}`, {}, token)

            return data
        }
        let data = await this.product_api.get("/products", {}, token)

        return data
    }

    async listColors(token?: any, id?: number) {
        if (id) {
            let dataColor = await this.product_api.get(`/products/colors/?id=${id}`, {}, token)

            return dataColor
        }
        let dataColor = await this.product_api.get("/products/colors", {}, token)

        return dataColor
    }

    async listSizes(token?: any, id?: number) {
        if (id) {
            let dataSize = await this.product_api.get(`/products/sizes/?id=${id}`, {}, token)

            return dataSize
        }
        let dataSize = await this.product_api.get("/products/sizes", {}, token)

        return dataSize
    }

    async createProduct(product: ProductType, token?: any) {
        return this.product_api.post("/products", { ...product }, token)
    }

    async createColorProduct(productId: number, color: ColorType, token?: any) {
        return this.product_api.post(`/products/colors/${productId}`, { ...color }, token)
    }

    async createSizeProduct(productId: number, size: SizeType, token?: any) {
        return this.product_api.post(`/products/sizes/${productId}`, { ...size }, token)
    }

    async updateProduct(product: ProductType, token: any) {
        return this.product_api.put(`/products/${product?.id}`, { ...product }, token)
    }

    async updateColor(color: ColorType, token: any) {
        return this.product_api.put(`/products/colors/${color?.id}`, { ...color }, token)
    }

    async updateSize(size: SizeType, token: any) {
        return this.product_api.put(`/products/sizes/${size?.id}`, { ...size }, token)
    }

    async deleteProduct(product_id: number, token?: any) {
        return this.product_api.delete(`/products/${product_id}`, token)
    }

    async deleteColor(color_id: number, token?: any) {
        return this.product_api.delete(`/products/colors/${color_id}`, token)
    }

    async deleteSize(size_id: number, token?: any) {
        return this.product_api.delete(`/products/sizes/${size_id}`, token)
    }
}

const productApi = new ProductApi()

export default productApi