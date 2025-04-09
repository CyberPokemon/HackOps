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


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
            request.getRequireDateTime();

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

        if (!request.getMunicipality().equals(municipality.getMunicipalityName())) {
            return ResponseEntity.status(403).body("You cannot modify this request.");
        }

        if (!status.equalsIgnoreCase("APPROVED") && !status.equalsIgnoreCase("REJECTED")) {
            return ResponseEntity.badRequest().body("Status must be APPROVED or REJECTED");
        }

        if (status.equalsIgnoreCase("APPROVED")) {
            LocalDateTime reqDate = request.getRequireDateTime();
            if (reqDate == null) {
                return ResponseEntity.badRequest().body("Request does not have a valid required dispatch date.");
            }

            int requestMonth = reqDate.getMonthValue();
            int requestYear = reqDate.getYear();

            List<WaterRequest> approvedThisMonth = waterRequestRepo.findByMunicipality(municipality.getMunicipalityName())
                    .stream()
                    .filter(r -> r.getStatus() == RequestStatus.APPROVED)
                    .filter(r -> r.getRequireDateTime() != null &&
                            r.getRequireDateTime().getMonthValue() == requestMonth &&
                            r.getRequireDateTime().getYear() == requestYear)
                    .toList();

            int totalAllocated = approvedThisMonth.stream()
                    .mapToInt(WaterRequest::getAllocatedAmount)
                    .sum();

            long maxCapacity = municipality.getWatercapacity();
            if ((totalAllocated + allocatedAmount) > maxCapacity) {
                return ResponseEntity.badRequest().body("Approval denied: Monthly water capacity exceeded (" + maxCapacity + " units).");
            }
        }

        request.setAllocatedAmount(allocatedAmount);
        request.setStatus(RequestStatus.valueOf(status.toUpperCase()));
        waterRequestRepo.save(request);

        return ResponseEntity.ok("Request " + status.toUpperCase() + " successfully.");
    }

    public WaterRequest getRequestById(Long id) {
        return waterRequestRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }

    public Map<String, Object> getTotalApprovedWaterForCurrentMonth(String username) {
        Municipality municipality = municipalityService.getByUsername(username);
        String name = municipality.getMunicipalityName();

        YearMonth currentMonth = YearMonth.now();
        LocalDateTime start = currentMonth.atDay(1).atStartOfDay();
        LocalDateTime end = currentMonth.atEndOfMonth().atTime(23, 59, 59);

        List<WaterRequest> approvedRequests = waterRequestRepo
                .findByMunicipalityAndStatusAndRequireDateTimeBetween(
                        name,
                        RequestStatus.APPROVED,
                        start,
                        end
                );

        int total = approvedRequests.stream()
                .mapToInt(WaterRequest::getAllocatedAmount)
                .sum();

        return Map.of(
                "municipality", name,
                "approvedAmountThisMonth", total
        );
    }

    public List<Map<String, Object>> getDispatchScheduleForCurrentMonth(String username) {
        Municipality municipality = municipalityService.getByUsername(username);
        String name = municipality.getMunicipalityName();

        YearMonth currentMonth = YearMonth.now();
        LocalDateTime start = currentMonth.atDay(1).atStartOfDay();
        LocalDateTime end = currentMonth.atEndOfMonth().atTime(23, 59, 59);

        List<WaterRequest> approvedRequests = waterRequestRepo
                .findByMunicipalityAndStatusAndRequireDateTimeBetween(
                        name,
                        RequestStatus.APPROVED,
                        start,
                        end
                );

        // Group by date (yyyy-MM-dd) and sum allocatedAmount
        Map<LocalDate, Integer> dailySchedule = approvedRequests.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getRequireDateTime().toLocalDate(),
                        Collectors.summingInt(WaterRequest::getAllocatedAmount)
                ));

        return dailySchedule.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("date", entry.getKey().toString());
                    map.put("totalApprovedAmount", entry.getValue());
                    return map;
                })
                .collect(Collectors.toList());

    }
}
