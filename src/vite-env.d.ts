/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms access key — https://web3forms.com */
  readonly VITE_WEB3FORMS_KEY?: string;
  /** Cloudflare Worker URL that sends the branded auto-reply email. */
  readonly VITE_AUTO_REPLY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
