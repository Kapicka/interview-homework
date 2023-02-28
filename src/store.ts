export default class Store {
    private static topLevelGroup: string = ''

    public static getTopLevelGroup() {
        return this.topLevelGroup
    }

    public static setTopLevelGroup(groupId: string) {
        this.topLevelGroup = groupId
    }

}