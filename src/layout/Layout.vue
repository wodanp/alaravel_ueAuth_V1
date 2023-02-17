<script setup lang="ts">
import HeadBar from './components/HeadBar.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
    <!-- <div>
        <BackendNavbar />
    </div>
    <el-row :gutter="10">
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
      ><div class="grid-content ep-bg-purple"
    />a</el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
      ><div class="grid-content ep-bg-purple-light"
    />b</el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
      ><div class="grid-content ep-bg-purple"
    />e</el-col>
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
      ><div class="grid-content ep-bg-purple-light"
    />d</el-col>
  </el-row>

  
     -->

    <el-container>
        <el-aside>
            <Sidebar />
        </el-aside>
        <el-container>
            <el-header>
                <HeadBar />
                <!-- <div>TagsBar ?</div> -->
            </el-header>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>

</template>