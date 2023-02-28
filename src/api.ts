export const BASE_API = 'https://gitlab.com/api/v4'
export const GROUPS_API = `${BASE_API}/groups`
export const GROUP_API = `${BASE_API}/groups/{groupId}`
export const PROJECT_API = `${BASE_API}/projects/{projectId}`
export const PROJECT_MEMBERS_API = `${PROJECT_API}/members`
export const GROUP_MEMBERS_API = `${GROUP_API}/members`
export const SUBGROUPS_API = `${GROUPS_API}/{groupId}/subgroups`