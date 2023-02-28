import {GROUP_API, GROUP_MEMBERS_API, PROJECT_MEMBERS_API, SUBGROUPS_API} from "./api";
import {SubGroup} from "./interface/subgroup";
import {Member} from "./interface/member";
import axios from 'axios';
import {Group} from "./interface/group";


export default class GitLabService {
    private static gitLabService: GitLabService

    constructor(private accessToken: string) {
    }

    public static init(token: string) {
        this.gitLabService = new GitLabService(token)
    }

    private async makeRequest(endpoint: string) {
        try {
            const response = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })
            return response
        } catch (err) {
            console.error(err)
        }
    }

    private async makeListRequest<T>(url) {
        const objects = [] as T[]
        const response = await this.makeRequest(url)
        objects.push(...response.data)
        const totalPages = response.headers['x-total-pages']
        if (totalPages && totalPages > 1) {
            for (let i = 2; i < totalPages + 1; i++) {
                const resp = await this.makeRequest(`${url}?page=${i}`)
                objects.push(...resp.data)
            }
        }
        return objects
    }

    async fetchGroup(groupId) {
        const url = GROUP_API.replace('{groupId}', groupId)
        const response = await this.makeRequest(url)
        return response.data as Group
    }

    public async fetchAllSubgroups(groupId: string) {
        const url = SUBGROUPS_API.replace('{groupId}', groupId)
        return await this.makeListRequest<SubGroup>(url)
    }

    public async fetchProjectMembers(projectId) {
        const url = PROJECT_MEMBERS_API.replace('{projectId}', projectId)
        return await this.makeListRequest<Member>(url)
    }

    public async fetchGroupMembers(groupId) {
        const url = GROUP_MEMBERS_API.replace('{groupId}', groupId)
        return await this.makeListRequest<Member>(url)
    }

    public getAccessToken() {
        return this.accessToken
    }

    public static isInitialized() {
        return !!GitLabService.gitLabService
    }

    public setAccessToken(token: string) {
        this.accessToken = token
    }

    public static getInstance(): GitLabService {
        if (!this.gitLabService) {
            throw new Error('Singleton is not initialized')
        }
        return this.gitLabService;
    }

}




