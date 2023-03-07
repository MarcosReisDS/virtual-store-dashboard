import { FC, useState, useEffect } from "react"
import axios from "axios"
import "./style/index.scss"
import { validationAmountsProduct, validationNameProduct, validationValueProduct } from "../../utils/validations";
import ProductsClass from "../../classes/Server/Products";

interface ErrorsMessage {
    nameProduct: string
    amountsProduct: string
    valueProduct: string
}

interface IProductRegistration {
    cancelClickAdd: () => void;
    createProduct?: (nameProduct: string, amountsProduct: string, valueProduct: string, checked: boolean) => void
    editProduct?: (product: any) => void
    productId?: number
}
const ProductRegistration: FC<IProductRegistration> = ({ cancelClickAdd, createProduct, editProduct, productId }) => {

    const [nameProduct, setNameProduct] = useState<string>("")
    const [amountsProduct, setAmountsProduct] = useState<string>("")
    const [valueProduct, setValueProduct] = useState<string>("")
    const [checked, setChecked] = useState<boolean>(false)
    const [errorsMessage, setErrorsMessage] = useState<ErrorsMessage>({ nameProduct: "", amountsProduct: "", valueProduct: "" })

    const handleAction = (nameProduct: string, amountsProduct: string, valueProduct: string, checked: boolean) => {

        let errorsMessageInstance = errorsMessage

        if (!validationNameProduct(nameProduct).validated) {
            errorsMessageInstance = { ...errorsMessageInstance, nameProduct: validationNameProduct(nameProduct).message! }
        }
        if (!validationAmountsProduct(amountsProduct).validated) {
            errorsMessageInstance = { ...errorsMessageInstance, amountsProduct: validationAmountsProduct(amountsProduct).message! }
        }
        if (!validationValueProduct(valueProduct).validated) {
            errorsMessageInstance = { ...errorsMessageInstance, valueProduct: validationValueProduct(valueProduct).message! }
        }
        setErrorsMessage(errorsMessageInstance)

        if (validationNameProduct(nameProduct).validated && validationAmountsProduct(amountsProduct).validated && validationValueProduct(valueProduct).validated) {

            if (createProduct) {
                createProduct(nameProduct, amountsProduct!, valueProduct!, checked)
            } else if (editProduct && productId) {
                const productInstance = {
                    id: productId,
                    name: nameProduct,
                    amounts: amountsProduct,
                    value: valueProduct,
                    activated: checked
                }
                editProduct(productInstance)
            }
        }
    }

    const invalidLettersValue = (evt: any) => {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9,]/;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    const invalidLettersAmounts = (evt: any) => {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]/;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    useEffect(() => {
        const exec = async () => {

            if (productId && editProduct) {
                const product = await new ProductsClass(productId).product
                setNameProduct(product.name)
                setAmountsProduct(product.amounts)
                setValueProduct(product.value)
                setChecked(product.activated)
            }
        }

        exec()
    }, [])

    return (
        <div className="container-product-add">
            <div className="container-main-add">
                <div className="values-input-add">
                    <div className="value-add">
                        <label className="title-add">NOME</label>
                        <input type="text"
                            className="input-add"
                            placeholder="Ex: Laranja"
                            value={nameProduct}
                            onChange={(e) => setNameProduct(e.target.value)}
                        />
                        {!!errorsMessage.nameProduct && (
                            <span className="error-message">{errorsMessage.nameProduct}</span>
                        )}
                    </div>
                    <div className="value-add">
                        <label className="title-add">QUANTIDADE</label>
                        <input type="text"
                            className="input-number-add"
                            placeholder="Ex: 0"
                            value={amountsProduct}
                            onChange={(e) => setAmountsProduct(e.target.value)}
                            onKeyPress={invalidLettersAmounts}
                        />
                        {!!errorsMessage.amountsProduct && (
                            <span className="error-message">{errorsMessage.amountsProduct}</span>
                        )}

                    </div>
                    <div className="value-add">
                        <label className="title-add">VALOR</label>
                        <input type="text"
                            className="input-number-add"
                            placeholder="Ex: 0,00"
                            value={valueProduct}
                            onChange={(e) => setValueProduct(e.target.value)}
                            onKeyPress={invalidLettersValue}
                        />
                        {!!errorsMessage.valueProduct && (
                            <span className="error-message">{errorsMessage.valueProduct}</span>
                        )}
                    </div>
                    <div className="container-true-false-add">
                        <label className="title-add">ATIVO</label>
                        <div className="false-true-add">
                            <span>NÃO</span>
                            <span>SIM</span>
                        </div>

                        {
                            checked
                                ?
                                <button className="true" onClick={() => setChecked(false)} />
                                :
                                <button className="false" onClick={() => setChecked(true)} />
                        }
                    </div>
                    <div className="buttons-add">
                        <button className="button-add" onClick={() => handleAction(nameProduct, amountsProduct!, valueProduct!, checked)}>{createProduct ? "ADICIONAR" : "EDITAR"}</button>
                        <button className="button-add" onClick={cancelClickAdd}>CANCELAR</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductRegistration