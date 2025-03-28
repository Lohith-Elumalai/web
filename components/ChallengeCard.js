// ChallengeCard.js
const ChallengeCard = ({ challenge }) => {
    // Calculate days remaining
    const calculateDaysRemaining = (endDate) => {
      const end = new Date(endDate);
      const today = new Date();
      const diffTime = end - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };
  
    const daysRemaining = calculateDaysRemaining(challenge.endDate);
    
    return (
      <div className="challenge-card">
        <div className="challenge-image">
          <img src={challenge.image} alt={challenge.title} />
        </div>
        <div className="challenge-details">
          <span className="challenge-category">{challenge.category}</span>
          <h3 className="challenge-title">{challenge.title}</h3>
          <p className="challenge-description">{challenge.description}</p>
          <div className="challenge-meta">
            <span className="deadline">
              {daysRemaining > 0 
                ? `${daysRemaining} days left` 
                : "Ended"}
            </span>
            <span className="entry-count">{challenge.entries} entries</span>
          </div>
          <a href={`challenge-detail.html?id=${challenge.id}`} className="btn primary-btn" style={{marginTop: '15px', display: 'block', textAlign: 'center'}}>
            View Challenge
          </a>
        </div>
      </div>
    );
  };
  
  // ChallengesGrid component
  const ChallengesGrid = () => {
    const [challenges, setChallenges] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [categoryFilter, setCategoryFilter] = React.useState('all');
    const [sortOrder, setSortOrder] = React.useState('newest');
  
    // Simulate fetching challenges from an API
    React.useEffect(() => {
      // In a real application, this would be an API call
      setTimeout(() => {
        const dummyChallenges = [
          {
            id: 1,
            title: "Summer Vibes Outfit Challenge",
            description: "Create the perfect summer outfit for a day at the beach or a casual summer party.",
            category: "summer",
            image: "resource/slide1.png",
            endDate: "2025-04-15",
            entries: 32,
            prize: "20% discount coupon + 500 points"
          },
          {
            id: 2,
            title: "Office Look Challenge",
            description: "Design a stylish yet professional outfit perfect for the modern workplace.",
            category: "office",
            image: "resource/slide2.png",
            endDate: "2025-04-20",
            entries: 28,
            prize: "15% discount coupon + 400 points"
          },
          {
            id: 3,
            title: "Date Night Elegance",
            description: "Create a romantic and stylish outfit for a special date night.",
            category: "formal",
            image: "resource/slide3.jpg",
            endDate: "2025-04-10",
            entries: 45,
            prize: "25% discount coupon + 600 points"
          },
          {
            id: 4,
            title: "Casual Weekend Style",
            description: "Put together a comfortable yet trendy outfit for weekend activities.",
            category: "casual",
            image: "resource/slide4.jpg",
            endDate: "2025-04-25",
            entries: 19,
            prize: "10% discount coupon + 300 points"
          },
          {
            id: 5,
            title: "Party Ready Looks",
            description: "Design an eye-catching outfit perfect for a night out or special celebration.",
            category: "party",
            image: "resource/wfw1.jpg",
            endDate: "2025-04-30",
            entries: 37,
            prize: "30% discount coupon + 700 points"
          },
          {
            id: 6,
            title: "Sustainable Fashion Challenge",
            description: "Create an outfit from our eco-friendly collection that's both stylish and sustainable.",
            category: "casual",
            image: "resource/wfw2.webp",
            endDate: "2025-05-05",
            entries: 23,
            prize: "20% discount coupon + 500 points + Plant a tree"
          }
        ];
        
        setChallenges(dummyChallenges);
        setLoading(false);
      }, 1000);
    }, []);
  
    // Filter and sort challenges
    const filteredChallenges = React.useMemo(() => {
      return challenges
        .filter(challenge => {
          const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = categoryFilter === 'all' || challenge.category === categoryFilter;
          return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
          if (sortOrder === 'newest') {
            return new Date(b.endDate) - new Date(a.endDate);
          } else if (sortOrder === 'popular') {
            return b.entries - a.entries;
          } else if (sortOrder === 'ending') {
            return new Date(a.endDate) - new Date(b.endDate);
          }
          return 0;
        });
    }, [challenges, searchTerm, categoryFilter, sortOrder]);
  
    // Event handlers
    React.useEffect(() => {
      const searchInput = document.getElementById('challenge-search');
      const categorySelect = document.getElementById('category-filter');
      const sortSelect = document.getElementById('sort-filter');
  
      if (searchInput) {
        searchInput.addEventListener('input', (e) => setSearchTerm(e.target.value));
      }
  
      if (categorySelect) {
        categorySelect.addEventListener('change', (e) => setCategoryFilter(e.target.value));
      }
  
      if (sortSelect) {
        sortSelect.addEventListener('change', (e) => setSortOrder(e.target.value));
      }
  
      return () => {
        if (searchInput) {
          searchInput.removeEventListener('input', (e) => setSearchTerm(e.target.value));
        }
        if (categorySelect) {
          categorySelect.removeEventListener('change', (e) => setCategoryFilter(e.target.value));
        }
        if (sortSelect) {
          sortSelect.removeEventListener('change', (e) => setSortOrder(e.target.value));
        }
      };
    }, []);
  
    if (loading) {
      return <div className="loading">Loading challenges...</div>;
    }
  
    return (
      <div className="challenges-grid">
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map(challenge => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))
        ) : (
          <div className="no-challenges">
            <p>No challenges found matching your criteria.</p>
          </div>
        )}
      </div>
    );
  };
  
  // Render the component
  ReactDOM.render(
    <ChallengesGrid />,
    document.getElementById('challenges-container')
  );