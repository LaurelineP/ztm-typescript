import type { Temperature, Wind } from "./weather.types"



export const formatTemperature = ({ value, unit }: Temperature): string => `${value}${unit}`



export const formatWind = ({ speed, unit }: Wind): string => `${speed} ${unit}`

