module.exports = {
  apps : [{
    name: 'cosmos-management', // 应用程序的名称
    script: 'npm', // 启动脚本
    args: 'start', // 传递给脚本的参数
    env: {
      NODE_ENV: 'production', // 生产环境
      EGG_SERVER_ENV: 'prod' // Egg.js 的服务器环境
    },
    env_development: {
      NODE_ENV: 'development', // 开发环境
      EGG_SERVER_ENV: 'dev' // Egg.js 的服务器环境
    },
    watch: false, // 如果不需要文件变动重启，则设置为false
    instances: 1, // 应用实例数
    exec_mode: 'cluster', // 执行模式
    autorestart: true, // 自动重启
    max_memory_restart: '1G', // 最大内存限制后重启
    // 其他配置...
  }]
};