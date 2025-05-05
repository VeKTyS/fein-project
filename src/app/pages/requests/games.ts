import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next'

import { Jeu } from '@prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const jeux: Jeu[] = await prisma.jeu.findMany()
      res.status(200).json(jeux)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching games' })
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, imageUrl } = req.body
      const newJeu: Jeu = await prisma.jeu.create({
        data: {
          name,
          description,
          imageUrl,
        },
      })
      res.status(201).json(newJeu)
    } catch (error) {
      res.status(500).json({ error: 'Error creating game' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}