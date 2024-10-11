import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'

export default function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
          About JTL FUND
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            JTL FUND is a pioneering crowdfunding platform based in the vibrant city of Fukuoka, Japan. Founded by a team of passionate anime and manga enthusiasts, we aim to bridge the gap between creative visionaries and their global audience.
          </p>
          <p className="text-gray-700 mb-4">
            Our mission is to empower anime and manga creators, bringing innovative projects to life while fostering a vibrant community of otaku around the world. We believe in the power of crowdfunding to turn creative visions into reality, especially in the rich and diverse world of Japanese animation and comics.
          </p>
          <div className="relative w-full h-64 md:h-96">
            <Image src="https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Fukuoka Cityscape" layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-700 mb-4">
            At JTL FUND, we envision a world where every anime and manga creator has the opportunity to bring their unique stories to life. We strive to be the go-to platform for innovative anime and manga projects, connecting creators with passionate fans who are eager to support the next big thing in Japanese pop culture.
          </p>
          <div className="relative w-full h-64 md:h-96">
            <Image src="https://images.unsplash.com/photo-1578632292335-df3abbb0d586?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Anime Artwork" layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-gray-700 mb-4">
            Whether you're a creator with a groundbreaking anime concept, a manga artist looking to publish your work, or a fan eager to support the next big hit, JTL FUND is your home. Join our thriving community and be part of the future of anime and manga.
          </p>
          <div className="relative w-full h-64 md:h-96">
            <Image src="https://images.unsplash.com/photo-1613376023733-0a73315d9b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Anime Fans" layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
        </div>

        <div className="text-center">
          <Link href="/discover">
            <Button className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-pink-600 hover:to-indigo-600 transition-all">
              Explore Projects
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}