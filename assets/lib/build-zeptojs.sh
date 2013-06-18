# 打包之前确认安装了 zepto 的打包环境
# see: https://github.com/madrobby/zepto


# 用到的 zepto 模块
MODULES="polyfill zepto detect event ajax form fx touch" ./zepto/make dist

# 拷贝
cp ./zepto/dist/zepto.js ./zepto/dist/zepto.min.js ./
