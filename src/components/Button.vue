<template>
    <div :style="{background: 'rgb(190, 200, 200)', padding: '26px 16px 16px'}">
        <a-button type="primary" size="large">主按钮</a-button>
        <a-button>次按钮</a-button>
        <a-button type="dashed" size="small">虚线按钮</a-button>
        <a-button type="text" danger>文本按钮</a-button>
        <a-button type="link">链接按钮</a-button>
        <a-button type="primary" ghost>背景透明</a-button>
        <a-button type="primary" shape="circle">圆形</a-button>
        <a-button type="primary" shape="round">圆角</a-button>
        <a-button type="primary" loading>加载中...</a-button>
        <a-button type="primary" >
            <template #icon><SearchOutlined /></template>
            搜索
        </a-button>
    </div>
</template>
<script setup>
    import { SearchOutlined } from '@ant-design/icons-vue'
</script>