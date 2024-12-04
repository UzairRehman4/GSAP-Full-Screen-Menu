"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const menuLinks = [
    {
        path: "/",
        label: "Home"
    },
    {
        path: "/About",
        label: "About"
    },
    {
        path: "/Contact",
        label: "Contact"
    }
]

import "./menu.css"

import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"



const Menu = () => {
    const container = useRef()
    const [isOpen, setIsOpen] = useState(false);

    const tl = useRef()

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    useGSAP(() => {
        gsap.set(".menu-link-item-holder", { y: 75 })
        tl.current = gsap.timeline({ paused: true })
            .to(".menu-overlay", {
                duration: 1.25,
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                ease: "power4.inOut"
            })
            .to(".menu-link-item-holder", {
                duration: 1,
                stagger: 0.1,
                y: 0,
                ease: "power4.inOut",
                delay: -0.75
            })


    }, { scope: container })


    useEffect(() => {
        if (isOpen) {
            tl.current.play()
        } else {
            tl.current.reverse()
        }
    }, [isOpen])



    return (
        <div className='menu-container' ref={container}>
            <div className='menu-bar'>
                <div className='menu-logo'>
                    <Link href="/">GSAP</Link>
                </div>
                <div className='menu-open' onClick={toggleMenu}><p>MENU</p></div>
            </div>
            <div className='menu-overlay'>
                <div className='menu-overlay-bar'>
                    <div className='menu-logo'>
                        <Link href={"/"}>GSAP</Link>
                    </div>
                    <div className='menu-close' onClick={toggleMenu}><p>CLOSE</p></div>
                </div>
                <div className='menu-close-icon'>
                    <p>&#x2715;</p>
                </div>
                <div className='menu-copy'>
                    <div className='menu-links'>
                        {menuLinks.map((link, index) => (
                            <div className='menu-link-item' key={index}>
                                <div className='menu-link-item-holder' onClick={toggleMenu}>
                                    <Link href={link.path} className='menu-link'>{link.label}</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='menu-info'>
                        <div className='menu-info-col'>
                            <a href="#">X &#8599;</a>
                            <a href='#'>Instagram &#8599;</a>
                            <a href='#'>LinkedIn &#8599;</a>
                            <a href='#'>Twitter &#8599;</a>
                            <a href='#'>Youtube &#8599;</a>
                            <a href='#'>Email &#8599;</a>
                        </div>
                        <div className='menu-info-col'>
                            <p>info@gsap.com</p>
                            <p>1234567890</p>
                        </div>
                    </div>
                </div>
                <div className='menu-preview'>
                    <p>View Showreel</p>
                </div>
            </div>

        </div>
    )
}

export default Menu