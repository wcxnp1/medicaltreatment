<template>
	<view>
		<view class="od-banner">
			<image class="od-banner-icon" src="/static/images/od_bg_icon.png" mode="widthFix" />
			<view class="od-jd od-jd-0">
				<view class="od-jd-out">
					<view class="od-jd-in"></view>
				</view>
				<view class="vp-flex od-jd-text">
					<view class="vp-flex_1">
						<text class="od-jd-st-0">填写订单</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-10">在线支付</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-20">专人服务</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-30">服务完成</text>
					</view>
				</view>
			</view>
		</view>
		<view class="pub-box">
			<view class="pub-box-bd">
				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__hd">
						<image class="serv-icon" mode="widthFix"
							:src="servic.icon_image?servic.icon_image_url:'../static/images/avatar.jpg'"></image>
					</view>
					<view class="weui-cell__bd">
						<text class="serv-name">{{servic.name}}</text>
					</view>
					<view class="weui-cell__ft">
						<view class="fs ic_info" @click="headlaTop">
							服务内容
						</view>
					</view>
				</view>
			</view>
			<!-- {{servicid}} -->
			<block v-if="servicid==10||servicid==15||servicid==20">
				<view class="pub-box">
					<view class="pub-box-bd">
						<view class="weui-cell weui-cell_input">
							<view class="weui-cell_hd">
								<view class="weui-label">
									就诊医院
								</view>
								<view class="weui-cell__bd"></view>
								<view class="weui-cell__ft weui-cell__ft_in-access">
									<view>
										<picker @change="onHospitalChange" :value="hospital_index" :range="hospitals"
											range-key="name">
											<input type="text" :disabled="true" placeholder="请选择要就诊的医院"
												:value="hospitals[hospital_index]?.name"
												placeholder-class="vp-placeholder" />
										</picker>
									</view>
								</view>
							</view>
						</view>
						<view class="weui-cell weui-cell_input">
							<view class="weui-cell__hd">
								<view class="weui-label">就诊时间</view>
							</view>
							<view class="weui-cell__bd"></view>
							<view class="weui-cell__ft weui-cell__ft_in-access">
								<view>
									<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
										placeholder="请选择就诊时间"></dtPicker>
								</view>
							</view>
						</view>
						<view class="weui-cell weui-cell_input" @click="onCliemChange">
							<view class="weui-cell__hd">
								<view class="weui-label">就诊人</view>
							</view>
							<view class="weui-cell__bd"></view>
							<view class="weui-cell__ft weui-cell__ft_in-access">
								<view>
									<input type="text" class="weui-input" placeholer-class="vp-placeholer"
										placeholder='请选择就诊人' style="text-align: right;" :disabled="true"
										:value='client.name'>
								</view>
							</view>
						</view>

						<block v-if="servicid == 15">

							<view class="weui-cell weui-cell_input">
								<view class="weui-cell__hd">接送地址</view>
								<view class="weui-cell__bd">
									<input class="weui-input" name="receiveAddress" style="text-align: right"
										placeholder-class="vp-placeholder" placeholder="请填写就诊人所在地址"
										v-model="order.receiveAddress" />
								</view>
							</view>
						</block>
						<view class="weui-cell weui-cell_input">
							<view class="weui-cell__hd">联系电话</view>
							<view class="weui-cell__bd">
								<input class="weui-input" type="number" name="tel" style="text-align: right"
									placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
							</view>
						</view>
					</view>
				</view>
			</block>
			<block v-if="servicid == 30 || servicid == 40">
				<!-- 送取结果,代跑取药 -->
				<view class="pub-box">
					<view class="pub-box-bd">
						<view class="weui-cell weui-cell_input">
							<view class="weui-cell__hd">
								<view class="weui-label">所在医院</view>
							</view>
							<view class="weui-cell__bd"></view>
							<view class="weui-cell__ft weui-cell__ft_in-access">
								<view>
									<picker @change="onHospitalChange" :value="hospital_index" :range="hospitals"
										range-key="name">
										<input type="text" :disabled="true" placeholder="请选择就诊所在医院"
											:value="hospitals[hospital_index].name"
											placeholder-class="vp-placeholder" />
									</picker>
								</view>
							</view>
						</view>

						<view class="weui-cell weui-cell_input">
							<view class="weui-cell__hd">
								<view class="weui-label">服务时间</view>
							</view>
							<view class="weui-cell__bd"></view>
							<view class="weui-cell__ft weui-cell__ft_in-access">
								<view>
									<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
										placeholder="请选择期望服务时间"></dtPicker>
								</view>
							</view>
						</view>

						<view class="weui-cell weui-cell_input" @click="onAddressChange">
							<view class="weui-cell__hd">
								<view class="weui-label">收件信息</view>
							</view>
							<view class="weui-cell__bd"></view>
							<view class="weui-cell__ft weui-cell__ft_in-access">
								<input class="weui-input" :disabled="true" style="text-align: right"
									placeholder-class="vp-placeholder" placeholder="请选择收件信息" :value="
			                                                            order.address.userName
			                                                                ? order.address.userName + '(' + order.address.cityName + order.address.countyName + order.address.detailInfo + ')'
			                                                                : ''
			                                                        " />
								<!-- {{order.address?(order.address.userName+'('+order.address.telNumber+')'):''}} -->
							</view>
						</view>
						<view class="weui-cell weui-cell_input">
							<view class="weui-cell__hd">联系电话</view>
							<view class="weui-cell__bd">
								<input class="weui-input" type="number" name="tel" style="text-align: right"
									placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
							</view>
						</view>
					</view>
				</view>

				<view class="pub-box">
					<view class="pub-box-tt">服务需求</view>
					<view class="pub-box-bd">
						<view class="weui-cell weui-cell_input">
							<view class="weui-cell__bd">
								<textarea name="demand" auto-height placeholder="如有其他服务要求请在此填写.."
									placeholder-class="vp-placeholder" style="min-height: 150rpx"
									v-model="order.demand" />
							</view>
						</view>
					</view>
				</view>
			</block>
			<view class="pub-box">
				<view class="pub-box-tt">服务需求</view>
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__bd">
							<textarea name="demand" auto-height placeholder="请简单描述您要就诊的科室.."
								placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
						</view>
					</view>
				</view>
			</view>
			<view style="height: 300rpx"></view>
			<!-- 悬浮提交按钮 -->
			<view class="vp-foot">
				<view style="background: #ffffff; padding: 20rpx">
					<view class="xieyi" style="text-align: center">
						<text :class="'is_xieyi ' + (is_xieyi ? 'is_xieyi_on' : '')"
							@click="onXieyiChange">我已阅读并同意</text>
						<navigator :url="cfg.page_xy">《用户协议》</navigator>
						<text>和</text>
						<navigator :url="cfg.page_fw">《服务协议》</navigator>
					</view>
					<view>
						<button :class="'btnp ' + (is_xieyi ? '' : 'btnp-disabled')" @click="submit">
							确认下单
							<block v-if="order.price > 0">（支付{{ order.price }}元）</block>
						</button>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="popup-content">
				<view class="group">
					<input class="uni-input" type="tel" v-model="validMobile.phone" placeholder="手机号" />
				</view>
				<view class="group">
					<input class="uni-input" v-model="validMobile.validCode" placeholder="验证码" />
					<text class="valid-text" @click="countdownChange">{{countdown.validText}}</text>
				</view>
			</view>
			<view class="btns">
				<view class="cancal" @click="cancal">取消</view>
				<view class="ok" @click="ok">确定</view>
			</view>
		</uni-popup>
		<uni-popup ref="qrcodePopup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="pay-box">
				<image src="../../static/images/ic_recorder_del.png" mode="" style="width: 30rpx;height: 30rpx;" @click="payment"></image>
				<view class="text-center">
					微信支付
				</view>
				<canvas id="qrcode" canvas-id="qrcode" style="width: 300rpx;height: 300rpx;"></canvas>
			<view class="text-center">
				请用本人微信扫描二维码
			</view>	
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed,
		toRaw,
		nextTick
	} from "vue"
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import UQRCode from 'uqrcodejs'; // npm install uqrcodejs
	onLoad((options) => {
		main_load(options)
	})
	const app = getApp()
	// 弹出框
	const popup = ref()
	// 页面服务详情数据
	const servic = ref({})
	// 页面服务详情数据的id
	const servicid = ref('')
	// 医院数据源
	const hospitals = ref([])
	// 选中医院的索引名
	let hospital_index = ref(0)
	// 手机验证
	const validMobile = reactive({
		phone: "",
		validCode: ''
	})
	//验证码
	const countdown = reactive({
		validText: '获取验证码',
		time: 60
	})
	// 订单数据 
	const order = reactive({
		price: '',
		starttime: '',
		address: {
			userName: '',
			cityName: '',
			countyName: '',
			detailInfo: ''
		},
		receiveAddress: '',
		tel: '',
		demand: ''
	})
	// 就诊人
	const client = reactive({
		name: ''
	})
	// 是否同意协商
	const is_xieyi = ref(false)
	const cfg = reactive({
		page_xy: '',
		page_fw: '',
	})
	// 打开二维码的变量
	const qrcodePopup = ref()
	const main_load = (options) => {
		app.globalData.Utils.request({
			url: '/Service/order',
			data: {
				svid: options.svid,
			},
			success: (res) => {
				servicid.value = res.data.service.stype
				console.log(servicid.value, 'servicid.value');
				if (res.data.service.stype) {
					servic.value = res.data.service
				}
				hospitals.value = res.data.hospitals
				// 默认选中
				const hospitalsData = toRaw(hospitals.value)
				if (options.hid > 0) {
					// 自动选中
					for (let i = 0; i < hospitalsData.length; i++) {
						if (hospitalsData[i].id == options.hid) {
							hospital_index.value = i
							order.price = hospitalsData[i].service_price
							break;
						}
					}
				}
			}
		})
	}
	// 点击弹出服务提醒
	const headlaTop = () => {

	}
	// 改变医院的数据
	const onHospitalChange = (e) => {

		const value = parseInt(e.detail.value)
		hospital_index.value = value
		// console.log(hospitals.value,'hospitals.value');
		order.price = toRaw(hospitals.value)[value].service_price
	}
	// 请选择就诊时间
	const onStartTimeChanged = (e) => {
		order.starttime = e.detail.value
	}
	// 选择就诊人
	const onCliemChange = () => {
		uni.navigateTo({
			url: "/pages/clients/index?act=select"
		})
	}
	//创建监听全局的自定义事件
	uni.$on('clientChange', (data) => {
		client.name = data.name
		client.id = data.user_id
		client.sex = data.sex
		client.mobile = data.mobile
		client.age = data.age
		// console.log(data,'data');
	})
	const onXieyiChange = () => {
		is_xieyi.value = !is_xieyi.value
	}
	const onAddressChange = () => {
		uni.chooseAddress({
			success: (res) => {
				order.address.userName = res.userName
				order.address.cityName = res.cityName
				order.address.countyName = res.countyName
				order.address.detailInfo = res.detailInfo
			},
			fail: (error) => {
				console.log(error, 'error');
			}
		})
	}
	// 下单的功能

	let subsetData // 定义全局的变量用于操作
	const submit = () => {
		console.log(popup, 'popup');
		if (!is_xieyi.value) {
			return uni.showToast({
				title: '请先阅读并同意用于协议和服务协议',
				icon: "none",
				duration: 1000
			})
		}
		const orderData = toRaw(order)
		const serviceData = toRaw(servic.value)
		const hospitalsData = toRaw(hospitals.value)
		const clientData = toRaw(client)
		orderData.service_code = serviceData.code,
			orderData.service_id = serviceData.id,
			orderData.service_name = serviceData.name,
			orderData.service_stype = serviceData.stype

		// 医院的选择效验
		if (serviceData.stype < 100) {
			if (hospital_index.value == 0) {
				return uni.showToast({
					title: '请选择医院',
					icon: 'none',
					duration: 1000
				})
			}
			orderData.hospital_id = hospitalsData[hospital_index.value].id
			orderData.hospital_name = hospitalsData[hospital_index.value].name

		}
		// 就诊时间
		if (!orderData.starttime) {
			return uni.showToast({
				title: '请选择时间',
				icon: 'none',
				duration: 1000
			})
		}
		//服务类型为陪诊
		if (serviceData.stype == 10 || serviceData.stype == 15 || serviceData.stype == 20) {

			// 就诊人的验证
			if (!clientData.id) {
				return uni.showToast({
					title: '请选择就诊人',
					icon: 'none',
					duration: 1000
				})
			}
			orderData.client = {}
			orderData.client.age = client.age
			orderData.client.mobile = client.mobile
			orderData.client.name = client.name
			orderData.client.sex = client.sex
			// 接送地址验证
			if (serviceData.stype == 15) {
				if (!orderData.receiveAddress) {
					return uni.showToast({
						title: '请选择就诊人所在地址',
						icon: 'none',
						duration: 1000
					})
				}
			}
		}
		if (serviceData.stype == 30 || serviceData.stype == 40) {
			//收到地址
			if (!orderData.address.userName) {
				return uni.showToast({
					title: '请选择收件信息',
					icon: 'none',
					duration: 1000
				})
			}
		}

		// 电话
		if (!orderData.tel) {
			return uni.showToast({
				title: '请填写你的联系方式',
				icon: 'none',
				duration: 1000
			})
		}
		// 判断当前用户是否存在
		subsetData = orderData
		if (!uni.getStorageSync('token')) {

			popup.value.open('center')
			// console.log(uni.getStorageSync('token'), 'token');
		} else {
			// 下单的功能
			createOrder(subsetData)
		}
	}
	// 取消
	const cancal = () => {
		// 关闭弹框
		popup.value.close()
	}
	//确地
	const ok = () => {
		// 校验手机号和验证码
		if (!validMobile.phone || !validMobile.validCode) {
			return uni.showToast({
				title: '请检查填写的数据',
				icon: 'none',
				duration: 1000
			})
		}
		/// 验证短信
		app.globalData.Utils.request({
			url: '/user/authentication',
			method: 'POST',
			data: {
				tel: validMobile.phone,
				code: validMobile.validCode
			},
			success: res => {
				console.log(res, 'res');
				// 将TOKEN缓存
				uni.setStorageSync('token', res.data.token)
				// 下单的方法
				createOrder(subsetData)
			},
			fail: res => {
				return uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 1000
				})
			}
		})
	}
	// 验证吗
	// 添加一个标识
	let flog = false
	// 定义全局的qrcodeid
	const countdownChange = () => {
		// 判断手机号是否存在
		if (!validMobile.phone) {
			return uni.showToast({
				title: '请输入手机号',
				icon: 'none',
				duration: 1000
			})
		}
		if (flog) return
		const timer = setInterval(() => {
			if (countdown.time <= 0) {
				countdown.validText = '获取验证码';
				countdown.time = 60; // 重置倒计时  
				flog = false; // 标记为倒计时结束  
				clearInterval(timer); // 清除定时器  
			} else {
				countdown.time -= 1;
				countdown.validText = `剩余${countdown.time}s`;
			}
		}, 1000);
		flog = true
		app.globalData.Utils.request({
			url: '/get/code',
			method: 'POST',
			data: {
				tel: validMobile.phone
			},
			success: res => {
				return uni.showToast({
					title: '验证码发送成功，请即刻填写',
					icon: 'none',
					duration: 1000
				})
			},
			fail: res => {
				return uni.showToast({
					title: 'res.msg',
					icon: 'none',
					duration: 1000
				})
			}
		})
	}
	// 下单的功能
	const createOrder = (orderData) => {
		console.log(orderData, 'orderDatasererer');
		// 调用下单的接口
		app.globalData.Utils.request({
			url: '/pay/createOrder',
			method: 'POST',
			header: {
				token: uni.getStorageSync('token')
			},
			data: orderData,
			success: res => {
				qrcodePopup.value.open('center')
				// 在uQRcode上复制的代码
				var qr = new UQRCode();
				// 设置二维码内容
				qr.data = res.wx_code;
				// 设置二维码大小，必须与canvas设置的宽高一致
				qr.size = 150;
				// 调用制作二维码方法
				qr.make();
				// 获取canvas上下文
				var canvasContext = uni.createCanvasContext('qrcode'); // 如果是组件，this必须传入
				// 设置uQRCode实例的canvas上下文
				qr.canvasContext = canvasContext;
				// 调用绘制方法将二维码图案绘制到canvas上
				qr.drawCanvas();
			},
			fail: res => {
				console.log(res, 'errpr');
			}

		})
	}
	// 跳转的订单列表
	const payment =()=>{
		uni.switchTab({
			url:'/pages/order/index'
		})  
	}
</script>

<style>
	@import url('./index.css');

	.weui-cell_hd {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>