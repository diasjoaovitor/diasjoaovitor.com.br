import { useSyncExternalStore } from 'react'

const noop = () => {}

const subscribe = () => noop

const getSnapshot = () => true

const getServerSnapshot = () => false

export const useMounted = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
