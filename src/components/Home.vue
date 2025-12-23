<template>
    <a-layout>
        <CommonHeader />
        <a-layout-content>
            <a-layout>
                <CommonSider />
                <a-layout-content :style="{ padding:'0 24px', minHeight:'280px', color:'#666',background:'#fff' }">
                    右侧内容区域
                </a-layout-content>
            </a-layout>
        </a-layout-content>
        <CommonFooter />
    </a-layout>
</template>
<style>
    body #app {
        width: 100%;
        height: 100%;
        color: #fff;
    }
    #app {
        max-width: 100%;
        margin: 0;
        padding: 0;
    }
    .ant-layout {
        height: 100%;
        width: 100%;
    }
</style>
<script setup>
    import CommonHeader from './CommonHeader.vue';
    import CommonSider from './CommonSider.vue';
    import CommonFooter from './CommonFooter.vue';
</script>