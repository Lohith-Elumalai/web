// challenges.js - Main JavaScript for the challenges functionality

// Global object to manage the challenges system
const ChallengesManager = {
    // Current user data (would come from authentication in a real app)
    currentUser: {
      id: 'user123',
      username: 'StyleEnthusiast',
      points: 350,
      level: 2,
      tier: 'Bronze',
      challengesParticipated: 4,
      challengesWon: 0
    },
  
    // Initialize the challenges functionality
    init: function() {
      // Add event listeners for global challenge interactions
      this.setupEventListeners();
      
      // Update UI elements with user data
      this.updateUserData();
      
      // Display notification if needed
      this.checkNotifications();
    },
    
    // Setup event listeners for challenge interactions
    setupEventListeners: function() {
      // Event delegation for voting buttons
      document.addEventListener('click', function(e) {
        // Vote button handling
        if (e.target.closest('.vote-button') && !e.target.closest('.vote-button').classList.contains('voted')) {
          const button = e.target.closest('.vote-button');
          const entryId = button.dataset.entryId;
          
          if (entryId) {
            ChallengesManager.handleVote(entryId, button);
          }
        }
        
        // Challenge participation button
        if (e.target.matches('.participate-btn')) {
          const challengeId = e.target.dataset.challengeId;
          
          if (challengeId) {
            window.location.href = `challenge-detail.html?id=${challengeId}#submission-form`;
          }
        }
      });
      
      // Search and filter functionality
      const searchInput = document.getElementById('challenge-search');
      if (searchInput) {
        searchInput.addEventListener('input', this.handleSearch.bind(this));
      }
      
      // Category filter
      const categoryFilter = document.getElementById('category-filter');
      if (categoryFilter) {
        categoryFilter.addEventListener('change', this.handleCategoryFilter.bind(this));
      }
      
      // Sort filter
      const sortFilter = document.getElementById('sort-filter');
      if (sortFilter) {
        sortFilter.addEventListener('change', this.handleSortFilter.bind(this));
      }
    },
    
    // Update UI with user data
    updateUserData: function() {
      // Update user profile elements if they exist
      const pointsDisplay = document.querySelectorAll('.user-points');
      const levelDisplay = document.querySelectorAll('.user-level');
      const tierDisplay = document.querySelectorAll('.user-tier');
      
      pointsDisplay.forEach(el => {
        el.textContent = this.currentUser.points;
      });
      
      levelDisplay.forEach(el => {
        el.textContent = this.currentUser.level;
      });
      
      tierDisplay.forEach(el => {
        el.textContent = this.currentUser.tier;
      });
    },
    
    // Handle voting on an entry
    handleVote: function(entryId, button) {
      // In a real app, this would be an API call
      console.log(`Voting for entry ${entryId}`);
      
      // Simulate API call
      setTimeout(() => {
        // Update button state
        button.classList.add('voted');
        button.textContent = 'Voted';
        
        // Update vote count
        const voteCount = button.parentElement.querySelector('.vote-count span');
        if (voteCount) {
          voteCount.textContent = parseInt(voteCount.textContent) + 1;
        }
        
        // Award points to the user
        const pointsEarned = 10; // Random points between 5-15
        this.currentUser.points += pointsEarned;
        this.updateUserData();
        
        // Show reward notification
        this.showRewardNotification(pointsEarned);
        
        // Store the vote in localStorage
        this.saveVote(entryId);
      }, 500);
    },
    
    // Save vote to localStorage
    saveVote: function(entryId) {
      const votes = JSON.parse(localStorage.getItem('challengeVotes') || '[]');
      votes.push(entryId);
      localStorage.setItem('challengeVotes', JSON.stringify(votes));
    },
    
    // Check if user has already voted
    hasVoted: function(entryId) {
      const votes = JSON.parse(localStorage.getItem('challengeVotes') || '[]');
      return votes.includes(entryId);
    },
    
    // Show reward notification
    showRewardNotification: function(points) {
      const notification = document.createElement('div');
      notification.className = 'reward-notification';
      notification.innerHTML = `
        <div class="reward-icon">🎉</div>
        <p>You earned <span>${points}</span> points!</p>
      `;
      
      document.body.appendChild(notification);
      
      // Animate notification
      setTimeout(() => {
        notification.classList.add('visible');
      }, 10);
      
      // Remove notification after a delay
      setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => {
          notification.remove();
        }, 500);
      }, 3000);
    },
    
    // Handle search functionality
    handleSearch: function(e) {
      const searchTerm = e.target.value.toLowerCase();
      
      // In a real app, this might trigger an API call or filter existing data
      console.log(`Searching for: ${searchTerm}`);
      
      // Trigger React component's search functionality through a custom event
      document.dispatchEvent(new CustomEvent('challenge-search', {
        detail: { searchTerm }
      }));
    },
    
    // Handle category filter
    handleCategoryFilter: function(e) {
      const category = e.target.value;
      
      // In a real app, this might trigger an API call or filter existing data
      console.log(`Filtering by category: ${category}`);
      
      // Trigger React component's filter functionality through a custom event
      document.dispatchEvent(new CustomEvent('challenge-filter', {
        detail: { category }
      }));
    },
    
    // Handle sort filter
    handleSortFilter: function(e) {
      const sortBy = e.target.value;
      
      // In a real app, this might trigger an API call or sort existing data
      console.log(`Sorting by: ${sortBy}`);
      
      // Trigger React component's sort functionality through a custom event
      document.dispatchEvent(new CustomEvent('challenge-sort', {
        detail: { sortBy }
      }));
    },
    
    // Check for notifications
    checkNotifications: function() {
      // Check if there's a new level or reward notification to show
      const newLevel = localStorage.getItem('newLevel');
      const newReward = localStorage.getItem('newReward');
      
      if (newLevel) {
        this.showLevelUpNotification(newLevel);
        localStorage.removeItem('newLevel');
      }
      
      if (newReward) {
        this.showNewRewardNotification(newReward);
        localStorage.removeItem('newReward');
      }
    },
    
    // Show level up notification
    showLevelUpNotification: function(level) {
      const notification = document.createElement('div');
      notification.className = 'level-up-notification';
      notification.innerHTML = `
        <div class="level-up-icon">🏆</div>
        <h3>Level Up!</h3>
        <p>Congratulations! You've reached Level ${level}</p>
        <p>Keep participating to unlock more rewards!</p>
        <button class="close-notification">Got it!</button>
      `;
      
      document.body.appendChild(notification);
      
      // Add event listener to close button
      notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.remove();
      });
    },
    
    // Show new reward notification
    showNewRewardNotification: function(reward) {
      const notification = document.createElement('div');
      notification.className = 'reward-unlocked-notification';
      notification.innerHTML = `
        <div class="reward-icon">🎁</div>
        <h3>New Reward Unlocked!</h3>
        <p>${reward}</p>
        <button class="close-notification">Claim</button>
      `;
      
      document.body.appendChild(notification);
      
      // Add event listener to close button
      notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.remove();
      });
    }
  };
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    ChallengesManager.init();
  });