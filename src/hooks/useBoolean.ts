import { Dispatch, useCallback, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

function useBoolean(
  initialValue: boolean
): readonly [boolean, Dispatch<boolean>, () => void, () => void, () => void]

function useBoolean(): readonly [
  boolean | undefined,
  Dispatch<boolean | undefined>,
  () => void,
  () => void,
  () => void
]

function useBoolean(initialValue?: boolean) {
  const [state, setState] = useState(initialValue)

  const setTrue = useCallback(() => {
    setState(true)
  }, [])

  const setFalse = useCallback(() => {
    setState(false)
  }, [])

  const toggleState = useCallback(() => {
    setState((prev) => !prev)
  }, [])

  return [state, setState, setTrue, setFalse, toggleState] as const
}

export default useBoolean
