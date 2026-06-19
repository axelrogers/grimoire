import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub repo name so asset paths resolve under
// https://<user>.github.io/<repo>/  — change 'grimoire' if you name the repo differently.
export default defineConfig({
  base: '/grimoire/',
  plugins: [react()],
})
