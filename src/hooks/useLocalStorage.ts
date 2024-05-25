import { useEffect, useState, SetStateAction, Dispatch } from "react"

export const useLocalStorageState = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>();

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(state as T) : value
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      setState(value as T)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const localState = window.localStorage.getItem(key)
    if (localState && localState !== "undefined") {
      setState(JSON.parse(localState))
    } else {
      window.localStorage.setItem(key, JSON.stringify(initialValue))
      setState(initialValue)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [state as T, setValue]
}

export const useLocalStorage = () => {
  const get = <T>(key: string): T => {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  const set = <T>(key: string, value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  const remove = (key: string) => {
    window.localStorage.removeItem(key)
  }

  return {
    get,
    set,
    remove,
  }
}