export class LocalStorage {
    static setData<T>(key: string, data: T) {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(
            key,
            typeof data === 'string' ? data : JSON.stringify(data),
        );
    }

    static getData<T>(key: string, parseObject = true) {
        if (typeof window === 'undefined') return;
        const data = window.localStorage.getItem(key);
        if (parseObject && data) {
            return JSON.parse(data);
        }
        return data;
    }

    static removeData(key: string) {
        if (typeof window === 'undefined') return;
        window.localStorage.removeItem(key);
    }

    static removeAllData() {
        if (typeof window === 'undefined') return;
        window.localStorage.clear();
    }
}
