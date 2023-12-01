import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.github.kxrxh.lab4',
  appName: 'frontend-lab4',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
