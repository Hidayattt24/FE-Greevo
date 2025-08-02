"use client";

import React, { useState } from "react";
import { MobilePageLayout } from "@/components";

interface Post {
  id: number;
  user: {
    name: string;
    avatar: string;
    level: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean;
  tags: string[];
}

const postsData: Post[] = [
  {
    id: 1,
    user: {
      name: "Sarah Wijaya",
      avatar: "SW",
      level: "Eco Warrior",
    },
    content:
      "Berhasil mengidentifikasi 10 botol plastik hari ini! Mari kita jaga lingkungan bersama-sama 🌱 #RecycleChallenge",
    image: "/placeholder-recycle.jpg",
    likes: 24,
    comments: 8,
    shares: 3,
    timestamp: "2025-08-02T10:30:00Z",
    isLiked: false,
    tags: ["RecycleChallenge", "EcoFriendly"],
  },
  {
    id: 2,
    user: {
      name: "Ahmad Hidayat",
      avatar: "AH",
      level: "Green Hero",
    },
    content:
      "Tips: Sebelum membuang botol plastik, pastikan untuk mencuci bersih dan melepas label. Ini akan memudahkan proses daur ulang!",
    likes: 31,
    comments: 12,
    shares: 7,
    timestamp: "2025-08-02T08:15:00Z",
    isLiked: true,
    tags: ["Tips", "Recycling"],
  },
  {
    id: 3,
    user: {
      name: "Rina Sari",
      avatar: "RS",
      level: "Eco Beginner",
    },
    content:
      "Hari pertama menggunakan Greevo! Excited banget bisa ikut berkontribusi untuk lingkungan. Target minggu ini 50 poin! 💪",
    likes: 18,
    comments: 5,
    shares: 2,
    timestamp: "2025-08-01T16:45:00Z",
    isLiked: false,
    tags: ["Newbie", "Motivation"],
  },
];

export default function ActivitySharingPage() {
  const [posts, setPosts] = useState<Post[]>(postsData);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Baru saja";
    if (diffInHours < 24) return `${diffInHours} jam lalu`;
    if (diffInHours < 48) return "Kemarin";
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: posts.length + 1,
        user: {
          name: "Anda",
          avatar: "AN",
          level: "Eco Enthusiast",
        },
        content: newPostContent,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: new Date().toISOString(),
        isLiked: false,
        tags: [],
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      setShowCreatePost(false);
    }
  };

  return (
    <MobilePageLayout title="Berbagi Aktivitas">
      <div className="p-4 space-y-4">
        {/* Create Post Button */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <button
            onClick={() => setShowCreatePost(true)}
            className="w-full text-left p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-500"
          >
            Bagikan aktivitas atau tips ramah lingkungan...
          </button>
        </div>

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="bg-white w-full rounded-t-xl p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Buat Postingan</h3>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">AN</span>
                  </div>
                  <div>
                    <p className="font-medium">Anda</p>
                    <p className="text-xs text-gray-500">Eco Enthusiast</p>
                  </div>
                </div>

                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Bagikan pengalaman, tips, atau pencapaian Anda dalam menjaga lingkungan..."
                  className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCreatePost(false)}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleCreatePost}
                    disabled={!newPostContent.trim()}
                    className="flex-1 py-3 px-4 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Bagikan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Community Stats */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-3">Komunitas Greevo</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">1.2k</p>
              <p className="text-sm text-green-100">Anggota Aktif</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">850</p>
              <p className="text-sm text-green-100">Postingan</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">15k</p>
              <p className="text-sm text-green-100">Total Poin</p>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {post.user.avatar}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-sm">{post.user.name}</p>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {post.user.level}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatTimeAgo(post.timestamp)}
                    </p>
                  </div>
                  <button className="p-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="1" fill="currentColor" />
                      <circle cx="12" cy="5" r="1" fill="currentColor" />
                      <circle cx="12" cy="19" r="1" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className="text-gray-800 mb-3">{post.content}</p>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="text-blue-600 text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {post.image && (
                  <div className="bg-gray-100 rounded-lg h-48 mb-3 flex items-center justify-center">
                    <span className="text-gray-500">Gambar Post</span>
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="border-t border-gray-100">
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      {post.likes} suka
                    </span>
                    <span className="text-sm text-gray-600">
                      {post.comments} komentar
                    </span>
                    <span className="text-sm text-gray-600">
                      {post.shares} bagikan
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 flex">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex-1 flex items-center justify-center py-3 space-x-2 hover:bg-gray-50 transition-colors ${
                      post.isLiked ? "text-red-500" : "text-gray-600"
                    }`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill={post.isLiked ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span className="text-sm">Suka</span>
                  </button>

                  <button className="flex-1 flex items-center justify-center py-3 space-x-2 text-gray-600 hover:bg-gray-50 transition-colors">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className="text-sm">Komentar</span>
                  </button>

                  <button className="flex-1 flex items-center justify-center py-3 space-x-2 text-gray-600 hover:bg-gray-50 transition-colors">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                    </svg>
                    <span className="text-sm">Bagikan</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center py-4">
          <button className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
            Muat Lebih Banyak
          </button>
        </div>
      </div>
    </MobilePageLayout>
  );
}
