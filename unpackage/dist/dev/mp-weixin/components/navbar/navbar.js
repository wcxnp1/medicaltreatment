"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "navbar",
  props: {
    background: {
      type: String,
      default: "rgba(255,255,255,1)"
    },
    color: {
      type: String,
      default: "rgba(0,0,0,1)"
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
      default: ""
    },
    iNsms: {
      type: Boolean,
      default: false
    }
  },
  emits: ["navBarAttached"],
  setup(__props, { emit: emits }) {
    const props = __props;
    common_vendor.onBeforeMount(() => {
      headheiftg();
      setStyle();
      emits("navBarAttached", {
        detail: {
          statusHeight: status.value,
          navHeight: navviteilgn.value,
          navBarHeight: status.value + navviteilgn.value
        }
      });
    });
    const status = common_vendor.ref(0);
    const navviteilgn = common_vendor.ref(0);
    const pages = common_vendor.ref(getCurrentPages().length);
    let menu = common_vendor.reactive(common_vendor.index.getMenuButtonBoundingClientRect());
    console.log(menu, "menu");
    const headheiftg = () => {
      const {
        statusBarHeight,
        system
      } = common_vendor.index.getSystemInfoSync();
      status.value = statusBarHeight * 2;
      const isios = system.indexOf("iOS") > -1;
      if (!isios) {
        navviteilgn.value = 96;
      } else {
        navviteilgn.value = 88;
      }
      console.log("pages", pages.value);
    };
    const constailneStyle = common_vendor.ref("");
    const textStyle = common_vendor.ref("");
    const iconStyle = common_vendor.ref("");
    const setStyle = () => {
      constailneStyle.value = ["background:" + props.background].join(";");
      textStyle.value = ["color:" + props.color, "font-size:" + props.fontsize + "rpx"].join(";");
      iconStyle.value = ["width:" + props.iconwidth + "rpx", "height:" + props.iconheight + "rpx"].join(";");
    };
    const backHome = () => {
      if (pages.value > 1) {
        common_vendor.index.navigateBack();
      } else {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s("height:" + status.value + "rpx;" + constailneStyle.value),
        b: __props.iNsms
      }, __props.iNsms ? {
        c: common_vendor.s("height:" + common_vendor.unref(menu).height * 2 + "rpx;line-height:" + common_vendor.unref(menu).height * 2 + "rpx;margin-top:" + (common_vendor.unref(menu).top * 2 - status.value) + "rpx;margin-right:" + (common_vendor.unref(menu).width * 2 + 24) + "rpx"),
        d: common_vendor.s("height:" + navviteilgn.value + "rpx;line-height:" + navviteilgn.value + "rpx;padding-left:20rpx")
      } : common_vendor.e({
        e: pages.value > 1
      }, pages.value > 1 ? {} : {}, {
        f: common_vendor.o(backHome),
        g: __props.textset
      }, __props.textset ? {
        h: common_vendor.t(__props.textset),
        i: common_vendor.s("height:" + navviteilgn.value + "rpx;line-height:" + navviteilgn.value + "rpx;" + textStyle.value)
      } : {}, {
        j: common_vendor.s("height:" + navviteilgn.value + "rpx;" + constailneStyle.value)
      }));
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/实训/p13/小程序医疗/MYyiliao/components/navbar/navbar.vue"]]);
wx.createComponent(Component);
