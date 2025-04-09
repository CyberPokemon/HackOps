package com.example.watermanagementbackend.Service;

import com.example.watermanagementbackend.Model.Citizen;
import com.example.watermanagementbackend.Model.Municipality;
import com.example.watermanagementbackend.Model.WaterRequest;
import com.example.watermanagementbackend.Repository.WaterRequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.method.AuthorizeReturnObject;
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

        @Autowired
        private MunicipalityService municipalityService;

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
            request.setCreatedByUsername(citizen.getUsername());
            request.setCreatedByName(citizen.getName());

            System.out.println(request);
            WaterRequest saved = waterRequestRepo.save(request);
            return Map.of("message", "Request submitted successfully", "requestId", saved.getRequestId());
    }


    public List<WaterRequest> getCitizenWardHistory(String username) {
        Citizen citizen = citizenService.getCitizenByUsername(username);
        String municipality = citizen.getMunicipalityName();
        int wardNo = citizen.getWardNo();

        return waterRequestRepo.findByMunicipalityAndWardNo(municipality, wardNo);
    }

    public List<WaterRequest> getAllRequestsForMunicipality(String municipalityUsername) {
        Municipality municipality = municipalityService.getByUsername(municipalityUsername);

        return waterRequestRepo.findByMunicipality(municipality.getMunicipalityName());
    }

    public ResponseEntity<?> handleRequestFromMunicipality(Long requestId, int allocatedAmount, String status, String username) {

        WaterRequest request = getRequestById(requestId);

        Municipality municipality = municipalityService.getByUsername(username);

        // Check access
        if (!request.getMunicipality().equals(municipality.getMunicipalityName())) {
            return ResponseEntity.status(403).body("You cannot modify this request.");
        }

        // Validate status
        if (!status.equalsIgnoreCase("APPROVED") && !status.equalsIgnoreCase("REJECTED")) {
            return ResponseEntity.badRequest().body("Status must be APPROVED or REJECTED");
        }

        // Update and save
        request.setAllocatedAmount(allocatedAmount);
        request.setStatus(RequestStatus.valueOf(status.toUpperCase()));
        waterRequestRepo.save(request);

        return ResponseEntity.ok("Request " + status.toUpperCase() + " successfully.");
    }

    public WaterRequest getRequestById(Long id) {
        return waterRequestRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }
}
