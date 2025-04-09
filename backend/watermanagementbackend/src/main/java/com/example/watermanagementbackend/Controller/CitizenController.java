package com.example.watermanagementbackend.Controller;

import com.example.watermanagementbackend.Model.Citizen;
import com.example.watermanagementbackend.Model.Municipality;
import com.example.watermanagementbackend.Model.WaterRequest;
import com.example.watermanagementbackend.Service.CitizenService;
import com.example.watermanagementbackend.Service.WaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class CitizenController {

    @Autowired
    private CitizenService citizenService;

    @Autowired
    private WaterService waterService;

    @PostMapping("/auth/citizensignup")
    public Citizen register(@RequestBody Citizen citizen)
    {
        return citizenService.register(citizen);
    }

    @PostMapping("/auth/citizenlogin")
    public String verify(@RequestBody Citizen citizen)
    {
//        System.out.println("Reached 1 time");
        return citizenService.verify(citizen);
    }

    @PostMapping("/water/request")
    public ResponseEntity<?> requestWater(@RequestBody WaterRequest request, Authentication authentication) {
        String username = authentication.getName(); // From JWT token
        System.out.println(request);
        System.out.println(username);
        return ResponseEntity.ok(waterService.submitRequest(request, username));
    }

    @GetMapping("/water/history")
    public ResponseEntity<?> getWaterRequestHistory(Authentication authentication) {
        String username = authentication.getName(); // JWT gets username
        return ResponseEntity.ok(waterService.getCitizenWardHistory(username));
    }

}
