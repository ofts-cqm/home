function unavailable(): never {
  throw new Error("gzip utilities are unavailable in this browser terminal");
}

export const constants = {
  Z_BEST_COMPRESSION: 9,
  Z_BEST_SPEED: 1,
  Z_DEFAULT_COMPRESSION: -1,
};

export function gunzipSync(): never {
  return unavailable();
}

export function gzipSync(): never {
  return unavailable();
}
