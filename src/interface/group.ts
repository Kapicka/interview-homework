export interface Group {
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
    emails_disabled: boolean;
    mentions_disabled: boolean;
    lfs_enabled: boolean;
    default_branch_protection: number;
    avatar_url: null;
    request_access_enabled: boolean;
    full_name: string;
    full_path: string;
    created_at: Date;
    parent_id: number;
    ldap_cn: null;
    ldap_access: null;
    shared_with_groups: any[];
    runners_token: string;
    projects: Project[];
    shared_projects: any[];
    shared_runners_minutes_limit: null;
    extra_shared_runners_minutes_limit: null;
    prevent_forking_outside_group: null;
    membership_lock: boolean;
}

export interface Project {
    id: number;
    description: string;
    name: string;
    name_with_namespace: string;
    path: string;
    path_with_namespace: string;
    created_at: Date;
    default_branch: string;
    tag_list: any[];
    topics: any[];
    ssh_url_to_repo: string;
    http_url_to_repo: string;
    web_url: string;
    readme_url: null;
    forks_count: number;
    avatar_url: null;
    star_count: number;
    last_activity_at: Date;
    namespace: Namespace;
    container_registry_image_prefix: string;
    _links: Links;
    packages_enabled: boolean;
    empty_repo: boolean;
    archived: boolean;
    visibility: string;
    resolve_outdated_diff_discussions: boolean;
    container_expiration_policy: ContainerExpirationPolicy;
    issues_enabled: boolean;
    merge_requests_enabled: boolean;
    wiki_enabled: boolean;
    jobs_enabled: boolean;
    snippets_enabled: boolean;
    container_registry_enabled: boolean;
    service_desk_enabled: boolean;
    service_desk_address: string;
    can_create_merge_request_in: boolean;
    issues_access_level: string;
    repository_access_level: string;
    merge_requests_access_level: string;
    forking_access_level: string;
    wiki_access_level: string;
    builds_access_level: string;
    snippets_access_level: string;
    pages_access_level: string;
    operations_access_level: string;
    analytics_access_level: string;
    container_registry_access_level: string;
    security_and_compliance_access_level: string;
    releases_access_level: string;
    environments_access_level: string;
    feature_flags_access_level: string;
    infrastructure_access_level: string;
    monitor_access_level: string;
    emails_disabled: null;
    shared_runners_enabled: boolean;
    group_runners_enabled: boolean;
    lfs_enabled: boolean;
    creator_id: number;
    import_url: null;
    import_type: null;
    import_status: string;
    open_issues_count: number;
    ci_default_git_depth: number;
    ci_forward_deployment_enabled: boolean;
    ci_job_token_scope_enabled: boolean;
    ci_separated_caches: boolean;
    ci_opt_in_jwt: boolean;
    ci_allow_fork_pipelines_to_run_in_parent_project: boolean;
    public_jobs: boolean;
    build_timeout: number;
    auto_cancel_pending_pipelines: string;
    ci_config_path: string;
    shared_with_groups: any[];
    only_allow_merge_if_pipeline_succeeds: boolean;
    allow_merge_on_skipped_pipeline: null;
    restrict_user_defined_variables: boolean;
    request_access_enabled: boolean;
    only_allow_merge_if_all_discussions_are_resolved: boolean;
    remove_source_branch_after_merge: boolean;
    printing_merge_request_link_enabled: boolean;
    merge_method: string;
    squash_option: string;
    enforce_auth_checks_on_uploads: boolean;
    suggestion_commit_message: null;
    merge_commit_template: null;
    squash_commit_template: null;
    issue_branch_template: null;
    auto_devops_enabled: boolean;
    auto_devops_deploy_strategy: string;
    autoclose_referenced_issues: boolean;
    keep_latest_artifact: boolean;
    runner_token_expiration_interval: null;
    external_authorization_classification_label: string;
    requirements_enabled: boolean;
    requirements_access_level: string;
    security_and_compliance_enabled: boolean;
    compliance_frameworks: any[];
}

export interface Links {
    self: string;
    issues: string;
    merge_requests: string;
    repo_branches: string;
    labels: string;
    events: string;
    members: string;
    cluster_agents: string;
}

export interface ContainerExpirationPolicy {
    cadence: string;
    enabled: boolean;
    keep_n: number;
    older_than: string;
    name_regex: string;
    name_regex_keep: null;
    next_run_at: Date;
}

export interface Namespace {
    id: number;
    name: string;
    path: string;
    kind: string;
    full_path: string;
    parent_id: number;
    avatar_url: null;
    web_url: string;
}

