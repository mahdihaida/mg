"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Heart, Lock, Music, Music2, Image as ImageIcon, Sparkles, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOVE_DATE = new Date("2025-01-25");

const PHOTOS = [
  "https://i.ibb.co/SwwY4zzj/Whats-App-Image-2026-02-12-at-12-56-27-PM.jpg",
  "https://i.ibb.co/hJw6V7pf/Whats-App-Image-2026-02-12-at-12-56-27-PM-2.jpg",
  "https://i.ibb.co/xKmGQtMj/Whats-App-Image-2026-02-12-at-12-56-27-PM-1.jpg",
  "https://i.ibb.co/SwwY4zzj/Whats-App-Image-2026-02-12-at-12-56-27-PM.jpg",
  "https://i.ibb.co/hJw6V7pf/Whats-App-Image-2026-02-12-at-12-56-27-PM-2.jpg",
  "https://i.ibb.co/xKmGQtMj/Whats-App-Image-2026-02-12-at-12-56-27-PM-1.jpg",
];

const REASONS = [
  "أنتِ أجمل ما حدث في حياتي 💝",
  "ابتسامتك تضيء عالمي بأكمله ✨",
  "قلبك الطيب يجعلني أحبك أكثر كل يوم 💖",
  "أنتِ تفهميني أكثر من أي شخص آخر 💕",
  "صوتك هو أجمل صوت في العالم 🎵",
  "حضورك يجعل كل مكان جميلاً 🌹",
  "أحب الطريقة التي تداعبين بها قلبي 🫀",
  "أنتِ سبب سعادتي وابتسامتي 😊",
  "معكِ، كل لحظة تستحق العيش 💫",
  "أنتِ حبيبتي، صديقتي، وكل شيء لي 💗",
];

export default function RomanticPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const days = useMemo(() => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - LOVE_DATE.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "25/1") {
      setIsLoggedIn(true);
      setError("");
      setIsPlaying(true);
      setTimeout(() => {
        const video = document.getElementById('background-music') as HTMLVideoElement;
        if (video) {
          video.play().catch(e => console.log("Auto-play failed:", e));
        }
      }, 500);
    } else {
      setError("كلمة السر غير صحيحة! حاولي مرة أخرى ❤️");
    }
  };

  const toggleMusic = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    if (videoRef.current) {
      if (newState) {
        videoRef.current.play().catch(e => console.log("Play failed:", e));
      } else {
        videoRef.current.pause();
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-rose-100 via-pink-100 to-red-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 shadow-2xl border-rose-200 bg-white/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-pulse" />
                <Lock className="absolute -bottom-2 -right-2 w-6 h-6 text-rose-600" />
              </div>
            </motion.div>

            <h1 className="text-3xl font-bold text-center mb-2 text-rose-800">
              مفاجأة رومانسية 💕
            </h1>
            <p className="text-center text-rose-600 mb-6">
              أدخلي كلمة السر لاكتشاف المفاجأة
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة السر"
                className="text-center text-lg border-rose-300 focus:border-rose-500"
                dir="ltr"
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-center text-sm"
                >
                  {error}
                </motion.p>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg"
              >
                <Heart className="ml-2 h-5 w-5" />
                دخول
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 pb-8">
      {/* Music Player */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={toggleMusic}
          className="bg-rose-500 hover:bg-rose-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
        >
          {isPlaying ? (
            <Music2 className="w-6 h-6" />
          ) : (
            <Music className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Audio Player - Using video element for MP4 files */}
      {isLoggedIn && (
        <video
          ref={videoRef}
          id="background-music"
          controls={false}
          loop
          playsInline
          muted={false}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            width: '32px',
            height: '32px',
            opacity: isPlaying ? '0.9' : '0.3',
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
            borderRadius: '8px',
            zIndex: 40
          }}
          src="/music/love-song.mp4"
          onError={(e) => console.error("Video error:", e)}
          onCanPlay={() => console.log("Video can play")}
        />
      )}

      {/* Photo Lightbox */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={PHOTOS[selectedPhoto]}
              alt="Memory"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              onClick={() => setSelectedPhoto(null)}
              className="fixed top-4 left-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
            >
              إغلاق
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 px-4 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <Heart className="w-20 h-20 text-rose-500 fill-rose-500 mx-auto animate-pulse" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            لحظاتنا الخالدة 💕
          </h1>
          <p className="text-xl md:text-2xl text-rose-700 mb-6">
            مهدي وغدير 🇱🇧❤️🇷🇺
          </p>
          <p className="text-lg text-rose-600">
            بدأت قصتنا في 25 يناير 2025
          </p>
        </div>
      </motion.section>

      {/* Day Counter */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="py-12 px-4"
      >
        <Card className="max-w-2xl mx-auto p-8 bg-white/80 backdrop-blur-sm border-rose-200 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-rose-800">
              معاً منذ
            </h2>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              <div className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-4">
                {days}
              </div>
            </motion.div>
            <p className="text-2xl text-rose-600 font-semibold">يوم حب 💖</p>
          </div>
        </Card>
      </motion.section>

      {/* 10 Reasons I Love You */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="py-12 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-rose-800">
            عشرة أسباب أحبك ❤️
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {REASONS.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-rose-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-lg text-rose-800">{reason}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Love Message */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="py-12 px-4"
      >
        <Card className="max-w-3xl mx-auto p-8 md:p-12 bg-gradient-to-br from-rose-100 to-pink-100 border-rose-300 shadow-xl">
          <div className="text-center">
            <Mail className="w-16 h-16 text-rose-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-8 text-rose-800">
              رسالة حب إلى قلبك 💝
            </h2>
            <div className="text-lg md:text-xl text-rose-900 space-y-4 leading-relaxed">
              <p>
                يا أغلى ما في حياتي،
              </p>
              <p>
                كلمات لا تكفي لوصف ما أشعر به تجاهك. من يوم 25 يناير، تغيرت حياتي بالكامل. أصبحتِ نور عالمي، وسبب سعادتي كل يوم.
              </p>
              <p>
                المسافة بين لبنان وروسيا قد تكون كبيرة، لكن قلوبنا قريبة جداً. كل لحظة معكِ هي هدية أقدرها بكل حب. أنتِ تجعلين الحياة أجمل، والأيام أغنى.
              </p>
              <p>
                أعدك أنني سأحبك أكثر مع كل شروق شمس، وسيبقى قلبي لكِ إلى الأبد.
              </p>
              <p className="text-2xl font-bold mt-8 text-rose-700">
                أحبكِ جداً 💕❤️💗
              </p>
              <p className="text-rose-600">
                من محبك مهدي ❤️
              </p>
            </div>
          </div>
        </Card>
      </motion.section>

      {/* Photo Gallery */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="py-12 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-rose-800">
            <ImageIcon className="inline-block w-10 h-10 ml-3 text-rose-500" />
            ألبوم ذكرياتنا 📸
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PHOTOS.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="relative group cursor-pointer"
                onClick={() => setSelectedPhoto(index)}
              >
                <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-rose-200 shadow-lg">
                  <img
                    src={photo}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-rose-600 mt-6 text-sm">
            اضغطي على أي صورة لتكبيرها ✨
          </p>
        </div>
      </motion.section>

      {/* Romantic Promise Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="py-12 px-4"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="space-y-6"
          >
            <Card className="p-8 md:p-12 bg-gradient-to-br from-rose-200 to-pink-200 border-rose-300 shadow-2xl">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-6"
              >
                <Heart className="w-24 h-24 text-rose-600 fill-rose-600 mx-auto" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-rose-900">
                وعدت لكِ 💕
              </h2>
              <div className="text-xl text-rose-800 mb-8 space-y-4">
                <p>
                  أعدك أن أحبكِ أكثر كل يوم
                </p>
                <p>
                  وأن أقف بجانبكِ دائماً
                </p>
                <p>
                  وأن نبقى معاً للأبد
                </p>
              </div>
              <div className="flex justify-center gap-4 text-4xl mb-6">
                <span>🇱🇧</span>
                <Heart className="h-10 w-10 text-rose-600 fill-rose-600" />
                <span>🇷🇺</span>
              </div>
              <p className="text-2xl font-bold text-rose-700">
                معاً إلى الأبد ❤️
              </p>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-rose-700">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-lg mb-4">
            صنعت بكل حب ❤️ لأغلى شخص في حياتي
          </p>
          <div className="flex justify-center gap-4 text-4xl mb-4">
            <span>🇱🇧</span>
            <Heart className="h-10 w-10 text-rose-500 fill-rose-500 animate-pulse" />
            <span>🇷🇺</span>
          </div>
          <p className="text-sm text-rose-600">
            25 يناير 2025 - للأبد 💕
          </p>
        </div>
      </footer>
    </div>
  );
}
