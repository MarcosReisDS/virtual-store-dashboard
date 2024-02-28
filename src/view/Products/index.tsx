import { FC, useEffect, useState } from "react"
import { IoIosArrowUp } from "react-icons/io";
import "./styles.scss"
import { useNavigate } from "react-router-dom";
import { IoTrashBinSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import productApi from "../../shared/services/product";

interface IProducts {
    routerValue: any;
}
const Products: FC<IProducts> = ({routerValue }) => {
    const navigate = useNavigate()
    const [product, setProduct] = useState<ProductType[]>([])
    const [color, setColor] = useState<ColorType[]>([])
    const [editColor, setEditColor] = useState<ColorType>({
        name: '',
        value: ''
    })
    const [colorType, setColorType] = useState<string>("")

    const [size, setSize] = useState<SizeType[]>([])
    const [editSize, setEditSize] = useState<SizeType>({
        size: ''
    })
    const [sizeType, setSizeType] = useState<string>("")

    const [modalDescription, setModalDescription] = useState<any>(null);
    const [plus, setPlus] = useState(false);

    const [nameColor, setNameColor] = useState<string>("")
    const [valueColor, setValueColor] = useState<string>("")

    const [valueSize, setValueSize] = useState<string>("")

    const [modalCreateColor, setModalCreateColor] = useState<any>(0)
    const [modalCreateSize, setModalCreateSize] = useState<any>(0)

    const handleClick = (productId: any) => {
        if (modalDescription === productId) {
            setModalDescription(null)
        } else {
            setModalDescription(productId)
        }
        
        setPlus(!plus);
    };

    const handleCreateColors = async (productId: any, dataColor: ColorType) => {
        productApi.createColorProduct(productId, dataColor).then(() => {
            setColor([...color, dataColor])
            setModalCreateColor(false)
        })
    }

    const handleCreateSizes = async (productId: any, dataSize: SizeType) => {
        productApi.createSizeProduct(productId, dataSize).then(() => {
            setSize([...size, dataSize])
            setModalCreateSize(false)
        })
    }

    const viewProduct = (type?: "color" | "size", id?: number) => {
        if (type == "color") {
            productApi.listColors(id).then((data: any) => {
                setEditColor({
                    id: data?.id,
                    name: data?.name,
                    value: data?.value
                });
            })
            setColorType("edit")
        }

        if (type == "size") {
            productApi.listSizes(id).then((data: any) => {
                setEditSize({
                    id: data?.id,
                    size: data?.size
                });
            })
            setSizeType("edit")
        }
    }

    const handleUpdate = (type: "color" | "size") => {
        if (type == "color") {
            productApi.updateColor(editColor).then(() => {
                setModalCreateColor(false)
            })
        }

        if (type == "size") {
            productApi.updateSize(editSize).then(() => {
                setModalCreateSize(false)
            })
        }
    }

    const handleDeleteProduct = (type: "product" | "color" | "size", id: any) => {
        if (type == "product") {
            productApi.deleteProduct(id).then(() => {
                setProduct(product?.filter((product) => product?.id !== id))
            })
        }
        if (type == "color") {
            productApi.deleteColor(id).then(() => {
                setColor(color?.filter((color) => color?.id !== id))
            })
        }
        if (type == "size") {
            productApi.deleteSize(id).then(() => {
                setSize(size?.filter((size) => size?.id !== id))
            })
        }
    }


    useEffect(() => {
        productApi.listProducts().then(data => {
            setProduct(data)
        })
        productApi.listColors().then(data => {
            setColor(data)
        })
        productApi.listSizes().then(data => {
            setSize(data)
        })
        viewProduct()
    }, [product])
    
    return (
        <div className={routerValue ? "container-products closed" : "container-products open"}>
            <div>
                <button onClick={() => navigate("/produtos/adicionar")}>Adicionar produto</button>
            </div>
            <div>
                <div className="container-cards">
                    {product.map((product, index) => (
                        <div className="card" key={index}>
                            <div className="edit-trash" >
                                <div className="edit" onClick={() => navigate(`/produtos/editar/${product.id}`)}>
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
                            <div className="colorsize">
                                <div className="color">
                                    <div className="add-color">
                                        <button className={modalCreateColor == product.id ? "nada" : ""} onClick={() => { setModalCreateColor(product.id); setColorType("add") }}>Adicionar cor</button>
                                        <div className={modalCreateColor == product.id ? "" : "sumiu"} >
                                            {colorType == "add"
                                                ?
                                                <>
                                                    <input type="text" placeholder="Nome da cor" onChange={(e) => setNameColor(e.target.value)} />
                                                    <input type="color" onChange={(e) => setValueColor(e.target.value)} />
                                                    <div>
                                                        <button onClick={() => setModalCreateColor(false)}>Cancelar</button>
                                                        <button onClick={() => handleCreateColors(product.id, { name: nameColor, value: valueColor })}>Criar</button>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <input type="text" value={editColor.name} placeholder="Nome da cor" onChange={(e) => setEditColor(({ ...editColor, name: e.target.value }))} />
                                                    <input type="color" value={editColor.value} onChange={(e) => setEditColor(({ ...editColor, value: e.target.value }))} />
                                                    <div>
                                                        <button onClick={() => setModalCreateColor(false)}>Cancelar</button>
                                                        <button onClick={() => handleUpdate("color")}>Editar</button>
                                                    </div>
                                                </>
                                            }

                                        </div>
                                    </div>
                                    <div className="colors">
                                        {color.map((color, index) => (
                                            color.productId == product.id ?
                                                <div key={index}>
                                                    <div className="ball">
                                                        <div style={{ backgroundColor: `${color.value}` }} />
                                                    </div>
                                                    <p>{color.name}</p>
                                                    <div className="icons">
                                                        <FaEdit className="edit" onClick={() => { setModalCreateColor(product.id); viewProduct("color", color.id) }} />
                                                        <IoTrashBinSharp className="trash" onClick={() => handleDeleteProduct("color", color.id)} />
                                                    </div>
                                                </div>
                                                : ""
                                        ))}
                                    </div>
                                </div>
                                <div className="size">
                                    <div className="add-size">
                                        <button className={modalCreateSize == product.id ? "nada" : ""} onClick={() => { setModalCreateSize(product.id); setSizeType("add") }}>Adicionar Tamanho</button>
                                        <div className={modalCreateSize == product.id ? "" : "sumiu"} >
                                            {sizeType == "add" ?
                                                <>
                                                    <input type="text" placeholder="Tamanho" onChange={(e) => setValueSize(e.target.value)} />
                                                    <div>
                                                        <button onClick={() => setModalCreateSize(false)}>Cancelar</button>
                                                        <button onClick={() => handleCreateSizes(product.id, { size: valueSize })}>Criar</button>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <input type="text" value={editSize.size} placeholder="Tamanho" onChange={(e) => setEditSize(({ ...editSize, size: e.target.value }))} />
                                                    <div>
                                                        <button onClick={() => setModalCreateSize(false)}>Cancelar</button>
                                                        <button onClick={() => handleUpdate("size")}>Editar</button>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <div className="sizes" >
                                        {size.map((size, index) => (
                                            product.id == size.productId ?
                                                <div key={index} >
                                                    <div>
                                                        <p>{size.size}</p>
                                                    </div>
                                                    <div className="icons">
                                                        <FaEdit className="edit" onClick={() => { setModalCreateSize(product.id); viewProduct("size", size.id) }} />
                                                        <IoTrashBinSharp className="trash" onClick={() => handleDeleteProduct("size", size.id)} />
                                                    </div>
                                                </div>
                                                :
                                                ""
                                        ))}
                                    </div>
                                </div>
                            </div>
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
                                    onClick={() => handleClick(product.id)}
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