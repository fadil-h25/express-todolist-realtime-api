export function generateLogMetaData(
  reqId: string,
  route: string,
  domain: string
) {
  return {
    requestId: reqId,
    route,
    domain,
  };
}
