"use client"

import { useState } from 'react'
import Layout from '../components/Layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const initialPosts = [
  {
    id: 1,
    author: 'Anime Lover',
    handle: '@animelover',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: 'Just backed an amazing new anime project on AniFund! Can\'t wait to see it come to life! #AnimeCreators #Crowdfunding',
    likes: 42,
    comments: [
      { id: 1, author: 'Manga Fan', content: 'That\'s awesome! Which project?' },
      { id: 2, author: 'Otaku Girl', content: 'I backed it too! So excited!' },
    ],
    reposts: 12,
  },
  {
    id: 2,
    author: 'Manga Artist',
    handle: '@mangaartist',
    avatar: 'https://i.pravatar.cc/150?img=2',
    content: 'Working on my new manga series. Thanks to everyone who supported my AniFund campaign! #MangaArt #AniFund',
    likes: 78,
    comments: [
      { id: 1, author: 'Comic Enthusiast', content: 'Can\'t wait to read it!' },
    ],
    reposts: 25,
  },
  {
    id: 3,
    author: 'Otaku Enthusiast',
    handle: '@otakufan',
    avatar: 'https://i.pravatar.cc/150?img=3',
    content: 'Just discovered AniFund! So many exciting anime and manga projects to support. My wallet is in danger! 😅 #AnimeAddict',
    likes: 56,
    comments: [],
    reposts: 15,
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState(initialPosts)
  const [newPost, setNewPost] = useState('')
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)
  const [currentPostId, setCurrentPostId] = useState(null)
  const [newComment, setNewComment] = useState('')

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: 'You',
        handle: '@you',
        avatar: 'https://i.pravatar.cc/150?img=4',
        content: newPost,
        likes: 0,
        comments: [],
        reposts: 0,
      }
      setPosts([post, ...posts])
      setNewPost('')
    }
  }

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const openCommentDialog = (postId) => {
    setCurrentPostId(postId)
    setCommentDialogOpen(true)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      setPosts(posts.map(post => 
        post.id === currentPostId 
          ? { ...post, comments: [...post.comments, { id: post.comments.length + 1, author: 'You', content: newComment }] }
          : post
      ))
      setNewComment('')
      setCommentDialogOpen(false)
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
          AniFund Community
        </h1>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handlePostSubmit} className="mb-8">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?img=4" alt="Your avatar" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <Input
                placeholder="What's happening in the anime world?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="flex-grow"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <Button type="submit">Post</Button>
            </div>
          </form>
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Avatar>
                    <AvatarImage src={post.avatar} alt={post.author} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{post.author}</div>
                    <div className="text-sm text-gray-500">{post.handle}</div>
                  </div>
                </div>
                <p className="mb-4">{post.content}</p>
                <div className="flex justify-between text-gray-500">
                  <Button variant="ghost" size="sm" onClick={() => openCommentDialog(post.id)}>
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.comments.length}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Repeat2 className="w-4 h-4 mr-1" />
                    {post.reposts}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleLike(post.id)}
                    className={post.likes > 0 ? "text-red-500" : ""}
                  >
                    <Heart className="w-4 h-4 mr-1" fill={post.likes > 0 ? "currentColor" : "none"} />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>
          <div className="max-h-[50vh] overflow-y-auto">
            {currentPostId && posts.find(post => post.id === currentPostId).comments.map(comment => (
              <div key={comment.id} className="mb-4">
                <div className="font-semibold">{comment.author}</div>
                <div>{comment.content}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2"
            />
            <Button type="submit">Post Comment</Button>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}