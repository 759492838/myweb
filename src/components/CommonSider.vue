<template>
    <a-layout-sider width="200" style="overflow:auto;">
        <a-menu
            v-model:selectedKeys="selectedKey2"
            v-model:openKeys="openKeys"
            mode="inline"
            style="height: 100%">
            <a-sub-menu key="sub1">
                <template #title>
                    <span><user-outlined />用户管理</span>
                </template>
                <a-menu-item key="1">个人信息</a-menu-item>
                <a-menu-item key="2">修改头像</a-menu-item>
                <a-menu-item key="3">修改密码</a-menu-item>
                <a-menu-item key="4">修改邮箱</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <template #title>
                    <span><laptop-outlined />系统管理</span>
                </template>
                <a-menu-item key="5">用户管理</a-menu-item>
                <a-menu-item key="6">权限管理</a-menu-item>
                <a-menu-item key="7">站点管理</a-menu-item>
                <a-menu-item key="8">检测参数管理</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
                <template #title>
                    <span><notification-outlined />商品管理</span>
                </template>
                <a-menu-item key="9">分类管理</a-menu-item>
                <a-menu-item key="10">订单管理</a-menu-item>
                <a-menu-item key="11">回收站</a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>
<script setup>
    import { ref } from "vue";
    import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons-vue";
    const selectedKey2 = ref(['1'])
    const openKeys = ref(['sub1'])
</script>