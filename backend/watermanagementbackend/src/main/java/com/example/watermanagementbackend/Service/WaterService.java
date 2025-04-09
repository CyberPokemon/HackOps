package com.example.watermanagementbackend.Service;

import com.example.watermanagementbackend.Model.Citizen;
import com.example.watermanagementbackend.Model.WaterRequest;
import com.example.watermanagementbackend.Repository.WaterRequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.watermanagementbackend.Model.RequestStatus;


import java.util.List;
import java.util.Map;

@Service
public class WaterService {




        @Autowired
        private WaterRequestRepo waterRequestRepo;

        @Autowired
        private CitizenService citizenService;

        public List<WaterRequest> getWaterHistory(String municipality, int wardNo) {
            return waterRequestRepo.findByMunicipalityAndWardNo(municipality, wardNo);
        }

        public Map<String, Object> submitRequest(WaterRequest request, String username)
        {
            Citizen citizen = citizenService.getCitizenByUsername(username);

            // Attach citizen's info
            request.setWardNo(citizen.getWardNo());
            request.setMunicipality(citizen.getMunicipalityName());
            request.setAllocatedAmount(0);
            request.setStatus(RequestStatus.PENDING); // Optional enum value

            System.out.println(request);
            WaterRequest saved = waterRequestRepo.save(request);
            return Map.of("message", "Request submitted successfully", "requestId", saved.getRequestId());
    }



}
