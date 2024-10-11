"use client"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Heart, Zap, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from 'next/image'
import Layout from './components/Layout'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const featuredProjects = [
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
  }
]

const carouselItems = [
  { id: 1, image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", title: "Fund the Future of Anime", description: "Support innovative anime projects and ideas" },
  { id: 2, image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80", title: "Empower Anime Creators", description: "Help bring creative visions to life" },
  { id: 3, image: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80", title: "Invest in Anime Innovation", description: "Be part of groundbreaking anime technologies" },
]

const stats = [
  { id: 1, name: "Projects Funded", value: 1200 },
  { id: 2, name: "Total Backers", value: 100000 },
  { id: 3, name: "Success Rate", value: 78 },
  { id: 4, name: "Funds Raised", value: 50000000 },
]

const faqs = [
  { id: 1, question: "How does AniFund work?", answer: "AniFund allows anime creators to raise money for their projects through small contributions from many backers, typically via the internet." },
  { id: 2, question: "What types of anime projects can I fund?", answer: "You can fund a wide variety of anime projects, including TV series, movies, OVAs, manga, and more. Our platform supports creative and innovative ideas across many anime genres." },
  { id: 3, question: "How do I start an anime project?", answer: "To start a project, you'll need to create an account, develop a project plan, set a funding goal, and create a compelling project page. Our team is here to guide you through the process." },
  { id: 4, question: "What happens if an anime project doesn't reach its funding goal?", answer: "If a project doesn't reach its funding goal, no money is collected from backers. This is known as an 'all-or-nothing' funding model, which protects both creators and backers." },
]

export default function EnhancedCrowdfundingHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateStats()
      }
    }, { threshold: 0.5 })

    const statsSection = document.querySelector('#stats-section')
    if (statsSection) observer.observe(statsSection)

    return () => {
      if (statsSection) observer.unobserve(statsSection)
    }
  }, [])

  const animateStats = () => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0

    const interval = setInterval(() => {
      setAnimatedStats(prevStats => 
        prevStats.map((stat, index) => {
          const progress = currentStep / steps
          return Math.round(progress * stats[index].value)
        })
      )

      currentStep++

      if (currentStep > steps) {
        clearInterval(interval)
      }
    }, stepDuration)
  }

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselItems.length) % carouselItems.length)
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <Layout>
      <div className="relative h-[600px] overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-start px-12 md:px-24">
              <div className="text-left text-white max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-bold mb-4">{item.title}</h2>
                <p className="text-xl md:text-2xl mb-8">{item.description}</p>
                <Button className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all">
                  Explore Projects
                </Button>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-all"
        >
          <ChevronLeft className="h-8 w-8 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-all"
        >
          <ChevronRight className="h-8 w-8 text-gray-800" />
        </button>
      </div>

      <main className="container mx-auto px-4 py-12">
        <section id="stats-section" className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
            Our Impact on Anime
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.id} className="text-center">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
                  {stat.name === "Success Rate" ? `${animatedStats[index]}%` : formatNumber(animatedStats[index])}
                </div>
                <div className="text-gray-600">{stat.name}</div>
              </div>
            ))}
          </div>
        </section>

        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
          Featured Anime Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProjects.map((project) => (
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
                <Progress value={project.progress} className="h-2 mb-2" />
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{project.progress}% funded</span>
                  <span>3 days left</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/discover">
            <Button className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-pink-600 hover:to-indigo-600 transition-all">
              Explore All Anime Projects
            </Button>
          </Link>
        </div>
      </main>

      <section className="relative py-24 bg-fixed bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')"}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Bring Your Anime Idea to Life?</h2>
            <p className="text-xl mb-8">Join thousands of anime creators who have successfully funded their dreams through AniFund.</p>
            <Button className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all">
              Start Your Anime Campaign
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
          Why Choose AniFund?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center transition-all hover:shadow-2xl hover:scale-105">
            <div className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-full p-4 inline-block mb-4">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Fast Funding</h3>
            <p className="text-gray-600">Get your anime project funded quickly with our streamlined process and large community of otaku backers.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center transition-all hover:shadow-2xl hover:scale-105">
            <div className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-full p-4 inline-block mb-4">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Supportive Anime Community</h3>
            <p className="text-gray-600">Join a vibrant community of anime creators and backers who are passionate about bringing new anime to life.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center transition-all hover:shadow-2xl hover:scale-105">
            <div className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-full p-4 inline-block mb-4">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">24/7 Otaku Support</h3>
            <p className="text-gray-600">Our dedicated team of anime enthusiasts is always here to help you with any questions or issues you may have.</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`}>
              <AccordionTrigger className="text-left text-lg font-semibold">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </Layout>
  )
}