import {createContext, useState} from 'react'

export const GlobalContext = createContext({})

export function RoutesProvider({children}: any) {
    const [idOpen, setIdOpen] = useState('')

    return (
        <GlobalContext.Provider value={{idOpen, setIdOpen}}>
            {children}
        </GlobalContext.Provider>
    )
}
