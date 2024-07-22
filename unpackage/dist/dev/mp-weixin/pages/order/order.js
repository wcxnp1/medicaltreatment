"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_counter2 = common_vendor.resolveComponent("counter");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_counter2 + _easycom_uni_popup2)();
}
const _easycom_counter = () => "../../components/counter/counter.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_counter + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const app = getApp();
    const order = common_vendor.ref({});
    const orderStatus = common_vendor.computed(() => {
      const map = {
        "待支付": "10",
        "待服务": "20",
        "已完成": "30",
        "已取消": "40"
      };
      return map[order.value.trade_state];
    });
    common_vendor.onLoad((params) => {
      getOrderDetail(params);
    });
    const getOrderDetail = (params) => {
      app.globalData.Utils.request({
        url: "/order/detail",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        data: {
          oid: params.oid
        },
        success: (res) => {
          console.log(res.data, "resorder");
          order.value = res.data;
        }
      });
    };
    const onCounterOver = () => {
      getOrderDetail();
    };
    const qrcodePopup = common_vendor.ref();
    const dopay = () => {
      qrcodePopup.value.open("center");
      var qr = new common_vendor.UQRCode();
      qr.data = order.value.code_url;
      qr.size = 150;
      qr.make();
      var canvasContext = common_vendor.index.createCanvasContext("qrcode");
      qr.canvasContext = canvasContext;
      qr.drawCanvas();
    };
    const payment = () => {
      common_vendor.index.switchTab({
        url: "/pages/order/index"
      });
    };
    const makePhoneCall = (e) => {
      common_vendor.index.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.tel
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n("od-jd od-jd-" + common_vendor.unref(orderStatus)),
        b: common_vendor.unref(orderStatus) == 10
      }, common_vendor.unref(orderStatus) == 10 ? {
        c: common_vendor.o(onCounterOver),
        d: common_vendor.p({
          second: order.value._exp_time
        }),
        e: common_vendor.t(order.value.price),
        f: common_vendor.o(dopay)
      } : {}, {
        g: common_vendor.unref(orderStatus) == 20
      }, common_vendor.unref(orderStatus) == 20 ? common_vendor.e({
        h: order.value.service_state == 0
      }, order.value.service_state == 0 ? {} : {}, {
        i: order.value.service_state == 1
      }, order.value.service_state == 1 ? {} : {}) : {}, {
        j: common_vendor.unref(orderStatus) == 20
      }, common_vendor.unref(orderStatus) == 20 ? {
        k: order.value._staff.avatar_url,
        l: common_vendor.t(order.value._staff.nickname),
        m: common_vendor.o(makePhoneCall),
        n: order.value._staff.mobile
      } : {}, {
        o: common_vendor.o(payment),
        p: common_vendor.sr(qrcodePopup, "2997f6aa-1", {
          "k": "qrcodePopup"
        }),
        q: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/实训/p13/小程序医疗/MYyiliao/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
