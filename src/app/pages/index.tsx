import useSWR from 'swr';


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
    const { data, error } = useSWR('/api/games', fetcher);
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
            <p className="mt-4 text-lg">This is a simple Next.js application.</p>
            <ul className="mt-8">
                {data.map((game: any) => (
                    <li key={game.id} className="mb-4">
                        <h2 className="text-2xl">{game.name}</h2>
                        <p>{game.description}</p>
                        <img src={game.imageUrl} alt={game.name} width={200} height={200} />
                    </li>
                ))}
            </ul>
        </main>
    );  
}