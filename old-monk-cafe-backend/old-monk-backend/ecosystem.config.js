module.exports = {
  apps: [
    {
      name: 'oldmonk-cafe-api',
      script: 'server.js',
      instances: 'max', // cluster mode - utilizes all CPU cores
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
      max_memory_restart: '300M',
      error_file: 'logs/pm2-error.log',
      out_file: 'logs/pm2-out.log',
      time: true,
    },
  ],
};
