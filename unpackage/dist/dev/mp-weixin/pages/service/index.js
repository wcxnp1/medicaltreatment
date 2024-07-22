"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_dtPicker2 = common_vendor.resolveComponent("dtPicker");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_dtPicker2 + _easycom_uni_popup2)();
}
const _easycom_dtPicker = () => "../../components/dtPicker/dtPicker.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_dtPicker + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onLoad((options) => {
      main_load(options);
    });
    const app = getApp();
    const popup = common_vendor.ref();
    const servic = common_vendor.ref({});
    const servicid = common_vendor.ref("");
    const hospitals = common_vendor.ref([]);
    let hospital_index = common_vendor.ref(0);
    const validMobile = common_vendor.reactive({
      phone: "",
      validCode: ""
    });
    const countdown = common_vendor.reactive({
      validText: "获取验证码",
      time: 60
    });
    const order = common_vendor.reactive({
      price: "",
      starttime: "",
      address: {
        userName: "",
        cityName: "",
        countyName: "",
        detailInfo: ""
      },
      receiveAddress: "",
      tel: "",
      demand: ""
    });
    const client = common_vendor.reactive({
      name: ""
    });
    const is_xieyi = common_vendor.ref(false);
    const cfg = common_vendor.reactive({
      page_xy: "",
      page_fw: ""
    });
    const qrcodePopup = common_vendor.ref();
    const main_load = (options) => {
      app.globalData.Utils.request({
        url: "/Service/order",
        data: {
          svid: options.svid
        },
        success: (res) => {
          servicid.value = res.data.service.stype;
          console.log(servicid.value, "servicid.value");
          if (res.data.service.stype) {
            servic.value = res.data.service;
          }
          hospitals.value = res.data.hospitals;
          const hospitalsData = common_vendor.toRaw(hospitals.value);
          if (options.hid > 0) {
            for (let i = 0; i < hospitalsData.length; i++) {
              if (hospitalsData[i].id == options.hid) {
                hospital_index.value = i;
                order.price = hospitalsData[i].service_price;
                break;
              }
            }
          }
        }
      });
    };
    const headlaTop = () => {
    };
    const onHospitalChange = (e) => {
      const value = parseInt(e.detail.value);
      hospital_index.value = value;
      order.price = common_vendor.toRaw(hospitals.value)[value].service_price;
    };
    const onStartTimeChanged = (e) => {
      order.starttime = e.detail.value;
    };
    const onCliemChange = () => {
      common_vendor.index.navigateTo({
        url: "/pages/clients/index?act=select"
      });
    };
    common_vendor.index.$on("clientChange", (data) => {
      client.name = data.name;
      client.id = data.user_id;
      client.sex = data.sex;
      client.mobile = data.mobile;
      client.age = data.age;
    });
    const onXieyiChange = () => {
      is_xieyi.value = !is_xieyi.value;
    };
    const onAddressChange = () => {
      common_vendor.index.chooseAddress({
        success: (res) => {
          order.address.userName = res.userName;
          order.address.cityName = res.cityName;
          order.address.countyName = res.countyName;
          order.address.detailInfo = res.detailInfo;
        },
        fail: (error) => {
          console.log(error, "error");
        }
      });
    };
    let subsetData;
    const submit = () => {
      console.log(popup, "popup");
      if (!is_xieyi.value) {
        return common_vendor.index.showToast({
          title: "请先阅读并同意用于协议和服务协议",
          icon: "none",
          duration: 1e3
        });
      }
      const orderData = common_vendor.toRaw(order);
      const serviceData = common_vendor.toRaw(servic.value);
      const hospitalsData = common_vendor.toRaw(hospitals.value);
      const clientData = common_vendor.toRaw(client);
      orderData.service_code = serviceData.code, orderData.service_id = serviceData.id, orderData.service_name = serviceData.name, orderData.service_stype = serviceData.stype;
      if (serviceData.stype < 100) {
        if (hospital_index.value == 0) {
          return common_vendor.index.showToast({
            title: "请选择医院",
            icon: "none",
            duration: 1e3
          });
        }
        orderData.hospital_id = hospitalsData[hospital_index.value].id;
        orderData.hospital_name = hospitalsData[hospital_index.value].name;
      }
      if (!orderData.starttime) {
        return common_vendor.index.showToast({
          title: "请选择时间",
          icon: "none",
          duration: 1e3
        });
      }
      if (serviceData.stype == 10 || serviceData.stype == 15 || serviceData.stype == 20) {
        if (!clientData.id) {
          return common_vendor.index.showToast({
            title: "请选择就诊人",
            icon: "none",
            duration: 1e3
          });
        }
        orderData.client = {};
        orderData.client.age = client.age;
        orderData.client.mobile = client.mobile;
        orderData.client.name = client.name;
        orderData.client.sex = client.sex;
        if (serviceData.stype == 15) {
          if (!orderData.receiveAddress) {
            return common_vendor.index.showToast({
              title: "请选择就诊人所在地址",
              icon: "none",
              duration: 1e3
            });
          }
        }
      }
      if (serviceData.stype == 30 || serviceData.stype == 40) {
        if (!orderData.address.userName) {
          return common_vendor.index.showToast({
            title: "请选择收件信息",
            icon: "none",
            duration: 1e3
          });
        }
      }
      if (!orderData.tel) {
        return common_vendor.index.showToast({
          title: "请填写你的联系方式",
          icon: "none",
          duration: 1e3
        });
      }
      subsetData = orderData;
      if (!common_vendor.index.getStorageSync("token")) {
        popup.value.open("center");
      } else {
        createOrder(subsetData);
      }
    };
    const cancal = () => {
      popup.value.close();
    };
    const ok = () => {
      if (!validMobile.phone || !validMobile.validCode) {
        return common_vendor.index.showToast({
          title: "请检查填写的数据",
          icon: "none",
          duration: 1e3
        });
      }
      app.globalData.Utils.request({
        url: "/user/authentication",
        method: "POST",
        data: {
          tel: validMobile.phone,
          code: validMobile.validCode
        },
        success: (res) => {
          console.log(res, "res");
          common_vendor.index.setStorageSync("token", res.data.token);
          createOrder(subsetData);
        },
        fail: (res) => {
          return common_vendor.index.showToast({
            title: res.msg,
            icon: "none",
            duration: 1e3
          });
        }
      });
    };
    let flog = false;
    const countdownChange = () => {
      if (!validMobile.phone) {
        return common_vendor.index.showToast({
          title: "请输入手机号",
          icon: "none",
          duration: 1e3
        });
      }
      if (flog)
        return;
      const timer = setInterval(() => {
        if (countdown.time <= 0) {
          countdown.validText = "获取验证码";
          countdown.time = 60;
          flog = false;
          clearInterval(timer);
        } else {
          countdown.time -= 1;
          countdown.validText = `剩余${countdown.time}s`;
        }
      }, 1e3);
      flog = true;
      app.globalData.Utils.request({
        url: "/get/code",
        method: "POST",
        data: {
          tel: validMobile.phone
        },
        success: (res) => {
          return common_vendor.index.showToast({
            title: "验证码发送成功，请即刻填写",
            icon: "none",
            duration: 1e3
          });
        },
        fail: (res) => {
          return common_vendor.index.showToast({
            title: "res.msg",
            icon: "none",
            duration: 1e3
          });
        }
      });
    };
    const createOrder = (orderData) => {
      console.log(orderData, "orderDatasererer");
      app.globalData.Utils.request({
        url: "/pay/createOrder",
        method: "POST",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        data: orderData,
        success: (res) => {
          qrcodePopup.value.open("center");
          var qr = new common_vendor.UQRCode();
          qr.data = res.wx_code;
          qr.size = 150;
          qr.make();
          var canvasContext = common_vendor.index.createCanvasContext("qrcode");
          qr.canvasContext = canvasContext;
          qr.drawCanvas();
        },
        fail: (res) => {
          console.log(res, "errpr");
        }
      });
    };
    const payment = () => {
      common_vendor.index.switchTab({
        url: "/pages/order/index"
      });
    };
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: servic.value.icon_image ? servic.value.icon_image_url : "../static/images/avatar.jpg",
        b: common_vendor.t(servic.value.name),
        c: common_vendor.o(headlaTop),
        d: servicid.value == 10 || servicid.value == 15 || servicid.value == 20
      }, servicid.value == 10 || servicid.value == 15 || servicid.value == 20 ? common_vendor.e({
        e: (_a = hospitals.value[common_vendor.unref(hospital_index)]) == null ? void 0 : _a.name,
        f: common_vendor.o(onHospitalChange),
        g: common_vendor.unref(hospital_index),
        h: hospitals.value,
        i: common_vendor.o(onStartTimeChanged),
        j: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择就诊时间"
        }),
        k: client.name,
        l: common_vendor.o(onCliemChange),
        m: servicid.value == 15
      }, servicid.value == 15 ? {
        n: order.receiveAddress,
        o: common_vendor.o(($event) => order.receiveAddress = $event.detail.value)
      } : {}, {
        p: order.tel,
        q: common_vendor.o(($event) => order.tel = $event.detail.value)
      }) : {}, {
        r: servicid.value == 30 || servicid.value == 40
      }, servicid.value == 30 || servicid.value == 40 ? {
        s: hospitals.value[common_vendor.unref(hospital_index)].name,
        t: common_vendor.o(onHospitalChange),
        v: common_vendor.unref(hospital_index),
        w: hospitals.value,
        x: common_vendor.o(onStartTimeChanged),
        y: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择期望服务时间"
        }),
        z: order.address.userName ? order.address.userName + "(" + order.address.cityName + order.address.countyName + order.address.detailInfo + ")" : "",
        A: common_vendor.o(onAddressChange),
        B: order.tel,
        C: common_vendor.o(($event) => order.tel = $event.detail.value),
        D: order.demand,
        E: common_vendor.o(($event) => order.demand = $event.detail.value)
      } : {}, {
        F: order.demand,
        G: common_vendor.o(($event) => order.demand = $event.detail.value),
        H: common_vendor.n("is_xieyi " + (is_xieyi.value ? "is_xieyi_on" : "")),
        I: common_vendor.o(onXieyiChange),
        J: cfg.page_xy,
        K: cfg.page_fw,
        L: order.price > 0
      }, order.price > 0 ? {
        M: common_vendor.t(order.price)
      } : {}, {
        N: common_vendor.n("btnp " + (is_xieyi.value ? "" : "btnp-disabled")),
        O: common_vendor.o(submit),
        P: validMobile.phone,
        Q: common_vendor.o(($event) => validMobile.phone = $event.detail.value),
        R: validMobile.validCode,
        S: common_vendor.o(($event) => validMobile.validCode = $event.detail.value),
        T: common_vendor.t(countdown.validText),
        U: common_vendor.o(countdownChange),
        V: common_vendor.o(cancal),
        W: common_vendor.o(ok),
        X: common_vendor.sr(popup, "1911f556-2", {
          "k": "popup"
        }),
        Y: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        }),
        Z: common_vendor.o(payment),
        aa: common_vendor.sr(qrcodePopup, "1911f556-3", {
          "k": "qrcodePopup"
        }),
        ab: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/实训/p13/小程序医疗/MYyiliao/pages/service/index.vue"]]);
wx.createPage(MiniProgramPage);
