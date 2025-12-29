<template>
    <div class="background-carousel">
        <div class="carousel-container">
            <div class="home-top-nav">
                <div style="display: flex; width: 100%; align-items: center;">
                    <a-menu
                        v-model:selectedKeys="homeSelectedKeys"
                        mode="horizontal"
                        :style="{ lineHeight: '48px' }"
                        class="menu-debug"
                        style="flex: 1;"
                    >
                        <a-menu-item key="home">x系列</a-menu-item>
                        <a-menu-item key="phone">s系列</a-menu-item>
                        <a-menu-item key="tablet">y系列</a-menu-item>
                        <a-menu-item key="accessory">IQOO手机</a-menu-item>
                        <a-menu-item key="service">智能配件</a-menu-item>
                    </a-menu>
                </div>
            </div>
            <a-carousel
                ref="carouselRef"
                :autoplay="true" 
                effect="fade"
                :dots="false"
                @change="handleCarouselChange"
                @after-change="updateSlickSlideAttrs"
            >
                <div
                    v-for="(img, index) in backgroundImages"
                    :key="index"
                    :style="{ 
                    display: index !== activeSlide ? 'none' : 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
            }"
                >
                    <img 
                        :src="img.default" 
                        :srcset="`${img.default} 1x, ${img} 2x, ${img} 4x`"
                        sizes="(max-width: 768px) 100vw, 1080px"
                        alt="背景图" 
                        class="bg-image" 
                    />
                </div>
            </a-carousel>
        </div>

            <div class="sidebar-bottom-image">
            <img 
                :src="bottomImage" 
                alt="按钮上方图片" 
                class="bottom-img" 
            />
        </div>
        <div class="sidebar-buttons">
            <a-button type="default" class="sidebar-btn">了解更多</a-button>
            <a-button type="primary" class="sidebar-btn">立即购买</a-button>
        </div>
        
    </div>
</template>
<script setup>
    import { ref, onMounted, watch, onUnmounted } from "vue";
    import Menu from 'ant-design-vue/es/menu'; // 只导入 Menu（包含 Item 子组件）
    import Carousel from 'ant-design-vue/es/carousel'; // 轮播图默认导出
    import Button from 'ant-design-vue/es/button'; // 按钮默认导出

    // 重命名为带A前缀的变量（保持习惯）
    const AMenu = Menu; // Menu 中已包含 Item 子组件，可通过 AMenu.Item 使用
    const ACarousel = Carousel;
    const AButton = Button;
    const activeSlide = ref(0);
    const carouselRef = ref(null);
    let initTimer = null;
    import bg1 from '@/assets/bg1.jpg';
    import bg2 from '@/assets/bg2.jpg';
    import bg3 from '@/assets/bg3.jpg';
    import bottomImage from '@/assets/3.png';
    const homeSelectedKeys = ref(["home"]);
    const backgroundImages = ref([bg1, bg2, bg3]);
    const handleCarouselChange = (current) => {
        activeSlide.value = current;
        
    };
    const updateSlickSlideAttrs = () => {
        if (!carouselRef.value) return;
        // 确保获取到slick生成的幻灯片（兼容初始化延迟）
        const slickSlides = document.querySelectorAll('.slick-slide');
        if (slickSlides.length === 0) {
            // 若未获取到，100ms后重试（最多3次）
            if (!initTimer) {
                let retryCount = 0;
                initTimer = setInterval(() => {
                    const retrySlides = document.querySelectorAll('.slick-slide');
                    if (retrySlides.length > 0 || retryCount >= 3) {
                        clearInterval(initTimer);
                        initTimer = null;
                        if (retrySlides.length > 0) {
                            updateSlickSlideAttrs(); // 重试成功后执行
                        }
                    }
                    retryCount++;
                }, 100);
            }
            return;
        }
         slickSlides.forEach((slide, index) => {
            // 关键：通过DOM API直接修改aria-hidden属性（优先级最高）
            if (index === activeSlide.value) {
                slide.removeAttribute('aria-hidden'); // 移除aria-hidden，默认false
                slide.removeAttribute('inert');
                slide.style.pointerEvents = 'auto';
                slide.style.outline = 'none';
            } else {
                // 强制设置aria-hidden="false"，覆盖slick默认的true
                slide.setAttribute('aria-hidden', 'false'); 
                slide.setAttribute('inert', 'true');
                slide.style.pointerEvents = 'none';
            }
        });
    };
    // 组件挂载后初始化处理底层元素
    onMounted(() => {
        // 等待slick初始化完成（延迟100ms避免DOM未渲染）
        initTimer = setTimeout(updateSlickSlideAttrs, 100);
    });

    // 监听活跃索引变化，确保属性同步
    watch(activeSlide, updateSlickSlideAttrs);
    onUnmounted(() => {
        if (initTimer) {
            clearTimeout(initTimer);
            clearInterval(initTimer); // 清理重试定时器
            initTimer = null;
        }
    });
</script>
<style scoped>
    .carousel-container :deep(.slick-slide) {
        filter: none !important; /* 移除Slick默认滤镜 */
        backface-visibility: hidden;
        transform: translateZ(0);
        /* 确保非活跃幻灯片无法获焦 */
        &[inert] {
            outline: none !important;
            user-select: none !important;
            cursor: default !important;
            pointer-events: none !important;
        }
    }
    .carousel-container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    .background-carousel {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

    .bg-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        opacity: 1;
        image-rendering: -webkit-optimize-contrast; /* Chrome/Safari优化 */
        image-rendering: crisp-edges; /* 非平滑缩放，适合清晰图片（无锯齿） */
        image-rendering: pixelated; /* 低分辨率图片时保持像素感，避免模糊 */
        will-change: transform; 
    }

    a-layout-sider {
        border-right: none !important;
        position: relative;
        height: 100%;
    }
    .sidebar-buttons {
        display: flex ;
        flex-direction: row !important;
        position: fixed ;
        gap: 20px ;
        z-index: 9999 !important;
        top: 300px ;
        left: 80px ;
        
    }
    .sidebar-btn {
        background: transparent !important;
        border: none !important;
        color: #333 !important;
        font-size: 16px !important;
        padding: 0 !important;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .sidebar-btn::after {
        content: "→";
        font-size: 14px;
    }
    .sidebar-btn.ant-btn-primary {
        color: #fff !important;
        background: #1890ff !important;
        border-color: #1890ff !important;
    }
    .home-top-nav {
        position: absolute; /* 绝对定位，叠加在轮播图背景上 */
        top: 0; /* 固定在轮播图最顶部 */
        left: 0;
        right: 0; /* 横向占满轮播图 */
        z-index: 100; /* 层级高于背景图，低于按钮（避免遮挡按钮） */
        background: rgba(255, 255, 255, 0.8); /* 半透明白色背景，既显文字又不遮挡背景图 */
        padding: 0 24px;
        height: 48px; /* 左右内边距，和顶端导航对齐 */
    }
    /* 首页导航菜单样式 */
    .home-top-nav .ant-menu {
        margin: 0 !important;
        padding: 0 !important;
        justify-content: center !important;
        background: transparent !important;
        border-bottom: none !important;
    }
    .home-top-nav .ant-menu-item {
        margin: 0 20px; /* 菜单项间距，避免拥挤 */
        color: #333 !important; /* 文字深色，适配半透明白背景 */
        font-size: 14px;
    }
    .home-top-nav .ant-menu-item-selected {
        color: #1890ff !important; /* 选中项蓝色，突出当前页 */
    }
    .menu-debug {
        display: flex !important;
        flex-direction: row !important; /* 强制横向排列 */
        justify-content: center !important;
        align-items: center !important;
        background: transparent !important;
        border-bottom: none !important;
        height: 100% !important;
        width: 100% !important; /* 强制占满导航栏宽度 */
        overflow: visible !important;
    }
    .sidebar-bottom-image {
        position: fixed; /* 与按钮一致的固定定位，确保滚动时不偏移 */
        z-index: 9999; /* 和按钮同层级，避免被遮挡 */
        left: 51px; /* 与按钮水平对齐（和.sidebar-buttons的left一致） */
        top: 150px; /* 按钮top是300px，此处加40px（按钮高度+间距），可根据需求调整 */
    }
    .bottom-img {
        width: 180px; /* 图片宽度，根据你的图片比例调整 */
        height: auto; /* 保持宽高比，避免拉伸变形 */
        object-fit: contain; /* 确保图片完整显示，不裁剪 */
        border: none; /* 可选：移除默认边框 */
    }
</style>