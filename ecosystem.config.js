module.exports = {
  apps : [
    {
      name: 'blog_api',
      script: 'npm',
      args: 'run start:prod',
      env: {
        "COMMON_VARIABLE": "true"
      },
      env_production: {
        "NODE_ENV": "production" // 环境变量
      }
    }
  ],

  deploy : {
    production : {
      user : 'root',
      host : '80.240.22.42',
      ref  : 'origin/master',
      repo : 'git@github.com:467057463/blog.git',
      path : '/var/www/blog_api',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npm run prebuild && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
};
