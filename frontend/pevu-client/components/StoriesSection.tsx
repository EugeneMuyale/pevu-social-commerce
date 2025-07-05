import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Plus, Play, Pause, Volume2, VolumeX, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Story {
  id: number;
  userId: number;
  username: string;
  avatar?: string;
  videoUrl: string;
  duration: number; // in seconds
  hasStory: boolean;
  isViewed: boolean;
  viewCount: number;
}

interface StoriesSectionProps {
  stories: Story[];
  onStoryClick: (storyId: number) => void;
  onAddStory: () => void;
}

const StoriesSection: React.FC<StoriesSectionProps> = ({ 
  stories, 
  onStoryClick, 
  onAddStory 
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showStoryViewer, setShowStoryViewer] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleStoryClick = (index: number) => {
    setActiveStoryIndex(index);
    setShowStoryViewer(true);
    setIsPlaying(true);
  };

  const closeStoryViewer = () => {
    setShowStoryViewer(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const nextStory = () => {
    if (activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    } else {
      closeStoryViewer();
    }
  };

  const previousStory = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnded = () => {
    nextStory();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && progressRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      progressRef.current.style.width = `${progress}%`;
    }
  };

  useEffect(() => {
    if (showStoryViewer && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [showStoryViewer, activeStoryIndex]);

  const activeStory = stories[activeStoryIndex];

  return (
    <>
      {/* Stories Preview */}
      <section className="mb-8">
        <div className="flex items-center space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {/* Add Story Button */}
          <Card 
            className="flex-shrink-0 w-20 h-20 cursor-pointer hover:shadow-md transition-shadow"
            onClick={onAddStory}
          >
            <CardContent className="p-0 h-full flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-1">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Add Story</span>
            </CardContent>
          </Card>

          {/* Story Items */}
          {stories.map((story, index) => (
            <Card 
              key={story.id}
              className={`flex-shrink-0 w-20 h-20 cursor-pointer hover:shadow-md transition-all duration-300 ${
                story.isViewed ? 'opacity-60' : ''
              }`}
              onClick={() => handleStoryClick(index)}
            >
              <CardContent className="p-0 h-full relative overflow-hidden">
                {/* Video Thumbnail */}
                <video 
                  src={story.videoUrl}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  onMouseEnter={(e) => {
                    e.currentTarget.play();
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />

                {/* Story Ring */}
                {story.hasStory && !story.isViewed && (
                  <div className="absolute inset-0 rounded-lg ring-2 ring-gradient-to-r from-pink-500 to-orange-500 ring-offset-2 ring-offset-white"></div>
                )}

                {/* Username */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1">
                  <span className="text-xs text-white font-medium truncate block">
                    {story.username}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Story Viewer Modal */}
      {showStoryViewer && activeStory && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800">
            <div 
              ref={progressRef}
              className="h-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-100"
            />
          </div>

          {/* Header */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activeStory.avatar} alt={activeStory.username} />
                <AvatarFallback className="bg-gradient-to-br from-pink-500 to-orange-500 text-white text-sm font-semibold">
                  {activeStory.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="text-white font-medium">{activeStory.username}</span>
                <div className="text-white/70 text-xs">{activeStory.viewCount} views</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={closeStoryViewer}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Video Player */}
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              src={activeStory.videoUrl}
              className="max-w-full max-h-full object-contain"
              muted={isMuted}
              onEnded={handleVideoEnded}
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Play/Pause Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 opacity-0 hover:opacity-100 transition-opacity"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </Button>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-white hover:bg-white/20"
              onClick={previousStory}
              disabled={activeStoryIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-white hover:bg-white/20"
              onClick={nextStory}
              disabled={activeStoryIndex === stories.length - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Mute Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-4 right-4 text-white hover:bg-white/20"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
          </div>

          {/* Story Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {stories.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeStoryIndex 
                    ? 'bg-white' 
                    : index < activeStoryIndex 
                      ? 'bg-white/50' 
                      : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default StoriesSection; 