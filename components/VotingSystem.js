// VotingSystem.js
const VotingSystem = ({ challengeId }) => {
    const [entries, setEntries] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [sortOrder, setSortOrder] = React.useState('newest');
    const [userVotes, setUserVotes] = React.useState([]);
    const [voteSubmitting, setVoteSubmitting] = React.useState(null);
    const [rewardModalOpen, setRewardModalOpen] = React.useState(false);
    const [earnedPoints, setEarnedPoints] = React.useState(0);
  
    // Fetch challenge entries
    React.useEffect(() => {
      // In a real application, this would be an API call
      setTimeout(() => {
        const dummyEntries = [
          {
            id: 1,
            title: "Summer Beach Day",
            user: {
              id: 123,
              username: "FashionQueen",
              avatar: "resource/profile-icon.png"
            },
            description: "Perfect outfit for a day at the beach with friends. Comfortable yet stylish!",
            image: "resource/slide1.png",
            products: [
              { id: 1, image: "resource/clothing1.jpg" },
              { id: 4, image: "resource/clothing2.jpg" },
              { id: 10, image: "resource/clothing4.jpg" }
            ],
            votes: 42,
            date: "2025-03-15"
          },
          {
            id: 2,
            title: "Casual Friday Vibes",
            user: {
              id: 456,
              username: "StyleGuru",
              avatar: "resource/profile-icon.png"
            },
            description: "My take on the perfect office casual look that transitions well to after-work activities.",
            image: "resource/slide2.png",
            products: [
              { id: 2, image: "resource/cm1.jpg" },
              { id: 8, image: "resource/cm3.jpg" },
              { id: 14, image: "resource/cm5.jpg" }
            ],
            votes: 38,
            date: "2025-03-20"
          },
          {
            id: 3,
            title: "Family Day Out",
            user: {
              id: 789,
              username: "TrendSetter",
              avatar: "resource/profile-icon.png"
            },
            description: "Coordinated outfits for the whole family that are comfortable for a day of activities.",
            image: "resource/slide3.jpg",
            products: [
              { id: 3, image: "resource/ck1.jpg" },
              { id: 5, image: "resource/cm2.jpg" },
              { id: 13, image: "resource/clothing5.jpg" }
            ],
            votes: 27,
            date: "2025-03-22"
          },
          {
            id: 4,
            title: "Evening Elegance",
            user: {
              id: 101,
              username: "ChicStyle",
              avatar: "resource/profile-icon.png"
            },
            description: "A sophisticated look for an elegant dinner or special evening event.",
            image: "resource/slide4.jpg",
            products: [
              { id: 4, image: "resource/clothing2.jpg" },
              { id: 7, image: "resource/clothing3.jpg" },
              { id: 10, image: "resource/clothing4.jpg" }
            ],
            votes: 35,
            date: "2025-03-25"
          }
        ];
        
        // Get previously voted entries from localStorage (in a real app, this would come from a backend)
        const storedVotes = localStorage.getItem('challengeVotes');
        const votedEntries = storedVotes ? JSON.parse(storedVotes) : [];
        
        setEntries(dummyEntries);
        setUserVotes(votedEntries);
        setLoading(false);
      }, 1000);
    }, [challengeId]);
  
    // Handle sorting changes
    React.useEffect(() => {
      const sortSelect = document.getElementById('entries-sort');
      
      if (sortSelect) {
        sortSelect.addEventListener('change', (e) => setSortOrder(e.target.value));
        
        return () => {
          sortSelect.removeEventListener('change', (e) => setSortOrder(e.target.value));
        };
      }
    }, []);
  
    // Sort entries based on the selected sort order
    const sortedEntries = React.useMemo(() => {
      return [...entries].sort((a, b) => {
        if (sortOrder === 'newest') {
          return new Date(b.date) - new Date(a.date);
        } else if (sortOrder === 'most-voted') {
          return b.votes - a.votes;
        }
        return 0;
      });
    }, [entries, sortOrder]);
  
    // Check if user has already voted for an entry
    const hasVoted = (entryId) => {
      return userVotes.includes(entryId);
    };
  
    // Handle voting
    const handleVote = (entryId) => {
      // If already voted, do nothing
      if (hasVoted(entryId)) return;
      
      setVoteSubmitting(entryId);
      
      // In a real application, this would be an API call
      setTimeout(() => {
        // Update entries with new vote count
        const updatedEntries = entries.map(entry => {
          if (entry.id === entryId) {
            return { ...entry, votes: entry.votes + 1 };
          }
          return entry;
        });
        
        // Update local storage
        const updatedVotes = [...userVotes, entryId];
        localStorage.setItem('challengeVotes', JSON.stringify(updatedVotes));
        
        setEntries(updatedEntries);
        setUserVotes(updatedVotes);
        setVoteSubmitting(null);
        
        // Show reward modal with random points between 5-15
        const points = Math.floor(Math.random() * 11) + 5;
        setEarnedPoints(points);
        setRewardModalOpen(true);
      }, 1000);
    };
  
    // Reward modal component
    const RewardModal = () => {
      return (
        <div className="reward-modal">
          <div className="reward-modal-content">
            <div className="reward-icon">🎉</div>
            <h3>Vote Recorded!</h3>
            <p>Thank you for participating!</p>
            <p className="points-earned">You earned {earnedPoints} points!</p>
            <button 
              className="close-modal-btn"
              onClick={() => setRewardModalOpen(false)}
            >
              Continue
            </button>
          </div>
        </div>
      );
    };
  
    if (loading) {
      return <div className="loading">Loading entries...</div>;
    }
  
    return (
      <div className="entries-container">
        {sortedEntries.length > 0 ? (
          <div className="entries-grid">
            {sortedEntries.map(entry => (
              <div key={entry.id} className="entry-card">
                <div className="entry-image">
                  <img src={entry.image} alt={entry.title} />
                </div>
                <div className="entry-details">
                  <h3>{entry.title}</h3>
                  <div className="entry-user">
                    <div className="user-avatar">
                      <img src={entry.user.avatar} alt={entry.user.username} />
                    </div>
                    <span className="username">{entry.user.username}</span>
                  </div>
                  <p className="entry-description">{entry.description}</p>
                  
                  <div className="entry-products">
                    <h4>Products Used</h4>
                    <div className="products-list">
                      {entry.products.map(product => (
                        <div key={product.id} className="product-thumbnail">
                          <img src={product.image} alt="Product" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="voting-section">
                    <div className="vote-count">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                      </svg>
                      <span>{entry.votes}</span>
                    </div>
                    
                    <button 
                      className={`vote-button ${hasVoted(entry.id) ? 'voted' : ''}`}
                      onClick={() => handleVote(entry.id)}
                      disabled={hasVoted(entry.id) || voteSubmitting !== null}
                    >
                      {voteSubmitting === entry.id ? 'Voting...' : hasVoted(entry.id) ? 'Voted' : 'Vote'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-entries">
            <p>No entries have been submitted to this challenge yet. Be the first!</p>
          </div>
        )}
        
        {rewardModalOpen && <RewardModal />}
      </div>
    );
  };
  
  // Render the component
  if (document.getElementById('entries-container')) {
    const challengeId = getParameterByName('id');
    ReactDOM.render(
      <VotingSystem challengeId={challengeId} />,
      document.getElementById('entries-container')
    );
  }