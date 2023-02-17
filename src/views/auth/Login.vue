<script setup lang="ts">
import { useElForm } from '@/composables/elForm';
import { useAuthStore } from '@/store/auth-store';

const {formRef, formModel, formRules, validateForm, resetForm } = useElForm({
    email: [{required: true, type: 'email'}],
    password: [{required: true}],
},{
    email: 'admin@test.local',
    password: 'password',
})

const auth = useAuthStore()
const handleLogin = ()=>{
    auth.login(formModel)
}

</script>

<template>
    <h1>Login</h1>
    <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="0px">
        <el-form-item prop="email">
            <el-input v-model="formModel.email" placeholder="email"/>
        </el-form-item>

        <el-form-item prop="password">
            <el-input v-model="formModel.password" placeholder="password" type="password"/>
        </el-form-item>

        <el-button type="primary" @click="validateForm(handleLogin)">Login</el-button>
    </el-form>
</template>