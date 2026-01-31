'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, LayoutDashboard, Home, Users, Menu, X, User as UserIcon, LogOut, Lightbulb, DollarSign, Info } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/context/AuthContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { user, signOut } = useAuth();

    const links = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/studio/setup', label: 'Studio', icon: Sparkles },
        { href: '/recommendations', label: 'Recommend', icon: Lightbulb },
        { href: '/conferences', label: 'Conferences', icon: Users },
        { href: '/pricing', label: 'Pricing', icon: DollarSign },
        { href: '/about', label: 'About', icon: Info },
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-center pointer-events-none">
            <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between pointer-events-auto min-w-[320px] md:min-w-[600px] transition-all duration-300 bg-hydra-bg/80 backdrop-blur-md border border-hydra-lavender/20 shadow-2xl shadow-hydra-purple/10">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 mr-8 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-hydra-purple to-hydra-lavender flex items-center justify-center text-hydra-bg font-bold text-lg shadow-lg group-hover:shadow-hydra-purple/50 transition-all">
                        K
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white block uppercase">Kraper</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {links.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                        const Icon = link.icon;

                        return (
                            <Link key={link.href} href={link.href} className="relative">
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-pill"
                                        className="absolute inset-0 bg-hydra-purple/10 border border-hydra-purple/30 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase transition-colors flex items-center gap-2 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                                    <Icon className="w-4 h-4 text-hydra-lavender" />
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {/* User Profile / Login */}
                <div className="hidden md:flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="User" className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <UserIcon className="w-4 h-4" />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-[#0B0C15] border-white/10 text-white backdrop-blur-xl" align="end">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.displayName || 'Researcher'}</p>
                                        <p className="text-xs leading-none text-gray-400">{user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="cursor-pointer hover:bg-white/5 focus:bg-white/5">
                                        <UserIcon className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <Button size="sm" className="rounded-full px-4 h-8 text-xs font-semibold bg-white text-black hover:bg-gray-200">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-20 left-6 right-6 bg-[#0B0C15] border border-white/10 rounded-2xl p-4 shadow-2xl md:hidden pointer-events-auto"
                >
                    <div className="flex flex-col gap-2">
                        {links.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-3 rounded-xl hover:bg-white/5 flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                                >
                                    <Icon className="w-5 h-5" />
                                    {link.label}
                                </Link>
                            )
                        })}
                        {user ? (
                            <>
                                <div className="h-px bg-white/10 my-2" />
                                <Link href="/profile" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl hover:bg-white/5 flex items-center gap-3 text-white">
                                    <UserIcon className="w-5 h-5" />
                                    Profile
                                </Link>
                                <button onClick={() => { signOut(); setIsOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-500/10 flex items-center gap-3 text-red-400">
                                    <LogOut className="w-5 h-5" />
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                                <Button className="w-full bg-white text-black">Login</Button>
                            </Link>
                        )}
                    </div>
                </motion.div>
            )}
        </nav>
    );
}

