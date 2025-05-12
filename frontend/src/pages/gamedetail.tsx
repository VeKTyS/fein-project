"use client"
import React from "react";
import { useParams } from "react-router-dom";

export default function GameDetail() {
    const { id } = useParams();

    return (
        <div className="p-8 text-white">
            <h1 className="text-3xl font-bold">Game Detail</h1>
            <p>Game ID: {id}</p>
            {/* Fetch and display more details about the game here */}
        </div>
    );
}