// Vote Manager - Handles localStorage for pandal votes
class VoteManager {
  constructor() {
    this.STORAGE_KEY = 'votedPandals';
  }

  // Get all voted pandal IDs from localStorage
  getVotedPandals() {
    try {
      const votedPandals = localStorage.getItem(this.STORAGE_KEY);
      return votedPandals ? JSON.parse(votedPandals) : [];
    } catch (error) {
      return [];
    }
  }

  // Check if a pandal has been voted for
  hasVoted(pandalId) {
    const votedPandals = this.getVotedPandals();
    return votedPandals.includes(pandalId);
  }

  // Add a pandal ID to voted list
  addVote(pandalId) {
    try {
      const votedPandals = this.getVotedPandals();
      if (!votedPandals.includes(pandalId)) {
        votedPandals.push(pandalId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(votedPandals));
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  // Remove a pandal ID from voted list (for testing purposes)
  removeVote(pandalId) {
    try {
      const votedPandals = this.getVotedPandals();
      const updatedPandals = votedPandals.filter(id => id !== pandalId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedPandals));
      return true;
    } catch (error) {
      return false;
    }
  }

  // Clear all votes (for testing purposes)
  clearAllVotes() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get vote statistics
  getVoteStats() {
    const votedPandals = this.getVotedPandals();
    return {
      totalVotes: votedPandals.length,
      votedPandals: votedPandals
    };
  }
}

// Create singleton instance
const voteManager = new VoteManager();

export default voteManager;
