"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  setnavbar();
}
const setnavbar = () => "../../components/navbar/navbar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const sildes = common_vendor.ref([]);
    const nav2s = common_vendor.ref([]);
    const navs = common_vendor.ref([]);
    const hospitals = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      app.globalData.Utils.getUserInfo();
      app.globalData.Utils.request({
        url: "/app/init",
        success: (res) => {
          console.log(res, "init");
          const {
            id
          } = res.data.area;
          app.globalData.Utils.request({
            url: "/Index/index",
            data: {
              aid: id
            },
            success: ({
              data
            }) => {
              sildes.value = data.slides;
              nav2s.value = data.nav2s;
              navs.value = data.navs;
              hospitals.value = data.hospitals;
            }
          });
        }
      });
    });
    const navNav2tap = (e) => {
      const nav = common_vendor.toRaw(nav2s.value)[e.currentTarget.dataset.index];
      jump(nav);
    };
    const onNavtop = (e) => {
      console.log(e, "2");
      const nav = common_vendor.toRaw(navs.value)[e.currentTarget.dataset.index];
      jump(nav);
    };
    const jump = (nav, type) => {
      if (nav.stype == 1) {
        common_vendor.index.navigateTo({
          url: nav.stype_link
        });
      }
    };
    const topHospital = (e) => {
      common_vendor.index.navigateTo({
        url: "../hospital/index?hid=" + e.currentTarget.dataset.hid
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          iNsms: true
        }),
        b: sildes.value.length > 0
      }, sildes.value.length > 0 ? {
        c: common_vendor.f(sildes.value, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: index,
            c: index
          };
        })
      } : {}, {
        d: nav2s.value.length > 0
      }, nav2s.value.length > 0 ? {
        e: common_vendor.f(nav2s.value, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: index,
            c: common_vendor.o(navNav2tap, index),
            d: index
          };
        })
      } : {}, {
        f: navs.value && navs.value.length > 0
      }, navs.value && navs.value.length > 0 ? {
        g: common_vendor.f(navs.value, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: common_vendor.t(item.title),
            c: common_vendor.s("color:" + (item.tcolor ? item.tcolor : "")),
            d: common_vendor.o(onNavtop, index),
            e: index,
            f: index
          };
        })
      } : {}, {
        h: common_vendor.f(hospitals.value, (item, index, i0) => {
          return {
            a: item.avatar_url ? item.avatar_url : "../../static/images/avatar.jpg",
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.rank),
            d: common_vendor.t(item.label),
            e: common_vendor.t(item.intro),
            f: index,
            g: item.id,
            h: common_vendor.o(topHospital, index)
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/实训/p13/小程序医疗/MYyiliao/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
