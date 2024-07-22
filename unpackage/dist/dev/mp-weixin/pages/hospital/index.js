"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_share2 = common_vendor.resolveComponent("share");
  (_easycom_navbar2 + _easycom_share2)();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_share = () => "../../components/share/share.js";
if (!Math) {
  (_easycom_navbar + _easycom_share)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const navBarHeight = common_vendor.ref("");
    const app = getApp();
    const onNavBarAttached = (e) => {
      navBarHeight.value = e.detail.navBarHeight;
    };
    const hospital = common_vendor.ref([]);
    const clone_shareModal = common_vendor.ref(false);
    common_vendor.onLoad((params) => {
      app.globalData.Utils.request({
        url: "/Hospital/index",
        data: {
          hid: params.hid
        },
        success: (res) => {
          hospital.value = res.data.hospital;
          console.log(res, "res");
        }
      });
    });
    const showShareModal = () => {
      clone_shareModal.value = true;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onNavBarAttached),
        b: common_vendor.p({
          ["title-text"]: "",
          isHeight: false,
          isWhite: true,
          background: "none"
        }),
        c: hospital.value.avatar_url,
        d: hospital.value.avatar_url,
        e: common_vendor.t(hospital.value.name),
        f: common_vendor.t(hospital.value.rank),
        g: common_vendor.t(hospital.value.label),
        h: common_vendor.o(showShareModal),
        i: common_vendor.t(hospital.value.city),
        j: common_vendor.t(hospital.value.district),
        k: common_vendor.t(hospital.value.address),
        l: common_vendor.o((...args) => _ctx.toMap && _ctx.toMap(...args)),
        m: common_vendor.f(_ctx.services, (item, index, i0) => {
          return common_vendor.e({
            a: item.use_switch == 1
          }, item.use_switch == 1 ? {
            b: item.logo_image ? item.logo_image_url : "../../resource/images/avatar.jpg",
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.intro),
            e: common_vendor.t(item.price)
          } : {}, {
            f: common_vendor.o((...args) => _ctx.toService && _ctx.toService(...args), index),
            g: item.id,
            h: index
          });
        }),
        n: common_vendor.s("position:absolute;top:" + navBarHeight.value + "rpx;padding-top:65rpx;overflow:hidden;width:100%;"),
        o: common_vendor.p({
          shareModal: clone_shareModal.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/实训/p13/小程序医疗/MYyiliao/pages/hospital/index.vue"]]);
wx.createPage(MiniProgramPage);
