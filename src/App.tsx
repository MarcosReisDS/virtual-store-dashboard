import { FC, useEffect, useState } from 'react'
import SideBar from './shared/components/SideBar'
import Router from './shared/router'
import { getCookie } from './shared/utils/cookies';
import { jwtDecode } from "jwt-decode";
import userApi from './shared/services/user';
import Contexts, { IColorType, IProductType, ISizeType, IUserType, Jwt } from './shared/contexts';
import { useLocation } from 'react-router-dom';
import productApi from './shared/services/product';

interface IApp { }
const App: FC<IApp> = () => {
  const { pathname } = useLocation()
  const [valueSidebar, setValueSidebar] = useState<boolean>(false)

  const [user, setUser] = useState<IUserType>({
    profile: '',
    name: '',
    surname: '',
    admin: true
  })
  const [users, setUsers] = useState<IUserType[]>([])

  const [products, setProducts] = useState<IProductType[]>([])
  const [id, setId] = useState<any>(0)
  const [product, setProduct] = useState<IProductType>({
    image: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
    type: ''
  })
  const [colors, setColors] = useState<IColorType[]>([])
  const [sizes, setSizes] = useState<ISizeType[]>([])

  const [token, setToken] = useState<string>("")

  useEffect(() => {
    setToken(getCookie("token").token);

    if (token) {
      const jwt: Jwt = jwtDecode(token)

      userApi.listUser(jwt?.email, token).then((data: IUserType) => {
        setUser({
          id: data?.id,
          profile: data?.profile,
          name: data?.name,
          admin: data?.admin
        })
      })

      userApi.listUsers(Number(user?.admin), token).then((data: any) => {
        setUsers(data)
      })

      productApi.listProducts(token).then(data => {
        setProducts(data)
      })

      productApi.listProducts(token, id).then(data => {
        setProduct(data)
      })

      productApi.listColors(token).then(data => {
        setColors(data)
      })

      productApi.listSizes(token).then(data => {
        setSizes(data)
      })
    }
  }, [token, pathname])


  return (
    <Contexts.Provider value={{
      token,
      user,
      users,
      products,
      id,
      product,
      colors,
      sizes,
      valueSidebar,
      setUser,
      setUsers,
      setProducts,
      setId,
      setProduct,
      setColors,
      setSizes,
      onSidebarChange(value) {
        setValueSidebar(value);
      },
    }}>
      {window.location.pathname == "/conectar" ?
        null
        :
        <SideBar />
      }
      <Router />
    </Contexts.Provider>
  )
}

export default App
