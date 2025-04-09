package com.example.watermanagementbackend.Repository;

import com.example.watermanagementbackend.Model.WaterRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface  WaterRequestRepo extends JpaRepository<WaterRequest, Long> {
    List<WaterRequest> findByMunicipalityAndWardNo(String municipality, int wardNo);

}

