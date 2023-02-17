<script setup lang="tsx">
import SvgIcon from '@/components/SvgIcon.vue';
import { computed, ref, watch } from 'vue';
import { RouteRecordRaw, RouteMeta, useRoute, useRouter } from 'vue-router';
import { resolve } from 'pathe'
import type { Component, Slots } from 'vue'

const router = useRouter()
const route = useRoute()


const routesList = computed(() => {
  return router.options.routes
})

function getOnlyChildPath(parentRoute: RouteRecordRaw): RouteRecordRaw {
    const childRoute = parentRoute.children?.find((route: RouteRecordRaw) => !route.meta?.hidden)
    return Object.assign({}, childRoute, { path: `${parentRoute.path}/${childRoute?.path}` } as RouteRecordRaw)
}

const NavLink = (props: { route: RouteRecordRaw, url: string }, { slots }: { slots: Slots }) => {
    if (props.route.meta?.external) {
        return <a href={props.route.redirect as string} target='_blank' ref='noopener noreferrer'>{slots.default?.()}</a>
    }
    return <router-link to={props.url}>{slots.default?.()}</router-link>
}

const getNavIcon = (item: RouteMeta | undefined) => {
    if (!item || (item && !item.icon)) return null
    return (
        <SvgIcon svg="tabler-user-circle" class="mr-2" />
    )
}

const SidebarItem = (props: { route: RouteRecordRaw, basePath: string }) => {

    //bei mehr als einer sichtbaren childroute
    const subMenu = (route: RouteRecordRaw) => {
        const slots = {
            title: () => (
                <>
                    {getNavIcon(route.meta)}
                    <span>{route.meta?.title ?? route?.name}</span>
                </>
            )
        }

        const basePath = resolve(props.basePath, route.path)
        return (
            <el-sub-menu index={basePath} v-slots={slots}>
                subMenu: {route.children?.map(item => <SidebarItem route={item} basePath={basePath}></SidebarItem>)}
            </el-sub-menu>
        )
    }

    //keine oder nur eine sichtbare child route
    const menuItem = (route: RouteRecordRaw) => {
        const slots = {
            title: () => (
                <span>{route.meta?.title ?? route.name}</span>
            )
        }
        const url = resolve(props.basePath, route.path)
        return (
            <NavLink route={route} url={url}>
                <el-menu-item index={url} v-slots={slots}>
                    {getNavIcon(route.meta)}
                </el-menu-item>
            </NavLink>
        )
    }

    return props.route.meta?.hidden ? <div style="display: none"></div> :
        props.route.children && props.route.children.filter((item: RouteRecordRaw) => !item.meta?.hidden).length > 0 ?
            props.route.children.filter((item: RouteRecordRaw) => !route.meta?.hidden).length > 1 ?
                subMenu(props.route) : menuItem(getOnlyChildPath(props.route)) :
            menuItem(props.route)
}

const defaultActive = ref<string>(route.path)
watch(
    () => route.path,
    () => { defaultActive.value = route.path }
)

//eventuell auch aus pinia?
const isCollapse = computed(() => false)

</script>

<template>
    <el-scrollbar>
        <el-menu :defaultActive="defaultActive">
            <SidebarItem v-for="route in routesList" :key="route.path" :route="route" :base-path="route.path"
                :is-collapse="isCollapse" />
        </el-menu>
    </el-scrollbar>
</template>

<style lang="sass">
.el-menu-item span:first-letter
    text-transform: uppercase
</style>