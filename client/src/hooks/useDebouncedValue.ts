import { useEffect, useState } from "react"

export function useDebouncedValue<T>(value: T, delay = 300): T {
    const [debounce, setDebounce] = useState(value)

    useEffect(() => {
        const id = setTimeout(() => setDebounce(value), delay)
        return () => clearInterval(id)
    }, [])

    return debounce
}