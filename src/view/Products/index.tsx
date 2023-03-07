import { FC, useEffect, useState } from "react"
import NavBar from "../../shared/components/NavBar"
import ProductRegistration from "../../shared/components/ProductRegistration"
import axios from "axios";
import { BsFillCartCheckFill, BsFillCartXFill, BsFillPenFill, BsFillTrashFill } from "react-icons/bs"
import "./style/index.scss"
import ProductClass from "../../shared/classes/Client/Product";
import ProductsClass from "../../shared/classes/Server/Products";

interface IProducts { }
const Products: FC<IProducts> = () => {

    const [productAdd, setProductAdd] = useState<boolean>(false)
    const [productEdit, setProductEdit] = useState<number | null>(null)
    const [allProducts, setAllProducts] = useState<any>()

    const appearProductAdd = () => {
        setProductAdd(true)
    }
    const appearProductEdit = (productId: number) => {
        setProductEdit(productId)
    }

    const getAllProducts = async () => {
        const products = new ProductsClass(null)
        setAllProducts(await products.listProduct())
    }

    const deleteProduct = async (id?: any) => {
        const { data } = await axios.delete(`${process.env.REACT_APP_URL_SERVER}/product/delete`, { params: { id: id } })
        setAllProducts(allProducts.filter((item: any) => item.id != data.id))
    }

    const createProduct = async (nameProductAdd: string, amountsProductAdd: string, valueProductAdd: string, activatedAdd: boolean) => {
        if (!nameProductAdd) {
            console.log("preencha o campo nome")
        }
        if (!amountsProductAdd) {
            console.log("preencha o campo quantidade")
        }
        if (!valueProductAdd) {
            console.log("preencha o campo valor")
        }
        if (nameProductAdd && amountsProductAdd && valueProductAdd) {
            const { data } = await axios.post(`${process.env.REACT_APP_URL_SERVER}/product/create`, { name: nameProductAdd, amounts: amountsProductAdd, value: valueProductAdd, activated: activatedAdd })
            if (data) {
                setAllProducts([...allProducts, data])
                setProductAdd(false)
            }
        }
    }

    const putProduct = async (product: any) => {
        const { data } = await axios.put(`${process.env.REACT_APP_URL_SERVER}/product/edit/${product.id}`, product)
        if (data) {
            const allProductsInstance = allProducts.map((element: any) => element?.id === product.id ? product : element)
            setAllProducts(allProductsInstance)
            setProductEdit(null)
        }
    }

    useEffect(() => {
        getAllProducts()
        deleteProduct()
    }, [])

    return (
        <div className="container">
            <NavBar />

            <div className="container-table-products">
                <div className="table-products">
                    <div className="table">
                        <span className="title-table">NOME</span>
                        <span className="title-table">QUANTIDADE</span>
                        <span className="title-table">VALOR</span>
                        <span className="title-table"></span>
                    </div>
                    {allProducts?.map((product: any) => (

                        <div className="table">
                            <span className="content-table">{product.name}</span>
                            <span className="content-table">{product.amounts}</span>
                            <span className="content-table">{product.value}</span>
                            <span className="content-table-icons">
                                {product.activated ? <BsFillCartCheckFill color="green" /> : <BsFillCartXFill color="red" />}
                                <BsFillPenFill className="pen" onClick={() => appearProductEdit(product.id)} />
                                {productEdit === product.id ? <ProductRegistration editProduct={putProduct} productId={product.id} cancelClickAdd={() => setProductEdit(null)} /> : null}
                                <BsFillTrashFill className="trash" onClick={() => deleteProduct(product.id)} />
                            </span>
                        </div>
                    ))}
                </div>
                <div className="button">
                    <button className="register" onClick={appearProductAdd}>CADASTRAR</button>
                    {productAdd ? <ProductRegistration cancelClickAdd={() => setProductAdd(false)} createProduct={createProduct} /> : null}
                </div>
            </div>
        </div>
    )
}

export default Products