#  Next.js全栈开发

https://nextjs.org，是一个服务器端渲染框架

## 创建项目

```bash
npx create-next-app@latest # 根据提示创建一个项目
```

## 使用pm2启动项目

后台启动next项目，可以关闭命令行端口也不影响

```bash
npm i pm2 -g # 全局安装一次

pm2 start npm --name next-pre-app -- start # 启动
```

## nginx做代理

nginx服务器做代理

```bash
# 配置一下nginx服务器
server {
  listen 3031;
  location / {
    proxy_pass http://localhost:3000;
  }

  # 配置静态资源目录
  location /uploads {
    alias 你的路径;
  }
}
```
