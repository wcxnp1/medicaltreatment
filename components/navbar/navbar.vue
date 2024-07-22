<template>
	<view class="nav">
		<!-- 状态栏的盒子 -->
		<view :style="'height:' + status+'rpx;'+constailneStyle">
		</view>
		<view class="hadNav" v-if="iNsms"
			:style="'height:'+navviteilgn+'rpx;line-height:'+navviteilgn+'rpx;padding-left:20rpx'">
			<text class="city">
				中部战区
			</text>
			<!-- {{menu.height}} -->
			<view style="flex: 1;">

				<navigator url="../../pages/search/index.vue" class="haednavigator"
					:style="'height:'+(menu.height*2)+'rpx;line-height:'+(menu.height*2)+'rpx;margin-top:'+(menu.top*2-status)+'rpx;margin-right:'+(menu.width*2+24)+'rpx'">
					<text class="city-scher">找医院</text>
				</navigator>
			</view>
		</view>
		<view class="navbar" :style="'height:'+navviteilgn+'rpx;'+constailneStyle" v-else>
			<view class="back-icon" @click="backHome">
				<image v-if="pages>1" src="../../static/images/ic_back.png" mode=""></image>
				<image v-else src="../../static/images/ic_home.png" mode=""></image>
			</view>
			<view class="nav-title" v-if="textset">
				<view :style="'height:'+navviteilgn+'rpx;line-height:'+navviteilgn+'rpx;'+textStyle">
					{{textset}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onBeforeMount,
		ref,
		reactive
	} from "vue"
	onBeforeMount(() => {
		headheiftg()
		setStyle()
		emits('navBarAttached',{
			  detail:{
				    statusHeight:status.value,
					navHeight:navviteilgn.value,
					navBarHeight:status.value+navviteilgn.value
			  }
		})
	})
	const emits=defineEmits(['navBarAttached'])
	const props = defineProps({
		background: {
			type: String,
			default: 'rgba(255,255,255,1)'
		},
		color: {
			type: String,
			default: 'rgba(0,0,0,1)'
		},
		fontsize: {
			type: Number,
			default: 32
		},
		iconwidth: {
			type: Number,
			default: 116
		},
		iconheight: {
			type: Number,
			default: 38
		},
		textset: {
			type: String,
			default: ''
		},
		iNsms: {
			type: Boolean,
			default: false
		}
	})
	// 状态栏的高度
	const status = ref(0)
	// 内容的高度
	const navviteilgn = ref(0)
	//计算状态栏的高度
	// 页面栈的数量
	const pages = ref(getCurrentPages().length)
	// 计算右侧按钮的位置
	let menu = reactive(uni.getMenuButtonBoundingClientRect())
	console.log(menu, 'menu');
	const headheiftg = () => {
		const {
			statusBarHeight,
			system
		} = uni.getSystemInfoSync()
		// 因为默认是750的屏幕宽度，而我们使用的是350的屏幕宽度
		status.value = statusBarHeight * 2
		const isios = system.indexOf('iOS') > -1
		if (!isios) {
			navviteilgn.value = 96
		} else {
			navviteilgn.value = 88
		}
		console.log('pages', pages.value);
	}
	// 背景颜色
	const constailneStyle = ref('')
	// 字体样式
	const textStyle = ref('')
	// 图标样式
	const iconStyle = ref('')
	const setStyle = () => {
		constailneStyle.value = ["background:" + props.background].join(';')
		textStyle.value = ['color:' + props.color, 'font-size:' + props.fontsize + 'rpx'].join(';')
		iconStyle.value = ['width:' + props.iconwidth + 'rpx', 'height:' + props.iconheight + 'rpx'].join(';')



	}
	// 跳转
	const backHome = () => {
		if (pages.value > 1) {
			uni.navigateBack()
		} else {
			uni.switchTab({
				url: '/pages/index/index'
			})
		}
	}
</script>

<style>
	.nav {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 2;
	}

	.back-icon {
		display: flex;
		align-items: center;
		width: 64rpx;
		height: 100%;
		margin-left: 20rpx;
	}

	.back-icon image {
		width: 64rpx;
		height: 64rpx;

	}

	.navbar {
		position: relative;
		/* padding-left: 20rpx; */
	}

	.nav-title {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%);
	}

	/* 中部地区的使用 */
	.city {
		margin-left: 46rpx;
		position: relative;
		font-weight: 700;
		line-height: 76rpx;
	}

	.city::before {
		content: "";
		position: absolute;
		left: -50rpx;
		top: 19rpx;
		width: 44rpx;
		/* 图片的宽度 */
		height: 44rpx;
		/* 图片的高度 */
		background-image: url('@/static/images/card_1.png');
		/* 替换为你的图片路径 */
		background-size: cover;
		background-position: center;

	}

	.city::after {
		content: ">";

	}

	.haednavigator {
		margin-left: 32rpx;
		background: #f4f4f4;
		border-radius: 200rpx;
		text-align: center
	}

	.hadNav {
		display: flex;
		/* justify-content: space-between;
		 align-items: center; */
	}

	.city-scher {
		font-size: 28rpx;
		color: black;
		position: relative;
	}

	.city-scher::before {
		content: "";
		position: absolute;
		left: -30rpx;
		top: 6rpx;
		background-image: url("@/static/images/ic_search.png");
		width: 26rpx;
		height: 26rpx;
		background-size: cover;

	}
</style>