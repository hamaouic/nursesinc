/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms access key — https://web3forms.com */
  readonly VITE_WEB3FORMS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
