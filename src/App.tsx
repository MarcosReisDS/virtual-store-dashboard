import { FC, useState } from 'react'
import SideBar from './shared/components/SideBar'
import Router from './shared/router'

interface IApp { }
const App: FC<IApp> = () => {
  const [sidebarValue, setSidebarValue] = useState<any>(null);

  // Função para atualizar o valor da SideBar
  const handleSidebarChange = (value: any) => {
    setSidebarValue(value);
  };
  return (
    <>
      <SideBar onSidebarChange={handleSidebarChange}/>
      <Router sidebarValue={sidebarValue}/>
    </>
  )
}

export default App
