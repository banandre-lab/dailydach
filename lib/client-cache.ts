type CacheEntry<T> = {
  data: T;
  timestamp: number;
  expiry: number;
};

class ClientCache {
  private cache: Map<string, CacheEntry<any>> = new Map();

  get<T>(key: string, fetcher: () => Promise<T>, ttl: number = 60000): Promise<T> {
    const now = Date.now();
    const entry = this.cache.get(key);

    if (entry && entry.timestamp + entry.expiry > now) {
      return Promise.resolve(entry.data);
    }

    return fetcher().then((data) => {
      this.cache.set(key, {
        data,
        timestamp: now,
        expiry: ttl,
      });
      return data;
    });
  }

  clear() {
    this.cache.clear();
  }
}

export const clientCache = new ClientCache();
