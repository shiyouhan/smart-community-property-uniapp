
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/index/index","pages/message/message","pages/my/my","pages/password-edit/password-edit","pages/community-activity/community-activity","pages/activity-edit/activity-edit","pages/activity-promulgate/activity-promulgate","pages/community-announcement/community-announcement","pages/announcement-promulgate/announcement-promulgate","pages/announcement-edit/announcement-edit","pages/fleamarket/fleamarket","pages/goods-detail/goods-detail","pages/communication/communication","pages/search/search","pages/complaints/complaints","pages/complaints-detail/complaints-detail","pages/property-purchase/property-purchase","pages/purchase-statistics/purchase-statistics","pages/repair-process/repair-process","pages/repair-detail/repair-detail","pages/signin/signin","pages/signin-statistic/signin-statistic","pages/property-payment/property-payment","pages/user-edit/user-edit","pages/feedback/feedback"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#f5820f","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#333333","borderStyle":"white","selectedColor":"#5c8396","backgroundColor":"#FFFFFF","height":"54px","fontSize":"10px","iconWidth":"24px","spacing":"6px","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/images/tabbar/index.png","selectedIconPath":"static/images/tabbar/index-active.png"},{"pagePath":"pages/message/message","text":"消息","iconPath":"static/images/tabbar/property.png","selectedIconPath":"static/images/tabbar/property-active.png"},{"pagePath":"pages/my/my","text":"我的","iconPath":"static/images/tabbar/my.png","selectedIconPath":"static/images/tabbar/my-active.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"智慧社区","compilerVersion":"3.4.14","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","navigationBarTextStyle":"black","enablePullDownRefresh":false,"navigationBarBackgroundColor":"transparent"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"主页"}},{"path":"/pages/message/message","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"消息","enablePullDownRefresh":false}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":false}},{"path":"/pages/password-edit/password-edit","meta":{},"window":{"navigationBarTitleText":"修改密码","enablePullDownRefresh":false}},{"path":"/pages/community-activity/community-activity","meta":{},"window":{"navigationBarTitleText":"小区活动","enablePullDownRefresh":false,"titleNView":{"buttons":[{"text":"发布","fontSize":"16px","fontWeight":"bold","width":"78px"}]}}},{"path":"/pages/activity-edit/activity-edit","meta":{},"window":{"navigationBarTitleText":"活动编辑","enablePullDownRefresh":false}},{"path":"/pages/activity-promulgate/activity-promulgate","meta":{},"window":{"navigationBarTitleText":"活动发布","enablePullDownRefresh":false}},{"path":"/pages/community-announcement/community-announcement","meta":{},"window":{"navigationBarTitleText":"小区公告","enablePullDownRefresh":false,"titleNView":{"buttons":[{"text":"发布","fontSize":"16px","fontWeight":"bold","width":"78px"}]}}},{"path":"/pages/announcement-promulgate/announcement-promulgate","meta":{},"window":{"navigationBarTitleText":"公告发布","enablePullDownRefresh":false}},{"path":"/pages/announcement-edit/announcement-edit","meta":{},"window":{"navigationBarTitleText":"公告编辑","enablePullDownRefresh":false}},{"path":"/pages/fleamarket/fleamarket","meta":{},"window":{"navigationBarTitleText":"跳蚤市场","enablePullDownRefresh":true}},{"path":"/pages/goods-detail/goods-detail","meta":{},"window":{"navigationBarTitleText":"商品详情","enablePullDownRefresh":false}},{"path":"/pages/communication/communication","meta":{},"window":{"navigationBarTitleText":"社区交流","enablePullDownRefresh":true,"titleNView":{"buttons":[{"color":"#FFFFFF","float":"right","fontSize":"20px","fontSrc":"/static/font/iconfont.ttf","text":"","width":"40px"}]}}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarTitleText":"搜索","enablePullDownRefresh":true}},{"path":"/pages/complaints/complaints","meta":{},"window":{"navigationBarTitleText":"投诉处理","enablePullDownRefresh":false}},{"path":"/pages/complaints-detail/complaints-detail","meta":{},"window":{"navigationBarTitleText":"投诉详情","enablePullDownRefresh":false}},{"path":"/pages/property-purchase/property-purchase","meta":{},"window":{"navigationBarTitleText":"物业采购","enablePullDownRefresh":false,"titleNView":{"buttons":[{"text":"采购记录","fontSize":"16px","fontWeight":"bold","width":"78px"}]}}},{"path":"/pages/purchase-statistics/purchase-statistics","meta":{},"window":{"navigationBarTitleText":"采购记录","enablePullDownRefresh":true,"onReachBottomDistance":200}},{"path":"/pages/repair-process/repair-process","meta":{},"window":{"navigationBarTitleText":"报修处理","enablePullDownRefresh":false}},{"path":"/pages/repair-detail/repair-detail","meta":{},"window":{"navigationBarTitleText":"报修详情","enablePullDownRefresh":false}},{"path":"/pages/signin/signin","meta":{},"window":{"navigationBarTitleText":"考勤签到","enablePullDownRefresh":false,"titleNView":{"buttons":[{"text":"考勤统计","fontSize":"16px","fontWeight":"bold","width":"78px"}]}}},{"path":"/pages/signin-statistic/signin-statistic","meta":{},"window":{"navigationBarTitleText":"考勤统计","enablePullDownRefresh":false}},{"path":"/pages/property-payment/property-payment","meta":{},"window":{"navigationBarTitleText":"物业缴费","enablePullDownRefresh":false}},{"path":"/pages/user-edit/user-edit","meta":{},"window":{"navigationBarTitleText":"个人资料","enablePullDownRefresh":false,"titleNView":{"buttons":[{"text":"保存","fontSize":"16px","fontWeight":"bold","width":"78px"}]}}},{"path":"/pages/feedback/feedback","meta":{},"window":{"navigationBarTitleText":"意见反馈","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
