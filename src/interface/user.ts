export default interface User {
    name: string,
    username: string,
    groups: { name: string, accessLevel: number }[]
    projects: { name: string, accessLevel: number }[]

}