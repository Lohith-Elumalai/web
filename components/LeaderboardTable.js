// LeaderboardTable.js
const LeaderboardTable = () => {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [timeFrame, setTimeFrame] = React.useState('monthly');
    const [categoryFilter, setCategoryFilter] = React.useState('all');
  
    // Fetch leaderboard data
    React.useEffect(() => {
      // In a real application, this would be an API call
      setTimeout(() => {
        const dummyUsers = [
          {
            id: 1,
            username: "FashionGuru",
            avatar: "resource/profile-icon.png",
            points: 4120,
            challengesWon: 12,
            badge: "platinum"
          },
          {
            id: 2,
            username: "StyleQueen",
            avatar: "resource/profile-icon.png",
            points: 3240,
            challengesWon: 7,
            badge: "gold"
          },
          {
            id: a3,
            username: "TrendSetter",
            avatar: "resource/profile-icon.png",
            points: 2890,
            challengesWon: 5,
            badge: "silver"
          },
          {
            id: 4,
            username: "ChicStyle",
            avatar: "resource/profile-icon.png",
            points: 2450,
            challengesWon: 4,
            badge: "silver"
          },
          {
            id: 5,
            username: "UrbanFashion",
            avatar: "resource/profile-icon.png",
            points: 2100,
            challengesWon: 3,
            badge: "silver"
          },
          {
            id: 6,
            username: "VogueVibe",
            avatar: "resource/profile-icon.png",
            points: 1850,
            challengesWon: 2,
            badge: "silver"
          },
          {
            id: 7,
            username: "FashionForward",
            avatar: "resource/profile-icon.png",
            points: 1620,
            challengesWon: 1,
            badge: "silver"
          },
          {
            id: 8,
            username: "StyleSavvy",
            avatar: "resource/profile-icon.png",
            points: 1450,
            challengesWon: 1,
            badge: "silver"
          },
          {
            id: 9,
            username: "ModernMuse",
            avatar: "resource/profile-icon.png",
            points: 1200,
            challengesWon: 0,
            badge: "silver"
          },
          {
            id: 10,
            username: "FashionFusion",
            avatar: "resource/profile-icon.png",
            points: 980,
            challengesWon: 0,
            badge: "bronze"
          },
          {
            id: 11,
            username: "TrendTracker",
            avatar: "resource/profile-icon.png",
            points: 820,
            challengesWon: 0,
            badge: "bronze"
          },
          {
            id: 12,
            username: "StyleStar",
            avatar: "resource/profile-icon.png",
            points: 710,
            challengesWon: 0,
            badge: "bronze"
          },
          {
            id: 13,
            username: "FashionFanatic",
            avatar: "resource/profile-icon.png",
            points: 580,
            challengesWon: 0,
            badge: "bronze"
          },
          {
            id: 14,
            username: "ChicConnoisseur",
            avatar: "resource/profile-icon.png",
            points: 420,
            challengesWon: 0,
            badge: "bronze"
          },
          {
            id: 15,
            username: "TrendyTouch",
            avatar: "resource/profile-icon.png",
            points: 350,
            challengesWon: 0,
            badge: "bronze"
          }
        ];
        
        setUsers(dummyUsers);
        setLoading(false);
      }, 1000);
    }, [timeFrame, categoryFilter]);
  
    // Handle tab changes
    React.useEffect(() => {
      const tabButtons = document.querySelectorAll('.tab-btn');
      const categoryFilter = document.getElementById('category-filter');
      
      if (tabButtons.length > 0) {
        tabButtons.forEach(btn => {
          btn.addEventListener('click', (e) => {
            // Remove active class from all tabs
            tabButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked tab
            e.target.classList.add('active');
            
            // Update time frame state
            setTimeFrame(e.target.dataset.tab);
          });
        });
      }
      
      if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
          setCategoryFilter(e.target.value);
        });
      }
      
      return () => {
        if (tabButtons.length > 0) {
          tabButtons.forEach(btn => {
            btn.removeEventListener('click', () => {});
          });
        }
        
        if (categoryFilter) {
          categoryFilter.removeEventListener('change', () => {});
        }
      };
    }, []);
  
    // Determine badge text
    const getBadgeText = (badge) => {
      switch (badge) {
        case 'bronze': return 'Bronze';
        case 'silver': return 'Silver';
        case 'gold': return 'Gold';
        case 'platinum': return 'Platinum';
        default: return '';
      }
    };
  
    if (loading) {
      return <div className="loading">Loading leaderboard data...</div>;
    }
  
    return (
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th className="rank">Rank</th>
            <th>User</th>
            <th>Points</th>
            <th className="challenges-won">Challenges Won</th>
            <th className="badge">Tier</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="rank">{index + 4}</td>
              <td className="user">
                <div className="user-avatar">
                  <img src={user.avatar} alt={user.username} />
                </div>
                <span className="username">{user.username}</span>
              </td>
              <td className="points">{user.points.toLocaleString()}</td>
              <td className="challenges-won">{user.challengesWon}</td>
              <td className="badge">
                <span className={`badge ${user.badge}`}>
                  {getBadgeText(user.badge)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  // Render the component
  if (document.getElementById('leaderboard-table-container')) {
    ReactDOM.render(
      <LeaderboardTable />,
      document.getElementById('leaderboard-table-container')
    );
  }