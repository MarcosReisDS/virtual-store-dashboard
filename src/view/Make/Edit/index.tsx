import { FC, useContext, useEffect, useState } from "react";
import "../styles.scss"
import { useNavigate } from "react-router-dom";
import productApi from "../../../shared/services/product";
import Contexts, { IContext, IProductType } from "../../../shared/contexts";
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

interface IEdit {
}
const Edit: FC<IEdit> = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<productData>({
        resolver: zodResolver(productSchema)
    })

    const { valueSidebar, product, setProduct } = useContext(Contexts) as IContext

    const navigate = useNavigate()

    const handleUpdateProduct = async (data: productData) => {
        // productApi.updateProduct({
        //     image: data.url,
        //     name: data.name,
        //     price: data.value,
        //     description: data.description,
        //     quantity: data.quantity,
        //     type: data.type
        // }, token).then(() => {
        //     navigate("/produtos")
        // })

        console.log(data)
    }

    useEffect(() => {
        setValue("url", product?.image)
    }, [])

    return (
        <div className={valueSidebar ? "container-add closed" : "container-add open"}>
            <form onSubmit={handleSubmit(handleUpdateProduct)}>
                <div className="container url">
                    <input
                        type="url"
                        value={product?.image}
                        placeholder="Insirar url de uma foto"
                        {...register("url", {
                            onChange(e) {
                                setProduct(({ ...product, image: e.target.value }))
                            },
                        })}
                    />
                    {errors.url && <span className="error">{errors.url.message}</span>}
                    <div>
                        <img src={product?.image} alt="" />
                    </div>
                </div>
                <div className="container name">
                    <input
                        type="text"
                        value={product?.name}
                        placeholder="Nome do tênis"
                        {...register("name", {
                            onChange(e) {
                                setProduct(({ ...product, name: e.target.value }))
                            },
                        })}
                    />
                    {errors.name && <span className="error">{errors.name.message}</span>}
                </div>
                <div className="container value">
                    <input
                        type="text"
                        value={product?.price}
                        placeholder="Quanto vai valer"
                        {...register("value", {
                            onChange(e) {
                                setProduct(({ ...product, price: e.target.value.replace(/\D/g, '').replace(/(\d{1})(?=\d{2}$)/, "$1,") }))
                            },
                        })}
                    />
                    {errors.value && <span className="error">{errors.value.message}</span>}
                </div>
                <div className="container description">
                    <textarea
                        value={product?.description}
                        placeholder="Descrição"
                        {...register("description", {
                            onChange(e) {
                                setProduct(({ ...product, description: e.target.value }))
                            },
                        })}
                    ></textarea>
                    {errors.description && <span className="error description">{errors.description.message}</span>}
                </div>
                <div className="container quantity">
                    <input
                        type="number"
                        value={product?.quantity}
                        placeholder="Quantidade"
                        {...register("quantity", {
                            onChange(e) {
                                setProduct(({ ...product, quantity: e.target.value }))
                            },
                        })}
                    />
                    {errors.quantity && <span className="error">{errors.quantity.message}</span>}
                </div>
                <div className="container type">
                    <label className={product.type == "Masculino" ? "selected" : ""} >
                        <input
                            type="radio"
                            value="Masculino"
                            onClick={() => setProduct(({ ...product, type: "Masculino" }))}
                            {...register("type")}
                        />
                        Masculino
                    </label>
                    <label className={product.type == "Feminino" ? "selected" : ""} >
                        <input
                            type="radio"
                            value="Feminino"
                            onClick={() => setProduct(({ ...product, type: "Feminino" }))}
                            {...register("type")}
                        />
                        Feminino
                    </label>
                </div>
                <div className="container create">
                    <button type="submit">Editar produto</button>
                </div>
            </form>
        </div>
    )
}

export default Edit