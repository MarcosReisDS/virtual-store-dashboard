import { ProductType } from "../Types/Types"

class ProductClass {
    public product: ProductType
    constructor(product: ProductType) {
        this.product = (product)
    }

    get name() {
        return this.product.name
    }

    get amounts() {
        return this.product.amounts
    }

    get value() {
        return this.product.value
    }

    get activated() {
        return this.product.activated
    }
    
    get id() {
        return this.product.id
    }
}

export default ProductClass