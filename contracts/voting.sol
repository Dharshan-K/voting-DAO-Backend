// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract voting {
    struct Proposal {
        uint256 proposalId;
        string proposalTitle;
        string proposalDescription;
        uint256 yesVotes;
        uint256 noVotes;
        bool excecuted;
        uint256 deadline;
    }
    mapping(address => bool) public voterData;

    uint256 proposalCount = 0;
    mapping(uint256 => Proposal) public proposalData;
    enum voteOption {
        yes,
        no
    }

    function createProposal(
        string memory _ProposalTitle,
        string memory _ProposalDescription
    ) public {
        proposalCount++;
        Proposal storage proposal = proposalData[proposalCount];
        proposal.proposalId = proposalCount;
        proposal.proposalTitle = _ProposalTitle;
        proposal.proposalDescription = _ProposalDescription;
        proposal.deadline = block.timestamp + 10 minutes;
    }

    function voteProposal(uint256 _proposalId, voteOption vote) public {
        Proposal storage proposal = proposalData[_proposalId];
        if (proposal.deadline >= block.timestamp) {
            voterData[msg.sender] = true;
            if (vote == voteOption.yes) {
                proposal.yesVotes++;
            } else if (vote == voteOption.no) {
                proposal.noVotes++;
            }
        }
    }

    function excecution(uint256 _proposalId) public {
        Proposal storage proposal = proposalData[_proposalId];
        if (block.timestamp > proposal.deadline) {
            if (proposal.yesVotes > proposal.noVotes) {
                proposal.excecuted = true;
            } else {
                proposal.excecuted = false;
            }
        }
    }

    function getProposalCount() public view returns (uint256) {
        return proposalCount;
    }

    function getExcecutionStatus(uint256 _proposalId)
        public
        view
        returns (bool)
    {
        Proposal storage proposal = proposalData[_proposalId];
        return proposal.excecuted;
    }

    function getYesVotes(uint256 _proposalId) public view returns (uint256) {
        Proposal storage proposal = proposalData[_proposalId];
        return proposal.yesVotes;
    }

    function getProposalTitle(uint256 _proposalId)
        public
        view
        returns (string memory)
    {
        Proposal storage proposal = proposalData[_proposalId];
        return proposal.proposalTitle;
    }

    function getproposal(uint256 _proposalId)
        public
        view
        returns (Proposal memory)
    {
        Proposal storage proposal = proposalData[_proposalId];
        return proposal;
    }

    fallback() external payable {}

    receive() external payable {}
}
