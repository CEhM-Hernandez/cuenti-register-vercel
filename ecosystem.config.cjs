module.exports = {
  apps: [
    {
      name: 'login-business-front',
      script: 'pnpm',
      args: 'start',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
