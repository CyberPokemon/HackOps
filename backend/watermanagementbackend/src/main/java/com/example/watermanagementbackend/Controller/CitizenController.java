package com.example.watermanagementbackend.Controller;

import com.example.watermanagementbackend.Model.Citizen;
import com.example.watermanagementbackend.Model.Municipality;
import com.example.watermanagementbackend.Service.CitizenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class CitizenController {

    @Autowired
    private CitizenService citizenService;

    @PostMapping("/auth/citizensignup")
    public Citizen register(@RequestBody Citizen citizen)
    {
        return citizenService.register(citizen);
    }
}
