import axios from "axios"
import ProductClass from "../Client/Product"
import Product from "../Client/Product"
import { ProductType } from "../Types/Types"

class ProductsClass {
    public id: number | null
    constructor(id: number | null) {
        this.id = (id)
    }
    
    async listProduct(): Promise<ProductClass[]> {
        return new Promise(async (resolve) => {
            const { data } = await axios.get(`${process.env.REACT_APP_URL_SERVER}/product/showall`)
            resolve(data.map((product: ProductType) => new Product(product)))
        })
    }

    get product(): Promise<ProductClass> {
        return axios.get(`${process.env.REACT_APP_URL_SERVER}/product/show/${this.id || ""}`).then((res) => {
            return new ProductClass(res.data)
        })
    }

}

export default ProductsClass