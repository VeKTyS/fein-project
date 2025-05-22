import { useState, useEffect } from 'react';
import { openDB } from 'idb';

export const useGamesData = () => {
    const [data, setData] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Init IDB for data compression
    const initDB = async () => {
        return openDB('GameDataDB', 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains('details')) {
                    db.createObjectStore('details', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('ratings')) {
                    db.createObjectStore('ratings', { keyPath: 'gameId' });
                }
            },
        });
    };

    // caching data
    const fetchAndCacheData = async () => {
        console.log('Fetching data from API...');
        try {
            const [detailsData, ratingsData] = await Promise.all([
                fetch('http://localhost:5000/api/details').then(res => res.json()),
                fetch('http://localhost:5000/api/ratings').then(res => res.json())
            ]);

            const optimizedDetails = detailsData.map(({
                id,
                primary_key,
                description,
                yearpublished,
                minplayers,
                maxplayers,
                playingtime,
                minplaytime,
                maxplaytime,
                minage,
                boardgamecategory,
                boardgamemechanic,
                boardgamefamily,
                boardgameexpansion,
                boardgameimplementation,
                boardgamedesigner,
                boardgameartist,
                boardgamepublisher
            }) => ({
                id,
                primary_key,
                description,
                yearpublished,
                minplayers,
                maxplayers,
                playingtime,
                minplaytime,
                maxplaytime,
                minage,
                boardgamecategory,
                boardgamemechanic,
                boardgamefamily,
                boardgameexpansion,
                boardgameimplementation,
                boardgamedesigner,
                boardgameartist,
                boardgamepublisher
            }));

            const processedRatings = ratingsData.map(({ id, thumbnail, average, name }) => ({
                gameId: id,
                thumbnail,
                value: average,
                name,
            }));

            // Store data
            const db = await initDB();
            const tx = db.transaction(['details', 'ratings'], 'readwrite');
            const detailsStore = tx.objectStore('details');
            const ratingsStore = tx.objectStore('ratings');

            // Clear data
            await detailsStore.clear();
            await ratingsStore.clear();

            // Add data
            optimizedDetails.forEach(detail => detailsStore.put(detail));
            processedRatings.forEach(rating => ratingsStore.put(rating));

            await tx.done;
            console.log('Data stored in IndexedDB');

            // Update state
            setData(optimizedDetails);
            setRatings(processedRatings);
            setLoading(false);
            console.log('Data fetched and cached');
        } catch (err) {
            console.error('Failed to fetch details or ratings:', err);
            setLoading(false);
        }
    };

    // Load data
    const loadDataFromIndexedDB = async () => {
        try {
            const db = await initDB();
            const details = await db.getAll('details');
            const ratings = await db.getAll('ratings');

            if (details.length > 0 && ratings.length > 0) {
                setData(details);
                setRatings(ratings);
                setLoading(false);
                console.log('Loaded data from IndexedDB');
            } else {
                fetchAndCacheData();
            }
        } catch (error) {
            console.error('Error loading data from IndexedDB:', error);
            fetchAndCacheData();
        }
    };

    useEffect(() => {
        loadDataFromIndexedDB();
    }, []);

    return { data, ratings, loading };
};