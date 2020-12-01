module.exports = {
  apps : [
    {
      name: 'blog_nest',
      script: 'dist/main.js',
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
      path : '/var/www/blog_nest/production',
      'pre-deploy-local': '',
      'post-deploy' : 'yarn install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
};
