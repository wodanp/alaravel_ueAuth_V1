<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import { useAuthStore } from '@/store/auth-store';
import Breadcrumb from './Breadcrumb.vue';

const auth = useAuthStore()
</script>

<template>
    <div class="flex justify-between">
        <div class="flex items-center">
            <SvgIcon svg="tabler-layout-sidebar-left-collapse" class="mr-2" />
            <Breadcrumb />
        </div>
        <div>
            <el-dropdown>
                <span class="el-dropdown-link flex items-center">
                    <SvgIcon svg="tabler-user-circle" class="mr-2" />
                    {{ auth.me.name }}
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <!--TODO user settings-->
                        <el-dropdown-item>user</el-dropdown-item>
                        <el-dropdown-item divided @click="auth.logout">
                            <span style="display: block">Logout</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>