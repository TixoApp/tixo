// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/~ERC1155.sol";
import "@openzeppelin/contracts/access/~Ownable.sol";
import "@openzeppelin/contracts/utils/~Counters.sol";

// Test Event Contract, replaced by Infura ERC1155Mintable Template in prod
contract Event is ERC1155, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _ticketIds;
    uint256 private _ticketPrice;
    uint256 private _maxTickets;

    event TicketMinted(
        uint256 ticketId,
        address indexed recipient
    );

    constructor(
        uint256 ticketPrice,
        uint256 maxTickets,
        string memory uri
    ) ERC1155(uri) {
        _ticketPrice = ticketPrice;
        _maxTickets = maxTickets;
    }

    function mintTicket(address recipient) public payable returns (uint256) {
        require(msg.value == _ticketPrice, "Incorrect ticket price");
        require(_ticketIds.current() < _maxTickets, "All tickets for this event have been minted");

        _ticketIds.increment();
        uint256 newTicketId = _ticketIds.current();

        _mint(recipient, newTicketId, 1, "");

        // Send the ticket value to the event owner
        payable(owner()).transfer(msg.value);

        emit TicketMinted(newTicketId, recipient);

        return newTicketId;
    }
}

contract TixoCollectionV1 is Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _eventIds;
    mapping(uint256 => address) private _events;

    event EventCreated(
        uint256 indexed eventId,
        address indexed eventContract,
        address indexed eventOwner,
        uint256 ticketPrice,
        uint256 maxTickets
    );

    function registerEvent(
        uint256 ticketPrice,
        uint256 maxTickets,
        string memory uri
    ) public returns (uint256) {
        _eventIds.increment();
        uint256 newEventId = _eventIds.current();

        Event newEvent = new Event(ticketPrice, maxTickets, uri);
        newEvent.transferOwnership(msg.sender);

        _events[newEventId] = address(newEvent);

        emit EventCreated(newEventId, address(newEvent), msg.sender, ticketPrice, maxTickets);

        return newEventId;
    }

    function getEvent(uint256 eventId) public view returns (address) {
        return _events[eventId];
    }

    function getLastEventId() external view returns (uint256) {
        return _eventIds.current();
    }
}
