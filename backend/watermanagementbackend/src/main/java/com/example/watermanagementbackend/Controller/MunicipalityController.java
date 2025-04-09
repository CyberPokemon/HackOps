package com.example.watermanagementbackend.Controller;

import com.example.watermanagementbackend.Model.Municipality;
import com.example.watermanagementbackend.Model.MunicipalityData;
import com.example.watermanagementbackend.Service.MunicipalityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
}
