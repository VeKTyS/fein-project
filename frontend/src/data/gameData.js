import { useState, useEffect } from 'react';

export const useGamesData = () => {
    const [data, setData] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:5000/api/details').then(res => res.json()),
            fetch('http://localhost:5000/api/ratings').then(res => res.json())
        ])
        .then(([detailsData, ratingsData]) => {
            setData(detailsData);
            const processedRatings = ratingsData.map(game => ({
                gameId: game.id,
                thumbnail: game.thumbnail,
                value: game.average,
                name: game.name
            })) || [];
            setRatings(processedRatings);
            setLoading(false);
        })
        .catch(err => {
            console.error("Failed to fetch details or ratings:", err);
            setLoading(false);
        });
    }, []);

    return { data, ratings, loading };
};