/* eslint-disable @next/next/no-img-element */
/* eslint-disable tailwindcss/enforces-shorthand */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  Code,
  Palette,
  Coins,
  Globe,
  Database,
  LineChart,
  Smartphone,
  ShieldCheck,
  Zap,
  Cpu,
  Cloud,
  BookOpen,
  Camera,
  Headphones,
  Film,
  Briefcase,
  Layers,
  MessageSquare,
  Lightbulb,
} from "lucide-react"
import { useState } from "react"

const Page = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const categories = [
      { id: "web3", name: "Web3", icon: <Coins className="h-4 w-4" /> },
      { id: "webdev", name: "Web Development", icon: <Code className="h-4 w-4" /> },
      { id: "design", name: "Design", icon: <Palette className="h-4 w-4" /> },
      { id: "blockchain", name: "Blockchain", icon: <Globe className="h-4 w-4" /> },
      { id: "database", name: "Database", icon: <Database className="h-4 w-4" /> },
      { id: "analytics", name: "Analytics", icon: <LineChart className="h-4 w-4" /> },
      { id: "mobile", name: "Mobile Development", icon: <Smartphone className="h-4 w-4" /> },
      { id: "security", name: "Security", icon: <ShieldCheck className="h-4 w-4" /> },
      { id: "performance", name: "Performance", icon: <Zap className="h-4 w-4" /> },
      { id: "ai", name: "Artificial Intelligence", icon: <Cpu className="h-4 w-4" /> },
      { id: "cloud", name: "Cloud Computing", icon: <Cloud className="h-4 w-4" /> },
      { id: "education", name: "Education", icon: <BookOpen className="h-4 w-4" /> },
      { id: "photography", name: "Photography", icon: <Camera className="h-4 w-4" /> },
      { id: "audio", name: "Audio Engineering", icon: <Headphones className="h-4 w-4" /> },
      { id: "video", name: "Video Production", icon: <Film className="h-4 w-4" /> },
      { id: "business", name: "Business", icon: <Briefcase className="h-4 w-4" /> },
      { id: "product", name: "Product Management", icon: <Layers className="h-4 w-4" /> },
      { id: "communication", name: "Communication", icon: <MessageSquare className="h-4 w-4" /> },
      { id: "innovation", name: "Innovation", icon: <Lightbulb className="h-4 w-4" /> },
      { id: "community", name: "Community Building", icon: <Users className="h-4 w-4" /> },
    ]
  
    const mentors = [
      {
        id: 1,
        name: "Alex Johnson",
        categories: ["web3", "blockchain"],
        rate: "$120/hr",
        image: "/placeholder.svg?height=100&width=100",
        availability: "Available now",
        rating: 4.9,
        sessions: 124,
      },
      {
        id: 2,
        name: "Sarah Chen",
        categories: ["webdev", "performance"],
        rate: "$95/hr",
        image: "/placeholder.svg?height=100&width=100",
        availability: "Available in 2 hours",
        rating: 4.8,
        sessions: 87,
      },
      {
        id: 3,
        name: "Miguel Rodriguez",
        categories: ["design", "webdev"],
        rate: "$110/hr",
        image: "/placeholder.svg?height=100&width=100",
        availability: "Available now",
        rating: 4.7,
        sessions: 156,
      },
      {
        id: 4,
        name: "Priya Patel",
        categories: ["blockchain", "web3", "security"],
        rate: "$150/hr",
        image: "/placeholder.svg?height=100&width=100",
        availability: "Available tomorrow",
        rating: 5.0,
        sessions: 92,
      },
      {
        id: 5,
        name: "David Kim",
        categories: ["mobile", "webdev"],
        rate: "$100/hr",
        image: "/placeholder.svg?height=100&width=100",
        availability: "Available now",
        rating: 4.6,
        sessions: 78,
      },
      {
        id: 6,
        name: "Emma Wilson",
        categories: ["design", "product"],
        rate: "$125/hr",
        image: "/placeholder.svg?height=100&width=100",
        availability: "Available in 3 hours",
        rating: 4.9,
        sessions: 134,
      },
      {
        id: 7,
        name: "Omar Hassan",
        categories: ["ai", "database", "cloud"],
        rate: "$140/hr",
        image: "/placeholder.svg?height=100&width=100",
        availability: "Available now",
        rating: 4.8,
        sessions: 67,
      },
      {
        id: 8,
        name: "Sophia Martinez",
        categories: ["business", "communication"],
        rate: "$90/hr",
        image: "/placeholder.svg?height=100&width=100",
        availability: "Available now",
        rating: 4.7,
        sessions: 112,
      },
    ]
  
    const filteredMentors = selectedCategory
      ? mentors.filter((mentor) => mentor.categories.includes(selectedCategory))
      : mentors
  
    const handleCategoryClick = (categoryId: string) => {
      if (selectedCategory === categoryId) {
        setSelectedCategory(null)
      } else {
        setSelectedCategory(categoryId)
      }
    }
  return (
    <div className='w-full overflow-y-auto px-10 pb-4 md:pb-8 h-dvh border-2 rounded-3xl'>
         <div className="max-w-7xl mx-auto mt-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Find Your Perfect Mentor
        </h1>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Browse Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  inline-flex items-center px-3 py-1.5 rounded-full text-sm
                  transition-all duration-300 border
                  ${
                    selectedCategory === category.id
                      ? "bg-purple-500/20 text-purple-300 border-purple-500/50"
                      : "bg-gray-800/50 text-gray-300 border-gray-700 hover:border-gray-600"
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-1.5">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-300">
            {selectedCategory
              ? `Available Mentors for ${categories.find((c) => c.id === selectedCategory)?.name}`
              : "All Available Mentors"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredMentors.map((mentor) => (
                <motion.div
                  key={mentor.id}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(76, 29, 149, 0.1), 0 10px 10px -5px rgba(76, 29, 149, 0.04)",
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={mentor.image || "/placeholder.svg"}
                          alt={mentor.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                        />
                        <div
                          className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-gray-800 
                          ${mentor.availability.includes("now") ? "bg-green-500" : "bg-yellow-500"}`}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{mentor.name}</h3>
                        <div className="flex items-center text-sm text-gray-400">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {mentor.rating}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{mentor.sessions} sessions</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {mentor.categories.map((catId) => {
                        const category = categories.find((c) => c.id === catId)
                        return category ? (
                          <span key={catId} className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                            {category.name}
                          </span>
                        ) : null
                      })}
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-400">{mentor.availability}</div>
                      <div className="text-lg font-bold text-purple-400">{mentor.rate}</div>
                    </div>

                    <button className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                      Schedule Call
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>        
    </div>
  )
}

export default Page