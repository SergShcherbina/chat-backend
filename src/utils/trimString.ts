export const trimString = (str: string) => {
    return str.trim().toUpperCase().slice(0,1) + str.trim().slice(1).toLowerCase()
}