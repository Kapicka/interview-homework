<script lang="ts">
import {defineComponent} from "vue";

"./this.gitLabService";
import {defaultTopLevelGroup} from "./constants";
import User from "./interface/user";
import GitLabService from "./GitLabService";

export default defineComponent({
  name: 'App',
  data() {
    const roleNameMap = new Map<number, string>([[0, 'Guest'], [20, 'Reporter'], [30, 'Developer'], [40, 'Maintainer'], [50, 'Owner']])
    const users: User[] = []
    return {
      roleNameMap, users, state: 'initial', accessToken: '', topLevelGroup: defaultTopLevelGroup
    }
  },
  beforeMount() {
    const token = window.sessionStorage.getItem('gitlab-access-token')
    if (token) {
      this.accessToken = token
    }
  },
  methods: {
    findUsers() {
      if (!GitLabService.isInitialized()) {
        GitLabService.init(this.accessToken)
      }
      if (GitLabService.getInstance().getAccessToken() !== this.accessToken) {
        GitLabService.getInstance().setAccessToken(this.accessToken)
      }
      window.sessionStorage.setItem('gitlab-access-token', this.accessToken)
      this.fetchUsers()
    },
    getRoleName(code) {
      return this.roleNameMap.get(code) || ''
    },
    async fetchUsers() {
      this.state = 'loading'
      const gs = GitLabService.getInstance()
      const userMap = new Map()
      try {
        const group = await gs.fetchGroup(this.topLevelGroup)
        await this.appendUsersToMap(group, userMap)
      } catch (err) {
        this.state = 'error'
        this.users = []
        return
      }
      this.users = Array.from(userMap.values())
      this.state = 'loaded'
    },
    async appendUsersToMap(group, userMap) {
      const gs = GitLabService.getInstance()
      await this.appendGroupToUsers(group, userMap)
      await this.appendGroupProjectsToUsers(group, userMap)
      const subGroups = await gs.fetchAllSubgroups(group.id)

      for (const sg of subGroups) {
        const subGroup = await gs.fetchGroup(sg.id)
        await this.appendUsersToMap(subGroup, userMap)
      }
    },
    async appendGroupProjectsToUsers(group, userMap) {
      const gs = GitLabService.getInstance()
      for (const project of group.projects) {
        const projectMembers = await gs.fetchProjectMembers(project.id)
        for (const member of projectMembers) {
          const user = userMap.get(member.id)
          const userProjectInfo = {name: project.namespace.full_path, accessLevel: member.access_level}
          if (user) {
            const modifiedUser = {...user}
            modifiedUser.projects = [...user.projects, userProjectInfo]
            userMap.set(user.id, modifiedUser)
            continue
          }
          userMap.set(member.id, {
            username: member.username,
            name: member.name,
            groups: [],
            projects: [userProjectInfo]
          })
        }
      }
    },

    async appendGroupToUsers(group, userMap) {
      const gs = GitLabService.getInstance()
      const groupMembers = await gs.fetchGroupMembers(group.id)
      for (const member of groupMembers) {
        const user = userMap.get(member.id)
        const userGroupInfo = {name: group.full_path, accessLevel: member.access_level}
        if (user) {
          const modifiedUser = {...user}
          modifiedUser.groups = [...user.groups, userGroupInfo]
          userMap.set(user.id, modifiedUser)
          continue
        }
        userMap.set(member.id, {
          username: member.username,
          name: member.name,
          groups: [userGroupInfo],
          projects: []
        })
      }
    }
  },
})

</script>

<template>
  <div>
    <label for="access-token">Access token</label>
    <input class="ml20" type="password" v-model="accessToken" id="access-token"/>
  </div>
  <div>
    <label for="top-level-group">Top level group</label>
    <input class="ml20 mb20" v-model="topLevelGroup" id="top-level-group" type="text"/>
  </div>
  <button :disabled="!this.topLevelGroup || !accessToken" @click="findUsers">Search</button>
  <div class="mb20" v-if="state==='loaded'">
    <p>{{ `Number of users: ${users.length}` }} </p>
    <div class="user" :key="`user${i}`" v-for="(user,i) in users">
      <div>
        {{ `${user.name} (@${user.username})` }}
      </div>
      <div>Groups:</div>
      <ul class="user__list">
        <li class="user__list-item" :key="`group${i}`" v-for="(group,i) in user.groups">
          {{ `${group.name} (${getRoleName(group.accessLevel)})` }}
        </li>
      </ul>
      <div>Projects:</div>
      <ul class="user__list">
        <li class="user__list-item" :key="`project${i}`" v-for="(project,i) in user.projects">
          {{ `${project.name} (${getRoleName(project.accessLevel)})` }}
        </li>
      </ul>
    </div>
  </div>
  <div v-if="state==='loading'"> Fetching members...</div>
  <div v-if="state==='error'">Something went wrong...</div>
</template>


<style scoped>
.mb20 {
  margin-bottom: 20px;
}

.ml20 {
  margin-left: 20px;
}

.user {
  margin-top: 20px;
}

.user__list {
  list-style: none;
  margin: 0 0 0 20px;
  padding: 0;
}

.user__list-item {
  margin: 0;
  padding: 0
}

</style>
