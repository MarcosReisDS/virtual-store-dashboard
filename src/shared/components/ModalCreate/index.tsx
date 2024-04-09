import { FC, useContext, useEffect, useState } from "react"
import "./styles.scss"
import Contexts, { IColorType, IContext, ISizeType } from "../../contexts"
import productApi from "../../services/product"
import { FaEdit } from "react-icons/fa"
import { IoTrashBinSharp } from "react-icons/io5"

interface IModalCreate {
    productId: any
}
const ModalCreate: FC<IModalCreate> = ({ productId }) => {

    const { token, colors, setColors, sizes, setSizes } = useContext(Contexts) as IContext

    const [colorType, setColorType] = useState<string>("")
    const [sizeType, setSizeType] = useState<string>("")

    const [nameColor, setNameColor] = useState<string>("")
    const [valueColor, setValueColor] = useState<string>("")

    const [valueSize, setValueSize] = useState<string>("")

    const [modalCreateColor, setModalCreateColor] = useState<any>(0)
    const [modalCreateSize, setModalCreateSize] = useState<any>(0)

    const [editSize, setEditSize] = useState<ISizeType>({
        size: ''
    })

    const [editColor, setEditColor] = useState<IColorType>({
        name: '',
        value: ''
    })

    const [boa, setBoa] = useState<IColorType[]>([])

    const handleCreateColors = async () => {
        productApi.createColorProduct(productId, { name: nameColor, value: valueColor }, token).then((data: IColorType) => {
            setColors([...colors, data])
            setModalCreateColor(false)
        })
    }

    const handleCreateSizes = async () => {
        productApi.createSizeProduct(productId, { size: valueSize }, token).then((data: ISizeType) => {
            setSizes([...sizes, data])
            setModalCreateSize(false)
        })
    }

    const handleUpdate = (type: "color" | "size") => {
        if (type == "color") {
            productApi.updateColor(editColor, token).then(() => {
                setModalCreateColor(false)
            })
        }

        if (type == "size") {
            productApi.updateSize(editSize, token).then(() => {
                setModalCreateSize(false)
            })
        }
    }

    const viewProduct = (type?: "color" | "size", id?: number) => {
        if (type == "color") {
            productApi.listColors(token, id).then((data: any) => {
                setEditColor({
                    id: data?.id,
                    name: data?.name,
                    value: data?.value
                });
            })
            setColorType("edit")
        }

        if (type == "size") {
            productApi.listSizes(token, id).then((data: any) => {
                setEditSize({
                    id: data?.id,
                    size: data?.size
                });
            })
            setSizeType("edit")
        }
    }

    const handleDeleteProduct = (type: "color" | "size", id: any) => {
        if (type == "color") {
            productApi.deleteColor(id, token).then(() => {
                setColors(colors?.filter((color) => color?.id !== id))
            })
        }
        if (type == "size") {
            productApi.deleteSize(id, token).then(() => {
                setSizes(sizes?.filter((size) => size?.id !== id))
            })
        }
    }

    useEffect(() => {
        viewProduct()

    }, [])
    return (
        <div className="container-modal-create">
            <div className="container">
                <div className="add">
                    <button className={modalCreateColor == productId ? "nada" : ""} onClick={() => { setModalCreateColor(productId); setColorType("add") }}>Adicionar cor</button>
                    <div className={modalCreateColor == productId ? "" : "sumiu"} >
                        {colorType == "add"
                            ?
                            <>
                                <input type="text" placeholder="Nome da cor" onChange={(e) => setNameColor(e.target.value)} />
                                <input type="color" onChange={(e) => setValueColor(e.target.value)} />
                                <div>
                                    <button onClick={() => setModalCreateColor(false)}>Cancelar</button>
                                    <button onClick={() => handleCreateColors()}>Criar</button>
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
                <div className="show-all">
                    {colors.map((color, index) => (
                        color.productId == productId ?
                            <div className="color" key={index}>
                                <div className="ball">
                                    <div style={{ backgroundColor: `${color.value}` }} />
                                </div>
                                <p>{color.name}</p>
                                <div className="icons">
                                    <FaEdit className="edit" onClick={() => { setModalCreateColor(productId); viewProduct("color", color.id) }} />
                                    <IoTrashBinSharp className="trash" onClick={() => handleDeleteProduct("color", color.id)} />
                                </div>
                            </div>
                            : null
                    ))}
                </div>
            </div>
            <div className="container">
                <div className="add">
                    <button className={modalCreateSize == productId ? "nada" : ""} onClick={() => { setModalCreateSize(productId); setSizeType("add") }}>Adicionar Tamanho</button>
                    <div className={modalCreateSize == productId ? "" : "sumiu"} >
                        {sizeType == "add" ?
                            <>
                                <input type="text" placeholder="Tamanho" onChange={(e) => setValueSize(e.target.value)} />
                                <div>
                                    <button onClick={() => setModalCreateSize(false)}>Cancelar</button>
                                    <button onClick={() => handleCreateSizes()}>Criar</button>
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
                <div className="show-all" >
                    {sizes.map((size, index) => (
                        productId == size.productId ?
                            <div key={index} >
                                <div>
                                    <p>{size.size}</p>
                                </div>
                                <div className="icons">
                                    <FaEdit className="edit" onClick={() => { setModalCreateSize(productId); viewProduct("size", size.id) }} />
                                    <IoTrashBinSharp className="trash" onClick={() => handleDeleteProduct("size", size.id)} />
                                </div>
                            </div>
                            :
                            null
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ModalCreate