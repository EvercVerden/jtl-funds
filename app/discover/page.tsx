"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, Search } from 'lucide-react'
import Image from 'next/image'
import Layout from '../components/Layout'

const allProjects = [
  {
    id: 1,
    title: "Mecha Uprising",
    description: "A thrilling anime series about giant robots and human courage.",
    image: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    progress: 75,
    category: "Anime Series"
  },
  {
    id: 2,
    title: "Sakura's Magical Journey",
    description: "A heartwarming magical girl anime for all ages.",
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    progress: 60,
    category: "Anime Series"
  },
  {
    id: 3,
    title: "Samurai's Honor",
    description: "A historical anime drama set in feudal Japan.",
    image: "https://images.unsplash.com/photo-1611520189922-f7b1ba7d801e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    progress: 40,
    category: "Anime Series"
  },
  {
    id: 4,
    title: "Neko Cafe Adventures",
    description: "A slice-of-life anime about a magical cat cafe.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
    progress: 85,
    category: "Anime Series"
  },
  {
    id: 5,
    title: "Cyberpunk Dreamers",
    description: "A futuristic anime exploring themes of technology and humanity.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    progress: 30,
    category: "Anime Series"
  },
  {
    id: 6,
    title: "Mystic Cookbook",
    description: "A fantasy cooking manga with magical recipes.",
    image: "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    progress: 50,
    category: "Manga"
  }
]

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects = allProjects.filter(project => 
    (selectedCategory === 'All' || project.category === selectedCategory) &&
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = ['All', ...Array.from(new Set(allProjects.map(project => project.category)))]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
          Discover Anime Projects
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-2xl hover:scale-105">
              <div className="relative w-full h-48">
                <Image src={project.image} alt={project.title} layout="fill" objectFit="cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-indigo-500">{project.category}</span>
                  <Heart className="h-5 w-5 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                <Progress value={project.progress} className="h-2 mb-2" />
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{project.progress}% funded</span>
                  <span>3 days left</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}