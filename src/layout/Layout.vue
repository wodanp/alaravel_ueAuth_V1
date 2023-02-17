<script setup lang="ts">
import { useAuthStore } from '@/store/auth-store';

const auth = useAuthStore()
</script>

<template>
    <div>
        <a href="/">Dashboard</a> | <el-button @click="auth.logout">Logout</el-button>
    </div>
    <router-view/>
</template>