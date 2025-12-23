<template>
    <a-layout-header>
        <div class="logo">LOGO</div>
        <a-menu
        v-model:selectedkeys="selectedKeys1"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }">
        <a-menu-item key="1">用户管理</a-menu-item>
        <a-menu-item key="2">系统管理</a-menu-item>
        <a-menu-item key="3">商品管理</a-menu-item>
    </a-menu>
    <a-button class="logout" type="dashed" ghost>退出</a-button>
    </a-layout-header>
</template>
<script setup>
    import { ref } from 'vue'
    const selectedKeys1 =ref(['1'])
</script>
<style>
    .ant-layout-header .logo {
        float: left;
        width: 120px;
        height: 31px;
        margin: 16px 24px 16px 0;
        background: rgba(255, 255, 255, 0.3);
        line-height: 31px;
        font-weight: bold;
        color: #fff;
    }
    .ant-layout-header {
        color: #fff !important;
    }
    .logout {
        float: right;
        margin-top: -49px;
    }
</style>