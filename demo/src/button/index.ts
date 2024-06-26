// eslint-disable-next-line
// @ts-ignore
import { createComponent } from '../../common/helper/create-component'

const EVENT_CLICK = 'click' // 点击
const EVENT_GET_USER_INFO = 'getUserInfo' // 获取用户信息
const EVENT_GET_PHONE_NUMBER = 'getPhoneNumber' // 获取用户手机号
const EVENT_ERROR = 'error' // 错误回调
const EVENT_CONTACT = 'contact' // 客服会话（微信）
const EVENT_OPEN_SETTING = 'openSetting' // 打开授权设置页面（微信）
const EVENT_LAUNCH_APP = 'launchApp' // 打开 APP（微信）
const EVENT_CHOOSE_AVATAR = 'chooseAvatar' // 获取用户头像（微信）
const EVENT_FOLLOW_LIFE_STYLE = 'followLifestyle' // 关注生活号（支付宝）

enum OpenTypeScope {
  PHONE_NUMBER = 'phoneNumber',
  USER_INFO = 'userInfo'
}

createComponent({
  properties: {
    /**
     * @description 激活状态
     * @optional true/false
     */
    active: {
      type: Boolean,
      value: false
    },
    /**
     * @description 禁用状态
     * @optional true/false
     */
    disabled: {
      type: Boolean,
      value: false
    },
    /**
     * @description 加载状态
     * @optional true/false
     */
    loading: {
      type: Boolean,
      value: false
    },
    /**
     * @description 主要的
     * @optional true/false
     */
    primary: {
      type: Boolean,
      value: false
    },
    /**
     * @description 外边框
     * @optional true/false
     */
    outline: {
      type: Boolean,
      value: false
    },
    /**
     * @description 轻按钮
     * @optional true/false
     */
    light: {
      type: Boolean,
      value: false
    },
    /**
     * @description 是否内联
     * @optional true/false
     */
    inline: {
      type: Boolean,
      value: false
    },
    /**
     * @description 图标 Icon，参阅[内置 Icon](https://www.mpxjs.cn/mpx-cube-ui/demo-theme-default/index.html#/pages/icon/index)
     */
    icon: {
      type: String,
      value: ''
    },
    /**
     * @description 图标尺寸大小
     */
    iconSize: {
      type: Number,
      optionalTypes: [String]
    },
    /**
     * @description 辅助文案
     */
    tip: {
      type: String,
      value: ''
    },
    // 文本粗体
    bolder: {
      type: Boolean,
      value: false
    },
    // 微信相关的属性，具体参阅微信[Button文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)和支付宝[Button文档](https://opendocs.alipay.com/mini/component/button)
    openType: {
      type: String,
      value: ''
    },
    // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
    appParameter: String,
    // 小程序语言
    lang: {
      type: String,
      value: 'zh_CN'
    },
    // 会话来源，open-type="contact"时有效
    sessionFrom: {
      type: String,
      value: ''
    },
    // 当前标题
    sendMessageTitle: {
      type: String,
      value: ''
    },
    // 当前分享路径
    sendMessagePath: {
      type: String,
      value: ''
    },
    // 截图
    sendMessageImg: {
      type: String,
      value: ''
    },
    // 微信小程序客服会话卡片
    showMessageCard: {
      type: Boolean,
      value: false
    },
    // 用于 form 组件
    formType: {
      type: String,
      value: ''
    },
    /**
     * @description 支付宝小程序中当 open-type 为 getAuthorize 时有效
     * @optional phoneNumber/userInfo
     */
    scope: String,
    // 支付宝生活号 id，必须是当前小程序同主体且已关联的生活号，open-type="lifestyle" 时有效
    publicId: String,
    /**
     * @description 通过 wx:style透传样式
     * @optional styleConfig.btn 用于透传给组件最外层 / styleConfig.content 用于透传给组件内容区域
     */
    styleConfig: {
      type: Object,
      value: {}
    }
  },
  computed: {
    btnClass() {
      return {
        'cube-btn': true,
        ['cube-btn-' + this.themeType]: this.themeType,
        'cube-btn-inline': this.inline,
        'cube-btn-primary': this.primary,
        'cube-btn-outline': this.outline,
        'cube-btn-outline-primary': this.outline && this.primary,
        'cube-btn-light': this.light,
        'cube-btn_active': this.active,
        'cube-btn_disabled': this.disabled,
        'cube-btn-with-tip': this.tip,
        'cube-btn_bolder': this.bolder,
        'cube-btn-loading': this.loading
      }
    }
  },
  methods: {
    onClick(e: WechatMiniprogram.TouchEvent) {
      if (!this.disabled) {
        // 点击按钮，且在按钮状态不为disabled状态时触发
        // @arg TouchEvent
        this.triggerEvent(EVENT_CLICK, e)
      }
    },
    onGetUserInfo(e: WechatMiniprogram.CustomEvent) {
      // 获取用户信息后触发
      // @arg CustomEvent
      this.triggerEvent(EVENT_GET_USER_INFO, e)
    },
    onGetPhoneNumber(e: WechatMiniprogram.CustomEvent) {
      // 获取用户手机号后触发
      // @arg CustomEvent
      this.triggerEvent(EVENT_GET_PHONE_NUMBER, e)
    },
    onError(e) {
      // 报错后触发
      // @arg -
      this.triggerEvent(EVENT_ERROR, e)
    },
    onContact(e: WechatMiniprogram.CustomEvent) {
      // 打开客服会话后触发
      // @arg CustomEvent
      this.triggerEvent(EVENT_CONTACT, e)
    },
    onOpenSetting(e: WechatMiniprogram.CustomEvent) {
      // 打开授权设置页后触发
      // @arg CustomEvent
      this.triggerEvent(EVENT_OPEN_SETTING, e)
    },
    onLaunchApp(e: WechatMiniprogram.CustomEvent) {
      // 打开 APP 成功后触发
      // @arg CustomEvent
      this.triggerEvent(EVENT_LAUNCH_APP, e)
    },
    onChooseAvatar(e: WechatMiniprogram.CustomEvent) {
      // 微信小程序获取用户头像后触发
      // @arg CustomEvent
      this.triggerEvent(EVENT_CHOOSE_AVATAR, e)
    },
    onFollowLifestyle(e: WechatMiniprogram.CustomEvent) {
      // 支付宝小程序中当 open-type 为 lifestyle 时有效。当点击按钮时触发。
      // @arg CustomEvent
      this.triggerEvent(EVENT_FOLLOW_LIFE_STYLE, e)
    },
    onGetAuthorize(e) {
      if (this.scope === OpenTypeScope.PHONE_NUMBER) {
        this.triggerEvent(EVENT_GET_PHONE_NUMBER, e)
      } else if (this.scope === OpenTypeScope.USER_INFO) {
        this.triggerEvent(EVENT_GET_USER_INFO, e)
      }
    },
    // @vuese
    // 更新 picker 的数据及选中值
    // @arg list 为每一列的数据
    // @arg index 为每一列的数据选中的索引
    // @return 分别表示被选中的索引、文案、值。
    testApi() {
    }
  }
})
