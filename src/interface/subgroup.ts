export interface SubGroup {
    id: number;
    web_url: string;
    name: string;
    path: string;
    description: string;
    visibility: string;
    share_with_group_lock: boolean;
    require_two_factor_authentication: boolean;
    two_factor_grace_period: number;
    project_creation_level: string;
    auto_devops_enabled: null;
    subgroup_creation_level: string;
    emails_disabled: null;
    mentions_disabled: null;
    lfs_enabled: boolean;
    default_branch_protection: number;
    avatar_url: null;
    request_access_enabled: boolean;
    full_name: string;
    full_path: string;
    created_at?: Date;
    parent_id?: number;
    ldap_cn: null;
    ldap_access: null;
}

