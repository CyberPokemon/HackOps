package com.example.watermanagementbackend.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class WaterRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    private String municipality;
    private int wardNo;
    private int requestedAmount;
    private int allocatedAmount;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    private LocalDateTime timestamp;
    private String createdByUsername;
    private String createdByName;

    public WaterRequest() {
        this.status = RequestStatus.PENDING;
        this.timestamp = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "WaterRequest{" +
                "requestId=" + requestId +
                ", municipality='" + municipality + '\'' +
                ", wardNo=" + wardNo +
                ", requestedAmount=" + requestedAmount +
                ", allocatedAmount=" + allocatedAmount +
                ", status=" + status +
                ", timestamp=" + timestamp +
                ", createdByUsername='" + createdByUsername + '\'' +
                ", createdByName='" + createdByName + '\'' +
                '}';
    }

    public String getCreatedByUsername() {
        return createdByUsername;
    }

    public void setCreatedByUsername(String createdByUsername) {
        this.createdByUsername = createdByUsername;
    }

    public String getCreatedByName() {
        return createdByName;
    }

    public void setCreatedByName(String createdByName) {
        this.createdByName = createdByName;
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public String getMunicipality() {
        return municipality;
    }

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }

    public int getWardNo() {
        return wardNo;
    }

    public void setWardNo(int wardNo) {
        this.wardNo = wardNo;
    }

    public int getRequestedAmount() {
        return requestedAmount;
    }

    public void setRequestedAmount(int requestedAmount) {
        this.requestedAmount = requestedAmount;
    }

    public int getAllocatedAmount() {
        return allocatedAmount;
    }

    public void setAllocatedAmount(int allocatedAmount) {
        this.allocatedAmount = allocatedAmount;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
