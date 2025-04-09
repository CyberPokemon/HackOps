package com.example.watermanagementbackend.Controller;

import com.example.watermanagementbackend.Model.Municipality;
import com.example.watermanagementbackend.Model.MunicipalityData;
import com.example.watermanagementbackend.Service.MunicipalityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class MunicipalityController {

    @Autowired
    private MunicipalityService municipalityService;

    @GetMapping("/data/municipalitylist")
    public List<MunicipalityData> getListOfAllMunicipalities()
    {
        return municipalityService.getListOfAllMunicipalities();
    }

    @PostMapping("/auth/municipalitysignup")
    public Municipality register(@RequestBody Municipality municipality)
    {
        return municipalityService.register(municipality);
    }
}
