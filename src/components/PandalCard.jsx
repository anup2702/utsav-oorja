import React, { useState, useEffect } from 'react';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { useTranslation } from '../hooks/useTranslation';
import { useFavorites } from '../contexts/FavoritesContext';
import { trackAppEvents } from '../utils/analytics.js';
import voteManager from '../utils/voteManager.js';
import { 
  Heart, 
  Clock, 
  MapPin, 
  Train, 
  Camera, 
  Lightbulb, 
  Navigation,
  Phone,
  Share2,
  Video
} from 'lucide-react';

const PandalCard = React.memo(({ pandal }) => {
  const [isVoting, setIsVoting] = useState(false);
  const [localVotes, setLocalVotes] = useState(pandal.votes);
  const [voteAnimation, setVoteAnimation] = useState(false);
  const [translatedPandal, setTranslatedPandal] = useState(pandal);
  const [hasVoted, setHasVoted] = useState(false);
  const { t, translatePandal } = useTranslation();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Use original pandal data for now to avoid API performance issues
  useEffect(() => {
    setTranslatedPandal(pandal);
  }, [pandal]);

  // Check if user has already voted for this pandal
  useEffect(() => {
    setHasVoted(voteManager.hasVoted(pandal.id));
  }, [pandal.id]);

  const handleVote = async () => {
    if (isVoting || hasVoted) return;
    
    setIsVoting(true);
    setVoteAnimation(true);
    
    try {
      const pandalRef = doc(db, 'pandals', pandal.id);
      await updateDoc(pandalRef, {
        votes: increment(1)
      });
      
      // Update local state
      setLocalVotes(prev => prev + 1);
      setHasVoted(true);
      
      // Store vote in localStorage
      voteManager.addVote(pandal.id);
      
      // Track analytics
      trackAppEvents.pandalVote(translatedPandal.name);
    } catch (error) {
    } finally {
      setIsVoting(false);
      setTimeout(() => setVoteAnimation(false), 1000);
    }
  };

  const handleFavoriteToggle = () => {
    const action = isFavorite(translatedPandal.id) ? 'remove' : 'add';
    toggleFavorite(translatedPandal);
    trackAppEvents.pandalFavorite(translatedPandal.name, action);
  };

  const getCrowdStatusColor = (status) => {
    switch (status) {
      case 'Low': return 'bg-success animate-pulse-slow';
      case 'Medium': return 'bg-warning animate-pulse-slow';
      case 'High': return 'bg-error animate-pulse-slow';
      default: return 'bg-secondary';
    }
  };

  const getCrowdStatusText = (status) => {
    switch (status) {
      case 'Low': return t('lowCrowd');
      case 'Medium': return t('moderate');
      case 'High': return t('highCrowd');
      default: return 'Unknown';
    }
  };

  const getMetroIcon = (line) => {
    switch (line) {
      case 'Blue': return '🚇';
      case 'Green': return '🚇';
      case 'Orange': return '🚇';
      case 'Purple': return '🚇';
      default: return '🚇';
    }
  };

  // Social sharing functions
  const shareText = `🎭 Check out ${translatedPandal.name} - ${translatedPandal.location} during Durga Puja 2025! 🎉🙏\n\n📍 Location: ${translatedPandal.location}\n🕐 Timings: ${translatedPandal.timings}\n\n🗺️ View on Maps: ${translatedPandal.mapsLink}`;

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pandal.mapsLink)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToInstagram = () => {
    // Instagram doesn't support direct link sharing, so we'll copy the text to clipboard
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Share text copied to clipboard! You can now paste it in your Instagram story or post.');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Share text copied to clipboard! You can now paste it in your Instagram story or post.');
    });
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${translatedPandal.name} - Durga Puja 2025`,
          text: shareText,
          url: translatedPandal.mapsLink,
        });
      } catch (error) {
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Share text copied to clipboard!');
      });
    }
  };

  return (
    <div className="bg-bg-primary rounded-2xl shadow-sm overflow-hidden border border-secondary-light hover:shadow-md transition-all duration-300">
      {/* App-like Image Section */}
      <div className="relative">
        <img
          src={translatedPandal.imageURL}
          alt={translatedPandal.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300/8B4513/ffffff?text=Durga+Puja+Pandal';
          }}
        />
        
        {/* Crowd Status Badge - App Style */}
        {pandal.crowdStatus && (
          <div className={`absolute top-3 left-3 ${getCrowdStatusColor(pandal.crowdStatus)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
            <span className="font-inter">{getCrowdStatusText(pandal.crowdStatus)}</span>
          </div>
        )}
      </div>
      
      {/* App-like Card Header */}
      <div className="bg-bg-primary p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div>
              <h3 className="font-inter font-bold text-text-primary text-lg leading-tight">
                {translatedPandal.name}
              </h3>
              <p className="text-text-secondary text-sm font-inter">{translatedPandal.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Favorite Button */}
            <button
              onClick={handleFavoriteToggle}
              className={`p-2 rounded-full transition-all duration-200 ${
                isFavorite(translatedPandal.id) 
                  ? 'bg-accent text-white shadow-lg' 
                  : 'bg-bg-secondary text-text-secondary hover:bg-accent-light hover:text-accent'
              }`}
              title={isFavorite(translatedPandal.id) ? t('removeFromFavorites') : t('addToFavorites')}
            >
              <Heart 
                className={`w-5 h-5 ${
                  isFavorite(translatedPandal.id) ? 'fill-current' : ''
                }`} 
              />
            </button>
            
            {/* Vote Button - App Style */}
            <button
              onClick={handleVote}
              disabled={isVoting || hasVoted}
              className={`relative overflow-hidden px-4 py-2 rounded-full transition-all duration-200 flex items-center shadow-sm ${
                hasVoted 
                  ? 'bg-success text-white cursor-not-allowed' 
                  : isVoting 
                    ? 'bg-secondary-light text-text-tertiary cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-dark text-white'
              } ${voteAnimation ? 'animate-scale-press' : ''}`}
              title={hasVoted ? 'You have already voted for this pandal' : 'Vote for this pandal'}
            >
              {isVoting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              ) : (
                <>
                  <Heart className={`w-4 h-4 mr-1 ${voteAnimation ? 'animate-bounce' : ''} ${hasVoted ? 'fill-current' : ''}`} />
                  <span className="font-inter font-semibold text-sm">{localVotes}</span>
                  {hasVoted && <span className="ml-1 text-xs">✓</span>}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* App-like Content Section */}
      <div className="p-4 bg-bg-primary">
        {/* Metro Info - App Style */}
        {translatedPandal.metroStation && (
          <div className="mb-4 p-3 bg-bg-secondary rounded-xl border border-secondary-light">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-3">
                <Train className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-inter text-text-secondary text-sm">
                  {translatedPandal.metroStation.name}
                  {translatedPandal.metroStation.line && (
                    <span className="ml-2 px-2 py-1 bg-bg-tertiary rounded-full text-xs">
                      {translatedPandal.metroStation.line} {t('line')}
                    </span>
                  )}
                </p>
                {translatedPandal.metroStation.distance && (
                  <p className="font-inter text-text-tertiary text-xs mt-1">
                    {translatedPandal.metroStation.distance} • {translatedPandal.metroStation.walkTime}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        
        {/* App-like Action Buttons */}
        <div className="flex gap-3 mb-4">
          <a
            href={translatedPandal.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-secondary hover:bg-secondary-dark active:scale-95 text-white px-4 py-3 rounded-xl text-center transition-all duration-200 flex items-center justify-center font-inter font-semibold shadow-sm"
          >
            <Navigation className="w-4 h-4 mr-2" />
            {t('map')}
          </a>
          {translatedPandal.reelURL ? (
            <a
              href={translatedPandal.reelURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-purple-500 hover:bg-purple-600 active:scale-95 text-white px-4 py-3 rounded-xl text-center transition-all duration-200 flex items-center justify-center font-inter font-semibold shadow-sm"
            >
              <Video className="w-4 h-4 mr-2" />
              {t('reel')}
            </a>
          ) : (
            <button
              disabled
              className="flex-1 bg-gray-300 text-gray-500 px-4 py-3 rounded-xl text-center transition-all duration-200 flex items-center justify-center font-inter font-semibold shadow-sm cursor-not-allowed"
            >
              <Video className="w-4 h-4 mr-2" />
              {t('reel')}
            </button>
          )}
          <button
            onClick={handleNativeShare}
            className="flex-1 bg-primary hover:bg-primary-dark active:scale-95 text-white px-4 py-3 rounded-xl text-center transition-all duration-200 flex items-center justify-center font-inter font-semibold shadow-sm"
          >
            <Share2 className="w-4 h-4 mr-2" />
            {t('share')}
          </button>
        </div>

      
      </div>

    </div>
  );
});

export default PandalCard;
