import { FC, useEffect, useState } from 'react'
import SideBar from './shared/components/SideBar'
import Router from './shared/router'
import { getCookie } from './shared/utils/cookies';
import { jwtDecode } from "jwt-decode";
import userApi from './shared/services/user';
import Contexts, { IUserType, Jwt } from './shared/contexts';
import { useLocation } from 'react-router-dom';

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
    }

    userApi.listUsers(Number(user?.admin), token).then((data: any) => {
      setUsers(data)
    })
  }, [token, pathname])

  return (
    <Contexts.Provider value={{
      token,
      setToken,
      user,
      users,
      valueSidebar,
      setUser,
      setUsers,
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
