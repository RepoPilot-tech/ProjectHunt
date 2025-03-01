"use client"
import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from './navbar'

export function NavBarDemo() {
  const navItems = [
    { name: 'Chat', url: '/', icon: Home },
    { name: 'Mentor', url: '/mentor', icon: User },
    // { name: 'Projects', url: '#', icon: Briefcase },
    // { name: 'Resume', url: '#', icon: FileText }
  ]

  return <NavBar items={navItems} />
}