<script setup lang="ts">
import { useElForm } from '@/composables/elForm';
import { useAuthStore } from '@/store/auth-store';



const { formRef, formModel, formRules, validateForm, resetForm } = useElForm({
    name: [{ required: true }],
    email: [{ required: true, type: 'email' }],
    password: [{ required: true }],
    password_confirmation: [{ required: true }]
}, {
    name: 'name',
    email: 'name@email.loc',
    password: 'password',
    password_confirmation: 'password',
})

const auth = useAuthStore()
const handleRegister = () => {
    auth.register(formModel).then((res)=>{
        console.log('TODO after register res',res)
    })
}

</script>

<template>
    <h1>Register</h1>
    <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="0px">
        <el-form-item prop="name">
            <el-input v-model="formModel.name" />
        </el-form-item>

        <el-form-item prop="email">
            <el-input v-model="formModel.email" />
        </el-form-item>

        <el-form-item prop="password">
            <el-input v-model="formModel.password" />
        </el-form-item>

        <el-form-item prop="password_confirmation">
            <el-input v-model="formModel.password_confirmation" />
        </el-form-item>

        <el-button @click="resetForm">resetForm</el-button>
        <el-button @click="validateForm(handleRegister)">Register</el-button>
</el-form>
</template>