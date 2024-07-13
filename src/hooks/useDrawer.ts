import { useContext } from "react"
import DrawerContext from "../contexts/drawerContext"

export const useDrawer = () => {
    const drawerContext = useContext(DrawerContext)

    return { ...drawerContext }
}
