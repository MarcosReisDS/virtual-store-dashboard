import { FC, useContext, useState } from "react"
import { IoIosArrowUp } from "react-icons/io";
import "./styles.scss"
import { useNavigate } from "react-router-dom";
import { IoTrashBinSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import productApi from "../../shared/services/product";
import Contexts, { IContext } from "../../shared/contexts";
import ModalCreate from "../../shared/components/ModalCreate";

interface IProducts {
}
const Products: FC<IProducts> = () => {

    const { token, valueSidebar, products, setProducts, setId } = useContext(Contexts) as IContext

    const navigate = useNavigate()

    const [modalDescription, setModalDescription] = useState<any>(null);


    const handleDeleteProduct = (type: "product", id: any) => {
        if (type == "product") {
            productApi.deleteProduct(id, token).then(() => {
                setProducts(products?.filter((product) => product?.id !== id))
            })
        }
    }

    return (
        <div className={valueSidebar ? "container-products closed" : "container-products open"}>
            <div>
                <button onClick={() => navigate("/produtos/adicionar")}>Adicionar produto</button>
            </div>
            <div>
                <div className="container-cards">
                    {products.map((product, index) => (
                        <div className="card" key={index}>
                            <div className="edit-trash" >
                                <div className="edit" onClick={() => { setId(product.id); navigate(`/produtos/editar`) }}>
                                    <FaEdit />
                                </div>
                                <div className="trash" onClick={() => handleDeleteProduct("product", product.id)}>
                                    <IoTrashBinSharp />
                                </div>
                            </div>
                            <div className="name">
                                <p>{product.name}</p>
                            </div>
                            <div className="img">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="price">
                                <p>R$ {product.price}</p>
                            </div>
                            <ModalCreate productId={product.id} />
                            <div className="type">
                                <div>
                                    <p>{product.type}</p>
                                </div>
                            </div>
                            <div className="quantity">
                                <div>
                                    <p>{product.quantity}</p>
                                </div>
                            </div>
                            <div className="container-description">
                                <div className={product.id == modalDescription ? "description" : "description plus"}>
                                    <p>{product.description}</p>
                                </div>
                                <div className={product.id === modalDescription ? "arrow" : "arrow plus"}
                                    onClick={() => modalDescription === product.id ? setModalDescription(null) : setModalDescription(product.id)}
                                >
                                    <IoIosArrowUp className={product.id == modalDescription ? "arrow" : "arrow plus"} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Products