
export const fetchData = async (url: string | URL | Request) => {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Sunucudan veri alınamadı.');
        }
        return res.json();
    } catch (error) {
        console.error('Hata oluştu:', error);
        return [];
    }
};
