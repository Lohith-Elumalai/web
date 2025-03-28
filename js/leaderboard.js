// leaderboard.js - JavaScript for the leaderboard functionality

// Global object to manage the leaderboard system
const LeaderboardManager = {
    // Initialize the leaderboard functionality
    init: function() {
      // Add event listeners for leaderboard interactions
      this.setupEventListeners();
      
      // Check current user status and highlight in leaderboard
      this.highlightCurrentUser();
    },
    
    // Setup event listeners
    setupEventListeners: function() {
      // Tab switching
      const tabButtons = document.querySelectorAll('.tab-btn');
      if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
          button.addEventListener('click', this.handleTabSwitch.bind(this));
        });
      }
      
      // Category filter
      const categoryFilter = document.getElementById('category-filter');
      if (categoryFilter) {
        categoryFilter.addEventListener('change', this.handleCategoryFilter.bind(this));
      }
    },
    
    // Handle tab switching (monthly/all-time)
    handleTabSwitch: function(e) {
      // Remove active class from all tabs
      document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.classList.remove('active');
      });
      
      // Add active class to clicked tab
      e.target.classList.add('active');
      
      // Get time frame from data attribute
      const timeFrame = e.target.dataset.tab;
      
      // Update leaderboard data
      this.updateLeaderboardData(timeFrame);
    },
    
    // Handle category filter
    handleCategoryFilter: function(e) {
      const category = e.target.value;
      
      // Get currently active time frame
      const activeTab = document.querySelector('.tab-btn.active');
      const timeFrame = activeTab ? activeTab.dataset.tab : 'monthly';
      
      // Update leaderboard with new filter
      this.updateLeaderboardData(timeFrame, category);
    },
    
    // Update leaderboard data based on time frame and category
    updateLeaderboardData: function(timeFrame, category = 'all') {
      // In a real app, this would be an API call
      console.log(`Updating leaderboard: timeFrame=${timeFrame}, category=${category}`);
      
      // Trigger React component's update through a custom event
      document.dispatchEvent(new CustomEvent('leaderboard-update', {
        detail: { timeFrame, category }
      }));
    },
    
    // Highlight current user in the leaderboard
    highlightCurrentUser: function() {
      // Get current user ID (would come from authentication in a real app)
      const currentUserId = 'user123'; // Example user ID
      
      // Find and highlight user row in the leaderboard table
      setTimeout(() => {
        const userRows = document.querySelectorAll('.leaderboard-table tbody tr');
        
        userRows.forEach(row => {
          if (row.dataset.userId === currentUserId) {
            row.classList.add('current-user');
          }
        });
      }, 1000); // Delay to ensure the table is rendered
    },
    
    // Get user rank information
    getUserRankInfo: function() {
      // In a real app, this would come from an API call
      return {
        rank: 14,
        totalUsers: 356,
        percentile: 96.1,
        pointsToNextRank: 70
      };
    },
    
    // Update user rank display
    updateUserRankDisplay: function() {
      const rankInfo = this.getUserRankInfo();
      const rankDisplay = document.getElementById('user-rank-display');
      
      if (rankDisplay) {
        rankDisplay.innerHTML = `
          <div class="user-rank-info">
            <div class="rank-card">
              <div class="rank-label">Your Rank</div>
              <div class="rank-value">${rankInfo.rank}</div>
              <div class="rank-context">of ${rankInfo.totalUsers} users</div>
            </div>
            <div class="rank-card">
              <div class="rank-label">Top Percentile</div>
              <div class="rank-value">${rankInfo.percentile}%</div>
              <div class="rank-context">Better than ${rankInfo.percentile}% of users</div>
            </div>
            <div class="rank-card">
              <div class="rank-label">Next Rank</div>
              <div class="rank-value">${rankInfo.pointsToNextRank}</div>
              <div class="rank-context">points needed</div>
            </div>
          </div>
        `;
      }
    }
  };
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    LeaderboardManager.init();
    LeaderboardManager.updateUserRankDisplay();
  });