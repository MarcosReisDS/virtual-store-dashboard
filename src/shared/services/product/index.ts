import Api from "../api";

class ProductApi {
    private product_api = new Api("virtual")

    async listProducts(id?: number) {
        if (id) {
            let data = await this.product_api.get(`/products/?id=${id}`, {})

            return data
        }
        let data = await this.product_api.get("/products", {})

        return data
    }

    async listColors(id?: number) {
        if (id) {
            let dataColor = await this.product_api.get(`/products/colors/?id=${id}`, {})

            return dataColor
        }
        let dataColor = await this.product_api.get("/products/colors", {})

        return dataColor
    }

    async listSizes(id?: number) {
        if (id) {
            let dataSize = await this.product_api.get(`/products/sizes/?id=${id}`, {})

            return dataSize
        }
        let dataSize = await this.product_api.get("/products/sizes", {})

        return dataSize
    }

    async createProduct(product: ProductType) {
        return this.product_api.post("/products", { ...product })
    }

    async createColorProduct(productId: number, color: ColorType) {
        return this.product_api.post(`/products/colors/${productId}`, { ...color })
    }

    async createSizeProduct(productId: number, size: SizeType) {
        return this.product_api.post(`/products/sizes/${productId}`, { ...size })
    }

    async updateProduct(product: ProductType) {
        return this.product_api.put(`/products/${product?.id}`, { ...product })
    }

    async updateColor(color: ColorType) {
        return this.product_api.put(`/products/colors/${color?.id}`, { ...color })
    }

    async updateSize(size: SizeType) {
        return this.product_api.put(`/products/sizes/${size?.id}`, { ...size })
    }

    async deleteProduct(product_id: number) {
        return this.product_api.delete(`/products/${product_id}`)
    }

    async deleteColor(color_id: number) {
        return this.product_api.delete(`/products/colors/${color_id}`)
    }

    async deleteSize(size_id: number) {
        return this.product_api.delete(`/products/sizes/${size_id}`)
    }
}

const productApi = new ProductApi()

export default productApi