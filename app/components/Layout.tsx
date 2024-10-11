"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Search, Menu, Plus } from 'lucide-react'
import SignInModal from './SignInModal'
import CreateProjectModal from './CreateProjectModal'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <nav className="bg-white bg-opacity-90 p-4 sticky top-0 z-10 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
            JTL FUND
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/discover" className="text-gray-600 hover:text-gray-900 transition-colors">Discover</Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Start a Project</Link>
            <Link href="/community" className="text-gray-600 hover:text-gray-900 transition-colors">Community</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About Us</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Button 
              className="hidden md:inline-flex bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold rounded-full hover:from-pink-600 hover:to-indigo-600 transition-all"
              onClick={() => setIsSignInModalOpen(true)}
            >
              Sign In
            </Button>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="bg-gray-900 text-white py-12 mt-16">
        {/* ... (footer content remains the same) ... */}
      </footer>
      <div className="fixed bottom-8 right-8">
        <Button
          className="rounded-full w-16 h-16 bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 transition-all shadow-lg"
          onClick={() => setIsCreateProjectModalOpen(true)}
        >
          <Plus className="h-8 w-8" />
        </Button>
      </div>
      <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />
      <CreateProjectModal isOpen={isCreateProjectModalOpen} onClose={() => setIsCreateProjectModalOpen(false)} />
    </div>
  )
}