/// <reference types="vite/client" />

declare module 'virtual:images' {
  /** folder slug under public/images/ → sorted list of public URLs */
  const manifest: Record<string, string[]>
  export default manifest
}
