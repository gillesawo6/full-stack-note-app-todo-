import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import React, { createContext, useContext, useEffect, useState } from "react";

interface searchContextProviderType {
    children: React.ReactNode
}

const searchContext = createContext<{
    input: string,
    setInput: (v: string) => void,
    setCategory: (v: string) => void,
    debounced: string,
    category: string
}>(null!)

export const SearchContextProvider: React.FC<searchContextProviderType> = ({ children }) => {
    const [input, setInput] = useState("")
    const [debounced, setDebounced] = useState("")
    const [category, setCategory] = useState("All Categories")

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounced(input)
        }, 300)
        return () => clearTimeout(handler)
    }, [input])

    return (
        <searchContext.Provider value={{ input, setInput, debounced, category, setCategory }}>
            {children}
        </searchContext.Provider>
    )
}

export const useSearch = () => useContext(searchContext)