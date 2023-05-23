declare module "@thetalabs/theta-pass" {
  const THETA_DROP_NFT_ABI: Array<any>;

  function requestAccounts(
    redirectUri: string,
    state: string | null,
    usePopup: boolean
  ): Promise<any>;
  function signMessage(
    message: string,
    redirectUri: string,
    state: string | null,
    usePopup: boolean
  ): Promise<any>;
  function getResponse(): Promise<any>;

  export { THETA_DROP_NFT_ABI, requestAccounts, signMessage, getResponse };
}
