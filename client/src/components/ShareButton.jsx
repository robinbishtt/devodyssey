// In your BlogDetailPage.jsx or a ShareButton component
import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FaWhatsapp, FaInstagram, FaLinkedin, FaTwitter, FaSlack, FaDiscord, FaShareAlt } from "react-icons/fa";
import { LuClipboardCopy } from "react-icons/lu";

const ShareButton = ({ blog }) => {
    const [open, setOpen] = useState(false);
    const url = window.location.origin + "/blogs/" + encodeURIComponent(blog.title);
    const title = blog.title;
    const text = blog.content?.substring(0, 100) + '...';
    const sharePlatforms = [
        { name: "WhatsApp", icon: <FaWhatsapp />, url: (title, url) => `https://wa.me/?text=${encodeURIComponent(title + " " + url)}` },
        { name: "Instagram", icon: <FaInstagram />, url: () => "https://www.instagram.com/" },
        { name: "LinkedIn", icon: <FaLinkedin />, url: (title, url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
        { name: "Twitter", icon: <FaTwitter />, url: (title, url) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
        { name: "Slack", icon: <FaSlack />, url: () => "https://slack.com/" },
        { name: "Discord", icon: <FaDiscord />, url: () => "https://discord.com/" },
    ];

    const handleShare = async (e) => {
        e.stopPropagation();
        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
            } catch (error) {
                // fallback to modal
                setOpen(true);
                console.log(error)
            }
        } else {
            setOpen(true);
        }
    };
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }

    return (
        <>
            <span className="flex items-center gap-2 hover:text-white/70" onClick={handleShare}>
                <FaShareAlt size={12} /> Share
            </span>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setOpen(false)}>
                    <div className="relative w-full max-w-md p-6 bg-gray-900 shadow-2xl rounded-xl" onClick={e => e.stopPropagation()}>
                        <button className="absolute p-1 rounded-full top-2 right-2 text-white/60 hover:text-white hover:bg-red-600" onClick={() => setOpen(false)}>
                            <CgClose size={12} />
                        </button>
                        <h2 className="mb-4 text-lg font-bold text-white">Share this blog</h2>
                        <div className="flex flex-wrap gap-4 mb-4">
                            {sharePlatforms.map(platform => (
                                <a
                                    key={platform.name}
                                    href={platform.url(title, url)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-2 text-white transition bg-gray-800 rounded-full hover:bg-blue-600"
                                >
                                    {platform.icon}
                                    <span className="hidden sm:inline">{platform.name}</span>
                                </a>
                            ))}
                            <button
                                className="flex items-center gap-2 px-3 py-2 text-white transition bg-gray-800 rounded-full hover:bg-blue-600"
                                onClick={() => copyToClipboard(url)}
                            >
                                <LuClipboardCopy />
                                <span className="hidden sm:inline">Copy Link</span>
                            </button>
                        </div>
                        <p className="text-xs text-white/60">Share the link or post directly to your favorite platform.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShareButton;