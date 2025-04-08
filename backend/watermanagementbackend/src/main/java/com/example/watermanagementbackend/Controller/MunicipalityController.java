package com.example.watermanagementbackend.Controller;

import com.example.watermanagementbackend.Model.Municipality;
import com.example.watermanagementbackend.Service.MunicipalityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class MunicipalityController {

    @Autowired
    private MunicipalityService municipalityService;

    @PostMapping("/auth/signup")
    public Municipality register(@RequestBody Municipality municipality)
    {
        return municipalityService.register(municipality);
    }
}
