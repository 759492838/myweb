<template>
    <a-layout-header>
        <div class="logo">
            <img
            :src="logoImg"
            alt="品牌商标"
            class="logo-img"
        >
        </div>
        <a-button
            class="search-btn"
            type="text"
            @click="handleGoToSearchPage"
        >
            <SearchOutlined class="search-icon" />
        </a-button>
        <a-menu
            class="main-menu"
            v-model:selectedKeys="selectedKeys1"
            theme="dark"
            mode="horizontal"
            :style="{ lineHeight: '64px' }">
            <a-menu-item key="1">
                <span class="menu-text">OriginOS</span>
            </a-menu-item>
            <a-menu-item key="2">
                <span class="menu-text">体验店</span>
            </a-menu-item>
            <a-menu-item key="3">
                <span class="menu-text">官网社区</span>
            </a-menu-item>


            <a-menu-item key="4" class="right-menu">
                <a-tooltip
                    placement="bottomRight"
                    :get-popup-container="getPopupContainer"
                    :visible="isTooltipVisible"
                    @mouseenter="handleMouseEnter"
                    @mouseleave="handleMouseLeave"
                    :auto-adjust-overflow="false"
                >
                    <template #title>
                        <div class="qrcode-tooltip">
                            <img
                                src="@/assets/1.jpg"
                                alt="下载APP二维码"
                                class="qrcode-img"
                            />
                            <p class="qrcode-text">扫码下载APP</p>
                        </div>
                    </template>
                    <span class="menu-text nav-item">下载APP</span>
                </a-tooltip>
            </a-menu-item>
            <a-menu-item key="5" class="right-menu">
                <span class="menu-text">购物车</span>
            </a-menu-item>
            <a-menu-item key="6" class="right-menu">
                <span class="menu-text">个人中心</span>
            </a-menu-item>
        </a-menu>
    </a-layout-header>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import logoImg from '@/assets/logo1.jpg'
    const selectedKeys1 =ref(['1'])
    import { Button } from 'ant-design-vue'
    import { SearchOutlined } from '@ant-design/icons-vue';
    const handleGoToSearchPage = () => {
        console.log('触发搜索按钮点击，待跳转至搜索页')
    }
    const isMobile = ref(false);
    const isTooltipVisible = ref(false);
    const getPopupContainer = (triggerNode) => triggerNode.parentNode;
    onMounted(() => {
        // 初始判断
        isMobile.value = window.innerWidth <= 768;
        // 监听窗口变化
        window.addEventListener('resize', () => {
            isMobile.value = window.innerWidth <= 768;
        });
    });
    const handleMouseEnter = () => {
        isTooltipVisible.value = true;
    };

// 新增：鼠标离开事件（带0.1秒延迟，避免抖动）
    const handleMouseLeave = () => {
        setTimeout(() => {
            isTooltipVisible.value = false;
        }, 50);
    };
</script>
<style>
    .menu-text {
        display: inline-flex; /* 保留 inline 特性，同时支持 flex 居中 */
        align-items: center;  /* 垂直居中（关键） */
        height: 64px;         /* 与导航栏高度一致，确保满高居中 */
        padding: 0 8px;       /* 统一左右内边距，避免文字贴边 */
    }
    .ant-tooltip-placement-bottomRight .ant-tooltip-inner {
        margin-top: 8px;
        padding: 0;
        border: none; /* 调整距离，避免遮挡按钮 */
    }
    .qrcode-tooltip {
        padding: 12px;
        text-align: center;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .qrcode-img {
        width: 150px;
        height: 150px;
        object-fit: contain;
        margin-bottom: 8px;
    }

    .qrcode-text {
        font-size: 14px;
        color: #333;
    }

/* 移动端隐藏 */
    @media (max-width: 768px) {
        .qrcode-tooltip {
            display: none;
        }
    }

/* 深度选择器修改Tooltip样式 */


    :deep(.ant-tooltip-arrow-content) {
        background-color: #fff;
    }
    .ant-layout-header{
        color:#fff ;
        position: relative;
        display: flex;
        align-items: center;
        height: 64px;
    }
    .main-menu {
        flex: 1;
        display: flex;
        justify-content: space-between;
        line-height: 64px;
    }
    .ant-layout-header .logo {
        
        width: 120px;
        height: 31px;
        margin: 16px 24px 16px 0;
        line-height: 31px;
    }
    .logo .logo-img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        vertical-align: middle;
    }
    .right-menu {
        margin-left: 16px;
    }
    .search-btn {
        color: #fff;  /* 按钮文字白色，适配深色头部 */
        margin: 0 16px;  /* 左右各16px间距，确保在商标和OriginOS中间（可根据视觉微调） */
        font-size: 14px;  /* 与菜单文字大小一致，视觉统一 */
    }
    /* 可选： hover时加深颜色，提升交互体验 */
    .search-btn:hover {
        color: #e6f7ff;  /* 浅青色 hover 效果，符合Ant Design风格 */
    }
    .search-icon {
        color: #fff; /* 图标颜色与头部文字一致 */
        font-size: 16px; /* 图标大小比菜单文字略大，提升识别度 */
       
    }
    .search-btn:hover .search-icon {
        color: #e6f7ff; /* hover时图标颜色变化 */
    }
    .nav-item {
    padding: 0 24px; /* 横向扩展触发范围，纵向靠 .menu-text 的 height 满高 */
    width: 100%;     /* 横向占满菜单项，确保鼠标覆盖整个区域 */
  }
</style>