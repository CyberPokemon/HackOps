package com.example.watermanagementbackend.Repository;

import com.example.watermanagementbackend.Model.RequestStatus;
import com.example.watermanagementbackend.Model.WaterRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface  WaterRequestRepo extends JpaRepository<WaterRequest, Long> {
    List<WaterRequest> findByMunicipalityAndWardNo(String municipality, int wardNo);

    List<WaterRequest> findByMunicipality(String municipalityName);

    List<WaterRequest> findByMunicipalityAndStatusAndRequireDateTimeBetween(String name, RequestStatus requestStatus, LocalDateTime start, LocalDateTime end);
}

