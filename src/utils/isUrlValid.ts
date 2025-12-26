export default async function urlCheck(url: string) {
    try {
        new URL(url);
        const response = await fetch(url, { method: "HEAD" });
        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}