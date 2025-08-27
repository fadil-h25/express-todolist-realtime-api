export function generateLogMetaData(
  reqId: string,
  route: string,
  domain: string,
  scope: string
) {
  return {
    requestId: reqId,
    route,
    domain,
    scope,
  };
}
