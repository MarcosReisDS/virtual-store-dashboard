import { FC, useContext, useEffect, useState } from "react";
import "../styles.scss"
import { useNavigate } from "react-router-dom";
import productApi from "../../../shared/services/product";
import Contexts, { IContext } from "../../../shared/contexts";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const productSchema = z.object({
    url: z.string()
        .nonempty({
            message: 'A url é obrigatória',
        })
        .url({
            message: "Essa url está inválida"
        }),
    name: z.string()
        .nonempty({
            message: 'O nome é obrigatório',
        }),
    value: z.string().nonempty({
        message: 'O valor é obrigatório',
    })
        .min(4, "minino 4 letas"),
    description: z.string().nonempty({
        message: 'A descrição é obrigatória',
    }),
    quantity: z.string().nonempty({
        message: 'A quantidade é obrigatória',
    }),
    type: z.string().nonempty({
        message: 'O tipo é obrigatória',
    }),
})

type productData = z.infer<typeof productSchema>

const types = [
    { name: "Masculino" },
    { name: "Feminino" }
]

interface IAdd { }
const Add: FC<IAdd> = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<productData>({
        resolver: zodResolver(productSchema)
    })

    const { valueSidebar, token } = useContext(Contexts) as IContext

    const navigate = useNavigate()
    const [urlFoto, setUrlFoto] = useState<string>("")
    const [selected, setSelected] = useState<string>("")
    const [regex, setRegex] = useState<any>("")

    const handleCreateProduct = async (data: productData) => {
        // productApi.createProduct({
        //     image: data.url,
        //     name: data.name,
        //     price: data.value,
        //     description: data.description,
        //     quantity: data.quantity,
        //     type: data.type
        // }, token).then(() => {
        //     navigate("/produtos")
        // })
        console.log(data.type)
    }

    useEffect(() => {
        setUrlFoto(watch().url)
        setRegex(watch().value.replace(/\D/g, '').replace(/(\d{1})(?=\d{2}$)/, "$1,"))
    }, [watch(), regex])

    return (
        <div className={valueSidebar ? "container-add closed" : "container-add open"}>
            <form onSubmit={handleSubmit(handleCreateProduct)}>
                <div className="container url">
                    <input
                        type="url"
                        placeholder="Insirar url de uma foto"
                        {...register("url")}
                    />
                    {errors.url && <span className="error">{errors.url.message}</span>}
                    <div>
                        <img src={urlFoto} alt="" />
                    </div>
                </div>
                <div className="container name">
                    <input
                        type="text"
                        placeholder="Nome do tênis"
                        {...register("name")}
                    />
                    {errors.name && <span className="error">{errors.name.message}</span>}
                </div>
                <div className="container value">
                    <input
                        type="text"
                        placeholder="Quanto vai valer"
                        value={regex}
                        {...register("value")}
                    />
                    {errors.value && <span className="error">{errors.value.message}</span>}
                </div>
                <div className="container description">
                    <textarea
                        placeholder="Descrição"
                        {...register("description")}
                    ></textarea>
                    {errors.description && <span className="error description">{errors.description.message}</span>}
                </div>
                <div className="container quantity">
                    <input
                        type="number"
                        placeholder="Quantidade"
                        {...register("quantity")}
                    />
                    {errors.quantity && <span className="error">{errors.quantity.message}</span>}
                </div>
                <div className="container type">
                    <label className={selected == "Masculino" ? "selected" : ""}  >
                        <input
                            type="radio"
                            value="Masculino"
                            onClick={() => setSelected("Masculino")}
                            {...register("type")}
                        />
                        Masculino
                    </label>
                    <label className={selected == "Feminino" ? "selected" : ""} >
                        <input
                            type="radio"
                            value="Feminino"
                            onClick={() => setSelected("Feminino")}
                            {...register("type")}
                        />
                        Feminino
                    </label>
                    {errors.type && <span className="error">{errors.type.message}</span>}
                </div>
                <div className="container create">
                    <button type="submit">Criar produto</button>
                </div>
            </form>
        </div>
    )
}

export default Add