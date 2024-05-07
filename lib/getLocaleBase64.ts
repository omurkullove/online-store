import { getPlaiceholder } from 'plaiceholder';

export default async function getBase64(imageUrl: string) {
    try {
        const res = await fetch(imageUrl);

        if (!res.ok) {
            throw new Error(`Failed to fetch image: ${imageUrl}. Status ${res.status}`);
        }

        const buffer = await res.arrayBuffer();
        const { base64 } = await getPlaiceholder(Buffer.from(buffer));

        return base64;
    } catch (err) {
        console.log(err);
    }
}
