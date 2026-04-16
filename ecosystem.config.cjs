module.exports = {
  apps: [
    {
      name: 'home-utils',
      cwd: __dirname,
      script: 'npm',
      args: 'run start',
      interpreter: 'none',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
        PORT: '4173',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: '4173',
      },
    },
  ],
}
