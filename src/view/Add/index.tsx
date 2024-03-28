import { FC, useContext, useEffect, useState } from "react";
import "./styles.scss"
import { useNavigate } from "react-router-dom";
import productApi from "../../shared/services/product";
import Contexts, { IContext } from "../../shared/contexts";

interface IAdd { 
}
const Add: FC<IAdd> = () => {

    const { valueSidebar } = useContext(Contexts) as IContext

    const navigate = useNavigate()
    const [products, setProducts] = useState<ProductType[]>([])
    const [teste, setTeste] = useState<ProductType>({
        image: '',
        name: '',
        description: '',
        price: '',
        quantity: '',
        type: ''
    })
    const [urlFoto, setUrlFoto] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [value, setValue] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [quantity, setQuantity] = useState<string>("")
    const [type, setType] = useState<string>("")

    const handleCreateProduct = async () => {
        productApi.createProduct(products[0]).then(() => {
            navigate("/produtos")
        })
    }

    const viewProduct = () => {
        let rota = window.location.pathname;
        let parametros = rota.split('/').filter(param => param !== '');
        let ultimoParametro = parametros[parametros.length - 1];
        let numero = parseInt(ultimoParametro, 10);

        productApi.listProducts(numero).then((data: any) => {
            setTeste({
                id: data?.id,
                image: data?.image,
                name: data?.name,
                description: data?.description,
                price: data?.price,
                quantity: data?.quantity,
                type: data?.type
            });
        })
    }

    const handleUpdateProduct = () => {
        productApi.updateProduct(teste).then(() => {
            navigate("/produtos")
        })
    }

    useEffect(() => {
        viewProduct()
        setProducts([{
            image: urlFoto,
            name: name,
            description: description,
            price: value,
            quantity: quantity,
            type: type
        }])
    }, [urlFoto, name, description, value, quantity, type])

    return (
        <div className={valueSidebar ? "container-add closed" : "container-add open"}>
            {window.location.pathname == `/produtos/editar/${teste.id}` ?
                <>
                    <div className="container url">
                        <input type="url"
                            value={teste.image}
                            placeholder="Insirar url de uma foto"
                            onChange={(e) =>
                                setTeste(({ ...teste, image: e.target.value }))
                            } />
                        <div>
                            <img src={teste.image} alt="" />
                        </div>
                    </div>
                    <div className="container name">
                        <input type="text" placeholder="Nome do tênis"
                            value={teste.name}
                            onChange={(e) =>
                                setTeste(({ ...teste, name: e.target.value }))
                            }
                        />
                    </div>
                    <div className="container value">
                        <input type="text" placeholder="Quanto vai valer"
                            value={teste.price}
                            onChange={(e) =>
                                setTeste(({ ...teste, price: e.target.value }))
                            }
                        />
                    </div>
                    <div className="container description">
                        <textarea placeholder="Descrição"
                            value={teste.description}
                            onChange={(e) =>
                                setTeste(({ ...teste, description: e.target.value }))
                            }></textarea>
                    </div>
                    <div className="container quantity">
                        <input type="text" placeholder="Quantidade"
                            value={teste.quantity}
                            onChange={(e) =>
                                setTeste(({ ...teste, quantity: e.target.value }))
                            } />
                    </div>
                    <div className="container type">
                        <button className={teste.type == "Masculino" ? "selected" : ""} onClick={() => setTeste(({ ...teste, type: "Masculino" }))}>Masculino</button>
                        <button className={teste.type == "Feminino" ? "selected" : ""} onClick={() => setTeste(({ ...teste, type: "Feminino" }))}>Feminino</button>
                    </div>
                    <div className="container create">
                        <button onClick={() => handleUpdateProduct()}>Editar produto</button>
                    </div>
                </>
                :
                <>
                    <div className="container url">
                        <input type="url"
                            placeholder="Insirar url de uma foto"
                            onChange={(e) => setUrlFoto(e.target.value)} />
                        <div>
                            <img src={urlFoto} alt="" />
                        </div>
                    </div>
                    <div className="container name">
                        <input type="text" placeholder="Nome do tênis" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="container value">
                        <input type="text" placeholder="Quanto vai valer" onChange={(e) => setValue(e.target.value)} />
                    </div>
                    <div className="container description">
                        <textarea placeholder="Descrição" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="container quantity">
                        <input type="text" placeholder="Quantidade" onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                    <div className="container type">
                        <button className={type == "Masculino" ? "selected" : ""} onClick={() => setType("Masculino")}>Masculino</button>
                        <button className={type == "Feminino" ? "selected" : ""} onClick={() => setType("Feminino")}>Feminino</button>
                    </div>
                    <div className="container create">
                        <button onClick={() => handleCreateProduct()}>Criar produto</button>
                    </div>
                </>
            }
        </div>
    )
}

export default Add