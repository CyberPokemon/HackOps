package com.example.watermanagementbackend.Controller;

import com.example.watermanagementbackend.Model.Municipality;
import com.example.watermanagementbackend.Model.MunicipalityData;
import com.example.watermanagementbackend.Service.MunicipalityService;
import com.example.watermanagementbackend.Service.WaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.method.AuthorizeReturnObject;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class MunicipalityController {

    @Autowired
    private MunicipalityService municipalityService;

    @Autowired
    private WaterService waterService;

    @GetMapping("/data/municipalitylist")
    public List<MunicipalityData> getListOfAllMunicipalities()
    {
        return municipalityService.getListOfAllMunicipalities();
    }

    @PostMapping("/auth/municipalitysignup")
    public ResponseEntity<String> register(@RequestBody Municipality municipality)
    {
        return municipalityService.register(municipality);
    }

    @PostMapping("/auth/municipalitylogin")
    public String verify(@RequestBody Municipality municipality)
    {
//        System.out.println("Reached 1 time");
        return municipalityService.verify(municipality);
    }

    @GetMapping("/municipality/waterrequests")
    public ResponseEntity<?> getAllWaterRequests(Authentication authentication) {
        String username = authentication.getName(); // From JWT
        return ResponseEntity.ok(waterService.getAllRequestsForMunicipality(username));
    }

    @PostMapping("/municipality/waterreqdecision")
    public ResponseEntity<?> approveOrRejectRequest(@RequestParam Long requestId,
                                                    @RequestParam int allocatedAmount,
                                                    @RequestParam String status,
                                                    Authentication authentication)
    {
        String username = authentication.getName();
        return waterService.handleRequestFromMunicipality(requestId, allocatedAmount, status, username);

    }

    @GetMapping("/municipality/profile")
    public ResponseEntity<?> getMunicipalityProfile(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(municipalityService.getMunicipalityProfile(username));
    }


    @GetMapping("/municipality/approvedwater")
    public ResponseEntity<?> getApprovedWaterThisMonth(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(waterService.getTotalApprovedWaterForCurrentMonth(username));
    }

    @GetMapping("/municipality/dispatchschedule")
    public ResponseEntity<?> getDispatchSchedule(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(waterService.getDispatchScheduleForCurrentMonth(username));
    }

}
