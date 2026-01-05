// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IntakeAuditLog {

    struct AuditEntry {
        bytes32 dataHash;
        uint256 timestamp;
        string note;
    }

    mapping(uint256 => AuditEntry[]) private auditLogs;

    event AuditRecorded(
        uint256 indexed complaintId,
        bytes32 dataHash,
        uint256 timestamp,
        string note
    );

    function recordAudit(
        uint256 complaintId,
        bytes32 dataHash,
        string calldata note
    ) external {
        AuditEntry memory entry = AuditEntry({
            dataHash: dataHash,
            timestamp: block.timestamp,
            note: note
        });

        auditLogs[complaintId].push(entry);

        emit AuditRecorded(
            complaintId,
            dataHash,
            block.timestamp,
            note
        );
    }

    function getAuditCount(uint256 complaintId)
        external
        view
        returns (uint256)
    {
        return auditLogs[complaintId].length;
    }

    function getAuditEntry(uint256 complaintId, uint256 index)
        external
        view
        returns (bytes32, uint256, string memory)
    {
        AuditEntry storage entry = auditLogs[complaintId][index];
        return (entry.dataHash, entry.timestamp, entry.note);
    }
}
